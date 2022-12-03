const userFunctions = (req, res, next) => {
  
   
    if (req.session.userLogged == false) {
      res.redirect("/")
    }
    else {
      next();
    }
  }


module.exports = userFunctions;
