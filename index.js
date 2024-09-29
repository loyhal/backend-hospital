const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');


//Crear servidor express
const app = express();

//Configurar CORS
app.use(cors());


//BBDD
dbConnection();
console.log(process.env)

//RUtas
app.get( '/', (req, res) => {
res.status.json({
    ok: true,
    msg: 'Hola Mundo'
})

} );

app.listen ( process.env.PORT, () =>{
    console.log('Servidor en marcha en el puerto '+ process.env.PORT);
});



