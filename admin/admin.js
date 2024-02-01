window.onload = function () {
   
var ca = document.cookie.split('=');
    try {
        var select = search("amco:ValidateUserAmco", ca[0], ca[1]);
        //console.log(select);
    } catch (err) {
        select = null;
    }
    if (navigator.vendor !== "Google Inc.") {
        location.href = "index.html?ig=navegador";
    }
    if (select === null || select.length === 0) {
        location.href = "index.html";
    }

}
    

function Sourceuser(requestString, responseFunc) {
   
    var querystr = requestString.term.replace(/[^0-9a-zA-Z ]/g, "");
    if (querystr.length === 0) {
        response([]);
        return;
    }
    var viewParamsStr = viewparamsToStr({
        query: querystr
    });
    var wfsParams = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: 'amco:BuscarUsuarioAmco',
        outputFormat: 'application/json',
        srsname: 'EPSG:3857',
        viewparams: viewParamsStr
    };
    $.ajax({
        url: 'https://www.geoserverssl.site:8443/geoserver/ows?',
        data: wfsParams,
        type: "GET",
        dataType: "json",
        success: function (data, status, xhr) {
            var arr = [];
            for (i = 0; i < data.features.length; i++) {
                arr.push({
                    nombre: data.features[i].properties.nombre,
                    value: data.features[i].properties.usuario,
                    creacion: data.features[i].properties.creacion,
                    caducidad: data.features[i].properties.caducidad,
                    entidad: data.features[i].properties.entidad,
                    email: data.features[i].properties.email,
                    estado: data.features[i].properties.estado,
                    id: data.features[i].properties.id,
                    tipo: data.features[i].properties.tipo
                });
            }
            if (arr.length !== 0) {
                responseFunc(arr);
            } else {
                arr[0] = "No se encuentra informacion asociada a la consulta";
                responseFunc(arr);
            }
        },
        error: function (jqXHR, exception) {
           // console.log(jqXHR);
           // console.log(exception);
        }
    });
}
function SelectUser(event, ui) {
    var select = [];
    select[0] = [];
    for (j = 0; j < Object.keys(ui.item).length; j++) {
        var a = Object.keys(ui.item)[j];
        select[0][j] = ui.item[a];
    }
    userid = select[0][7];
    estadoact = select[0][6];
    var nomb = select[0][0].split(" ");
    var fechaexpi = select[0][3].replace("Z", "");
    var fecgacre = select[0][2].replace("Z", "");
    var usuari = select[0][0];
    try{
    var utling = search("amco:ulting", select[0][1]);
    var utling = utling[0][0].replace("T", " ");
    var utling = utling.replace("Z", " ");
    }
    catch(err){
    var utling = "Sin Ingresos";    
    }
    
    document.getElementById('titul').innerHTML= "Modificar Usuario";
    document.getElementById('pnombre').value = nomb[0];
    document.getElementById('papellido').value = nomb[1];
    document.getElementById('correoelec').value = select[0][5];
    document.getElementById('entid').value = select[0][4];
    document.getElementById('dependencia').value = select[0][8];
    //document.getElementById('fechaexp').innerHTML = select[0][3];
    document.getElementById("fechaexp").value = fechaexpi;
    document.getElementById("usuariotext").innerHTML = select[0][0]; 
    document.getElementById("labelcorreo").innerHTML = select[0][5];
    document.getElementById("labelpersp").innerHTML = select[0][8];
    document.getElementById("fechcre").innerHTML = fecgacre;
    document.getElementById("feching").innerHTML = utling;
    document.getElementById("fechcad").innerHTML = fechaexpi;
    document.getElementById("creausu").disabled = true;
    document.getElementById("pnombre").disabled = true;
    document.getElementById("papellido").disabled = true;
    document.getElementById("modusu").disabled = false;
    document.getElementById("usudesac").disabled = false;
    if(select[0][6] == true){
    document.getElementById("textdesh").innerHTML = "Deshabilitar Usuario"; 
    }
    else{
    document.getElementById("textdesh").innerHTML = "Habilitar Usuario";    
    }

    //userid = select[0][3];
    //document.getElementById('pnombre').value = select[0][1];
}

