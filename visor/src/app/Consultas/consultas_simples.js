var BarrioStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(0,255,255,1)",
        lineDash: null,
        lineCap: 'butt',
        lineJoin: 'miter',
        width: 3
    }),
    /*fill : new ol.style.Fill({
     color : "rgba(0,0,255,0.7)"
     })*/
    text: new ol.style.Text({
        font: '12px helvetica,sans-serif',
        scale: 1.5,
        fill: new ol.style.Fill({
            color: '#000000'
        }),
        stroke: new ol.style.Stroke({
            color: '#FFFFFF',
            width: 3.5
        })
    })
});

var PredioStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(0,255,255,1)",
        lineDash: null,
        lineCap: 'butt',
        lineJoin: 'miter',
        width: 3
    }),
    fill: new ol.style.Fill({
        color: "rgba(0,255,255,0.1)"
    })
});
var PredioDebe = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgb(255, 0, 0, 1)",
        lineDash: null,
        lineCap: 'butt',
        lineJoin: 'miter',
        width: 3
    }),
    fill: new ol.style.Fill({
        color: "rgb(255, 0, 0, 0.1)"
    })
});
var PuntoStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: "rgba(0,255,255,1)",

    }),
    fill: new ol.style.Fill({
        color: "rgba(0,255,255,0.3)"
    })
});
// A point marker style using a flag image as the icon.
var flagStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.2, 0.9],
        opacity: 0.75,
        scale: 0.25,
        src: './imagenes/flag.png'
    })
});

var alerta = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 5,
        snapToPixel: false,
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 0, 0, 0.8)',
            width: 3
        })
    })
});

var alertc = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 5,
        snapToPixel: false,
        stroke: new ol.style.Stroke({
            color: 'rgba(214, 147, 12, 0.8)',
            width: 3
        })
    })
});
var txt = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 1.25
    }),
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({color: '#000'}),
        stroke: new ol.style.Stroke({
            color: '#fff', width: 2
        }),
        
        text: ''
    })
});
var street1 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/1.png'
    })
});
var street2 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/2.png'
    })
});
var street3 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/3.png'
    })
});
var street4 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/4.png'
    })
});
var street5 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/5.png'
    })
});
var street6 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],

        scale: 1,
        src: './imagenes/street/6.png'
    })
});
var street7 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/7.png'
    })
});
var street8 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/8.png'
    })
});
var street9 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/9.png'
    })
});
var street10 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/10.png'
    })
});
var street11 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/11.png'
    })
});
var street12 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/12.png'
    })
});
var street13 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/13.png'
    })
});
var street14 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/14.png'
    })
});
var street15 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/15.png'
    })
});
var street16 = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [1, 1],
        scale: 1,
        src: './imagenes/street/16.png'
    })
});
var ubicacion = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        opacity: 1,
        scale: 0.3,
        src: './imagenes/ubicacion.png'
    })
});
//AUTOCOMPLETE INITIAL
$("#direccion").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPredio
});

$("#manzana").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectManzana
});

$("#address1").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        BuscarSitio();
    }
});

$("#codigo").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPredio
});

$("#matricula").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPredio
});

$("#propietarios").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPropietarios
});

$("#formbuscarprediomark").autocomplete({
    minLength: 1,
    source: addressSource,
    select: addressSelectPredioTable
});


function consultassimp(){
        var prediosel = window.location.search.substring(1);
        var prediosel = prediosel.split("=");
        var prediosel = prediosel[1];
        var geome = select_query("select ST_AsGeoJSON(ST_Transform(ST_Force2D(geometria), 4326)) FROM valparaiso.lc_terreno where t_id = '"+prediosel+"'");
        var view = map.getView();
        var geojsonprueba = JSON.parse(geome[0]); 
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326','EPSG:3857');
        var geom = feat.getGeometry();
        highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat); 
        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;
        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fitExtent(ppExtent, map.getSize());
}


