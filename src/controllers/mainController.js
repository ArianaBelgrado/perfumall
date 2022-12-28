const db = require("../database/models");

let controller = {
    home: (req, res) => {
        db.Producto.findAll({ include: "marca" })
            .then((result) => {
                return res.render("home", { productos: result });
            })
            .catch((err) => console.log(err));
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
            console.log(error.message);
        }
    },
};

module.exports = controller;
