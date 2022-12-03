let express = require("express");
let router = express.Router();
const userAdminMiddleware = require("../middlewares/userAdmin");
const productoController = require("./../controllers/productoController");
const uploadFile = require("../middlewares/productMulter");

router.get("/detalle/:id", productoController.detalle);

router.get("/editar/:id", userAdminMiddleware, productoController.renderizarEditarProducto);
router.put("/editar/:id", uploadFile.single("imagen"), productoController.editar);

router.get("/crear-producto", userAdminMiddleware, productoController.nuevoProducto);
router.post("/crear-producto", uploadFile.single("imagen"), productoController.store);

router.delete("/borrar/:id", productoController.borrar);

module.exports = router;
