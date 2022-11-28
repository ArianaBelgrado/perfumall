const db = require("../database/models");

let controller = {
  home: (req, res) => {
    db.User.findAll()
      .then((result) => {
        //res.render("home", { productos: result });
        console.log(result);
      })
      .catch((err) => console.log(err));
  },
};

module.exports = controller;