function actualizar() {
  var postData = '<Transaction service="WFS" xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://35.184.176.7:8081/geoserver/schemas/wfs/1.1.0/wfs.xsd"><Update typeName="user:usuarioamco"><Property><Name>email</Name><Value>' + document.getElementById('correoelec').value + '</Value></Property><Filter><FeatureId fid="usuarioamco.' + userid + '"/></Filter><Property><Name>entidad</Name><Value>' + document.getElementById('entid').value + '</Value></Property><Filter><FeatureId fid="usuarioamco.' + userid + '"/></Filter><Property><Name>tipo</Name><Value>' + document.getElementById('dependencia').value + '</Value></Property><Filter><FeatureId fid="usuarioamco.' + userid + '"/></Filter><Property><Name>caducidad</Name><Value>' + document.getElementById('fechaexp').value + '</Value></Property><Filter><FeatureId fid="usuarioamco.' + userid + '"/></Filter></Update></Transaction>';
  rooturl = 'http://35.184.176.7:8081/geoserver/user/ows?';

    $.ajax({
        type: "POST",
        url: rooturl,
        dataType: "xml",
        async: false,
        contentType: "text/xml",
        data: postData,
        success: function (xml) {
            alert('Datos actualizados con exito');
        },
        error: function (xml) {
            alert('Los datos NO se actualizaron');
        }
    });
}
function desactivar() {
   //console.log(estadoact);
    var estadoact2 = estadoact.toString();
   // console.log(estadoact2);
  if(estadoact2 === "true"){
      console.log("deshabilitar");
    var actest = false;
    console.log(actest);
    }
    else if(estadoact2 === "false"){
    console.log("habilitar");
    var actest = true;
    console.log(actest);
    }
  var postData = '<Transaction service="WFS" xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://35.184.176.7:8081/geoserver/schemas/wfs/1.1.0/wfs.xsd"><Update typeName="user:usuarioamco"><Property><Name>estado</Name><Value>'+actest+'</Value></Property><Filter><FeatureId fid="usuarioamco.' + userid + '"/></Filter></Update></Transaction>';
  rooturl = 'http://35.184.176.7:8081/geoserver/user/ows?';

    $.ajax({
        type: "POST",
        url: rooturl,
        dataType: "xml",
        async: false,
        contentType: "text/xml",
        data: postData,
        success: function (xml) {
            alert('Datos actualizados con exito');
            if(estadoact2 === "true"){
                document.getElementById("textdesh").innerHTML = "Deshabilitar Usuario"; 
            }
            else{
                document.getElementById("textdesh").innerHTML = "Habilitar Usuario";    
            }
        },
        error: function (xml) {
            alert('Los datos NO se actualizaron');
        }
    });
}
function saveuser() {
    var nom1 = document.getElementById('pnombre').value.toUpperCase(); 
    nom1 = MaysPrimera(nom1.toLowerCase());
    var apell1 = document.getElementById('papellido').value.toUpperCase();
    apell1 = MaysPrimera(apell1.toLowerCase());
    var correoelec = document.getElementById('correoelec').value;
    var entidad = document.getElementById('entid').value;
    var dependenc = document.getElementById('dependencia').value;
    var fechaexp = document.getElementById('fechaexp').value;
    var f = new Date();
    if ((f.getMonth() + 1) < 10) {
            var month = '0' + (f.getMonth() + 1);
    } else {
            var month = (f.getMonth() + 1);
    }
    if (f.getDate() < 10) {
            var day = '0' + f.getDate();
    } else {
            var day = f.getDate();
    }
    var fechad = f.getFullYear() + "-" + month + "-" + day;
    var nomg = nom1 + apell1;
    var cont = nomg + "2020";
    var contrasena = hex_md5(cont);
    var arrayResult = '<Transaction xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:user="user" xmlns:gml="http://www.opengis.net/gml" version="1.1.0" service="WFS" xsi:schemaLocation="http://35.184.176.7:8081/geoserver">\
     <Insert xmlns="http://www.opengis.net/wfs">\
     <user:usuarioamco>\
     <nombre>' + nom1 + ' ' + apell1 + '</nombre>\
     <email>' + document.getElementById('correoelec').value + '</email>\
     <usuario>' + nomg + '</usuario>\
     <tipo>' + dependenc + '</tipo>\
     <contrasena>' + contrasena + '</contrasena>\
     <estado>' + true + '</estado>\
     <creacion>' + fechad + '</creacion>\
     <caducidad>' + fechaexp + '</caducidad>\
     <entidad>' + entidad + '</entidad>\
     </user:usuarioamco>\
     </Insert>\
     </Transaction>';
   // console.log(arrayResult);
    rooturl = 'http://35.184.176.7:8081/geoserver/user/ows?';
    var res = $.ajax({
        type: "POST",
        url: rooturl,
        dataType: "xml",
        contentType: "text/xml",
        async: false,
        data: arrayResult,
        success: function (xml) {
        },
        error: function (xml) {
            //console.log('error');
        }
    });
    if (res.responseText.substring(0, 62) === '<?xml version="1.0" encoding="UTF-8"?><wfs:TransactionResponse') {  
        /*var urls = "./mail/envio_mail.php";
        var req = new ajaxRequest();
        var url = urls + "?c=" + document.getElementById('email').value + "&u=" + nomg + "&p=" + cont;
        req.open("GET", url, false);
        req.send();*/
        
    /*   var settings = {
            "url": "https://us-central1-proy-gcp-001.cloudfunctions.net/serverAmco/api/user/admin/mailRegister/",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({"name":"lizzz","typeMsg":"Registro","lastName":"Apellido","email":"julioalexandertorres@gmail.com"}),
          };
          $.ajax(settings).done(function (response) {
          }); */
        
        
        
        $.ajax({
            url: "https://us-central1-proy-gcp-001.cloudfunctions.net/serverAmco/api/user/admin/mailRegister/",       
            async: false,    
            type: "POST",
            dataType: "json", 
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            }, 
            data: JSON.stringify({
                name:nom1, 
                lastName:apell1,
                typeMsg:'Registro exitoso',
                email:correoelec
        }),
            success: function(response){
              alert('Se envió un mail al correo ingresado');
            },
            error: function (err) {
              alert('Error no fue posible enviar el correo</br>${err.responseText}');
            }
        })
         
    } 
    else {
        alert("El usuario o correo electronico ya se encuentra registrado");
    } 
}

