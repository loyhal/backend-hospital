const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs')



const login = async (req,res) =>{
    
    const { email,password } = req.body;
    try{

      const usuarioDB = await Usuario.findOne({email});
      if(!usuarioDB){
        return res.status(404).json({
            ok: false,
            msg:'No válido'
        })
      }

      //SI llega aquí Verificamos contraseña
      const validPass = bcryptjs.compareSync( password, usuarioDB.password)
      if(!validPass){
        return res.status(404).json({
            ok: false,
            msg:'No válido'
        })
      }
      //Si llega aquí toca generar JWT
      const token = await generarJWT(usuarioDB.id, usuarioDB.email)

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error: error.message
        });
    }
}

module.exports = {
    login
}