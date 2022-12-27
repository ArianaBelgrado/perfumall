const db = require("../database/models");

let controller = {
    home: (req, res) => {
        db.Producto.findAll({ include: "marca" })
            .then((result) => {
                console.log(result);
                return res.render("home", { productos: result });
            })
            .catch((err) => console.log(err));
    },

    filtradoAvon: async (req, res) => {

        try {
            const productos = await db.Producto.findAll({
                include: "marca",
                where: { marca_id: 1 }
            })
            return res.render("home", {
                productos
            })

        } catch (error) {
            console.log(error.message);
        }

    },
    filtradoNatura: async (req, res) => {

        try {
            const productos = await db.Producto.findAll({
                include: "marca",
                where: { marca_id: 2 }
            })
            return res.render("home", {
                productos
            })

        } catch (error) {
            console.log(error.message);
        }

    },
    filtradoHerencia: async (req, res) => {

        try {
            const productos = await db.Producto.findAll({
                include: "marca",
                where: { marca_id: 3 }
            })
            return res.render("home", {
                productos
            })

        } catch (error) {
            console.log(error.message);
        }

    },
    filtradoCh: async (req, res) => {

        try {
            const productos = await db.Producto.findAll({
                include: "marca",
                where: { marca_id: 4 }
            })
            return res.render("home", {
                productos
            })

        } catch (error) {
            console.log(error.message);
        }

    },
};

module.exports = controller;
