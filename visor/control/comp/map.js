var center = [-8571088, 432225];
var extent = [-8677326.952362, 359941.992245, -8504851.615769, 452508.319452];


var map = new ol.Map({
    controls: ol.control.defaults().extend([
        new ol.control.ZoomToExtent({
            tipLabel:'Zoom',
            extent: extent
        }) /*,
          new ol.control.OverviewMap({
            className: 'ol-overviewmap',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM({
                        'url': 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
                    })
                })],
            collapseLabel: '\u00BB',
            label: '\u00AB',
            collapsed: true
        })   */                                    
    ]),         
    target: 'map',
    view: new ol.View
    ({	
        center: center,
        zoom: 16,
        maxZoom: 21, minZoom: 10
    }),
    layers: [layerBasecatastro, layerBaseriesgo]
});

// Control

var ctrl = new ol.control.Swipe();
map.addControl(ctrl);

 
ctrl.addLayer(bingsatelite,false);
ctrl.addLayer(binglabels,false);

/*for(i=0;i<capasd.length; i++){
    ctrl.addLayer(capasd[i],false); 
}

ctrl.addLayer(ortofotopueblorico,true); */
ctrl.addLayer(ortofotobuenaventura,true);

/*for(j=0;j<capasr.length; j++){
    ctrl.addLayer(capasr[j],true); 
}*/

