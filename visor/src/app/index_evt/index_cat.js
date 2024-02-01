function menumarcas(){
   document.getElementById('addmarks').style.display = 'block';
   document.getElementById('grupoherramientas').style.display = 'none';
}


function cerrarmenueditarmarcas(){
   document.getElementById('fondomenumarcas').style.display = 'none';
   //document.getElementById('editarmarcas').style.display = 'none';
}

function cerrarmenumarcas(){
    document.getElementById('addmarks').style.display = 'none';
    document.getElementById('grupoherramientas').style.display = 'flex';
}

var numpredmark ="";
function buildTableSelectForm(datostablas, select, filtro) {
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
     title: "Agregar Marca",
     align: "center",
     valign: "middle",
     width: "75px",
     cardVisible: false,
     switchable: false,
     formatter: function(value, row, index) { 
     return [
         '<a href="javascript:void(0)" class="agregarMarca" title="Agregar Marca">',
           '<i class="fa fa-solid fa-circle-plus fa-2x" style="color: #FCB314"></i>',
         '</a>',
         '&nbsp;&nbsp;&nbsp;&nbsp<a href="javascript:void(0)" class="eliminarMarca" title="Agregar Marca">',
           '<i class="fa-solid fa-trash-can fa-2x" style="color: #ff3232"></i>',
         '</a>'
         
       ].join("");
     },
     events: {
       "click .agregarMarca": function (e, value, row, index, tidlcterreno) {
         document.getElementById('fondomenumarcas').style.display = 'block';
         document.getElementById('editarMarcas').style.display='block';
         numpredmark = row;   
        },
        "click .eliminarMarca": function (e, value, row, index) { 
          //update_query("insert into marcas (numero_predial, marca) values ('"+ numpredmark[1] +"', '"+ marcaurt +"')");
          console.log(row);
          numpredmark = row;
          update_query("delete from marcas where idmark = '" + row[0] + "'");
          alert("La marca con id: " + row[0] + " fue eliminada");
          refreshTableMark();
         }
     },    
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
 
   //$("#table").bootstrapTable({
   $("#tablecat").bootstrapTable('destroy').bootstrapTable({
     cache: false,
     height: $("#tablecat").height(),
     undefinedText: "",
     striped: false,
     pagination: true,
     pageSize: 10,
     minimumCountColumns: 1,
     sortName: "Código Nuevo",
     sortOrder: "desc",
     toolbar: "#toolbar",
     search: true,
     trimOnSearch: false,
     showColumns: false,
     showToggle: false,
     columns: table,
     onClickRow: function (row) {
       // do something!
     },
     onDblClickRow: function (row) {
       // do something!
     }
   });
     
   tableFeatures = [];
   for (i=0; i< select.length; i++) {
    tableFeatures.push(select[i]);
   }
 
   $("#tablecat").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
   var featureCount = $("#tablecat").bootstrapTable("getData").length;
   if (featureCount == 1) {
     $("#feature-count").html($("#tablecat").bootstrapTable("getData").length + " Sin Datos");
   } else {
     $("#feature-count").html($("#tablecat").bootstrapTable("getData").length + " Registros");
   }
 
   //desactivarLoading();
 }


 
 function guardarMarca(){
  let checkboxurt = document.getElementById("urtCheck");
  let checkboxant = document.getElementById("antCheck");
  let checkboxsnr = document.getElementById("snrCheck");
  let checkboxres1101 = document.getElementById("res1101Check");
  let marcaurt, marcaant, marcasnr, marcares1101;
  let tidlcterrenoinput = document.getElementById('itidhide').value;
  if (checkboxurt.checked) {
    marcaurt = "(URT) Predio en la unidad de restitución de tierras";
  } 
  else{
    marcaurt = "Sin Marca";
  }
  if (checkboxant.checked) {
    marcaant = "(ANT) Predio adjudicado por la ANT";
  } 
  else{
    marcaant = "Sin Marca";
  }
  if (checkboxsnr.checked) {
    marcasnr = "(SNR) Predio marcado por una novedad en la SNR";
  } 
  else{
    marcasnr = "Sin Marca";
  }
  if (checkboxres1101.checked) {
    marcares1101 = "(RES1101) Predio al que se le rectificó el área por la resolución conjunta 1101";
  } 
  else{
    marcares1101 = "Sin Marca";
  }

  if(marcaurt !== "Sin Marca"){
    update_query("insert into marcas (marca, t_id_lc_terreno) values ('"+ marcaurt +"', '"+ tidlcterrenoinput +"')");
  }
  if(marcaant !== "Sin Marca"){
    update_query("insert into marcas (marca, t_id_lc_terreno) values ('"+ marcaant +"', '"+ tidlcterrenoinput +"')");
  }
  if(marcasnr !== "Sin Marca"){
    update_query("insert into marcas (marca, t_id_lc_terreno) values ('"+ marcasnr +"', '"+ tidlcterrenoinput +"')");
  }
  if(marcares1101 !== "Sin Marca"){
    update_query("insert into marcas (marca, t_id_lc_terreno) values ('"+ marcares1101 +"', '"+ tidlcterrenoinput +"')");
  }
  //update_query("update usuario set email = '"+ femail +"' where usuario = '"+userid+"'");
  alert("La marca fue incorporda al terreno");
  document.getElementById('fondomenumarcas').style.display = 'none';
  document.getElementById('editarMarcas').style.display='none';
  //refreshTableMark();
}

