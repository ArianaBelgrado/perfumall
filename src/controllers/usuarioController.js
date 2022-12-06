const bcryptjs = require("bcryptjs");

const { validationResult } = require("express-validator");

const db = require("../database/models");

const provincias = require("../provincias");

const jwt = require('jsonwebtoken');

const Usuario = require("../database/models/Usuario");

const secretKey = "Perfumall";
const token = jwt.sign(db.User[0], secretKey)


const controlador = {
    token: (req, res) => {
        const token = req.query.token;
        jwt.verify(token, secretKey, (err, data) => {
            res.send(err ? "Token inválido" : data);
        });
    },
    login: (req, res) => {
        const { email, password } = req.query;
        const user = db.User.find((datox) => datox.email == email && datox.password == password);
        if (user) {
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 10,
                data: user
            },
                secretKey)
        }
        return res.render("login");
    },
    Dashboard: (req, res) => {
        let { token } = req.query;
        jwt.verify(token, secretKey, (err, decoded) => {
            err ?
                res.status(401).send({
                    error: "401 Unauthorized",
                    message: err.message,
                }) :
                res.send(`
  Bienvenido al Dashboard ${decoded.data.email}
  `);
        });
    },

    loginProcess: (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email,
            },
        })
            .then((result) => {
                if (result) {
                    let passwordOk = bcryptjs.compareSync(req.body.password, result.password);

                    if (passwordOk) {
                        delete result.password;
                        req.session.userLogged = result;
                        console.log(req.session.userLogged);
                        res.redirect("/");
                    } else {
                        return res.render("login", {
                            errors: {
                                password: {
                                    msg: "Contraseña invalida",
                                },
                            },
                        });
                    }
                } else {
                    return res.render("login", {
                        errors: {
                            email: {
                                msg: "Email no existente",
                            },
                        },
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect("/");
    },

    create: (req, res) => {
        res.render("crear", { provincias: provincias });
    },

    store: (req, res) => {
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (!resultValidation.isEmpty()) {
            console.log(req.body);
            console.log("holaaaa");
            return res.render("crear", {
                errors: resultValidation.mapped(),
                oldData: req.body,
                provincias: provincias,
            });
        }

        db.User.findOne({
            where: {
                email: req.body.email,
            },
        })
            .then((result) => {
                if (result) {
                    res.render("crear", {
                        errors: { email: { msg: "Este mail ya fue registrado" } },
                        oldData: req.body,
                        provincias: provincias,
                    });
                } else {
                    db.User.create({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password, 10),
                        provincia: req.body.provincia,
                        imagenPerfil: req.file.filename ? req.file.filename : "default.png",
                    });
                }
                return res.render("login");
            })
            .then((result) => {
                if (result) {
                    res.redirect("/");
                }
            })
            .catch((err) => console.log(err));
    },

    renderizarPerfil: (req, res) => {
        return res.render("profile", { user: req.session.userLogged });
    },

    renderizarEditarPerfil: (req, res) => {
        res.render("editar-perfil", { user: req.session.userLogged, provincias });
    },

    editUser: (req, res) => {
        db.User.update(
            {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                // password: bcryptjs.hashSync(req.body.password, 10),
                imagenPerfil: req.file.filename,
                provincia: req.body.provincia,
                //  local_id: req.body.local_id,
            },
            { where: { id: req.session.userLogged.id } }
        ).then(function (result) {
            if (result) {
                req.session.userLogged.imagenPerfil = req.file.filename;
                req.session.userLogged.apellido = req.body.apellido;
                req.session.userLogged.email = req.body.email;
                req.session.userLogged.provincia = req.body.provincia;
                req.session.userLogged.nombre = req.body.nombre;
                res.redirect("/usuario/profile");
            } else {
                res.send("Error");
            }
        });
    },

    borrar: (req, res) => {
        id = req.params.id;
        db.User.destroy({
            where: {
                id: id,
            },
        }).then(function (result) {
            if (result) {
                res.redirect("/usuario/logout");
            } else {
                res.send("Tu cuenta fue borrada!");
            }
        });
    },
};
module.exports = controlador;
