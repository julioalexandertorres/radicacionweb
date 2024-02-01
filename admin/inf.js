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

function aplicarFilterInf(id){
     var resultados = document.getElementById('table');
     resultados.innerHTML = '';
    table = [];
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    if (id=='usuarios'){
      var datostablas = [['Nombre'], ['Nombre'], ['Usuario'], ['Email'], ['Role'], ['Proyecto']];
      var select = select_query("SELECT estado, nombre, usuario, email, tipo, proyecto FROM usuario order by usuario");
      //console.log(select);
    }
    
    else if (id=='infing'){
      var datostablas = search("fhg:listacolumnas", "reguseramco");
      var select = search("fh:consultaregusuer");             
    }
        //console.log(select);
        for(i=0; i<select.length;i++){
          if(select[i][0]=='t'){
            select[i][0] = "<i class='material-icons' style='color: #6BD098'>&#xe5d3;</i>Activo";
          }
          else{
            select[i][0] = "<i class='material-icons' style='color: #EF8157'>&#xe5d3;</i>Inactivo";
          }
        }
        buildTableSelect(datostablas, select);   
}



function buildTableSelect(datostablas, select) {
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
    title: "Editar",
    align: "center",
    valign: "middle",
    width: "75px",
    cardVisible: false,
    switchable: false,
    formatter: function(value, row, index) { 
                  
    //console.log(select[index][4]);
    
      return [
        /*'<a href="javascript:void(0)" class="zoom" title="Habilitar Usuario" style="margin-right: 8px;">',
          '<div class="custom-control custom-checkbox"><input type="checkbox" checked class="custom-control-input" id="change'+index+'" name="change'+index+'"><label class="custom-control-label" for="change'+index+'"></label></div>',
        '</a>',*/
        '<a class="estado" href="javascript:void(0)" data-toggle="modal" data-target="#generarmapa" title="Editar">',
          '<i class="fa fa-gear" style="color: #FCB314"></i>',
        '</a>'
      ].join("");
    },
    events: {
      "click .estado": function (e, value, row, index) {
        var userid = row[2];
        var estadoact2 = row[4].toString();
        var vemail = row[3].toString();
        var vrole = row[3].toString();
        var tabledinamic = document.getElementById("table-dynamic");
        tabledinamic.innerHTML = "";
        var table = document.getElementById("tblatt");
        table.innerHTML = "";
        document.getElementById("titulotabla").innerHTML = "EDITAR";
        var select = [];
        var sel = [];
        var imag = [];
        var stv = [];
        var ig = [];
        select[0] = "<b>Usuario: </b>";
        select[1] = "<b>Estado: </b>";
        select[2] = "<b>email: </b>";
        select[3] = "<b>Role: </b>";
        select[4] = "";
        sel[0] = "<input type='text' id='fuser' name='fuser' class='input-100' style='border: none;' disabled>";
        sel[1] = "<select id='festado' class='list_form'><option value='activo'>Activo</option><option value='inactivo'>Inactivo</option></select>";
        sel[2] = "<input type='text'class='input-100' id='femail' name='femail'>";
        sel[3] = "<select id='frole' class='list_form'><option value='' disabled selected>Seleccione...</option><option value='gerente'>Gerente</option><option value='lider'>Lider</option><option value='liderejecutor'>Lider ejecutor</option></select>";
        sel[4] = "<button type='button' class='btn btn-outline-danger' onclick='deleteuser()'>Eliminar Usuario</button>&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' class='btn btn-outline-primary' onclick='saveuser()'>Guardar</button>";
        for (i = 0; i < select.length; i++) {
          row = table.insertRow(i);
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell1.innerHTML = select[i];
          cell2.innerHTML = sel[i];
        }
        document.getElementById("fuser").value = userid;
        document.getElementById("femail").value = vemail;
        //document.getElementById("frole").value = vrole;
        document.getElementById("panel_atr").style.display = "block";
    
      }
    }
  }];
    
   
  
    
    
    
    $.each(properties, function(index, value) {
    // Filter config
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
        
      
 
      table.push({
        field: value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (table[index+1]) {  
          table[index+1][key] = val;
        }
      });
     
  })

  
    //console.log(table);
  $("#table").bootstrapTable({
    cache: false,
    height: $("#tablecontainer").height(),
    undefinedText: "",
    striped: false,
    pagination: true,
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
    
    
 //console.log(document.getElementById("table").innerHTML);
    
  //document.getElementById("tablecontainer").style.display = "block";
  //document.getElementById("botonocultarselect").style.display = "block";
  tableFeatures = [];
 
  for (i=0; i< select.length; i++) {
  /*if(select[i][4]==true){
        select[i][4]="Activo";
    }
  else{
      select[i][4]="Inactivo";
  }*/
  tableFeatures.push(select[i]);
  }
    
 // console.log(tableFeatures);
  $("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
  var featureCount = $("#table").bootstrapTable("getData").length;
  if (featureCount == 1) {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " Sin Datos");
  } else {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " Registros");
  }
for (i=0; i< select.length; i++) {
    
    //console.log(select[i][4]);
  /*if(select[i][4]==true){
      document.getElementById("change"+i+"").checked = true;
  }
  else{
      document.getElementById("change"+i+"").checked = false;
  }*/
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
    fileName: "reporte"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-excel-btn").click(function() {
  $("#table").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "reporte"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-pdf-btn").click(function() {
  $("#table").tableExport({
    type: "pdf",
    ignoreColumn: [0],
    fileName: "reporte",
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

function exportexcel(){
     
  $("#table").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "reporte"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
}

function ocultarpanelatributos(){
  document.getElementById("panel_atr").style.display = 'none';
}

function saveuser(){
  var userid = document.getElementById('fuser').value;
  var festado = document.getElementById('festado').value;
  var frole = document.getElementById('frole').value;
  //var proyectoschemas = 
  if(festado == 'activo'){
    festado = true;
  }
  else if(festado == 'inactivo'){
    festado = false;
  }
  var femail = document.getElementById('femail').value;
  //var frole = document.getElementById('frole').value;
  var proyecto = "demo";
  //console.log(femail, festado, frole, fmunicipio, userid);
  //update_query("update usuario set email = '"+ femail +"' where usuario = '"+userid+"'");
  //update_query("update usuario set estado = "+ festado +" where usuario = '"+userid+"'");
  //update_query("update usuario set tipo = '"+ frole +"' where usuario = '"+userid+"'");
  //update_query("update usuario set municipio = '"+ fmunicipio +"' where usuario = '"+userid+"'");
  
  update_query("update usuario set email = '"+ femail +"', estado = '"+ festado +"', tipo = '"+ frole +"', proyecto = '"+ proyecto +"' where usuario = '"+userid+"'");
  location.reload();
}

function createuser(){  
  document.getElementById("divform").style.display = "block";       
  var select = document.getElementById('selectproyecto');
  var opcioneshemas = select_query("SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'public') AND schema_name NOT LIKE 'pg_%'");
  // Iterar sobre el array y crear un elemento <option> para cada elemento
  opcioneshemas.forEach(function(opcion) {
    var elemento = document.createElement('option');
    elemento.value = opcion;
    elemento.text = opcion;
    select.appendChild(elemento);
  });             
}

function adduser(){
  if(document.getElementById("addfuser").value == ''){
    alert("Debe ingresar un nombre de usuario");
  }
  else if(document.getElementById("addfemail").value == ''){
    alert("Debe ingresar un correo electronico");
  }
  else if(document.getElementById("addfnombre").value == ''){
    alert("Debe ingresar un Nombre");
  }
  else{
      var adduserid = document.getElementById('addfuser').value;
      var addnombre = document.getElementById('addfnombre').value;
      var addfestado = document.getElementById('addfestado').value;
      var addfrole = document.getElementById('addfrole').value;
      var addmunicipio = document.getElementById('addfmunicipio').value;
      //console.log(frole);
      if(addfestado == 'activo'){
        addfestado = true;
      }
      else if(addfestado == 'inactivo'){
        addfestado = false;
      }     
      var addfemail = document.getElementById('addfemail').value;
      var addfrole = document.getElementById('addfrole').value;
      var addfmunicipio = document.getElementById('addfmunicipio').value;
      var cont = adduserid + "2021";
      var addcontrasena = hex_md5(cont);
      var num1 = Math.random() * (10000 - 1) + 512;
      var num2 = Math.random() * (5000 + 1) + 412;
      var num = num1 + num2;
      update_query("insert into usuario (nombre, email, usuario, contrasena, estado, id, tipo, municipio) values ('"+addnombre+"', '"+addfemail+"', '"+adduserid+"', '"+addcontrasena+"', '"+addfestado+"', '"+num+"', '"+addfrole+"', '"+addmunicipio+"')");

      location.reload();
  }
  
}

function deleteuser(){
  var userid = document.getElementById('fuser').value;
  console.log(userid);
  update_query("delete from usuario where usuario = '"+userid+"'");
  location.reload();
}

function vsalir(){
  window.open('index.html', '_self')
}

function addcapageo(){
  var tabledinamic = document.getElementById("table-dynamic");
  tabledinamic.innerHTML = "";
  var table = document.getElementById("tblatt");
  table.innerHTML = "";
  document.getElementById("titulotabla").innerHTML = "AGREGAR CAPA GEOGRÁFICA";                 
  var select = [];
  var sel = [];
  var imag = [];
  var stv = [];
  var ig = [];
  select[0] = "<b>Nombre de la Capa en Geoserver: </b>";
  select[1] = "<b>Esquema: </b>"; 
  select[2] = "";
  sel[0] = "<input type='text' id='namecapa' name='namecapa' class='input-100'>";
  sel[1] = "<select id='tipocapa' name='tipocapa' class='list_form'></select>"; 
  sel[2] = "<button type='button' class='btn btn-outline-primary' onclick='addcapa()'>Agregar Capa al Visor Geográfico</button>";
  for (i = 0; i < select.length; i++) {
    row = table.insertRow(i);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = select[i];
    cell2.innerHTML = sel[i];       
  }
   
  //document.getElementById("divform").style.display = "block";       
  var select = document.getElementById('tipocapa');
  var opcioneshemas = select_query("SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'public') AND schema_name NOT LIKE 'pg_%'");
  // Iterar sobre el array y crear un elemento <option> para cada elemento
  opcioneshemas.forEach(function(opcion) {
    var elemento = document.createElement('option');
    elemento.value = opcion;
    elemento.text = opcion;
    select.appendChild(elemento);
  });
  document.getElementById("panel_atr").style.display = "block";
}

function delcapageo(){
  var tabledinamic = document.getElementById("table-dynamic");
  tabledinamic.innerHTML = "";
  var table = document.getElementById("tblatt");
  table.innerHTML = "";
  document.getElementById("titulotabla").innerHTML = "ELIMINAR CAPA GEOGRÁFICA";                 
  var select = [];
  var sel = [];
  var imag = [];
  var stv = [];
  var ig = [];

  select[0] = "<b>Esquema: </b>"; 
  select[1] = "<b>Seleccione la Capa a Eliminar: </b>";
  select[2] = "";
  sel[0] = "<select id='tipocapadelete' class='list_form' onchange='cargarcapasdel()'></select>"; 
  sel[1] = "<select id='capadisponible' class='list_form'></select>";
  sel[2] = "<button type='button' class='btn btn-outline-danger' onclick='deletecapa()'>Eliminar Capa del Visor Geográfico</button>"; 
  
  for (i = 0; i < select.length; i++) {
    row = table.insertRow(i);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell1.innerHTML = select[i];
    cell2.innerHTML = sel[i];       
  }         
  
  var select = document.getElementById('tipocapadelete');
  var opcioneshemas = select_query("SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'public') AND schema_name NOT LIKE 'pg_%'");
  // Iterar sobre el array y crear un elemento <option> para cada elemento
  opcioneshemas.forEach(function(opcion) {
    var elemento = document.createElement('option');
    elemento.value = opcion;
    elemento.text = opcion;
    select.appendChild(elemento);
  });

  document.getElementById("panel_atr").style.display = "block";
}

function cargarcapasdel(){
  $("#capadisponible").find('option').remove();
  var dataset = document.getElementById("tipocapadelete").value;
  //console.log(dataset);
  //var capasdisp = select_query('select nombre from capas');
  var capasdisp = select_query("select nombre from capas_ladm where layer ='"+dataset+"'");
  //console.log(capasdisp);
  var select = document.getElementsByName(capadisponible)[0];
  for (i=0; i<capasdisp.length; i++) {
    var option = document.createElement("option");
    option.text = capasdisp[i][0];
    capadisponible.add(option);
    //capadisponible.appendChild(option);
  }
}

function addcapa(){
  if(document.getElementById("namecapa").value == ''){
    alert("Debe ingresar un nombre de Capa");
  }
  else{
    var nombrec = document.getElementById("namecapa").value;
    var layer = document.getElementById("tipocapa").value;
    var vurl = "http://35.232.57.213:8080/geoserver/ladm/"+nombrec+"/wms";
    var vpermisos = "general";
    var num1 = Math.random() * (1000000 - 1) + 512;
    var num2 = Math.random() * (7000 + 1) + 412;
    var num = parseInt(num1 + num2);
    console.log(vurl, layer, nombrec, vpermisos, num);
    update_query("insert into capas_ladm (url, layer, nombre, permisos, id) values ('"+vurl+"', '"+layer+"', '"+nombrec+"', '"+vpermisos+"', '"+num+"')");
    location.reload();
  }
}

function deletecapa(){
  var capab = document.getElementById("capadisponible").value;
  var layerb = document.getElementById("tipocapadelete").value;
  update_query("delete from capas_ladm where nombre ='"+capab+"' and layer ='"+layerb+"'");
  location.reload();
}

function divtoggle(){
  document.getElementById("divform").style.display ="none";
  document.getElementById("divstaticsm").style.display ="none";
}

function openmanualadmin(){
  document.getElementById("divmanual").style.display = 'block';
  document.getElementById("marco").src = "visor/pdfs/manual_de_administrador.pdf";
}

function cerrarpdf(){
  document.getElementById("divmanual").style.display = 'none';
}

function selectchange(){
  if(document.getElementById('tipo').value=='Municipio'){
    document.getElementById('municipio').disabled = false;
  }
  else if(document.getElementById('tipo').value =='Administrador'){
    document.getElementById('municipio').disabled = true;
    document.getElementById('municipio').value = 'Administrador';
  }
  else if(document.getElementById('tipo').value =='Gobernacion'){
    document.getElementById('municipio').disabled = true;
    document.getElementById('municipio').value = 'Gobernacion';
  }
}

function viewstatics(){
  $.ajax({
    beforeSend: function () {
        
            document.getElementById("carga2").style.display = "block";
        
    },
  success: function (response) {
  document.getElementById("divstaticsm").style.display = "block";
  var totalingresos = select_query("select count(*) from reguser");
  var ingdistinc = select_query("select usuario, count(*) from reguser where usuario is not null group by usuario");
  var final = [];
  var mes = [];

    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  
  
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
  
    var chart;
    
  $('#graf1').highcharts({
    chart: {
      type: 'pie',
      borderWidth: 0
    },
          title: {
              text: 'Porcentaje de ingresos por usuario',
          },
          subtitle: {
              text: 'Total ingresos: ' + totalingresos,
          },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
      name: "Representa",
      colorByPoint: true,
      data: final
    }],
    exporting: {
      enabled: true
    }
    });
  
    $('#graf2').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Total de ingresos por usuario'
    },
    subtitle: {
        text: 'Número de ingresos: ' + totalingresos
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de ingresos'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Ingresos',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
      }],
      exporting: {
        enabled: true
      }
    });
  });
  },
