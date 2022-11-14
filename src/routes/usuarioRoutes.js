// LOGIN

//  REQUIRES
const usuarioController = require("../controllers/usuarioController");

let express = require("express");

const path = require("path");

const guestMiddleware = require("../middlewares/guestMiddleware");



const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/img");
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage });
let router = express.Router();
const { check } = require("express-validator");

const validation = [
    check("nombre").notEmpty().withMessage("Tienes que ingresar un Nombre"),
    check("apellido").notEmpty().withMessage("Tienes que ingresar un Apellido"),
    check("mail").notEmpty().withMessage("Debes cargar un e-mail").bail().isEmail().withMessage("Debes escribir un formato válido de correo"),
    check("ciudad").notEmpty().withMessage("Campo obligatorio"),
    check("provincia").notEmpty().withMessage("Elige una provincia"),
    check("contra").notEmpty().withMessage("Crea una contraseña"),
    check("imagenPerfil").custom((value, {req}) => {
        let file = req.file;
        let acceptedExtension=['.jpg', '.png'];
        if(!file){
            throw new Error ("Debes subir una imagen");
        }else{

            let fileExtension= path.extname(file.originalname);
            if (!acceptedExtension.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo aceptadas son: ${acceptedExtension.join(',')} `);
        }
            
        }
        return true;
    })
];

/*** CREATE PERFIL ***/  
router.get('/create', guestMiddleware, usuarioController.create); 
router.post(
'/create',
    uploadFile.single('imagenPerfil'),
    validation,
    usuarioController.store
      ); 

// // /*** EDIT ONE USUARIO ***/ 
router.get('/change/:id', usuarioController.change); 
router.put('/change/:id', usuarioController.change); 

 
// // /*** DELETE ONE USUARIO***/ 
// router.delete('/delete/:id', usuarioController.destroy); 

// // /*** EDIT ONE USUARIO  ***/
router.get("/change/:id", usuarioController.change);
router.put("/change/:id", usuarioController.change);

// // /*** DELETE ONE USUARIO***/
// router.delete('/delete/:id', usuarioController.destroy);

// LOG IN 

router.get("/login", usuarioController.login);
router.post('/login', validation, usuarioController.log)

// PROCESAR EL LOGIN 
router.post("/login", usuarioController.loginProcess);

// EDITAR PERFIL

router.get("/editar", usuarioController.editar);

//BORRAR PERFIL
router.delete("/borrar/:id", usuarioController.borrar);

module.exports = router;
