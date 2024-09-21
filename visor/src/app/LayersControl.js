function validacionusuarios() {   
    var ca = document.cookie.split('=');
      if (ca["0"] === "") {
          location.href = "../index.html?ig=error";
      } else {
          try {
              var select = search("wfs:ValidateUser", ca[0], ca[1]);
              //document.getElementById("carga").style.display = "none";
              //document.getElementById("nombre_usuario").innerHTML = select[0][0].split(" ", 1);
          } catch (err) {
          }
          return(select);
      }
  }

var revision = validacionusuarios();
//var mun = revision[0][7];

var highlightfeatures = new ol.layer.Vector({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#00FFFF',
            width: 3
        })
    }),
    source: new ol.source.Vector()
});


var capasprcatastro = select_query("select * from capas_ladm where layer = 'lc_catastro' order by id ASC");
var capasfuentessecundarias = select_query("select * from capas_ladm where layer = 'fuentes_secundarias' order by gid DESC");
var capasavaluos = select_query("select * from capas_ladm where layer = 'av_catastro' order by id ASC");
var capascartocatastral = select_query("select * from capas_ladm where layer = 'cc_catastro' order by id ASC");
var capasgestorcatastral = select_query("select * from capas_ladm where layer = 'gc_catastro' order by id ASC");
//console.log(capas166ivc1);

var capasd = [];
var capasa = [];
var capascc = [];
var capasgc = [];
var capasr =[];
var capasrcm = [];
var capasrcp = [];
var capasrcb5 = [];
var capasrcb25 = [];

for (i=0; i<capasprcatastro.length; i++){
    capasd[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capasprcatastro[i][1],
            params: {LAYERS: capasprcatastro[i][3], STYLES: ''}
        }), name: capasprcatastro[i][3]
    });
}

for (i=0; i<capasavaluos.length; i++){
    capasa[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capasavaluos[i][1],
            params: {LAYERS: capasavaluos[i][3], STYLES: ''}
        }), name: capasavaluos[i][3]
    });
}

for (i=0; i<capascartocatastral.length; i++){
    capascc[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capascartocatastral[i][1],
            params: {LAYERS: capascartocatastral[i][3], STYLES: ''}
        }), name: capascartocatastral[i][3]
    });
}

for (i=0; i<capasgestorcatastral.length; i++){
    capasgc[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capasgestorcatastral[i][1],
            params: {LAYERS: capasgestorcatastral[i][3], STYLES: ''}
        }), name: capasgestorcatastral[i][3]
    });
}

for (i=0; i<capasfuentessecundarias.length; i++){
    capasr[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capasfuentessecundarias[i][1],
            params: {LAYERS: capasfuentessecundarias[i][3], STYLES: ''}
        }), name: capasfuentessecundarias[i][3]
    });
}


var openstreetmap = new ol.layer.Tile({ 
    source: new ol.source.XYZ({ 
        url:'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        crossOrigin: 'anonymous'
    }),
    visible: false,
    name:'Streetmap',
    
});

var bingstreetmap = new ol.layer.Tile({
    // source: new ol.source.OSM(),
    source: new ol.source.BingMaps({
     key: 'AmTXzzix65q59DqR4_iobPZa9sNRcXtL4gkAsH-uww3RYpVFHGGejnUQTJev9ixC',
     imagerySet:'Road'}),
     visible: false,
     //minResolution: 2,
     //maxResolution:20,
     name: 'Bing Street Map'
 });

var bingsatelite = new ol.layer.Tile({
    visible: false,
    //opacity: 0,
    source: new ol.source.BingMaps({
        key: 'AmTXzzix65q59DqR4_iobPZa9sNRcXtL4gkAsH-uww3RYpVFHGGejnUQTJev9ixC',
        imagerySet: 'Aerial'
    }), name: 'Satelite'
});


var binglabels = new ol.layer.Tile({
    visible: false,
    //opacity: 0,
    source: new ol.source.BingMaps({
        key: 'AmTXzzix65q59DqR4_iobPZa9sNRcXtL4gkAsH-uww3RYpVFHGGejnUQTJev9ixC',
        imagerySet: 'AerialWithLabelsOnDemand'
    }), name: 'Satelite con Etiquetas',
    crossOrigin: 'anonymous'
});


var ortofotovalparaiso = new ol.layer.Tile({
     visible: false,
     source: new ol.source.TileWMS({
       url: 'https://www.geomonsas.xyz:8443/geoserver/ladm/wms',
       params: {LAYERS: 'ladm:ortofoto_valparaiso', STYLES: ''},
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    }), name: 'Ortofotografía Valparaiso'
});


//var munM = mun.toUpperCase();

//console.log(capasd[4]);
var layercatastro = new ol.layer.Group({
    layers: capasd,
    //name: munM+' CATASTRO'
    name: 'MODELO LEVANTAMIENTO CATASTRAL'
});

