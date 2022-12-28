const db = require("../database/models");

let controller = {
    home: (req, res) => {
        db.Producto.findAll({ include: "marca" })
            .then((result) => {
                return res.render("home", { productos: result });
            })
            .catch((err) => console.log(err));
    },

    search: async (req, res) => {
        const { Op } = require("sequelize");
        const q = req.query.q;

        console.log(q);
        try {
            const productos = await db.Producto.findAll({
                include: "marca",
                where: {
                    modelo: { [Op.like]: q },
                },
            });

            return res.render("home", {
                productos,
            });
        } catch (error) {
            console.log(error.message);
        }
    },
    filtrado: async (req, res) => {
        const { marcaId } = req.params;

        try {
            const productos = await db.Producto.findAll({
                include: "marca",
                where: { marca_id: marcaId },
            });
            return res.render("home", {
                productos,
            });
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = controller;