function refreshTableMark(){
  console.log(numpredmark);
  document.getElementById("editarMarcas").style.display = 'none';
  document.getElementById("fondomenumarcas").style.display = 'none';
  var datostablas = [['Id Marca'], ['Nombre'], ['Número Predial'], ['MARCA']];
  let nummark = select_query("select * from marcas where numero_predial = '"+numpredmark[2]+"'");
  let datoslcpredio = select_query("select * from valparaiso.lc_predio where numero_predial = '"+numpredmark[2]+"'");
  let datosTablerefresh = [];
  //console.log(nummark);
  if(nummark){
    for (i=0; i < nummark.length; i++){
      datosTablerefresh.push([nummark[i][0], datoslcpredio[0][21], nummark[i][1], nummark[i][2]]);
        }
    }
    else{
        alert("No existen marcas para este predio");
        datosTablerefresh.push([nummark[i][0], numpredmark[1], numpredmark[1], "Sin marcas"]);
    }
        //console.log(datosTablerefresh);
        var select = datosTablerefresh;
        var filtro = "agregarmarca";
        buildTableSelectForm(datostablas, select, filtro);
}

function agregarmarca(tidlcterreno){
  //document.getElementById('itidhide').style.display = 'block';
  document.getElementById('itidhide').value = tidlcterreno;
  document.getElementById('fondomenumarcas').style.display = 'block';
  document.getElementById('editarMarcas').style.display='block';
}

function vermarca(tidlcterreno){
  var tablemark = document.getElementById("tblattwms");
  tablemark.innerHTML = "";
  document.getElementById("table-dynamic").innerHTML = "";
  var datos = [];
  //var properties = response.features[0].properties;
  var properties = select_query("select marca, idmark from marcas where t_id_lc_terreno = " + tidlcterreno + "");
  // Recorre las propiedades y crea un objeto para cada par nombre-valor
  for (var key in properties) {
    if (properties.hasOwnProperty(key)) {
      var dato = {
        Nombre: properties[key][1],
        Valor: properties[key][0],
        Eliminar: "<i class='fa fa-solid fa-trash-can' id='" + properties[key][1] + "' style='color: #EB711F; cursor: pointer;' onclick='eliminarmarca(\"" + properties[key][1] + "\")'><i/>"
      };
      datos.push(dato);
    }
  }

  var iconFormatter = function(cell, formatterParams, onRendered){
    return cell.getValue(); // retorna el valor de la celda tal cual (HTML en este caso)
  };
  var table = new Tabulator("#table-dynamic", {
    data: datos, // asigna los datos a la tabla
    layout: "fitColumns", // ajusta las columnas al ancho de la tabla
    columns: [
      { title: "Id Marca", field: "Nombre" },
      { title: "Marca", field: "Valor" },
      { title: "Eliminar marca", 
        field: "Eliminar", 
        formatter: iconFormatter,
        align: "center"
       },
    ],
    movableColumns: true, // permite cambiar el orden de las columnas
    resizableRows: true // permite cambiar el orden de las filas
  });

  //$(".modal-dialog").css("width", "80%");
  document.getElementById("panel_infwms").style.display = "block";
}

function eliminarmarca(idm){
  update_query("delete from marcas where idmark = "+idm+"");
  alert("la marca fue eliminada");
  document.getElementById("panel_infwms").style.display = "none";
}