var layercatastroav = new ol.layer.Group({
    layers: capasa,
    //name: munM+' CATASTRO'
    name: 'MODELO AVALÚOS'
});

var layercatastrocc = new ol.layer.Group({
    layers: capascc,
    //name: munM+' CATASTRO'
    name: 'MODELO CARTOGRAFIA CATASTRAL'
});

var layercatastrogc = new ol.layer.Group({
    layers: capasgc,
    //name: munM+' CATASTRO'
    name: 'MODELO GESTOR CATASTRAL'
});


var layerfuentessecundarias = new ol.layer.Group({
    layers: capasr,
    //name: munM+' CATASTRO'
    name: 'FUENTES SECUNDARIAS'
});


var layerBase = new ol.layer.Group({
    //layers: [openstreetmap, bingstreetmap, bingsatelite, binglabels, ortofotopueblorico, highlightfeatures],
    layers: [openstreetmap, bingstreetmap, bingsatelite, binglabels, ortofotovalparaiso, highlightfeatures],
    name: 'CAPAS BASE'
});


function buildLayerTree(layer) {
    var elem;
    var name = layer.get('name') ? layer.get('name') : "Group";

    if (name != 'Group') {
        if (layer.values_.visible == true && layer.get('name') != 'CAPAS') {
           // if (name == 'Equipamiento' || name == 'Movilidad' || name == 'Servicios Públicos' || name == 'Usos, Tratamientos y Norma' || name=='Categorias del Suelo'|| name=='Componente General'|| name=='Componente Ambiental' || name=='ZFG Pereira'|| name=='ZFG Dosquebradas'|| name=='ZFG La Virginia') {
           //     var div = "<li data-layerid='" + name + "'id='"+name+"' style='display: none;'>" + "<span><a>+</a> <i style='color:#009fda;' onclick='viewlegend()'></i>  " + layer.get('name') + "</span>";
           // } else {
           //     var div = "<li data-layerid='" + name + "'id='"+name+"'>" + "<span><a style='font-size:16px'>+</a><i style='color:#009fda;' onclick='viewlegend()'></i>  " + layer.get('name') + "</span>"; 
          	 var div = "<li data-layerid='" + name + "'id='"+name+"' style='border-radius: 5px; margin: 6px; background-color:#f2f2f2; padding-top:10px; padding-bottom:0px;'>" + "<span style='cursor:pointer;'><a style='font-size:16px'>+</a><i style='color:#009fda;' onclick='viewlegend()'></i>  " + layer.get('name') + "</span><br><br>"; 
	   // }
        } else if (layer.get('name') == 'CAPAS') {
           // var div = "<li data-layerid='" + name + "'id='"+name+"'>" + "<span><img src='image/" + layer.get('name') + ".png' height='0' width='0' onclick='viewlegend()'>" /*+ layer.get('name') */ + "</span>";
            var div = "<div style='background-color:#FCB314; padding-top:12px; padding-bottom:12px; padding-left:35%; color:#FFFFFF; font-size:12px; font-weight: bold;'>CONTROL DE CAPAS</div><li data-layerid='" + name + "'id='"+name+"'>" + "<span><img src='image/" + layer.get('name') + ".png' height='0' width='0' onclick='viewlegend()'>" /*+ layer.get('name') */ + "</span>";
	 } else {
            var nombrelayer = JSON.stringify(name);
            var idNombreLayer=name.split(" ").join("");

            var div = "<li data-layerid='" + name + "'id='"+name+"' style='display: none;'>" 
            + "<span > "
            +"<i "+ "id='sp"+idNombreLayer+"' class='fa fa-square-o fa-lg' style='color:#FD6535'></i> " 
            + layer.get('name') 
            + "</span>" 
            + "<div class='row'>"
            +"<div class='col-md-7 col-xs-7'><input id='barratransparencia' type='range' margin-top:0px;' class='opacity' min='0' max='1' step='0.1' value='1'></div></div>"
            +"<div class='row'><div class='col-md-1 col-xs-1'><button onclick='datoscapas(" + nombrelayer + ")' style='background-color: Transparent; background-repeat:no-repeat; border: none; cursor:pointer;  overflow: hidden;  outline:none;'><a class='fa fa-cloud-download fa-lg buttonDisable' id='" + idNombreLayer + "dc' style='color:#FD6535'></a></button></div>" 
            +"<div class='col-md-1 col-xs-1'><button onclick='infocapas(" + nombrelayer + ")' style='background-color: Transparent; background-repeat:no-repeat; border: none; cursor:pointer;  overflow: hidden;  outline:none;'><a class='fa fa-info-circle fa-lg buttonDisable' id='" + idNombreLayer + "ic' style='color:#FD6535'></a></button></div>" 
            +"<div class='col-md-1 col-xs-1'><button onclick='viewlegend(" + nombrelayer + ")' style='background-color: Transparent; background-repeat:no-repeat; border: none; cursor:pointer;  overflow: hidden;  outline:none;'><a class='fa fa-image fa-lg buttonDisable' id='" + idNombreLayer + "vl' style='color:#FD6535'></a> </button> </div>" 
            +"</div></div><br>";

        }
        
        if (layer.getLayers) {
            var sublayersElem = '';
            var layers = layer.getLayers().getArray(),
                    len = layers.length;
            //aca escondidos 5 layers temporales (geojson)
            //console.log(layers);
            for (var i = len - 1; i >= 0; i--) {
                if(buildLayerTree(layers[i])){
                sublayersElem += buildLayerTree(layers[i]);
               }
            }
            elem = div + " <ul style='color:#FD6535'>" + sublayersElem + "</ul></li>";
        } else {
            elem = div + " </li>";
        }
      //  console.log(layers);
        return elem;
    }
}


