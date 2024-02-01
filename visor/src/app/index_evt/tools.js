
$(document).ready(function () {
    function loadShpZip() {
        var epsg = ($('#epsg').val() == '') ? 4326 : $('#epsg').val(),
                encoding = ($('#encoding').val() == '') ? 'UTF-8' : $('#encoding').val();
        if (file.name.split('.')[1] == 'zip') {
            if (file)
                $('.dimmer').addClass('active');
            loadshp({
                url: file,
                encoding: encoding,
                EPSG: epsg
            }, function (data) {


                var feature = new ol.format.GeoJSON().readFeatures(data, {
                    featureProjection: 'EPSG:3857'
                });
                var layer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: feature
                    })
                });
                map.addLayer(layer);

                var extent = layer.getSource().getExtent();
                //map.getView().fit(extent, map.getSize());



                var URL = window.URL || window.webkitURL || window.mozURL || window.msURL,
                        url = URL.createObjectURL(new Blob([JSON.stringify(data)], {type:
                                    "application/json"}));

                $('#link').attr('href', url);
                $('#link').html(file.name + '.geojson' + '<i class="download icon"></i>').attr('download', file.name + '.geojson');

                $('#downloadLink').slideDown(400);

                $('.shp-modal').toggleClass('effect');
                $('.overlay').toggleClass('effect');
                $('#wrap').toggleClass('blur');
        
//vector.addData(data);
                /*map.fitBounds([
                 [data.bbox[1], data.bbox[0]], [data.bbox[3], data.bbox[2]]
                 ]);*/
                $('.dimmer').removeClass('active');
                $('#preview').addClass('disabled');
                $('#epsg').val('');
                $('#encoding').val('');
                $('#info').addClass('picInfo');
                $('#option').slideUp(500);
            });
        } else {
            $('.modal').modal('show');
        }
    }
//initVector();

    $("#file").change(function (evt) {
        console.log(evt);
        file = evt.target.files[0];
        if (file.size > 0) {
            $('#dataInfo').text(' ').append(file.name + ' , ' + file.size + ' kb');
            $('#option').slideDown(500);
            $('#preview').removeClass('disabled');
        }
    });

    $('#preview').click(function () {
        loadShpZip();
    });

   /* $('.button').popup({
        inline: true,
        position: 'bottom left'
    });*/
    try{
        $('.tips').popup({
            target: '#addZipfile',
            position: 'top center',
            title: 'Getting started !',
            variation: 'huge'
        });
    }
    catch(err){}
    $('#entireLayer').click(function () {
        map.fitBounds(vector.getBounds());
    });
    $('#downloadfile').click(function () {
        window.location.href = 'demo/10tnvillage.zip';
    });
    $('#addZipfile').click(function () {
        $('.shp-modal').toggleClass('effect');
        $('.overlay').toggleClass('effect');
        $('#wrap').toggleClass('blur');
    });
    $('#cancel').click(function () {
        $('.shp-modal').toggleClass('effect');
        $('.overlay').toggleClass('effect');
        $('#wrap').toggleClass('blur');
    });
    $('#removeLayer').click(function () {
        
           // $('#attr').fadeOut(300);
           /* map.getLayers().getArray().slice().forEach(layer => {
                if (layer && layer.get('name') === 'shpLoader') {map.removeLayer(layer)}
            })*/
             window.location.reload();
        
    });
    $('#encoding').dropdown();
    $('.v').change(function () {
        var msg = '<div class="msg" id="msg" style="display: none;"><div class="ui primary inverted red segment">' + '<p>You can find the EPSG Code of your Shapefile on <strong>spatialreference.org</strong></p></div><br /></div>';
        if ($('#epsg').val().match(/^\d{4}$/) != null) {
            $('#zipfile').removeClass('disabled');
            $('.msg').slideUp(750);
        } else {
            if ($('.msg')[0] == undefined) {
                $('#epsgField').after(msg);
                $('.msg').slideDown(1500);
            }
        }
    });

    $("#attr").draggable({containment: $(this).parent().parent(), scroll:
                false, cursor: "move"});
    $('#cancelAttr').click(function () {
        $('#attr').slideUp(300);
    });

});

function removerly(){
   /* map.getLayers().getArray().slice().forEach(layer => {
        if (layer && layer.get('name') === 'shpLoader') {map.removeLayer(layer)}
    })*/
    window.location.reload();
}


function menucapasbase() {
    if (document.getElementById('menucapasbase').style.display == 'block') {
        document.getElementById('menucapasbase').style.display = 'none';
    } else {
        document.getElementById('menucapasbase').style.display = 'block';
    }
}

function changemaps(basemap) {
    if (basemap == 'bosm') {
        streetmap.setVisible(true);
        ortofotopereira.setVisible(false);
        bing.setVisible(false);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
    } else if (basemap == 'bamco') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(false);
        bing.setVisible(false);
        binglabels.setVisible(false);
        mapabase.setVisible(true);
    } else if (basemap == 'bort') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(true);
        bing.setVisible(false);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
    } else if (basemap == 'bsat') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(false);
        bing.setVisible(true);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
    } else if (basemap == 'bsatl') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(false);
        bing.setVisible(false);
        binglabels.setVisible(true);
        mapabase.setVisible(false);
    }
     else if (basemap == 'smb') {
        streetmap.setVisible(false);
        ortofotopereira.setVisible(false);
        bing.setVisible(false);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
    }
}

function fextent() {
    var pgetextent = [-8251958.568990, 663097.874878, -8174716.557064, 707498.799724];
    map.getView().fitExtent(pgetextent, map.getSize());
}
//comparacion = new ol.control.Swipe;
function comp() {
    if (document.getElementById('layerscomparacion').style.display == 'block') {
        construcciones.setVisible(true);
        document.getElementById('layerscomparacion').style.display = 'none';
        map.removeControl(comparacion);
    } else {
        construcciones.setVisible(false);
        document.getElementById('layerscomparacion').style.display = 'block';
        streetmap.setVisible(true);
        binglabels.setVisible(false);
        mapabase.setVisible(false);
        ortofotopereira.setVisible(true);
        bing.setVisible(true);
        map.addControl(comparacion);
        comparacion.addLayer(bing);
        comparacion.addLayer(ortofotopereira, true);
    }
}

function botonescomp() {
    map.removeControl(comparacion);

    if (document.getElementById('satizq').checked == true && document.getElementById('satder').checked == true) {
        map.addControl(comparacion);
        console.log("listo1");
        bing.setVisible(true);
        comparacion.addLayer(ortofotopereira);
        comparacion.addLayer(bing, true);


    } else if (document.getElementById('ortizq').checked == true && document.getElementById('satder').checked == true) {
        console.log("listo2");
        ortofotopereira.setVisible(true);
        bing.setVisible(false);
        openstreetmap.setVisible(false);
        comparacion.addLayer(bing, true);
        comparacion.addLayer(ortofotopereira);

    }
}
var draw;

function selinteraction(type) {
    //construcciones.setVisible(false);
    draw = new ol.interaction.Draw({
        type: type
    });
    map.addInteraction(draw);
    draw.on('drawend', function (evt) {
        var coordenadas = evt.feature.values_.geometry.flatCoordinates;
        //console.log(evt);
        if (type == "Point") {
            var coo = ol.proj.transform(coordenadas, 'EPSG:3857', 'EPSG:4326');
            predio.getSource().updateParams({'CQL_FILTER': 'INTERSECTS(geom,POINT(' + coo[0] + ' ' + coo[1] + '))'});
            var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, 'SRID=4326;POINT(" + coo[0] + ' ' + coo[1] + ")')");
                  
            var columnas = search("cimitarra:nombre_columnas", "terreno_rural");    
            var tablaatrib="<table style='max-width:90%; overflow:scroll; padding:10px;'>";    
            tablaatrib+="<tr><td></td>";
            for(j=0;j<columnas.length;j++){ 
        tablaatrib+="<td style='background-color:#FFC934; padding:10px; text-align:center; border:0.2px solid black; width:10px; color:black'><b>"+(columnas[j])+ "</td>";
    }
    tablaatrib+="</tr>";
    
    for(i=0;i<select.length;i++){
        tablaatrib+="<tr>";
        tablaatrib+="<td style='background-color:white; border:1px solid black;'>"+(i+1)+"</td>";
        //for(j=0;j<select.length;j++){ 
          for(j=0;j<columnas.length;j++){ 
            tablaatrib+='<td style="background:white; text-align:center; border:1px solid black; max-width:30px; overflow:hidden; text-overflow:ellipsis; white-space:nowraw;">' + select[i][j] + '</td>';
          }  
        //}
        tablaatrib+="</tr>";
    }
    tablaatrib+="</table>";
    document.getElementById("resultadotabla").innerHTML=tablaatrib;
    //predio.getSource().updateParams({'STYLES': "seleccion_predios_amco"}); 
    selectelement(select);               
} 
        
        else {
            var co = [];
            for (i = 0; i < coordenadas.length; i = i + 2) {
                var a = ol.proj.transform([coordenadas[i], coordenadas[(i + 1)]], 'EPSG:3857', 'EPSG:4326');
                co += a[0] + " " + a[1] + ",";
            }
            var coo = co.slice(0, -1);
            if (type == "LineString") {
                var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, 'SRID=4326;LINESTRING(" + coo + ")')");
            	 predio.getSource().updateParams({'CQL_FILTER': 'INTERSECTS(geom,LINESTRING(' + coo + '))'});
            var columnas = search("cimitarra:nombre_columnas", "terreno_rural");      
            var tablaatrib="<table style='max-width:90%; overflow:scroll; padding:10px;'>";    
            tablaatrib+="<tr><td></td>";
            for(j=0;j<columnas.length;j++){ 
              tablaatrib+="<td style='background-color:#FFC934; padding:10px; text-align:center; border:0.2px solid black; width:10px; color:black'><b>"+(columnas[j])+ "</td>";
            }
        tablaatrib+="</tr>";
    
    for(i=0;i<select.length;i++){
        tablaatrib+="<tr>";
        tablaatrib+="<td style='background-color:white; border:1px solid black;'>"+(i+1)+"</td>";
        //for(j=0;j<select.length;j++){ 
          for(j=0;j<columnas.length;j++){ 
            tablaatrib+='<td style="background:white; text-align:center; border:1px solid black; max-width:30px; overflow:hidden; text-overflow:ellipsis; white-space:nowraw;">' + select[i][j] + '</td>';
          }  
        //}
        tablaatrib+="</tr>";
    }
    tablaatrib+="</table>";
    document.getElementById("resultadotabla").innerHTML=tablaatrib;
    //predio.getSource().updateParams({'STYLES': "seleccion_predios_amco"});    
    selectelement(select);     
} 
            
else if (type == "Polygon") {                  
            var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, 'SRID=4326;POLYGON((" + coo + "))')");             
            predio.getSource().updateParams({'CQL_FILTER': 'INTERSECTS(geom,POLYGON((' + coo + ')))'});    
            var columnas = search("cimitarra:nombre_columnas", "terreno_rural");       
            var tablaatrib="<table style='max-width:90%; overflow:scroll; padding:10px;'>";    
            tablaatrib+="<tr><td></td>";
            for(j=0;j<columnas.length;j++){ 
        tablaatrib+="<td style='background-color:#FFC934; padding:10px; text-align:center; border:0.2px solid black; width:10px; color:black'><b>"+(columnas[j])+ "</td>";
    }
    tablaatrib+="</tr>";
    
    for(i=0;i<select.length;i++){
        tablaatrib+="<tr>";
        tablaatrib+="<td style='background-color:white; border:1px solid black;'>"+(i+1)+"</td>";
        //for(j=0;j<select.length;j++){ 
          for(j=0;j<columnas.length;j++){ 
            tablaatrib+='<td style="background:white; text-align:center; border:1px solid black; max-width:30px; overflow:hidden; text-overflow:ellipsis; white-space:nowraw;">' + select[i][j] + '</td>';
          }  
        //}
        tablaatrib+="</tr>";
    }
    tablaatrib+="</table>";
    document.getElementById("resultadotabla").innerHTML=tablaatrib;
    selectelement(select);
        }
        map.removeInteraction(draw);
       }
    });
}

function dibinteractionz(type) {
  //  alert("listo");
    map.removeInteraction(interaction);
    interactionSelect.getFeatures().clear();
    map.removeInteraction(interactionSelect);
    interaction = new ol.interaction.Draw({
        type: type,
        source: layerWFS.getSource()
    });
    map.addInteraction(interaction);
    interaction.on('drawend', function (e) {
        obsfeature = e;
        document.getElementById("panel_atr").style.visibility = "visible";
        document.getElementById("panel_atr").style.display = "initial";
        document.getElementById("panel_atr").style.height = "auto";
        /*document.getElementById("contenedorg").style.display = "initial";
        document.getElementById("contenedorg").style.visibility = "visible";
        document.getElementById("contenedorg").style.height = "auto";*/
        var table = document.getElementById("tblatt");
         $(".modal-dialog").css("width", "250px");
        table.style.visibility = "visible";
        table.style.display = "initial";
        table.style.height = "auto";
        table.innerHTML = "";
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.colSpan = 2;
        cell1.innerHTML = "<H5><b>ZONA DE INFLUENCIA</b></H5>";
        var row = table.insertRow(1);
        var cell2 = row.insertCell(0);
        cell2.colSpan = 2;
        cell2.style = "background-color: white; color:black; font-size: 15px; border:0; text-align:left;";
        cell2.innerHTML = "<b>Ingrese un valor en metros:</b>";
        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        cell3.colSpan = 2;
        cell3.style = "background-color: white; border:0; margin:0;";
        cell3.innerHTML = "<input type='text' id='valorbuffer' name='valorbuffer' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:2em;' placeholder='Ejemplo: 200'>";
        var row = table.insertRow(3);
        var cell4 = row.insertCell(0);
        cell4.colSpan = 2;
        cell4.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
        //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
        if (type == 'Point'){
            cell4.innerHTML = "<button type='button' onclick=calcularbuffer('Point') class='btn btn-primary btn-md btn-block'>Calcular</button>";
        }else if (type == 'MultiLineString'){
            cell4.innerHTML = "<button type='button' onclick=calcularbuffer('MultiLineString') class='btn btn-primary btn-md btn-block'>Calcular</button>";
        }else if(type == 'MultiPolygon'){
            cell4.innerHTML = "<button type='button' onclick=calcularbuffer('MultiPolygon') class='btn btn-primary btn-md btn-block'>Calcular</button>";
        }
        
        //InserGeom(type, e.feature);
        
    });
}



function dibinteraction(type) {
    map.removeInteraction(interaction);
    interactionSelect.getFeatures().clear();
    map.removeInteraction(interactionSelect);
    interaction = new ol.interaction.Draw({
        type: type,
        source: layerWFS.getSource()
    });
    map.addInteraction(interaction);
    interaction.on('drawend', function (e) {
        obsfeature = e;
        document.getElementById("panel_atr").style.visibility = "visible";
        document.getElementById("panel_atr").style.display = "initial";
        document.getElementById("panel_atr").style.height = "auto";
        /*document.getElementById("contenedorg").style.display = "initial";
        document.getElementById("contenedorg").style.visibility = "visible";
        document.getElementById("contenedorg").style.height = "auto";*/
        var table = document.getElementById("tblatt");
         $(".modal-dialog").css("width", "250px");
        table.style.visibility = "visible";
        table.style.display = "initial";
        table.style.height = "auto";
        table.innerHTML = "";
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.colSpan = 2;
        cell1.innerHTML = "<H5><b>INFORMACION DEL DIBUJO</b></H5>";
        var row = table.insertRow(1);
        var cell2 = row.insertCell(0);
        cell2.colSpan = 2;
        cell2.style = "background-color: white; border:0; margin:0;";
        cell2.innerHTML = "<input type='text' id='observaciones' name='observaciones' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:6em;' placeholder='Diligencie cualquier tipo de información'>";
        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        cell3.colSpan = 2;
        cell3.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
        //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
        if (type == 'Point'){
            cell3.innerHTML = "<button type='button' onclick=InserGeom('Point') class='btn btn-primary btn-md btn-block'>Guardar</button>";
        }else if (type == 'MultiLineString'){
            cell3.innerHTML = "<button type='button' onclick=InserGeom('MultiLineString') class='btn btn-primary btn-md btn-block'>Guardar</button>";
        }else if(type == 'MultiPolygon'){
            cell3.innerHTML = "<button type='button' onclick=InserGeom('MultiPolygon') class='btn btn-primary btn-md btn-block'>Guardar</button>";
        }
        
        //InserGeom(type, e.feature);
        
    });
}



function DownGjson() {
    var format = new ol.source.GeoJSON({featureProjection: 'EPSG:3857'});
    var featuresp = highlighdrawp.getSource().getFeatures();
    var featuresl = highlighdrawl.getSource().getFeatures();
    var featuresm = highlighdrawm.getSource().getFeatures();
    var jsonp = format.format.__proto__.writeFeaturesObject(featuresp);
    var jsonl = format.format.__proto__.writeFeaturesObject(featuresl);
    var jsonm = format.format.__proto__.writeFeaturesObject(featuresm);
    jsonp = JSON.stringify(jsonp);
    jsonl = JSON.stringify(jsonl);
    jsonm = JSON.stringify(jsonm);
    if (jsonp != '{"type":"FeatureCollection","features":[]}') {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonp);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = "Punto.json";
        a.click();
    }
    if (jsonl != '{"type":"FeatureCollection","features":[]}') {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonl);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = "Linea.json";
        a.click();
    }
    if (jsonm != '{"type":"FeatureCollection","features":[]}') {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonm);
        var a = document.createElement('a');
        a.href = dataStr;
        a.download = "Poligono.json";
        a.click();
    }
    /*
     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonp);
     var a = document.createElement('a');
     a.href = dataStr;
     a.download = "myObj.json";
     a.click();
     */
}
function menuseleccioncapa() {
    predio.setVisible(true);
    document.getElementById('listadibujo').style.display = 'none';
    if (document.getElementById('listadib').style.display == 'block') {
        document.getElementById('listadib').style.display = 'none';
        map.removeInteraction(draw);
        construcciones.setVisible(true);
        predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_soledad', 'CQL_FILTER': eval(filtro)});
    } else {
        document.getElementById('listadib').style.display = 'block';
    }
}
function menudibujocapa() {
    //predio.setVisible(true);
    document.getElementById('listadib').style.display = 'none';
    if (document.getElementById('listadibujo').style.display == 'block') {
        document.getElementById('listadibujo').style.display = 'none';
        map.removeInteraction(draw);
        predio.setVisible(true);
        capalinea.setVisible(false);
        capapunto.setVisible(false);
        capapoligono.setVisible(false);
        //construcciones.setVisible(true);
        //predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_soledad', 'CQL_FILTER': eval(filtro)});
    } else {
        document.getElementById('listadibujo').style.display = 'block';
    }
}

function menudibujozona() {
 //predio.setVisible(true);
    document.getElementById('listazonainfluencia').style.display = 'none';
    if (document.getElementById('listazonainfluencia').style.display == 'block') {
        document.getElementById('listazonainfluencia').style.display = 'none';
        map.removeInteraction(draw);
        
        //construcciones.setVisible(true);
        //predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_soledad', 'CQL_FILTER': eval(filtro)});
    } else {
        document.getElementById('listazonainfluencia').style.display = 'block';
    }
}

function menuLayers() {
    if (document.getElementById("layertree").style.display == 'none') {
        $('#layertree').toggle('slow');
        var tamanopantalla = screen.width;
        //console.log(tamanopantalla);
        if(tamanopantalla<='767'){
         document.getElementById("grupoherramientas").style.right = "90%";
        }
        else{
         document.getElementById("grupoherramientas").style.right = "30%";   
        } 
    } else {
        document.getElementById("grupoherramientas").style.right = "0px";
        document.getElementById("layertree").style.display = "none";
    }
}

function paneo() {
    if (document.body.style.cssText == 'cursor: all-scroll;') {
        document.body.style.cursor = 'auto';
        var valorbuffer = 15;
predio.getSource().updateParams({'STYLES': "", viewparams: "query:" + valorbuffer + "" });
    } else {
        document.body.style.cursor = 'all-scroll';
    }

}

function menucoordenadas() {
    var table = document.getElementById("tblatt");
    $(".modal-dialog").css("width", "300px");
    table.innerHTML = "";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = "<H5 style='tex'><b>Busqueda por Coordenadas</b></H5>";

    var row2 = table.insertRow(1);
    var cell2 = row2.insertCell(0);
    cell2.colSpan = 2;
    cell2.innerHTML = "<H7 style='tex'>Seleccione Sistema de Referencia:</H7>";

    var row3 = table.insertRow(2);
    var cell3 = row3.insertCell(0);
    cell3.colSpan = 2;
    cell3.innerHTML = "<select id='sistem' onchange='cambsistemacoord()'><option value='sin' selected>Seleccione...</option><option value='wgs84'>Geográficas (grados sexagecimales)</option><option value='wgs84b'>Geográficas (grados decimales)</option><option value='msoeste'>Magna Colombia Oeste</option><option value='msbogota'>Magna Colombia Bogotá</option></select>";

    var row4 = table.insertRow(3);
    var cell4 = row4.insertCell(0);
    cell4.id = "celda4";
    cell4.colSpan = 2;
    cell4.innerHTML = "<H7>Coordenadas a Localizar:</H7>";

    var row5 = table.insertRow(4);
    var cell5 = row5.insertCell(0);
    cell5.colSpan = 2;
    cell5.id = "celda5";
    cell5.innerHTML = "<H9>Latitud:</H9><input type='text' id='latwgs84' name='latwgs84' style='background-color: #white; text-align:center; ' placeholder='4.80477455'>";

    var row6 = table.insertRow(5);
    var cell6 = row6.insertCell(0);
    cell6.id = "celda6";
    cell6.colSpan = 2;
    cell6.innerHTML = "<H9>Longitud:</H9><input type='text' id='longwgs84' name='latwgs84' style='background-color: #white; text-align:center; 'placeholder='-75.7137615'>";

    var row7 = table.insertRow(6);
    var cell7 = row7.insertCell(0);
    cell7.id = "celda7";
    cell7.colSpan = 2;
    cell7.innerHTML = "<H9>Latitud:</H9><input type='text' id='latwgs84s1' name='latwgs84s1' style='background-color: #white; text-align:center; width:2em; 'placeholder='4'><H9 style='tex'>&nbsp°&nbsp</H9><input type='text' id='latwgs84s1m' name='latwgs84s1m' style='background-color: #white; text-align:center; width:4em; 'placeholder='48'><H9>&nbsp'&nbsp</H9><input type='text' id='latwgs84s1s' name='latwgs84s1s' style='background-color: #white; text-align:center; width:6em; 'placeholder='37612'><H9>&nbsp''&nbsp</H9>";

    var row8 = table.insertRow(7);
    var cell8 = row8.insertCell(0);
    cell8.id = "celda8";
    cell8.colSpan = 2;
    cell8.innerHTML = "<H9>Longitud:</H9><input type='text' id='longwgs84s1' name='longwgs84s1' style='background-color: #white; text-align:center; width:3em; 'placeholder='75'><H9 style='tex'>&nbsp°&nbsp</H9><input type='text' id='longwgs84s1m' name='longwgs84s1m' style='background-color: #white; text-align:center; width:4em; 'placeholder='41'><H9>&nbsp'&nbsp</H9><input type='text' id='longwgs84s1s' name='longwgs84s1s' style='background-color: #white; text-align:center; width:6em; 'placeholder='29145'><H9>&nbsp''&nbsp</H9>";


    var row9 = table.insertRow(8);
    var cell9 = row9.insertCell(0);
    cell9.id = "celda9";
    cell9.colSpan = 2;
    cell9.innerHTML = "<H9>X:</H9><input type='text' id='xplanb' name='xplanb' style='background-color: #white; text-align:center; 'placeholder='820917'>";

    var row10 = table.insertRow(9);
    var cell10 = row10.insertCell(0);
    cell10.id = "celda10";
    cell10.colSpan = 2;
    cell10.innerHTML = "<H9>Y:</H9><input type='text' id='yplanb' name='yplanb' style='background-color: #white; text-align:center; 'placeholder='1016976'>";

    var row11 = table.insertRow(10);
    var cell11 = row11.insertCell(0);
    cell11.id = "celda11";
    cell11.colSpan = 2;
    cell11.innerHTML = "<H9>X:</H9><input type='text' id='xplano' name='xplano' style='background-color: #white; text-align:center; 'placeholder='820935'>";

    var row12 = table.insertRow(11);
    var cell12 = row12.insertCell(0);
    cell12.id = "celda12";
    cell12.colSpan = 2;
    cell12.innerHTML = "<H9>Y:</H9><input type='text' id='yplano' name='yplano' style='background-color: #white; text-align:center; 'placeholder='1016985'>";

    var row13 = table.insertRow(12);
    var cell13 = row13.insertCell(0);
    cell13.id = "celda13";
    cell13.colSpan = 2;
    cell13.innerHTML = "<button type='button' class='btn btn-primary btn-lg btn-block' onclick='buscarcoordenadas()'>Ir al punto</button>";


    document.getElementById("panel_atr").style.display = "block";
    document.getElementById("botonminimizar").style.display = "block";

    document.getElementById("celda4").style.display = "none";
    document.getElementById("celda5").style.display = "none";
    document.getElementById("celda6").style.display = "none";
    document.getElementById("celda7").style.display = "none";
    document.getElementById("celda8").style.display = "none";
    document.getElementById("celda9").style.display = "none";
    document.getElementById("celda10").style.display = "none";
    document.getElementById("celda11").style.display = "none";
    document.getElementById("celda12").style.display = "none";
    document.getElementById("celda13").style.display = "none";


}




