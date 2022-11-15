const path = require('path');
const bcryptjs = require('bcryptjs');
const fs = require('fs');

const { validationResult } = require('express-validator');

const User = require('../models/User.js');

const usersFilePath = path.join(__dirname, '../database/user.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controlador = {
    login: (req, res) => {
        res.render('login');
        // res.redirect('/');
    },

    loginProcess: (req, res) => {
        console.log(req.body);
        let userToLogin = User.findByField('mail', req.body.mail);
        console.log(userToLogin);
        if (userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                return res.redirect('/');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas',
                    },
                },
            });
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra registrado este email',
                },
            },
        });
    },

    profile: (req, res) => {
        return res.render('profile', { user: req.session.userLogged });
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    },

    editar: (req, res) => {
        res.render('editar-perfil');
        res.redirect('/');
    },
    // Create - Form to create
    create: (req, res) => {
        res.render('crear');
    },
    // Create -  Method to store
    store: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render('crear', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        let userInDB = User.findByField('mail', req.body.mail);
        if (userInDB) {
            return res.render('crear', {
                errors: { mail: { msg: 'Este mail ya fue registrado' } },
                oldData: req.body,
            });
        }

        let nuevoUsuario = {
            id: users[users.length - 1].id + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            ciudad: req.body.ciudad,
            provincia: req.body.provincia,
            password: bcryptjs.hashSync(req.body.contra, 10),
            imagenPerfil: req.file.filename,
            mail: req.body.mail,
        };
        users.push(nuevoUsuario);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        return res.redirect('/usuario/login');
    },
    // Update - Form to edit
    change: (req, res) => {
        let idUsuario = req.params.id;
        let objetoUsuario;
        for (let obj of users) {
            if (idUsuario == obj.id) {
                objetoUsuario = obj;
                break;
            }
        }
        res.render('editar-perfil.ejs', { usuario: objetoUsuario });
        res.redirect('/');
    },
    // Update - Method to update
    update: (req, res) => {
        let idUsuario = req.params.id;
        let objetoUsuario;
        for (let obj of users) {
            if (idUsuario == obj.id) {
                obj.nombre = req.body.nombre;
                obj.apellido = req.body.apellido;
                obj.usuario = req.body.usuario;
                obj.ciudad = req.body.ciudad;
                obj.provincia = req.body.provincia;
                obj.contraseña = req.body.contraseña;
                obj.mail = req.body.mail;
                break;
            }
        }
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/');
    },

    borrar: (req, res) => {
        let id = req.params.id;

        usuario = users.filter((p) => {
            return p.id != id;
        });

        fs.writeFileSync(usersFilePath, JSON.stringify(usuario, null, ' '));
        res.redirect('/');
    },
    // // Delete - Delete one product from DB
    // destroy: (req,res) => {
    //     let idUsuario = req.params.id;

    // 	let arregloUsuarios = users.filter(function(elemento){
    // 		return elemento.id!=idUsuario;
    // 	})

    // 	fs.writeFileSync(usersFilePath, JSON.stringify(arregloUsuarios, null, " "));

    // 	res.redirect('/');
    // }
};
module.exports = controlador;
