
document.addEventListener("DOMContentLoaded", function(event) { 
    //codigo aquí
        var select = validacionusuarios();
        //alert(select);
       // console.log(select[0][6]);
       if (navigator.vendor !== "Google Inc.") {
            location.href = "../index.html?ig=navegador";
        }
       if (select === null || select === undefined) {
            location.href = "../index.html?ig=error";
       }
      else {
            var ca = document.cookie.split('=');
            /*var select1 = search("risaralda:activUser", ca[0]);
            if (select1[0][0] === 0) {
                // document.getElementById("completo").style.display = 'block';
                // document.getElementById("termin").style.display = 'block';
            }*/
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
            var hour = f.getHours();
            if (f.getMinutes() < 10) {
                var minute = '0' + f.getMinutes();
            } else {
                var minute = f.getMinutes();
            }
            if (f.getSeconds() < 10) {
                var second = '0' + f.getSeconds();
            } else {
                var second = f.getSeconds();
            }
            var fecha = f.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "Z";
            //console.log(fecha);
            /*var payload= '<Transaction xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:chia="chia" xmlns:gml="http://www.opengis.net/gml" version="1.1.0" service="WFS" xsi:schemaLocation="http://35.226.110.153:8081/geoserver"> <Insert xmlns="http://www.opengis.net/wfs"> <chia:reguser> <usuario>'+ca[0]+'</usuario> <actividad>'+'ingreso'+'</actividad><fecha>'+fecha+'</fecha></chia:reguser> </Insert></Transaction>';*/
            // $.ajax({
            //         url:'http://35.226.110.153:8081/geoserver/chia/ows',
            //         type: 'POST',
            //         dataType: 'xml',
            //         contentType: 'text/xml',
            //         async: false,
            //         data: payload,
            //         success: function (xml) {
            //             },
            //         error: function (xml) {
            //                 console.log('error');
            //             }
            //         });          
            
        }
});
    
    function validacionusuarios() {   
      var ca = document.cookie.split('=');
      //console.log(ca[0]);
      //console.log(ca[1]);
        if (ca["0"] === "") {
            location.href = "../index.html?ig=error";
        } else {
            try {
                //var select = search("wfs:ValidateUser", ca[0], ca[1]);
                var select = select_query("select * from usuario where usuario = '" + ca[0] + "' and contrasena = '" + ca[1] + "'");
                document.getElementById("carga").style.display = "none";
                document.getElementById("labelusuario").innerHTML = select[0][2].split(" ", 1);            
            } catch (err) {
         }
            //console.log(select);
            return(select);
        }
    }
    function importarScript(nombre) {
        var s = document.createElement("script");
        s.src = nombre;
        document.querySelector("head").appendChild(s);
    }
    
    function password() {
        var ca = document.cookie.split('=');
        var select = search("chia:ValidateUser", ca[0], hex_md5(document.getElementById('password').value), "t");
        //console.log(select[0][5]);
        if (select === null || select.length === 0) {
            alert("Contraseña incorrecta");
        } else if (document.getElementById("newpassword").value === document.getElementById("cpassword").value) {
            var postData = '<Transaction service="WFS" xmlns="http://www.opengis.net/wfs" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://35.223.81.219:8080/geoserver/schemas/wfs/1.1.0/wfs.xsd">\
                <Update typeName="chia:usuario">\
                    <Property>\
                        <Name>contrasena</Name>\
                        <Value>' + hex_md5(document.getElementById('newpassword').value) + '</Value>\
                    </Property>\
                    <Filter>\
                        <FeatureId fid="usuario.' + select[0][5] + '"/>\
                    </Filter>\
                </Update>\
            </Transaction>';
            rooturl = geoserver+'chia/ows?';
            $.ajax({
                type: "POST",
                url: rooturl,
                dataType: "xml",
                async: false,
                contentType: "text/xml",
                data: postData,
                success: function (xml) {
                    //console.log(xml);
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

