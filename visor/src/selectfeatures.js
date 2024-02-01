function selectelement(selec){
  console.log("listo");
//$('#botonocultarselect').find('i').toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
if(document.getElementById("tablecontainer").style.display=="block"){
  document.getElementById("tablecontainer").style.display = "none";
  document.getElementById("botonocultarselect").style.bottom = "1%";
}
else{
  document.getElementById("tablecontainer").style.display = "block";
  document.getElementById("botonocultarselect").style.bottom = "36%";
}

   

var properties = [{
value: "0",
label: "gid",
table: {
  visible: false,
  sortable: true
},
filter: false,
info: false
},
{
value: "1",
label: "id",
table: {
  visible: true,
  sortable: true
},
filter: {
  type: "string",
  input: "checkbox",
  vertical: true,
  multiple: true,
  operators: ["in", "not_in", "equal", "not_equal"],
  values: []
}
},
{
value: "2",
label: "Planta",
table: {
  visible: true,
  sortable: true
},
filter: {
  type: "string"
}
},
{
value: "3",
label: "nombre",
table: {
  visible: true,
  sortable: true
},
filter: {
  type: "string"
}
},
{
value: "4",
label: "Domicilio",
table: {
  visible: false,
  sortable: true
},
filter: {
  type: "string"
}
},
{
value: "5",
label: "Estado",
table: {
  visible: false,
  sortable: true
},
filter: {
  type: "string"
}
},
{
value: "6",
label: "latitud",
table: {
  visible: true,
  sortable: true
},
filter: false,
},
{
value: "7",
label: "longitud",
table: {
  visible: true,
  sortable: true
},
filter: false,
},
{
value: "8",
label: "Turno",
table: {
  visible: false,
  sortable: true
},
filter: {
  type: "string"
}
},
{
value: "9",
label: "Ruta",
table: {
  visible: false,
  sortable: true
},
filter: {
  type: "string"
}
},
{
value: "10",
label: "Grupo",
table: {
  visible: true,
  sortable: true
},
filter: {
  type: "string"
}
},
{
value: "11",
label: "lat_recogida",
table: {
  visible: true,
  sortable: true
},
filter: false,
},
{
value: "12",
label: "lon_recogida",
table: {
  visible: true,
  sortable: true
},
filter: false,
},
{
  value: "13",
  label: "Dirección de recogida",
  table: {
    visible: true,
    sortable: true
  },
  filter: false,
  },
{
    value: "14",
    label: "Hora de recogida",
    table: {
      visible: false,
      sortable: true
    },
    type: "string"
    },
{
  value: "15",
  label: "Hora de recogida",
  table: {
    visible: false,
    sortable: true
  },
  filter: false
}];           
         
var select = search("trymyride:datostab2"); 
//console.log(select);

    var index = select.length;
    var row = select[0];   
    //console.log(row); 

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
        '<i class="fa fa-search-plus"></i>',
      '</a>'/*,
      '<a class="identify" href="javascript:void(0)" title="Identify">',
        '<i class="fa fa-info-circle"></i>',
      '</a>'*/
    ].join("");
  },
  events: {
    "click .zoom": function (e, value, row, index) {
      console.log(row);
    
      
      var y = row[7];
      var x = row[6]; 
     
     
   
          /*  var y = coord[0];
            var x = coord[1]; */
            
            var view = map.getView();
            map.getView().setCenter(ol.proj.transform([eval(y), eval(x)], 'EPSG:4326', 'EPSG:3857'));
            map.getView().setZoom(15);
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

      var buffer = ol.proj.transform([eval(y), eval(x)], 'EPSG:4326', 'EPSG:3857');
      console.log(buffer);
      var viewparams = ['query:' + buffer[0] , 'query1:' + buffer[1], 'query2:' + 50];
      params = viewparams.join(';');
      buffer_point.getSource().updateParams({viewparams: params});
      buffer_point.setVisible(true);

    },
    "click .identify": function (e, value, row, index) {
      identifyFeature(row.leaflet_stamp);
      highlightLayer.clearLayers();
      highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
    }
  }
}];
//console.log(table);
$.each(properties, function(index, value) {
  // Filter config
  //console.log(value);
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
   /* $.each(value.filter, function(key, val) {
      if (filters[index]) {
        // If values array is empty, fetch all distinct values
        if (key == "values" && val.length === 0) {
          alasql("SELECT DISTINCT(properties->"+value.value+") AS field FROM ? ORDER BY field ASC", [geojson.features], function(results){
            distinctValues = [];
            $.each(results, function(index, value) {
              distinctValues.push(value.field);
            });
          });
          filters[index].values = distinctValues;
        } else {
          filters[index][key] = val;
        }
      }
    });*/
  }
  // Table config
  if (value.table) {
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
  }
})

buildFilters();
buildTable(select);  
}



function urlFormatter (value, row, index) {
//console.log(value, row, index);    
if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf("https") === 0)) {
  return "<a href='"+value+"' target='_blank'>"+value+"</a>";
}
}

function buildFilters() {
 //console.log(filters);
$("#query-builder").queryBuilder({
  allow_empty: true,
  filters: filters
});
//console.log(document.getElementById("filterModal").style);
}

function applyFilter() {
//console.log(geojson.features);
var query = "SELECT * FROM ?";
var sql = $("#query-builder").queryBuilder("getSQL", false, false).sql;
if (sql.length > 0) {
  query += " WHERE " + sql;
}
alasql(query, [geojson.features], function(features){
featureLayer.clearLayers();
featureLayer.addData(features);
//syncTable();
});
  //console.log(alasql);
}


function buildTable(select) {
//console.log(select);
  //console.log(table);
$("#table").bootstrapTable('destroy').bootstrapTable({
  cache: false,
  height: $("#tablecontainer").height(),
  locale: "es-ES",
  undefinedText: "",
  striped: false,
  pagination: false,
  minimumCountColumns: 1,
  sortName: "Planta",
  sortOrder: "desc",
  toolbar: "#toolbar",
  search: true,
  searchAlign:'left',
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
/*featureLayer.eachLayer(function (layer) {
   //console.log(layer.feature.properties);
  layer.feature.properties.leaflet_stamp = L.stamp(layer);
  if (map.hasLayer(featureLayer)) {
    if (map.getBounds().contains(layer.getBounds())) {
      tableFeatures.push(layer.feature.properties);
    }
  }
});*/
//console.log(select);
for (i=0; i< select.length; i++) {
tableFeatures.push(select[i]);
}
//console.log(tableFeatures);
// counter selection on map 
$("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
var featureCount = $("#table").bootstrapTable("getData").length;
if (featureCount == 1) {
  $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registro");
} else {
  $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registros");
}
   
}

function menuselect(){
$('#botonocultarselect').find('i').toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
if(document.getElementById("tablecontainer").style.display=="block"){
  document.getElementById("tablecontainer").style.display = "none";
  document.getElementById("botonocultarselect").style.bottom = "1%";
}
else{
  document.getElementById("tablecontainer").style.display = "block";
  document.getElementById("botonocultarselect").style.bottom = "36%";
}
}

