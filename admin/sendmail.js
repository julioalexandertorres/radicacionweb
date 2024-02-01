function enviar(){
 var varuser = document.getElementById("usuario").value;
 var varnombre = document.getElementById("nombre").value;
 var varcorreo = document.getElementById("correo").value;
 var varestado =  document.getElementById("estado").value;
 var vartipo =  document.getElementById("tipo").value;
 var proyectoschema = document.getElementById("selectproyecto").value;
 //console.log(proyectoschema);
if(varuser.length == 0 || varnombre == 0 || varcorreo == 0){
    if(varuser.length == 0){
        alert("Por favor diligencie el campo Usuario");
    }
    else if(varnombre == 0){
        alert("Por favor diligencie el campo Nombre");
    }
    else if(varcorreo == 0){
        alert("Por favor diligencie el campo Correo");
    }
}
else{
    var passw = "";
    var vid = "";
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
        passw += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   var varcontrasena = hex_md5(passw);
   for ( var i = 0; i < 14; i++ ) {
    vid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  var varid = "fid-" + vid;
  var varmunicipio = "demo";
  update_query("insert into usuario(nombre, email, usuario, contrasena, estado, id, tipo, proyecto) values ('"+varnombre+"', '"+varcorreo+"', '"+varuser+"', '"+varcontrasena+"', '"+varestado+"', '"+varid+"', '"+vartipo+"', '"+proyectoschema+"')");
 
  var data = {
    service_id: 'service_vuzereu',
    template_id: 'template_6l9nwuc',
    user_id: 'l9UJ5zeZStmGcpF_k',
    template_params: {
        'nombre': varnombre,
        'usuario': varuser,
        'contras': passw,
        'municipio': varmunicipio,
        'correo': varcorreo
  }
};

      $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
      }).done(function() {
      alert('Se ha enviado el usuario y contraseña al correo electronico ingresado');
      location.reload();
      }).fail(function(error) {
      alert('No fue posible enviar el correo electrónico, Por favor verifique que el campo correo electrónico se encuentre bien diligenciado, error: ' + JSON.stringify(error));
      });
    location.reload();
 }
}

function alertDGC(mensaje) {
    var dgcTiempo = 500;
    var ventanaCS = '<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">' + mensaje + '<br><div class="dgcAceptar">Aceptar</div></div></div></div></div>';
    $('body').append(ventanaCS);
    var alVentana = $('.dgcVentana').height();
    var alNav = $(window).height();
    var supNav = $(window).scrollTop();
    $('.dgcAlert').css('height', $(document).height());
    $('.dgcVentana').css('top', ((alNav - alVentana) / 2 + supNav - 100) + 'px');
    $('.dgcAlert').css('display', 'block');
    $('.dgcAlert').animate({opacity: 1}, dgcTiempo);
    $('.dgcCerrar,.dgcAceptar, .dgcCerrar2').click(function (e) {
        $('.dgcAlert').animate({opacity: 0}, dgcTiempo);
        setTimeout("$('.dgcAlert').remove()", dgcTiempo);
    });
}
window.alert = function (message) {
    alertDGC(message);
};