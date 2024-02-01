//manzana lote
var StyleManzana = new ol.style.Style({
	stroke: new ol.style.Stroke({
		color: [0,255,255,0.6],
		width: 3
	}),
	fill: new ol.style.Fill({
		color: [0,128,0,0.01]
	}),
	zIndex: 1
});
var StyleBarrio = new ol.style.Style({
	stroke: new ol.style.Stroke({
		color: [0,255,255,0.6],
		width: 3
	}),
	fill: new ol.style.Fill({
		color: [229,229,255,0.01]
	}),
	zIndex: 1
});
$("#manzana").on('click', function(a) {
	//Input Search Value
	var search = document.getElementById("search_manzana").value;
	

  	var querysearch = search.replace(/[^0-9a-zA-Z ]/g, "");
  	
  	// If there's nothing left after stripping, just return null.
  	if ( querysearch.length == 0 ) {
	    //response([]);
    	return;
  	}
  	
  	// Form the input parameters into a standard viewparams
  	// object string.
  	var viewParamsSearch = viewparamsToStr({
    	query: querysearch
  	});
  	
  	
  	// Set up the parameters for our WFS call to the address_autocomplete
  	// web service.
  	var wfsParamsSearch = {
    	service: 'WFS',
    	version: '2.0.0',
    	request: 'GetFeature',
    	typeName: 'preproduccion:manzana_lote',
    	outputFormat: 'application/json',
    	srsname: 'EPSG:3857',
    	viewparams: viewParamsSearch
  	};
  	console.log(wfsParamsSearch);
  	// Call the WFS web service, and call the response on completion
  	$.ajax({
    	url: url,
    	data: wfsParamsSearch,
    	type: "GET",
    	dataType: "json",
    	
    	success: function(data, status, xhr) {
			if ( console && console.log ) {
				console.log( "La solicitud se ha completado correctamente.");
			}
			var geojsonSearch = new ol.source.GeoJSON({
          		object: data
      		});
			var layer = new ol.layer.Vector({
				source : geojsonSearch,
				style : StyleManzana
			});
			
			alert(layer.getSource().getFeatures().length+"  predios en esta manzana");
			//alert(layer.getSource().getExtent());
			
			var view = map.getView();
			var extent = layer.getSource().getExtent(); 
			var center = ol.extent.getCenter(layer);
			
			view.setCenter(center);
			view.fitExtent(extent,map.getSize());
			
			map.addLayer(layer);
			
			//Evento para Remover Layer
			map.on('singleclick', function(evt) {
				map.removeLayer(layer);
			});
			
		}
  	});
});

//barrios_predios
$("#barrio").on('click', function(a) {
	//Input Search Value
	var search = document.getElementById("search_barrio").value;
	
	//alert(search);
	
	// Strip crazy (non-alpha) characters from the input string.
  	var querysearch = search.replace(/[^0-9a-zA-Z ]/g, "");
  	
  	// If there's nothing left after stripping, just return null.
  	if ( querysearch.length == 0 ) {
	    //response([]);
    	return;
  	}
  	
  	// Form the input parameters into a standard viewparams
  	// object string.
  	var viewParamsSearch = viewparamsToStr({
    	query: querysearch
		
  	});
  	
  	
  	// Set up the parameters for our WFS call to the address_autocomplete
  	// web service.
  	var wfsParamsSearch = {
    	service: 'WFS',
    	version: '2.0.0',
    	request: 'GetFeature',
    	typeName: 'preproduccion:barrios_predios',
    	outputFormat: 'application/json',
    	srsname: 'EPSG:3857',
    	viewparams: viewParamsSearch
		};
  	//console.log(wfsParamsSearch);
  	// Call the WFS web service, and call the response on completion
  	$.ajax({
    	url: url,
    	data: wfsParamsSearch,
    	type: "GET",
    	dataType: "json",
    	
    	success: function(data, status, xhr) {
			if ( console && console.log ) {
				console.log( "La solicitud se ha completado correctamente.");
			}
			var geojsonSearch = new ol.source.GeoJSON({
          		object: data
      		});
			
			var layer = new ol.layer.Vector({
				source : geojsonSearch,
				style : StyleBarrio
			});
		
			alert(layer.getSource().getFeatures().length+"  predios en este barrio");
			//alert(layer.getSource().getExtent());
			
			var view = map.getView();
			var extent = layer.getSource().getExtent(); 
			var center = ol.extent.getCenter(layer);
			
			view.setCenter(center);
			view.fitExtent(extent,map.getSize());
			
			map.addLayer(layer);
			
			//Evento para Remover Layer
			map.on('singleclick', function(evt) {
				map.removeLayer(layer);
			});
			
			
		}
  	});
});

