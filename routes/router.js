//Definimos el enrutador para que todo se haga facil y no se haga en el archivo principal APP
//Definir las rutas para las vistas y las rutas que se vana utilizar al llamar al controlador
const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')


const {validationResult, check} = require('express-validator')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})

//rputer para vistas
router.get('/', authController.Authenticated, (req,res)=>{
    res.render('index')
})
router.get('/login', (req,res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req,res)=>{
    res.render('register')
})


//router para metodos de controller
router.post('/register',[
    check('nombre','Ingrese un nombre valido').exists().isLength({min: 4, max: 20}),
    check('apellido','Ingrese apellido valido').exists().isLength({min: 4, max: 20}),
    check('email','Ingrese email valido').exists().isEmail().isLength({min: 4, max: 30}),
    check('password','Ingrese contraseña valida').exists().isLength({min: 4, max: 30})   
], (req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(req.body)
            const valores = req.check
            const errores = errors.array()
            res.render('register', {errores:errores, valores:valores})
        }
        // If no error occurs, then this
        // block of code will run
        else {
            authController.register
        }
})
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router