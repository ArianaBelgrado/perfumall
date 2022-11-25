const mainController = require("./../controllers/mainController");

let express = require("express");
let router = express.Router();

router.get("/", mainController.home);

module.exports = router;


