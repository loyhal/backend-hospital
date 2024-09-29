const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async () =>{

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexion succesfull')
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar BBDD ver logs')
    }

    

}
module.exports = {
    dbConnection
}