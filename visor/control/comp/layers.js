


//var capasprcatastro = search("wfs:capasdinamicas", ""+mun+"_catastro");
//console.log(capasprcatastro);
//var capasprriesgo = search("wfs:capasdinamicas", ""+mun+"_riesgo");

/*if(mun == "marsella" || mun == "la_celia" || mun == "santa_rosa"){
  var capasprriesgo = search("wfs:capasdinamicas", ""+mun+"_cm_riesgo_5k");
  //console.log(capasprriesgo)
}*/
//console.log(capasprcatastro);
//console.log(capasprriesgo);
/*var capasd = [];
var capasr =[];
for (i=0; i<capasprcatastro.length; i++){
    capasd[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capasprcatastro[i][1],
            params: {LAYERS: capasprcatastro[i][3], STYLES: ''}
        }), name: capasprcatastro[i][3]
    });
}

for (i=0; i<capasprriesgo.length; i++){
    capasr[i] = new ol.layer.Tile({
        visible: false,
        source: new ol.source.TileWMS({
            url: capasprriesgo[i][1],
            params: {LAYERS: capasprriesgo[i][3], STYLES: ''}
        }), name: capasprriesgo[i][3]
    });
}*/

var openstreetmap = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        //minResolution: 2,
        //maxResolution:20,
        name: 'Open Street Map',
        crossOrigin: 'anonymous'
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
    visible: true,
    //opacity: 0,
    source: new ol.source.BingMaps({
        key: 'AmTXzzix65q59DqR4_iobPZa9sNRcXtL4gkAsH-uww3RYpVFHGGejnUQTJev9ixC',
        imagerySet: 'AerialWithLabelsOnDemand'
    }), name: 'Satelite con Etiquetas',
    crossOrigin: 'anonymous'
});

var ortofotobuenaventura = new ol.layer.Tile({
    visible: true,
    source: new ol.source.XYZ({
      //url: '../ortofotos/'+mun+'_ortofoto/{z}/{x}/{y}.png',
      url: 'http://webgis-buenaventura.com/ortofotobuenaventura/{z}/{x}/{y}.png',
   }), name: 'Ortofotografía'
});

var ortofotobuenaventura = new ol.layer.Tile({
    visible: true,
    source: new ol.source.XYZ({
      //url: '../ortofotos/'+mun+'_ortofoto/{z}/{x}/{y}.png',
      url: 'http://webgis-buenaventura.com/ortofotobuenaventura/{z}/{x}/{y}.png',
   }), name: 'Ortofotografía'
});

var ortofotobajocalima = new ol.layer.Tile({
    visible: true,
    source: new ol.source.XYZ({
      //url: '../ortofotos/'+mun+'_ortofoto/{z}/{x}/{y}.png',
      url: 'http://webgis-buenaventura.com/ortofoto_bajo_cauca/{z}/{x}/{y}.png',
   }), name: 'Ortofotografía Bajo Cauca'
});

//console.log(capasd[4]);
/*var layerpuebloricocatastro = new ol.layer.Group({
    layers: capasd,
    name: 'PUEBLO RICO CATASTRO'
});

var layerpuebloricoriesgo = new ol.layer.Group({
    layers: capasr,
    name: 'PUEBLO RICO GESTIÓN DEL RIESGO'
});*/

var layerBasecatastro = new ol.layer.Group({
    layers: [bingsatelite, ortofotobajocalima, binglabels],
    name: ''
});

var layerBaseriesgo = new ol.layer.Group({
    layers: [ortofotobuenaventura, bingsatelite],
    name: ''
});

