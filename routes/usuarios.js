const { Router } = require('express');
const {getUsuarios, postUsuarios, putUsuarios, deleteUsuario} = require('../controllers/usuarios');
const { body } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

/*
RUTA PARA USUARIOS api/usuarios
*/

router.get( '/', validarJWT , getUsuarios);

router.post( '/',
    [
        body('nombre','Nombre obligatorio').not().isEmpty(),
        body('password', 'Contraseña obligatoria').not().isEmpty(),
        body('email', 'Email obligatorio').isEmail(),
        validarCampos
    ], 
    postUsuarios);

router.put( '/:id', validarJWT,
        [
            body('nombre','Nombre obligatorio').not().isEmpty(),
            body('email', 'Email obligatorio').isEmail(),
            body('role','Rol obligatorio').not().isEmpty(),
            validarCampos
        ], 
        putUsuarios);

router.delete( '/:id', validarJWT, deleteUsuario);
    
module.exports = router;
