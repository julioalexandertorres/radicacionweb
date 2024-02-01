/*var users = window.location.search.substring(1);
var vuser = users.split("=");
var vusers = vuser[1];
console.log(vusers);*/
/*if (vusers == 'Planeacion' || vusers == 'PlaneacionS' || vusers == 'Valorizacion'){
    //document.getElementById('ubiczone').style.display = 'block';
    document.getElementById('ubiczone').style.display = 'none';
}
else {
    document.getElementById('ubiczone').style.display = 'none';
}
*/


function abrir_manual() {
    window.open('../../documentos/manual_pot.pdf', '_blank');
}

function cerrariframe() {
    //location.reload(true);
    //window.open('../../ideep.html','self');
    //console.log("listo");
    location.href = '../../ideep.html','self';
}

function prenderpredios() {  
    if(document.getElementById("someSwitchOptionSuccess").checked){
        predio.setVisible(true);
        }
    else{
        predio.setVisible(false);
    }    
} 
function prenderconstrucciones() {  
    if(document.getElementById("someSwitchOptionSuccess1").checked){
        construcciones_rest.setVisible(true);
        }
    else{
        construcciones_rest.setVisible(false);
    }    
} 
function prenderpoligonos() {  
    if(document.getElementById("someSwitchOptionSuccess2").checked){
        poligonos.setVisible(true);
        }
    else{
        poligonos.setVisible(false);
    }    
} 
function zoom(zona) {
    if (zona == "zona1"){
    map.getView().fitExtent([-8075707.205757, 882120.256758, -8074403.186193, 882816.898557], map.getSize());
    }
    else if (zona == "zona2"){
        map.getView().fitExtent([-8076520.630700, 883423.355121, -8075496.964063, 883975.114057], map.getSize());         
    }  
    else if (zona == "zona3"){             
        map.getView().fitExtent([-8074531.753168, 884330.653164, -8074275.836509, 884468.592898], map.getSize()); 
    }
    else if (zona == "zona4"){          
        map.getView().fitExtent([-8069020.218109, 882988.726999, -8068764.301450, 883126.666732], map.getSize());   
    }         
}  

function orientationMap(){
    ctrl.set('orientation',$("#ori").prop('checked')?'vertical':'horizontal')
    $("#titulo2").hasClass('titulo2')
    ?$("#titulo2").removeClass('titulo2').addClass('titulo2Horizontal')
    :$("#titulo2").removeClass('titulo2Horizontal').addClass('titulo2');

    $("#layertreem1").hasClass('herramientasm1')
    ?$("#layertreem1").removeClass('herramientasm1').addClass('herramientasm1Horizontal')
    :$("#layertreem1").removeClass('herramientasm1Horizontal').addClass('herramientasm1');
}


map.getLayerGroup().set('name', 'CAPAS');

// INITIALIZE LAYERS
var layerONOFFtree=(layer)=>{
    var name=layer.get('name');
    var idNombreLayer=name.split(" ").join("");
    var div="";
    if(layer.values_.visible == true){
        //console.log(idNombreLayer);
        // capas activas
        div = "<li data-layerid='" + name + "'id='"+name+"' style='display: none;'>" 
        + "<span style='color:black'> "
        +"<i "+ "id='sp"+idNombreLayer+"' class='glyphicon glyphicon-check'></i> " 
        + name
        + "</span>" 
        + "<br><br><div class='row'>"
        +"<div class='col-md-8 col-xs-8'><input style='width:100%; margin-top:5px' class='opacity' type='range' min='0' max='1' step='0.1' value='1'></div>"
        +"</div><br><br>"
        + "</li>";
    }else{
        // capas inactivas
        //console.log(name);
        div = "<li data-layerid='" + name + "'id='"+name+"' style='display: none;'>" 
        + "<span style='color:black'> "
        +"<i "+ "id='sp"+idNombreLayer+"' class='glyphicon glyphicon-unchecked'></i> " 
        + name
        + "</span>" 
        + "<br><br><div class='row'>"
        +"<div class='col-md-8 col-xs-8'><input style='width:100%; margin-top:5px' class='opacity' type='range' min='0' max='1' step='0.1' value='1'></div>"
        +"</div><br><br>"
        + "</li>";
    }
    return div
}

