const userFunctions = (req, res, next) => {
  userFunctions: (req, file, cb) => {
    let usuarioLogeado = false;
    if (usuarioLogeado == false) {
      res.redirect("/")
    }
    else {
      next();
    }
  }
}

module.exports = userFunctions;
