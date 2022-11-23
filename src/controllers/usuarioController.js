const path = require("path");
const bcryptjs = require("bcryptjs");
const fs = require("fs");

const { validationResult } = require("express-validator");

const User = require("../database/models/usuario.js");

const usersFilePath = path.join(__dirname, "../database/user.json");
let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const controlador = {
  login: (req, res) => {
    res.render("login");
    // res.redirect('/);
  },

  loginProcess: (req, res) => {
    let userToLogin = User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((result) => (userToLogin = result));

    if (userToLogin) {
      let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);

      if (passwordOk) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        return res.redirect("/");
      }

      return res.render("login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("login", {
      errors: {
        email: {
          msg: "No se encuentra registrado este email",
        },
      },
    });
  },

  profile: (req, res) => {
    return res.render("profile", { user: req.session.userLogged });
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },

  editar: (req, res) => {
    res.render("editar-perfil", { user: req.session.userLogged });
    res.redirect("/");
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("crear");
  },

  // Create -  Method to store
  store: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("crear", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    let userInDB = User.findOne({
      where: {
        email: req.body.mail,
      },
    }).then((result) => (userInDB = result));
    if (userInDB) {
      return res.render("crear", {
        errors: { mail: { msg: "Este mail ya fue registrado" } },
        oldData: req.body,
      });
    }

    User.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.mail,
      password: bcryptjs.hashSync(req.body.password, 10),
      ciudad: req.body.ciudad,
      provincia: req.body.provincia,
      imagenPerfil: req.file.filename,
    });

    return res.redirect("/usuario/login");

    /*    
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
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' ')); */
  },
  // Update - Form to edit
  change: (req, res) => {
    let idUsuario = req.params.id;
    let userFound = User.findByPk(idUsuario).then((result) => (userFound = result));

    res.render("editar-perfil", { usuario: userFound });
  },
  // Update - Method to update
  update: (req, res) => {
    let idUsuario = req.params.id;
    let userFound = User.findByPk(idUsuario).then((result) => (userFound = result));

    
    
    res.redirect("/usuario/profile");
  },

  borrar: (req, res) => {
    let id = req.params.id;

    User.destroy({
      where: {
        id: id,
      },
    });

    res.redirect("/");
  },
};
module.exports = controlador;
