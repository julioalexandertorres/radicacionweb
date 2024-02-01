var formatWFS = new ol.format.WFS();
var formatGML = new ol.format.GML({
    featureNS: 'http://35.184.176.7:8081/geoserver/prueba',
    featureType: 'wfs_prueba_xml',
    srsName: 'EPSG:3857'
});       
var xs = new XMLSerializer();
var interaction;
var interactionSelectPointerMove = new ol.interaction.Select({
    condition: ol.events.condition.pointerMove
});
var interactionSelect = new ol.interaction.Select({
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FF2828'
        })
    })
});
/*var interactionSnap = new ol.interaction.Snap({
    source: layerWFS.getSource()
});  */ 
 
var dirty = {};
var transactWFS = function (mode, f) {  
    var node;
    switch (mode) {   
        case 'insert':
            var longitud = f.values_.geometry.flatCoordinates.length;
            var coordinates1 = [f.values_.geometry.flatCoordinates[0], f.values_.geometry.flatCoordinates[1]];
            var coordinates2 = [f.values_.geometry.flatCoordinates[2], f.values_.geometry.flatCoordinates[3]];
            var coordinates3 = [f.values_.geometry.flatCoordinates[4], f.values_.geometry.flatCoordinates[5]];
            var coordinates4 = [f.values_.geometry.flatCoordinates[6], f.values_.geometry.flatCoordinates[7]];
            var coordinates5 = [f.values_.geometry.flatCoordinates[8], f.values_.geometry.flatCoordinates[9]];
            var coordinates6 = [f.values_.geometry.flatCoordinates[10], f.values_.geometry.flatCoordinates[11]];
            var coordinates7 = [f.values_.geometry.flatCoordinates[12], f.values_.geometry.flatCoordinates[13]];
            var coordinates8 = [f.values_.geometry.flatCoordinates[14], f.values_.geometry.flatCoordinates[15]];
            var coordinates9 = [f.values_.geometry.flatCoordinates[16], f.values_.geometry.flatCoordinates[17]];
            var coordinates10 = [f.values_.geometry.flatCoordinates[18], f.values_.geometry.flatCoordinates[19]];
            var coordinates11 = [f.values_.geometry.flatCoordinates[20], f.values_.geometry.flatCoordinates[21]];
            var coordinates12 = [f.values_.geometry.flatCoordinates[22], f.values_.geometry.flatCoordinates[23]];
            var coordinates13 = [f.values_.geometry.flatCoordinates[24], f.values_.geometry.flatCoordinates[25]];
            var coordinates14 = [f.values_.geometry.flatCoordinates[26], f.values_.geometry.flatCoordinates[27]];
            if (longitud == 8){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4;}
            else if (longitud == 10){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5;}
            else if (longitud == 12){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6;}              
            else if (longitud == 14){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6 + " " + coordinates7;}
            else if (longitud == 16){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6 + " " + coordinates7 + " " + coordinates8;}
            else if (longitud == 18){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6 + " " + coordinates7 + " " + coordinates8 + " " + coordinates9;}
            else if (longitud == 20){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6 + " " + coordinates7 + " " + coordinates8 + " " + coordinates9 + " " + coordinates10;}
            else if (longitud == 22){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6 + " " + coordinates7 + " " + coordinates8 + " " + coordinates9 + " " + coordinates10 + " " + coordinates11;}
            else if (longitud == 24){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6 + " " + coordinates7 + " " + coordinates8 + " " + coordinates9 + " " + coordinates10 + " " + coordinates11 + " " + coordinates12;}
            else if (longitud == 26){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6 + " " + coordinates7 + " " + coordinates8 + " " + coordinates9 + " " + coordinates10 + " " + coordinates11 + " " + coordinates12 + " " + coordinates13;}
            else if (longitud == 28){var coordinates = coordinates1 + " " + coordinates2 + " " + coordinates3 + " " + coordinates4 + " " + coordinates5 + " " + coordinates6 + " " + coordinates7 + " " + coordinates8 + " " + coordinates9 + " " + coordinates10 + " " + coordinates11 + " " + coordinates12 + " " + coordinates13 + " " + coordinates14;}
            node = formatWFS.writeTransaction([f], null, null, formatGML);
              
          //  var payload = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:prueba="http://prueba" xmlns:gml="http://www.opengis.net/gml"><wfs:Insert><prueba:wfs_prueba_xml><prueba:geom><gml:MultiPolygon srsName="http://www.opengis.net/gml/srs/epsg.xml#3857"><gml:polygonMember><gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#3857"><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates decimal="." cs="," ts=" ">' + coordinates + '</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember></gml:MultiPolygon></prueba:geom></prueba:wfs_prueba_xml></wfs:Insert></wfs:Transaction>';
         
         
			var usob = document.cookie.split('=');
			var usob = usob[0];     
			
	//	 var payloadobs = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:prueba="http://prueba" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="prueba:wfs_prueba_xml"><wfs:Property><wfs:Name>usuario</wfs:Name><wfs:Value>' + usob + '</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsNull><ogc:PropertyName>usuario</ogc:PropertyName></ogc:PropertyIsNull></ogc:Filter></wfs:Update></wfs:Transaction>';
          
            
		 var payload = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:prueba="http://prueba" xmlns:gml="http://www.opengis.net/gml"><wfs:Insert><prueba:wfs_prueba_xml><prueba:geom><gml:MultiPolygon srsName="http://www.opengis.net/gml/srs/epsg.xml#3857"><gml:polygonMember><gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#3857"><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates decimal="." cs="," ts=" ">' + coordinates + '</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember></gml:MultiPolygon></prueba:geom></prueba:wfs_prueba_xml></wfs:Insert></wfs:Transaction>';
     		
     		
     	          
              
              
              
              
                var view = map.getView();
                var feat = f;
                var geom = feat.getGeometry();
                highlight.setStyle(BarrioStyle);
                var markerSource = highlight.getSource();
                markerSource.clear();
                markerSource.addFeature(feat);
                ppExtent = geom.getExtent();
                ppExtent[0] = ppExtent[0] - 200;
                ppExtent[2] = ppExtent[2] + 200;
                ppExtent[1] = ppExtent[1] - 200;
                ppExtent[3] = ppExtent[3] + 200;
                /*var featureCenter = ol.extent.getCenter(ppExtent);
                view.setCenter(featureCenter);
                view.fitExtent(ppExtent, map.getSize());*/
                
                
                
                var usob = document.cookie.split('=');
					 var usob = usob[0];
                var valor = "'" + usob + "'";
					 var filtro = '"usuario=' + valor + '"';
					 poligonosedicion.getSource().updateParams({'CQL_FILTER': eval(filtro)});   
            
            
         /*   if (conteo == 1){
            poligonosedicion.getSource().updateParams({CQL_FILTER:"1=1"});
                conteo = conteo + 1;
                }
            else if (conteo == 2){
              poligonosedicion.getSource().updateParams({CQL_FILTER:"2=2"});
                conteo = conteo + 1;
            }
            else if (conteo == 3){
              poligonosedicion.getSource().updateParams({CQL_FILTER:"3=3"});
                conteo = conteo + 1;
            }
            else if (conteo == 4){
              poligonosedicion.getSource().updateParams({CQL_FILTER:"4=4"});
                conteo = conteo + 1;
            }
            else if (conteo == 5){
              poligonosedicion.getSource().updateParams({CQL_FILTER:"5=5"});
                conteo = conteo + 1;
            }
            else if (conteo == 6){
              poligonosedicion.getSource().updateParams({CQL_FILTER:"6=6"});
                conteo = conteo + 1;
            }
            else if (conteo == 7){
              poligonosedicion.getSource().updateParams({CQL_FILTER:"7=7"});
                conteo = conteo + 1;
            }
            else if (conteo == 8){
              poligonosedicion.getSource().updateParams({CQL_FILTER:"8=8"});
                conteo = conteo + 1;
            }
            else if (conteo == 9){
              poligonosedicion.getSource().updateParams({CQL_FILTER:"9=9"});
                conteo = conteo + 1;
            }*/
                 
           predio.setVisible(true);
            
         
            break;
        case 'update':    
            //f.set('geom', f.getGeometry());
            //node = formatWFS.writeTransaction(null, [f], null, formatGML);
            //console.log(document.getElementById('btnEdit').addEventListener);
            map.on('singleclick', function (evt3) { 
            
                var url2 = 'http://35.184.176.7:8081/geoserver/ows?';
                var featurePrefix2 = 'prueba';
                var featureType2 = ['wfs_prueba_xml'];
                var featureNS2 = 'http://prueba';
                var srsName2 = 'EPSG:4326';
                var geometryName2 = 'geom';
                var geometryType2 = 'MultiPolygon';
                var fields2 = ['*'];
                var infoFormat2 = 'application/vnd.ogc.gml/3.1.1'; 
                var format2 = [];
                var wmsSource2 = [];
                format2[0] = new ol.format.GML({featureNS2: featureNS2, featureType2: featureType2[0]});
                wmsSource2[0] = new ol.source.TileWMS({
                             url: url2,
                             params: {
                            'LAYERS': featurePrefix2 + ':' + featureType2[0],
                            'TILED': true
                        },
                        serverType: 'geoserver'
                    });
                   var viewResolution = map.getView().getResolution();
                 var urlwfs2 = wmsSource2[0].getGetFeatureInfoUrl(
                    evt3.coordinate, viewResolution, map.getView().getProjection(),
                    {'INFO_FORMAT': infoFormat2}
                 );   
                $.ajax({
                    url: urlwfs2,
                    success: function (data) {
                            var features = format2[0].readFeatures(data);
                            var feature = features[0]; 
                            //console.log(feature.id_);
                            var values = feature.getProperties();
                            //var idwfs = values.id_borrar;
                            wfsupdate = feature.id_; 
                            document.getElementById("tblatt").style.visibility = "visible";
            document.getElementById("tblatt").style.display = "initial";
            document.getElementById("tblatt").style.height = "auto";
            document.getElementById("panel_atr").style.visibility = "visible";
            document.getElementById("panel_atr").style.display = "initial";
            document.getElementById("panel_atr").style.height = "auto";
            document.getElementById("contenedorg").style.display = "initial";
            document.getElementById("contenedorg").style.visibility = "visible";
            document.getElementById("contenedorg").style.height = "auto";
            //document.getElementById("pestanas").style.display = "none";
            
            var table = document.getElementById("tblatt");
            document.getElementById("cpestana1").style.display = "block";
            document.getElementById("cpestana2").style.display = "none";
            table.innerHTML = "";
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            cell1.colSpan = 2;
            cell1.innerHTML = "<H5><b>INFORMACION DEL POLIGONO</b></H5>";
            var row = table.insertRow(1);
            var cell2 = row.insertCell(0);
            cell2.colSpan = 2;
            cell2.style = "background-color: white; border:0; margin:0;";
            cell2.innerHTML = "<input type='text' id='observaciones' name='observaciones' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:6em;' placeholder='Diligencie cualquier tipo de información'>";
            
            var row = table.insertRow(2);
            var cell3 = row.insertCell(0);
            cell3.colSpan = 2;
            cell3.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
            cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
            
            var select = [];
            var sel = [];
            select[0] = "<b>OBSERVACIONES</b>";
            //select[1] = "<b>OBSERVACIONES</b>";
            sel[0] = values.observaciones;
            //sel[1] = "listo1";
             var campos = 2;
                for (i = 0; i < select.length; i++) {
                    row = table.insertRow(i + 1);
                    cell1 = row.insertCell(0);
                    cell2 = row.insertCell(1);
                    cell1.innerHTML = select[i];
                if (i === campos) {
                    cell2.appendChild(sel[i]);
                                } else {
                                    cell2.innerHTML = sel[i];
                                }
                    }
                   }
                });
            
                
    });

            
            break;
            
            
            
            
            
        case 'delete':
                             
          /* node = formatWFS.writeTransaction(null, null, [f], formatGML);
            var payload = xs.serializeToString(node);*/
           map.on('singleclick', function (evt2) { 
            var url1 = 'http://35.184.176.7:8081/geoserver/ows?';
            var featurePrefix1 = 'prueba';
            var featureType1 = ['wfs_prueba_xml'];
            var featureNS1 = 'http://prueba';
            var srsName1 = 'EPSG:4326';
            var geometryName1 = 'geom';
            var geometryType1 = 'MultiPolygon';
            var fields1 = ['*'];
            var infoFormat1 = 'application/vnd.ogc.gml/3.1.1'; 
            var format1 = [];
            var wmsSource1 = [];
            format1[0] = new ol.format.GML({featureNS1: featureNS1, featureType1: featureType1[0]});
            wmsSource1[0] = new ol.source.TileWMS({
                         url: url1,
                         params: {
                        'LAYERS': featurePrefix1 + ':' + featureType1[0],
                        'TILED': true
                    },
                    serverType: 'geoserver'
                });
               var viewResolution = map.getView().getResolution();
             var urlwfs = wmsSource1[0].getGetFeatureInfoUrl(
                evt2.coordinate, viewResolution, map.getView().getProjection(),
                {'INFO_FORMAT': infoFormat}
             );  
               
           //var urlwfs = poligonosedicion.getSource().getGetFeatureInfoUrl(evt2.coordinate, resolution, 'EPSG:3857', {'INFO_FORMAT': 'text/html'});
            $.ajax({
                url: urlwfs,
                success: function (data) {
                        var features = format1[0].readFeatures(data);
                        var feature = features[0]; 
                        //console.log(feature.id_);
                        var values = feature.getProperties();
                        //var idwfs = values.id_borrar;
                        var idwfs = feature.id_;
                    //console.log(idwfs);
                    
                    var payloadborrar =  '<wfs:Transaction service="WFS" version="1.0.0"  xmlns:cdf="http://www.opengis.net/cite/data"  xmlns:ogc="http://www.opengis.net/ogc"  xmlns:wfs="http://www.opengis.net/wfs"  xmlns:prueba="http://prueba"><wfs:Delete typeName="prueba:wfs_prueba_xml"><ogc:Filter><ogc:FeatureId fid="' + idwfs + '"/></ogc:Filter></wfs:Delete></wfs:Transaction>';
                    
                    
                    
                      $.ajax('http://35.184.176.7:8081/geoserver/prueba/ows', {
                            type: 'POST',
                            dataType: 'xml',
                            processData: false,
                            contentType: 'text/xml',
                            data: payloadborrar,
                            success: function (xml) {
                                },
                                error: function (xml) {
                                    console.log('error');
                                }
                        }).done(function() {
                            sourceWFS.clear();
                        });
                        var usob = document.cookie.split('=');
					         var usob = usob[0];
                        var valor = "'" + usob + "'";
					         var filtro = '"usuario=' + valor + '"';
					         poligonosedicion.getSource().updateParams({'CQL_FILTER': eval(filtro)}); 
                    /*if (conteo == 1){
                            poligonosedicion.getSource().updateParams({CQL_FILTER:"1=1"});
                                conteo = conteo + 1;
                                }
                            else if (conteo == 2){
                              poligonosedicion.getSource().updateParams({CQL_FILTER:"2=2"});
                                conteo = conteo + 1;
                            }
                            else if (conteo == 3){
                              poligonosedicion.getSource().updateParams({CQL_FILTER:"3=3"});
                                conteo = conteo + 1;
                            }
                            else if (conteo == 4){
                              poligonosedicion.getSource().updateParams({CQL_FILTER:"4=4"});
                                conteo = conteo + 1;
                            }
                            else if (conteo == 5){
                              poligonosedicion.getSource().updateParams({CQL_FILTER:"5=5"});
                                conteo = conteo + 1;
                            }
                            else if (conteo == 6){
                              poligonosedicion.getSource().updateParams({CQL_FILTER:"6=6"});
                                conteo = conteo + 1;
                            }
                            else if (conteo == 7){
                              poligonosedicion.getSource().updateParams({CQL_FILTER:"7=7"});
                                conteo = conteo + 1;
                            }
                            else if (conteo == 8){
                              poligonosedicion.getSource().updateParams({CQL_FILTER:"8=8"});
                                conteo = conteo + 1;
                            }
                            else if (conteo == 9){
                              poligonosedicion.getSource().updateParams({CQL_FILTER:"9=9"});
                                conteo = conteo + 1;
                            }*/

                    }
            });     
        });
             
            break;
    }
                  
   //var payload = xs.serializeToString(node);
   
    $.ajax('http://35.184.176.7:8081/geoserver/prueba/ows', {
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
        sourceWFS.clear();
    });
    
		for (i=0; i < 50; i++)	{	
		console.log("");																																															      
       var payloadobs = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:prueba="http://prueba" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs"><wfs:Update typeName="prueba:wfs_prueba_xml"><wfs:Property><wfs:Name>usuario</wfs:Name><wfs:Value>' + usob + '</wfs:Value></wfs:Property><ogc:Filter><ogc:PropertyIsNull><ogc:PropertyName>usuario</ogc:PropertyName></ogc:PropertyIsNull></ogc:Filter></wfs:Update></wfs:Transaction>';
             } 
	 $.ajax('http://35.184.176.7:8081/geoserver/prueba/ows', {
                            type: 'POST',
                            dataType: 'xml',
                            processData: false,
                            contentType: 'text/xml',
                            data: payloadobs,
                            success: function (xml) {
                                },
                                error: function (xml) {
                                    console.log('error');
                                }
                        });     
       
};       
        