function addressSource(requestString, responseFunc) {
    //globalstyle = "sinconsulta";
   // predio.setVisible(true);
    //try{
    if (requestString.term !== null && requestString.term !== undefined) {
        var querystr = requestString.term;
        //}catch (err){
    } else {
        var querystr = document.getElementById(requestString).value;
        var requestString = {val: 123};
        //}
    }
    if (querystr.length === 0) {
        response([]);
        return;
    }
    var viewParamsStr = viewparamsToStr({
        query: querystr
    });
    //console.log(viewParamsStr);
    
    if ($("#direccion")["0"].value !== "" || requestString.val === 123) {       
        var temp = "direccion";
    }  
    else if ($("#manzana")["0"].value !== "" || requestString.val === 123) {       
        var temp = "manzana";
    }
    else if ($("#codigo")["0"].value !== "" || requestString.val === 123) {       
        var temp = "codigo";
    }
    else if ($("#matricula")["0"].value !== "" || requestString.val === 123) {       
        var temp = "matricula";
    } 
    else if ($("#propietarios")["0"].value !== "" || requestString.val === 123) {       
        var temp = "propietarios";
    } 
    else if ($("#formbuscarprediomark")["0"].value !== "" || requestString.val === 123) {       
        var temp = "direccion";
    }
    
    
        
    //var tamañopantalla = screen.width > 800;
   
    $.ajax({
        url: url,
        beforeSend: function () {
            //if (tamañopantalla == true) {
                //putgif();
            //} else {
                document.getElementById("carga2").style.display = "block";
            //}
        },
        
        success: function (data, status, xhr) {
            var arr = [];
            if (temp === "direccion") {    
                var datos = select_query("SELECT DISTINCT initcap(a.nombre) AS nombre, a.numero_predial AS numero_predial, a.t_id AS t_id FROM valparaiso.lc_predio AS a WHERE a.nombre ILIKE '%"+querystr+"%' ORDER BY nombre DESC LIMIT 10");
                //console.log(datos);
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            direccion: datos[i][0],
                            value: datos[i][0],
                            cod: datos[i][1],
                            tid: datos[i][2],
                            feature: datos
                        });
                    }
                }
                catch(err){}
                //console.log(arr); 
            }  
            else if (temp === "manzana") { 
                var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.codigo_ant As codigo_ant, a.barrio_cod AS barrio_cod, a.gid AS gid FROM catastro.u_manzana AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10");             	 
                //var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.codigo_ant AS codigo_ant, a.barrio_cod AS barrio_cod, a.gid AS gid FROM catastro.u_manzana AS a WHERE a.codigo ILIKE '%"+querystr+"%' ORDER BY codigo DESC LIMIT 10");       
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({  
                            value: datos[i][0],
                            cod: datos[i][0],
                            codigo_ant: datos[i][1],
                            barrio_cod: datos[i][2],
                            codigo_mun: datos[i][3],
                            gid: datos[i][4],
                            feature: datos
                        });
                    } 
                }
                catch(err){}   
            } 
            else if (temp === "codigo") { 
                var datos = select_query("SELECT DISTINCT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10");             	 
                //var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10"); 
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            direccion: datos[i][1],
                            value: datos[i][0],
                            cod: datos[i][0],
                            feature: datos
                        });
                    }
                }
                catch(err){}  
            } 
            else if (temp === "matricula") { 
                var datos = select_query("SELECT initcap(a.matricula) AS matricula, a.codigo AS codigo FROM catastro.r1 AS a, to_tsquery_partial('"+querystr+"') AS query WHERE matricula @@ query ORDER BY matricula DESC LIMIT 10");             	 
                //var datos = select_query("SELECT initcap(a.codigo) AS codigo, a.direccion AS direccion FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE codigo @@ query ORDER BY codigo DESC LIMIT 10"); 
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            matricula: datos[i][0],
                            value: datos[i][0],
                            cod: datos[i][1],
                            feature: datos
                        });
                    }
                }
                catch(err){}  
            } 
            else if (temp === "propietarios") {
                var datos = select_query("SELECT initcap(a.nombre) AS nombre, a.direccion AS direccion, a.codigo AS codigo FROM catastro.r1 AS a WHERE a.nombre ILIKE '%"+querystr+"%' ORDER BY nombre DESC LIMIT 10");
                //var datos = select_query("SELECT initcap(a.nombre) AS nombre, a.codigo AS codigo FROM catastro.u_terreno_registros AS a, to_tsquery_partial('"+querystr+"') AS query WHERE nombre @@ query ORDER BY nombre DESC LIMIT 10");
                try{
                    for (i = 0; i < datos.length; i++) {                   
                        arr.push({              
                            nombre: datos[i][0],
                            value: datos[i][0],
                            direccion: datos[i][1],
                            cod: datos[i][2],
                            feature: datos
                        });
                    }
                    //console.log(arr);
                } 
                catch(err){}    
            }
            if (arr.length !== 0) {
  
                if (requestString.val === "direccion" || requestString.val === "codigo") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    console.log(arreglado);
                    addressSelectPredio(1, arreglado);
                }
                else if (requestString.val === "manzana") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectManzana(1, arreglado);
                }
                else if (requestString.val === "propietarios") {
                    var arreglado = {};
                    for (var i = 0; i < arr.length; ++i) {
                        arreglado[i] = arr[i];
                    }
                    arreglado.item = arreglado["0"];
                    addressSelectPropietarios(1, arreglado);
                }
                try {
                    responseFunc(arr);
                } catch (err) {
                    var arreglado = {};
                    arreglado.item = arr["0"];
                    try {
                        if (temp=='nombre'){
                            addressSelectPredio(1, arreglado);
                        }
                        else
                        {   
                        addressSelect(1, arreglado);
                         }
                    } catch (err) {
                       //alert("");
                    }
                }
            } else {
                if (temp === 'direcci') {
                    codeAddress(viewParamsStr);
                } 
            }
        },
        error: function () {
            console.log("error");
        },
        complete: function () {
            //if (tamañopantalla == true) {
                //quitgif();
            //} else {
                document.getElementById("carga2").style.display = "none";
            //}
        }

    });
}


