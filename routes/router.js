//Definimos el enrutador para que todo se haga facil y no se haga en el archivo principal APP
//Definir las rutas para las vistas y las rutas que se vana utilizar al llamar al controlador
const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index')
})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/register', (req,res)=>{
    res.render('register')
})

module.exports = router