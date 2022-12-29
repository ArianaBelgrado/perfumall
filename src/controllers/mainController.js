const db = require("../database/models");

let controller = {
    home: async (req, res) => {
        const q = req.query.q;
        try {
            let productos = await db.Producto.findAll({ include: "marca" });
            if (q) {
                const { Op } = require("sequelize");
                productos = await db.Producto.findAll({
                    include: "marca",
                    where: {
                        modelo: { [Op.like]: q },
                    },
                });

                if (productos.length == 0) {
                    console.log("holis golis")
                    return res.render("home", { productos: productos, mensajes: ["Tu producto no fue encontrado"] })
                }
            }
            res.render("home", { productos: productos, mensajes: [] });


        }
        catch (error) {
            console.log(error)
        }
    },
    // search: async (req, res) => {
    //     const { Op } = require("sequelize");
    //     const q = req.query.q;

    //     console.log(q);
    //     try {
    //         const productos = await db.Producto.findAll({
    //             include: "marca",
    //             where: {
    //                 modelo: { [Op.like]: q },
    //             },
    //         });

    //         return res.render("home", {
    //             productos,
    //         });
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // },

    filtrado: async (req, res) => {
        const { marcaId } = req.params;

        try {
            const productos = await db.Producto.findAll({
                include: "marca",
                where: { marca_id: marcaId },
            });
            return res.render("home", { productos: productos, mensajes: [] });
        } catch (error) {
            console.log(error);
        }
    },
    filtradoPorDescuento: async (req, res) => {
        const { descuento } = req.params;
        const { Op } = require("sequelize");
        let descuentoSpliteado = descuento.split("_")[1]
        try {
            const productos = await db.Producto.findAll({
                include: "marca",
                where: { descuento: { [Op.gte]: descuentoSpliteado } },
            })
            return res.render("home", { productos: productos, mensajes: [] });
        } catch (error) {
            console.log(error)
        }
    }
};

module.exports = controller;
