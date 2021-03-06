//Definimos el enrutador para que todo se haga facil y no se haga en el archivo principal APP
//Definir las rutas para las vistas y las rutas que se vana utilizar al llamar al controlador
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const conexion = require('../database/db')
const crud = require('../controllers/crud')

//RUTA PRINCIPAL DEL USUARIO / index.js
router.get('/', authController.Authenticated, (req,res)=>{
    
    conexion.query('SELECT * FROM articulos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('usuarios/index', {results:results, usuarios:req.usuarios, alert:true});
        }
    });
});

router.get('/login', (req,res)=>{
    res.render('login', {alert:false})
});
router.get('/register', (req,res)=>{
    res.render('register', {alert:false})
});

//RUTA PARA LA INFORMACION Y GESTIÓN DE USUARIOS
router.get('/admin', authController.AuthenticatedAdmin, (req,res)=>{
    conexion.query('SELECT * FROM usuarios', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin/admin.ejs', {results:results});
        }
    })
});
//RUTA PARA CREAR USUARIO POR ROL - DENTRO DEL PANEL (INFORMACION Y GESTIÓN DE USUARIOS)
router.get('/create', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('admin/create', {alert:false})
});

//RUTA EDITAR USUARIO, SE ENCUENTRA DENTRO DEL PANEL DE (INFORMACION Y GESTIÓN DE USUARIOS) COMO BOTÓN
router.get('/edit/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE idusuario = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('admin/edit.ejs', {usuarios:results[0],alert:false});            
        }        
    });
});

//RUTA ELIMINAR(INACTIVO-ACTIVO) USUARIO
router.get('/delete/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    const query_estado = 'SELECT estado from usuarios where idusuario = ?'
    query_id_estado = 'UPDATE usuarios SET estado = ? WHERE idusuario = ?'
    conexion.query(query_estado,[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{      
            const json = JSON.parse(JSON.stringify(results[0]));
            const estado = json[Object.keys(json)];
            if (estado=='Inactivo'){
                const estado_activo = 'Activo';
                conexion.query(query_id_estado,[estado_activo,id], (error, results)=>{
                    if(error){
                        console.log(error);
                    }else{      
                        res.redirect('/admin');   
                    }
                })
                
            }else{
                const estado_Inactivo = 'Inactivo';
                conexion.query(query_id_estado,[estado_Inactivo,id], (error, results)=>{
                    if(error){          
                        console.log(error);
                    }else{      
                        res.redirect('/admin');         
                    }
                })
            }  
        }
    })
});

//PANEL PRINCIPAL ADMIN DENTRO DE ESTE ESTÁN TODAS LAS RUTAS PARA QUE EL ADMIN SELECCIONE LA QUE QUIERA
router.get('/panel', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('admin/panel', {alert:false})
});

//Logs USUARIO | Historial | DEBE ESTAR LOGUEADO COMO ROL ADMIN
router.get('/logs', authController.AuthenticatedAdmin, (req,res)=>{
    //SELECT S.idsesion, S.fecha_sesion,U.idusuario,U.nombre FROM usuarios U JOIN sesiones S ON U.idusuario = S.usuarios_idusuario;
    conexion.query('SELECT S.idsesion, S.fecha_sesion,U.idusuario,U.nombre,U.apellido FROM usuarios U JOIN sesiones S ON U.idusuario = S.usuarios_idusuario', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin/logs.ejs', {results:results});
        }
    });
});

//NAV
router.get('/parcial/nav.ejs', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('parcial/nav.ejs')
});
router.get('/parcial/logout', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('/parcial/logout')
});

//SOLICITAR ARTICULO
router.get('/solicitar/:id', authController.Authenticated, (req, res) => {
    const id = req.params.id;

    let info_usuario = req.usuarios
    id_usuario = Object.values(info_usuario)[0]

    let query_1 = `INSERT INTO solicitudes(fecha_hora,valor_total,usuarios_idusuario,articulos_idarticulo) VALUES (DATE_FORMAT(NOW(),'%Y-%m-%d %h:%i:%s'),?*1.19,?,?);`;
    let query_2 = `SELECT valor FROM articulos where idarticulo=?`;

    conexion.query(query_2,[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{      
            const json = JSON.parse(JSON.stringify(results[0]));
            const valor = json[Object.keys(json)];         
            conexion.query(query_1,[valor,id_usuario,id], (error, results)=>{
                if(error){
                    console.log(error);
                }else{      
                    res.redirect('/');         
                }
            })    
        }
    })
});

