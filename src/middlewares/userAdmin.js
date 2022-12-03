const userAdminMiddleware = (req, res, next) => {
    if (req.session.admin != null) {
        return res.redirect('/admin')
   
    } else  if (req.session.admin == null) {
        return res.redirect('/')
    }
    next();
};


module.exports=userAdminMiddleware;