$(document).ready(function(){        
$('button').click(function () {
    $(this).siblings().removeClass('btn-active');
    $(this).addClass('btn-active');
    map.removeInteraction(interaction);
    interactionSelect.getFeatures().clear();
    map.removeInteraction(interactionSelect);
    

    switch ($(this).attr('id')) {

        case 'btnEdit':
            interaction = new ol.interaction.Draw({
                type: 'Point',
                source: layerWFS.getSource()
            });
            interaction.on('drawend', function (e) {
                transactWFS('update', e.feature);
            });
            map.addInteraction(interaction);
            predio.setVisible(false);
            construcciones.setVisible(false);
            break;
            map.addInteraction(interaction);
            break;

        case 'btnPoint':
            interaction = new ol.interaction.Draw({
                type: 'Point',
                source: layerWFS.getSource()
            });
            map.addInteraction(interaction);
            interaction.on('drawend', function (e) {
                transactWFS('insert', e.feature);
            });
            break;

        case 'btnLine':
            interaction = new ol.interaction.Draw({
                type: 'LineString',
                source: layerWFS.getSource()
            });
            map.addInteraction(interaction);
            interaction.on('drawend', function (e) {
                transactWFS('insert', e.feature);
            });
            break;

        case 'btnArea':
            poligonosedicion.setVisible(true);
            interaction = new ol.interaction.Draw({
                type: 'Polygon',
                source: layerWFS.getSource()
            });
            interaction.on('drawend', function (e) {
                transactWFS('insert', e.feature);
            });
            map.addInteraction(interaction);
            predio.setVisible(false);
            construcciones.setVisible(false);
            break;
            map.addInteraction(interaction);
            break;


        case 'btnDelete':
            
           //interaction = new ol.interaction.Select();
          /* interaction.getFeatures().on('add', function (e) {
                transactWFS('delete', e.target.item(0));
                interactionSelectPointerMove.getFeatures().clear();
                interaction.getFeatures().clear();
            });*/
            poligonosedicion.setVisible(true);
            interaction = new ol.interaction.Draw({
                type: 'Point',
                source: layerWFS.getSource()
            });
            interaction.on('drawend', function (e) {
                transactWFS('delete', e.feature);
            });
            map.addInteraction(interaction);
            predio.setVisible(false);
            construcciones.setVisible(false);
            break;
            map.addInteraction(interaction);
            break;

        default:
            break;
    }
//}
 });        
        
});