// CREATE CONTROL LAYERS
function buildLayerTree(yearlayertree) {
    //console.log(yearlayertree);
    var elem;
    var div ="";
 
    // console.log(yearlayertree);
    // TITLE CAPAS
    div = "<li data-layerid='Capas '"+yearlayertree+"'>" + "<span style='color:black;font-weight:bold'>" + '<button type="button" class="btn btn-light" style="font-weight:bold">Capas '+yearlayertree  +'</button>'+ "</span><ul>";
    elem = div;

    // TITLE POT
    div = "<li data-layerid='Capas " + yearlayertree + "'id='POT"+yearlayertree+"' style='display: none;'>" + "<span><a>+</a> <i class='fas fa-clone' style='color:#343A40;' onclick='viewlegend()'></i>  Capas " + yearlayertree + "</span><ul>";
    elem += div;
    // 'POT '
    window['layerBase'+yearlayertree].getLayers().forEach(function (layer, i) {
        elem += layerONOFFtree(layer);
    });
    elem+="</ul></li>";

  /*  if(yearlayertree=='2011'){
        // TITLE HALLAZGOS
        div = "<li data-layerid='HALLAZGOS" + yearlayertree + "'id='HALLAZGOS"+yearlayertree+"' style='display: none;'>" + "<span><a>+</a> <i class='fas fa-clone' style='color:#009fda;' onclick='viewlegend()'></i>  HALLAZGOS 2018 </span><ul>";
        elem += div;
        // 'HALLAZGOS'
        layerpuebloricoriesgo.getLayers().forEach(function (layer, i) {
            elem += layerONOFFtree(layer);
        });
        elem+="</ul></li>";
    }*/



    // CAPAS BASE 
    div = "<li data-layerid='CAPASBASE" + yearlayertree + "'id='CAPASBASE"+yearlayertree+"' style='display: none;'>" + "<span><a>+</a> <i class='fas fa-clone' style='color:#343A40;' onclick='viewlegend()'></i>  Capas base " + yearlayertree + "</span><ul>";
    elem += div;

    // 'CAPAS BASE'
    window['layerBase'+yearlayertree].getLayers().forEach(function (layer, i) {
        elem += layerONOFFtree(layer);
    });
    elem+="</ul></li>";

    elem+="</ul></li>";

    return elem;
}


/**
 * Initialize the tree from the map layers
 * @returns {undefined}
 */
