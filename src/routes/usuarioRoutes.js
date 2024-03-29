let express = require("express");
const guestMiddleware = require("../middlewares/guestMiddleware");
const usuarioController = require("../controllers/usuarioController");
const validations = require("../middlewares/userRegisterValidations");
const uploadFile = require("../middlewares/userMulter");
const userAdminMiddleware = require("../middlewares/userAdmin");
const isAdmin = require("../middlewares/isAdmin");

let router = express.Router();

/*** CREATE PERFIL ***/
router.get("/create", usuarioController.create);
router.post(
    "/create",
    uploadFile.single("imagenPerfil"),
    validations,
    usuarioController.store
);

// // /*** EDIT ONE USUARIO ***/
router.get(
    "/change",
    guestMiddleware,
    usuarioController.renderizarEditarPerfil
);
router.put(
    "/change",
    uploadFile.single("imagenPerfil"),
    usuarioController.editUser
);

// Perfil

router.get("/profile", guestMiddleware, usuarioController.renderizarPerfil);
router.get("/logout", usuarioController.logout);

// LOG IN

router.get("/login", usuarioController.login);


// PROCESAR EL LOGIN
router.post("/login", usuarioController.loginProcess);

//BORRAR PERFIL
router.delete("/borrar/:id", usuarioController.borrar);

router.post("/comprar/:idProduct", guestMiddleware, usuarioController.comprar);


//ADMIN


router.get("/admin", usuarioController.renderizarAdministrar);
router.get("/admin/ventas", usuarioController.renderizarVentas);

module.exports = router;