function password() {
    var ca = document.cookie.split('=');
    //console.log(ca);
    var select = search("preproduccion:ValidateUserAmco", ca[0], hex_md5(document.getElementById('password').value), "t");
    //console.log(select);
    //console.log(document.getElementById('password').value);
    //console.log(hex_md5(document.getElementById('password').value));
    if (select === null || select.length === 0) {
        alert("Contraseña incorrecta");
    } else if (document.getElementById("newpassword").value === document.getElementById("cpassword").value) {
        var postData = '<Transaction service="WFS" xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs https://www.geoserverssl.site:8443/geoserver/schemas/wfs/1.1.0/wfs.xsd">\
            <Update typeName="user:usuarioamco">\
                <Property>\
                    <Name>contrasena</Name>\
                    <Value>' + hex_md5(document.getElementById('newpassword').value) + '</Value>\
                </Property>\
                <Filter>\
                    <FeatureId fid="usuario.' + select[0][18] + '"/>\
                </Filter>\
            </Update>\
        </Transaction>';
        rooturl = 'http://35.184.3.4:8080/geoserver/user/ows?';
        $.ajax({
            type: "POST",
            url: rooturl,
            dataType: "xml",
            async: false,
            contentType: "text/xml",
            data: postData,
            success: function (xml) {
                alert('Datos actualizados con exito');
            },
            error: function (xml) {
                alert('Los datos NO se actualizaron');
            }
        });
        $('#myModal').modal('hide');
    } else {
        alert("La contraseña nueva y su confirmacion no coinciden");
    }
    return;
}

function MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ajaxRequest() {
    try {
        var request = new XMLHttpRequest();
    } catch (e1) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e3) {
                request = false;
            }
        }
    }
    return request;
}

function mostpers(pers)
{
   // console.log(pers);
    $(".card-body"+pers+"").toggle();
    /*document.getElementById("pamc").style.visibility = "visible";
    document.getElementById("pamc").style.display = "initial";
    document.getElementById("pamc").style.display = "block";*/
}