function cambsistemacoord() {
    document.getElementById("celda4").style.display = "block";
    document.getElementById("celda13").style.display = "block";
    if (document.getElementById("sistem").value == "wgs84") {
        document.getElementById("celda5").style.display = "block";
        document.getElementById("celda6").style.display = "block";
        document.getElementById("celda7").style.display = "none";
        document.getElementById("celda8").style.display = "none";
        document.getElementById("celda9").style.display = "none";
        document.getElementById("celda10").style.display = "none";
        document.getElementById("celda11").style.display = "none";
        document.getElementById("celda12").style.display = "none";
    } else if (document.getElementById("sistem").value == "wgs84b") {
        document.getElementById("celda5").style.display = "none";
        document.getElementById("celda6").style.display = "none";
        document.getElementById("celda7").style.display = "block";
        document.getElementById("celda8").style.display = "block";
        document.getElementById("celda9").style.display = "none";
        document.getElementById("celda10").style.display = "none";
        document.getElementById("celda11").style.display = "none";
        document.getElementById("celda12").style.display = "none";
    } else if (document.getElementById("sistem").value == "msoeste") {
        document.getElementById("celda5").style.display = "none";
        document.getElementById("celda6").style.display = "none";
        document.getElementById("celda7").style.display = "none";
        document.getElementById("celda8").style.display = "none";
        document.getElementById("celda9").style.display = "block";
        document.getElementById("celda10").style.display = "block";
        document.getElementById("celda11").style.display = "none";
        document.getElementById("celda12").style.display = "none";
    } else if (document.getElementById("sistem").value == "msbogota") {
        document.getElementById("celda5").style.display = "none";
        document.getElementById("celda6").style.display = "none";
        document.getElementById("celda7").style.display = "none";
        document.getElementById("celda8").style.display = "none";
        document.getElementById("celda9").style.display = "none";
        document.getElementById("celda10").style.display = "none";
        document.getElementById("celda11").style.display = "block";
        document.getElementById("celda12").style.display = "block";
    }
}

