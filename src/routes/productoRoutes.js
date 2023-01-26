let express = require("express");
let router = express.Router();
const userAdminMiddleware = require("../middlewares/userAdmin");
const productoController = require("./../controllers/productoController");
const uploadFile = require("../middlewares/productMulter");
const isAdmin = require("../middlewares/isAdmin");

router.get("/detalle/:id", productoController.detalle);
router.post("/detalle/:id", productoController.detalle);

router.get(
    "/editar/:id",
    userAdminMiddleware,
    productoController.renderizarEditarProducto
);
router.put("/editar/:id", productoController.editar);
router.put(
    "/editar/imagen/:id",
    uploadFile.single("imagen"),
    productoController.editarImagen
);

router.get(
    "/crear-producto",
    userAdminMiddleware,
    productoController.nuevoProducto
);
router.post(
    "/crear-producto",
    uploadFile.single("imagen"),
    isAdmin,
    productoController.store
);
router.get("/carrito", uploadFile.single("imagen"), productoController.carrito);

router.delete("/borrar/:id", userAdminMiddleware, productoController.borrar);

module.exports = router;
