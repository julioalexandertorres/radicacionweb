filters = [];
function menuconsultassql(){
    document.getElementById('filterModal').style.display='block';
}

function datosesq(){
    document.getElementById("tablasbase").innerHTML = "";
    document.getElementById("tablasbase").style.display = "block";
    document.getElementById("labeltablasbase").style.display = "block"; 
    var tb = tablasbase();
    var select = document.getElementById("tablasbase"); //Seleccionamos el select
    
    for(var i=0; i < tb.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = tb[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }
}

function datostab(){
    document.getElementById("datostablasbase").style.display = "block";
    document.getElementById("labeldatostablasbase").style.display = "block";
    document.getElementById("datostablasbase").innerHTML = "";
    var select = document.getElementById("datostablasbase");
    var tabladb = document.getElementById("tablasbase").value;
    var datostablas = datostabl(tabladb);
    for(var i=0; i < datostablas.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablas[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }   
}

function datostabatrib(){
    document.getElementById("calculator").style.display = "block";
    document.getElementById("tablasbaseatributos").style.display = "block";
    document.getElementById("tablasbaseatributos").innerHTML = "";
    var select = document.getElementById("tablasbaseatributos");
    var tabladb = document.getElementById("tablasbase").value;
    var tabladbcolumn = document.getElementById("datostablasbase").value; 
    var datostablasatributos = datrib(tabladbcolumn, tabladb);      
    for(var i=0; i < datostablasatributos.length; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = datostablasatributos[i]; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
    }  
}

function expresionsql(){
    var esquema = document.getElementById("esquema").value;
    var tabladb = document.getElementById("tablasbase").value;
    var tabladbcolumn = document.getElementById("datostablasbase").value;
    var tablasatributos = document.getElementById("tablasbaseatributos").value; 
    document.getElementById("fname").value = "SELECT * FROM " + esquema + "." + tabladb + " WHERE " + tabladbcolumn + "=" + "'" + tablasatributos + "'";
}

function datosoperador(oper){
    var esquema = document.getElementById("esquema").value;
    var tabladb = document.getElementById("tablasbase").value;
    var tabladbcolumn = document.getElementById("datostablasbase").value;
    var tablasatributos = document.getElementById("tablasbaseatributos").value;
    var operador = oper;
    document.getElementById("fname").value = "SELECT * FROM " + esquema + "." + " WHERE " + tabladbcolumn + operador + "'" + tablasatributos + "'";
}
function cerrarSQL(){
  document.getElementById('filterModal').style.display='none';
}
function aplicarFilter(){
    cerrarSQL();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    var consultsql = document.getElementById("fname").value;
    var resultsql = select_query(""+consultsql);
       if (resultsql){
         buildTableSelect(resultsql);   
       }
       else{
        alert("Error al ejecutar la Consulta, por favor revise la expresión");
       }
}



function buildTableSelect(select) {
     var tabladb = document.getElementById("tablasbase").value; 
     var datostablas = datostabl(tabladb);
     var properties = [];
    
   for (i = 0; i < datostablas.length; i++) {  
      properties[i] = {
      value: i,
      label: datostablas[i][0],
    }
   }
 
    var index = select.length;
    var row = select[0];   
      
    filters = [];
    table = [{
    field: "action",
    title: "<i class='fa fa-cog'></i>&nbsp;Acciónes",
    align: "center",
    valign: "middle",
    width: "75px",
    cardVisible: false,
    switchable: false,
    formatter: function(value, row, index) {
      return [
        '<a class="zoom" href="javascript:void(0)" title="Zoom" style="margin-right: 10px;">',
          '<i class="fa fa-search-plus fa-2x" style="color: #134375"></i>',
        '</a>'/*,
        '<a class="identify" href="javascript:void(0)" title="Identify">',
          '<i class="fa fa-info-circle"></i>',
        '</a>'*/
      ].join("");
    },
    events: {
      "click .zoom": function (e, value, row, index) { 
          var esquema = document.getElementById("esquema").value;
          var tabladb = document.getElementById("tablasbase").value;
          var tipogeom = select_query("SELECT ST_GeometryType(geom) as tipo FROM " + esquema + "." + tabladb +" limit 1");  
          if (tipogeom){
          if (tipogeom[0][0] == "ST_MultiPolygon"){
            var centroide = select_query("SELECT ST_CENTROID("+tabladb+".geom) AS geom FROM " + esquema + "." + tabladb +" where gid = "+row[0]+"");
            //console.log(centroide);
            var coordenadas = select_query("SELECT ST_AsText('"+centroide+"')");
              //console.log(coordenadas);
              var coord = String(coordenadas[0][0]);
              var coord = coord.replace("POINT(", "");
              var coord = coord.replace(")", "");
               //console.log(coord);
              var coord = coord.split(" ");
              //console.log(coord);
              var y = coord[0];
              var x = coord[1];
              
              var view = map.getView();
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
 
         highlight.setStyle(flagStyle);
         var markerSource = highlight.getSource();
         markerSource.clear();
         markerSource.addFeature(iconFeature);
 }       
        
          
          else if (tipogeom[0][0] == "ST_Point"){
            var coordenadas = select_query("SELECT geom FROM "+ mun + esquema + "." + tabladb +" where gid = "+row[0]+""); 
            var coordenadas = select_query("SELECT ST_AsText('"+coordenadas+"')");
            var coord = String(coordenadas[0][0]);
              var coord = coord.replace("POINT(", "");
              var coord = coord.replace(")", "");
              var y = coord[0];
              var x = coord[1];
              
              
              var view = map.getView();
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
 
         highlight.setStyle(flagStyle);
         var markerSource = highlight.getSource();
         markerSource.clear();
         markerSource.addFeature(iconFeature);
 }
                        
          else if (tipogeom[0][0] == "ST_MultiLineString"){
            var centroide = select_query("SELECT ST_CENTROID("+tabladb+".geom) AS geom FROM "+ mun + esquema + "." + tabladb +" where gid = "+row[0]+"");
            console.log(centroide);
               var coordenadas = select_query("SELECT geom FROM "+tabladb+" where gid = "+row[0]+"");
               var coordenadas = select_query("SELECT ST_AsText('"+centroide+"')");
               //console.log(coordenadas);
               var coord = String(coordenadas[0][0]);
               var coord = coord.replace("POINT(", "");
               var coord = coord.replace(")", "");
                //console.log(coord);
               var coord = coord.split(" ");
               //console.log(coord);
               var y = coord[0];
               var x = coord[1];
               
               var view = map.getView();
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
  
          highlight.setStyle(flagStyle);
          var markerSource = highlight.getSource();
          markerSource.clear();
          markerSource.addFeature(iconFeature);
 
          }
   
}
          else{
              alert("No es posible ubicar este objeto en el mapa");
          }
        

      }/*,
      "click .identify": function (e, value, row, index) {
        identifyFeature(row.leaflet_stamp);
        highlightLayer.clearLayers();
        highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      }*/
    }
  }];
    
    $.each(properties, function(index, value) {
    if (value.filter) {
      var id;
      if (value.filter.type == "integer") {
        id = "cast(properties->"+ value.value +" as int)";
      }
      else if (value.filter.type == "double") {
        id = "cast(properties->"+ value.value +" as double)";
      }
      else {
        id = "properties->" + value.value;
      }
      filters.push({
        id: id,
        label: value.label
      });
    }
    // Table config
 
      table.push({
        field: value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (table[index+1]) {
          table[index+1][key] = val;
        }
      });
      //console.log(table);
  })
    
  $("#table").bootstrapTable('destroy').bootstrapTable({
    cache: false,
    height: $("#tablecontainer").height(),
    locale: "es-ES",
    undefinedText: "",
    striped: false,
    pagination: false,
    minimumCountColumns: 1,
    sortName: "Código Nuevo",
    sortOrder: "desc",
    toolbar: "#toolbar",
    search: true,
    trimOnSearch: false,
    showColumns: true,
    showToggle: true,
    columns: table,
    onClickRow: function (row) {
      // do something!
    },
    onDblClickRow: function (row) {
      // do something!
    }
  });
    
  document.getElementById("tablecontainer").style.display = "block";
  document.getElementById("botonocultarselect").style.display = "block";
  tableFeatures = [];
 
  for (i=0; i< select.length; i++) {
  tableFeatures.push(select[i]);
  }
  //console.log(tableFeatures);
  $("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
  var featureCount = $("#table").bootstrapTable("getData").length;
  if (featureCount == 1) {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registro");
  } else {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registros");
  }
 
}



function switchView(view) {
  if (view == "split") {
    $("#view").html("Split View");
    location.hash = "#split";
    $("#table-container").show();
    $("#table-container").css("height", "55%");
    $("#map-container").show();
    $("#map-container").css("height", "45%");
    $(window).resize();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "map") {
    $("#view").html("Map View");
    location.hash = "#map";
    $("#map-container").show();
    $("#map-container").css("height", "100%");
    $("#table-container").hide();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "table") {
    $("#view").html("Table View");
    location.hash = "#table";
    $("#table-container").show();
    $("#table-container").css("height", "100%");
    $("#map-container").hide();
    $(window).resize();
  }
}

$("[name='view']").click(function() {
  $(".in,.open").removeClass("in open");
  if (this.id === "map-graph") {
    switchView("split");
    return false;
  } else if (this.id === "map-only") {
    switchView("map");
    return false;
  } else if (this.id === "graph-only") {
    switchView("table");
    return false;
  }
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#filter-btn").click(function() {
  $("#filterModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chart-btn").click(function() {
  $("#chartModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#view-sql-btn").click(function() {
  alert($("#query-builder").queryBuilder("getSQL", false, false).sql);
});

$("#apply-filter-btn").click(function() {
  applyFilter();
});

$("#reset-filter-btn").click(function() {
  $("#query-builder").queryBuilder("reset");
  applyFilter();
});

$("#extent-btn").click(function() {
  map.fitBounds(featureLayer.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-csv-btn").click(function() {
  $("#table").tableExport({
    type: "csv",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-excel-btn").click(function() {
  $("#tablecat").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-pdf-btn").click(function() {
  $("#table").tableExport({
    type: "pdf",
    ignoreColumn: [0],
    fileName: "data",
    jspdf: {
      format: "bestfit",
      margins: {
        left: 20,
        right: 10,
        top: 20,
        bottom: 20
      },
      autotable: {
        extendWidth: false,
        overflow: "linebreak"
      }
    }
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chartModal").on("shown.bs.modal", function (e) {
  drawCharts();
});

/*function exportarexcel(){
  //console.log($("#table"));
  $("#table").tableExport({
    type: "csv",
    ignoreColumn: [0],
    fileName: "seleccionados"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
}*/


    
    
    
    
 
 