function buscarcoordenadas() {
    document.getElementById("panel_atr").style.display = "none";
    document.getElementById("botonminimizar").style.display = "none";

    //document.getElementById("lista_general").style.display = "none";
    !function (a, b) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.proj4 = b()
    }(this, function () {
        "use strict";
        function a(a, b) {
            if (a[b])
                return a[b];
            for (var c, d, e = Object.keys(a), f = b.toLowerCase().replace(Ob, ""), g = -1; ++g < e.length; )
                if (c = e[g], d = c.toLowerCase().replace(Ob, ""), d === f)
                    return a[c]
        }
        function b(a) {
            if ("string" != typeof a)
                throw new Error("not a string");
            this.text = a.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = Qb
        }
        function c(a) {
            var c = new b(a);
            return c.output()
        }
        function d(a, b, c) {
            Array.isArray(b) && (c.unshift(b), b = null);
            var d = b ? {} : a, f = c.reduce(function (a, b) {
                return e(b, a), a
            }, d);
            b && (a[b] = f)
        }
        function e(a, b) {
            if (!Array.isArray(a))
                return void(b[a] = !0);
            var c = a.shift();
            if ("PARAMETER" === c && (c = a.shift()), 1 === a.length)
                return Array.isArray(a[0]) ? (b[c] = {}, void e(a[0], b[c])) : void(b[c] = a[0]);
            if (!a.length)
                return void(b[c] = !0);
            if ("TOWGS84" === c)
                return void(b[c] = a);
            Array.isArray(c) || (b[c] = {});
            var f;
            switch (c) {
                case"UNIT":
                case"PRIMEM":
                case"VERT_DATUM":
                    return b[c] = {name: a[0].toLowerCase(), convert: a[1]}, void(3 === a.length && e(a[2], b[c]));
                case"SPHEROID":
                case"ELLIPSOID":
                    return b[c] = {name: a[0], a: a[1], rf: a[2]}, void(4 === a.length && e(a[3], b[c]));
                case"PROJECTEDCRS":
                case"PROJCRS":
                case"GEOGCS":
                case"GEOCCS":
                case"PROJCS":
                case"LOCAL_CS":
                case"GEODCRS":
                case"GEODETICCRS":
                case"GEODETICDATUM":
                case"EDATUM":
                case"ENGINEERINGDATUM":
                case"VERT_CS":
                case"VERTCRS":
                case"VERTICALCRS":
                case"COMPD_CS":
                case"COMPOUNDCRS":
                case"ENGINEERINGCRS":
                case"ENGCRS":
                case"FITTED_CS":
                case"LOCAL_DATUM":
                case"DATUM":
                    return a[0] = ["name", a[0]], void d(b, c, a);
                default:
                    for (f = - 1; ++f < a.length; )
                        if (!Array.isArray(a[f]))
                            return e(a, b[c]);
                    return d(b, c, a)
            }
        }
        function f(a, b) {
            var c = b[0], d = b[1];
            !(c in a) && d in a && (a[c] = a[d], 3 === b.length && (a[c] = b[2](a[c])))
        }
        function g(a) {
            return a * _b
        }
        function h(a) {
            function b(b) {
                var c = a.to_meter || 1;
                return b * c
            }
            "GEOGCS" === a.type ? a.projName = "longlat" : "LOCAL_CS" === a.type ? (a.projName = "identity", a.local = !0) : "object" == typeof a.PROJECTION ? a.projName = Object.keys(a.PROJECTION)[0] : a.projName = a.PROJECTION, a.UNIT && (a.units = a.UNIT.name.toLowerCase(), "metre" === a.units && (a.units = "meter"), a.UNIT.convert && ("GEOGCS" === a.type ? a.DATUM && a.DATUM.SPHEROID && (a.to_meter = a.UNIT.convert * a.DATUM.SPHEROID.a) : (a.to_meter = a.UNIT.convert, 10)));
            var c = a.GEOGCS;
            "GEOGCS" === a.type && (c = a), c && (c.DATUM ? a.datumCode = c.DATUM.name.toLowerCase() : a.datumCode = c.name.toLowerCase(), "d_" === a.datumCode.slice(0, 2) && (a.datumCode = a.datumCode.slice(2)), "new_zealand_geodetic_datum_1949" !== a.datumCode && "new_zealand_1949" !== a.datumCode || (a.datumCode = "nzgd49"), "wgs_1984" === a.datumCode && ("Mercator_Auxiliary_Sphere" === a.PROJECTION && (a.sphere = !0), a.datumCode = "wgs84"), "_ferro" === a.datumCode.slice(-6) && (a.datumCode = a.datumCode.slice(0, -6)), "_jakarta" === a.datumCode.slice(-8) && (a.datumCode = a.datumCode.slice(0, -8)), ~a.datumCode.indexOf("belge") && (a.datumCode = "rnb72"), c.DATUM && c.DATUM.SPHEROID && (a.ellps = c.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), "international" === a.ellps.toLowerCase().slice(0, 13) && (a.ellps = "intl"), a.a = c.DATUM.SPHEROID.a, a.rf = parseFloat(c.DATUM.SPHEROID.rf, 10)), ~a.datumCode.indexOf("osgb_1936") && (a.datumCode = "osgb36")), a.b && !isFinite(a.b) && (a.b = a.a);
            var d = function (b) {
                return f(a, b)
            }, e = [["standard_parallel_1", "Standard_Parallel_1"], ["standard_parallel_2", "Standard_Parallel_2"], ["false_easting", "False_Easting"], ["false_northing", "False_Northing"], ["central_meridian", "Central_Meridian"], ["latitude_of_origin", "Latitude_Of_Origin"], ["latitude_of_origin", "Central_Parallel"], ["scale_factor", "Scale_Factor"], ["k0", "scale_factor"], ["latitude_of_center", "Latitude_of_center"], ["lat0", "latitude_of_center", g], ["longitude_of_center", "Longitude_Of_Center"], ["longc", "longitude_of_center", g], ["x0", "false_easting", b], ["y0", "false_northing", b], ["long0", "central_meridian", g], ["lat0", "latitude_of_origin", g], ["lat0", "standard_parallel_1", g], ["lat1", "standard_parallel_1", g], ["lat2", "standard_parallel_2", g], ["alpha", "azimuth", g], ["srsCode", "name"]];
            e.forEach(d), a.long0 || !a.longc || "Albers_Conic_Equal_Area" !== a.projName && "Lambert_Azimuthal_Equal_Area" !== a.projName || (a.long0 = a.longc), a.lat_ts || !a.lat1 || "Stereographic_South_Pole" !== a.projName && "Polar Stereographic (variant B)" !== a.projName || (a.lat0 = g(a.lat1 > 0 ? 90 : -90), a.lat_ts = a.lat1)
        }
        function i(a) {
            var b = this;
            if (2 === arguments.length) {
                var c = arguments[1];
                "string" == typeof c ? "+" === c.charAt(0) ? i[a] = Pb(arguments[1]) : i[a] = ac(arguments[1]) : i[a] = c
            } else if (1 === arguments.length) {
                if (Array.isArray(a))
                    return a.map(function (a) {
                        Array.isArray(a) ? i.apply(b, a) : i(a)
                    });
                if ("string" == typeof a) {
                    if (a in i)
                        return i[a]
                } else
                    "EPSG"in a ? i["EPSG:" + a.EPSG] = a : "ESRI"in a ? i["ESRI:" + a.ESRI] = a : "IAU2000"in a ? i["IAU2000:" + a.IAU2000] = a : console.log(a);
                return
            }
        }
        function j(a) {
            return"string" == typeof a
        }
        function k(a) {
            return a in i
        }
        function l(a) {
            return bc.some(function (b) {
                return a.indexOf(b) > -1
            })
        }
        function m(a) {
            return"+" === a[0]
        }
        function n(a) {
            return j(a) ? k(a) ? i[a] : l(a) ? ac(a) : m(a) ? Pb(a) : void 0 : a
        }
        function o() {
            var a = this.b / this.a;
            this.es = 1 - a * a, "x0"in this || (this.x0 = 0), "y0"in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = dc(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1)
        }
        function p(a) {
            var b = a.x, c = a.y;
            if (c * Ib > 90 && c * Ib < -90 && b * Ib > 180 && b * Ib < -180)
                return null;
            var d, e;
            if (Math.abs(Math.abs(c) - Cb) <= Gb)
                return null;
            if (this.sphere)
                d = this.x0 + this.a * this.k0 * fc(b - this.long0), e = this.y0 + this.a * this.k0 * Math.log(Math.tan(Jb + .5 * c));
            else {
                var f = Math.sin(c), g = gc(this.e, c, f);
                d = this.x0 + this.a * this.k0 * fc(b - this.long0), e = this.y0 - this.a * this.k0 * Math.log(g)
            }
            return a.x = d, a.y = e, a
        }
        function q(a) {
            var b, c, d = a.x - this.x0, e = a.y - this.y0;
            if (this.sphere)
                c = Cb - 2 * Math.atan(Math.exp(-e / (this.a * this.k0)));
            else {
                var f = Math.exp(-e / (this.a * this.k0));
                if (c = hc(this.e, f), c === -9999)
                    return null
            }
            return b = fc(this.long0 + d / (this.a * this.k0)), a.x = b, a.y = c, a
        }
        function r() {}
        function s(a) {
            return a
        }
        function t(a, b) {
            var c = oc.length;
            return a.names ? (oc[c] = a, a.names.forEach(function (a) {
                nc[a.toLowerCase()] = c
            }), this) : (console.log(b), !0)
        }
        function u(a) {
            if (!a)
                return!1;
            var b = a.toLowerCase();
            return"undefined" != typeof nc[b] && oc[nc[b]] ? oc[nc[b]] : void 0
        }
        function v() {
            mc.forEach(t)
        }
        function w(a, b, c, d) {
            var e = a * a, f = b * b, g = (e - f) / e, h = 0;
            d ? (a *= 1 - g * (Db + g * (Eb + g * Fb)), e = a * a, g = 0) : h = Math.sqrt(g);
            var i = (e - f) / f;
            return{es: g, e: h, ep2: i}
        }
        function x(b, c, d, e, f) {
            if (!b) {
                var g = a(qc, e);
                g || (g = rc), b = g.a, c = g.b, d = g.rf
            }
            return d && !c && (c = (1 - 1 / d) * b), (0 === d || Math.abs(b - c) < Gb) && (f = !0, c = b), {a: b, b: c, rf: d, sphere: f}
        }
        function y(a, b, c, d, e, f) {
            var g = {};
            return void 0 === a || "none" === a ? g.datum_type = Ab : g.datum_type = zb, b && (g.datum_params = b.map(parseFloat), 0 === g.datum_params[0] && 0 === g.datum_params[1] && 0 === g.datum_params[2] || (g.datum_type = xb), g.datum_params.length > 3 && (0 === g.datum_params[3] && 0 === g.datum_params[4] && 0 === g.datum_params[5] && 0 === g.datum_params[6] || (g.datum_type = yb, g.datum_params[3] *= Bb, g.datum_params[4] *= Bb, g.datum_params[5] *= Bb, g.datum_params[6] = g.datum_params[6] / 1e6 + 1))), g.a = c, g.b = d, g.es = e, g.ep2 = f, g
        }
        function z(b, c) {
            if (!(this instanceof z))
                return new z(b);
            c = c || function (a) {
                if (a)
                    throw a
            };
            var d = n(b);
            if ("object" != typeof d)
                return void c(b);
            var e = z.projections.get(d.projName);
            if (!e)
                return void c(b);
            if (d.datumCode && "none" !== d.datumCode) {
                var f = a(sc, d.datumCode);
                f && (d.datum_params = f.towgs84 ? f.towgs84.split(",") : null, d.ellps = f.ellipse, d.datumName = f.datumName ? f.datumName : d.datumCode)
            }
            d.k0 = d.k0 || 1, d.axis = d.axis || "enu", d.ellps = d.ellps || "wgs84";
            var g = x(d.a, d.b, d.rf, d.ellps, d.sphere), h = w(g.a, g.b, g.rf, d.R_A), i = d.datum || y(d.datumCode, d.datum_params, g.a, g.b, h.es, h.ep2);
            cc(this, d), cc(this, e), this.a = g.a, this.b = g.b, this.rf = g.rf, this.sphere = g.sphere, this.es = h.es, this.e = h.e, this.ep2 = h.ep2, this.datum = i, this.init(), c(null, this)
        }
        function A(a, b) {
            return a.datum_type === b.datum_type && (!(a.a !== b.a || Math.abs(a.es - b.es) > 5e-11) && (a.datum_type === xb ? a.datum_params[0] === b.datum_params[0] && a.datum_params[1] === b.datum_params[1] && a.datum_params[2] === b.datum_params[2] : a.datum_type !== yb || a.datum_params[0] === b.datum_params[0] && a.datum_params[1] === b.datum_params[1] && a.datum_params[2] === b.datum_params[2] && a.datum_params[3] === b.datum_params[3] && a.datum_params[4] === b.datum_params[4] && a.datum_params[5] === b.datum_params[5] && a.datum_params[6] === b.datum_params[6]))
        }
        function B(a, b, c) {
            var d, e, f, g, h = a.x, i = a.y, j = a.z ? a.z : 0;
            if (i < -Cb && i > -1.001 * Cb)
                i = -Cb;
            else if (i > Cb && i < 1.001 * Cb)
                i = Cb;
            else if (i < -Cb || i > Cb)
                return null;
            return h > Math.PI && (h -= 2 * Math.PI), e = Math.sin(i), g = Math.cos(i), f = e * e, d = c / Math.sqrt(1 - b * f), {x: (d + j) * g * Math.cos(h), y: (d + j) * g * Math.sin(h), z: (d * (1 - b) + j) * e}
        }
        function C(a, b, c, d) {
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = 1e-12, v = u * u, w = 30, x = a.x, y = a.y, z = a.z ? a.z : 0;
            if (e = Math.sqrt(x * x + y * y), f = Math.sqrt(x * x + y * y + z * z), e / c < u) {
                if (r = 0, f / c < u)
                    return s = Cb, t = -d, {x: a.x, y: a.y, z: a.z}
            } else
                r = Math.atan2(y, x);
            g = z / f, h = e / f, i = 1 / Math.sqrt(1 - b * (2 - b) * h * h), l = h * (1 - b) * i, m = g * i, q = 0;
            do
                q++, k = c / Math.sqrt(1 - b * m * m), t = e * l + z * m - k * (1 - b * m * m), j = b * k / (k + t), i = 1 / Math.sqrt(1 - j * (2 - j) * h * h), n = h * (1 - j) * i, o = g * i, p = o * l - n * m, l = n, m = o;
            while (p * p > v && q < w);
            return s = Math.atan(o / Math.abs(n)), {x: r, y: s, z: t}
        }
        function D(a, b, c) {
            if (b === xb)
                return{x: a.x + c[0], y: a.y + c[1], z: a.z + c[2]};
            if (b === yb) {
                var d = c[0], e = c[1], f = c[2], g = c[3], h = c[4], i = c[5], j = c[6];
                return{x: j * (a.x - i * a.y + h * a.z) + d, y: j * (i * a.x + a.y - g * a.z) + e, z: j * (-h * a.x + g * a.y + a.z) + f}
            }
        }
        function E(a, b, c) {
            if (b === xb)
                return{x: a.x - c[0], y: a.y - c[1], z: a.z - c[2]};
            if (b === yb) {
                var d = c[0], e = c[1], f = c[2], g = c[3], h = c[4], i = c[5], j = c[6], k = (a.x - d) / j, l = (a.y - e) / j, m = (a.z - f) / j;
                return{x: k + i * l - h * m, y: -i * k + l + g * m, z: h * k - g * l + m}
            }
        }
        function F(a) {
            return a === xb || a === yb
        }
        function G(a, b) {
            return(a.datum.datum_type === xb || a.datum.datum_type === yb) && "WGS84" !== b.datumCode || (b.datum.datum_type === xb || b.datum.datum_type === yb) && "WGS84" !== a.datumCode
        }
        function H(a, b, c) {
            var d;
            return Array.isArray(c) && (c = vc(c)), a.datum && b.datum && G(a, b) && (d = new z("WGS84"), c = H(a, d, c), a = d), "enu" !== a.axis && (c = uc(a, !1, c)), "longlat" === a.projName ? c = {x: c.x * Hb, y: c.y * Hb} : (a.to_meter && (c = {x: c.x * a.to_meter, y: c.y * a.to_meter}), c = a.inverse(c)), a.from_greenwich && (c.x += a.from_greenwich), c = tc(a.datum, b.datum, c), b.from_greenwich && (c = {x: c.x - b.from_greenwich, y: c.y}), "longlat" === b.projName ? c = {x: c.x * Ib, y: c.y * Ib} : (c = b.forward(c), b.to_meter && (c = {x: c.x / b.to_meter, y: c.y / b.to_meter})), "enu" !== b.axis ? uc(b, !0, c) : c
        }
        function I(a, b, c) {
            var d;
            return Array.isArray(c) ? (d = H(a, b, c), 3 === c.length ? [d.x, d.y, d.z] : [d.x, d.y]) : H(a, b, c)
        }
        function J(a) {
            return a instanceof z ? a : a.oProj ? a.oProj : z(a)
        }
        function K(a, b, c) {
            a = J(a);
            var d, e = !1;
            return"undefined" == typeof b ? (b = a, a = wc, e = !0) : ("undefined" != typeof b.x || Array.isArray(b)) && (c = b, b = a, a = wc, e = !0), b = J(b), c ? I(a, b, c) : (d = {forward: function (c) {
                    return I(a, b, c)
                }, inverse: function (c) {
                    return I(b, a, c)
                }}, e && (d.oProj = b), d)
        }
        function L(a, b) {
            return b = b || 5, T(Q({lat: a[1], lon: a[0]}), b)
        }
        function M(a) {
            var b = R(X(a.toUpperCase()));
            return b.lat && b.lon ? [b.lon, b.lat, b.lon, b.lat] : [b.left, b.bottom, b.right, b.top]
        }
        function N(a) {
            var b = R(X(a.toUpperCase()));
            return b.lat && b.lon ? [b.lon, b.lat] : [(b.left + b.right) / 2, (b.top + b.bottom) / 2]
        }
        function O(a) {
            return a * (Math.PI / 180)
        }
        function P(a) {
            return 180 * (a / Math.PI)
        }
        function Q(a) {
            var b, c, d, e, f, g, h, i, j, k = a.lat, l = a.lon, m = 6378137, n = .00669438, o = .9996, p = O(k), q = O(l);
            j = Math.floor((l + 180) / 6) + 1, 180 === l && (j = 60), k >= 56 && k < 64 && l >= 3 && l < 12 && (j = 32), k >= 72 && k < 84 && (l >= 0 && l < 9 ? j = 31 : l >= 9 && l < 21 ? j = 33 : l >= 21 && l < 33 ? j = 35 : l >= 33 && l < 42 && (j = 37)), b = 6 * (j - 1) - 180 + 3, i = O(b), c = n / (1 - n), d = m / Math.sqrt(1 - n * Math.sin(p) * Math.sin(p)), e = Math.tan(p) * Math.tan(p), f = c * Math.cos(p) * Math.cos(p), g = Math.cos(p) * (q - i), h = m * ((1 - n / 4 - 3 * n * n / 64 - 5 * n * n * n / 256) * p - (3 * n / 8 + 3 * n * n / 32 + 45 * n * n * n / 1024) * Math.sin(2 * p) + (15 * n * n / 256 + 45 * n * n * n / 1024) * Math.sin(4 * p) - 35 * n * n * n / 3072 * Math.sin(6 * p));
            var r = o * d * (g + (1 - e + f) * g * g * g / 6 + (5 - 18 * e + e * e + 72 * f - 58 * c) * g * g * g * g * g / 120) + 5e5, s = o * (h + d * Math.tan(p) * (g * g / 2 + (5 - e + 9 * f + 4 * f * f) * g * g * g * g / 24 + (61 - 58 * e + e * e + 600 * f - 330 * c) * g * g * g * g * g * g / 720));
            return k < 0 && (s += 1e7), {northing: Math.round(s), easting: Math.round(r), zoneNumber: j, zoneLetter: S(k)}
        }
        function R(a) {
            var b = a.northing, c = a.easting, d = a.zoneLetter, e = a.zoneNumber;
            if (e < 0 || e > 60)
                return null;
            var f, g, h, i, j, k, l, m, n, o, p = .9996, q = 6378137, r = .00669438, s = (1 - Math.sqrt(1 - r)) / (1 + Math.sqrt(1 - r)), t = c - 5e5, u = b;
            d < "N" && (u -= 1e7), m = 6 * (e - 1) - 180 + 3, f = r / (1 - r), l = u / p, n = l / (q * (1 - r / 4 - 3 * r * r / 64 - 5 * r * r * r / 256)), o = n + (3 * s / 2 - 27 * s * s * s / 32) * Math.sin(2 * n) + (21 * s * s / 16 - 55 * s * s * s * s / 32) * Math.sin(4 * n) + 151 * s * s * s / 96 * Math.sin(6 * n), g = q / Math.sqrt(1 - r * Math.sin(o) * Math.sin(o)), h = Math.tan(o) * Math.tan(o), i = f * Math.cos(o) * Math.cos(o), j = q * (1 - r) / Math.pow(1 - r * Math.sin(o) * Math.sin(o), 1.5), k = t / (g * p);
            var v = o - g * Math.tan(o) / j * (k * k / 2 - (5 + 3 * h + 10 * i - 4 * i * i - 9 * f) * k * k * k * k / 24 + (61 + 90 * h + 298 * i + 45 * h * h - 252 * f - 3 * i * i) * k * k * k * k * k * k / 720);
            v = P(v);
            var w = (k - (1 + 2 * h + i) * k * k * k / 6 + (5 - 2 * i + 28 * h - 3 * i * i + 8 * f + 24 * h * h) * k * k * k * k * k / 120) / Math.cos(o);
            w = m + P(w);
            var x;
            if (a.accuracy) {
                var y = R({northing: a.northing + a.accuracy, easting: a.easting + a.accuracy, zoneLetter: a.zoneLetter, zoneNumber: a.zoneNumber});
                x = {top: y.lat, right: y.lon, bottom: v, left: w}
            } else
                x = {lat: v, lon: w};
            return x
        }
        function S(a) {
            var b = "Z";
            return 84 >= a && a >= 72 ? b = "X" : 72 > a && a >= 64 ? b = "W" : 64 > a && a >= 56 ? b = "V" : 56 > a && a >= 48 ? b = "U" : 48 > a && a >= 40 ? b = "T" : 40 > a && a >= 32 ? b = "S" : 32 > a && a >= 24 ? b = "R" : 24 > a && a >= 16 ? b = "Q" : 16 > a && a >= 8 ? b = "P" : 8 > a && a >= 0 ? b = "N" : 0 > a && a >= -8 ? b = "M" : -8 > a && a >= -16 ? b = "L" : -16 > a && a >= -24 ? b = "K" : -24 > a && a >= -32 ? b = "J" : -32 > a && a >= -40 ? b = "H" : -40 > a && a >= -48 ? b = "G" : -48 > a && a >= -56 ? b = "F" : -56 > a && a >= -64 ? b = "E" : -64 > a && a >= -72 ? b = "D" : -72 > a && a >= -80 && (b = "C"), b
        }
        function T(a, b) {
            var c = "00000" + a.easting, d = "00000" + a.northing;
            return a.zoneNumber + a.zoneLetter + U(a.easting, a.northing, a.zoneNumber) + c.substr(c.length - 5, b) + d.substr(d.length - 5, b)
        }
        function U(a, b, c) {
            var d = V(c), e = Math.floor(a / 1e5), f = Math.floor(b / 1e5) % 20;
            return W(e, f, d)
        }
        function V(a) {
            var b = a % xc;
            return 0 === b && (b = xc), b
        }
        function W(a, b, c) {
            var d = c - 1, e = yc.charCodeAt(d), f = zc.charCodeAt(d), g = e + a - 1, h = f + b, i = !1;
            g > Ec && (g = g - Ec + Ac - 1, i = !0), (g === Bc || e < Bc && g > Bc || (g > Bc || e < Bc) && i) && g++, (g === Cc || e < Cc && g > Cc || (g > Cc || e < Cc) && i) && (g++, g === Bc && g++), g > Ec && (g = g - Ec + Ac - 1), h > Dc ? (h = h - Dc + Ac - 1, i = !0) : i = !1, (h === Bc || f < Bc && h > Bc || (h > Bc || f < Bc) && i) && h++, (h === Cc || f < Cc && h > Cc || (h > Cc || f < Cc) && i) && (h++, h === Bc && h++), h > Dc && (h = h - Dc + Ac - 1);
            var j = String.fromCharCode(g) + String.fromCharCode(h);
            return j
        }
        function X(a) {
            if (a && 0 === a.length)
                throw"MGRSPoint coverting from nothing";
            for (var b, c = a.length, d = null, e = "", f = 0; !/[A-Z]/.test(b = a.charAt(f)); ) {
                if (f >= 2)
                    throw"MGRSPoint bad conversion from: " + a;
                e += b, f++
            }
            var g = parseInt(e, 10);
            if (0 === f || f + 3 > c)
                throw"MGRSPoint bad conversion from: " + a;
            var h = a.charAt(f++);
            if (h <= "A" || "B" === h || "Y" === h || h >= "Z" || "I" === h || "O" === h)
                throw"MGRSPoint zone letter " + h + " not handled: " + a;
            d = a.substring(f, f += 2);
            for (var i = V(g), j = Y(d.charAt(0), i), k = Z(d.charAt(1), i); k < $(h); )
                k += 2e6;
            var l = c - f;
            if (l % 2 !== 0)
                throw"MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + a;
            var m, n, o, p, q, r = l / 2, s = 0, t = 0;
            return r > 0 && (m = 1e5 / Math.pow(10, r), n = a.substring(f, f + r), s = parseFloat(n) * m, o = a.substring(f + r), t = parseFloat(o) * m), p = s + j, q = t + k, {easting: p, northing: q, zoneLetter: h, zoneNumber: g, accuracy: m}
        }
        function Y(a, b) {
            for (var c = yc.charCodeAt(b - 1), d = 1e5, e = !1; c !== a.charCodeAt(0); ) {
                if (c++, c === Bc && c++, c === Cc && c++, c > Ec) {
                    if (e)
                        throw"Bad character: " + a;
                    c = Ac, e = !0
                }
                d += 1e5
            }
            return d
        }
        function Z(a, b) {
            if (a > "V")
                throw"MGRSPoint given invalid Northing " + a;
            for (var c = zc.charCodeAt(b - 1), d = 0, e = !1; c !== a.charCodeAt(0); ) {
                if (c++, c === Bc && c++, c === Cc && c++, c > Dc) {
                    if (e)
                        throw"Bad character: " + a;
                    c = Ac, e = !0
                }
                d += 1e5
            }
            return d
        }
        function $(a) {
            var b;
            switch (a) {
                case"C":
                    b = 11e5;
                    break;
                case"D":
                    b = 2e6;
                    break;
                case"E":
                    b = 28e5;
                    break;
                case"F":
                    b = 37e5;
                    break;
                case"G":
                    b = 46e5;
                    break;
                case"H":
                    b = 55e5;
                    break;
                case"J":
                    b = 64e5;
                    break;
                case"K":
                    b = 73e5;
                    break;
                case"L":
                    b = 82e5;
                    break;
                case"M":
                    b = 91e5;
                    break;
                case"N":
                    b = 0;
                    break;
                case"P":
                    b = 8e5;
                    break;
                case"Q":
                    b = 17e5;
                    break;
                case"R":
                    b = 26e5;
                    break;
                case"S":
                    b = 35e5;
                    break;
                case"T":
                    b = 44e5;
                    break;
                case"U":
                    b = 53e5;
                    break;
                case"V":
                    b = 62e5;
                    break;
                case"W":
                    b = 7e6;
                    break;
                case"X":
                    b = 79e5;
                    break;
                default:
                    b = -1
            }
            if (b >= 0)
                return b;
            throw"Invalid zone letter: " + a
        }
        function Point(a, b, c) {
            if (!(this instanceof Point))
                return new Point(a, b, c);
            if (Array.isArray(a))
                this.x = a[0], this.y = a[1], this.z = a[2] || 0;
            else if ("object" == typeof a)
                this.x = a.x, this.y = a.y, this.z = a.z || 0;
            else if ("string" == typeof a && "undefined" == typeof b) {
                var d = a.split(",");
                this.x = parseFloat(d[0], 10), this.y = parseFloat(d[1], 10), this.z = parseFloat(d[2], 10) || 0
            } else
                this.x = a, this.y = b, this.z = c || 0;
            console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")
        }
        function _() {
            this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0, this.es && (this.en = Tc(this.es), this.ml0 = Uc(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en))
        }
        function aa(a) {
            var b, c, d, e = a.x, f = a.y, g = fc(e - this.long0), h = Math.sin(f), i = Math.cos(f);
            if (this.es) {
                var j = i * g, k = Math.pow(j, 2), l = this.ep2 * Math.pow(i, 2), m = Math.pow(l, 2), n = Math.abs(i) > Gb ? Math.tan(f) : 0, o = Math.pow(n, 2), p = Math.pow(o, 2);
                b = 1 - this.es * Math.pow(h, 2), j /= Math.sqrt(b);
                var q = Uc(f, h, i, this.en);
                c = this.a * (this.k0 * j * (1 + k / 6 * (1 - o + l + k / 20 * (5 - 18 * o + p + 14 * l - 58 * o * l + k / 42 * (61 + 179 * p - p * o - 479 * o))))) + this.x0, d = this.a * (this.k0 * (q - this.ml0 + h * g * j / 2 * (1 + k / 12 * (5 - o + 9 * l + 4 * m + k / 30 * (61 + p - 58 * o + 270 * l - 330 * o * l + k / 56 * (1385 + 543 * p - p * o - 3111 * o)))))) + this.y0
            } else {
                var r = i * Math.sin(g);
                if (Math.abs(Math.abs(r) - 1) < Gb)
                    return 93;
                if (c = .5 * this.a * this.k0 * Math.log((1 + r) / (1 - r)) + this.x0, d = i * Math.cos(g) / Math.sqrt(1 - Math.pow(r, 2)), r = Math.abs(d), r >= 1) {
                    if (r - 1 > Gb)
                        return 93;
                    d = 0
                } else
                    d = Math.acos(d);
                f < 0 && (d = -d), d = this.a * this.k0 * (d - this.lat0) + this.y0
            }
            return a.x = c, a.y = d, a
        }
        function ba(a) {
            var b, c, d, e, f = (a.x - this.x0) * (1 / this.a), g = (a.y - this.y0) * (1 / this.a);
            if (this.es)
                if (b = this.ml0 + g / this.k0, c = Wc(b, this.es, this.en), Math.abs(c) < Cb) {
                    var h = Math.sin(c), i = Math.cos(c), j = Math.abs(i) > Gb ? Math.tan(c) : 0, k = this.ep2 * Math.pow(i, 2), l = Math.pow(k, 2), m = Math.pow(j, 2), n = Math.pow(m, 2);
                    b = 1 - this.es * Math.pow(h, 2);
                    var o = f * Math.sqrt(b) / this.k0, p = Math.pow(o, 2);
                    b *= j, d = c - b * p / (1 - this.es) * .5 * (1 - p / 12 * (5 + 3 * m - 9 * k * m + k - 4 * l - p / 30 * (61 + 90 * m - 252 * k * m + 45 * n + 46 * k - p / 56 * (1385 + 3633 * m + 4095 * n + 1574 * n * m)))), e = fc(this.long0 + o * (1 - p / 6 * (1 + 2 * m + k - p / 20 * (5 + 28 * m + 24 * n + 8 * k * m + 6 * k - p / 42 * (61 + 662 * m + 1320 * n + 720 * n * m)))) / i)
                } else
                    d = Cb * ec(g), e = 0;
            else {
                var q = Math.exp(f / this.k0), r = .5 * (q - 1 / q), s = this.lat0 + g / this.k0, t = Math.cos(s);
                b = Math.sqrt((1 - Math.pow(t, 2)) / (1 + Math.pow(r, 2))), d = Math.asin(b), g < 0 && (d = -d), e = 0 === r && 0 === t ? 0 : fc(Math.atan2(r, t) + this.long0)
            }
            return a.x = e, a.y = d, a
        }
        function ca() {
            if (void 0 === this.es || this.es <= 0)
                throw new Error("incorrect elliptical usage");
            this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
            var a = this.es / (1 + Math.sqrt(1 - this.es)), b = a / (2 - a), c = b;
            this.cgb[0] = b * (2 + b * (-2 / 3 + b * (-2 + b * (116 / 45 + b * (26 / 45 + b * (-2854 / 675)))))), this.cbg[0] = b * (-2 + b * (2 / 3 + b * (4 / 3 + b * (-82 / 45 + b * (32 / 45 + b * (4642 / 4725)))))), c *= b, this.cgb[1] = c * (7 / 3 + b * (-1.6 + b * (-227 / 45 + b * (2704 / 315 + b * (2323 / 945))))), this.cbg[1] = c * (5 / 3 + b * (-16 / 15 + b * (-13 / 9 + b * (904 / 315 + b * (-1522 / 945))))), c *= b, this.cgb[2] = c * (56 / 15 + b * (-136 / 35 + b * (-1262 / 105 + b * (73814 / 2835)))), this.cbg[2] = c * (-26 / 15 + b * (34 / 21 + b * (1.6 + b * (-12686 / 2835)))), c *= b, this.cgb[3] = c * (4279 / 630 + b * (-332 / 35 + b * (-399572 / 14175))), this.cbg[3] = c * (1237 / 630 + b * (-2.4 + b * (-24832 / 14175))), c *= b, this.cgb[4] = c * (4174 / 315 + b * (-144838 / 6237)), this.cbg[4] = c * (-734 / 315 + b * (109598 / 31185)), c *= b, this.cgb[5] = c * (601676 / 22275), this.cbg[5] = c * (444337 / 155925), c = Math.pow(b, 2), this.Qn = this.k0 / (1 + b) * (1 + c * (.25 + c * (1 / 64 + c / 256))), this.utg[0] = b * (-.5 + b * (2 / 3 + b * (-37 / 96 + b * (1 / 360 + b * (81 / 512 + b * (-96199 / 604800)))))), this.gtu[0] = b * (.5 + b * (-2 / 3 + b * (5 / 16 + b * (41 / 180 + b * (-127 / 288 + b * (7891 / 37800)))))), this.utg[1] = c * (-1 / 48 + b * (-1 / 15 + b * (437 / 1440 + b * (-46 / 105 + b * (1118711 / 3870720))))), this.gtu[1] = c * (13 / 48 + b * (-.6 + b * (557 / 1440 + b * (281 / 630 + b * (-1983433 / 1935360))))), c *= b, this.utg[2] = c * (-17 / 480 + b * (37 / 840 + b * (209 / 4480 + b * (-5569 / 90720)))), this.gtu[2] = c * (61 / 240 + b * (-103 / 140 + b * (15061 / 26880 + b * (167603 / 181440)))), c *= b, this.utg[3] = c * (-4397 / 161280 + b * (11 / 504 + b * (830251 / 7257600))), this.gtu[3] = c * (49561 / 161280 + b * (-179 / 168 + b * (6601661 / 7257600))), c *= b, this.utg[4] = c * (-4583 / 161280 + b * (108847 / 3991680)), this.gtu[4] = c * (34729 / 80640 + b * (-3418889 / 1995840)), c *= b, this.utg[5] = c * -.03233083094085698, this.gtu[5] = .6650675310896665 * c;
            var d = bd(this.cbg, this.lat0);
            this.Zb = -this.Qn * (d + cd(this.gtu, 2 * d))
        }
        function da(a) {
            var b = fc(a.x - this.long0), c = a.y;
            c = bd(this.cbg, c);
            var d = Math.sin(c), e = Math.cos(c), f = Math.sin(b), g = Math.cos(b);
            c = Math.atan2(d, g * e), b = Math.atan2(f * e, $c(d, e * g)), b = ad(Math.tan(b));
            var h = ed(this.gtu, 2 * c, 2 * b);
            c += h[0], b += h[1];
            var i, j;
            return Math.abs(b) <= 2.623395162778 ? (i = this.a * (this.Qn * b) + this.x0, j = this.a * (this.Qn * c + this.Zb) + this.y0) : (i = 1 / 0, j = 1 / 0), a.x = i, a.y = j, a
        }
        function ea(a) {
            var b = (a.x - this.x0) * (1 / this.a), c = (a.y - this.y0) * (1 / this.a);
            c = (c - this.Zb) / this.Qn, b /= this.Qn;
            var d, e;
            if (Math.abs(b) <= 2.623395162778) {
                var f = ed(this.utg, 2 * c, 2 * b);
                c += f[0], b += f[1], b = Math.atan(Zc(b));
                var g = Math.sin(c), h = Math.cos(c), i = Math.sin(b), j = Math.cos(b);
                c = Math.atan2(g * j, $c(i, j * h)), b = Math.atan2(i, j * h), d = fc(b + this.long0), e = bd(this.cgb, c)
            } else
                d = 1 / 0, e = 1 / 0;
            return a.x = d, a.y = e, a
        }
        function fa() {
            var a = hd(this.zone, this.long0);
            if (void 0 === a)
                throw new Error("unknown utm zone");
            this.lat0 = 0, this.long0 = (6 * Math.abs(a) - 183) * Hb, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = .9996, gd.init.apply(this), this.forward = gd.forward, this.inverse = gd.inverse
        }
        function ga() {
            var a = Math.sin(this.lat0), b = Math.cos(this.lat0);
            b *= b, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * a * a), this.C = Math.sqrt(1 + this.es * b * b / (1 - this.es)), this.phic0 = Math.asin(a / this.C), this.ratexp = .5 * this.C * this.e, this.K = Math.tan(.5 * this.phic0 + Jb) / (Math.pow(Math.tan(.5 * this.lat0 + Jb), this.C) * ld(this.e * a, this.ratexp))
        }
        function ha(a) {
            var b = a.x, c = a.y;
            return a.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * c + Jb), this.C) * ld(this.e * Math.sin(c), this.ratexp)) - Cb, a.x = this.C * b, a
        }
        function ia(a) {
            for (var b = 1e-14, c = a.x / this.C, d = a.y, e = Math.pow(Math.tan(.5 * d + Jb) / this.K, 1 / this.C), f = md; f > 0 && (d = 2 * Math.atan(e * ld(this.e * Math.sin(a.y), - .5 * this.e)) - Cb, !(Math.abs(d - a.y) < b)); --f)
                a.y = d;
            return f ? (a.x = c, a.y = d, a) : null
        }
        function ja() {
            od.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"))
        }
        function ka(a) {
            var b, c, d, e;
            return a.x = fc(a.x - this.long0), od.forward.apply(this, [a]), b = Math.sin(a.y), c = Math.cos(a.y), d = Math.cos(a.x), e = this.k0 * this.R2 / (1 + this.sinc0 * b + this.cosc0 * c * d), a.x = e * c * Math.sin(a.x), a.y = e * (this.cosc0 * b - this.sinc0 * c * d), a.x = this.a * a.x + this.x0, a.y = this.a * a.y + this.y0, a
        }
        function la(a) {
            var b, c, d, e, f;
            if (a.x = (a.x - this.x0) / this.a, a.y = (a.y - this.y0) / this.a, a.x /= this.k0, a.y /= this.k0, f = Math.sqrt(a.x * a.x + a.y * a.y)) {
                var g = 2 * Math.atan2(f, this.R2);
                b = Math.sin(g), c = Math.cos(g), e = Math.asin(c * this.sinc0 + a.y * b * this.cosc0 / f), d = Math.atan2(a.x * b, f * this.cosc0 * c - a.y * this.sinc0 * b)
            } else
                e = this.phic0, d = 0;
            return a.x = d, a.y = e, od.inverse.apply(this, [a]), a.x = fc(a.x + this.long0), a
        }
        function ma(a, b, c) {
            return b *= c, Math.tan(.5 * (Cb + a)) * Math.pow((1 - b) / (1 + b), .5 * c)
        }
        function na() {
            this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= Gb && (this.k0 = .5 * (1 + ec(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= Gb && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= Gb && (this.k0 = .5 * this.cons * dc(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / gc(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = dc(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - Cb, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0))
        }
        function oa(a) {
            var b, c, d, e, f, g, h = a.x, i = a.y, j = Math.sin(i), k = Math.cos(i), l = fc(h - this.long0);
            return Math.abs(Math.abs(h - this.long0) - Math.PI) <= Gb && Math.abs(i + this.lat0) <= Gb ? (a.x = NaN, a.y = NaN, a) : this.sphere ? (b = 2 * this.k0 / (1 + this.sinlat0 * j + this.coslat0 * k * Math.cos(l)), a.x = this.a * b * k * Math.sin(l) + this.x0, a.y = this.a * b * (this.coslat0 * j - this.sinlat0 * k * Math.cos(l)) + this.y0, a) : (c = 2 * Math.atan(this.ssfn_(i, j, this.e)) - Cb, e = Math.cos(c), d = Math.sin(c), Math.abs(this.coslat0) <= Gb ? (f = gc(this.e, i * this.con, this.con * j), g = 2 * this.a * this.k0 * f / this.cons, a.x = this.x0 + g * Math.sin(h - this.long0), a.y = this.y0 - this.con * g * Math.cos(h - this.long0), a) : (Math.abs(this.sinlat0) < Gb ? (b = 2 * this.a * this.k0 / (1 + e * Math.cos(l)), a.y = b * d) : (b = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * d + this.cosX0 * e * Math.cos(l))), a.y = b * (this.cosX0 * d - this.sinX0 * e * Math.cos(l)) + this.y0), a.x = b * e * Math.sin(l) + this.x0, a))
        }
        function pa(a) {
            a.x -= this.x0, a.y -= this.y0;
            var b, c, d, e, f, g = Math.sqrt(a.x * a.x + a.y * a.y);
            if (this.sphere) {
                var h = 2 * Math.atan(g / (.5 * this.a * this.k0));
                return b = this.long0, c = this.lat0, g <= Gb ? (a.x = b, a.y = c, a) : (c = Math.asin(Math.cos(h) * this.sinlat0 + a.y * Math.sin(h) * this.coslat0 / g), b = fc(Math.abs(this.coslat0) < Gb ? this.lat0 > 0 ? this.long0 + Math.atan2(a.x, -1 * a.y) : this.long0 + Math.atan2(a.x, a.y) : this.long0 + Math.atan2(a.x * Math.sin(h), g * this.coslat0 * Math.cos(h) - a.y * this.sinlat0 * Math.sin(h))), a.x = b, a.y = c, a)
            }
            if (Math.abs(this.coslat0) <= Gb) {
                if (g <= Gb)
                    return c = this.lat0, b = this.long0, a.x = b, a.y = c, a;
                a.x *= this.con, a.y *= this.con, d = g * this.cons / (2 * this.a * this.k0), c = this.con * hc(this.e, d), b = this.con * fc(this.con * this.long0 + Math.atan2(a.x, -1 * a.y))
            } else
                e = 2 * Math.atan(g * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), b = this.long0, g <= Gb ? f = this.X0 : (f = Math.asin(Math.cos(e) * this.sinX0 + a.y * Math.sin(e) * this.cosX0 / g), b = fc(this.long0 + Math.atan2(a.x * Math.sin(e), g * this.cosX0 * Math.cos(e) - a.y * this.sinX0 * Math.sin(e)))), c = -1 * hc(this.e, Math.tan(.5 * (Cb + f)));
            return a.x = b, a.y = c, a
        }
        function qa() {
            var a = this.lat0;
            this.lambda0 = this.long0;
            var b = Math.sin(a), c = this.a, d = this.rf, e = 1 / d, f = 2 * e - Math.pow(e, 2), g = this.e = Math.sqrt(f);
            this.R = this.k0 * c * Math.sqrt(1 - f) / (1 - f * Math.pow(b, 2)), this.alpha = Math.sqrt(1 + f / (1 - f) * Math.pow(Math.cos(a), 4)), this.b0 = Math.asin(b / this.alpha);
            var h = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)), i = Math.log(Math.tan(Math.PI / 4 + a / 2)), j = Math.log((1 + g * b) / (1 - g * b));
            this.K = h - this.alpha * i + this.alpha * g / 2 * j
        }
        function ra(a) {
            var b = Math.log(Math.tan(Math.PI / 4 - a.y / 2)), c = this.e / 2 * Math.log((1 + this.e * Math.sin(a.y)) / (1 - this.e * Math.sin(a.y))), d = -this.alpha * (b + c) + this.K, e = 2 * (Math.atan(Math.exp(d)) - Math.PI / 4), f = this.alpha * (a.x - this.lambda0), g = Math.atan(Math.sin(f) / (Math.sin(this.b0) * Math.tan(e) + Math.cos(this.b0) * Math.cos(f))), h = Math.asin(Math.cos(this.b0) * Math.sin(e) - Math.sin(this.b0) * Math.cos(e) * Math.cos(f));
            return a.y = this.R / 2 * Math.log((1 + Math.sin(h)) / (1 - Math.sin(h))) + this.y0, a.x = this.R * g + this.x0, a
        }
        function sa(a) {
            for (var b = a.x - this.x0, c = a.y - this.y0, d = b / this.R, e = 2 * (Math.atan(Math.exp(c / this.R)) - Math.PI / 4), f = Math.asin(Math.cos(this.b0) * Math.sin(e) + Math.sin(this.b0) * Math.cos(e) * Math.cos(d)), g = Math.atan(Math.sin(d) / (Math.cos(this.b0) * Math.cos(d) - Math.sin(this.b0) * Math.tan(e))), h = this.lambda0 + g / this.alpha, i = 0, j = f, k = -1e3, l = 0; Math.abs(j - k) > 1e-7; ) {
                if (++l > 20)
                    return;
                i = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + f / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(j)) / 2)), k = j, j = 2 * Math.atan(Math.exp(i)) - Math.PI / 2
            }
            return a.x = h, a.y = j, a
        }
        function ta() {
            this.no_off = this.no_off || !1, this.no_rot = this.no_rot || !1, isNaN(this.k0) && (this.k0 = 1);
            var a = Math.sin(this.lat0), b = Math.cos(this.lat0), c = this.e * a;
            this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(b, 4)), this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - c * c);
            var d = gc(this.e, this.lat0, a), e = this.bl / b * Math.sqrt((1 - this.es) / (1 - c * c));
            e * e < 1 && (e = 1);
            var f, g;
            if (isNaN(this.longc)) {
                var h = gc(this.e, this.lat1, Math.sin(this.lat1)), i = gc(this.e, this.lat2, Math.sin(this.lat2));
                this.lat0 >= 0 ? this.el = (e + Math.sqrt(e * e - 1)) * Math.pow(d, this.bl) : this.el = (e - Math.sqrt(e * e - 1)) * Math.pow(d, this.bl);
                var j = Math.pow(h, this.bl), k = Math.pow(i, this.bl);
                f = this.el / j, g = .5 * (f - 1 / f);
                var l = (this.el * this.el - k * j) / (this.el * this.el + k * j), m = (k - j) / (k + j), n = fc(this.long1 - this.long2);
                this.long0 = .5 * (this.long1 + this.long2) - Math.atan(l * Math.tan(.5 * this.bl * n) / m) / this.bl, this.long0 = fc(this.long0);
                var o = fc(this.long1 - this.long0);
                this.gamma0 = Math.atan(Math.sin(this.bl * o) / g), this.alpha = Math.asin(e * Math.sin(this.gamma0))
            } else
                f = this.lat0 >= 0 ? e + Math.sqrt(e * e - 1) : e - Math.sqrt(e * e - 1), this.el = f * Math.pow(d, this.bl), g = .5 * (f - 1 / f), this.gamma0 = Math.asin(Math.sin(this.alpha) / e), this.long0 = this.longc - Math.asin(g * Math.tan(this.gamma0)) / this.bl;
            this.no_off ? this.uc = 0 : this.lat0 >= 0 ? this.uc = this.al / this.bl * Math.atan2(Math.sqrt(e * e - 1), Math.cos(this.alpha)) : this.uc = -1 * this.al / this.bl * Math.atan2(Math.sqrt(e * e - 1), Math.cos(this.alpha))
        }
        function ua(a) {
            var b, c, d, e = a.x, f = a.y, g = fc(e - this.long0);
            if (Math.abs(Math.abs(f) - Cb) <= Gb)
                d = f > 0 ? -1 : 1, c = this.al / this.bl * Math.log(Math.tan(Jb + d * this.gamma0 * .5)), b = -1 * d * Cb * this.al / this.bl;
            else {
                var h = gc(this.e, f, Math.sin(f)), i = this.el / Math.pow(h, this.bl), j = .5 * (i - 1 / i), k = .5 * (i + 1 / i), l = Math.sin(this.bl * g), m = (j * Math.sin(this.gamma0) - l * Math.cos(this.gamma0)) / k;
                c = Math.abs(Math.abs(m) - 1) <= Gb ? Number.POSITIVE_INFINITY : .5 * this.al * Math.log((1 - m) / (1 + m)) / this.bl, b = Math.abs(Math.cos(this.bl * g)) <= Gb ? this.al * this.bl * g : this.al * Math.atan2(j * Math.cos(this.gamma0) + l * Math.sin(this.gamma0), Math.cos(this.bl * g)) / this.bl
            }
            return this.no_rot ? (a.x = this.x0 + b, a.y = this.y0 + c) : (b -= this.uc, a.x = this.x0 + c * Math.cos(this.alpha) + b * Math.sin(this.alpha), a.y = this.y0 + b * Math.cos(this.alpha) - c * Math.sin(this.alpha)), a
        }
        function va(a) {
            var b, c;
            this.no_rot ? (c = a.y - this.y0, b = a.x - this.x0) : (c = (a.x - this.x0) * Math.cos(this.alpha) - (a.y - this.y0) * Math.sin(this.alpha), b = (a.y - this.y0) * Math.cos(this.alpha) + (a.x - this.x0) * Math.sin(this.alpha), b += this.uc);
            var d = Math.exp(-1 * this.bl * c / this.al), e = .5 * (d - 1 / d), f = .5 * (d + 1 / d), g = Math.sin(this.bl * b / this.al), h = (g * Math.cos(this.gamma0) + e * Math.sin(this.gamma0)) / f, i = Math.pow(this.el / Math.sqrt((1 + h) / (1 - h)), 1 / this.bl);
            return Math.abs(h - 1) < Gb ? (a.x = this.long0, a.y = Cb) : Math.abs(h + 1) < Gb ? (a.x = this.long0, a.y = -1 * Cb) : (a.y = hc(this.e, i), a.x = fc(this.long0 - Math.atan2(e * Math.cos(this.gamma0) - g * Math.sin(this.gamma0), Math.cos(this.bl * b / this.al)) / this.bl)), a
        }
        function wa() {
            if (this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < Gb)) {
                var a = this.b / this.a;
                this.e = Math.sqrt(1 - a * a);
                var b = Math.sin(this.lat1), c = Math.cos(this.lat1), d = dc(this.e, b, c), e = gc(this.e, this.lat1, b), f = Math.sin(this.lat2), g = Math.cos(this.lat2), h = dc(this.e, f, g), i = gc(this.e, this.lat2, f), j = gc(this.e, this.lat0, Math.sin(this.lat0));
                Math.abs(this.lat1 - this.lat2) > Gb ? this.ns = Math.log(d / h) / Math.log(e / i) : this.ns = b, isNaN(this.ns) && (this.ns = b), this.f0 = d / (this.ns * Math.pow(e, this.ns)), this.rh = this.a * this.f0 * Math.pow(j, this.ns), this.title || (this.title = "Lambert Conformal Conic")
            }
        }
        function xa(a) {
            var b = a.x, c = a.y;
            Math.abs(2 * Math.abs(c) - Math.PI) <= Gb && (c = ec(c) * (Cb - 2 * Gb));
            var d, e, f = Math.abs(Math.abs(c) - Cb);
            if (f > Gb)
                d = gc(this.e, c, Math.sin(c)), e = this.a * this.f0 * Math.pow(d, this.ns);
            else {
                if (f = c * this.ns, f <= 0)
                    return null;
                e = 0
            }
            var g = this.ns * fc(b - this.long0);
            return a.x = this.k0 * (e * Math.sin(g)) + this.x0, a.y = this.k0 * (this.rh - e * Math.cos(g)) + this.y0, a
        }
        function ya(a) {
            var b, c, d, e, f, g = (a.x - this.x0) / this.k0, h = this.rh - (a.y - this.y0) / this.k0;
            this.ns > 0 ? (b = Math.sqrt(g * g + h * h), c = 1) : (b = -Math.sqrt(g * g + h * h), c = -1);
            var i = 0;
            if (0 !== b && (i = Math.atan2(c * g, c * h)), 0 !== b || this.ns > 0) {
                if (c = 1 / this.ns, d = Math.pow(b / (this.a * this.f0), c), e = hc(this.e, d), e === -9999)
                    return null
            } else
                e = -Cb;
            return f = fc(i / this.ns + this.long0), a.x = f, a.y = e, a
        }
        function za() {
            this.a = 6377397.155, this.es = .006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = .863937979737193), this.long0 || (this.long0 = .4334234309119251), this.k0 || (this.k0 = .9999), this.s45 = .785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq
        }
        function Aa(a) {
            var b, c, d, e, f, g, h, i = a.x, j = a.y, k = fc(i - this.long0);
            return b = Math.pow((1 + this.e * Math.sin(j)) / (1 - this.e * Math.sin(j)), this.alfa * this.e / 2), c = 2 * (Math.atan(this.k * Math.pow(Math.tan(j / 2 + this.s45), this.alfa) / b) - this.s45), d = -k * this.alfa,
                    e = Math.asin(Math.cos(this.ad) * Math.sin(c) + Math.sin(this.ad) * Math.cos(c) * Math.cos(d)), f = Math.asin(Math.cos(c) * Math.sin(d) / Math.cos(e)), g = this.n * f, h = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(e / 2 + this.s45), this.n), a.y = h * Math.cos(g) / 1, a.x = h * Math.sin(g) / 1, this.czech || (a.y *= -1, a.x *= -1), a
        }
        function Ba(a) {
            var b, c, d, e, f, g, h, i, j = a.x;
            a.x = a.y, a.y = j, this.czech || (a.y *= -1, a.x *= -1), g = Math.sqrt(a.x * a.x + a.y * a.y), f = Math.atan2(a.y, a.x), e = f / Math.sin(this.s0), d = 2 * (Math.atan(Math.pow(this.ro0 / g, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), b = Math.asin(Math.cos(this.ad) * Math.sin(d) - Math.sin(this.ad) * Math.cos(d) * Math.cos(e)), c = Math.asin(Math.cos(d) * Math.sin(e) / Math.cos(b)), a.x = this.long0 - c / this.alfa, h = b, i = 0;
            var k = 0;
            do
                a.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(b / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(h)) / (1 - this.e * Math.sin(h)), this.e / 2)) - this.s45), Math.abs(h - a.y) < 1e-10 && (i = 1), h = a.y, k += 1;
            while (0 === i && k < 15);
            return k >= 15 ? null : a
        }
        function Ca() {
            this.sphere || (this.e0 = Cd(this.es), this.e1 = Dd(this.es), this.e2 = Ed(this.es), this.e3 = Fd(this.es), this.ml0 = this.a * Bd(this.e0, this.e1, this.e2, this.e3, this.lat0))
        }
        function Da(a) {
            var b, c, d = a.x, e = a.y;
            if (d = fc(d - this.long0), this.sphere)
                b = this.a * Math.asin(Math.cos(e) * Math.sin(d)), c = this.a * (Math.atan2(Math.tan(e), Math.cos(d)) - this.lat0);
            else {
                var f = Math.sin(e), g = Math.cos(e), h = Gd(this.a, this.e, f), i = Math.tan(e) * Math.tan(e), j = d * Math.cos(e), k = j * j, l = this.es * g * g / (1 - this.es), m = this.a * Bd(this.e0, this.e1, this.e2, this.e3, e);
                b = h * j * (1 - k * i * (1 / 6 - (8 - i + 8 * l) * k / 120)), c = m - this.ml0 + h * f / g * k * (.5 + (5 - i + 6 * l) * k / 24)
            }
            return a.x = b + this.x0, a.y = c + this.y0, a
        }
        function Ea(a) {
            a.x -= this.x0, a.y -= this.y0;
            var b, c, d = a.x / this.a, e = a.y / this.a;
            if (this.sphere) {
                var f = e + this.lat0;
                b = Math.asin(Math.sin(f) * Math.cos(d)), c = Math.atan2(Math.tan(d), Math.cos(f))
            } else {
                var g = this.ml0 / this.a + e, h = Id(g, this.e0, this.e1, this.e2, this.e3);
                if (Math.abs(Math.abs(h) - Cb) <= Gb)
                    return a.x = this.long0, a.y = Cb, e < 0 && (a.y *= -1), a;
                var i = Gd(this.a, this.e, Math.sin(h)), j = i * i * i / this.a / this.a * (1 - this.es), k = Math.pow(Math.tan(h), 2), l = d * this.a / i, m = l * l;
                b = h - i * Math.tan(h) / j * l * l * (.5 - (1 + 3 * k) * l * l / 24), c = l * (1 - m * (k / 3 + (1 + 3 * k) * k * m / 15)) / Math.cos(h)
            }
            return a.x = fc(c + this.long0), a.y = Hd(b), a
        }
        function Fa() {
            var a = Math.abs(this.lat0);
            if (Math.abs(a - Cb) < Gb ? this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE : Math.abs(a) < Gb ? this.mode = this.EQUIT : this.mode = this.OBLIQ, this.es > 0) {
                var b;
                switch (this.qp = Ld(this.e, 1), this.mmf = .5 / (1 - this.es), this.apa = Ia(this.es), this.mode) {
                    case this.N_POLE:
                        this.dd = 1;
                        break;
                    case this.S_POLE:
                        this.dd = 1;
                        break;
                    case this.EQUIT:
                        this.rq = Math.sqrt(.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = .5 * this.qp;
                        break;
                    case this.OBLIQ:
                        this.rq = Math.sqrt(.5 * this.qp), b = Math.sin(this.lat0), this.sinb1 = Ld(this.e, b) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * b * b) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd
                }
            } else
                this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0))
        }
        function Ga(a) {
            var b, c, d, e, f, g, h, i, j, k, l = a.x, m = a.y;
            if (l = fc(l - this.long0), this.sphere) {
                if (f = Math.sin(m), k = Math.cos(m), d = Math.cos(l), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                    if (c = this.mode === this.EQUIT ? 1 + k * d : 1 + this.sinph0 * f + this.cosph0 * k * d, c <= Gb)
                        return null;
                    c = Math.sqrt(2 / c), b = c * k * Math.sin(l), c *= this.mode === this.EQUIT ? f : this.cosph0 * f - this.sinph0 * k * d
                } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                    if (this.mode === this.N_POLE && (d = -d), Math.abs(m + this.phi0) < Gb)
                        return null;
                    c = Jb - .5 * m, c = 2 * (this.mode === this.S_POLE ? Math.cos(c) : Math.sin(c)), b = c * Math.sin(l), c *= d
                }
            } else {
                switch (h = 0, i = 0, j = 0, d = Math.cos(l), e = Math.sin(l), f = Math.sin(m), g = Ld(this.e, f), this.mode !== this.OBLIQ && this.mode !== this.EQUIT || (h = g / this.qp, i = Math.sqrt(1 - h * h)), this.mode) {
                    case this.OBLIQ:
                        j = 1 + this.sinb1 * h + this.cosb1 * i * d;
                        break;
                    case this.EQUIT:
                        j = 1 + i * d;
                        break;
                    case this.N_POLE:
                        j = Cb + m, g = this.qp - g;
                        break;
                    case this.S_POLE:
                        j = m - Cb, g = this.qp + g
                }
                if (Math.abs(j) < Gb)
                    return null;
                switch (this.mode) {
                    case this.OBLIQ:
                    case this.EQUIT:
                        j = Math.sqrt(2 / j), c = this.mode === this.OBLIQ ? this.ymf * j * (this.cosb1 * h - this.sinb1 * i * d) : (j = Math.sqrt(2 / (1 + i * d))) * h * this.ymf, b = this.xmf * j * i * e;
                        break;
                    case this.N_POLE:
                    case this.S_POLE:
                        g >= 0 ? (b = (j = Math.sqrt(g)) * e, c = d * (this.mode === this.S_POLE ? j : -j)) : b = c = 0
                }
            }
            return a.x = this.a * b + this.x0, a.y = this.a * c + this.y0, a
        }
        function Ha(a) {
            a.x -= this.x0, a.y -= this.y0;
            var b, c, d, e, f, g, h, i = a.x / this.a, j = a.y / this.a;
            if (this.sphere) {
                var k, l = 0, m = 0;
                if (k = Math.sqrt(i * i + j * j), c = .5 * k, c > 1)
                    return null;
                switch (c = 2 * Math.asin(c), this.mode !== this.OBLIQ && this.mode !== this.EQUIT || (m = Math.sin(c), l = Math.cos(c)), this.mode) {
                    case this.EQUIT:
                        c = Math.abs(k) <= Gb ? 0 : Math.asin(j * m / k), i *= m, j = l * k;
                        break;
                    case this.OBLIQ:
                        c = Math.abs(k) <= Gb ? this.phi0 : Math.asin(l * this.sinph0 + j * m * this.cosph0 / k), i *= m * this.cosph0, j = (l - Math.sin(c) * this.sinph0) * k;
                        break;
                    case this.N_POLE:
                        j = -j, c = Cb - c;
                        break;
                    case this.S_POLE:
                        c -= Cb
                }
                b = 0 !== j || this.mode !== this.EQUIT && this.mode !== this.OBLIQ ? Math.atan2(i, j) : 0
            } else {
                if (h = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                    if (i /= this.dd, j *= this.dd, g = Math.sqrt(i * i + j * j), g < Gb)
                        return a.x = 0, a.y = this.phi0, a;
                    e = 2 * Math.asin(.5 * g / this.rq), d = Math.cos(e), i *= e = Math.sin(e), this.mode === this.OBLIQ ? (h = d * this.sinb1 + j * e * this.cosb1 / g, f = this.qp * h, j = g * this.cosb1 * d - j * this.sinb1 * e) : (h = j * e / g, f = this.qp * h, j = g * d)
                } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                    if (this.mode === this.N_POLE && (j = -j), f = i * i + j * j, !f)
                        return a.x = 0, a.y = this.phi0, a;
                    h = 1 - f / this.qp, this.mode === this.S_POLE && (h = -h)
                }
                b = Math.atan2(i, j), c = Ja(Math.asin(h), this.apa)
            }
            return a.x = fc(this.long0 + b), a.y = c, a
        }
        function Ia(a) {
            var b, c = [];
            return c[0] = a * Qd, b = a * a, c[0] += b * Rd, c[1] = b * Td, b *= a, c[0] += b * Sd, c[1] += b * Ud, c[2] = b * Vd, c
        }
        function Ja(a, b) {
            var c = a + a;
            return a + b[0] * Math.sin(c) + b[1] * Math.sin(c + c) + b[2] * Math.sin(c + c + c)
        }
        function Ka() {
            Math.abs(this.lat1 + this.lat2) < Gb || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = dc(this.e3, this.sin_po, this.cos_po), this.qs1 = Ld(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = dc(this.e3, this.sin_po, this.cos_po), this.qs2 = Ld(this.e3, this.sin_po, this.cos_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = Ld(this.e3, this.sin_po, this.cos_po), Math.abs(this.lat1 - this.lat2) > Gb ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0)
        }
        function La(a) {
            var b = a.x, c = a.y;
            this.sin_phi = Math.sin(c), this.cos_phi = Math.cos(c);
            var d = Ld(this.e3, this.sin_phi, this.cos_phi), e = this.a * Math.sqrt(this.c - this.ns0 * d) / this.ns0, f = this.ns0 * fc(b - this.long0), g = e * Math.sin(f) + this.x0, h = this.rh - e * Math.cos(f) + this.y0;
            return a.x = g, a.y = h, a
        }
        function Ma(a) {
            var b, c, d, e, f, g;
            return a.x -= this.x0, a.y = this.rh - a.y + this.y0, this.ns0 >= 0 ? (b = Math.sqrt(a.x * a.x + a.y * a.y), d = 1) : (b = -Math.sqrt(a.x * a.x + a.y * a.y), d = -1), e = 0, 0 !== b && (e = Math.atan2(d * a.x, d * a.y)), d = b * this.ns0 / this.a, this.sphere ? g = Math.asin((this.c - d * d) / (2 * this.ns0)) : (c = (this.c - d * d) / this.ns0, g = this.phi1z(this.e3, c)), f = fc(e / this.ns0 + this.long0), a.x = f, a.y = g, a
        }
        function Na(a, b) {
            var c, d, e, f, g, h = Yd(.5 * b);
            if (a < Gb)
                return h;
            for (var i = a * a, j = 1; j <= 25; j++)
                if (c = Math.sin(h), d = Math.cos(h), e = a * c, f = 1 - e * e, g = .5 * f * f / d * (b / (1 - i) - c / f + .5 / a * Math.log((1 - e) / (1 + e))), h += g, Math.abs(g) <= 1e-7)
                    return h;
            return null
        }
        function Oa() {
            this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1
        }
        function Pa(a) {
            var b, c, d, e, f, g, h, i, j = a.x, k = a.y;
            return d = fc(j - this.long0), b = Math.sin(k), c = Math.cos(k), e = Math.cos(d), g = this.sin_p14 * b + this.cos_p14 * c * e, f = 1, g > 0 || Math.abs(g) <= Gb ? (h = this.x0 + this.a * f * c * Math.sin(d) / g, i = this.y0 + this.a * f * (this.cos_p14 * b - this.sin_p14 * c * e) / g) : (h = this.x0 + this.infinity_dist * c * Math.sin(d), i = this.y0 + this.infinity_dist * (this.cos_p14 * b - this.sin_p14 * c * e)), a.x = h, a.y = i, a
        }
        function Qa(a) {
            var b, c, d, e, f, g;
            return a.x = (a.x - this.x0) / this.a, a.y = (a.y - this.y0) / this.a, a.x /= this.k0, a.y /= this.k0, (b = Math.sqrt(a.x * a.x + a.y * a.y)) ? (e = Math.atan2(b, this.rc), c = Math.sin(e), d = Math.cos(e), g = Yd(d * this.sin_p14 + a.y * c * this.cos_p14 / b), f = Math.atan2(a.x * c, b * this.cos_p14 * d - a.y * this.sin_p14 * c), f = fc(this.long0 + f)) : (g = this.phic0, f = 0), a.x = f, a.y = g, a
        }
        function Ra() {
            this.sphere || (this.k0 = dc(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)))
        }
        function Sa(a) {
            var b, c, d = a.x, e = a.y, f = fc(d - this.long0);
            if (this.sphere)
                b = this.x0 + this.a * f * Math.cos(this.lat_ts), c = this.y0 + this.a * Math.sin(e) / Math.cos(this.lat_ts);
            else {
                var g = Ld(this.e, Math.sin(e));
                b = this.x0 + this.a * this.k0 * f, c = this.y0 + this.a * g * .5 / this.k0
            }
            return a.x = b, a.y = c, a
        }
        function Ta(a) {
            a.x -= this.x0, a.y -= this.y0;
            var b, c;
            return this.sphere ? (b = fc(this.long0 + a.x / this.a / Math.cos(this.lat_ts)), c = Math.asin(a.y / this.a * Math.cos(this.lat_ts))) : (c = be(this.e, 2 * a.y * this.k0 / this.a), b = fc(this.long0 + a.x / (this.a * this.k0))), a.x = b, a.y = c, a
        }
        function Ua() {
            this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts)
        }
        function Va(a) {
            var b = a.x, c = a.y, d = fc(b - this.long0), e = Hd(c - this.lat0);
            return a.x = this.x0 + this.a * d * this.rc, a.y = this.y0 + this.a * e, a
        }
        function Wa(a) {
            var b = a.x, c = a.y;
            return a.x = fc(this.long0 + (b - this.x0) / (this.a * this.rc)), a.y = Hd(this.lat0 + (c - this.y0) / this.a), a
        }
        function Xa() {
            this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = Cd(this.es), this.e1 = Dd(this.es), this.e2 = Ed(this.es), this.e3 = Fd(this.es), this.ml0 = this.a * Bd(this.e0, this.e1, this.e2, this.e3, this.lat0)
        }
        function Ya(a) {
            var b, c, d, e = a.x, f = a.y, g = fc(e - this.long0);
            if (d = g * Math.sin(f), this.sphere)
                Math.abs(f) <= Gb ? (b = this.a * g, c = -1 * this.a * this.lat0) : (b = this.a * Math.sin(d) / Math.tan(f), c = this.a * (Hd(f - this.lat0) + (1 - Math.cos(d)) / Math.tan(f)));
            else if (Math.abs(f) <= Gb)
                b = this.a * g, c = -1 * this.ml0;
            else {
                var h = Gd(this.a, this.e, Math.sin(f)) / Math.tan(f);
                b = h * Math.sin(d), c = this.a * Bd(this.e0, this.e1, this.e2, this.e3, f) - this.ml0 + h * (1 - Math.cos(d))
            }
            return a.x = b + this.x0, a.y = c + this.y0, a
        }
        function Za(a) {
            var b, c, d, e, f, g, h, i, j;
            if (d = a.x - this.x0, e = a.y - this.y0, this.sphere)
                if (Math.abs(e + this.a * this.lat0) <= Gb)
                    b = fc(d / this.a + this.long0), c = 0;
                else {
                    g = this.lat0 + e / this.a, h = d * d / this.a / this.a + g * g, i = g;
                    var k;
                    for (f = ge; f; --f)
                        if (k = Math.tan(i), j = -1 * (g * (i * k + 1) - i - .5 * (i * i + h) * k) / ((i - g) / k - 1), i += j, Math.abs(j) <= Gb) {
                            c = i;
                            break
                        }
                    b = fc(this.long0 + Math.asin(d * Math.tan(i) / this.a) / Math.sin(c))
                }
            else if (Math.abs(e + this.ml0) <= Gb)
                c = 0, b = fc(this.long0 + d / this.a);
            else {
                g = (this.ml0 + e) / this.a, h = d * d / this.a / this.a + g * g, i = g;
                var l, m, n, o, p;
                for (f = ge; f; --f)
                    if (p = this.e * Math.sin(i), l = Math.sqrt(1 - p * p) * Math.tan(i), m = this.a * Bd(this.e0, this.e1, this.e2, this.e3, i), n = this.e0 - 2 * this.e1 * Math.cos(2 * i) + 4 * this.e2 * Math.cos(4 * i) - 6 * this.e3 * Math.cos(6 * i), o = m / this.a, j = (g * (l * o + 1) - o - .5 * l * (o * o + h)) / (this.es * Math.sin(2 * i) * (o * o + h - 2 * g * o) / (4 * l) + (g - o) * (l * n - 2 / Math.sin(2 * i)) - n), i -= j, Math.abs(j) <= Gb) {
                        c = i;
                        break
                    }
                l = Math.sqrt(1 - this.es * Math.pow(Math.sin(c), 2)) * Math.tan(c), b = fc(this.long0 + Math.asin(d * l / this.a) / Math.sin(c))
            }
            return a.x = b, a.y = c, a
        }
        function $a() {
            this.A = [], this.A[1] = .6399175073, this.A[2] = -.1358797613, this.A[3] = .063294409, this.A[4] = -.02526853, this.A[5] = .0117879, this.A[6] = -.0055161, this.A[7] = .0026906, this.A[8] = -.001333, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = .7557853228, this.B_im[1] = 0, this.B_re[2] = .249204646, this.B_im[2] = .003371507, this.B_re[3] = -.001541739, this.B_im[3] = .04105856, this.B_re[4] = -.10162907, this.B_im[4] = .01727609, this.B_re[5] = -.26623489, this.B_im[5] = -.36249218, this.B_re[6] = -.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -.577245789, this.C_im[2] = -.007809598, this.C_re[3] = .508307513, this.C_im[3] = -.112208952, this.C_re[4] = -.15094762, this.C_im[4] = .18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = .5185406398, this.D[3] = -.03333098, this.D[4] = -.1052906, this.D[5] = -.0368594, this.D[6] = .007317, this.D[7] = .0122, this.D[8] = .00394, this.D[9] = -.0013
        }
        function _a(a) {
            var b, c = a.x, d = a.y, e = d - this.lat0, f = c - this.long0, g = e / Bb * 1e-5, h = f, i = 1, j = 0;
            for (b = 1; b <= 10; b++)
                i *= g, j += this.A[b] * i;
            var k, l, m = j, n = h, o = 1, p = 0, q = 0, r = 0;
            for (b = 1; b <= 6; b++)
                k = o * m - p * n, l = p * m + o * n, o = k, p = l, q = q + this.B_re[b] * o - this.B_im[b] * p, r = r + this.B_im[b] * o + this.B_re[b] * p;
            return a.x = r * this.a + this.x0, a.y = q * this.a + this.y0, a
        }
        function ab(a) {
            var b, c, d, e = a.x, f = a.y, g = e - this.x0, h = f - this.y0, i = h / this.a, j = g / this.a, k = 1, l = 0, m = 0, n = 0;
            for (b = 1; b <= 6; b++)
                c = k * i - l * j, d = l * i + k * j, k = c, l = d, m = m + this.C_re[b] * k - this.C_im[b] * l, n = n + this.C_im[b] * k + this.C_re[b] * l;
            for (var o = 0; o < this.iterations; o++) {
                var p, q, r = m, s = n, t = i, u = j;
                for (b = 2; b <= 6; b++)
                    p = r * m - s * n, q = s * m + r * n, r = p, s = q, t += (b - 1) * (this.B_re[b] * r - this.B_im[b] * s), u += (b - 1) * (this.B_im[b] * r + this.B_re[b] * s);
                r = 1, s = 0;
                var v = this.B_re[1], w = this.B_im[1];
                for (b = 2; b <= 6; b++)
                    p = r * m - s * n, q = s * m + r * n, r = p, s = q, v += b * (this.B_re[b] * r - this.B_im[b] * s), w += b * (this.B_im[b] * r + this.B_re[b] * s);
                var x = v * v + w * w;
                m = (t * v + u * w) / x, n = (u * v - t * w) / x
            }
            var y = m, z = n, A = 1, B = 0;
            for (b = 1; b <= 9; b++)
                A *= y, B += this.D[b] * A;
            var C = this.lat0 + B * Bb * 1e5, D = this.long0 + z;
            return a.x = D, a.y = C, a
        }
        function bb() {}
        function cb(a) {
            var b = a.x, c = a.y, d = fc(b - this.long0), e = this.x0 + this.a * d, f = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + c / 2.5)) * 1.25;
            return a.x = e, a.y = f, a
        }
        function db(a) {
            a.x -= this.x0, a.y -= this.y0;
            var b = fc(this.long0 + a.x / this.a), c = 2.5 * (Math.atan(Math.exp(.8 * a.y / this.a)) - Math.PI / 4);
            return a.x = b, a.y = c, a
        }
        function eb() {
            this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = Tc(this.es)
        }
        function fb(a) {
            var b, c, d = a.x, e = a.y;
            if (d = fc(d - this.long0), this.sphere) {
                if (this.m)
                    for (var f = this.n * Math.sin(e), g = ne; g; --g) {
                        var h = (this.m * e + Math.sin(e) - f) / (this.m + Math.cos(e));
                        if (e -= h, Math.abs(h) < Gb)
                            break
                    }
                else
                    e = 1 !== this.n ? Math.asin(this.n * Math.sin(e)) : e;
                b = this.a * this.C_x * d * (this.m + Math.cos(e)), c = this.a * this.C_y * e
            } else {
                var i = Math.sin(e), j = Math.cos(e);
                c = this.a * Uc(e, i, j, this.en), b = this.a * d * j / Math.sqrt(1 - this.es * i * i)
            }
            return a.x = b, a.y = c, a
        }
        function gb(a) {
            var b, c, d, e;
            return a.x -= this.x0, d = a.x / this.a, a.y -= this.y0, b = a.y / this.a, this.sphere ? (b /= this.C_y, d /= this.C_x * (this.m + Math.cos(b)), this.m ? b = Yd((this.m * b + Math.sin(b)) / this.n) : 1 !== this.n && (b = Yd(Math.sin(b) / this.n)), d = fc(d + this.long0), b = Hd(b)) : (b = Wc(a.y / this.a, this.es, this.en), e = Math.abs(b), e < Cb ? (e = Math.sin(b), c = this.long0 + a.x * Math.sqrt(1 - this.es * e * e) / (this.a * Math.cos(b)), d = fc(c)) : e - Gb < Cb && (d = this.long0)), a.x = d, a.y = b, a
        }
        function hb() {}
        function ib(a) {
            for (var b = a.x, c = a.y, d = fc(b - this.long0), e = c, f = Math.PI * Math.sin(c), g = 0; !0; g++) {
                var h = -(e + Math.sin(e) - f) / (1 + Math.cos(e));
                if (e += h, Math.abs(h) < Gb)
                    break
            }
            e /= 2, Math.PI / 2 - Math.abs(c) < Gb && (d = 0);
            var i = .900316316158 * this.a * d * Math.cos(e) + this.x0, j = 1.4142135623731 * this.a * Math.sin(e) + this.y0;
            return a.x = i, a.y = j, a
        }
        function jb(a) {
            var b, c;
            a.x -= this.x0, a.y -= this.y0, c = a.y / (1.4142135623731 * this.a), Math.abs(c) > .999999999999 && (c = .999999999999), b = Math.asin(c);
            var d = fc(this.long0 + a.x / (.900316316158 * this.a * Math.cos(b)));
            d < -Math.PI && (d = -Math.PI), d > Math.PI && (d = Math.PI), c = (2 * b + Math.sin(2 * b)) / Math.PI, Math.abs(c) > 1 && (c = 1);
            var e = Math.asin(c);
            return a.x = d, a.y = e, a
        }
        function kb() {
            Math.abs(this.lat1 + this.lat2) < Gb || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = Cd(this.es), this.e1 = Dd(this.es), this.e2 = Ed(this.es), this.e3 = Fd(this.es), this.sinphi = Math.sin(this.lat1), this.cosphi = Math.cos(this.lat1), this.ms1 = dc(this.e, this.sinphi, this.cosphi), this.ml1 = Bd(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < Gb ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = dc(this.e, this.sinphi, this.cosphi), this.ml2 = Bd(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = Bd(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0))
        }
        function lb(a) {
            var b, c = a.x, d = a.y;
            if (this.sphere)
                b = this.a * (this.g - d);
            else {
                var e = Bd(this.e0, this.e1, this.e2, this.e3, d);
                b = this.a * (this.g - e)
            }
            var f = this.ns * fc(c - this.long0), g = this.x0 + b * Math.sin(f), h = this.y0 + this.rh - b * Math.cos(f);
            return a.x = g, a.y = h, a
        }
        function mb(a) {
            a.x -= this.x0, a.y = this.rh - a.y + this.y0;
            var b, c, d, e;
            this.ns >= 0 ? (c = Math.sqrt(a.x * a.x + a.y * a.y), b = 1) : (c = -Math.sqrt(a.x * a.x + a.y * a.y), b = -1);
            var f = 0;
            if (0 !== c && (f = Math.atan2(b * a.x, b * a.y)), this.sphere)
                return e = fc(this.long0 + f / this.ns), d = Hd(this.g - c / this.a), a.x = e, a.y = d, a;
            var g = this.g - c / this.a;
            return d = Id(g, this.e0, this.e1, this.e2, this.e3), e = fc(this.long0 + f / this.ns), a.x = e, a.y = d, a
        }
        function nb() {
            this.R = this.a
        }
        function ob(a) {
            var b, c, d = a.x, e = a.y, f = fc(d - this.long0);
            Math.abs(e) <= Gb && (b = this.x0 + this.R * f, c = this.y0);
            var g = Yd(2 * Math.abs(e / Math.PI));
            (Math.abs(f) <= Gb || Math.abs(Math.abs(e) - Cb) <= Gb) && (b = this.x0, c = e >= 0 ? this.y0 + Math.PI * this.R * Math.tan(.5 * g) : this.y0 + Math.PI * this.R * -Math.tan(.5 * g));
            var h = .5 * Math.abs(Math.PI / f - f / Math.PI), i = h * h, j = Math.sin(g), k = Math.cos(g), l = k / (j + k - 1), m = l * l, n = l * (2 / j - 1), o = n * n, p = Math.PI * this.R * (h * (l - o) + Math.sqrt(i * (l - o) * (l - o) - (o + i) * (m - o))) / (o + i);
            f < 0 && (p = -p), b = this.x0 + p;
            var q = i + l;
            return p = Math.PI * this.R * (n * q - h * Math.sqrt((o + i) * (i + 1) - q * q)) / (o + i), c = e >= 0 ? this.y0 + p : this.y0 - p, a.x = b, a.y = c, a
        }
        function pb(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n;
            return a.x -= this.x0, a.y -= this.y0, l = Math.PI * this.R, d = a.x / l, e = a.y / l, f = d * d + e * e, g = -Math.abs(e) * (1 + f), h = g - 2 * e * e + d * d, i = -2 * g + 1 + 2 * e * e + f * f, n = e * e / i + (2 * h * h * h / i / i / i - 9 * g * h / i / i) / 27, j = (g - h * h / 3 / i) / i, k = 2 * Math.sqrt(-j / 3), l = 3 * n / j / k, Math.abs(l) > 1 && (l = l >= 0 ? 1 : -1), m = Math.acos(l) / 3, c = a.y >= 0 ? (-k * Math.cos(m + Math.PI / 3) - h / 3 / i) * Math.PI : -(-k * Math.cos(m + Math.PI / 3) - h / 3 / i) * Math.PI, b = Math.abs(d) < Gb ? this.long0 : fc(this.long0 + Math.PI * (f - 1 + Math.sqrt(1 + 2 * (d * d - e * e) + f * f)) / 2 / d), a.x = b, a.y = c, a
        }
        function qb() {
            this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0)
        }
        function rb(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = a.x, z = a.y, A = Math.sin(a.y), B = Math.cos(a.y), C = fc(y - this.long0);
            return this.sphere ? Math.abs(this.sin_p12 - 1) <= Gb ? (a.x = this.x0 + this.a * (Cb - z) * Math.sin(C), a.y = this.y0 - this.a * (Cb - z) * Math.cos(C), a) : Math.abs(this.sin_p12 + 1) <= Gb ? (a.x = this.x0 + this.a * (Cb + z) * Math.sin(C), a.y = this.y0 + this.a * (Cb + z) * Math.cos(C), a) : (s = this.sin_p12 * A + this.cos_p12 * B * Math.cos(C), q = Math.acos(s), r = q / Math.sin(q), a.x = this.x0 + this.a * r * B * Math.sin(C), a.y = this.y0 + this.a * r * (this.cos_p12 * A - this.sin_p12 * B * Math.cos(C)), a) : (b = Cd(this.es), c = Dd(this.es), d = Ed(this.es), e = Fd(this.es), Math.abs(this.sin_p12 - 1) <= Gb ? (f = this.a * Bd(b, c, d, e, Cb), g = this.a * Bd(b, c, d, e, z), a.x = this.x0 + (f - g) * Math.sin(C), a.y = this.y0 - (f - g) * Math.cos(C), a) : Math.abs(this.sin_p12 + 1) <= Gb ? (f = this.a * Bd(b, c, d, e, Cb), g = this.a * Bd(b, c, d, e, z), a.x = this.x0 + (f + g) * Math.sin(C), a.y = this.y0 + (f + g) * Math.cos(C), a) : (h = A / B, i = Gd(this.a, this.e, this.sin_p12), j = Gd(this.a, this.e, A), k = Math.atan((1 - this.es) * h + this.es * i * this.sin_p12 / (j * B)), l = Math.atan2(Math.sin(C), this.cos_p12 * Math.tan(k) - this.sin_p12 * Math.cos(C)), t = 0 === l ? Math.asin(this.cos_p12 * Math.sin(k) - this.sin_p12 * Math.cos(k)) : Math.abs(Math.abs(l) - Math.PI) <= Gb ? -Math.asin(this.cos_p12 * Math.sin(k) - this.sin_p12 * Math.cos(k)) : Math.asin(Math.sin(C) * Math.cos(k) / Math.sin(l)), m = this.e * this.sin_p12 / Math.sqrt(1 - this.es), n = this.e * this.cos_p12 * Math.cos(l) / Math.sqrt(1 - this.es), o = m * n, p = n * n, u = t * t, v = u * t, w = v * t, x = w * t, q = i * t * (1 - u * p * (1 - p) / 6 + v / 8 * o * (1 - 2 * p) + w / 120 * (p * (4 - 7 * p) - 3 * m * m * (1 - 7 * p)) - x / 48 * o), a.x = this.x0 + q * Math.sin(l), a.y = this.y0 + q * Math.cos(l), a))
        }
        function sb(a) {
            a.x -= this.x0, a.y -= this.y0;
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x;
            if (this.sphere) {
                if (b = Math.sqrt(a.x * a.x + a.y * a.y), b > 2 * Cb * this.a)
                    return;
                return c = b / this.a, d = Math.sin(c), e = Math.cos(c), f = this.long0, Math.abs(b) <= Gb ? g = this.lat0 : (g = Yd(e * this.sin_p12 + a.y * d * this.cos_p12 / b), h = Math.abs(this.lat0) - Cb, f = fc(Math.abs(h) <= Gb ? this.lat0 >= 0 ? this.long0 + Math.atan2(a.x, -a.y) : this.long0 - Math.atan2(-a.x, a.y) : this.long0 + Math.atan2(a.x * d, b * this.cos_p12 * e - a.y * this.sin_p12 * d))), a.x = f, a.y = g, a
            }
            return i = Cd(this.es), j = Dd(this.es), k = Ed(this.es), l = Fd(this.es), Math.abs(this.sin_p12 - 1) <= Gb ? (m = this.a * Bd(i, j, k, l, Cb), b = Math.sqrt(a.x * a.x + a.y * a.y), n = m - b, g = Id(n / this.a, i, j, k, l), f = fc(this.long0 + Math.atan2(a.x, -1 * a.y)), a.x = f, a.y = g, a) : Math.abs(this.sin_p12 + 1) <= Gb ? (m = this.a * Bd(i, j, k, l, Cb), b = Math.sqrt(a.x * a.x + a.y * a.y), n = b - m, g = Id(n / this.a, i, j, k, l), f = fc(this.long0 + Math.atan2(a.x, a.y)), a.x = f, a.y = g, a) : (b = Math.sqrt(a.x * a.x + a.y * a.y), q = Math.atan2(a.x, a.y), o = Gd(this.a, this.e, this.sin_p12), r = Math.cos(q), s = this.e * this.cos_p12 * r, t = -s * s / (1 - this.es), u = 3 * this.es * (1 - t) * this.sin_p12 * this.cos_p12 * r / (1 - this.es), v = b / o, w = v - t * (1 + t) * Math.pow(v, 3) / 6 - u * (1 + 3 * t) * Math.pow(v, 4) / 24, x = 1 - t * w * w / 2 - v * w * w * w / 6, p = Math.asin(this.sin_p12 * Math.cos(w) + this.cos_p12 * Math.sin(w) * r), f = fc(this.long0 + Math.asin(Math.sin(q) * Math.sin(w) / Math.cos(p))), g = Math.atan((1 - this.es * x * this.sin_p12 / Math.sin(p)) * Math.tan(p) / (1 - this.es)), a.x = f, a.y = g, a)
        }
        function tb() {
            this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0)
        }
        function ub(a) {
            var b, c, d, e, f, g, h, i, j = a.x, k = a.y;
            return d = fc(j - this.long0), b = Math.sin(k), c = Math.cos(k), e = Math.cos(d), g = this.sin_p14 * b + this.cos_p14 * c * e, f = 1, (g > 0 || Math.abs(g) <= Gb) && (h = this.a * f * c * Math.sin(d), i = this.y0 + this.a * f * (this.cos_p14 * b - this.sin_p14 * c * e)), a.x = h, a.y = i, a
        }
        function vb(a) {
            var b, c, d, e, f, g, h;
            return a.x -= this.x0, a.y -= this.y0, b = Math.sqrt(a.x * a.x + a.y * a.y), c = Yd(b / this.a), d = Math.sin(c), e = Math.cos(c), g = this.long0, Math.abs(b) <= Gb ? (h = this.lat0, a.x = g, a.y = h, a) : (h = Yd(e * this.sin_p14 + a.y * d * this.cos_p14 / b), f = Math.abs(this.lat0) - Cb, Math.abs(f) <= Gb ? (g = fc(this.lat0 >= 0 ? this.long0 + Math.atan2(a.x, -a.y) : this.long0 - Math.atan2(-a.x, a.y)), a.x = g, a.y = h, a) : (g = fc(this.long0 + Math.atan2(a.x * d, b * this.cos_p14 * e - a.y * this.sin_p14 * d)), a.x = g, a.y = h, a))
        }
        var wb = function (a) {
            a("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), a("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), a("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"), a.WGS84 = a["EPSG:4326"], a["EPSG:3785"] = a["EPSG:3857"], a.GOOGLE = a["EPSG:3857"], a["EPSG:900913"] = a["EPSG:3857"], a["EPSG:102113"] = a["EPSG:3857"]
        }, xb = 1, yb = 2, zb = 4, Ab = 5, Bb = 484813681109536e-20, Cb = Math.PI / 2, Db = .16666666666666666, Eb = .04722222222222222, Fb = .022156084656084655, Gb = "undefined" == typeof Number.EPSILON ? 1e-10 : Number.EPSILON, Hb = .017453292519943295, Ib = 57.29577951308232, Jb = Math.PI / 4, Kb = 2 * Math.PI, Lb = 3.14159265359, Mb = {};
        Mb.greenwich = 0, Mb.lisbon = -9.131906111111, Mb.paris = 2.337229166667, Mb.bogota = -74.080916666667, Mb.madrid = -3.687938888889, Mb.rome = 12.452333333333, Mb.bern = 7.439583333333, Mb.jakarta = 106.807719444444, Mb.ferro = -17.666666666667, Mb.brussels = 4.367975, Mb.stockholm = 18.058277777778, Mb.athens = 23.7163375, Mb.oslo = 10.722916666667;
        var Nb = {ft: {to_meter: .3048}, "us-ft": {to_meter: 1200 / 3937}}, Ob = /[\s_\-\/\(\)]/g, Pb = function (b) {
            var c, d, e, f = {}, g = b.split("+").map(function (a) {
                return a.trim()
            }).filter(function (a) {
                return a
            }).reduce(function (a, b) {
                var c = b.split("=");
                return c.push(!0), a[c[0].toLowerCase()] = c[1], a
            }, {}), h = {proj: "projName", datum: "datumCode", rf: function (a) {
                    f.rf = parseFloat(a)
                }, lat_0: function (a) {
                    f.lat0 = a * Hb
                }, lat_1: function (a) {
                    f.lat1 = a * Hb
                }, lat_2: function (a) {
                    f.lat2 = a * Hb
                }, lat_ts: function (a) {
                    f.lat_ts = a * Hb
                }, lon_0: function (a) {
                    f.long0 = a * Hb
                }, lon_1: function (a) {
                    f.long1 = a * Hb
                }, lon_2: function (a) {
                    f.long2 = a * Hb
                }, alpha: function (a) {
                    f.alpha = parseFloat(a) * Hb
                }, lonc: function (a) {
                    f.longc = a * Hb
                }, x_0: function (a) {
                    f.x0 = parseFloat(a)
                }, y_0: function (a) {
                    f.y0 = parseFloat(a)
                }, k_0: function (a) {
                    f.k0 = parseFloat(a)
                }, k: function (a) {
                    f.k0 = parseFloat(a)
                }, a: function (a) {
                    f.a = parseFloat(a)
                }, b: function (a) {
                    f.b = parseFloat(a)
                }, r_a: function () {
                    f.R_A = !0
                }, zone: function (a) {
                    f.zone = parseInt(a, 10)
                }, south: function () {
                    f.utmSouth = !0
                }, towgs84: function (a) {
                    f.datum_params = a.split(",").map(function (a) {
                        return parseFloat(a)
                    })
                }, to_meter: function (a) {
                    f.to_meter = parseFloat(a)
                }, units: function (b) {
                    f.units = b;
                    var c = a(Nb, b);
                    c && (f.to_meter = c.to_meter)
                }, from_greenwich: function (a) {
                    f.from_greenwich = a * Hb
                }, pm: function (b) {
                    var c = a(Mb, b);
                    f.from_greenwich = (c ? c : parseFloat(b)) * Hb
                }, nadgrids: function (a) {
                    "@null" === a ? f.datumCode = "none" : f.nadgrids = a
                }, axis: function (a) {
                    var b = "ewnsud";
                    3 === a.length && b.indexOf(a.substr(0, 1)) !== -1 && b.indexOf(a.substr(1, 1)) !== -1 && b.indexOf(a.substr(2, 1)) !== -1 && (f.axis = a)
                }};
            for (c in g)
                d = g[c], c in h ? (e = h[c], "function" == typeof e ? e(d) : f[e] = d) : f[c] = d;
            return"string" == typeof f.datumCode && "WGS84" !== f.datumCode && (f.datumCode = f.datumCode.toLowerCase()), f
        }, Qb = 1, Rb = 2, Sb = 3, Tb = 4, Ub = 5, Vb = -1, Wb = /\s/, Xb = /[A-Za-z]/, Yb = /[A-Za-z84]/, Zb = /[,\]]/, $b = /[\d\.E\-\+]/;
        b.prototype.readCharicter = function () {
            var a = this.text[this.place++];
            if (this.state !== Tb)
                for (; Wb.test(a); ) {
                    if (this.place >= this.text.length)
                        return;
                    a = this.text[this.place++]
                }
            switch (this.state) {
                case Qb:
                    return this.neutral(a);
                case Rb:
                    return this.keyword(a);
                case Tb:
                    return this.quoted(a);
                case Ub:
                    return this.afterquote(a);
                case Sb:
                    return this.number(a);
                case Vb:
                    return
            }
        }, b.prototype.afterquote = function (a) {
            if ('"' === a)
                return this.word += '"', void(this.state = Tb);
            if (Zb.test(a))
                return this.word = this.word.trim(), void this.afterItem(a);
            throw new Error("havn't handled \"" + a + '" in afterquote yet, index ' + this.place)
        }, b.prototype.afterItem = function (a) {
            return"," === a ? (null !== this.word && this.currentObject.push(this.word), this.word = null, void(this.state = Qb)) : "]" === a ? (this.level--, null !== this.word && (this.currentObject.push(this.word), this.word = null), this.state = Qb, this.currentObject = this.stack.pop(), void(this.currentObject || (this.state = Vb))) : void 0
        }, b.prototype.number = function (a) {
            if ($b.test(a))
                return void(this.word += a);
            if (Zb.test(a))
                return this.word = parseFloat(this.word), void this.afterItem(a);
            throw new Error("havn't handled \"" + a + '" in number yet, index ' + this.place)
        }, b.prototype.quoted = function (a) {
            return'"' === a ? void(this.state = Ub) : void(this.word += a)
        }, b.prototype.keyword = function (a) {
            if (Yb.test(a))
                return void(this.word += a);
            if ("[" === a) {
                var b = [];
                return b.push(this.word), this.level++, null === this.root ? this.root = b : this.currentObject.push(b), this.stack.push(this.currentObject), this.currentObject = b, void(this.state = Qb)
            }
            if (Zb.test(a))
                return void this.afterItem(a);
            throw new Error("havn't handled \"" + a + '" in keyword yet, index ' + this.place)
        }, b.prototype.neutral = function (a) {
            if (Xb.test(a))
                return this.word = a, void(this.state = Rb);
            if ('"' === a)
                return this.word = "", void(this.state = Tb);
            if ($b.test(a))
                return this.word = a, void(this.state = Sb);
            if (Zb.test(a))
                return void this.afterItem(a);
            throw new Error("havn't handled \"" + a + '" in neutral yet, index ' + this.place)
        }, b.prototype.output = function () {
            for (; this.place < this.text.length; )
                this.readCharicter();
            if (this.state === Vb)
                return this.root;
            throw new Error('unable to parse string "' + this.text + '". State is ' + this.state)
        };
        var _b = .017453292519943295, ac = function (a) {
            var b = c(a), d = b.shift(), f = b.shift();
            b.unshift(["name", f]), b.unshift(["type", d]);
            var g = {};
            return e(b, g), h(g), g
        };
        wb(i);
        var bc = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"], cc = function (a, b) {
            a = a || {};
            var c, d;
            if (!b)
                return a;
            for (d in b)
                c = b[d], void 0 !== c && (a[d] = c);
            return a
        }, dc = function (a, b, c) {
            var d = a * b;
            return c / Math.sqrt(1 - d * d)
        }, ec = function (a) {
            return a < 0 ? -1 : 1
        }, fc = function (a) {
            return Math.abs(a) <= Lb ? a : a - ec(a) * Kb
        }, gc = function (a, b, c) {
            var d = a * c, e = .5 * a;
            return d = Math.pow((1 - d) / (1 + d), e), Math.tan(.5 * (Cb - b)) / d
        }, hc = function (a, b) {
            for (var c, d, e = .5 * a, f = Cb - 2 * Math.atan(b), g = 0; g <= 15; g++)
                if (c = a * Math.sin(f), d = Cb - 2 * Math.atan(b * Math.pow((1 - c) / (1 + c), e)) - f, f += d, Math.abs(d) <= 1e-10)
                    return f;
            return-9999
        }, ic = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"], jc = {init: o, forward: p, inverse: q, names: ic}, kc = ["longlat", "identity"], lc = {init: r, forward: s, inverse: s, names: kc}, mc = [jc, lc], nc = {}, oc = [], pc = {start: v, add: t, get: u}, qc = {};
        qc.MERIT = {a: 6378137, rf: 298.257, ellipseName: "MERIT 1983"}, qc.SGS85 = {a: 6378136, rf: 298.257, ellipseName: "Soviet Geodetic System 85"}, qc.GRS80 = {a: 6378137, rf: 298.257222101, ellipseName: "GRS 1980(IUGG, 1980)"}, qc.IAU76 = {a: 6378140, rf: 298.257, ellipseName: "IAU 1976"}, qc.airy = {a: 6377563.396, b: 6356256.91, ellipseName: "Airy 1830"}, qc.APL4 = {a: 6378137, rf: 298.25, ellipseName: "Appl. Physics. 1965"}, qc.NWL9D = {a: 6378145, rf: 298.25, ellipseName: "Naval Weapons Lab., 1965"}, qc.mod_airy = {a: 6377340.189, b: 6356034.446, ellipseName: "Modified Airy"}, qc.andrae = {a: 6377104.43, rf: 300, ellipseName: "Andrae 1876 (Den., Iclnd.)"}, qc.aust_SA = {a: 6378160, rf: 298.25, ellipseName: "Australian Natl & S. Amer. 1969"}, qc.GRS67 = {a: 6378160, rf: 298.247167427, ellipseName: "GRS 67(IUGG 1967)"}, qc.bessel = {a: 6377397.155, rf: 299.1528128, ellipseName: "Bessel 1841"}, qc.bess_nam = {a: 6377483.865, rf: 299.1528128, ellipseName: "Bessel 1841 (Namibia)"}, qc.clrk66 = {a: 6378206.4, b: 6356583.8, ellipseName: "Clarke 1866"}, qc.clrk80 = {a: 6378249.145, rf: 293.4663, ellipseName: "Clarke 1880 mod."}, qc.clrk58 = {a: 6378293.645208759, rf: 294.2606763692654, ellipseName: "Clarke 1858"}, qc.CPM = {a: 6375738.7, rf: 334.29, ellipseName: "Comm. des Poids et Mesures 1799"}, qc.delmbr = {a: 6376428, rf: 311.5, ellipseName: "Delambre 1810 (Belgium)"}, qc.engelis = {a: 6378136.05, rf: 298.2566, ellipseName: "Engelis 1985"}, qc.evrst30 = {a: 6377276.345, rf: 300.8017, ellipseName: "Everest 1830"}, qc.evrst48 = {a: 6377304.063, rf: 300.8017, ellipseName: "Everest 1948"}, qc.evrst56 = {a: 6377301.243, rf: 300.8017, ellipseName: "Everest 1956"}, qc.evrst69 = {a: 6377295.664, rf: 300.8017, ellipseName: "Everest 1969"}, qc.evrstSS = {a: 6377298.556, rf: 300.8017, ellipseName: "Everest (Sabah & Sarawak)"}, qc.fschr60 = {a: 6378166, rf: 298.3, ellipseName: "Fischer (Mercury Datum) 1960"}, qc.fschr60m = {a: 6378155, rf: 298.3, ellipseName: "Fischer 1960"}, qc.fschr68 = {a: 6378150, rf: 298.3, ellipseName: "Fischer 1968"}, qc.helmert = {a: 6378200, rf: 298.3, ellipseName: "Helmert 1906"}, qc.hough = {a: 6378270, rf: 297, ellipseName: "Hough"}, qc.intl = {a: 6378388, rf: 297, ellipseName: "International 1909 (Hayford)"}, qc.kaula = {a: 6378163, rf: 298.24, ellipseName: "Kaula 1961"}, qc.lerch = {a: 6378139, rf: 298.257, ellipseName: "Lerch 1979"}, qc.mprts = {a: 6397300, rf: 191, ellipseName: "Maupertius 1738"}, qc.new_intl = {a: 6378157.5, b: 6356772.2, ellipseName: "New International 1967"}, qc.plessis = {a: 6376523, rf: 6355863, ellipseName: "Plessis 1817 (France)"}, qc.krass = {a: 6378245, rf: 298.3, ellipseName: "Krassovsky, 1942"}, qc.SEasia = {a: 6378155, b: 6356773.3205, ellipseName: "Southeast Asia"}, qc.walbeck = {a: 6376896, b: 6355834.8467, ellipseName: "Walbeck"}, qc.WGS60 = {a: 6378165, rf: 298.3, ellipseName: "WGS 60"}, qc.WGS66 = {a: 6378145, rf: 298.25, ellipseName: "WGS 66"}, qc.WGS7 = {a: 6378135, rf: 298.26, ellipseName: "WGS 72"};
        var rc = qc.WGS84 = {a: 6378137, rf: 298.257223563, ellipseName: "WGS 84"};
        qc.sphere = {a: 6370997, b: 6370997, ellipseName: "Normal Sphere (r=6370997)"};
        var sc = {};
        sc.wgs84 = {towgs84: "0,0,0", ellipse: "WGS84", datumName: "WGS84"}, sc.ch1903 = {towgs84: "674.374,15.056,405.346", ellipse: "bessel", datumName: "swiss"}, sc.ggrs87 = {towgs84: "-199.87,74.79,246.62", ellipse: "GRS80", datumName: "Greek_Geodetic_Reference_System_1987"}, sc.nad83 = {towgs84: "0,0,0", ellipse: "GRS80", datumName: "North_American_Datum_1983"}, sc.nad27 = {nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat", ellipse: "clrk66", datumName: "North_American_Datum_1927"}, sc.potsdam = {towgs84: "606.0,23.0,413.0", ellipse: "bessel", datumName: "Potsdam Rauenberg 1950 DHDN"}, sc.carthage = {towgs84: "-263.0,6.0,431.0", ellipse: "clark80", datumName: "Carthage 1934 Tunisia"}, sc.hermannskogel = {towgs84: "653.0,-212.0,449.0", ellipse: "bessel", datumName: "Hermannskogel"}, sc.ire65 = {towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15", ellipse: "mod_airy", datumName: "Ireland 1965"}, sc.rassadiran = {towgs84: "-133.63,-157.5,-158.62", ellipse: "intl", datumName: "Rassadiran"}, sc.nzgd49 = {towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993", ellipse: "intl", datumName: "New Zealand Geodetic Datum 1949"}, sc.osgb36 = {towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894", ellipse: "airy", datumName: "Airy 1830"}, sc.s_jtsk = {towgs84: "589,76,480", ellipse: "bessel", datumName: "S-JTSK (Ferro)"}, sc.beduaram = {towgs84: "-106,-87,188", ellipse: "clrk80", datumName: "Beduaram"}, sc.gunung_segara = {towgs84: "-403,684,41", ellipse: "bessel", datumName: "Gunung Segara Jakarta"}, sc.rnb72 = {towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1", ellipse: "intl", datumName: "Reseau National Belge 1972"}, z.projections = pc, z.projections.start();
        var tc = function (a, b, c) {
            return A(a, b) ? c : a.datum_type === Ab || b.datum_type === Ab ? c : a.es !== b.es || a.a !== b.a || F(a.datum_type) || F(b.datum_type) ? (c = B(c, a.es, a.a), F(a.datum_type) && (c = D(c, a.datum_type, a.datum_params)), F(b.datum_type) && (c = E(c, b.datum_type, b.datum_params)), C(c, b.es, b.a, b.b)) : c
        }, uc = function (a, b, c) {
            var d, e, f, g = c.x, h = c.y, i = c.z || 0, j = {};
            for (f = 0; f < 3; f++)
                if (!b || 2 !== f || void 0 !== c.z)
                    switch (0 === f ? (d = g, e = "x") : 1 === f ? (d = h, e = "y") : (d = i, e = "z"), a.axis[f]) {
                        case"e":
                            j[e] = d;
                            break;
                        case"w":
                            j[e] = -d;
                            break;
                        case"n":
                            j[e] = d;
                            break;
                        case"s":
                            j[e] = -d;
                            break;
                        case"u":
                            void 0 !== c[e] && (j.z = d);
                            break;
                        case"d":
                            void 0 !== c[e] && (j.z = -d);
                            break;
                        default:
                            return null
                    }
            return j
        }, vc = function (a) {
            var b = {x: a[0], y: a[1]};
            return a.length > 2 && (b.z = a[2]), a.length > 3 && (b.m = a[3]), b
        }, wc = z("WGS84"), xc = 6, yc = "AJSAJS", zc = "AFAFAF", Ac = 65, Bc = 73, Cc = 79, Dc = 86, Ec = 90, Fc = {forward: L, inverse: M, toPoint: N};
        Point.fromMGRS = function (a) {
            return new Point(N(a))
        }, Point.prototype.toMGRS = function (a) {
            return L([this.x, this.y], a)
        };
        var Gc = "2.4.3", Hc = 1, Ic = .25, Jc = .046875, Kc = .01953125, Lc = .01068115234375, Mc = .75, Nc = .46875, Oc = .013020833333333334, Pc = .007120768229166667, Qc = .3645833333333333, Rc = .005696614583333333, Sc = .3076171875, Tc = function (a) {
            var b = [];
            b[0] = Hc - a * (Ic + a * (Jc + a * (Kc + a * Lc))), b[1] = a * (Mc - a * (Jc + a * (Kc + a * Lc)));
            var c = a * a;
            return b[2] = c * (Nc - a * (Oc + a * Pc)), c *= a, b[3] = c * (Qc - a * Rc), b[4] = c * a * Sc, b
        }, Uc = function (a, b, c, d) {
            return c *= b, b *= b, d[0] * a - c * (d[1] + b * (d[2] + b * (d[3] + b * d[4])))
        }, Vc = 20, Wc = function (a, b, c) {
            for (var d = 1 / (1 - b), e = a, f = Vc; f; --f) {
                var g = Math.sin(e), h = 1 - b * g * g;
                if (h = (Uc(e, g, Math.cos(e), c) - a) * (h * Math.sqrt(h)) * d, e -= h, Math.abs(h) < Gb)
                    return e
            }
            return e
        }, Xc = ["Transverse_Mercator", "Transverse Mercator", "tmerc"], Yc = {init: _, forward: aa, inverse: ba, names: Xc}, Zc = function (a) {
            var b = Math.exp(a);
            return b = (b - 1 / b) / 2
        }, $c = function (a, b) {
            a = Math.abs(a), b = Math.abs(b);
            var c = Math.max(a, b), d = Math.min(a, b) / (c ? c : 1);
            return c * Math.sqrt(1 + Math.pow(d, 2))
        }, _c = function (a) {
            var b = 1 + a, c = b - 1;
            return 0 === c ? a : a * Math.log(b) / c
        }, ad = function (a) {
            var b = Math.abs(a);
            return b = _c(b * (1 + b / ($c(1, b) + 1))), a < 0 ? -b : b
        }, bd = function (a, b) {
            for (var c, d = 2 * Math.cos(2 * b), e = a.length - 1, f = a[e], g = 0; --e >= 0; )
                c = -g + d * f + a[e], g = f, f = c;
            return b + c * Math.sin(2 * b)
        }, cd = function (a, b) {
            for (var c, d = 2 * Math.cos(b), e = a.length - 1, f = a[e], g = 0; --e >= 0; )
                c = -g + d * f + a[e], g = f, f = c;
            return Math.sin(b) * c
        }, dd = function (a) {
            var b = Math.exp(a);
            return b = (b + 1 / b) / 2
        }, ed = function (a, b, c) {
            for (var d, e, f = Math.sin(b), g = Math.cos(b), h = Zc(c), i = dd(c), j = 2 * g * i, k = -2 * f * h, l = a.length - 1, m = a[l], n = 0, o = 0, p = 0; --l >= 0; )
                d = o, e = n, o = m, n = p, m = -d + j * o - k * n + a[l], p = -e + k * o + j * n;
            return j = f * i, k = g * h, [j * m - k * p, j * p + k * m]
        }, fd = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc"], gd = {init: ca, forward: da, inverse: ea, names: fd}, hd = function (a, b) {
            if (void 0 === a) {
                if (a = Math.floor(30 * (fc(b) + Math.PI) / Math.PI) + 1, a < 0)
                    return 0;
                if (a > 60)
                    return 60
            }
            return a
        }, id = "etmerc", jd = ["Universal Transverse Mercator System", "utm"], kd = {init: fa, names: jd, dependsOn: id}, ld = function (a, b) {
            return Math.pow((1 - a) / (1 + a), b)
        }, md = 20, nd = ["gauss"], od = {init: ga, forward: ha, inverse: ia, names: nd}, pd = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative"], qd = {init: ja, forward: ka, inverse: la, names: pd}, rd = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"], sd = {init: na, forward: oa, inverse: pa, names: rd, ssfn_: ma}, td = ["somerc"], ud = {init: qa, forward: ra, inverse: sa, names: td}, vd = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "omerc"], wd = {init: ta, forward: ua, inverse: va, names: vd}, xd = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_2SP", "lcc"], yd = {init: wa, forward: xa, inverse: ya, names: xd}, zd = ["Krovak", "krovak"], Ad = {init: za, forward: Aa, inverse: Ba, names: zd}, Bd = function (a, b, c, d, e) {
            return a * e - b * Math.sin(2 * e) + c * Math.sin(4 * e) - d * Math.sin(6 * e)
        }, Cd = function (a) {
            return 1 - .25 * a * (1 + a / 16 * (3 + 1.25 * a))
        }, Dd = function (a) {
            return.375 * a * (1 + .25 * a * (1 + .46875 * a))
        }, Ed = function (a) {
            return.05859375 * a * a * (1 + .75 * a)
        }, Fd = function (a) {
            return a * a * a * (35 / 3072)
        }, Gd = function (a, b, c) {
            var d = b * c;
            return a / Math.sqrt(1 - d * d)
        }, Hd = function (a) {
            return Math.abs(a) < Cb ? a : a - ec(a) * Math.PI
        }, Id = function (a, b, c, d, e) {
            var f, g;
            f = a / b;
            for (var h = 0; h < 15; h++)
                if (g = (a - (b * f - c * Math.sin(2 * f) + d * Math.sin(4 * f) - e * Math.sin(6 * f))) / (b - 2 * c * Math.cos(2 * f) + 4 * d * Math.cos(4 * f) - 6 * e * Math.cos(6 * f)), f += g, Math.abs(g) <= 1e-10)
                    return f;
            return NaN
        }, Jd = ["Cassini", "Cassini_Soldner", "cass"], Kd = {init: Ca, forward: Da, inverse: Ea, names: Jd}, Ld = function (a, b) {
            var c;
            return a > 1e-7 ? (c = a * b, (1 - a * a) * (b / (1 - c * c) - .5 / a * Math.log((1 - c) / (1 + c)))) : 2 * b
        }, Md = 1, Nd = 2, Od = 3, Pd = 4, Qd = .3333333333333333, Rd = .17222222222222222, Sd = .10257936507936508, Td = .06388888888888888, Ud = .0664021164021164, Vd = .016415012942191543, Wd = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"], Xd = {init: Fa, forward: Ga, inverse: Ha, names: Wd, S_POLE: Md, N_POLE: Nd, EQUIT: Od, OBLIQ: Pd}, Yd = function (a) {
            return Math.abs(a) > 1 && (a = a > 1 ? 1 : -1), Math.asin(a)
        }, Zd = ["Albers_Conic_Equal_Area", "Albers", "aea"], $d = {init: Ka, forward: La, inverse: Ma, names: Zd, phi1z: Na}, _d = ["gnom"], ae = {init: Oa, forward: Pa, inverse: Qa, names: _d}, be = function (a, b) {
            var c = 1 - (1 - a * a) / (2 * a) * Math.log((1 - a) / (1 + a));
            if (Math.abs(Math.abs(b) - c) < 1e-6)
                return b < 0 ? -1 * Cb : Cb;
            for (var d, e, f, g, h = Math.asin(.5 * b), i = 0; i < 30; i++)
                if (e = Math.sin(h), f = Math.cos(h), g = a * e, d = Math.pow(1 - g * g, 2) / (2 * f) * (b / (1 - a * a) - e / (1 - g * g) + .5 / a * Math.log((1 - g) / (1 + g))), h += d, Math.abs(d) <= 1e-10)
                    return h;
            return NaN
        }, ce = ["cea"], de = {init: Ra, forward: Sa, inverse: Ta, names: ce}, ee = ["Equirectangular", "Equidistant_Cylindrical", "eqc"], fe = {init: Ua, forward: Va, inverse: Wa, names: ee}, ge = 20, he = ["Polyconic", "poly"], ie = {init: Xa, forward: Ya, inverse: Za, names: he}, je = ["New_Zealand_Map_Grid", "nzmg"], ke = {init: $a, forward: _a, inverse: ab, names: je}, le = ["Miller_Cylindrical", "mill"], me = {init: bb, forward: cb, inverse: db, names: le}, ne = 20, oe = ["Sinusoidal", "sinu"], pe = {init: eb, forward: fb, inverse: gb, names: oe}, qe = ["Mollweide", "moll"], re = {init: hb, forward: ib, inverse: jb, names: qe}, se = ["Equidistant_Conic", "eqdc"], te = {init: kb, forward: lb, inverse: mb, names: se}, ue = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"], ve = {init: nb, forward: ob, inverse: pb, names: ue}, we = ["Azimuthal_Equidistant", "aeqd"], xe = {init: qb, forward: rb, inverse: sb, names: we}, ye = ["ortho"], ze = {init: tb, forward: ub, inverse: vb, names: ye}, Ae = function (proj4) {
            proj4.Proj.projections.add(Yc), proj4.Proj.projections.add(gd), proj4.Proj.projections.add(kd), proj4.Proj.projections.add(qd), proj4.Proj.projections.add(sd), proj4.Proj.projections.add(ud), proj4.Proj.projections.add(wd), proj4.Proj.projections.add(yd), proj4.Proj.projections.add(Ad), proj4.Proj.projections.add(Kd), proj4.Proj.projections.add(Xd), proj4.Proj.projections.add($d), proj4.Proj.projections.add(ae), proj4.Proj.projections.add(de), proj4.Proj.projections.add(fe), proj4.Proj.projections.add(ie), proj4.Proj.projections.add(ke), proj4.Proj.projections.add(me), proj4.Proj.projections.add(pe), proj4.Proj.projections.add(re), proj4.Proj.projections.add(te), proj4.Proj.projections.add(ve), proj4.Proj.projections.add(xe), proj4.Proj.projections.add(ze)
        };
        return K.defaultDatum = "WGS84", K.Proj = z, K.WGS84 = new K.Proj("WGS84"), K.Point = Point, K.toPoint = vc, K.defs = i, K.transform = H, K.mgrs = Fc, K.version = Gc, Ae(K), K
    });

    proj4.defs("EPSG:3116", "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-74.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

    proj4.defs("EPSG:3117", "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-71.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

    proj4.defs("EPSG:21897", "+proj=tmerc +lat_0=4.599047222222222 +lon_0=-74.08091666666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=307,304,-318,0,0,0,0 +units=m +no_defs");

    proj4.defs("EPSG:21898", "+proj=tmerc +lat_0=4.599047222222222 +lon_0=-71.08091666666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=307,304,-318,0,0,0,0 +units=m +no_defs");



    if (document.getElementById("celda7").style.display == "block") {
        var view = map.getView();
        var latgrados = document.getElementById('latwgs84s1').value;
        var latminutos = document.getElementById('latwgs84s1m').value;
        var latsegundos = document.getElementById('latwgs84s1s').value;

        var loggrados = document.getElementById('longwgs84s1').value;
        var logminutos = document.getElementById('longwgs84s1m').value;
        var logsegundos = document.getElementById('longwgs84s1s').value;

        var long = parseInt(loggrados) + parseInt(logminutos) / 60 + parseInt(logsegundos) / 3600;
        var lat = parseInt(latgrados) + parseInt(latminutos) / 60 + parseInt(latsegundos) / 3600;
        var long = long * -1;
        console.log(lat, long);
        map.getView().setCenter(ol.proj.transform([long, eval(lat)], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(18);
        var iconFeatures = [];
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([long, eval(lat)], 'EPSG:4326',
                    'EPSG:3857')),
            name: 'wgs84gms',
            population: 4000,
            rainfall: 500
        });

    }
    if (document.getElementById("celda5").style.display == "block") {
        var view = map.getView();
        var x = document.getElementById('latwgs84').value;
        var y = document.getElementById('longwgs84').value;
        map.getView().setCenter(ol.proj.transform([eval(y), eval(x)], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(18);
        var iconFeatures = [];
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([eval(y), eval(x)], 'EPSG:4326',
                    'EPSG:3857')),
            name: 'wgs84d',
            population: 4000,
            rainfall: 500
        });
        console.log(iconFeature);
    }


    if (document.getElementById("celda11").style.display == "block") {

        var view = map.getView();
        var x1 = document.getElementById('xplano').value;
        var y1 = document.getElementById('yplano').value;



        map.getView().setCenter(ol.proj.transform([x1, y1], 'EPSG:3116', 'EPSG:3857'));
        map.getView().setZoom(18);
        var iconFeatures = [];
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([x1, y1], 'EPSG:3116', 'EPSG:3857')),
            name: 'magnacolombiabogota',
            population: 4000,
            rainfall: 500

        });
    }


    if (document.getElementById("celda9").style.display == "block") {

        var view = map.getView();
        var x1 = document.getElementById('xplanb').value;
        var y1 = document.getElementById('yplanb').value;

        map.getView().setCenter(ol.proj.transform([x1, y1], 'EPSG:3116', 'EPSG:3857'));
        map.getView().setZoom(18);
        var iconFeatures = [];
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([x1, y1], 'EPSG:3116', 'EPSG:3857')),
            name: 'magnacolombiabogota',
            population: 4000,
            rainfall: 500

                    /*    map.getView().setCenter(ol.proj.transform([x1, y1], 'EPSG:3115', 'EPSG:3857'));
                     map.getView().setZoom(18);
                     var iconFeatures = [];
                     var iconFeature = new ol.Feature({
                     geometry: new ol.geom.Point(ol.proj.transform([x1, y1], 'EPSG:3115', 'EPSG:3857')),
                     name: 'magnacolombiaoeste',
                     population: 4000,
                     rainfall: 500*/

        });
    }


    highlight.setStyle(flagStyle);
    var markerSource = highlight.getSource();
    markerSource.clear();
    markerSource.addFeature(iconFeature);

}

