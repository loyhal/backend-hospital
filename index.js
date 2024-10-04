require('dotenv').config();
const express = require('express');

const cors = require('cors')
const { dbConnection } = require('./database/config');


//Crear servidor express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json())

//BBDD
dbConnection();
//console.log(process.env)

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))



app.listen ( process.env.PORT, () =>{
    console.log('Servidor en marcha en el puerto '+ process.env.PORT);
});