//CRUD DE INFORMACIÓN DE PRODUCTOS | LO PUEDE EDITAR TANTO ADMIN COMO EMPLEADO 
router.get('/productos', authController.AuthenticatedAdmin, (req,res)=>{
    
    conexion.query('SELECT * FROM articulos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin/productos.ejs', {results:results, usuarios:req.usuarios});
        }
    });
});

//RUTA ELIMINAR PRODUCTO - CAMBIAR EL ELIMINAR A ACTUALIZAR
router.get('/eliminar/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM articulos WHERE idarticulo = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('productos.ejs');         
        }
    })
});

//EDITAR PARTE / ARTICULO
router.get('/editar/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM articulos WHERE idarticulo = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('admin/editar.ejs', {articulos:results[0],alert:false});            
        }        
    });
});

//CREAR PARTE / ARTICULO
router.get('/crear-parte', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('admin/crear-parte.ejs', {alert:false})
});

//SOLICITUDES EDITAR Y BORRAR LAS SOLICITUDES DE LOS USUARIOS
router.get('/solicitudes', authController.AuthenticatedAdmin, (req,res)=>{
    
    conexion.query('SELECT *,U.nombre AS nombreUser FROM solicitudes S JOIN usuarios U ON U.idusuario = S.usuarios_idusuario JOIN articulos A ON A.idarticulo = S.articulos_idarticulo', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin/solicitudes.ejs', {results:results});
        }
    });
});

//CAMBIAR ESTADO DE LA SOLICITUD - NO TERMINADA O TERMINADA
router.get('/terminar-solicitud/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    const query1 = 'select estado_solicitud from solicitudes where idsolicitud = ?'

    conexion.query(query1,[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{      
            const json = JSON.parse(JSON.stringify(results[0]));
            const estado = json[Object.keys(json)];
            if (estado=='No Terminada'){
                const terminada = 'Terminada';
                conexion.query('UPDATE solicitudes SET estado_solicitud= ? WHERE idsolicitud = ?',[terminada,id], (error, results)=>{
                    if(error){
                        console.log(error);
                    }else{      
                        res.redirect('/solicitudes');   
                    }
                })
            }else{
                const noTerminada = 'No Terminada';
                conexion.query('UPDATE solicitudes SET estado_solicitud= ? WHERE idsolicitud = ?',[noTerminada,id], (error, results)=>{
                    if(error){          
                        console.log(error);
                    }else{      
                        res.redirect('/solicitudes');         
                    }
                })
            }  
        }
    })
});

//ELIMINAR SOLICITUD
router.get('/eliminar-solicitud/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM solicitudes WHERE idsolicitud = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/solicitudes');         
        }
    })
});

//RUTA DESCUENTOS USUARIOS
router.get('/descuentos', authController.Authenticated, (req,res)=>{

    conexion.query('SELECT estado,descripcion,titulo FROM descuentos WHERE estado = 1', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('usuarios/descuentos.ejs', {results:results,usuarios:req.usuarios});
        }
    });
});

//DESCUENTOS: SE PUEDEN CREAR, EDITAR Y ELIMINAR LOS DESCUENTOS, TAMBIEN SU ESTADO, ACTIVO O INACTIVO
//HACE FALTA QUE CUANDO ESTEN INACTIVOS NO SE MUESTREN EN EL PANEL USUARIO
router.get('/descuentos-admin', authController.AuthenticatedAdmin, (req,res)=>{

    conexion.query('SELECT * FROM descuentos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin/descuentos-admin.ejs', {results:results,usuarios:req.usuarios});
        }
    });
});
//EDITAR LOS DESCUENTOS ADMINISTRATIVO
router.get('/editar-descuento/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM descuentos WHERE iddescuentos = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('admin/editar-descuento.ejs', {descuentos:results[0],alert:false});            
        }        
    });
});
//BORRAR LOS DESCUENTOS ADMINISTRATIVO
router.get('/borrar-descuento/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM descuentos WHERE iddescuentos = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/descuentos-admin');         
        }
    })
});