function initializeTree(layertree,yearlayertree) {
    var elem = buildLayerTree(yearlayertree);
    $('#'+layertree).empty().append(elem);
    $('#'+layertree+'.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Colapsar el grupo de capas');
    $('#'+layertree+'.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            if($(this)[0].innerText!='-CAPAS' && $(this)[0].innerText!='-CAPAS'){
                $(this).attr('title', 'Expandir el grupo de capas').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
                this.firstChild.innerHTML = '+Capas '; 
            }else{
                $(this).attr('title', 'Expandir el grupo de capas').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
                this.firstChild.innerHTML = '+Capas '+yearlayertree;
            }

        } else {
            children.show('fast');
            if($(this)[0].innerText!='+Capas ' && $(this)[0].innerText!='+Capas '&& $(this)[0].innerText!='Capas '&& $(this)[0].innerText!='Capas '){
                $(this).attr('title', 'Contraer el grupo de capas').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
                this.firstChild.innerHTML = '-Capas ';
            }else{
                $(this).attr('title', 'Contraer el grupo de capas').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
                this.firstChild.innerHTML = '-Capas '+yearlayertree;
            }
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

$(document).on('ready',function () {
    initializeTree('layertreem1','catastro');
    initializeTree('layertreem2','riesgo');
    //Handle opacity slider control
    $('input.opacity').change('slide', function (ev) {
        var layername = $(this).closest('li').data('layerid');
        var layer = findBy(map.getLayerGroup(), 'name', layername);
        layer.setOpacity(Number(ev.target.value));
    });
    //Handle visibility control
    $('i').on('click', function () {
        var layername = $(this).closest('li').data('layerid');   //prender y apagar layer       
        var groupLayer=$(this).parents('li').eq(1).data('layerid');

        //  remove layers and add just one
        if(groupLayer=='catastro'){
            console.log(groupLayer);
            layerBasecatastro.getLayers().forEach(function (layer, i) {
                var layerNombre=layer.get('name');
                var idNombreLayer=layerNombre.split(" ").join("");
                if(layerNombre!=layername){
                    layer.setVisible(false);
                    $('#sp'+idNombreLayer).removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                };
            });

         }else if(groupLayer=='riesgo'){
            console.log(groupLayer);
            layerBaseriesgo.getLayers().forEach(function (layer, i) {
                var layerNombre=layer.get('name');
                var idNombreLayer=layerNombre.split(" ").join("");
                if(layerNombre!=layername){
                    layer.setVisible(false);
                    $('#sp'+idNombreLayer).removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                }
            });;
         }

        try {
            var layer = findBy(map.getLayerGroup(), 'name', layername);
            layer.setVisible(!layer.getVisible());
            var visibleLayer=layer.getVisible();

            if(groupLayer=='catastro' || groupLayer=='riesgo'){
                // console.log(layername,layer,visibleLayer,groupLayer);
                //   LEYENDA
                viewlegend(layername,groupLayer,visibleLayer);
                //   DESCARGA LAYERS
                downloadlayer(layername,groupLayer,visibleLayer);
            }

            if (visibleLayer) {
                $(this).removeClass('glyphicon-unchecked').addClass('glyphicon-check');
            } else {
                $(this).removeClass('glyphicon-check').addClass('glyphicon-unchecked');
            }
        } catch (error) {
            console.log(error);
        }
   
    });
});

function viewlegend(datosc,groupLayer,status){  
    var layer = findBy(map.getLayerGroup(), 'name', datosc);

    var tableTitle = document.getElementById('title'+groupLayer);
    var tableCell = document.getElementById(groupLayer+'legend');

    if(layer && status==true){
        tableTitle.style.display='table-cell';
        tableCell.style.display='table-cell';
        var ruta = layer.values_.source.params_.LAYERS;  
        var legend = 'http://35.194.38.28:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER='+ ruta;
        tableCell.innerHTML = "<img src='"+legend+"'>";

    }else{
        tableTitle.style.display='none';
        tableCell.style.display='none';
        tableCell.innerHTML ='';
    }
                                   
}


function downloadlayer(datosc,groupLayer,status){
    document.getElementById("inputinvisible").style.display='none';
    var layer = findBy(map.getLayerGroup(), 'name', datosc);
    var ruta = layer.values_.source.params_.LAYERS; 

    var table = document.getElementById('descarga'+groupLayer);
    table.innerHTML = "";

    if(layer && status==true){
        table.style.display='table-cell';

        var rutalayer = JSON.stringify(ruta);

        var selection =`
        <div class="btn-group centerGroup" role="group" aria-label="Descarga" >
            <button type="button" class="btn btn-secondary btn-desc" onclick='descargarcapas(${rutalayer},"shape")'>Shape</button>
            <button type="button" class="btn btn-secondary btn-desc" onclick='descargarcapas(${rutalayer},"kml")'>KML</button>
            <button type="button" class="btn btn-secondary btn-desc" onclick='descargarcapas(${rutalayer},"csv")'>CSV</button>
        </div>
        <div class="btn-group centerGroup" role="group" aria-label="Descarga" >
            <button type="button" class="btn btn-secondary btn-desc" onclick='descargarcapas(${rutalayer},"geojson")'>GeoJSON</button>
            <button type="button" class="btn btn-secondary btn-desc" onclick='copiarwms(${rutalayer})'>WMS</button> 
        </div>
        `;
 
        table.innerHTML = selection;

    }else{
        table.style.display='none';
    }    
}

