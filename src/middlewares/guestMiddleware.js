function guestMiddleware(req, res, next) {
    if (!req.session.userLogged) {
        req.flash("mensajes", [{ msg: "Deberias estar logeado" }]);
        return res.redirect("/");
    }

    next();
}

module.exports = guestMiddleware;