function menucargarcapas() {
    if (document.getElementById("modalservicios").style.display == 'block') {
        document.getElementById("modalservicios").style.display = 'none';
    } else {
        document.getElementById("modalservicios").style.display = 'block';
    }
}

function wmsload() {
    var tamañopantalla = true;
    //if (tamañopantalla==true){putgif();}else{document.getElementById("carga3").style.display = "block";}

    var longlist = document.getElementById("nombresserv").options.length;
    for (let i = longlist; i >= 0; i--) {
        var sel = document.getElementById("nombresserv");
        sel.remove(sel.selectedIndex[i]);
    }



    var urlwms = document.getElementById("urlservice").value;
    var parser = new ol.format.WMSCapabilities();
    var nombreswms = [];    
    urlwms = "'"+ urlwms + 'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities' + "'";  
    console.log(urlwms); 
    fetch(eval(urlwms)/*, { mode: 'no-cors'}*/).then(function (response) {
        // console.log('Response' ,response );
        return response.text();
    }).then(function (text) {
        // console.log('TEXT', text);
        var result = parser.read(text);
        console.log(result);
        select = document.getElementById("nombresserv");
        console.log(select);
        for (var j = 0; j < result.Capability.Layer.Layer.length; j++) {
            nombreswms[j] = [result.Capability.Layer.Layer[j].Name];
            option = document.createElement("option");
            option.value = result.Capability.Layer.Layer[j].Name;
            option.text = result.Capability.Layer.Layer[j].Title;
            select.appendChild(option);
        }
        document.getElementById("listawms").style.display = "block";
        if (tamañopantalla==true){quitgif(); }
        else{document.getElementById("carga3").style.display = "none";  }
    }).catch(function(){
        alert('La URL no es válida')
        if (tamañopantalla==true){quitgif(); }
        else{document.getElementById("carga3").style.display = "none";  }
    });

    

}

