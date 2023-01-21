const bcryptjs = require("bcryptjs");

const { validationResult } = require("express-validator");

const db = require("../database/models");

const provincias = require("../provincias");

const controlador = {
    login: (req, res) => {
        return res.render("login");
    },

    loginProcess: (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email,
            },
        })
            .then((result) => {
                if (result) {
                    let passwordOk = bcryptjs.compareSync(
                        req.body.password,
                        result.password
                    );

                    if (passwordOk) {
                        delete result.password;
                        req.session.userLogged = result;
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
        return res.render("crear", { provincias: provincias });
    },

    store: (req, res) => {
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
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
                        errors: {
                            email: { msg: "Este mail ya fue registrado" },
                        },
                        oldData: req.body,
                        provincias: provincias,
                    });
                } else {
                    db.User.create({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        email: req.body.email,
                        direccion: req.body.direccion,
                        password: bcryptjs.hashSync(req.body.password, 10),
                        provincia: req.body.provincia,
                        imagenPerfil: req.file.filename
                            ? req.file.filename
                            : "default.png",
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
        res.render("editar-perfil", {
            user: req.session.userLogged,
            provincias,
        });
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

    borrar: async (req, res) => {
        let { id } = req.params;

        try {
            await db.User.destroy({
                where: {
                    id: id,
                },
            });

            if (!req.session.userLogged || !req.session.userLogged.admin) {
                return res.redirect("/");
            } else {
                return res.redirect("/usuario/admin");
            }
        } catch (error) {
            console.log(error);
        }
    },
    comprar: async (req, res) => {
        const { idProduct } = req.params;
        const { id } = req.session.userLogged;

        try {
            let user = await db.User.findByPk(id);
            let producto = await db.Producto.findByPk(idProduct);

            const detalle_venta = await db.Detalle_venta.create({
                direccion_destino: user.direccion,
                provincia_destino: user.provincia,
                retiro: 1,
                monto_total: producto.precio,
            });
            const venta = await db.Venta.create({
                monto_unitario: producto.precio,
                cantidad: 1,
                producto_id: idProduct,
                detalle_venta_ID: detalle_venta.id,
                usuario_id: id,
            });

            await producto.increment(
                { stock: -1 },
                { where: { id: idProduct } }
            );
            req.flash("mensajes", [{ msg: "Producto comprado" }]);

            res.redirect(`/producto/detalle/${producto.id}`);
        } catch (error) {
            req.flash("mensajes", [{ msg: error.message }]);

            res.redirect(`/producto/detalle/${idProduct}`);
        }
    },
    renderizarAdministrar: async (req, res) => {
        try {
            const users = await db.User.findAll();
            const products = await db.Producto.findAll({ include: "marca" });
            return res.render("administrador", { users, products });
        } catch (error) {
            console.log(error);
        }
    },
    renderizarVentas: async (req, res) => {
        try {
            const ventas = await db.Venta.findAll({
                include: ["detalle_venta", "productos", "usuarios"],
            });

            return res.render("ventas", { ventas });
        } catch (error) {
            console.log(error);
        }
    },
};
module.exports = controlador;