function addressSelectPredio(event, ui) {
    try{
        var codph = ui.item.cod.slice(21, 22);
        if(codph == '9' || codph == '8'){
            var tipoaval = "Predio en propiedad horizontal o condominio";
        }
        else if(codph == '5'){
            var tipoaval = "Mejora (Construcción en predio ajeno)";
        }
        else{
            var tipoaval = "No PH";
        }
        var view = map.getView();
        var datoslcpredio = select_query("select * from valparaiso.lc_predio where t_id = '"+ui.item.tid+"'"); 
        var colbaunitlcterreno = select_query("select ue_lc_terreno from valparaiso.col_uebaunit where baunit = '"+datoslcpredio[0][0]+"' and ue_lc_terreno is not null");
        //console.log(colbaunitlcterreno);
        //var geome = select_query("select ST_AsGeoJSON(geometria) from valparaiso.lc_terreno where t_id = '"+colbaunitlcterreno[0][0]+"'");
        var geome = select_query("select ST_AsGeoJSON(ST_Transform(ST_Force2D(geometria), 4326)) FROM valparaiso.lc_terreno where t_id = '"+colbaunitlcterreno[0][0]+"'");
        var datalcterreno = select_query("select * FROM valparaiso.lc_terreno where t_id = '"+colbaunitlcterreno[0][0]+"'");
        //console.log(geome);
        /*if(geome == null){
            var geome = select_query("select ST_AsGeoJSON(geom) from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
        }*/
        var geojsonprueba = JSON.parse(geome[0]); 
        //console.log(geojsonprueba);
        var coord = geojsonprueba.coordinates[0][0];
        //console.log(coord);
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        //console.log(feat);
        feat.getGeometry().transform('EPSG:4326','EPSG:3857');
        var geom = feat.getGeometry();
        //console.log(geom);
        highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat); 
        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;
        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fitExtent(ppExtent, map.getSize());  
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
                //console.log(direccion,idoperacion,matricula,numeropredial,nupre,avaluo_catastral,condicionpredio,desteconomica,comienzovidautil);
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
            select[8] = "<b>Tipo de avaluó : </b>";
            select[9] = "<b>Baunit: </b>";
            sel[0] = direccion;
            sel[1] = idoperacion;
            sel[2] = numeropredial;
            sel[3] = matricula;
            sel[4] = nupre;
            //sel[5] = parseInt(values.area_terreno) + " m2";
            sel[5] = parseInt(datalcterreno[0][2]) + " m2";
            sel[6] = condicionpredio;
            sel[7] = desteconomica;
            sel[8] = tipoaval;  
            sel[9] = datoslcpredio[0][0];         
            stv[10] = document.createElement("a");
            stv[10].setAttribute("onclick", "open_ficha()");
            ig[10] = document.createElement("img");
            ig[10].style = "cursor:pointer";
            ig[10].src = "./imagenes/carta.png";
     
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
            }
            catch(err){
                alert("No se encontro información geografica asociada a la consulta, es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro");
                
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
                select[5] = "<b>Condición del predio: </b>"; 
                select[6] = "<b>Destinación económica: </b>";
                select[7] = "<b>Tipo de avaluó : </b>";
                select[8] = "<b>Baunit: </b>";
                sel[0] = direccion;
                sel[1] = idoperacion;
                sel[2] = numeropredial;
                sel[3] = matricula;
                sel[4] = nupre;
                sel[5] = condicionpredio;
                sel[6] = desteconomica;
                sel[7] = tipoaval;  
                sel[8] = datoslcpredio[0][0];   
                stv[9] = document.createElement("a");
                stv[9].setAttribute("onclick", "open_ficha()");
                ig[9] = document.createElement("img");
                ig[9].style = "cursor:pointer";
                ig[9].src = "./imagenes/carta.png";                               
                for (i = 0; i < select.length; i++) {
                    row = table.insertRow(i);
                    cell1 = row.insertCell(0);
                    cell2 = row.insertCell(1);
                    cell1.innerHTML = select[i];
                    cell2.innerHTML = sel[i];
                 }
                    document.getElementById("panel_atr").style.display = "block";
                    vistainicial();
            }
}

