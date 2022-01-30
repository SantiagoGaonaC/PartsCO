const express = require('express'); /*Invocamos a express*/
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();

/*Set de urlencoded para datos del formulario*/
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/*Llamado a dontenv*/
const dontenv = require('dotenv');
dontenv.config({path:'./env/.env'})

/*Set y configuración del directorio public*/
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

/*Motor de plantillas EJS*/
app.set('view engine', 'ejs');

// bcryptjs para la constraseña
const bcryptjs = require('bcryptjs');

//variables de session
const session = require('express-session');
app.use(session({ //especificamos el uso de sesiones
    secret:'secret', //clave secreta
    resave: true, //forma que se guardan las sesiones
    saveUninitialized: true
}))

//Invocar modulo de conexión de la Base de datos
const connection = require('./database/db');

app.get('/',(req,res)=>{
    res.send('PartsCO')
})

app.listen(3000,(req, res )=>{ //puerto 3000
    console.log('Servidor Ejecutado en localhost');
})