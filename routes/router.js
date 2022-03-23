//Definimos el enrutador para que todo se haga facil y no se haga en el archivo principal APP
//Definir las rutas para las vistas y las rutas que se vana utilizar al llamar al controlador
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const conexion = require('../database/db')
const crud = require('../controllers/crud')

//router para vistas
router.get('/', authController.Authenticated, (req,res)=>{
    
    conexion.query('SELECT * FROM articulos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('index', {results:results, usuarios:req.usuarios});
        }
    });
})

router.get('/login', (req,res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req,res)=>{
    res.render('register', {alert:false})
})
router.get('/admin', authController.AuthenticatedAdmin, (req,res)=>{
    conexion.query('SELECT * FROM usuarios', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin', {results:results});
        }
    })
})

router.get('/create', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('create', {alert:false})
})

//RUTA EDITAR USUARIO
router.get('/edit/:id', authController.AuthenticatedAdmin, (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE idusuario = ?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit.ejs', {usuarios:results[0],alert:false});            
        }        
    });
});

//RUTA ELIMINAR USUARIO
router.get('/delete/:id', authController.AuthenticatedAdmin, (req, res) => {
    const id = req.params.id;
    const estado = 'No Activo'
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

//PANEL PRINCIPAL ADMIN
router.get('/panel', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('panel', {alert:false})
})

//Logs USUARIO | Historial
router.get('/logs', authController.AuthenticatedAdmin, (req,res)=>{
    conexion.query('SELECT * FROM sesiones', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('logs.ejs', {results:results});
        }
    });
})

//NAV
router.get('/parcial/nav.ejs', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('parcial/nav.ejs')
})
router.get('/parcial/logout', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('/parcial/logout')
})



//SOLICITAR ARTICULO
router.get('/solicitar/:id', authController.Authenticated, (req, res) => {
    const id = req.params.id;

    let info_usuario = req.usuarios
    id_usuario = Object.values(info_usuario)[0]

    let query_1 = `INSERT INTO solicitudes(fecha_hora,valor_total,usuarios_idusuario,articulos_idarticulo) VALUES (NOW(),?*1.19,?,?);`;
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

//INFORMACIÓN DE PRODUCTOS - ADMIN
router.get('/productos', authController.AuthenticatedAdmin, (req,res)=>{
    
    conexion.query('SELECT * FROM articulos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('productos.ejs', {results:results, usuarios:req.usuarios});
        }
    });
})


//RUTA ELIMINAR PRODUCTO
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
            res.render('editar.ejs', {articulos:results[0],alert:false});            
        }        
    });
});

//CREAR PARTE / ARTICULO
router.get('/crear-parte', authController.AuthenticatedAdmin, (req,res)=>{
    res.render('crear-parte.ejs', {alert:false})
})


//VER SOLICITUDES
router.get('/solicitudes', authController.AuthenticatedAdmin, (req,res)=>{
    
    conexion.query('SELECT * FROM solicitudes', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('solicitudes.ejs', {results:results});
        }
    });
})


//HACER UN IF- SI ESTÁ TERMINADA PONER NO TERMINADA - SI ESTÁ NO TERMINADA PONER TERMINADA
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


//router para metodos de controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/create', authController.registerAdmin)
router.post('/update', crud.update)

router.post('/actualizarproductos', crud.actualizarproductos) //actualizarProductos
router.post('/crearproductos', crud.crearpartes)
router.get('/logout', authController.logout)


module.exports = router