complete: function () { 
        document.getElementById("carga2").style.display = "none";
    }
  });
  var param = "inguser";
  buildTableSelect2(param);

}

function changegraf(lista){
  $.ajax({
    beforeSend: function () {      
            document.getElementById("carga2").style.display = "block";     
    },
  success: function (response) {
  if(lista == 'graf1'){
    var val = document.getElementById("sel1").value;
  }
  else if(lista == 'graf2'){
    var val = document.getElementById("sel2").value;
  }
  
  if(val == 'ipup'){
   /* $.ajax({
      beforeSend: function () {
          
              document.getElementById("carga2").style.display = "block";
          
      },
    success: function (response) {*/
    var totalingresos = select_query("select count(*) from reguser");
    var ingdistinc = select_query("select usuario, count(*) from reguser where usuario is not null group by usuario");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
 /* },
  complete: function () { 
          document.getElementById("carga2").style.display = "none";
      }
    });*/
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Porcentaje de ingresos por usuario',
            },
            subtitle: {
                text: 'Total ingresos: ' + totalingresos,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
  
    var param = "inguser";
    buildTableSelect2(param);
  }


  else if(val == 'ipun'){
    var totalingresos = select_query("select count(*) from reguser");
    var ingdistinc = select_query("select usuario, count(*) from reguser where usuario is not null group by usuario");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Total de ingresos por usuario'
    },
    subtitle: {
        text: 'Número de ingresos: ' + totalingresos
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de ingresos'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Ingresos',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
  });
  var param = "inguser";
  buildTableSelect2(param);
  }

  else if(val == 'ceditp'){
    var totalcambios = select_query("select count(*) from reguser_edit");
    var ingdistinc = select_query("select actividad, count(*) from reguser_edit where actividad is not null group by actividad");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Porcentaje de cambios por actividad',
            },
            subtitle: {
                text: 'Total cambios: ' + totalcambios,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
    var param = "changeedit";
    buildTableSelect2(param);
  }

  else if(val == 'ceditn'){
    var totalcambios = select_query("select count(*) from reguser_edit");
    var ingdistinc = select_query("select actividad, count(*) from reguser_edit where actividad is not null group by actividad");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
    //console.log(ingdistinc);
    //console.log(final);
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Número de cambios por actividad'
    },
    subtitle: {
        text: 'Número de cambios: ' + totalcambios
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de cambios'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Tipo de cambio',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      });
    });
    var param = "changeedit";
    buildTableSelect2(param);
  }


  else if(val == 'ccpmn'){
   
    var totalcapas = select_query("select count(*) from capas");
    var ingdistinc = select_query("select layer, count(*) from capas where layer is not null group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
    //console.log(ingdistinc);
    //console.log(final);
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Número de capas por tématica'
    },
    subtitle: {
        text: 'Número de capas públicadas en la plataforma: ' + totalcapas
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de cambios'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Tipo de cambio',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }

  else if(val == 'ccpmp'){
    var totalcapas = select_query("select count(*) from capas");
    var ingdistinc = select_query("select layer, count(*) from capas where layer is not null group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Porcentaje de capas por actividad',
            },
            subtitle: {
                text: 'Total capas: ' + totalcapas,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }


  else if(val == 'ccpmun'){
    var totalcapas = select_query("select count(*) from capas where layer like '%_catastro'");
    var ingdistinc = select_query("select layer, count(*) from capas where layer like '%_catastro' group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
    //console.log(ingdistinc);
    //console.log(final);
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Número de capas de información catastral por municipio',
    },
    subtitle: {
        text: 'Número de capas de información catastral: ' + totalcapas,
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de cambios'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Tipo de cambio',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }

  else if(val == 'ccpmup'){
    var totalcapas = select_query("select count(*) from capas where layer like '%_catastro'");
    var ingdistinc = select_query("select layer, count(*) from capas where layer like '%_catastro' group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Número de capas de información catastral por municipio',
            },
            subtitle: {
                text: 'Número de capas de información catastral: ' + totalcapas,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }



  else if(val == 'ccgrn'){
    var totalcapas = select_query("select count(*) from capas where layer like '%_riesgo_%'");
    var ingdistinc = select_query("select layer, count(*) from capas where layer like '%_riesgo_%' group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
    //console.log(ingdistinc);
    //console.log(final);
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Capas de información de gestión del riesgo por municipio',
    },
    subtitle: {
        text: 'Total de capas de información de gestión del riesgo por municipio: ' + totalcapas,
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de cambios'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Tipo de cambio',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }

  else if(val == 'ccgrp'){
    var totalcapas = select_query("select count(*) from capas where layer like '%_riesgo_%'");
    var ingdistinc = select_query("select layer, count(*) from capas where layer like '%_riesgo_%' group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Capas de información de gestión del riesgo por municipio',
            },
            subtitle: {
                text: 'Total de capas de información de gestión del riesgo por municipio: ' + totalcapas,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }



  else if(val == 'cccb5n'){
    var totalcapas = select_query("select count(*) from capas where layer like '%_cartografia_basica_%'");
    //console.log(totalcapas);
    var ingdistinc = select_query("select layer, count(*) from capas where layer like '%_cartografia_basica_%' group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
    //console.log(ingdistinc);
    //console.log(final);
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'column'
    },
    title: {
        text: 'Capas de cartografía básica por municipio',
    },
    subtitle: {
        text: 'Total de capas de cartografía básica por municipio: ' + totalcapas,
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Número de cambios'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:1f}'
    },
    series: [{
        name: 'Tipo de cambio',
        data: final,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }

  else if(val == 'cccb5p'){
    var totalcapas = select_query("select count(*) from capas where layer like '%_cartografia_basica_%'");
    var ingdistinc = select_query("select layer, count(*) from capas where layer like '%_cartografia_basica_%' group by layer order by layer");
    var final = [];
    for(var i=0; i < ingdistinc.length; i++) {
    	final.push({
            name: ingdistinc[i][0],
            y: parseInt(ingdistinc[i][1])			 
        }); 	   
    }
  $(document).ready(function() {
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart;
    $('#'+lista+'').highcharts({
      chart: {
        type: 'pie',
        borderWidth: 0
      },
            title: {
                text: 'Capas de cartografía básica por municipio',
            },
            subtitle: {
                text: 'Total de capas de cartografía básica por municipio: ' + totalcapas,
            },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      series: [{
        name: "Representa",
        colorByPoint: true,
        data: final
      }]
      });
    });
    var param = "capaspublicadas";
    buildTableSelect2(param);
  }

},
complete: function () { 
        document.getElementById("carga2").style.display = "none";
    }
  });

}

