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
};

module.exports = controller;
