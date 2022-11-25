const Producto = require("../database/models/Producto");

let controller = {
  home: (req, res) => {
    let productos;

    Producto.findAll().then((result) => {
      productos = result;
    });

    res.render("home", { productos });
  },
};

module.exports = controller;
