const isAdmin = (req, res, next) => {
    res.locals.isAdmin = false;

    if (req.session.userLogged && req.session.userLogged.admin) {
        res.locals.isAdmin = true;
    }
    next();
};

module.exports = isAdmin;
