/*Metodos para controlar toda la logica sobre la registración */

const jwt = require('jsonwebtoken')
//Modulo para encriptar clave:
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

/* Indicar el uso de promesas
comunicacion asincrona
la funcion nos va a devolver*/
const {promisify} = require('util')
//metodo para registrarnos
exports.register = async (req,res)=>{

try {
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const email = req.body.email
    const password = req.body.password
    //hash de la pass
    let passHash = await bcryptjs.hash(password, 8)

    conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, apellido:apellido, email:email, password:passHash}, (error, results)=>{
        if(error){console.error(error);}
        res.redirect('/')
    })
    
} catch (error) {
    console.log(error)
}

    //sentencia sql para registrar en la tabla usuarios
}