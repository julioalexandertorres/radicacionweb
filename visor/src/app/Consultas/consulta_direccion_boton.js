function buscardirboton() {
    if (document.getElementById("inputdirecciontotemp").value !== "") {
        var values = document.getElementById("inputdirecciontotemp").value;
        var codigoreg1 = search("preproduccion:buscar_dir_boton", values);
        //console.log(codigoreg1);
        if (codigoreg1.length === 0 || !(codigoreg1)) {
            if (modulo === "totempruebas") {
                alert("GESSTOR INFORMA:</br></br> No se encuentra información geográfica asociada a la consulta en la base de datos Catastral. Por favor intente lo siguiente:</br> 1). Ingrese la dirección mediante abreviaturas, ejemplo: (calle) C 45 25 07 ó (Carrera) K 35 48 31</br> 2). Obtenga una ubicación aproximada mediante el Georeferenciador:</br> <input type='image' id='indicadorgeo' name='boton_geocoder' src='imagenes/geocoder.png' onclick='busqueda(name)'>");
            } else {
                //document.getElementById("menu_predio").style.display = "none";
                //document.getElementById("volver").style.display = "none";
                document.getElementById("inputdirecciontotemp").style.display = "none";
                document.getElementById("buscar_ref").style.display = "none";
                alert("GESSTOR INFORMA:</br></br> No se encuentra información geográfica asociada a la consulta en la base de datos Catastral. Por favor intente lo siguiente:</br> Ingrese la dirección mediante el siguiente recuadro</br> el resultado es una aproximacion de la malla vial oficial o el resultado del geocodificador de Google </br> <input type='image' id='indicadorgeo' name='boton_geocoder' src='imagenes/geocoder.png' onclick='busqueda(name)'>");
                busqueda("boton_geocoder");
            }
        }
        var querystr = (codigoreg1["0"]["0"]);
        var dir = (codigoreg1["0"]["1"]);
        //console.log(dir);
        var viewParamsStr = viewparamsToStr({
            query: querystr
        });
        var tempname = "preproduccion:codigo_autocompletar";
        var temp = "direccion";


        var wfsParams = {
            service: 'WFS',
            version: '2.0.0',
            request: 'GetFeature',
            typeName: tempname,
            outputFormat: 'application/json',
            srsname: 'EPSG:3857',
            viewparams: viewParamsStr
        };
        $.ajax({
            url: url,
            data: wfsParams,
            type: "GET",
            dataType: "json",
            success: function (data, status, xhr) {
                //console.log(data);
                var geojson = new ol.source.GeoJSON({
                    object: data
                });
                var arr = [];
                geojson.forEachFeature(function (feat) {
                    arr.push({
                        label: feat.get(temp),
                        value: feat.get(temp),
                        feature: feat,
                        direccionoriginal: dir
                    });
                });
                var arreglado = {};
                arreglado.item = arr["0"];
                try {
                    addressSelect(1, arreglado);
                } catch (err) {
                    alert("GESSTOR INFORMA:</br></br>La información se encuentra en la base de datos alfanumérica y no en la base de datos geográfica, este caso se presenta por diferencia de vigencias de  información</br>");
                }
            },
            error: function () {
                console.log("err");
            }
        });
    } else if (document.getElementById("inputrefcatotemp").value !== "") {
        var pasta = new Object();
        pasta.term = document.getElementById("inputrefcatotemp").value;
        addressSource(pasta);
    }
}
 