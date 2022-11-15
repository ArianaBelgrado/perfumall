const multer = require('multer');
const path = require('path');
const multerDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/NuevoProducto'));
    },
    filename: function (req, file, cb) {
        let nombreImg = Date.now() + file.originalname;
        cb(null, nombreImg);
    },
});
const uploadFile = multer({ storage: multerDiskStorage });
module.exports = uploadFile;
