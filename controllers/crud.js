const conexion = require('../database/db');
const NotifySweetAlert = require('../models/NotifySweetAlert');

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


exports.updateEmpleado = (req, res)=>{
    const idusuario = req.body.idusuario;
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const email = req.body.email

    //const password = req.body.password °°°°°°°°°°°°°°°°

    const telefono = req.body.telefono
    const direccion = req.body.direccion

    const ndocumento = req.body.ndocumento
    const tdocumento = req.body.tdocumento
    const documento = tdocumento + ' ' +ndocumento

    conexion.query('UPDATE usuarios SET ? WHERE idusuario = ?',[{nombre:nombre, apellido:apellido, email:email,telefono:telefono,direccion:direccion,documento:documento}, idusuario], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/admin-empleado');         
        }
});
};


exports.actualizarproductos = (req, res)=>{

    const idarticulo = req.body.idarticulo
    const nombre = req.body.nombre
    const stock = req.body.stock
    const valor = req.body.valor
    const estado = req.body.estado
    const descripcion = req.body.descripcion
    const categoria = req.body.categoria

    conexion.query('INSERT INTO HPrecios (select NULL, valor, idarticulo FROM articulos WHERE idarticulo = ?)',[idarticulo]);
    conexion.query('UPDATE articulos SET ? WHERE idarticulo = ?',[{nombre:nombre, stock:stock, valor:valor, estado:estado,descripcion:descripcion, categoria:categoria}, idarticulo], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/productos');         
        }
    });
};

exports.crearpartes = (req, res)=>{
    const nombre = req.body.nombre
    const stock = req.body.stock
    const valor = req.body.valor
    const estado = req.body.estado
    const descripcion = req.body.descripcion
    const categoria = req.body.categoria

    if(!nombre || !stock || !valor || !estado || !descripcion || !categoria){
        res.render('admin/crear-parte.ejs', NotifySweetAlert.NadaCrearParte())
    }else{
        conexion.query('INSERT INTO articulos SET ?',[{nombre:nombre, stock:stock, valor:valor, estado:estado, descripcion:descripcion, categoria:categoria}], (error, results)=>{
            if(error){
                console.log(error);
            }else{           
                res.redirect('/productos');         
            }
        });
    }
}

exports.crearpartesEmpleado = (req, res)=>{
    const nombre = req.body.nombre
    const stock = req.body.stock
    const valor = req.body.valor
    const estado = req.body.estado
    const descripcion = req.body.descripcion
    const categoria = req.body.categoria

    if(!nombre || !stock || !valor || !estado || !descripcion || !categoria){
        res.render('empleado/crear-parte-empleado.ejs', NotifySweetAlert.NadaCrearParteEmpleado())
    }else{
        conexion.query('INSERT INTO articulos SET ?',[{nombre:nombre, stock:stock, valor:valor, estado:estado, descripcion:descripcion, categoria:categoria}], (error, results)=>{
            if(error){
                console.log(error);
            }else{           
                res.redirect('/productos-empleado');         
            }
        });
    }
}

exports.descuentosA = (req, res)=>{
    const iddescuentos = req.body.iddescuentos;
    const titulo = req.body.titulo
    const estado = req.body.estado
    const descripcion = req.body.descripcion

    conexion.query('UPDATE descuentos SET ? WHERE iddescuentos = ?',[{titulo:titulo, estado:estado, descripcion:descripcion}, iddescuentos], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/descuentos-admin');         
        }
});
};


exports.crearDescuento = (req, res)=>{
    const titulo = req.body.titulo
    const estado = req.body.estado
    const descripcion = req.body.descripcion


    conexion.query('INSERT INTO descuentos SET ?',[{titulo:titulo, estado:estado, descripcion:descripcion}], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/descuentos-admin');         
        }
    });
}