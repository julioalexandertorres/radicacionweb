
// ========= config section ================================================
/*var prediosel = window.location.search.substring(1);
var prediosel = prediosel.split("=");
var prediosel = prediosel[1];*/
//alert(prediosel);
var url = 'https://www.geomonsas.xyz:8443/geoserver/ows?';
var featurePrefix = 'ladm';
var featureType = ['lc_terreno', 'buenaventura_360'];
var featureNS = 'http://ladm.com.co';
var srsName = 'EPSG:4326';
var geometryName = 'geom';
var geometryType = 'MultiPolygon';
var fields = ['*'];
var infoFormat = 'application/vnd.ogc.gml/3.1.1';
var zoom = 12;
var wms360 = "";
var codigopredio = "";
//console.log(mun);
var center = [-8415784, 632066];
//consultassimp(prediosel);
/*var mun = "66001";
 var filtro = '"municipio=' + mun + '"';
 predio.getSource().updateParams({'CQL_FILTER': eval(filtro)});
 construcciones.getSource().updateParams({'CQL_FILTER': eval(filtro)});*/


// =========================================================================
var proj = new ol.proj.Projection({
    code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
    axis: 'enu'
});
conteo = 1;
wfsupdate = "";
var format = [];
var wmsSource = [];
var wms_layer = [];

function putgif() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 0);
        document.getElementById('carga2').style.display = "block";
    });
}
function quitgif() {
    document.getElementById('carga2').style.display = "none";
}
var rangoarea = async function (x) { // async function expression assigned to a variable
    await putgif();
    await rango(x);
    await quitgif();
};

//alert(featureType);

for (var i = 0; i <= featureType.length - 1; i++)
{
    format[i] = new ol.format.GML({featureNS: featureNS, featureType: featureType[i]});
    wmsSource[i] = new ol.source.TileWMS({
        url: url,
        params: {
            'LAYERS': featurePrefix + ':' + featureType[i],
            'TILED': true
        },
        serverType: 'geoserver'
    });
};

//console.log(wmsSource);
var popup = new app.Popup({
    element: document.getElementById('popup'),
    closeBox: true,
    autoPan: true
});
var highlight = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
var highlighdrawp = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
var highlighdrawl = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});
var highlighdrawm = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});


var markStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        //opacity: 0.75,
        scale: 0.25,
        src: './imagenes/marca.png'
    })
});


var PuntoStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 10,
        stroke: new ol.style.Stroke({
            color: 'white',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: '#00FFFF'
        })
    })
});


var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: function (coord) {
        return ol.coordinate.toStringHDMS(coord);
    },
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});
//mousePositionControl.setProjection(ol.proj.get('3857'));
$("#mouse-position").removeAttr("hidden").show();
//var tipoUsuario = validacionusuarios()[0][6];
map = new ol.Map({
    controls: ol.control.defaults().extend([new ol.control.ZoomToExtent({
            //ajuste rural
            extent: [-8677326.952362, 359941.992245, -8504851.615769, 452508.319452]
        }),
        /*new ol.control.OverviewMap({
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: [new ol.layer.Tile({
                    source: new ol.source.OSM({
                        'url': 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
                    })
                })],
            collapseLabel: '\u00BB',
            label: '\u00AB',
            collapsed: true
        })*/
    ]).extend([mousePositionControl]),
    // add the popup as a map overlay
    overlays: [popup],
    // render the map in the 'map' div
    target: document.getElementById('map'),
    // use the Canvas renderer
    renderer: 'canvas',
    layers: [layerBase, layerfuentessecundarias, layercatastroav, layercatastrogc, layercatastrocc, layercatastro,/*layerValorizacion, */highlightfeatures, highlight, highlighdrawp, highlighdrawl, highlighdrawm],
    view: new ol.View({
        center: center,
        zoom: zoom,
        //ajuste rural
        //extent: [-8251958.568990, 663097.874878, -8174716.557064, 707498.799724],
        //maxZoom: 21, minZoom: 12
        maxZoom: 21, minZoom: 1
    })
});
/*map.on('moveend', function (e) {	
     zoom = e.map.previousExtent_;
	 var zoomscale = map.getView().getZoom();
	 if (zoomscale == '8') {
     document.getElementsByClassName('ol-scale-line')["0"].style.backgroundImage = "url('./imagenes/8k.png')";     
    }
	 
});*/
/*function prevzoom() {
    var view = map.getView();
    view.fitExtent(zoom, map.getSize());
    if (document.getElementById("za1").disabled === false) {
        document.getElementById("za1").disabled = true;
        document.getElementById("za2").disabled = false;
    } else {
        document.getElementById("za1").disabled = false;
        document.getElementById("za2").disabled = true;
    }
}*/

 /* map.on('moveend', function (e) {
  var zoomscale = map.getView().getZoom();
    console.log(zoomscale); 
    console.log(clusters.values_.source.features_.length);
  });*/