//comunas_predios
$("#comuna").on('click', function(a) {
	//Input Search Value
	var search = document.getElementById("search_comuna").value;
	
	alert(search);
	
	// Strip crazy (non-alpha) characters from the input string.
  	var querysearch = search.replace(/[^0-9a-zA-Z ]/g, "");
  	
  	// If there's nothing left after stripping, just return null.
  	if ( querysearch.length == 0 ) {
	    //response([]);
    	return;
  	}
  	
  	// Form the input parameters into a standard viewparams
  	// object string.
  	var viewParamsSearch = viewparamsToStr({
    	query: querysearch
		
  	});
  	
  	
  	// Set up the parameters for our WFS call to the address_autocomplete
  	// web service.
  	var wfsParamsSearch = {
    	service: 'WFS',
    	version: '2.0.0',
    	request: 'GetFeature',
    	typeName: 'preproduccion:comunas_predios',
    	outputFormat: 'application/json',
    	srsname: 'EPSG:3857',
    	viewparams: viewParamsSearch
		};
  	console.log(wfsParamsSearch);
  	// Call the WFS web service, and call the response on completion
  	$.ajax({
    	url: url,
    	data: wfsParamsSearch,
    	type: "GET",
    	dataType: "json",
    	
    	success: function(data, status, xhr) {
			if ( console && console.log ) {
				console.log( "La solicitud se ha completado correctamente.");
			}
			var geojsonSearch = new ol.source.GeoJSON({
          		object: data
      		});
			var layer = new ol.layer.Vector({
				source : geojsonSearch,
				style : StyleBarrio
			});
		
			alert(layer.getSource().getFeatures().length+"  predios en esta comuna");
			//alert(layer.getSource().getExtent());
			
			var view = map.getView();
			var extent = layer.getSource().getExtent(); 
			var center = ol.extent.getCenter(layer);
			
			view.setCenter(center);
			view.fitExtent(extent,map.getSize());
			
			map.addLayer(layer);
			
			//Evento para Remover Layer
			map.on('singleclick', function(evt) {
				map.removeLayer(layer);
			});
		}
  	});
});

//localidades_predios
$("#localidad").on('click', function(a) {
	//Input Search Value
	var search = document.getElementById("search_localidad").value;
	
	alert(search);
	
	// Strip crazy (non-alpha) characters from the input string.
  	var querysearch = search.replace(/[^0-9a-zA-Z ]/g, "");
  	
  	// If there's nothing left after stripping, just return null.
  	if ( querysearch.length == 0 ) {
	    //response([]);
    	return;
  	}
  	
  	// Form the input parameters into a standard viewparams
  	// object string.
  	var viewParamsSearch = viewparamsToStr({
    	query: querysearch
		
  	});
  	
  	
  	// Set up the parameters for our WFS call to the address_autocomplete
  	// web service.
  	var wfsParamsSearch = {
    	service: 'WFS',
    	version: '2.0.0',
    	request: 'GetFeature',
    	typeName: 'preproduccion:localidades_predios',
    	outputFormat: 'application/json',
    	srsname: 'EPSG:3857',
    	viewparams: viewParamsSearch
		};
  	console.log(wfsParamsSearch);
  	// Call the WFS web service, and call the response on completion
  	$.ajax({
    	url: url,
    	data: wfsParamsSearch,
    	type: "GET",
    	dataType: "json",
    	
    	success: function(data, status, xhr) {
			if ( console && console.log ) {
				console.log( "La solicitud se ha completado correctamente.");
			}
			var geojsonSearch = new ol.source.GeoJSON({
          		object: data
      		});
			var layer = new ol.layer.Vector({
				source : geojsonSearch,
				style : StyleBarrio
			});
		
			alert(layer.getSource().getFeatures().length+"  predios en esta localidad");
			//alert(layer.getSource().getExtent());
			
			var view = map.getView();
			var extent = layer.getSource().getExtent(); 
			var center = ol.extent.getCenter(layer);
			
			view.setCenter(center);
			view.fitExtent(extent,map.getSize());
			
			//map.addLayer(layer);
			
			//Evento para Remover Layer
			map.on('singleclick', function(evt) {
				map.removeLayer(layer);
			});
			
			// Zoom to the address pol, at a "close enough" zoom
			/*var view = map.getView(layer);
			var geom = layer.getGeometry();
			var center = ol.extent.getCenter(geom.getExtent());
			
			view.setCenter(center);
			view.fitExtent(geom.getExtent(),map.getSize());
			//view.setZoom(18);
		
			// Over-ride the old polygon-based highlight style with a
			// point marker style using a flag image as the icon.
			highlight.setStyle(StylePol);
		
			// Add a flag marker to the map at the location of the selection
			var markerSource = highlight.getSource();
			markerSource.clear();
			markerSource.addFeature(feat);*/
		}
  	});
});