function ocultarpanelpest() {
    document.getElementById("modalservicios").style.display = "none";

}

var wms1 = "";
function loadwms() {
        var urlwms2 = document.getElementById("urlservice").value;
        var layer2 = document.getElementById("nombresserv").value;
    
        var wms1 = new ol.layer.Tile({
            visible: true,
            source: new ol.source.TileWMS({
                url: urlwms2,
                params: { LAYERS: layer2},
                crossOrigin: 'anonymous'
            }),
            name: 'Servicio de Mapas Web'
        });
    
        console.log(wms1);
        map.addLayer(wms1);



    /*var wmsSource = new ol.source.TileWMS({
        url: eval(urlwms2),
        params: { LAYERS: eval(layer2), STYLES: '' },
        format: new ol.format.GeoJSON(),
        crossOrigin: 'anonymous'
    });*/
    //console.log(wmsSource);
    //map.addLayer(wmsSource);
}

function removewms() {
    wms1.setVisible(false);
    var longlist = document.getElementById("nombresserv").options.length;
    for (let i = longlist; i >= 0; i--) {
        var sel = document.getElementById("nombresserv");
        sel.remove(sel.selectedIndex[i]);
    }
}

function ident() {
    if (document.body.style.cursor !== "pointer") {
        document.body.style.cursor = "pointer";
    } else {
        document.body.style.cursor = "default";
    }
}

