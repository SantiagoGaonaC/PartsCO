/*Referente a la conexión MySQL

GENERAR LA CONEXIÓN A LA BASE DE DATOS*/

const mysql = require('mysql'); //modulo que permite la conexión
const connection = mysql.createConnection({
    host: process.env.DB_HOST, //Uso de variables de entorno
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((error)=>{
    if(error){
        console.log('Error de conexión BD es: ' +error);
        return; 
    }
    console.log("Conexión DataBase exitosa");
}); //saber si la conexión está OK y si hay error que lo muestre

setInterval(function () {
    connection.query('SELECT 1');
}, 5000);

module.exports = connection; //exportando todo el modulo para llamarlo