map.getLayerGroup().set('name', 'CAPAS');
// register a single click listener on the map and show a popup
// based on WMS GetFeatureInfo
map.on('singleclick', function (evt) {
    var markerSource = highlight.getSource();
    markerSource.clear();
    //markerSource.clear();
    coordinates = evt;
    var layer = findBy(map.getLayerGroup(), 'name', datoswmsc);
    var viewResolution = map.getView().getResolution();
    var url = wmsSource[0].getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, map.getView().getProjection(),
            {'INFO_FORMAT': infoFormat}
    );
    var url2 = wmsSource[1].getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, map.getView().getProjection(),
        {'INFO_FORMAT': infoFormat}
    );

    if (document.body.style.cursor == "help") {
        var table = document.getElementById("tblattwms");
        table.innerHTML = "";
        document.getElementById("table-dynamic").innerHTML = "";
        var resolution = map.getView().getResolution();
        //console.log(layer);
        var url3 = eval(layer).getSource().getGetFeatureInfoUrl(evt.coordinate, resolution, 'EPSG:3857', {'INFO_FORMAT': 'application/json'});
        
        $.ajax({
            url: url3,
            beforeSend: function () {
            //if (tamañopantalla==true){
                //putgif();}
                //else{
                    document.getElementById("carga2").style.display = "block";  
                //}
            },
            success: function (response) {
                // console.log(response,url3);
                /*if (response.numberReturned>0) {
                    var datos = [];
                    datos.push(response.features[0].properties);
                    //console.log(datos);
                    var table = new Tabulator("#table-dynamic", {
                        data:datos, //assign data to table
                        layout:"fitColumns", //fit columns to width of table (optional)
                        columnMinWidth:100,
                        autoColumns:true,
                        movableColumns:true,      //allow column order to be changed
                        resizableRows:true      //allow row order to be changed   
                    });
            
                    $(".modal-dialog").css("width", "80%");
                    document.getElementById("panel_infwms").style.display = "block";
                    
                } else {
                    alert('No hay información asociada a la capa')
                }*/


                if (response.numberReturned > 0) {
                    var datos = [];
                    var properties = response.features[0].properties;
                    
                    // Recorre las propiedades y crea un objeto para cada par nombre-valor
                    for (var key in properties) {
                      if (properties.hasOwnProperty(key)) {
                        var dato = {
                          Nombre: key,
                          Valor: properties[key]
                        };
                        datos.push(dato);
                      }
                    }
                    
                    var table = new Tabulator("#table-dynamic", {
                      data: datos, // asigna los datos a la tabla
                      layout: "fitColumns", // ajusta las columnas al ancho de la tabla
                      columns: [
                        { title: "Nombre", field: "Nombre" },
                        { title: "Valor", field: "Valor" }
                      ],
                      movableColumns: true, // permite cambiar el orden de las columnas
                      resizableRows: true // permite cambiar el orden de las filas
                    });
                  
                    $(".modal-dialog").css("width", "80%");
                    document.getElementById("panel_infwms").style.display = "block";
                  } else {
                    alert('No hay información asociada a la capa');
                  }

            },
            complete: function(){
                //if (tamañopantalla==true){quitgif(); }
                //else{
                document.getElementById("carga2").style.display = "none";  
                //}
            } 
          });
    }
    
    //var tamañopantalla = screen.width > 800;
    if (url && document.body.style.cursor != "help" && document.getElementById('medidas').style.display == 'none') {
        $.ajax({
            url: url,
            beforeSend: function () {
                //if (tamañopantalla == true) {
                    //putgif();
                //} else {
                    //document.getElementById("carga2").style.display = "block";
                //}
            },
            success: function (data) {
                data = data.split("urn:x-ogc:def:crs:EPSG:3857").join("http://www.opengis.net/gml/srs/epsg.xml#4326");
                var features = format[0].readFeatures(data);
                if (features && features.length >= 1 && features[0]) {
                    var feature = features[0];
                    var values = feature.getProperties();
                    var tidlcterreno = values.t_id;
                    var geom = feature.getGeometry();
                    var coord = geom.flatCoordinates;
                    var transf = coord;
                    var transf2 = (transf[0]);
                    var transf = [transf[0], transf[1], 0];
                    var transf = [values.latitud, values.longitud, 0];
                    var uebaunitlcterreno= select_query("select * from valparaiso.col_uebaunit where ue_lc_terreno = '"+values.t_id+"'");                             
                    var baunit = uebaunitlcterreno[0][7];
                    var datoslcpredio = select_query("select * from valparaiso.lc_predio where t_id = '"+uebaunitlcterreno[0][7]+"'");           
                    try{
                        var direccion = datoslcpredio[0][21];
                        var idoperacion = datoslcpredio[0][4];
                        var matricula = datoslcpredio[0][7];
                        var numeropredial = datoslcpredio[0][8];
                        var nupre = datoslcpredio[0][13];
                        var avaluo_catastral = datoslcpredio[0][14];
                        var condicionpredio = datoslcpredio[0][17];
                        var desteconomica = datoslcpredio[0][18];
                        var comienzovidautil = datoslcpredio[0][22];
                    }
                    catch(err){
                        var direccion = "Sin Información", idoperacion = "Sin Información", matricula = "Sin Información", numeropredial = "Sin Información", nupre = "Sin Información", avaluo_catastral = "Sin Información", condicionpredio = "Sin Información", desteconomica = "Sin Información", comienzovidautil = "Sin Información";
                    }       
                    
                    
                    var tabledinamic = document.getElementById("table-dynamic");
                    tabledinamic.innerHTML = "";
                    var table = document.getElementById("tblatt");
                    table.innerHTML = "";                                                 
                    var select = [];
                    var sel = [];
                    var imag = [];
                    var stv = [];
                    var ig = [];
                    select[0] = "<b>Dirección: </b>";
                    select[1] = "<b>Id operación: </b>";
                    select[2] = "<b>Número predial: </b>";
                    select[3] = "<b>Matricula: </b>";
                    select[4] = "<b>Nupre: </b>";
                    select[5] = "<b>Área de Terreno: </b>";
                    select[6] = "<b>Condición del predio: </b>"; 
                    select[7] = "<b>Destinación económica: </b>";
                    //select[8] = "<b>Comienzo vida útil: </b>";
                    //select[9] = "<b>Baunit: </b>";
                    //select[10] = "<b>Fotografía: </b>";
                    //select[11] = "<b>Ver marcas: </b>";
                    //select[12] = "<b>Agregar marcas: </b>";
                    

                    sel[0] = direccion;
                    sel[1] = idoperacion;
                    sel[2] = numeropredial;
                    sel[3] = matricula;
                    sel[4] = nupre;
                    sel[5] = parseInt(values.area_terreno) + " m2";
                    sel[6] = condicionpredio;
                    sel[7] = desteconomica;
                    //sel[8] = comienzovidautil;  
                    //sel[9] = baunit;         
                    //stv[10] = document.createElement("a");
                    //stv[10].setAttribute("onclick", "open_ficha("+ values.gid+")");
                    //ig[10] = document.createElement("img");
                    //ig[10].style = "cursor:pointer";
                    //ig[10].src = "./imagenes/carta.png";
                    //sel[11] = "<i class='fa fa-solid fa-folder-open fa-2x' style='color: #FCB314; cursor: pointer;' onclick='vermarca("+tidlcterreno+")'><i/>";
                    //sel[12] = "<i class='fa fa-solid fa-circle-plus fa-2x' style='color: #FCB314; cursor: pointer;' onclick='agregarmarca("+tidlcterreno+")'><i/>";
                    
                    for (i = 0; i < select.length; i++) {
                        row = table.insertRow(i);
                        cell1 = row.insertCell(0);
                        cell2 = row.insertCell(1);
                        cell1.innerHTML = select[i];
                        if (i === 10) {
                            cell2.appendChild(stv[i]);
                            stv[i].appendChild(ig[i]);
                        } else {
                            cell2.innerHTML = sel[i];
                        }
                    }     
                        document.getElementById("panel_atr").style.display = "block";
                        var c = feature.values_.geometria.flatCoordinates.length - 1;
                        //console.log(feature.values_);
                        for (var i = 0; i <= c; i = i + 3) {
                            var a = feature.values_.geometria.flatCoordinates[i];
                            feature.values_.geometria.flatCoordinates[i] = feature.values_.geometria.flatCoordinates[i + 1];
                            feature.values_.geometria.flatCoordinates[i + 1] = a;
                        }
                        //feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
                        feature.getGeometry();
                        highlightfeatures.setStyle(PredioStyle);
                        var markerSourcenoph = highlightfeatures.getSource();
                        markerSourcenoph.clear();
                        //console.log(feature);
                        markerSourcenoph.addFeature(feature);             
                        var baunitlccons = select_query("select ue_lc_construccion from valparaiso.col_uebaunit where baunit = '"+baunit+"' and ue_lc_construccion is not null");
                        try{
                          var numconst = baunitlccons.length;
                        }
                        catch(err){
                          var numconst = 0;
                        }
                        var tablepot = document.getElementById("tblattpot");
                        tablepot.innerHTML = "";
                        var selectc = [];
                        var selc = [];
                        /*for (j = 0; j < numconst; j++) {
                            selectc[0] = "Id construcción: ";
                            selc[0] = baunitlccons[j][0];
                            for (i = 0; i < selectc.length; i++) {
                                row = tablepot.insertRow(i);
                                cell1 = row.insertCell(0);
                                cell2 = row.insertCell(1);
                                cell1.innerHTML = selectc[i]; 
                                cell2.innerHTML = selc[i];
                            }
                        }*/
                        for (var j = 0; j < numconst; j++) {
                            selectc[0] = "Id construcción: ";
                            selc[0] = document.createElement("a");  // Crear un elemento <a>
                            selc[0].href = "#";  // Establecer el atributo href para hacerlo parecer un enlace
                            selc[0].textContent = baunitlccons[j][0];  // Establecer el texto del enlace
                            selc[0].onclick = (function(id) {  // Función autoinvocada para manejar el clic
                                return function() {
                                    datosconst(id);
                                    return false;  // Prevenir el comportamiento predeterminado del enlace
                                };
                            })(baunitlccons[j][0]);
                        
                            for (var i = 0; i < selectc.length; i++) {
                                var row = tablepot.insertRow(i);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                cell1.innerHTML = selectc[i];
                                if (typeof selc[i] === "object") {  // Verificar si selc[i] es un elemento DOM
                                    cell2.appendChild(selc[i]);  // Añadir el elemento <a> a la celda
                                } else {
                                    cell2.innerHTML = selc[i];
                                }
                            }
                        }
                }   
            },
            complete: function () {
                //if (tamañopantalla === true) {
                    //quitgif();
                //} else {
                    document.getElementById("carga2").style.display = "none";
                //}
            }
        });
    }

    /*if (url2) {
        $.ajax({
                url: url2,
                beforeSend: function () {
                //if (tamañopantalla==true){
                    //putgif();}
                    //else{
                        document.getElementById("carga2").style.display = "block";  
                    //}
                },
                success: function (data) {
                    data = data.split("urn:x-ogc:def:crs:EPSG:3857").join("http://www.opengis.net/gml/srs/epsg.xml#4326");
                    var features = format[1].readFeatures(data);
                    try{
                    var temp = features["0"].actualEventTarget_.actualEventTarget_.geometryName_;
                        }
                    catch (err) {
                        var temp ="nogeom";
                    }
                    if (temp == "geom") {   
                        document.getElementById('marco5').style.display = 'block';
                        document.getElementById('container3').style.display = 'block';
                        var feature = features[0];
                        //console.log(feature);
                        var values = feature.getProperties();
                        //console.log(values);
                        //var features = format[1].readFeatures(data);
                        var marca = values.streetview;
                        //console.log(marca);
                        panorama1(marca);
                        panoramica = values.nombre;
                        //console.log(values);
                        var coordinatesStreet= [values.latitud, values.longitud, 0];
                        //console.log(coordinatesStreet);
                        var urlsv = "street_view.html?coordenadas=" + coordinatesStreet;
                        //console.log(urlsv);
                        window.open(urlsv, target="marco5"); 
  
                        var c = feature.values_.geom.flatCoordinates.length - 1;;
                        for (var i = 0; i <= c; i = i + 3) {
                            var a = feature.values_.geom.flatCoordinates[i];
                            feature.values_.geom.flatCoordinates[i] = feature.values_.geom.flatCoordinates[i + 1];
                            feature.values_.geom.flatCoordinates[i + 1] = a;
                        }
                        //feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
                        highlightfeatures.setStyle(PuntoStyle);
                        var markerSourcenoph = highlightfeatures.getSource();
                        markerSourcenoph.clear();
                        markerSourcenoph.addFeature(feature);
                        
                    }
                },
             complete: function(){
                    //if (tamañopantalla==true){
                    //quitgif(); }
                    //else{
                    document.getElementById("carga2").style.display = "none";  
                       //}
                }            
            });
        }*/

});

function datosconst(idcons){
    //console.log(idcons);
    var dataconst = select_query("select * FROM valparaiso.lc_construccion where t_id = "+idcons+"");
    //console.log(dataconst);
    var tablepot = document.getElementById("tblattpot");
    tablepot.innerHTML = "";
    var select = [];
    var sel = [];
    select[0] = "Identificador: ";
    select[1] = "Tipo de construcción: ";
    select[2] = "Tipo de dominio: ";
    select[3] = "Número de pisos: ";
    select[4] = "Año de construcción: ";
    select[5] = "Avaluó construcción: ";
    select[6] = "Área de construcción: ";
    select[7] = "Altura: ";
    select[8] = "Observaciones: ";
    sel[0] = dataconst[0][2];
    sel[1] = dataconst[0][3];
    sel[2] = dataconst[0][4];
    sel[3] = dataconst[0][5];
    sel[4] = dataconst[0][9];
    sel[5] = dataconst[0][10];
    sel[6] = dataconst[0][12];
    sel[7] = dataconst[0][13];
    sel[8] = dataconst[0][14];
    for (i = 0; i < select.length; i++) {
        row = tablepot.insertRow(i);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = select[i]; 
        cell2.innerHTML = sel[i];
    }
}