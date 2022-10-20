let fs = require("fs");
let path = require("path");

const productosFilePath = path.join(
  __dirname,
  "../database/productos-json/catalogo.json"
);
let productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
let controlador = {
  home: (req, res) => {
    res.render("home", { productos });
  },
};

module.exports = controlador;