function addressSelectPredioTable(event, ui) {
        document.getElementById("menuAgregarmarca").style.display = 'block';
        /*var codph = ui.item.cod.slice(21, 22);
        if(codph == '9' || codph == '8'){
            var tipoaval = "Predio en propiedad horizontal o condominio";
        }
        else if(codph == '5'){
            var tipoaval = "Mejora (Construcción en predio ajeno)";
        }
        else{
            var tipoaval = "No PH";
        }*/
        //var view = map.getView();
        let datoslcpredio = select_query("select * from valparaiso.lc_predio where t_id = '"+ui.item.tid+"'");
        //console.log(datoslcpredio);
        let datosmarcas = select_query("select * from marcas where t_id_lc_predio = '"+ui.item.tid+"'");
        //console.log(datosmarcas);
        let marca;
        let datosTable = [];
        try{
            marca = datosmarcas[0][2];         
        }
        catch(err){
            marca = "Sin Marca";
        }
        if (datoslcpredio.length > 0){
            var resultados = document.getElementById('tablecat');
            resultados.innerHTML = '';
            table = [];
            $('#loadingModal').modal('hide');
            var datostablas = [['Id marca'], ['Nombre'], ['Número Predial'], ['Marca']];
            //console.log(datoslcpredio);
            let nummark = select_query("select * from marcas where numero_predial = '"+datoslcpredio[0][8]+"'");
            //console.log(nummark);
            
            //console.log(nummark);
            //console.log(nummark.length);
            if(nummark){
                for (i=0; i < nummark.length; i++){
                    //console.log(i, datoslcpredio[0][8], nummark[i][1], nummark[i][2]);
                    datosTable.push([nummark[i][0], datoslcpredio[0][21], nummark[i][1], nummark[i][2]]);
                }
            }
            else{
                alert("No existen marcas para este predio");
                datosTable.push(['N/A', datoslcpredio[0][21], datoslcpredio[0][8], "Sin marcas"]);
            }
            //console.log(datosTable);
            var select = datosTable;
            var filtro = "agregarmarca";
            buildTableSelectForm(datostablas, select, filtro);
          }
}

function addressSelectManzana(event, ui) {
    //console.log(ui);
    try{
    var view = map.getView();
    var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_manzana where codigo = '"+ui.item.cod+"'");
    var geojsonprueba = JSON.parse(geome[0]); 
    var coord = geojsonprueba.coordinates[0][0];
    var feat = new ol.Feature({
        geometry: new ol.geom.Polygon([coord])
    });
    feat.getGeometry().transform('EPSG:4326','EPSG:3857');
    var geom = feat.getGeometry();
    highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat);
        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;

        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fitExtent(ppExtent, map.getSize());

        var tabledinamic = document.getElementById("table-dynamic");
        tabledinamic.innerHTML = "";
        var table = document.getElementById("tblatt");
        table.innerHTML = "";
                                
        var select = [];
        var sel = [];
        var imag = [];
        var stv = [];
        var ig = [];

    //console.log(ui.item.cod);
        //var str1 = "a" + String(ui.item.cod);
        //var str2 = "-22122020"; 
        //var codcon= str1.concat(str2);
        //console.log(ui.item);
        select[0] = "<b>Código Manzana: </b>";
        select[1] = "<b>Código Anterior: </b>";
        select[2] = "<b>Código Barrio: </b>";
        sel[0] = ui.item.cod;
        sel[1] = ui.item.codigo_ant;
        sel[2] = ui.item.barrio_cod;
        

        for (i = 0; i < select.length; i++) {
            row = table.insertRow(i);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            if (i === 4) {
                cell2.appendChild(stv[i]);
                stv[i].appendChild(ig[i]);
            } else {
                cell2.innerHTML = sel[i];
            }
         } 
            document.getElementById("panel_atr").style.display = "block";
        }
        catch(err){
            alert("No se encontro información geografica asociada a la consulta");
        }
}



