class NotifySweetAlert {
    NoEmailNoPassword() {
        return {
          alert:true,
          alertTitle: "Advertencia",
          alertMessage: "Ingrese un usuario y password",
          alertIcon: 'info',
          showConfirmButton: true,
          timer: false,
          ruta: 'login'
        }
    }
    AdminPassEmail() {
        return {
          alert:true,
          alertTitle: "Error",
          alertMessage: "Email Contraseña incorrectas admin",
          alertIcon: 'error',
          showConfirmButton: true,
          timer: false,
          ruta: 'login'
      }
    }
    AdminLoginUp(){
      return {
        alert:true,
        alertTitle: "Conexión exitosa",
        alertMessage: "Login Admin exitoso",
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 600,
        ruta: 'admin'
      }
    }
    UserPassEmail(){
      return{
        alert:true,
        alertTitle: "Error",
        alertMessage: "Email y/o contraseña incorrectas",
        alertIcon: 'error',
        showConfirmButton: true,
        timer: false,
        ruta: 'login'
      }
    }
    UserLoginUp(){
      return{
          alert:true,
          alertTitle: "Conexión exitosa",
          alertMessage: "Login exitoso",
          alertIcon: 'success',
          showConfirmButton: false,
          timer: 600,
          ruta: ''
      }
    }
}

class NotifySweetAlertAdmin{

}


module.exports = new NotifySweetAlert();
module.exports = new NotifySweetAlertAdmin();