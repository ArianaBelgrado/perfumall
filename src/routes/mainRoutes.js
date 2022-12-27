const mainController = require("./../controllers/mainController");
let express = require("express");
let router = express.Router();

router.get("/", mainController.home);

router.get("/avon", mainController.filtradoAvon);
router.get("/natura", mainController.filtradoNatura);
router.get("/ch", mainController.filtradoCh);
router.get("/herencia", mainController.filtradoHerencia);
module.exports = router;


