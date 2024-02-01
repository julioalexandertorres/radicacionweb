function resetpass(){
    var valorinp = document.getElementById("email").value;
    var validemail = select_query("select * from usuario where email = '"+valorinp+"'");
    //console.log(validemail);
    if(validemail == null) {
        alert("El correo electrónico ingresado no se encuentra en la base de datos, por favor verifique que este diligenciado correctamente");
    }
    else{
        var passw = "";
        var varnombre = validemail[0][0];
        var varuser = validemail[0][2];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 8; i++ ) {
            passw += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
       var varcontrasena = hex_md5(passw);
       update_query("update usuario set contrasena = '"+varcontrasena+"' where email = '"+valorinp+"'");
       var data = {
        service_id: 'service_vuzereu',
        template_id: 'template_47zc87w',
        user_id: 'l9UJ5zeZStmGcpF_k',
        template_params: {
            'nombre': varnombre,
            'usuario': varuser,
            'contras': passw,
            'correo': valorinp
      }
    };
    
          $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json'
          }).done(function() {
          alert('Se ha enviado la nueva contraseña al correo electronico ingresado');
          location.reload();
          }).fail(function(error) {
          alert('No fue posible enviar el correo electrónico, Por favor verifique que el campo correo electrónico se encuentre bien diligenciado, error: ' + JSON.stringify(error));
          });   
     }
}  
