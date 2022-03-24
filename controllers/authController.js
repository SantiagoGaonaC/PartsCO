/*Metodos para controlar toda la logica sobre la registración */

const jwt = require('jsonwebtoken')
const jwtAdmin = require('jsonwebtoken')
//Modulo para encriptar clave:
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')

/* Indicar el uso de promesas
comunicacion asincrona
la funcion nos va a devolver*/
const {promisify} = require('util')
const NotifySweetAlert = require('../models/NotifySweetAlert')
const connection = require('../database/db')
const { Console } = require('console')
//metodo para registrarnos
exports.register = async (req,res)=>{
  email_ex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
        const nombre = req.body.nombre
        const apellido = req.body.apellido
        const email = req.body.email
        const password = req.body.password
        const usuario = "usuario"
        const telefono = req.body.telefono
        const direccion = req.body.direccion

        const ndocumento = req.body.ndocumento
        const tdocumento = req.body.tdocumento
        const documento = tdocumento + ' ' +ndocumento
        const estado = "Activo"
        
        if(!nombre || !apellido || !email || !password || !direccion || !telefono || !ndocumento){ //si no ingresó nada se indica que ingrese algo
            res.render('register',NotifySweetAlert.NadaRegisterUser())
        }
          else if(nombre.length>20 || apellido.length>20 || password.length>30){
            res.render('register',NotifySweetAlert.TamañoRegisterUser())
        }
          else if(!email_ex.test(email)){
            res.render('register',NotifySweetAlert.EmailRegisterUser())
          }
        else{
          //hash de la pass
          let passHash = await bcryptjs.hash(password, 8)
          conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, apellido:apellido, email:email, password:passHash, rol:usuario, direccion:direccion, telefono:telefono, documento:documento, estado:estado}, (error, results)=>{
            if(error)
            {
              if(error.code == 'ER_DUP_ENTRY' || error.errno == 1062)
              {
                  console.log('Usuario duplicado')
                  res.render('register',NotifySweetAlert.ExisteMailUser())
              }
              else{
                console.log('Otro error en la query')
                console.log(error)
                res.redirect('/')
              }
            }else{

              console.log('Usuario registrado')
              //res.redirect('/',NotifySweetAlert.RegistroExitoso())
              res.render('register',NotifySweetAlert.RegistroExitoso())
            }
      })
        }
    } catch (error) {
        console.log(error)
    }
        //sentencia sql para registrar en la tabla usuarios
    }