//CREAR DESCUENTO
router.get('/crear-descuento', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('admin/crear-descuento.ejs', {alert:false})
});


//RUTAS DE EMPLEADOS
router.get('/panelEmpleado', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('empleado/panelEmpleado.ejs', {alert:false})
});


//CREAR LA RUTA PARA EL EMPLEADO Y HACER UN SELECT DE TODOS LOS USUARIOS MENOS LOS ADMIN
router.get('/admin-empleado', authController.AuthenticatedAdmin, (req,res)=>{
    const admin = 'admin';
    const empleado = 'empleado'; 
    //SELECT * FROM usuarios WHERE rol != 'admin' and rol != 'empleado';
    conexion.query('SELECT * FROM usuarios WHERE rol != ? and rol != ?',[admin,empleado], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('empleado/admin-empleado.ejs', {results:results});
        }
    })
});

//RUTA PARA CREAR USUARIO POR ROL - DENTRO DEL PANEL EMPLEADO (INFORMACION Y GESTIÓN DE USUARIOS)
router.get('/create-empleado', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('empleado/create-empleado', {alert:false})
});


//RUTA EDITAR USUARIO, SE ENCUENTRA DENTRO DEL PANEL DE (INFORMACION Y GESTIÓN DE USUARIOS) COMO BOTÓN
router.get('/edit-empleado/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE idusuario = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('empleado/edit-empleado.ejs', {usuarios:results[0],alert:false});            
        }        
    });
});

//RUTA ELIMINAR(INACTIVO-ACTIVO) USUARIO
router.get('/delete-empleado/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    const query_estado = 'SELECT estado from usuarios where idusuario = ?'
    query_id_estado = 'UPDATE usuarios SET estado = ? WHERE idusuario = ?'
    conexion.query(query_estado,[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{      
            const json = JSON.parse(JSON.stringify(results[0]));
            const estado = json[Object.keys(json)];
            if (estado=='Inactivo'){
                const estado_activo = 'Activo';
                conexion.query(query_id_estado,[estado_activo,id], (error, results)=>{
                    if(error){
                        console.log(error);
                    }else{      
                        res.redirect('/admin-empleado');   
                    }
                })
            }else{
                const estado_Inactivo = 'Inactivo';
                conexion.query(query_id_estado,[estado_Inactivo,id], (error, results)=>{
                    if(error){          
                        console.log(error);
                    }else{      
                        res.redirect('/admin-empleado');         
                    }
                })
            }  
        }
    })
});

//ROUTER DE LOG PARA EL PANEL EMPLEADO
router.get('/logs-empleados', authController.AuthenticatedAdmin, (req,res)=>{
    conexion.query('SELECT S.idsesion, S.fecha_sesion,U.idusuario,U.nombre,U.apellido FROM usuarios U JOIN sesiones S ON U.idusuario = S.usuarios_idusuario', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('empleado/logs-empleados.ejs', {results:results});
        }
    });
});

//ROUTER PARA EL PANEL DE PRODUCTOS (CRUD) por parte del empleado
router.get('/productos-empleado', authController.AuthenticatedAdmin, (req,res)=>{
    
    conexion.query('SELECT * FROM articulos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('empleado/productos-empleado.ejs', {results:results, usuarios:req.usuarios});
        }
    });
});

router.get('/editar-parte-empleado/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM articulos WHERE idarticulo = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{
            res.render('empleado/editar-parte-empleado.ejs', {articulos:results[0],alert:false});            
        }        
    });
});

router.get('/crear-parte-empleado', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('empleado/crear-parte-empleado.ejs', {alert:false})
});

//RUTA PARA CREAR LA FACTURA
router.get('/factura/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    //SELECT U.idusuario, U.nombre, U.apellido, U.direccion, U.telefono, U.email, U.documento, S.idsolicitud, S.fecha_hora, S.valor_total, S.estado_solicitud, S.impuestos, S.usuarios_idusuario, S.articulos_idarticulo , A.idarticulo, A.nombre, A.descripcion, A.valor FROM usuarios U JOIN solicitudes S ON U.idusuario = S.usuarios_idusuario JOIN articulos A ON A.idarticulo = S.articulos_idarticulo where idsolicitud = ?
    conexion.query('SELECT now() AS FechaActual, U.idusuario, U.nombre AS nombreUser, U.apellido, U.direccion, U.telefono, U.email, U.documento, S.idsolicitud, S.fecha_hora, S.valor_total, S.estado_solicitud, S.impuestos, S.usuarios_idusuario, S.articulos_idarticulo , A.idarticulo, A.nombre, A.descripcion, A.valor FROM usuarios U JOIN solicitudes S ON U.idusuario = S.usuarios_idusuario JOIN articulos A ON A.idarticulo = S.articulos_idarticulo where idsolicitud = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{
            res.render('admin/facturas-admin.ejs', {results:results[0],alert:false});            
        }        
    });
});