/**
 * Initialize the tree from the map layers
 * @returns {undefined}
 */
function initializeTree() {
    var elem = buildLayerTree(map.getLayerGroup());
    $('#layertree').empty().append(elem);
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
            this.firstChild.innerHTML = "<a class='fa fa-folder fa-lg' style='color:#FCB314;'></a>";
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
            this.firstChild.innerHTML = "<a class='fa fa-folder-open fa-lg' style='color:#FCB314;'></a>";
        }
        e.stopPropagation();
    });
}
/**
 * Finds recursively the layer with the specified key and value.
 * @param {ol.layer.Base} layer
 * @param {String} key
 * @param {any} value
 * @returns {ol.layer.Base}
 */
function findBy(layer, key, value) {
    if (layer.get(key) === value) {
        return layer;
    }
    // Find recursively if it is a group
    if (layer.getLayers) {
        var layers = layer.getLayers().getArray(),
                len = layers.length, result;
        for (var i = 0; i < len; i++) {
            result = findBy(layers[i], key, value);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
$(document).ready(function () {
    initializeTree();
    //Handle opacity slider control
    $('input.opacity').change('slide', function (ev) {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setOpacity(Number(ev.target.value));
        
        //ortofoto2017.setOpacity(Number(this.value))
    });
    //Handle visibility control
    $('i').on('click', function () {
        var layername = $(this).closest('li').data('layerid');   //prender y apagar layer       
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setVisible(!layer.getVisible());
        if (layer.getVisible()) {
            $(this).removeClass('fa fa-square-o').addClass('fa fa-check-square');
        } else {
            $(this).removeClass('fa fa-check-square').addClass('fa fa-square-o');
        }
    });

    //u_terreno.setVisible(true);
    capasd[0].setVisible(true);
    capasd[2].setVisible(true);
    //openstreetmap.setVisible(true);
    binglabels.setVisible(true);
});

var datoswmsc ="";

function infocapas(datosc) {
    datoswmsc=datosc;
    $('#modal-title').text('INFORMACIÓN DE LA CAPA');
    var layer = findBy(map.getLayerGroup(), 'name', datosc);
    var idNombreLayer=datosc.split(" ").join("");
    if (document.body.style.cursor !== "help") {
        $('#'+idNombreLayer+'ic').removeClass('buttonDisable').addClass('buttonActive');
        alert('Activó la consulta de información de la capa '+datosc);
        document.body.style.cursor = "help";
        layer.setVisible(true);
        $('#sp'+idNombreLayer).removeClass('fa fa-check-square').addClass('fa fa-check-square'); 
    } else {
        if($('#'+idNombreLayer+'ic').hasClass('buttonActive')){
            $('#'+idNombreLayer+'ic').removeClass('buttonActive').addClass('buttonDisable');
            document.body.style.cursor = "default";
            // layer.setVisible(false);
            document.getElementById("panel_atr").style.display = "none";
        }
    }
}

function viewlegend(datosc){
    $('#modal-title').text('LEYENDA DE LA CAPA');
    var layer = findBy(map.getLayerGroup(), 'name', datosc);
    var ruta = layer.values_.source.params_.LAYERS;
    if(datosc == 'Mapa01_Cambios_de_Uso1997'){
     var serv = 'https://www.geomonsas.xyz:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=234&HEIGHT=350&LAYER='+ ruta;
    }
    else{
     var serv = 'https://www.geomonsas.xyz:8443/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER='+ ruta;
    }
    var table = document.getElementById("tblattwms");
    table.innerHTML = "";
    document.getElementById("table-dynamic").innerHTML = "";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.colSpan = 2;
    cell1.innerHTML = "<H5 style='tex'><b>LEYENDA</b></H5>";
    var row = table.insertRow(1);
    var cell2 = row.insertCell(0);
    cell2.colSpan = 2;
    cell2.innerHTML = "<img src='"+serv+"'>";                                    
    document.getElementById("panel_infwms").style.display = "block";
    //document.getElementById("botonminimizar").style.display = "block";
}
