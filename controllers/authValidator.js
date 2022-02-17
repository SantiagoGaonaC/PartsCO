const {body, validationResult} = require('express-validator')
const router = require('../routes/router')
class authValidator{
    register() {
        return [
            body('nombre','Ingrese un nombre valido').exists().isLength({min: 4, max: 20}),
            body('apellido','Ingrese apellido valido').exists().isLength({min: 4, max: 20}),
            body('email','Ingrese email valido').exists().isEmail().isLength({min: 4, max: 30}),
            body('password','Ingrese contraseña valida').exists().isLength({min: 4, max: 30})   
        ]
    }
    validationForm() {
      router.post('/register',(req, res)=>{
        //validación propia    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(req.body)
            const valores = req.body
            const validaciones = errors.array()
            res.render('register', {validaciones:validaciones, valores: valores})
        }
      }
    )  
  }
}
module.exports = new authValidator();



