let express = require('express');
let router = express.Router();

const productoController = require('./../controllers/productoController');
const uploadFile = require('../middlewares/productMulter');

router.get('/detalle/:id', productoController.detalle);

router.get('/editar/:id', productoController.renderizarEditarProducto);
router.put('/editar/:id', uploadFile.single('img'), productoController.editar);

router.get('/crear-producto', productoController.nuevoProducto);
router.post('/crear-producto', uploadFile.single('image'), productoController.store);

router.delete('/borrar/:id', productoController.borrar);

module.exports = router;