function menuconvertirnumeropredial() {
    var table = document.getElementById("tblatt");
    $(".modal-dialog").css("width", "350px");
    table.innerHTML = "";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = "<H5 style='text'><b>CONVERTIR NÚMERO PREDIAL</b></H5><label>Dosquebradas<input type='radio' id='optdosquebradas' checked='checked' name='radio'><span class='checkmark'></span></label><label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La Virginia<input type='radio' name='radio' id='optlavirginia'><span class='checkmark'></span></label><label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pereira<input type='radio' name='radio' id='optpereira'><span class='checkmark'></span></label>";

    var row = table.insertRow(1);
    var cell2 = row.insertCell(0);
    cell2.colSpan = 2;
    cell2.style = "background-color: white; border:0; margin:0;";
    cell2.innerHTML = "<input type='number' id='inputnumant' name='inputnumant' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:3em;' placeholder='Código Catastral Anterior'>";

    var row = table.insertRow(2);
    var cell3 = row.insertCell(0);
    cell3.style = "background-color: white; color:black; font-size: 14px; border:0; text-align:center;";
    cell3.innerHTML = "<button type='button' id='botonnumant' name='botonnumant' class='btn btn-info'>Convertir a Código Catastral Nuevo</button>";
    cell3.setAttribute("onclick", "convertant()");
    cell3.colSpan = 2;

    var row = table.insertRow(3);
    var cell4 = row.insertCell(0);
    cell4.colSpan = 2;
    cell4.style = "background-color: white; border:0; margin:0;";
    cell4.innerHTML = "<input type='number' id='inputnumnuevo' name='inputnumnuevo' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:3em;' placeholder='Código Catastral Nuevo'>";

    var row = table.insertRow(4);
    var cell5 = row.insertCell(0);
    cell5.style = "background-color: white; color:black; font-size: 14px; border:0; text-align:center;";
    cell5.innerHTML = "<button type='button' id='botonnumnuevo' name='botonnumnuevo' class='btn btn-info'>Convertir a Código Catastral Anterior</button>";
    cell5.setAttribute("onclick", "convertnuevo()");
    cell5.colSpan = 2;

    document.getElementById("panel_atr").style.display = "block";
    document.getElementById("botonminimizar").style.display = "block";
}