function BuscarSitio()
{
    var sitio = document.getElementById("address1").value;
    sitio = "Colombia, Risaralda, "+ mun +", "+ sitio;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': sitio}, function (results, status) {
        if (status === 'OK') {
   
            var resultado=results[0].geometry.viewport;
            var keys = Object.keys(resultado);
            var lont1 = resultado[keys[0]].j;
            var lont2 = resultado[keys[0]].h;
            var lont = (lont2 + lont1) / 2;
            var lat1 = resultado[keys[1]].j;
            var lat2 = resultado[keys[1]].h;
            var lat = (lat2 + lat1) / 2;

            map.getView().setCenter(ol.proj.transform([lat, lont], 'EPSG:4326', 'EPSG:3857'));      
            map.getView().setZoom(18);
            var iconFeatures = [];
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([lat, lont], 'EPSG:4326', 'EPSG:3857')),
                name: '',
                rainfall: 500

            });

            highlight.setStyle(flagStyle);
            var markerSource = highlight.getSource();
            markerSource.clear();
            markerSource.addFeature(iconFeature);

        } else {
            alert("Sitio no encontrado");
        }
    });
}


function addressSelectPropietarios(event, ui) {
    var nombre = select_query("select * from catastro.r1 where nombre ilike '"+ui.item.nombre+"'");
    //console.log(nombre);
    //var nombre = select_query("select * from catastro.u_terreno_registros where nombre ilike '"+ui.item.nombre+"'");
    if(nombre.length>1){
        var select = [];
        var sel = [];
        var tabledinamic = document.getElementById("table-dynamic");
        tabledinamic.innerHTML = "";
        var table = document.getElementById("tblatt");
        table.innerHTML = "";  
        var select = [];
        var sel = [];
        var imag = [];
        var stv = [];
        var ig = [];
        for (i = 0; i < nombre.length; i++) {
            //console.log(direccion);
              var tablaph = ("<table border=1 id='tablaph'>");
              for (i = 0; i < nombre.length; i++) {
                  //var req = {term: direccion[i], val:123};
                  dirg = nombre[i][4];
                  tablaph += ("<tr>");
                  tablaph += ("<td id=tt" + i + ">" + nombre[i][6] + "</td>");
                  tablaph += ("</tr>");
              }
              tablaph += ("</table>");
          }
          select[0] = "<b>Número de Predios</b>";
          select[1] = "<b>Direcciones</b>";    
          sel[0] = nombre.length;
          sel[1] = tablaph;
          
          for (i = 0; i < select.length; i++) {
              row = table.insertRow(i);
              cell1 = row.insertCell(0);
              cell2 = row.insertCell(1);
              cell1.innerHTML = select[i];
              cell2.innerHTML = sel[i];
          }
          for (i = 0; i < nombre.length; i++) {
              var ell = document.getElementById("tt" + i);
              var alg = "mostrardatosmult('tt" + i + "')";
            //  console.log(alg);
              ell.setAttribute("onclick", alg);
              ell.value = nombre[i][4];
              //ell.onclick = function() {addressSource(direccion[i]);};
          }
          document.getElementById("panel_atr").style.display = "block";
    }

    else{
    try{
    var view = map.getView();
    var codph = ui.item.cod.slice(21, 22);
    if(codph == '9' || codph == '8'){
        var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 26) + '0000';
        var tipoaval = "Predio en propiedad horizontal o condominio";
    }
    else if(codph == '5'){
        var codigoterreno = ui.item.cod.slice(0, 9) + '0000' + ui.item.cod.slice(13, 21) + '000000000';
        var tipoaval = "Mejora (Construcción en predio ajeno)";
    }
    else{
        var codigoterreno = ui.item.cod;
        var tipoaval = "No PH";
    }
    var datosr1 = select_query("select * from catastro.r1 where codigo = '"+ui.item.cod+"'");
    var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
    var geojsonprueba = JSON.parse(geome[0]); 
    var coord = geojsonprueba.coordinates[0][0];
    var feat = new ol.Feature({
        geometry: new ol.geom.Polygon([coord])
    });
    feat.getGeometry().transform('EPSG:4326','EPSG:3857');
    var geom = feat.getGeometry();
    highlightfeatures.setStyle(PredioStyle);
        var markerSourcenoph = highlightfeatures.getSource();
        markerSourcenoph.clear();
        markerSourcenoph.addFeature(feat); 
        ppExtent = geom.getExtent();
        ppExtent[0] = ppExtent[0] - 40;
        ppExtent[2] = ppExtent[2] + 40;
        ppExtent[1] = ppExtent[1] - 40;
        ppExtent[3] = ppExtent[3] + 40;

        var featureCenter = ol.extent.getCenter(ppExtent);
        view.setCenter(featureCenter);
        view.fitExtent(ppExtent, map.getSize());

        try{
            if(datosr1.length <= 1){
            var propietario = datosr1[0][3];
            var documento = datosr1[0][5];
            }
            else if(datosr1.length > 1){
                var propietarios = []; 
                for (i = 0; i < datosr1.length; i++) {                   
                    propietarios.push({              
                        prop: datosr1[i][3],
                        doc: datosr1[i][5]
                    });
                }
                var propietario = propietarios.map(function(item) {
                    return item.prop;
                }).join(", ");
                var documento = propietarios.map(function(item) {
                    return item.doc;
                }).join(", ");
            }
        }
        
        catch(err){
            var propietario = "Sin información";
            var documento = "Sin información";
        }
        
        try{
            var direccion = datosr1[0][4];
            var areat = parseInt(datosr1[0][8]);
            var areac = parseInt(datosr1[0][9]);
            var avaluo = datosr1[0][10];
            var destino = datosr1[0][7];
            var matricula = datosr1[0][11];
        }
        catch(err){
            var direccion = "Sin Información";
            var areat = "Sin Información";
            var areac = "Sin Información";
            var avaluo = "Sin Información";
            var destino = "Sin Información";
            var matricula = "Sin Información";
        }   
        try{
           var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
           //console.log(codigo_ant);
           if(codigo_ant == null){
            var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
           }
        }
        catch(err){
            var codigo_ant = "sin información";
        }
        //console.log(codigo_ant);
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
        select[1] = "<b>Código: </b>";
        select[2] = "<b>Código Anterior: </b>";
        select[3] = "<b>Propietario/s: </b>";
        select[4] = "<b>Documento/s: </b>";
        select[5] = "<b>Área de Terreno: </b>";
        select[6] = "<b>Área Construida: </b>";
        select[7] = "<b>Avalúo: </b>"; 
        select[8] = "<b>Destino Económico: </b>"; 
        select[9] = "<b>Matricula inmobiliaria: </b>";
        select[10] = "<b>Tipo de avalúo: </b>";
        select[11] = "<b>Fotografía del predio: </b>";
        sel[0] = ui.item.direccion;
        sel[1] = ui.item.cod;
        sel[2] = codigo_ant;
        sel[3] = propietario;
        sel[4] = documento;
        sel[5] = areat + " m2";
        sel[6] = areac + " m2";
        sel[7] = "$" + formatNumber(avaluo); 
        sel[8] = destino;
        sel[9] = matricula;
        sel[10]  = tipoaval;
        stv[11] = document.createElement("a");
        stv[11].setAttribute("onclick", "open_fichasel("+datosr1[0][0]+")");
        ig[11] = document.createElement("img");
        ig[11].style = "cursor:pointer";
        ig[11].src = "./imagenes/carta.png";

        for (i = 0; i < select.length; i++) {
            row = table.insertRow(i);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell1.innerHTML = select[i];
            if (i == 11) {
                cell2.appendChild(stv[i]);
                stv[i].appendChild(ig[i]);
            } else {
                cell2.innerHTML = sel[i];
            }
         } 
            document.getElementById("panel_atr").style.display = "block";
        }
        catch(err){
            alert("No se encontro información geografica asociada a la consulta, es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro");
            //console.log(datosr1);
            try{
                var direccion = datosr1[0][6];
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                var areat = parseInt(datosr1[0][8]);
                var areac = parseInt(datosr1[0][9]);
                var avaluo = datosr1[0][10];
                var destino = datosr1[0][7];
                var matricula = datosr1[0][11];
            }
            catch(err){
                var direccion = "Sin información";
                var areat = "Sin información";
                var areac = "Sin información";
                var avaluo = "Sin información";
                var destino = "Sin información";
                var matricula = "Sin información";
                var propietario = "Sin información";
                var documento = "Sin información";
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
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Propietario/s: </b>";
            select[3] = "<b>Documento/s: </b>";
            select[4] = "<b>Área de Terreno: </b>";
            select[5] = "<b>Área Construida: </b>";
            select[6] = "<b>Avalúo: </b>"; 
            select[7] = "<b>Destino Económico: </b>"; 
            select[8] = "<b>Matricula inmobiliaria: </b>";
            select[9] = "<b>Tipo de avalúo: </b>";        
            sel[0] = direccion;
            sel[1] = ui.item.cod;
            sel[2] = propietario;
            sel[3] = documento;
            sel[4] = areat + " m2";
            sel[5] = areac + " m2";
            sel[6] = "$" + formatNumber(avaluo); 
            sel[7] = destino;
            sel[8] = matricula;
            sel[9] = tipoaval;                                 
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                cell2.innerHTML = sel[i];
             }
                document.getElementById("panel_atr").style.display = "block";
                vistainicial();


            }}


        
    
}


