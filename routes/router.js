//Definimos el enrutador para que todo se haga facil y no se haga en el archivo principal APP
//Definir las rutas para las vistas y las rutas que se vana utilizar al llamar al controlador
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const conexion = require('../database/db')
const crud = require('../controllers/crud')

//router para vistas
router.get('/', authController.Authenticated, (req,res)=>{
    res.render('index')
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
    conexion.query('SELECT * FROM usuarios WHERE id=?',[id] , (error, results) => {
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
    conexion.query('DELETE FROM usuarios WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/admin');         
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