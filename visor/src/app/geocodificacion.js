var indicadora;
function controladorGeo() {
    var markerSource = highlight.getSource();
    markerSource.clear();
    var markerSource = highlightfeatures.getSource();
    markerSource.clear();    
    predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_cucuta', 'CQL_FILTER': null});
    document.getElementById("contenedorg").style.display = "block";
    document.getElementById("contenedorg").style.display = "none";
    document.getElementById("panel_atr2").style.visibility = "hidden";
    document.getElementById("panel_atr2").style.display = "block";
    document.getElementById("panel_atr2").style.height = "0px";
    document.getElementById("tablaP").style.visibility = "hidden";
    document.getElementById("tblatt").style.visibility = "hidden";
    document.getElementById("panel_atr").style.height = "0px";
    document.getElementById("panel_atr").style.display = "block";
    document.getElementById("cpestana1").style.display = "block";
    document.getElementById("cpestana2").style.display = "none";    
    document.getElementById("diry").style.height = "auto";
    document.getElementById("diry").style.visibility = "visible";
    var x = document.getElementById("diry");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
function cerrarT() {
    document.getElementById("tabladir1").style.visibility = "hidden";
    document.getElementById("tabladir1").style.height = "0px";
    document.getElementById("diry1").style.visibility = "hidden";
    document.getElementById("diry1").style.height = "0px";
}
function infoGeoc() {
    alert('GESSTOR INFORMA:</br></br>La dirección está compuesta de 4 partes: el tipo y valor de la vía principal: CL 1, el tipo y valor de la vía secundaria: AV 9 E, el número de placa: 55 y el barrio: Quinta Oriental.</br>Para geocodificar con éxito una dirección en el mapa, se sugiere lo siguiente: </br>1) Seleccione de la lista despegable el tipo de vía principal y escriba en la casilla de valor de la vía principal, ejemplo:  AV 13 E </br>2) Seleccione de la lista despegable el tipo de vía secundaria y escriba en la casilla de valor de la vía secundaria, ejemplo: CL 7 A N </br>3) Si el número de vía presenta complemento, escribirlo en las casillas usando espacio, por ejemplo 5 A N. No usar caracteres especiales. </br>4) Ingrese el número de placa, ejemplo: 13. </br>5) A continuación, de clic en el botón Buscar dirección.</br>Si la dirección se encuentra localizada en más de un barrio, aparecerá una ventana donde podrá geocodificar la dirección en el barrio de su elección.</br></br>');
}
function busca_dir() {
    document.getElementById("panel_atr2").style.visibility = "hidden";
    document.getElementById("panel_atr2").style.display = "block";
    document.getElementById("panel_atr2").style.height = "0px";
    document.getElementById("tablaP").style.visibility = "hidden";
    document.getElementById("tblatt").style.visibility = "hidden";
    document.getElementById("panel_atr").style.height = "0px";
    document.getElementById("panel_atr").style.display = "block";
    document.getElementById("cpestana1").style.display = "block";
    document.getElementById("cpestana2").style.display = "none";
    var generadora = document.getElementById('dir_g1').value + " " + document.getElementById('dir1').value;
    var nomvial = document.getElementById('dir_g2').value + " " + document.getElementById('dir2').value;
    var numerop = document.getElementById('dir3').value;
    if (generadora == "" || nomvial == "" || numerop == "") {
        indicadora = 3;
        alert("GESSTOR INFORMA:</br></br>Por favor diligencie todos los campos de la direcci&oacuten\n");
    }
    if (indicadora != 3) {
        var direccionE = search("cucuta:geocodificacionSin", generadora, nomvial, numerop);
        if (direccionE.length > 1 ) {        
            var sqlBarrio = '<tr><td width="45%"><b>Dirección</b></td><td width="45%"><b>Barrio</b></td><td width="10%"><b>Geocodificar</b></td></tr>';
            for (i = 0; i< direccionE.length; i++) {
                sqlBarrio = sqlBarrio + '<tr><td>' + generadora + " # " + nomvial + " - " + numerop + '</td><td align="left">' + direccionE[i][2] + '</td><td ALIGN=left; IMG ALIGN=left><input div class="dgcCerrar2" type="image" style="width:25px;height:25px;" src="./avatar/buscar_dir.png" onclick="geocodeS(' + direccionE[i][0] + ', ' + direccionE[i][1] + ', \'' + direccionE[i][2] + '\', \'' + generadora + '\', \'' + nomvial + '\', \'' + numerop + '\')"></td></tr>'; 
            }
            alert('La dirección ingresada se localiza en ' + direccionE.length + ' barrios. Geocodifique la dirección de su interés</br></br><table style="width:100%">' + sqlBarrio + '</table></br>');
        } else if (direccionE.length == 1) {
            geocodeS(direccionE[0][0], direccionE[0][1], direccionE[0][2], generadora, nomvial, numerop);
        } else {
            var address = generadora + " # " + nomvial + " - " + numerop + ', Cúcuta, Norte de Santander, Colombia';
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0].formatted_address.split("Norte de santander")[1] === undefined) {
                        addressOK = results[0].formatted_address.toUpperCase();
                    } else {
                        addressOK = results[0].formatted_address.split("Norte de santander")[1].toUpperCase();
                    }
                    var long = ((results[0].geometry.viewport.j.j + results[0].geometry.viewport.j.l) / 2);
                    var lat = ((results[0].geometry.viewport.l.j + results[0].geometry.viewport.l.l) / 2);
                    fuente = "<img style='height:40px;' src='./imagenes/google.png'/>";
                    var thing = new ol.geom.Point(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
                    map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
                    htmlGeoc(addressOK, fuente, thing, generadora + " # " + nomvial + " - " + numerop + ', Cúcuta, Norte de Santander, Colombia');
                } else {
                    alert("No podemos encontrar la direcci&oacute;n\n");
                }
            });
        }
    }
}
function geocodeS(coordx, coordy, barrioG, principal, secundaria, placa) {
    map.getView().setCenter([coordx, coordy]);
    var thing = new ol.geom.Point([coordx, coordy]);
    encontradaD = principal + " " + secundaria + " " + placa + " Barrio " + barrioG + ', Cúcuta, Norte de Santander, Colombia';
    fuente = "<img style='height:40px;' src='./imagenes/gesstor.png'/>";
    htmlGeoc(encontradaD, fuente, thing, principal + " # " + secundaria + " - " + placa + ", Barrio: " + barrioG);    
}
function htmlGeoc(direccionO, geocode, partT, direccionB) {
    document.getElementById("diry1").style.visibility = "visible";
    document.getElementById("diry1").style.display = "initial";
    document.getElementById("diry1").style.height = "auto";
    document.getElementById("diry").style.visibility = "visible";
    document.getElementById("diry").style.display = "initial";
    document.getElementById("diry").style.height = "auto";
    document.getElementById("tabladir1").style.visibility = "visible";
    document.getElementById("tabladir1").style.display = "initial";
    document.getElementById("tabladir1").style.height = "auto";
    map.getView().setZoom(18);
    var feat = new ol.Feature({
        name: "Thing",
        geometry: partT
    });
    highlight.setStyle(flagStyle);
    vectorSource = new ol.source.Vector({
        features: [feat]
    });
    vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    var markerSource = highlight.getSource();
    markerSource.clear();
    markerSource.addFeature(feat);
    var tableg = document.getElementById("tabladir1");
    tableg.innerHTML = "";
    var row = tableg.insertRow(0);
    var celll = row.insertCell(0);
    celll.colSpan = 2;
    celll.innerHTML = "<H5><b>GEOREFERENCIADOR</b></H5>";
    var seleccion = [];
    var sel = [];
    var stv = [];
    var ig = [];
    seleccion[0] = "<b>Dirección Buscada</b>";
    seleccion[1] = "<b>Dirección Aproximada</b>";
    seleccion[2] = "<b>Fuente</b>";
    sel[0] = direccionB;
    sel[1] = direccionO;
    sel[2] = geocode;
    for (i = 0; i < seleccion.length; i++) {
        row = tableg.insertRow(i + 1);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = seleccion[i];        
        if (i === 4) {
            cell2.appendChild(sel[i]);
            sel[i].appendChild(imag[i]);
            cell2.appendChild(stv[i]);
            stv[i].appendChild(ig[i]);
        } else {
            cell2.innerHTML = sel[i];
        }
    }
}