function mostrardatosmult(dire){
    dire = "'" + dire + "'";
    //console.log(dire);
    var dirr = document.getElementById(eval(dire)).innerHTML;
    //console.log(dirr);         
    try{
        var view = map.getView();
        var datosr1 = select_query("select * from catastro.r1 where direccion ilike '"+dirr+"'");
        console.log(datosr1);
        var codigo = datosr1[0][1];
        var codph = codigo.slice(21, 22);
        if(codph == '9' || codph == '8'){
            var codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 26) + '0000';
            var tipoaval = "Predio en propiedad horizontal o condominio";
        }
        else if(codph == '5'){
            var codigoterreno = codigo.slice(0, 9) + '0000' + codigo.slice(13, 21) + '000000000';
            var tipoaval = "Mejora (Construcción en predio ajeno)";
        }
        else{
            var codigoterreno = codigo;
            var tipoaval = "No PH";
        }
        var datosr1 = select_query("select * from catastro.r1 where codigo = '"+codigo+"'");
        var geome = select_query("select ST_AsGeoJSON(geom) from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");

        var geojsonprueba = JSON.parse(geome[0]); 
        var coord = geojsonprueba.coordinates[0][0];
        var feat = new ol.Feature({
            geometry: new ol.geom.Polygon([coord])
        });
        feat.getGeometry().transform('EPSG:4326','EPSG:3857');
        var geom = feat.getGeometry();
        highlightfeatures.setStyle(PredioStyle);
            var markerSourcenoph = highlightfeatures.getSource();
            markerSourcenoph.clear();
            markerSourcenoph.addFeature(feat); 
            ppExtent = geom.getExtent();
            ppExtent[0] = ppExtent[0] - 40;
            ppExtent[2] = ppExtent[2] + 40;
            ppExtent[1] = ppExtent[1] - 40;
            ppExtent[3] = ppExtent[3] + 40;
    
            var featureCenter = ol.extent.getCenter(ppExtent);
            view.setCenter(featureCenter);
            view.fitExtent(ppExtent, map.getSize());
    
            try{
                if(datosr1.length <= 1){
                var propietario = datosr1[0][3];
                var documento = datosr1[0][5];
                }
                else if(datosr1.length > 1){
                    var propietarios = []; 
                    for (i = 0; i < datosr1.length; i++) {                   
                        propietarios.push({              
                            prop: datosr1[i][3],
                            doc: datosr1[i][5]
                        });
                    }
                    var propietario = propietarios.map(function(item) {
                        return item.prop;
                    }).join(", ");
                    var documento = propietarios.map(function(item) {
                        return item.doc;
                    }).join(", ");
                }
            }
            
            catch(err){
                var propietario = "Sin información";
                var documento = "Sin información";
            }
            
            try{
                var direccion = datosr1[0][4];
                var areat = parseInt(datosr1[0][8]);
                var areac = parseInt(datosr1[0][9]);
                var avaluo = datosr1[0][10];
                var destino = datosr1[0][7];
                var matricula = datosr1[0][11];
            }
            catch(err){
                var direccion = "Sin Información";
                var areat = "Sin Información";
                var areac = "Sin Información";
                var avaluo = "Sin Información";
                var destino = "Sin Información";
                var matricula = "Sin Información";
            }   
            try{
               var codigo_ant = select_query("select codigo_ant from catastro.u_terreno_registros where codigo = '"+codigoterreno+"'");
               //console.log(codigo_ant);
               if(codigo_ant == null){
                var codigo_ant = select_query("select codigo_ant from catastro.r_terreno_registros where codigo = '"+codigoterreno+"'");
               }
            }
            catch(err){
                var codigo_ant = "sin información";
            }
            //console.log(codigo_ant);
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
            select[1] = "<b>Código: </b>";
            select[2] = "<b>Código Anterior: </b>";
            select[3] = "<b>Propietario/s: </b>";
            select[4] = "<b>Documento/s: </b>";
            select[5] = "<b>Área de Terreno: </b>";
            select[6] = "<b>Área Construida: </b>";
            select[7] = "<b>Avalúo: </b>"; 
            select[8] = "<b>Destino Económico: </b>"; 
            select[9] = "<b>Matricula inmobiliaria: </b>";
            select[10] = "<b>Tipo de avalúo: </b>";
            select[11] = "<b>Fotografía del predio: </b>";
            sel[0] = datosr1[0][6];
            sel[1] = codigoterreno;
            sel[2] = codigo_ant;
            sel[3] = propietario;
            sel[4] = documento;
            sel[5] = areat + " m2";
            sel[6] = areac + " m2";
            sel[7] = "$" + formatNumber(avaluo); 
            sel[8] = destino;
            sel[9] = matricula;
            sel[10]  = tipoaval;
            stv[11] = document.createElement("a");
            stv[11].setAttribute("onclick", "open_fichasel("+datosr1[0][0]+")");
            ig[11] = document.createElement("img");
            ig[11].style = "cursor:pointer";
            ig[11].src = "./imagenes/carta.png";
    
            for (i = 0; i < select.length; i++) {
                row = table.insertRow(i);
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell1.innerHTML = select[i];
                if (i == 11) {
                    cell2.appendChild(stv[i]);
                    stv[i].appendChild(ig[i]);
                } else {
                    cell2.innerHTML = sel[i];
                }
             } 
                document.getElementById("panel_atr").style.display = "block";
            }
            catch(err){
                alert("No se encontro información geografica asociada a la consulta, es posible que se trate de un predio en Omisión, a continuación se muestran los datos de la tabla de registro");
                //console.log(datosr1);
                try{
                    var direccion = datosr1[0][6];
                    var propietario = datosr1[0][3];
                    var documento = datosr1[0][5];
                    var areat = parseInt(datosr1[0][8]);
                    var areac = parseInt(datosr1[0][9]);
                    var avaluo = datosr1[0][10];
                    var destino = datosr1[0][7];
                    var matricula = datosr1[0][11];
                }
                catch(err){
                    var direccion = "Sin información";
                    var areat = "Sin información";
                    var areac = "Sin información";
                    var avaluo = "Sin información";
                    var destino = "Sin información";
                    var matricula = "Sin información";
                    var propietario = "Sin información";
                    var documento = "Sin información";
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
                select[1] = "<b>Código: </b>";
                select[2] = "<b>Propietario/s: </b>";
                select[3] = "<b>Documento/s: </b>";
                select[4] = "<b>Área de Terreno: </b>";
                select[5] = "<b>Área Construida: </b>";
                select[6] = "<b>Avalúo: </b>"; 
                select[7] = "<b>Destino Económico: </b>"; 
                select[8] = "<b>Matricula inmobiliaria: </b>";
                select[9] = "<b>Tipo de avalúo: </b>";        
                sel[0] = direccion;
                sel[1] = codigoterreno;
                sel[2] = propietario;
                sel[3] = documento;
                sel[4] = areat + " m2";
                sel[5] = areac + " m2";
                sel[6] = "$" + formatNumber(avaluo); 
                sel[7] = destino;
                sel[8] = matricula;
                sel[9] = tipoaval;                                 
                for (i = 0; i < select.length; i++) {
                    row = table.insertRow(i);
                    cell1 = row.insertCell(0);
                    cell2 = row.insertCell(1);
                    cell1.innerHTML = select[i];
                    cell2.innerHTML = sel[i];
                 }
                    document.getElementById("panel_atr").style.display = "block";
                    vistainicial();
    
    
                }                                                            
}


