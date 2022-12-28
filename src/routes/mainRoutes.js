const mainController = require("./../controllers/mainController");
let express = require("express");
let router = express.Router();

router.get("/", mainController.home);

router.get("/:marcaId", mainController.filtrado);

module.exports = router;
