const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({},'nombre email role google')

    res.json({
        ok: true,
        usuarios
    })
}



    const postUsuarios = async (req, res) => {
     
        const { password, email} = req.body;

        try {
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Este correo ya existe',
                    uid: req.uid
                })
            }
            
            const usuario = new Usuario(req.body);

            //Encriptar contraseña
            const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync( password, salt);

            
            
            //Guardar Usuario
            const savedUsuario = await usuario.save();
            
            const token = await generarJWT(usuario.id, usuario.email);
            res.json({
                ok: true,
                usuario: savedUsuario,
                token
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error al guardar el usuario',
                error: error.message
            });
        }
    };



    const putUsuarios = async (req, res) => {
     
        const uid = req.params.id;

        try {
       
            const usuarioDb = await Usuario.findById( uid );

            if(!usuarioDb){
                return res.status(404).json({
                    ok:false,
                    msg: "No existe usuario con ese id"
                })
            }


            const { password, google, email, ...object } = req.body;

            if(usuarioDb.email !== email){
                const existeEmail = await Usuario.findOne({ email });
                if(existeEmail){
                    return res.status(400).json({
                        ok:false,
                        msg: "Error ya existe"
                    })
                }
            }
            const campos = req.body;
            campos.email = email;
            const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new:true});

            res.json({
                ok: true,
                usuarioActualizado
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error al actualizar el usuario',
                error: error.message
            });
        }
    };
    const deleteUsuario = async (req, res) => {
            try {
                const uid = req.params.id;
                
                const usuarioDb = await Usuario.findById( uid );

                if(!usuarioDb){
                    return res.status(404).json({
                        ok:false,
                        msg: "No existe usuario con ese id"
                    })
                }
                await Usuario.findByIdAndDelete( uid );
                res.json({
                    ok: true,
                    msg: 'Usuario eliminado',
                })
            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: 'Error al borrar el usuario',
                    error: error.message
                });
            }
    }

    module.exports = {
        getUsuarios,
        postUsuarios,
        putUsuarios,
        deleteUsuario
    };