function convertant() {
    if(document.getElementById("optdosquebradas").checked == true){
        var deptmun = "66170";
    }
    else if(document.getElementById("optlavirginia").checked == true){
        var deptmun = "66400";
    }
    else if(document.getElementById("optpereira").checked == true){
        var deptmun = "66001";
    }
    var codigoant = deptmun + document.getElementById("inputnumant").value;
    if (codigoant.length < 20) {
        alert("El código ingresado tiene una longitud menor a 15 digitos, por favor revise el código ingresado");
    } else if (codigoant.length > 20) {
        alert("El código ingresado tiene una longitud mayor a 15 digitos, por favor revise el código ingresado");
    } else {
        //var departamento = codigoant.substring(0, 2);
        //var municipio = codigoant.substring(2, 5);
        var tipoavaluo = codigoant.substring(5, 7);
        var sector = codigoant.substring(7, 9);
        var mzvereda = codigoant.substring(9, 13);
        var predio = codigoant.substring(13, 17);
        var mjph = codigoant.substring(16, 17);
        var codph1 = codigoant.substring(16, 19);
        var codprop = codigoant.substring(17, 20);

        if (codprop == '000') {
            var codnuevo = deptmun + tipoavaluo + sector + "0000" + mzvereda + predio + "000000000";
        } else {
            if (mjph == '5') {
                var codnuevo = deptmun + tipoavaluo + sector + "0000" + mzvereda + predio + mjph + "00000" + codprop;
            } else {
                var codnuevo = deptmun + tipoavaluo + sector + "0000" + mzvereda + "000" + mjph + codph1 + codigoant.substring(17, 19) + "0" + codprop;
            }
        }

        document.getElementById("inputnumnuevo").value = codnuevo;

        alert("Departamento - Municipio: " + deptmun + "<br>Zona: " + tipoavaluo + "<br>Sector: " + sector + "<br>Manzana o Vereda: " + mzvereda + "<br>Predio: " + predio + "<br>Condición de Propiedad: " + codprop + "<br><br><br><b>CÓDIGO NUEVO:  " + codnuevo);
    }
}
function convertnuevo() {
    if(document.getElementById("optdosquebradas").checked == true){
        var deptmun = "66170";
    }
    else if(document.getElementById("optlavirginia").checked == true){
        var deptmun = "66400";
    }
    else if(document.getElementById("optpereira").checked == true){
        var deptmun = "66001";
    }
    var codigonuevo = deptmun + document.getElementById("inputnumnuevo").value;
    if (codigonuevo.length < 30) {
        alert("El código ingresado tiene una longitud menor a 25 digitos, por favor revise el código ingresado");
    } else if (codigonuevo.length > 30) {
        alert("El código ingresado tiene una longitud mayor a 25 digitos, por favor revise el código ingresado");
    } else {
    
    var departamento = codigonuevo.substring(0, 2);
    var municipio = codigonuevo.substring(2, 5);
    var tipoavaluo = codigonuevo.substring(5, 7);
    var sector = codigonuevo.substring(7, 9);
    var comuna = codigonuevo.substring(9, 11);
    var barrio = codigonuevo.substring(11, 13);
    var mzvereda = codigonuevo.substring(13, 17);
    var predio = codigonuevo.substring(17, 21);
    var mjph = codigonuevo.substring(21, 22);
    var edificio = codigonuevo.substring(22, 24);
    var piso = codigonuevo.substring(24, 26);
    var up = codigonuevo.substring(26, 30);

    var codanterior = deptmun + tipoavaluo + sector + mzvereda + predio + codigonuevo.substring(27, 30);

    document.getElementById("inputnumant").value = codanterior;

    alert("Departamento - Municipio: " + deptmun + "<br>Zona: " + tipoavaluo + "<br>Sector: " + sector + "<br>Comuna: " + comuna + "<br>Barrio: " + barrio + "<br>Manzana o Vereda: " + mzvereda + "<br>Predio: " + predio + "<br>Condición de Propiedad: " + mjph + "<br>Edificio: " + edificio + "<br>Piso: " + piso + "<br>Unidad Predial: " + up + "<br><br><br><b>CÓDIGO ANTERIOR:  " + codanterior);
    }
}

function vistasmultiples() {
    if (document.getElementById("map2").style.display == "block") {
        location.reload();
    } else {
        var center = [-8426937, 535753];
        var zoom = 12;

        var predio2 = new ol.layer.Tile({
            visible: true,
            source: new ol.source.TileWMS({
                url: 'http://35.184.176.7:8081/geoserver/amco/wms',
                params: {LAYERS: 'amco:terreno_amco', STYLES: ''}
            }), name: 'Predios',
            crossOrigin: 'anonymous'
        });

        var binglabels2 = new ol.layer.Tile({
            visible: true,
            //opacity: 0,
            source: new ol.source.BingMaps({
                key: 'AmTXzzix65q59DqR4_iobPZa9sNRcXtL4gkAsH-uww3RYpVFHGGejnUQTJev9ixC',
                imagerySet: 'AerialWithLabelsOnDemand'
            }), name: 'Satelite con Etiquetas',
            crossOrigin: 'anonymous'
        });

        var layerCatastro2 = new ol.layer.Group({
            layers: [predio2, binglabels2],
            name: 'CATASTRO'
        });
        var map2 = new ol.Map({
            target: 'map2',
            view: new ol.View({
                center: center,
                zoom: zoom
            }),
            layers: [layerCatastro2]
        });
        document.getElementById("map").style.position = "relative";
        document.getElementById("map").style.cssFloat = "right";
        document.getElementById("map").style.width = "45%";
        document.getElementById("map").style.height = "95%";
        document.getElementById("map2").style.display = "block";
      
    }
}

function MostrarDib() {
    predio.setVisible(false);
    capalinea.setVisible(true);
    capapunto.setVisible(true);
    capapoligono.setVisible(true);
}


function lookaddress(){
    var centerdat = search("chia:datostab2");
    //console.log(centerdat);

                            var table = document.getElementById("tblatt");
                            $(".modal-dialog").css("width", "600px");
                            table.innerHTML = "";
                            var row = table.insertRow(0);
                            var cell1 = row.insertCell(0);
                            cell1.colSpan = 2;
                            cell1.innerHTML = "<H5><b>DIRECCIONES</b></H5>";

    var select = [];
    var sel = [];
    var imag = [];
    var stv = [];
    var ig = [];
    for (i = 0; i < centerdat.length; i++) {
      //console.log(direccion);
        var tablaph = ("<table max-width=20 border=1 id='tablaph'>");
        for (i = 0; i < centerdat.length; i++) {
            //var req = {term: direccion[i], val:123};
            dirg = centerdat[i][4];
            tablaph += ("<tr>");
            tablaph += ("<td id=tt" + i + ">" + centerdat[i][4] + "</td>");
            tablaph += ("</tr>");
        }
        tablaph += ("</table>");
    }
    select[0] = "<b>Número de Puntos</b>";
    select[1] = "<b>Direcciones</b>";
    
    sel[0] = centerdat.length;
    sel[1] = tablaph;
    
    for (i = 0; i < select.length; i++) {
        row = table.insertRow(i + 1);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = select[i];
        cell2.innerHTML = sel[i];
    }
    for (i = 0; i < centerdat.length; i++) {
        var ell = document.getElementById("tt" + i);
        var alg = "mostrardatosph('tt" + i + "')";
      //  console.log(alg);
        ell.setAttribute("onclick", alg);
        ell.value = centerdat[i];
        //ell.onclick = function() {addressSource(direccion[i]);};
    }

    document.getElementById("panel_atr").style.display = "block";
                        document.getElementById("botonminimizar").style.display = "block";

}


function lookvehicules(){
    var datosv = search("bogota:datosveh");
    console.log(datosv);

    var table = document.getElementById("tblatt");
    $(".modal-dialog").css("width", "300px");
    table.innerHTML = "";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = "<H5><b>VEHICULOS</b></H5>";
var select = [];
var sel = [];
var imag = [];
var stv = [];
var ig = [];

for (var i = 0; i <= datosv.length; i++){
select[i] = "<b>Id: </b>";
select[i + 1] = "<b>Placa: </b>";
select[i + 2] = "<b>Capacidad: </b>";

sel[i] = datosv[0][0];
sel[i + 1] = datosv[0][1];
sel[i + 2] = datosv[0][2];

}


    for (i = 0; i < select.length; i++) {
row = table.insertRow(i + 1);
cell1 = row.insertCell(0);
cell2 = row.insertCell(1);
cell1.innerHTML = select[i];

cell2.innerHTML = sel[i];
}
    

document.getElementById("panel_atr").style.display = "block";
document.getElementById("botonminimizar").style.display = "block";

}

/*function incidenciasmap() {
    puntosbase.setVisible(true);
     		    var style = "Contagios";
    			var select = search("bogota:TotalPuntos");
    		    var param = [['Direcciones Georeferenciadas'], ['Direcciones sin Georeferenciar']];
                var total1 = search("bogota:contagiosgeo");
                var total2 = search("bogota:contagiosnogeo");
                
                var totales = total1.concat(total2);
    console.log(param);
    console.log(totales);
    console.log(select);
              //  predio.getSource().updateParams({'STYLES': "estadoincidencias"});
               
                estdistica(select, style, param, totales, id);
    
}*/





function menuasignarvehiculos(){

        document.getElementById("panel_atr").style.visibility = "visible";
        document.getElementById("panel_atr").style.display = "initial";
        document.getElementById("panel_atr").style.height = "auto";
        /*document.getElementById("contenedorg").style.display = "initial";
        document.getElementById("contenedorg").style.visibility = "visible";
        document.getElementById("contenedorg").style.height = "auto";*/
        var table = document.getElementById("tblatt");
         $(".modal-dialog").css("width", "250px");
        table.style.visibility = "visible";
        table.style.display = "initial";
        table.style.height = "auto";
        table.innerHTML = "";
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.colSpan = 2;
        cell1.innerHTML = "<H6><b>AGRUPAR POR VEHICULOS</b></H6>";

        var row = table.insertRow(1);
        var cell2 = row.insertCell(0);
        cell2.colSpan = 2;
        cell2.style = "background-color: white; color:gray; font-size: 12px; border:0; text-align:left;";
        cell2.innerHTML = "<b>Seleccione La Planta: </b>";

        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        cell3.colSpan = 2;
        cell3.style = "background-color: white; border:0; margin:0;";
        cell3.innerHTML = "<select name='plantas' id='plantas' style='font-size:13px; width:100%;' onchange='cantturn()'><option value='Planta Fabrica'>Planta Fabrica</option><option value='Planta Calera'>Planta Calera</option></select>";

        var row = table.insertRow(3);
        var cell4 = row.insertCell(0);
        cell4.colSpan = 2;
        cell4.style = "background-color: white; color:gray; font-size: 12px; border:0; text-align:left;";
        cell4.innerHTML = "<b>Seleccione El Turno: </b>";

        var row = table.insertRow(4);
        var cell5 = row.insertCell(0);
        cell5.colSpan = 2;
        cell5.style = "background-color: white; border:0; margin:0;";
        cell5.innerHTML = "<select name='turno' id='turno' style='font-size:13px; width:100%;' onchange='cantturn()'><option selected='true' disabled='disabled' value='0'>Seleccione: </option><option value='1'>Turno 1</option><option value='2'>Turno 2</option><option value='3'>Turno 3</option><option value='4'>Todos</option></select>";


        var row = table.insertRow(5);
        var cell6 = row.insertCell(0);
        cell6.colSpan = 2;
        cell6.style = "background-color: white; color:black; font-size: 14px; border:0; text-align:left;";
        cell6.innerHTML = "<label id='cp'></label>";

        var row = table.insertRow(6);
        var cell7 = row.insertCell(0);
        cell7.colSpan = 2;
        cell7.style = "background-color: white; color:black; font-size: 14px; border:0; text-align:left;";
        cell7.innerHTML = "<label id='cpv'></label>";


        var row = table.insertRow(7);
        var cell8 = row.insertCell(0);
        cell8.colSpan = 2;
        cell8.style = "background-color: white; color:gray; font-size: 12px; border:0; text-align:left;";
        cell8.innerHTML = "<b id='labelasigv' hidden='hidden'>Asignar Vehículos:</b>";

        var row = table.insertRow(8);
        var cell9 = row.insertCell(0);
        cell9.colSpan = 2;
        cell9.style = "background-color: white; border:0; margin:0;";
        cell9.innerHTML = "<div id='rutasf' hidden='hidden'><input type='checkbox' id='vehicle1f' name='vehicle1f' value='vehicle1f' onclick='capacidadbuses(id)'><label for='vehicle1f'> &nbsp;&nbsp;1F – buseta de 28 pasajeros </label><br><input type='checkbox' id='vehicle2f' name='vehicle2f' value='vehicle2f' class='CheckedF' onclick='capacidadbuses(id)'><label for='vehicle2f'> &nbsp;&nbsp;2F – buseta de 28 pasajeros </label><br><input type='checkbox' id='vehicle3f' name='vehicle3f' value='vehicle3f' class='CheckedF' onclick='capacidadbuses(id)'><label for='vehicle3f'> &nbsp;&nbsp;4F – buseta de 28 pasajeros </label><br><input type='checkbox' id='vehicle4f' name='vehicle4f' value='vehicle4f' class='CheckedF' onclick='capacidadbuses(id)'><label for='vehicle4f'> &nbsp;&nbsp;9F – buseta de 37 pasajeros </label><br><input type='checkbox' id='vehicle5f' name='vehicle5f' value='vehicle5f' class='CheckedF' onclick='capacidadbuses(id)'><label for='vehicle5f'> &nbsp;&nbsp;14F – buseta de 56 pasajeros </label><br><input type='checkbox' id='vehicle6f' name='vehicle6f' value='vehicle6f' class='CheckedF' onclick='capacidadbuses(id)'><label for='vehicle6f'> &nbsp;&nbsp;19F – buseta de 28 pasajeros </label><br><br></div>";

        var row = table.insertRow(9);
        var cell10 = row.insertCell(0);
        cell10.colSpan = 2;
        cell10.style = "background-color: white; border:0; margin:0;";
        cell10.innerHTML = "<div id='rutasc' hidden='hidden'><input type='checkbox' id='vehicle1c' name='vehicle1c' value='vehicle1c' onclick='capacidadbuses(id)'><label for='vehicle1c'> &nbsp;&nbsp;5C – buseta de 15 pasajeros </label><br><input type='checkbox' id='vehicle2c' name='vehicle2c' value='vehicle2c' onclick='capacidadbuses(id)'><label for='vehicle2c'> &nbsp;&nbsp;6C – buseta de 28 pasajeros </label><br><input type='checkbox' id='vehicle3c' name='vehicle3c' value='vehicle3c' onclick='capacidadbuses(id)'><label for='vehicle3c'> &nbsp;&nbsp;7C – buseta de 19 pasajeros </label><br><input type='checkbox' id='vehicle4c' name='vehicle4c' value='vehicle4c' onclick='capacidadbuses(id)'><label for='vehicle4c'> &nbsp;&nbsp;15C – buseta de 28 pasajeros </label><br><input type='checkbox' id='vehicle5c' name='vehicle5c' value='vehicle5c' onclick='capacidadbuses(id)'><label for='vehicle5c'> &nbsp;&nbsp;17C – buseta de 15 pasajeros (30) </label><br><br></div>";

        var row = table.insertRow(10);
        var cell11 = row.insertCell(0);
        cell11.colSpan = 2;
        cell11.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
        cell11.innerHTML = "<button type='button' onclick=asignarvehiculos() class='btn btn-primary btn-md btn-block'>Asignar</button>";
}




function capacidadbuses(id){
    var tur = document.getElementById('turno').value;
    var planta = document.getElementById('plantas').value;
    
    if(planta == 'Planta Fabrica'){
        var capacidad = 0;
        if (document.getElementById('vehicle1f').checked) {
            capacidad = parseInt(capacidad) + parseInt(28);
        } else if (document.getElementById('vehicle1f').uncheck){    
            capacidad = parseInt(capacidad) - parseInt(28);
        }
        if (document.getElementById('vehicle2f').checked) {
            capacidad = parseInt(capacidad) + parseInt(28);
        } else if (document.getElementById('vehicle2f').uncheck){    
            capacidad = parseInt(capacidad) - parseInt(28);
        }
        if (document.getElementById('vehicle3f').checked) {
            capacidad = parseInt(capacidad) + parseInt(28);
        } else if (document.getElementById('vehicle3f').unchecked){    
            capacidad = parseInt(capacidad) - parseInt(28);
        }
        if (document.getElementById('vehicle4f').checked) {
            capacidad = parseInt(capacidad) + parseInt(37);
        } else if (document.getElementById('vehicle4f').unchecked){    
            capacidad = parseInt(capacidad) - parseInt(37);
        }
        if (document.getElementById('vehicle5f').checked) {
            capacidad = parseInt(capacidad) + parseInt(56);
        } else if (document.getElementById('vehicle5f').unchecked){    
            capacidad = parseInt(capacidad) - parseInt(56);
        }
        if (document.getElementById('vehicle6f').checked) {
            capacidad = parseInt(capacidad) + parseInt(28);
        } else if (document.getElementById('vehicle6f').unchecked){    
            capacidad = parseInt(capacidad) - parseInt(28);
        }
    }
    else if(planta == 'Planta Calera'){
        var capacidad = 0;
        if (document.getElementById('vehicle1c').checked) {
            capacidad = parseInt(capacidad) + parseInt(15);
        } else if (document.getElementById('vehicle1c').uncheck){    
            capacidad = parseInt(capacidad) - parseInt(15);
        }
        if (document.getElementById('vehicle2c').checked) {
            capacidad = parseInt(capacidad) + parseInt(28);
        } else if (document.getElementById('vehicle2c').uncheck){    
            capacidad = parseInt(capacidad) - parseInt(28);
        }
        if (document.getElementById('vehicle3c').checked) {
            capacidad = parseInt(capacidad) + parseInt(19);
        } else if (document.getElementById('vehicle3c').unchecked){    
            capacidad = parseInt(capacidad) - parseInt(19);
        }
        if (document.getElementById('vehicle4c').checked) {
            capacidad = parseInt(capacidad) + parseInt(28);
        } else if (document.getElementById('vehicle4c').unchecked){    
            capacidad = parseInt(capacidad) - parseInt(28);
        }
        if (document.getElementById('vehicle5c').checked) {
            capacidad = parseInt(capacidad) + parseInt(15);
        } else if (document.getElementById('vehicle5c').unchecked){    
            capacidad = parseInt(capacidad) - parseInt(15);
        }
    }
      
      document.getElementById('cpv').innerHTML = 'Capacidad cubierta: ' + parseInt(capacidad);
}



