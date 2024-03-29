const db = require("../database/models");
const mercadopago = require("mercadopago");
let controller = {
    carrito: (req, res) => {
        res.render("carrito");
    },
    detalle: async (req, res) => {
        let preference = {
            items: [],
        };
        const { id } = req.params;

        try {
            const producto = await db.Producto.findByPk(id, {
                include: "marca",
            });

            preference.items.push({
                title: producto.modelo,
                unit_price: producto.precio,
                quantity: 1,
            });
            const response = await mercadopago.preferences.create(preference);
            const preferenceId = response.body.id;
            return res.render("detalle", {
                preferenceId,
                producto,
                mensajes: req.flash("mensajes"),
            });
        } catch (error) {
            res.send(error.message);
            console.log(error);
        }
    },
    nuevoProducto: async (req, res) => {
        let marcas = await db.Marca.findAll();

        res.render("crear-producto", { marcas: marcas });
    },
    store: (req, res) => {
        let estado;
        let adminId = req.session.userLogged.id;
        let descuento = 0;
        if (req.body.descuento > 0) {
            estado = true;
            descuento = req.body.descuento;
        } else {
            estado = false;
        }

        db.Producto.create({
            precio: req.body.precio,
            modelo: req.body.modelo,
            fecha_creacion: new Date(),
            stock: req.body.stock,
            descuento: descuento,
            imagen: req.file.filename,
            marca_id: req.body.marca,
            estado: estado,
            descripcion: req.body.descripcion,
            admin_id: adminId,
        })

            .then(function (result) {
                if (result) {
                    res.redirect("/");
                } else {
                    res.send("Tu producto es malaso");
                }
            })

            .catch((e) => res.send(e));
    },

    editar: async (req, res) => {
        let { id } = req.params;
        console.log(req.body);
        let estado;
        /*  let file = req.file.filename; */
        let descuento = 0;
        if (req.body.descuento > 0) {
            estado = true;
            descuento = req.body.descuento;
        } else {
            estado = false;
        }

        try {
            /*  const producto = await db.Producto.findByPk(idProduct); */
            /*   if (!file) file = producto.imagen; */

            await db.Producto.update(
                {
                    precio: req.body.precio,
                    modelo: req.body.modelo,
                    descuento: descuento,
                    /*    imagen: file, */
                    marca: req.body.marca_id,
                    estado,
                    descripcion: req.body.descripcion,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    },
    editarImagen: async (req, res) => {
        const { id } = req.params;
        const imagen = req.file.filename;

        try {
            db.Producto.update(
                {
                    imagen,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            return res.redirect("/");
        } catch (error) {
            res.send(error.message);
        }
    },
    renderizarEditarProducto: (req, res) => {
        console.log(req.route.path);
        let idProduct = req.params.id;

        db.Producto.findByPk(idProduct, { include: "marca" })
            .then((result) => {
                res.render("editar-producto", { producto: result });
            })
            .catch((e) => res.send(e));
    },

    borrar: async (req, res) => {
        const { id } = req.params;
        console.log(req.route.path);

        try {
            await db.Producto.destroy({
                where: {
                    id: id,
                },
            });
            return res.redirect("/usuario/admin");
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = controller;
