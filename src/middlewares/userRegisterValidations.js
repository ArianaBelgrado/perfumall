const { check } = require('express-validator');
const path = require('path');
const validations = [
    check('nombre').notEmpty().withMessage('Tienes que ingresar un Nombre'),
    check('apellido').notEmpty().withMessage('Tienes que ingresar un Apellido'),
    check('mail')
        .notEmpty()
        .withMessage('Debes cargar un e-mail')
        .bail()
        .isEmail()
        .withMessage('Debes escribir un formato válido de correo'),
    check('ciudad').notEmpty().withMessage('Campo obligatorio'),
    check('provincia').notEmpty().withMessage('Elige una provincia'),
    check('contra').notEmpty().withMessage('Crea una contraseña'),
    check('imagenPerfil').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtension = ['.jpg', '.png'];
        if (!file) {
            throw new Error('Debes subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtension.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo aceptadas son: ${acceptedExtension.join(',')} `);
            }
        }
        return true;
    }),
];
module.exports = validations;
