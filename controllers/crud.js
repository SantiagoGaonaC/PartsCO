const conexion = require('../database/db')

exports.update = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const email = req.body.email
    const rol = req.body.rol
    conexion.query('UPDATE usuarios SET ? WHERE id = ?',[{nombre:nombre, apellido:apellido, email:email, rol:rol}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/admin');         
        }
});
};