//RUTA DEL PANEL PRINCIPAL PARA LOS DEL CONSORCIO
router.get('/panel-consorcio', authController.Authenticated, (req,res)=>{
    res.render('consorcio/panel-consorcio.ejs', {alert:false, usuarios:req.usuarios})
});

//RUTA INFORMACIÓN DE USUARIOS PARA EL ROL CONSORCIO
router.get('/usuarios-consorcio', authController.Authenticated, (req,res)=>{
    const admin = 'admin';
    const empleado = 'empleado'; 
    //SELECT * FROM usuarios WHERE rol != 'admin' and rol != 'empleado';
    conexion.query('SELECT * FROM usuarios WHERE rol != ?',[admin], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('consorcio/usuarios-consorcio.ejs', {results:results, usuarios:req.usuarios});
        }
    })
});

//RUTA PARA VER LOGS DE INGRESO USUARIOS PARA EL ROL CONSORCIO
router.get('/logs-consorcio', authController.Authenticated, (req,res)=>{
    conexion.query('SELECT S.idsesion, S.fecha_sesion,U.idusuario,U.nombre,U.apellido FROM usuarios U JOIN sesiones S ON U.idusuario = S.usuarios_idusuario', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('consorcio/logs-consorcio.ejs', {results:results, usuarios:req.usuarios});
        }
    });
});

//RUTA PARA VER EL INVENTARIO PARA EL ROL CONSORCIO
router.get('/productos-consorcio', authController.Authenticated, (req,res)=>{
    
    conexion.query('SELECT * FROM articulos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('consorcio/productos-consorcio.ejs', {results:results, usuarios:req.usuarios});
        }
    });
});

//RUTA PARA HISTORICO DE PRECIOS PARA EL ROL ADMIN 
router.get('/historico-precios', authController.AuthenticatedAdmin, (req,res)=>{
    conexion.query('SELECT A.idarticulo,A.valor,A.nombre,H.precio,H.idHarticulo,H.idHPrecios FROM articulos A JOIN hprecios H ON A.idarticulo = H.idHarticulo', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin/historico-precios.ejs', {results:results});
        }
    });
});

//RUTA PARA HISTORICO DE PRECIOS PARA EL ROL EMPLEADO
router.get('/historico-precios-empleado', authController.AuthenticatedAdmin, (req,res)=>{
    conexion.query('SELECT A.idarticulo,A.valor,A.nombre,H.precio,H.idHarticulo,H.idHPrecios FROM articulos A JOIN hprecios H ON A.idarticulo = H.idHarticulo', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('empleado/historico-precios.ejs', {results:results});
        }
    });
});

//RUTA PARA VER LAS SOLICITUDES ROL EMPLEADO
router.get('/solicitudes-empleado', authController.AuthenticatedAdmin, (req,res)=>{
    
    conexion.query('SELECT *,U.nombre AS nombreUser FROM solicitudes S JOIN usuarios U ON U.idusuario = S.usuarios_idusuario JOIN articulos A ON A.idarticulo = S.articulos_idarticulo', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('empleado/solicitudes-empleado.ejs', {results:results});
        }
    });
});

