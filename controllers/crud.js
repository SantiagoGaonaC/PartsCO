const conexion = require('../database/db')

exports.update = (req, res)=>{
    const idusuario = req.body.idusuario;
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const email = req.body.email
    const rol = req.body.rol


    //const password = req.body.password °°°°°°°°°°°°°°°°

    const telefono = req.body.telefono
    const direccion = req.body.direccion

    const ndocumento = req.body.ndocumento
    const tdocumento = req.body.tdocumento
    const documento = tdocumento + ' ' +ndocumento


    conexion.query('UPDATE usuarios SET ? WHERE idusuario = ?',[{nombre:nombre, apellido:apellido, email:email, rol:rol,telefono:telefono,direccion:direccion,documento:documento}, idusuario], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/admin');         
        }
});
};