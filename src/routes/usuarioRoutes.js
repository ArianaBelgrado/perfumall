// LOGIN

//  REQUIRES
const usuarioController = require('./../controllers/usuarioController')
let express = require('express');
const e = require('express');
let router= express.Router();

/*** CREATE ONE PRODUCT ***/  
router.get('/create', usuarioController.create); 
router.post('/create', usuarioController.store); 


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