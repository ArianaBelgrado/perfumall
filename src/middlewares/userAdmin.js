const userAdminMiddleware = (req, res, next) => {

    if (req.session.isLogged) {
        res.locals.isLogged = true;
    }
    next();
};