//RUTA DE ACCIÓN PARA CAMBIAR EL ESTADO DE LA SOLICITUD ROL EMPLEADO
router.get('/terminar-solicitud-empleado/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    const query1 = 'select estado_solicitud from solicitudes where idsolicitud = ?'

    conexion.query(query1,[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{      
            const json = JSON.parse(JSON.stringify(results[0]));
            const estado = json[Object.keys(json)];
            if (estado=='No Terminada'){
                const terminada = 'Terminada';
                conexion.query('UPDATE solicitudes SET estado_solicitud= ? WHERE idsolicitud = ?',[terminada,id], (error, results)=>{
                    if(error){
                        console.log(error);
                    }else{      
                        res.redirect('/solicitudes-empleado');   
                    }
                })
            }else{
                const noTerminada = 'No Terminada';
                conexion.query('UPDATE solicitudes SET estado_solicitud= ? WHERE idsolicitud = ?',[noTerminada,id], (error, results)=>{
                    if(error){          
                        console.log(error);
                    }else{      
                        res.redirect('/solicitudes-empleado');         
                    }
                })
            }  
        }
    })
});

//RUTA DE ACCIÓN PARA ELIMINAR LA SOLICITUD ROL EMPLEADO
router.get('/eliminar-solicitud-empleado/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM solicitudes WHERE idsolicitud = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/solicitudes-empleado');         
        }
    })
});


//RUTA PARA LA VISTA FACTURA DENTRO DEL ROL EMPLEADO
router.get('/factura-e/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    //SELECT U.idusuario, U.nombre, U.apellido, U.direccion, U.telefono, U.email, U.documento, S.idsolicitud, S.fecha_hora, S.valor_total, S.estado_solicitud, S.impuestos, S.usuarios_idusuario, S.articulos_idarticulo , A.idarticulo, A.nombre, A.descripcion, A.valor FROM usuarios U JOIN solicitudes S ON U.idusuario = S.usuarios_idusuario JOIN articulos A ON A.idarticulo = S.articulos_idarticulo where idsolicitud = ?
    conexion.query('SELECT now() AS FechaActual, U.idusuario, U.nombre AS nombreUser, U.apellido, U.direccion, U.telefono, U.email, U.documento, S.idsolicitud, S.fecha_hora, S.valor_total, S.estado_solicitud, S.impuestos, S.usuarios_idusuario, S.articulos_idarticulo , A.idarticulo, A.nombre, A.descripcion, A.valor FROM usuarios U JOIN solicitudes S ON U.idusuario = S.usuarios_idusuario JOIN articulos A ON A.idarticulo = S.articulos_idarticulo where idsolicitud = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{
            res.render('empleado/facturas-empleado.ejs', {results:results[0],alert:false});            
        }        
    });
});


//RUTA PARA LA VISTA DESCUENTOS DENTRO DEL ROL EMPLEADO
router.get('/descuentos-empleado', authController.AuthenticatedAdmin, (req,res)=>{

    conexion.query('SELECT * FROM descuentos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('empleado/descuentos-empleado.ejs', {results:results,usuarios:req.usuarios});
        }
    });
});


//EDITAR LOS DESCUENTOS EMPLEADO
router.get('/editar-descuento-e/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM descuentos WHERE iddescuentos = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('empleado/editar-descuento-empleado.ejs', {descuentos:results[0],alert:false});            
        }        
    });
});
//BORRAR LOS DESCUENTOS EMPLEADO
router.get('/borrar-descuento-e/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM descuentos WHERE iddescuentos = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/descuentos-empleado');         
        }
    })
});
//RUTA PARA CREAR DESCUENTO EMPLEADO
router.get('/crear-descuento-empleado', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('empleado/crear-descuento-empleado.ejs', {alert:false})
});

//router para metodos de controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/create', authController.registerAdmin) //Crear USUARIOS por parte del Administrador
router.post('/create-empleado', authController.registerEmpleado) //Crear USUARIOS por parte del EMPLEADO
router.post('/update', crud.update) //Actualizar USUARIOS por parte del ADMIN
router.post('/update-empleado', crud.updateEmpleado) //Actualizar USUARIOS por parte del EMPLEADO
router.post('/descuentosA', crud.descuentosA)
router.post('/descuentosEmpleado', crud.descuentosEmpleado)

router.post('/actualizarproductos', crud.actualizarproductos) //actualizarProductos
router.post('/crearproductos', crud.crearpartes)//ADMIN
router.post('/crearproductosEmpleado', crud.crearpartesEmpleado)//EMPLEADO
router.post('/crear-descuentos', crud.crearDescuento)
router.post('/crear-descuentos-empleado', crud.crearDescuentoEmpleado)
router.get('/logout', authController.logout)

module.exports = router