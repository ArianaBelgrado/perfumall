const multer = require('multer');
const path = require('path');
const multerDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/NuevoProducto');
    },
    filename: function (req, file, cb) {
        let nombreImg = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, nombreImg);
    },
});
const uploadFile = multer({ storage: multerDiskStorage });
module.exports = uploadFile;

