
const db = require("../database/models");

let controller = {
    home: (req, res) => {
        db.Producto.findAll({ includes: "marca" })
            .then((result) => {
                res.render("home", { productos: result });
            })
            .catch((err) => console.log(err));

    },
};

module.exports = controller;
