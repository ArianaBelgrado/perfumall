const mainController = require("./../controllers/mainController");
let express = require("express");
let router = express.Router();


router.get("/", mainController.home);
router.get("/descuento/:descuento", mainController.filtradoPorDescuento);
router.get("/marca/:marcaId", mainController.filtrado);


module.exports = router;
