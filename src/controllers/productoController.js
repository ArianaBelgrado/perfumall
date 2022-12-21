const db = require("../database/models");
let controller = {
    carrito: (req, res) => {
        res.render("carrito");
    },

    detalle: (req, res) => {
        let producto;

        db.Producto.findByPk(req.params.id, { include: "marca" })
            .then((result) => (producto = result))
            .then((result) => res.render("detalle", { producto }))
            .catch((e) => res.send(e));
    },
    nuevoProducto: async (req, res) => {
        let marcas = await db.Marca.findAll();

        res.render("crear-producto", { marcas: marcas });
    },

    store: (req, res) => {
        let estado;
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

    renderizarEditarProducto: (req, res) => {
        let idProduct = req.params.id;

        db.Producto.findByPk(idProduct)
            .then((result) => res.render("editar-producto", { producto: result }))
            .catch((e) => res.send(e));
    },

    editar: (req, res) => {
        let idProduct = req.params.id;
        let estado;
        let descuento = 0;
        if (req.body.descuento > 0) {
            estado = true;
            descuento = req.body.descuento;
        } else {
            estado = false;
        }

        db.Producto.update(
            {
                precio: req.body.precio,
                modelo: req.body.modelo,
                descuento: descuento,
                imagen: req.file.filename,
                marca: req.body.marca_id,
                estado: estado,
                descripcion: req.body.descripcion,
            },
            {
                where: {
                    id: idProduct,
                },
            }
        )
            .then((result) => res.redirect("/"))
            .catch((e) => console.log(e));
    },

    borrar: (req, res) => {
        const { id } = req.params;
        db.Producto.destroy({
            where: {
                id: id,
            },
        })
            .then(function (result) {
                if (result) res.redirect("/");
            })
            .catch((err) => console.log(err));
    },
};

module.exports = controller;
