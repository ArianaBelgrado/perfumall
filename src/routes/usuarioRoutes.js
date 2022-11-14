let express = require('express');
const guestMiddleware = require('../middlewares/guestMiddleware');
const usuarioController = require('../controllers/usuarioController');
const validations = require('../middlewares/userRegisterValidations');
const uploadFile = require('../middlewares/userMulter');

let router = express.Router();

/*** CREATE PERFIL ***/
router.get('/create', guestMiddleware, usuarioController.create);
router.post('/create', uploadFile.single('imagenPerfil'), validations, usuarioController.store);

// // /*** EDIT ONE USUARIO ***/
router.get('/change/:id', usuarioController.change);
router.put('/change/:id', usuarioController.change);

// // /*** DELETE ONE USUARIO***/
// router.delete('/delete/:id', usuarioController.destroy);

// // /*** EDIT ONE USUARIO  ***/
router.get('/change/:id', usuarioController.change);
router.put('/change/:id', usuarioController.change);


// LOG IN

router.get('/login', usuarioController.login);

// PROCESAR EL LOGIN
router.post('/login', usuarioController.loginProcess);

// Perfil

router.get('/profile', usuarioController.profile);

// EDITAR PERFIL

router.get('/editar', usuarioController.editar);

//BORRAR PERFIL
router.delete('/borrar/:id', usuarioController.borrar);

module.exports = router;
