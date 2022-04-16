class NotifySweetAlert {

  NoEmailNoPassword() {
      return {
        alert:true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y password validos",
        alertIcon: 'info',
        showConfirmButton: true,
        timer: false,
        ruta: 'login'
      }
  }
  NoExistEmail(){
    return {
      alert:true,
      alertTitle: "Error",
      alertMessage: "El correo electrónico que ingresaste no está conectado a una cuenta.",
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
        alertMessage: "Email y/o contraseña incorrecta",
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
      ruta: 'panel'
    }
  }
  EmpleadoLoginUp(){
    return {
      alert:true,
      alertTitle: "Conexión exitosa",
      alertMessage: "Login Admin exitoso",
      alertIcon: 'success',
      showConfirmButton: false,
      timer: 600,
      ruta: 'panelEmpleado'
    }
  }
  UserPassEmail(){
    return{
      alert:true,
      alertTitle: "Error",
      alertMessage: "Email y/o contraseña incorrecta",
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
  NadaRegisterUser(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "Ingrese los datos del formulario completos",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'register'
    }
  }
  TamañoRegisterUser(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "Ingrese datos validos",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'register'
    }
  }
  EmailRegisterUser(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "Digite un email valido",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'register'
    }
  }
  ExisteMailUser(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "El email ya existe",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'register'
    }
  }
  NadaregisterAdmin(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "Ingrese un usuario y password ADMIN",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'create'
    }
  }
  TamañoRegisterAdmin(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "Ingrese datos validos",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'create'
    }
  }
  EmailRegisterAdmin(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "Digite un email valido",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'create'      
    }
  }
  ExisteMailAdmin(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "El email ya existe",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'create'
    }
  }
  RegistroExitoso(){
    return {
      alert:true,
      alertTitle: "Registo exitoso",
      alertMessage: "La cuenta ha sido registra correctamente",
      alertIcon: 'success',
      showConfirmButton: false,
      timer: 1200,
      ruta: 'login'
    }
  }
  RegistroExitosoEmpleado(){
    return {
      alert:true,
      alertTitle: "Registo exitoso",
      alertMessage: "La cuenta ha sido registra correctamente",
      alertIcon: 'success',
      showConfirmButton: false,
      timer: 1200,
      ruta: 'admin-empleado'
    }
  }
  NadaCrearParte(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "Ingrese los datos del formulario completos",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'crear-parte'
    }
  }
  NadaCrearParteEmpleado(){
    return{
      alert:true,
      alertTitle: "Advertencia",
      alertMessage: "Ingrese los datos del formulario completos",
      alertIcon: 'info',
      showConfirmButton: true,
      timer: false,
      ruta: 'crear-parte-empleado'
    }
  }
}


module.exports = new NotifySweetAlert();