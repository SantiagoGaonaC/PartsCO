/*Metodos para controlar toda la logica sobre la registración */

const jwt = require('jsonwebtoken')
//Modulo para encriptar clave:
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

/* Indicar el uso de promesas
comunicacion asincrona
la funcion nos va a devolver*/
const {promisify} = require('util')
const sweetalerNotify = require('../controllers/sweetalerNotify')
//metodo para registrarnos
exports.register = async (req,res)=>{
  email_ex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
        const nombre = req.body.nombre
        const apellido = req.body.apellido
        const email = req.body.email
        const password = req.body.password

        if(!nombre || !apellido || !email || !password){ //si no ingresó nada se indica que ingrese algo
            res.render('register',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            })
        }
          else if(nombre.length>20 || apellido.length>20 || password.length>30){
            res.render('register',{
              alert:true,
              alertTitle: "Advertencia",
              alertMessage: "Ingrese datos validos",
              alertIcon: 'info',
              showConfirmButton: true,
              timer: false,
              ruta: 'register'
          })}
          else if(!email_ex.test(email)){
            res.render('register',{
              alert:true,
              alertTitle: "Advertencia",
              alertMessage: "Digite un email valido",
              alertIcon: 'info',
              showConfirmButton: true,
              timer: false,
              ruta: 'register'
            })}
        else{
          //hash de la pass
          let passHash = await bcryptjs.hash(password, 8)
          conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, apellido:apellido, email:email, password:passHash}, (error, results)=>{
            if(error)
            {
              if(error.code == 'ER_DUP_ENTRY' || error.errno == 1062)
              {
                  console.log('Usuario duplicado')
                  res.render('register',{
                    alert:true,
                    alertTitle: "Advertencia",
                    alertMessage: "El email ya existe",
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'register'
                  })
              }
              else{
                console.log('Otro error en la query')
                res.redirect('/')
              }
            }else{
              console.log('Usuario registrado')
              res.redirect('/')
            }
      })
        }
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
            
        }else if (email == process.env.CORREO_ADMIN){
            console.log('EMAIL ADMIN')
            conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results)=>{

                if(results.length==0 || !(await bcryptjs.compare(password, results[0].password))){
                    //si no coincide la pass
                    res.render('login',{
                        alert:true,
                        alertTitle: "Error",
                        alertMessage: "Email Contraseña incorrectas admin",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }else{ //inicio de sesion OK
                    //JWT Json web token
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_ADMIN,{
                        expiresIn: process.env.JWT_ADMIN_TIEMPO
                    })
                    console.log(token)
                    //config de cookies
                    const opcionesCookiesAdmin = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, opcionesCookiesAdmin) //nombre de la cookie
                    res.render('login',{
                        alert:true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "Login exitoso",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 600,
                        ruta: 'admin'
                    })
                }
            })
        }
        else{ //en dado caso que si hay datos en el login
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
                        timer: 600,
                        ruta: ''
                    })
                }
            }) //se busca el usuario en la tabla
        }
    } catch (error) {
        console.log(error)
    }
}

//autenticación token user
exports.Authenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuarios WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')
    }
}

//Autenticación token admin
exports.AuthenticatedAdmin = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_ADMIN)
            conexion.query('SELECT * FROM usuarios WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}