
const db = require("../database/models");

let controller = {
  home: (req, res) => {
    db.Producto.findAll({ include: [{ association: 'marca' }] })
      .then((result) => {
        res.json(result)
        res.render("home", { productos: result });
      })
      .catch((err) => console.log(err));

  },
};

module.exports = controller;
