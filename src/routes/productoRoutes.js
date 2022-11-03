const productoController = require("./../controllers/productoController");
const multer = require("multer");
const path = require("path");
let express = require("express");
let router = express.Router();

const multerDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/img/NuevoProducto"));
  },
  filename: function (req, file, cb) {
    let nombreImg = Date.now() + file.originalname;
    cb(null, nombreImg);
  },
});
const uploadFile = multer({ storage: multerDiskStorage });

router.get("/detalle/:id", productoController.detalle);
// router.get("/carrito", productoController.home);

router.get("/editar/:id", productoController.renderizarEditarProducto);
router.put("/editar/:id", uploadFile.single("img"), productoController.editar);

router.get("/crear-producto", productoController.nuevoProducto);
router.post(
  "/crear-producto",
  uploadFile.single("image"),
  productoController.store
);

router.delete("/borrar/:id", productoController.borrar);

// router.get("/editar-producto", productoController.editarProducto);

module.exports = router;
