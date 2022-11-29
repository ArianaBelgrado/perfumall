const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

const controlador = {
    login: (req, res) => {
        res.render("login");
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
                        return res.redirect("/");
                    }
                }
            })
            .then((result) => {
                return res.render("login", {
                    errors: {
                        email: {
                            msg: "Las credenciales son inválidas",
                        },
                    },
                });
            })
            .then((result) => {
                return res.render("login", {
                    errors: {
                        email: {
                            msg: "No se encuentra registrado este email",
                        },
                    },
                });
            })
            .catch((err) => console.log(err));
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect("/");
    },

    create: (req, res) => {
        res.render("crear");
    },

    store: (req, res) => {
        let resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.redirect("/usuario/login", "/usuario/login", {
                errors: resultValidation.mapped(),
                oldData: req.body,
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
                    });
                } else {
                    db.User.create({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password, 10),
                        ciudad: req.body.ciudad,
                        provincia: req.body.provincia,
                        imagenPerfil: req.file.filename,
                    });
                }
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
        res.render("editar-perfil", { user: req.session.userLogged });
    },

    editUser: (req, res) => {
        db.User.update(
            {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                // password: bcryptjs.hashSync(req.body.password, 10),
                imagenPerfil: req.file.filename,
                ciudad: req.body.ciudad,
                provincia: req.body.provincia,
                //  local_id: req.body.local_id,
            },
            { where: { id: req.session.userLogged.id } }
        )
            .then((result) => {
               return req.session.reload(function (err) {
                    req.session.userLogged = result;
                });
                console.log(result);

                /*
                if (result) {
                   return  res.redirect("/usuario/profile");
                } else {
                  return  res.send("Error!");
                }
                */
            })
            .catch((err) => console.log(err));
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