function menuagruparpuntos(){

    document.getElementById("panel_atr").style.visibility = "visible";
    document.getElementById("panel_atr").style.display = "initial";
    document.getElementById("panel_atr").style.height = "auto";
    var table = document.getElementById("tblatt");
     $(".modal-dialog").css("width", "250px");
    table.style.visibility = "visible";
    table.style.display = "initial";
    table.style.height = "auto";
    table.innerHTML = "";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = "<H6><b>CREAR PUNTOS DE RECOGIDA</b></H6>";

    var row = table.insertRow(1);
    var cell2 = row.insertCell(0);
    cell2.colSpan = 2;
    cell2.style = "background-color: white; color:gray; font-size: 12px; border:0; text-align:left;";
    cell2.innerHTML = "<b>Ingrese la distancia: </b>";

    var row = table.insertRow(2);
    var cell3 = row.insertCell(0);
    cell3.colSpan = 2;
    cell3.style = "background-color: white; border:0; margin:0; width: 100%; font-size: 16px;";
    cell3.innerHTML = "<input id='distmax' type='text'>";

    var row = table.insertRow(3);
    var cell4 = row.insertCell(0);
    cell4.colSpan = 2;
    cell4.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
    //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
    cell4.innerHTML = "<button type='button' onclick='agruprutas();' class='btn btn-primary btn-md btn-block'>Generar</button>";
}

function cantturn(){
    var tur = document.getElementById('turno').value;
    var plant = document.getElementById('plantas').value;

    //console.log(tur, plant);

    if (tur == '4'){
        var cantturn1 = search("chia:cantturno2", 1, plant);
        var cantturn2 = search("chia:cantturno2", 2, plant);
        var cantturn3 = search("chia:cantturno2", 3, plant);
        var cantturno = parseInt(cantturn1[0]) + parseInt(cantturn2[0]) + parseInt(cantturn3[0]);
        document.getElementById('cp').innerHTML = 'Cantidad de Pasajeros: ' + cantturno;
    }
    
    else{
        var cantturno = search("chia:cantturno2", tur, plant);
        document.getElementById('cp').innerHTML = 'Cantidad de Pasajeros: ' + cantturno[0];
    }
    
    if(plant == 'Planta Fabrica'){
        document.getElementById('rutasc').style.display = 'none';
        document.getElementById('rutasf').style.display = 'block';
    }
    else if(plant == 'Planta Calera'){
        document.getElementById('rutasf').style.display = 'none';
        document.getElementById('rutasc').style.display = 'block';
    }
   
}


function cantturn2(){
    var tur = document.getElementById('turno').value;
    var plant = document.getElementById('plantas').value;

    //console.log(tur, plant);

    if (tur == '4'){
        var cantturn1 = search("chia:cantturno2", 1, plant);
        var cantturn2 = search("chia:cantturno2", 2, plant);
        var cantturn3 = search("chia:cantturno2", 3, plant);
        var cantturno = parseInt(cantturn1[0]) + parseInt(cantturn2[0]) + parseInt(cantturn3[0]);
        document.getElementById('cp').innerHTML = 'Cantidad de Pasajeros: ' + cantturno;
    }
    
    else{
        var cantturno = search("chia:cantturno2", tur, plant);
        document.getElementById('cp').innerHTML = 'Cantidad de Pasajeros: ' + cantturno[0];
    }
    
    
 
    if(plant == 'Planta Fabrica'){
        document.getElementById('rutasc').style.display = 'none';
        document.getElementById('rutasf').style.display = 'block';
    }
    else if(plant == 'Planta Calera'){
        document.getElementById('rutasf').style.display = 'none';
        document.getElementById('rutasc').style.display = 'block';
    }
    document.getElementById('labelmetros').style.display = 'block';

}

var numerovehiculos = "";

function generatecluster() {

    document.getElementById("panel_atr").style.display = 'none';
    var plantaselec = document.getElementById("plantas").value;
    var turnoselect = document.getElementById("turno").value;

    numerovehiculos = $(".CheckedF:checked").length; //Creamos una Variable y Obtenemos el Numero de Checkbox que esten Seleccionados
    //$("p").text("Tienes Actualmente " + numerovehiculos + " Checkbox " + "Seleccionado(s)");
    alert("Se asignaron " + numerovehiculos + " vehículos para el turno " + turnoselect + " , " + plantaselec);
    //var numerovehiculos = document.getElementById("valorvehiculos").value;
    

     //console.log(plantaselec);
    // console.log(turnoselect);
    var datosc = search("chia:datostabturfab2", plantaselec, turnoselect);
           //console.log(datosc.length);
    var numerodepuntos = datosc.length - numerovehiculos;
    //console.log(numerodepuntos);


      document.getElementById("containerkmeans").style.display = "block"; 
      kMeans("#kmeans", 600, 600, numerodepuntos, numerovehiculos, 1);
        //kMeans("body", 250, 250, 1000, 5, 10);
}
      



function menudistancia(){

    document.getElementById("panel_atr").style.visibility = "visible";
    document.getElementById("panel_atr").style.display = "initial";
    document.getElementById("panel_atr").style.height = "auto";
    /*document.getElementById("contenedorg").style.display = "initial";
    document.getElementById("contenedorg").style.visibility = "visible";
    document.getElementById("contenedorg").style.height = "auto";*/
    var table = document.getElementById("tblatt");
     $(".modal-dialog").css("width", "250px");
    table.style.visibility = "visible";
    table.style.display = "initial";
    table.style.height = "auto";
    table.innerHTML = "";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = "<H6><b>AGRUPAR PUNTOS POR DISTANCIA</b></H6>";

    var row = table.insertRow(1);
    var cell2 = row.insertCell(0);
    cell2.colSpan = 2;
    cell2.style = "background-color: white; color:gray; font-size: 12px; border:0; text-align:left;";
    cell2.innerHTML = "<b>Seleccione La Planta: </b>";

    var row = table.insertRow(2);
    var cell3 = row.insertCell(0);
    cell3.colSpan = 2;
    cell3.style = "background-color: white; border:0; margin:0;";
    cell3.innerHTML = "<select name='plantas' id='plantas' style='font-size:13px; width:100%;' onchange='cantturn2()'><option value='Planta Fabrica'>Planta Fabrica</option><option value='Planta Calera'>Planta Calera</option></select>";

    var row = table.insertRow(3);
    var cell4 = row.insertCell(0);
    cell4.colSpan = 2;
    cell4.style = "background-color: white; color:gray; font-size: 12px; border:0; text-align:left;";
    cell4.innerHTML = "<b>Seleccione El Turno: </b>";

    var row = table.insertRow(4);
    var cell5 = row.insertCell(0);
    cell5.colSpan = 2;
    cell5.style = "background-color: white; border:0; margin:0;";
    cell5.innerHTML = "<select name='turno' id='turno' style='font-size:13px; width:100%;' onchange='cantturn2()'><option selected='true' disabled='disabled' value='0'>Seleccione: </option><option value='1'>Turno 1</option><option value='2'>Turno 2</option><option value='3'>Turno 3</option><option value='4'>Todos</option></select>";


    

  /*  var cantturno1 = search("bogota:cantturno", 1, planta);
    var cantturno2 = search("bogota:cantturno", 2, planta);
    var cantturno3 = search("bogota:cantturno", 3, planta);

    console.log(cantturno1);
    console.log(cantturno2);
    console.log(cantturno3); */

    var row = table.insertRow(5);
    var cell6 = row.insertCell(0);
    cell6.colSpan = 2;
    cell6.style = "background-color: white; color:black; font-size: 14px; border:0; text-align:left;";
    cell6.innerHTML = "<label id='cp'></label>";



    var row = table.insertRow(6);
    var cell7 = row.insertCell(0);
    cell7.colSpan = 2;
    cell7.style = "background-color: white; color:gray; font-size: 12px; border:0; text-align:left;";
    cell7.innerHTML = "<label id='labelmetros' hidden='hidden'>Ingrese la distancia en metros:</label>";

    var row = table.insertRow(7);
    var cell8 = row.insertCell(0);
    cell8.colSpan = 2;
    cell8.style = "background-color: white; border:0; margin:0;";
    //cell8.innerHTML = "<input type='text' id='valorvehiculos' name='valorvehiculos' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:2em;' placeholder='Ejemplo: 2'>";
    cell8.innerHTML = "<div id='rutasf' hidden='hidden'><input type='text' id='distm' name='distm' style = 'font-size:18px;'><br><br></div>";

    var row = table.insertRow(8);
    var cell9 = row.insertCell(0);
    cell9.colSpan = 2;
    cell9.style = "background-color: white; border:0; margin:0;";
    //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
    cell9.innerHTML = "<div id='rutasc' hidden='hidden'><input type='text' id='distm1' name='distm1' style = 'font-size:18px;'><br><br></div>";


    var row = table.insertRow(9);
    var cell10 = row.insertCell(0);
    cell10.colSpan = 2;
    cell10.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
    //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
    cell10.innerHTML = "<button type='button' id='botonagrupar' onclick=generateclusterdistancia() class='btn btn-primary btn-md btn-block'>Agrupar por distancia</button>";


    var row = table.insertRow(10);
    var cell11 = row.insertCell(0);
    cell11.colSpan = 2;
    cell11.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
    //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
    cell11.innerHTML = "<button type='button' id='botongenerardist' hidden='hidden' onclick=siggrupdist() class='btn btn-primary btn-md btn-block'>Generar coordenadas de paradas</button>";

    var row = table.insertRow(11);
    var cell12 = row.insertCell(0);
    cell12.colSpan = 2;
    cell12.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
    //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
    cell12.innerHTML = "<button type='button' id='botongeoinverse' hidden='hidden' onclick=geoinverse() class='btn btn-primary btn-md btn-block'>Generar direcciones de paradas</button>";

}


function generateclusterdistancia(){

    var plantaselec = document.getElementById("plantas").value;
    var turnoselect = document.getElementById("turno").value;
    if(plantaselec=='Planta Calera'){
    var dist = document.getElementById("distm1").value;
    }
    else if(plantaselec=='Planta Fabrica'){
        var dist = document.getElementById("distm").value;
     }
    console.log(dist);
    dist = dist / 100000;
    
    if(turnoselect == '4'){
        console.log(dist, plantaselec);
        var dbscan = search("chia:dbscan", dist, plantaselec);
        console.log(dbscan);
    }

    else{
        var dbscan = search("chia:dbscanfiltro", dist, plantaselec, turnoselect);
    }
    
    console.log(dbscan);

    for (i = 0; i < dbscan.length; i++) {
    
    var grupo = dbscan[i][0];
    //console.log(grupo);
    //console.log(dbscan[i][4]);
    if (grupo == null){
        var grup = dbscan[i][4];
    }
    else{
        var grup = grupo + "-" + plantaselec + "-" + turnoselect;
    }
    console.log(grup);

    //$.jGrowl("AGRUPANDO PARADAS: "  + "Planta: " + plantaselec + ", Dirección: " + dbscan[i][4] + ", Grupo: " + dbscan[i][0],{life : 0});
   

    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>clusterdist</wfs:Name><wfs:Value>' + grup + '</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + dbscan[i][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
    console.log(payload3);


    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload3,
        success: function (xml) {
            },
                error: function (xml) {
                        console.log('error');
            }
        }).done(function() {
              //console.log("listo");
    });
    }

   // document.getElementById('panel_atr').style.display = 'none';
   document.getElementById("botonagrupar").disabled = true;
   document.getElementById('botongenerardist').style.display = 'block';
  alert("Se calcularon las paradas tomando como distancia " + document.getElementById("distm").value + " metros");

}


function siggrupdist(){
    var plantaselec = document.getElementById("plantas").value;
    var turnoselect = document.getElementById("turno").value;
    var dist = document.getElementById("distm").value;
    dist = dist / 100000;

    /*var gruposdist = search("chia:gruposdist", plantaselec);
    console.log(gruposdist);*/
    var grupodistlist = search("chia:cordclusterdist", plantaselec);
    // console.log(grupodistlist);
 
    for (i = 0; i < grupodistlist.length; i++) {
    var latrecogida = grupodistlist[i][2];
    var lonrecogida = grupodistlist[i][1];
    var grupoclusterdistancia = grupodistlist[i][0];
    //$.jGrowl("CALCULANDO COORDENADAS DEL PUNTO DE RECOGIDA: " + grupoclusterdistancia + " Latitud: " + grupodistlist[i][2] + ", Longitud: " + grupodistlist[i][1],{ life : 0});
    

    if(grupoclusterdistancia == 'sin'){
        var payload4 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>direccion_recogida</wfs:Name><wfs:Value>Domicilio</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>clusterdist</ogc:PropertyName><ogc:Literal>' + grupoclusterdistancia + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>'; 
    }
    else{
        var payload4 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>lat_recogida</wfs:Name><wfs:Value>' + latrecogida + '</wfs:Value></wfs:Property><wfs:Property><wfs:Name>lon_recogida</wfs:Name><wfs:Value>' + lonrecogida + '</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>clusterdist</ogc:PropertyName><ogc:Literal>' + grupoclusterdistancia + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>'; 
    }
   


    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: payload4,
        success: function (xml) {
            },
                error: function (xml) {
                        console.log('error');
            }
        }).done(function() {
             
    });
    }

    alert("Se han calculado las coordenadas de los nuevos puntos de recogida");
    document.getElementById('botongenerardist').disabled = true;
    document.getElementById('botongeoinverse').style.display = 'block';
    
}
    

var locations = [];



function geoinverse(){
    var plantaselec = document.getElementById("plantas").value;
    var turnoselect = document.getElementById("turno").value;
    document.getElementById("panel_atr").style.display = 'none';
    document.getElementById('marco2').style.display = 'block';
    document.getElementById('marco2').src = "../geocodinverse.html?planta="+plantaselec+"";

    drawcoordinates();

}





function drawcoordinates(){
    var plantaselec = document.getElementById("plantas").value;
    var data = search("chia:totalbasesdemo2", plantaselec); 
   
  

var ClusterStyleCalera = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 10,
      stroke: new ol.style.Stroke({
        color: '#fff'
      }),
      fill: new ol.style.Fill({
        color: '#FF0000'
      })
    }),
    text: new ol.style.Text({
      text: "P",
      fill: new ol.style.Fill({
        color: '#fff'
      })
    })
  });

  var ClusterStyleFabrica = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 10,
      stroke: new ol.style.Stroke({
        color: '#fff'
      }),
      fill: new ol.style.Fill({
        color: '#0000FF'
      })
    }),
    text: new ol.style.Text({
      text: "P",
      fill: new ol.style.Fill({
        color: '#fff'
      })
    })
  });
  
  var params = "";
  
    for (i = 0; i < data.length - 1; i++) {

      var long = data[i][12];
      var lat = data[i][11]; 
     
     // map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
      var iconFeatures = [];
      var iconFeature = new ol.Feature({
           geometry: new ol.geom.Point(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'))   
      });

//Buffer
   /*   var viewparams = ['query:' + -8518874.18972915 , 'query1:' + 378568.8702230479, 'query2:' + 500];
      params = viewparams.join(';');
      buffer_point.getSource().updateParams({viewparams: params});
      buffer_point.setVisible(true);*/
   
      
      iconFeature.getGeometry();
      if(plantaselec == 'Planta Fabrica'){
        paradasfeatures.setStyle(ClusterStyleFabrica);
      }
      else{
        paradasfeatures.setStyle(ClusterStyleCalera);
      }
      var markerSource = paradasfeatures.getSource();
     // markerSource.clear();
      markerSource.addFeature(iconFeature);
    }
}


var conteoidbus = 0;
var conteoidbuscalera = 0;

function asignarvehiculos(){

    var tur = document.getElementById('turno').value;
    var planta = document.getElementById('plantas').value;
    var payload = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>0</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>planta</ogc:PropertyName><ogc:Literal>' + planta + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });

                var ordenargeom = search("chia:ordenargeom", planta);
                //console.log(ordenargeom);
    
        if(planta == 'Planta Fabrica'){

            if (document.getElementById('vehicle1f').checked) {
                
                for(i=0; i<=28; i++){
                    try{
                      var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>1F</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[i][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                    }
                    catch(err){
                        var payload3 = '';
                    }
                    
                    
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload3,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });
                    conteoidbus = i;
                }   //capacidad = parseInt(capacidad) + parseInt(28);*/
            }      
            
            if (document.getElementById('vehicle2f').checked) {
                console.log(conteoidbus);
               for(i=0; i<=28; i++){
                   try{
                    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>2F</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbus+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                   }
                   catch(err){
                    var payload3 = '';
                   }
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload3,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });
                    var conteoidbus2 = i;
                } 
                conteoidbus = conteoidbus + conteoidbus2;
                //capacidad = parseInt(capacidad) + parseInt(28);
            } 
            if (document.getElementById('vehicle3f').checked) {
                console.log(conteoidbus);
               for(i=0; i<=28; i++){
                   try{
                    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>4F</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbus+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                   }
                   catch(err){
                    var payload3 = '';
                   }
                    
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload3,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });
                    var conteoidbus3 = i;
                } 
                conteoidbus = conteoidbus + conteoidbus3;
                //capacidad = parseInt(capacidad) + parseInt(28);
            } 
            if (document.getElementById('vehicle4f').checked) {
                console.log(conteoidbus);
               for(i=0; i<=37; i++){
                   try{
                    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>9F</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbus+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                   }
                   catch(err){
                    var payload3 = '';
                   }
                    
                    
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload3,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });
                    var conteoidbus4 = i;
                } 
                conteoidbus = conteoidbus + conteoidbus4;
                //capacidad = parseInt(capacidad) + parseInt(37);
            } 
            if (document.getElementById('vehicle5f').checked) {
                console.log(conteoidbus);
               for(i=0; i<=56; i++){
                   try{
                    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>14F</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbus+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                   }
                   catch(err){
                    var payload3 = '';
                   }
                    
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload3,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });
                    var conteoidbus5 = i;
                } 
                conteoidbus = conteoidbus + conteoidbus5;
                //capacidad = parseInt(capacidad) + parseInt(38);
            } 
            if (document.getElementById('vehicle6f').checked) {
               
               for(i=0; i<=28; i++){
                   try{
                    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>19F</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbus+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                   }
                   catch(err){
                    var payload3 = '';
                   }
            
                    
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload3,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });
                    var conteoidbus6 = i;
                } 
                conteoidbus = conteoidbus + conteoidbus6;
                //capacidad = parseInt(capacidad) + parseInt(28);
            } 

        }



        else if(planta == 'Planta Calera'){
           
            if (document.getElementById('vehicle1c').checked) {
                for(i=0; i<=15; i++){
                   try{
                    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>5C</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[i][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                   }
                   catch(err){
                    var payload3 = '';
                }
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload3,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });
                    conteoidbuscalera = i;
                }   
                //capacidad = parseInt(capacidad) + parseInt(15);
            } 
            if (document.getElementById('vehicle2c').checked) {
                console.log(conteoidbuscalera);
               for(i=0; i<=28; i++){
                   try{
                    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>6C</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbuscalera+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                   }
                   catch(err){
                    var payload3 = '';
                }
                    
                    
                    $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                    type: 'POST',
                    dataType: 'xml',
                    processData: false,
                    contentType: 'text/xml',
                    data: payload3,
                    success: function (xml) {
                        },
                            error: function (xml) {
                                    console.log('error');
                        }
                    }).done(function() {
                        //console.log("listo");
                    });
                    var conteoidbuscalera2 = i;
                } 
                conteoidbuscalera = conteoidbuscalera + conteoidbuscalera2;
                //capacidad = parseInt(capacidad) + parseInt(28);
            } 
            if (document.getElementById('vehicle3c').checked) {
                console.log(conteoidbuscalera);
                for(i=0; i<=19; i++){
                    try{
                        var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>7C</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbuscalera+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                    }
                    catch(err){
                        var payload3 = '';
                    }
                $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                type: 'POST',
                dataType: 'xml',
                processData: false,
                contentType: 'text/xml',
                data: payload3,
                success: function (xml) {
                    },
                        error: function (xml) {
                                console.log('error');
                    }
                }).done(function() {
                    //console.log("listo");
                });
                var conteoidbuscalera3 = i;  
              } 
               conteoidbuscalera = conteoidbuscalera + conteoidbuscalera3;
               //capacidad = parseInt(capacidad) + parseInt(19);
            }
            if (document.getElementById('vehicle4c').checked) {
                console.log(conteoidbuscalera);
                for(i=0; i<=28; i++){
                    try{  
                        var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>15C</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbuscalera+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                    }
                    catch(err){
                        var payload3 = '';
                    }
                $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                type: 'POST',
                dataType: 'xml',
                processData: false,
                contentType: 'text/xml',
                data: payload3,
                success: function (xml) {
                    },
                        error: function (xml) {
                                console.log('error');
                    }
                }).done(function() {
                    //console.log("listo");
                });
                var conteoidbuscalera4 = i;  
              } 
               conteoidbuscalera = conteoidbuscalera + conteoidbuscalera4;
                //capacidad = parseInt(capacidad) + parseInt(28);
            } 

            

            if (document.getElementById('vehicle5c').checked) {
                console.log(conteoidbuscalera);
                for(i=0; i<=30; i++){
                    try{
                    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value>17C</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>' + ordenargeom[conteoidbuscalera+parseInt(i)][1] + '</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                    }
                    catch(err){
                        var payload3 = '';
                    }
                $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                type: 'POST',
                dataType: 'xml',
                processData: false,
                contentType: 'text/xml',
                data: payload3,
                success: function (xml) {
                    },
                        error: function (xml) {
                                console.log('error');
                    }
                }).done(function() {
                    //console.log("listo");
                });
                var conteoidbuscalera5 = i;  
              } 
               conteoidbuscalera = conteoidbuscalera + conteoidbuscalera5;
                //capacidad = parseInt(capacidad) + parseInt(15) - simulacion (30);
            } 
        }
       
        document.getElementById("panel_atr").style.display = 'none';
        document.getElementById('marco3').style.display = 'block';
        document.getElementById('marco3').src = "../optimize.html";   
        document.getElementById('volveropt').style.display = 'block';
}




function borrarcalc(){
    var payload3 = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:topp="http://www.openplans.org/topp" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="chia:bases_demo2"><wfs:Property><wfs:Name>grupocluster</wfs:Name><wfs:Value></wfs:Value></wfs:Property><wfs:Property><wfs:Name>clusterdist</wfs:Name><wfs:Value></wfs:Value></wfs:Property><wfs:Property><wfs:Name>lat_recogida</wfs:Name><wfs:Value></wfs:Value></wfs:Property><wfs:Property><wfs:Name>lon_recogida</wfs:Name><wfs:Value></wfs:Value></wfs:Property><wfs:Property><wfs:Name>direccion_recogida</wfs:Name><wfs:Value></wfs:Value></wfs:Property><wfs:Property><wfs:Name>hora_recogida</wfs:Name><wfs:Value></wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsNotEqualTo><ogc:PropertyName>id</ogc:PropertyName><ogc:Literal>sdfkjeilsdkdi</ogc:Literal></ogc:PropertyIsNotEqualTo></ogc:Filter></wfs:Update></wfs:Transaction>';
                   
                $.ajax('http://35.223.81.219:8080/geoserver/chia/ows', {
                type: 'POST',
                dataType: 'xml',
                processData: false,
                contentType: 'text/xml',
                data: payload3,
                success: function (xml) {
                    },
                        error: function (xml) {
                                console.log('error');
                    }
                }).done(function() {
                    //console.log("listo");
                });

                alert("Los datos fueron eliminados");
               
} 

function ocultarbarra(){
    if(document.getElementById("barrabuscar").style.display == "block"){
        document.getElementById("barrabuscar").style.display = "none";
        document.getElementById("myDropdown").style.display = 'none';      
    }
    else{
        $('#barrabuscar').toggle('slow');
        document.getElementById("barrabuscar").style.display = "block";
    }
}

function tablasbase() {
    var esquema = document.getElementById("esquema").value;
    //console.log(esquema);
    var tablas = select_query("SELECT table_name FROM information_schema.tables WHERE table_schema='"+esquema+"' AND table_type='BASE TABLE' order by table_name");
    return tablas;
}

function datostabl(tabladb) {
    var esquema = document.getElementById("esquema").value;
    var tablas1 = select_query("SELECT column_name FROM information_schema.columns WHERE table_schema='"+esquema+"' AND table_name='"+tabladb+"'");
    return tablas1;
}

function datrib(column, tabla){
    var esquema = document.getElementById("esquema").value;
    var tablas1 = select_query("SELECT distinct "+column+" FROM "+esquema+"."+tabla+" limit 5");
    return tablas1;
}
var wms360 = "";
function load360(){   
        wms360 = new ol.layer.Tile({
            visible: true,
            source: new ol.source.TileWMS({
                url: 'http://35.194.38.28:8080/geoserver/risaralda/wms',
                params: {LAYERS: 'risaralda:'+mun+'_360', STYLES: ''},
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            }), name: ''+mun+' 360'
        });
        map.addLayer(wms360);
}