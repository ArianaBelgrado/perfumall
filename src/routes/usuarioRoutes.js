// LOGIN

//  REQUIRES
const usuarioController = require('./../controllers/usuarioController');

let express = require('express');





const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({storage});
let router= express.Router();
const { check } = require('express-validator');

const validation = [
    check('nombre').notEmpty().withMessage('Tienes que ingresar un Nombre'),
    check('apellido').notEmpty().withMessage('Tienes que ingresar un Apellido'),
    check('mail').notEmpty().withMessage('Debes cargar un email válido'),
    check('ciudad').notEmpty().withMessage('Campo obligatorio'),
    check('provincia').notEmpty().withMessage('Elige una provincia'),
    check('contra').notEmpty().withMessage('Crea una contraseña'),
];

/*** CREATE PERFIL ***/  
router.get('/create', usuarioController.create); 
router.post('/create',uploadFile.single('imagenPerfil'), validation, usuarioController.store); 

// // /*** EDIT ONE PRODUCT ***/ 
router.get('/change/:id', usuarioController.change); 
router.put('/change/:id', usuarioController.change); 

 
// // /*** DELETE ONE PRODUCT***/ 
// router.delete('/delete/:id', usuarioController.destroy); 



// SIGN IN


router.get("/login", usuarioController.login);



// EDITAR PERFIL

router.get("/editar", usuarioController.editar);



module.exports = router;