exports.registerAdmin = async (req,res)=>{
  email_ex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
        const nombre = req.body.nombre
        const apellido = req.body.apellido
        const email = req.body.email
        const password = req.body.password
        const rol = req.body.rol
        const telefono = req.body.telefono
        const direccion = req.body.direccion

        const ndocumento = req.body.ndocumento
        const tdocumento = req.body.tdocumento
        const documento = tdocumento + ' ' +ndocumento
        const estado = "Activo"

        if(!nombre || !apellido || !email || !password){ //si no ingresó nada se indica que ingrese algo
            res.render('create',NotifySweetAlert.NadaregisterAdmin())
        }
          else if(nombre.length>20 || apellido.length>20 || password.length>30){
            res.render('create',NotifySweetAlert.TamañoRegisterAdmin())
          }
          else if(!email_ex.test(email)){
            res.render('create',NotifySweetAlert.EmailRegisterAdmin())
          }
        else{
          //hash de la pass
          let passHash = await bcryptjs.hash(password, 8)
          conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, apellido:apellido, email:email, password:passHash, rol:rol, telefono:telefono, direccion:direccion, documento:documento, estado:estado}, (error, results)=>{
            if(error)
            {
              if(error.code == 'ER_DUP_ENTRY' || error.errno == 1062)
              {
                  console.log('Usuario duplicado')
                  res.render('create',NotifySweetAlert.ExisteMailAdmin())
              }
              else{
                console.log('Otro error en la query')
                res.redirect('/admin')
              }
            }else{
              console.log('Usuario registrado')
              res.redirect('/admin')
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

        if(!email || !password){
          res.render('login',NotifySweetAlert.NoEmailNoPassword())
        }else{

          
          conexion.query("SELECT rol FROM usuarios WHERE email = ?", [email], async (error, results)=>{
            if(error){
              console.log("Error encontrado: "+ error)
            }else if(results[0] == undefined){
              res.render('login',NotifySweetAlert.NoExistEmail())
            }else{
              Object.keys(results).forEach(function(key){
                var row = results[key];
                console.log(row.rol)
                if (row.rol == 'admin'){
                  console.log("admin")
                  if(!email || !password){ //si no ingresó nada se indica que ingrese algo
                    res.render('login',NotifySweetAlert.NoEmailNoPassword())
                }else{
                    conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results)=>{
                        if(results.length==0 || !(await bcryptjs.compare(password, results[0].password))){
                            //si no coincide la pass
                            res.render('login',NotifySweetAlert.AdminPassEmail())
                        }else{ //inicio de sesion OK
                            //JWT Json web token
                            
                            //conexion.query('UPDATE sesiones SET fecha_sesion=NOW() WHERE email = ?', [email]);
                            connection.query("SELECT idusuario FROM usuarios WHERE email = ?",[email], function(error, results, fields) {
                              if(error) {
                                  console.log(error);
                                  return;
                              }
                              const rows = JSON.parse(JSON.stringify(results[0]));
                              const id = rows[Object.keys(rows)];
          
                              // here you can access rows
                              console.log("ID:",id);
                              //conexion.query('UPDATE sesiones SET fecha_sesion=NOW() WHERE usuarios_idusuario = ?', [id]);
                              conexion.query('INSERT INTO sesiones (usuarios_idusuario, fecha_sesion) VALUES (?, NOW())', [id]);
                          });

                            //conexion.query('UPDATE usuarios SET sesion=NOW() WHERE email = ?', [email]);
                            const id = results[0].id
                            const token = jwtAdmin.sign({id:id}, process.env.JWT_ADMIN,{
                                expiresIn: process.env.JWT_ADMIN_TIEMPO
                            })
                            console.log(token)
                            //config de cookies
                            const opcionesCookiesAdmin = {
                                expires: new Date(Date.now()+process.env.JWT_ADMIN_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                                httpOnly: true
                            }
                            res.cookie('jwtAdmin', token, opcionesCookiesAdmin) //nombre de la cookie
                            res.render('login',NotifySweetAlert.AdminLoginUp())
                        }
                    })
                }
                }else if (row.rol == 'empleado'){
                  console.log("empleado")
                  if(!email || !password){ //si no ingresó nada se indica que ingrese algo
                    res.render('login',NotifySweetAlert.NoEmailNoPassword())
                }else{
                    conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results)=>{
                        if(results.length==0 || !(await bcryptjs.compare(password, results[0].password))){
                            //si no coincide la pass
                            res.render('login',NotifySweetAlert.AdminPassEmail())
                        }else{ //inicio de sesion OK
                            //JWT Json web token

                            //conexion.query('UPDATE sesiones SET fecha_sesion=NOW() WHERE email = ?', [email]);
                            //conexion.query('UPDATE usuarios SET sesion=NOW() WHERE email = ?', [email]);
                            connection.query("SELECT idusuario FROM usuarios WHERE email = ?",[email], function(error, results, fields) {
                              if(error) {
                                  console.log(error);
                                  return;
                              }
                              const rows = JSON.parse(JSON.stringify(results[0]));
                              const id = rows[Object.keys(rows)];
          
                              // here you can access rows
                              console.log("ID:",id);
                              //conexion.query('UPDATE sesiones SET fecha_sesion=NOW() WHERE usuarios_idusuario = ?', [id]);
                              conexion.query('INSERT INTO sesiones (usuarios_idusuario, fecha_sesion) VALUES (?, NOW())', [id]);
                          });


                            const id = results[0].id
                            const token = jwtAdmin.sign({id:id}, process.env.JWT_ADMIN,{ //EDITAR JWT
                                expiresIn: process.env.JWT_ADMIN_TIEMPO //EDITAR JWT
                            })
                            console.log(token)
                            //config de cookies
                            const opcionesCookiesAdmin = {
                                expires: new Date(Date.now()+process.env.JWT_ADMIN_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), //EDITAR JWT
                                httpOnly: true
                            }
                            res.cookie('jwtAdmin', token, opcionesCookiesAdmin) //nombre de la cookie EDITAR COOKIE
                            res.render('login',NotifySweetAlert.AdminLoginUp())
                        }
                    })
                }
                }else if (row.rol == 'usuario'){
                  console.log("usuario")
                  if(!email || !password){ //si no ingresó nada se indica que ingrese algo
                    res.render('login',NotifySweetAlert.NoEmailNoPassword())
                }else{
                  conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results)=>{
                    //usamos bcrypt de nuevo
                    if(results.length==0 || !(await bcryptjs.compare(password, results[0].password))){
                        //si no coincide la pass
                        res.render('login',NotifySweetAlert.UserPassEmail())
                    }else{ //inicio de sesion OK
                        //JWT Json web token

                        connection.query("SELECT idusuario FROM usuarios WHERE email = ?",[email], function(error, results, fields) {
                          if(error) {
                              console.log(error);
                              return;
                          }
                          const rows = JSON.parse(JSON.stringify(results[0]));
                          const id = rows[Object.keys(rows)];
      
                          // here you can access rows
                          console.log("ID:",id);
                          //conexion.query('UPDATE sesiones SET fecha_sesion=NOW() WHERE usuarios_idusuario = ?', [id]);
                          conexion.query('INSERT INTO sesiones (usuarios_idusuario, fecha_sesion) VALUES (?, NOW())', [id]);

                          // const id = results[0].id
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
                          res.render('login',NotifySweetAlert.UserLoginUp())
                          
                      });
                
                    }
                  }) //se busca el usuario en la tabla
                }
                }
                })
            }
          });
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
            conexion.query('SELECT * FROM usuarios WHERE idusuario = ?', [decodificada.id], (error, results)=>{
              if(!results){return next()}
              req.usuarios = results[0]
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
    if (req.cookies.jwtAdmin) {
        try {
            const decodificada = await promisify(jwtAdmin.verify)(req.cookies.jwtAdmin, process.env.JWT_ADMIN)
            console.log("Aver1 "+process.env.JWT_ADMIN)
            conexion.query('SELECT * FROM usuarios WHERE idusuario = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.usuarios = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/')
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    res.clearCookie('jwtAdmin')
    return res.redirect('/')
}