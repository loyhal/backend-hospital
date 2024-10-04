const { Router } = require('express');
const { body } = require('express-validator')
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',[
    body('email','Email obligatorio').isEmail(),
    body('password','Contraseña obligatoria').not().isEmpty(),
    validarCampos
],
login
)

module.exports = router;