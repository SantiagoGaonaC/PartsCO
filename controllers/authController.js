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

exports.login = async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        console.log(email,password)

        if(!email || !password){ //si no ingresó nada se indica que ingrese algo
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{ //en dado caso que si hay datos en el login
            conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results)=>{
                //usamos bcrypt de nuevo
                if(results.length==0 || !(await bcryptjs.compare(password, results[0].password))){
                    //si no coincide la pass
                    res.render('login',{
                        alert:true,
                        alertTitle: "Error",
                        alertMessage: "Email y/o contraseña incorrectas",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }else{ //inicio de sesion OK
                    //JWT Json web token
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO,{
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    console.log(token)
                    //config de cookies
                    const opcionesCookies = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, opcionesCookies) //nombre de la cookie
                    res.render('login',{
                        alert:true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "Login exitoso",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                    })
                }
            }) //se busca el usuario en la tabla
        }
    } catch (error) {
        console.log(error)
        
    }
}