function BuscarDirAprox()
{
    var sitio = document.getElementById("ubicardir").value;
    sitio = "Colombia, Pereira, " + sitio;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': sitio}, function (results, status) {
        if (status === 'OK') {
            //console.log(results[0].geometry.viewport);
            //Se cambian los paramentros Za y Ua , en abril Za cambio por Ya
            var coordenadas = results[0].geometry.location;
            var lont1 = results[0].geometry.viewport.Ya.i;
            var lont2 = results[0].geometry.viewport.Ya.j;
            var lont = (lont2 + lont1) / 2;
            var lat1 = results[0].geometry.viewport.Ua.i;
            var lat2 = results[0].geometry.viewport.Ua.j;
          /*  var lont1 = results[0].geometry.viewport.Za.i;
            var lont2 = results[0].geometry.viewport.Za.j; */
            var lont = (lont2 + lont1) / 2;
            var lat1 = results[0].geometry.viewport.Ua.i;
            var lat2 = results[0].geometry.viewport.Ua.j;
            var lat = (lat2 + lat1) / 2;
            /*var coordenadas = results[0].geometry.location;
            var lont1 = results[0].geometry.viewport.Ya.g;
            var lont2 = results[0].geometry.viewport.Ya.i;
            var lont = (lont2 + lont1) / 2;
            var lat1 = results[0].geometry.viewport.Ta.g;
            var lat2 = results[0].geometry.viewport.Ta.i;
            var lat = (lat2 + lat1) / 2;*/
           
            //console.log(ol.proj.transform([lat, lont], 'EPSG:4326', 'EPSG:3857'));
            map.getView().setCenter(ol.proj.transform([lat, lont], 'EPSG:4326', 'EPSG:3857'));
           
         
            map.getView().setZoom(18);
            var iconFeatures = [];
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([lat, lont], 'EPSG:4326', 'EPSG:3857')),
                name: '',
                rainfall: 500

            });

            highlight.setStyle(flagStyle);
            var markerSource = highlight.getSource();
            markerSource.clear();
            markerSource.addFeature(iconFeature);

        } else {
            alert("Tampoco se encontro esta dirección en el georeferenciador");
        }

    });
}






