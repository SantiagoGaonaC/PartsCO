const express = require('express'); /*Invocamos a express*/
const app = express();

/*Set de urlencoded para datos del formulario*/
/*datos que enviamos desde forms*/
app.use(express.urlencoded({extended:true}));
app.use(express.json());

/*Llamado a dontenv*/
const dontenv = require('dotenv');
dontenv.config({path:'./env/.env'})

/*Llamado cookie-parser*/
const cookieParser = require('cookie-parser')
app.use(cookieParser())

/*Set y configuración del directorio public*/
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
app.use(express.static('public'))

/*Motor de plantillas EJS*/
/*Motor de plantillas para pasar variables*/
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


//llaamr al router
app.use('/', require('./routes/router.js'))

//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

/*
app.listen(3000,(req, res )=>{ //puerto 3000
    console.log('Servidor Ejecutado en localhost');
})
*/

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function() {
    console.log("Server started.......");
  });