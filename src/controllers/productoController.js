const db = require("../database/models");
let controller = {
    carrito: (req, res) => {
        res.render(path.resolve("views/carrito"));
    },


    detalle: (req, res) => {
        let producto;

        db.Producto.findByPk(req.params.id)
            .then((result) => (producto = result))
            .then((result) => res.render("detalle", { producto }))
            .catch((e) => res.send(e));
    },
    nuevoProducto: (req, res) => {
        res.render("crear-producto");

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

        db.Producto.update(
            {
                precio: req.body.precio,
                modelo: req.body.modelo,
                fecha_creacion: req.body.fecha_creacion,
                fecha_baja: req.body.fecha_baja,
                descuento: req.body.descuento,
                imagen: req.file.filename,
                marca: req.body.marca_id,
                estado: req.body.estado,
                descripcion: req.body.descripcion,
            },
            {
                where: {
                    id: idProduct,
                },
            }
        )
            .then((result) => res.redirect("/"))
            .then((e) => res.send(e));
    },

    borrar: (req, res) => {
        id = req.params.id;
        db.Producto.destroy({
            where: {
                id: id,
            },
        }).then(function (result) {
            if (result) {
                res.redirect("/");
            } else {
                res.send("Tu producto fue borrado!");
            }
        });
    },
};

module.exports = controller;
