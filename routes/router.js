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
    conexion.query('DELETE FROM usuarios WHERE idusuario = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/admin');         
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


//router para metodos de controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/create', authController.registerAdmin)
router.post('/update', crud.update)
router.get('/logout', authController.logout)


module.exports = router