
try{
    const loadingModal = new bootstrap.Modal('#loadingModal', { focus: false });
  }
  catch(err){}

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
  })()

  //funcion para modal bootstrap
  $('.modal-dialog').draggable({
        handle:".modal-header"
      });
      $('.add-one').click(function(){
       $('.dynamic-element').first().clone().appendTo('.dynamic-stuff').show();
      attach_delete();
  });
  //funciones para personalización de tablas bootstrap
  function buildTableSelect(datostablas, select, filtro){
    //desactivarLoading();
    var properties = [];
    for (var i = 0; i < datostablas.length; i++) {  
        properties[i] = {
            value: i,
            label: datostablas[i][0],
        };
    }  

    var table = [];
    
    // Configuración de las columnas restantes
    $.each(properties, function(index, value) {
        var columnConfig = {
            field: value.value,
            title: value.label
        };

        if (value.table) {
            $.extend(columnConfig, value.table);
        }

        table.push(columnConfig);
    });

    // Configuración de la primera columna (ahora movida al final)
    table.push({
        field: "action",
        title: "Acción",
        align: "center",
        valign: "middle",
        width: "75px",
        cardVisible: false,
        switchable: false,
        formatter: function(value, row, index) { 
            return [
                '<a href="javascript:void(0)" class="verInfo" title="Localizar">',
                '<i class="fa-solid fa-location-dot fa-2x" style="color: #32AB44"></i>',
                '</a>',
                '&nbsp;&nbsp;<a href="javascript:void(0)" class="newT" title="Radicar Trámite">',
                '<i class="fa-solid fa-folder-plus fa-2x" style="color: #32AB44"></i>',
                '</a>',
            ].join("");
        },
        events: {
            "click .verInfo": function (e, value, row, index) {
              //console.log(row[1]);
              document.getElementById('visor').src = "visor.html?prediosel="+row[1]+"";
              $('#mostrarMapa').modal("show");
            },
            "click .newT": function (e, value, row, index) {
              $('#generartramite').modal("show");     
          }
        }
    });

    // Inicialización de la tabla Bootstrap
    $("#table").bootstrapTable('destroy').bootstrapTable({
        cache: false,
        height: $("#table").height(),
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
            // Acción al hacer clic en una fila
        },
        onDblClickRow: function (row) {
            // Acción al hacer doble clic en una fila
        }
    });

    // Carga de datos en la tabla
    var tableFeatures = select.map(function(item) { return item; });
    $("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));

    // Actualización del contador de características
    var featureCount = $("#table").bootstrapTable("getData").length;
    var featureCountText = featureCount === 1 ? featureCount + " Registros" : featureCount + " Registros";
    $("#feature-count").html(featureCountText);

    //desactivarLoading();
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

  //variable global que contiene el arreglo utilizado para autocompletar cedula;
  var availableTags = [];
  //función que habilita el formulario de registro tipo absentismo
  function seleccionTipoabsentismo(){
    var titulo = document.getElementById("formselecttipoabsentismo").value;
    document.getElementById("tituloTipopermiso").innerHTML = titulo.toUpperCase();
    document.getElementById("tituloTipopermiso").style.display = "block";
    if(document.getElementById("formselecttipoabsentismo").value == "Estado de embarazo" && document.getElementById("formcolaborador").value !== ""){
      document.getElementById("menuEstadodeembarazo").style.display = "block";
      document.getElementById("menuPermisoremunerado").style.display = "none";
      document.getElementById("menuPermisonoremunerado").style.display = "none";
      document.getElementById("menuRetirodepersonal").style.display = "none";
      document.getElementById("menuReintegrodepersonal").style.display = "none";
      document.getElementById("menuIncapacidad").style.display = "none";
      //document.getElementById("dataced").value = document.getElementById('formcedula').value;
    }
    else if(document.getElementById("formselecttipoabsentismo").value == "Permiso remunerado" && document.getElementById("formcolaborador").value !== ""){
      document.getElementById("menuPermisoremunerado").style.display = "block";
      document.getElementById("menuEstadodeembarazo").style.display = "none";
      document.getElementById("menuPermisonoremunerado").style.display = "none";
      document.getElementById("menuRetirodepersonal").style.display = "none";
      document.getElementById("menuReintegrodepersonal").style.display = "none";
      document.getElementById("menuIncapacidad").style.display = "none";
      document.getElementById("datacedPr").value = document.getElementById('formcedula').value;
    }
    else if(document.getElementById("formselecttipoabsentismo").value == "Permiso no remunerado" && document.getElementById("formcolaborador").value !== ""){
      document.getElementById("menuPermisonoremunerado").style.display = "block";
      document.getElementById("menuEstadodeembarazo").style.display = "none";
      document.getElementById("menuPermisoremunerado").style.display = "none";
      document.getElementById("menuRetirodepersonal").style.display = "none";
      document.getElementById("menuReintegrodepersonal").style.display = "none";
      document.getElementById("menuIncapacidad").style.display = "none";
      document.getElementById("datacedPnr").value = document.getElementById('formcedula').value;
    }
    else if(document.getElementById("formselecttipoabsentismo").value == "Retiro de personal" && document.getElementById("formcolaborador").value !== ""){
      document.getElementById("menuEstadodeembarazo").style.display = "none";
      document.getElementById("menuPermisoremunerado").style.display = "none";
      document.getElementById("menuPermisonoremunerado").style.display = "none";
      document.getElementById("menuRetirodepersonal").style.display = "block";
      document.getElementById("menuReintegrodepersonal").style.display = "none";
      document.getElementById("menuIncapacidad").style.display = "none";
      document.getElementById("datacedRp").value = document.getElementById('formcedula').value;
    }
    else if(document.getElementById("formselecttipoabsentismo").value == "Reintegro de personal" && document.getElementById("formcolaborador").value !== ""){
      document.getElementById("menuPermisoremunerado").style.display = "none";
      document.getElementById("menuEstadodeembarazo").style.display = "none";
      document.getElementById("menuPermisoremunerado").style.display = "none";
      document.getElementById("menuPermisonoremunerado").style.display = "none";
      document.getElementById("menuRetirodepersonal").style.display = "none";
      document.getElementById("menuReintegrodepersonal").style.display = "block";
      document.getElementById("menuIncapacidad").style.display = "none";
      document.getElementById("datacedRip").value = document.getElementById('formcedula').value;
    }
    else if(document.getElementById("formselecttipoabsentismo").value == "Incapacidad" && document.getElementById("formcolaborador").value !== ""){
      document.getElementById("menuEstadodeembarazo").style.display = "none";
      document.getElementById("menuPermisoremunerado").style.display = "none";
      document.getElementById("menuRetirodepersonal").style.display = "none";
      document.getElementById("menuReintegrodepersonal").style.display = "none";
      document.getElementById("menuPermisonoremunerado").style.display = "none";
      document.getElementById("menuIncapacidad").style.display = "block";
      window.open("https://script-google-com.btglss.net/a/fundaciondelamujer.com/macros/s/AKfycbzYswwa5FvYE3W6ssnZbys2diI7sxekWuH1utbeKWrgRvJBGEon/exec" , "_blank");
    }
  }

  //función que habilita el formulario de registro de vacaciones
  function seleccionCedulavacaciones(){
    document.getElementById("tituloTipopermiso").style.display = "block";
    document.getElementById("menuVacaciones").style.display = "block";
    //document.getElementById("dataced").value = document.getElementById('formcedula').value;
  }

  //función que activa el input fecha finalización y valida los dias de anticipación de solicitud del permiso
  function activarFechafinalizacion(id){
    if(id=='fechaIniciopermiso'){
      document.getElementById("fechaFinalizacionpermiso").disabled = false;
      var fechaInicioPermiso = document.getElementById('fechaIniciopermiso').value;
      var tAreainput = document.getElementById("dataArea").value;
    }
    else if(id=='fechaIniciopermisopnr'){
      document.getElementById("fechaFinalizacionpermisopnr").disabled = false;
      var fechaInicioPermiso = document.getElementById('fechaIniciopermisopnr').value;
      var tAreainput = document.getElementById("dataAreaPnr").value;
    }
    google.script.run
      .withSuccessHandler(function( datos ) {
        if(datos[0].length > 0){
          var festivos = datos[0].replaceAll(/[[\[\]'"]+/g, '');
          festivos = festivos.split(",");
          const formatoYYYYMMDD = fecha => {
            const isoDate = new Date(fecha).toISOString();
            return isoDate.slice(0, 10).replace(/-/g, "/");
          };
          var fechasFestivas = festivos.map(formatoYYYYMMDD);
        }
        else{
          var festivos = '';
        }
        var cedula = document.getElementById("formcedula").value;
        var tDa = datos[1].replaceAll(/[[\[\]'"]+/g, '');
        tDa = tDa.split(",");
        
        if(tAreainput == 'Administrativo'){
          var diasAColaborador = tDa[0];
        }
        else{
          var diasAColaborador = tDa[1];
        }
        /*var diasPermiso = fechaFinalizacionPermiso.diff(fechaInicioPermiso, 'days');*/
        //diasPermiso = diasPermiso - diasFeriadosenrango;
        //document.getElementById('totalDiaspermiso').value = diasPermiso;
        var fechaHoy = fechaActualformattwoj();
        fechaInicioPermiso = moment(fechaInicioPermiso);
        fechaHoy = moment(fechaHoy);
        diaInicio = fechaInicioPermiso.day();
        var fComparacion = fechaInicioPermiso.diff(fechaHoy, 'days');
        //console.log(fComparacion);
        if(fComparacion < 0){
          alert("El día de inicio del permiso debe ser posterior al día de hoy");
          if(id=='fechaIniciopermiso'){
            //document.getElementById("registrarNovedadpermisoremunerado").disabled = true;
          }
          if(id=='fechaIniciopermisopnr'){
            //document.getElementById("registrarNovedadpermisonoremunerado").disabled = true;
          }
        }
        
        if(fComparacion < diasAColaborador){
          alert("Debe solicitar el permiso con mínimo " + diasAColaborador + " días de anticipación");
          if(id=='fechaIniciopermiso'){
            //document.getElementById("registrarNovedadpermisoremunerado").disabled = true;
          }
          if(id=='fechaIniciopermisopnr'){
            //document.getElementById("registrarNovedadpermisonoremunerado").disabled = true;
          }
        }
        else if(fComparacion >= diasAColaborador && fComparacion >= 0){
          if(id=='fechaIniciopermiso'){
            document.getElementById("registrarNovedadpermisoremunerado").disabled = false;
          }
          if(id=='fechaIniciopermisopnr'){
            document.getElementById("registrarNovedadpermisonoremunerado").disabled = false;
          }
        }
        //var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      })
      .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
      .obtenerDanticipados();
  }

  //función que devuelve el área a la que pertenece el colaborador a partir de la cédula
  function buscarArea(cedula, callback){
    google.script.run
    .withSuccessHandler(function( areaUsuario ) {
      callback(areaUsuario);
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerArea( cedula )
  } 

  var areaColh = "";
  //función que valida la fecha de inicio del formulario de edicion de historial de registro
  function validarFechainiedit(id){
    var cedula = document.getElementById("datacededitpr").value;
    activarLoading(); 
    buscarArea(cedula, function(areaC){
      areaColh = areaC;
    });
    diasFeriadosH();
  }

  //función que devuelve los dias feriados dentro del rango de fechas seleccionado para historial de registro
  function diasFeriadosH(id){
    //event.preventDefault();
    google.script.run
    .withSuccessHandler( calcularFechasH ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDferiados(); //función de respuesta del lado del cliente 
  }

  //función que calcula los dias de permiso y fecha de reingreso en el formulario historial de registro
  function calcularFechasH( datos ){
    if(datos[0].length > 0){
      var festivos = datos[0].replaceAll(/[[\[\]'"]+/g, '');
      festivos = festivos.split(",");
      const formatoYYYYMMDD = fecha => {
        const isoDate = new Date(fecha).toISOString();
        return isoDate.slice(0, 10).replace(/-/g, "/");
      };
      var fechasFestivas = festivos.map(formatoYYYYMMDD);
    }
    else{
      var festivos = '';
    }
    var cedula = document.getElementById("datacededitpr").value;
    var tArea = datos[1].replaceAll(/[[\[\]'"]+/g, '');
    tArea = tArea.split(",");
    var tAreainput = areaColh;
    if(tAreainput == 'Administrativo'){
      var areaColaborador = tArea[0];
    }
    else{
      var areaColaborador = tArea[1];
    }
    var fechaFinalizacionPermiso = document.getElementById('editarFechafinalizacionpr').value;
    fechaFinalizacionPermiso = moment(fechaFinalizacionPermiso);
    var fechaInicioPermiso = document.getElementById('editarFechainiciopr').value;
    var diaSemana = fechaFinalizacionPermiso.day();
    var fechasRango = [];
    for (let fecha = new Date(fechaInicioPermiso); fecha <= fechaFinalizacionPermiso; fecha.setDate(fecha.getDate() + 1)) {
      fechasRango.push(fecha.toISOString().slice(0, 10).replace(/-/g, '/'));
    }
    let diasFeriadosenrango = 0;
    for (let i = 0; i < fechasFestivas.length; i++) {
      for (let j = 0; j < fechasRango.length; j++) {
        if (fechasFestivas[i] === fechasRango[j]) {
          diasFeriadosenrango++;
        }
      }
    }
    if(diaSemana == 6){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(2, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else if(diaSemana == 5  && areaColaborador == 'lunes-viernes'){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(3, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else if(diaSemana == 5  && areaColaborador == 'lunes-sabado'){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else{
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    
    var reingresoComp = moment(fechaReingreso);
    var day = reingresoComp.format('DD');
    var month = reingresoComp.format('MM');
    var year = reingresoComp.format('YYYY');
    reingresoComp = year + '/' + month + '/' + day;
    for (let i = 0; i < fechasFestivas.length; i++){
     if(fechasFestivas[i] === reingresoComp){
      fechaReingreso = moment(fechaReingreso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      fechaReingreso = year + '-' + month + '-' + day;
     }  
    }
    var diasPermiso = fechaFinalizacionPermiso.diff(fechaInicioPermiso, 'days');
    diasPermiso = diasPermiso - diasFeriadosenrango;
    //document.getElementById('totalDiaspermiso').value = diasPermiso;
    fechaInicioPermiso = moment(fechaInicioPermiso);
    diaInicio = fechaInicioPermiso.day();
    var totaldiaspermiso = 0;
    for(i=0;i<=diasPermiso;i++){
      if(areaColaborador == 'lunes-viernes'){
        if( (diaInicio)!= 6 && (diaInicio)!= 0 ){
          totaldiaspermiso = totaldiaspermiso + 1;
        }
      }
      else{
        if( (diaInicio)!= 0 ){
          totaldiaspermiso = totaldiaspermiso + 1;
        }
      }
      diaInicio = diaInicio + 1;
      if(diaInicio == 7){
        diaInicio = 0;
      }
    }  
    document.getElementById('editarTotaldiaspermisopr').value = totaldiaspermiso;
    document.getElementById('editarFechareingresopr').value = fechaReingreso;
    desactivarLoading();
  }
  

  //función que devuelve los dias feriados dentro del rango de fechas seleccionado
  function diasFeriados(id){
    //event.preventDefault();
    google.script.run
    .withSuccessHandler( calcularFechas ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDferiados(); //función de respuesta del lado del cliente 
  }

  //función que calcula los dias de permiso y fecha de reingreso en el formulario solicitud de absentismo
  function calcularFechas( datos ){
    if(datos[0].length > 0){
      var festivos = datos[0].replaceAll(/[[\[\]'"]+/g, '');
      festivos = festivos.split(",");
      const formatoYYYYMMDD = fecha => {
        const isoDate = new Date(fecha).toISOString();
        return isoDate.slice(0, 10).replace(/-/g, "/");
      };
      var fechasFestivas = festivos.map(formatoYYYYMMDD);
    }
    else{
      var festivos = '';
    }
    var cedula = document.getElementById("formcedula").value;
    var tArea = datos[1].replaceAll(/[[\[\]'"]+/g, '');
    tArea = tArea.split(",");
    var tAreainput = document.getElementById("formtipo").value;
    if(tAreainput == 'Administrativo'){
      var areaColaborador = tArea[0];
    }
    else{
      var areaColaborador = tArea[1];
    }
    if(document.getElementById("menuPermisoremunerado").style.display == 'block'){
      var fechaFinalizacionPermiso = document.getElementById('fechaFinalizacionpermiso').value;
      fechaFinalizacionPermiso = moment(fechaFinalizacionPermiso);
      var fechaInicioPermiso = document.getElementById('fechaIniciopermiso').value;
    }
    else if(document.getElementById("menuPermisonoremunerado").style.display == 'block'){
      var fechaFinalizacionPermiso = document.getElementById('fechaFinalizacionpermisopnr').value;
      fechaFinalizacionPermiso = moment(fechaFinalizacionPermiso);
      var fechaInicioPermiso = document.getElementById('fechaIniciopermisopnr').value;
    }
    var diaSemana = fechaFinalizacionPermiso.day();
    var fechasRango = [];
    for (let fecha = new Date(fechaInicioPermiso); fecha <= fechaFinalizacionPermiso; fecha.setDate(fecha.getDate() + 1)) {
      fechasRango.push(fecha.toISOString().slice(0, 10).replace(/-/g, '/'));
    }
    let diasFeriadosenrango = 0;
    for (let i = 0; i < fechasFestivas.length; i++) {
      for (let j = 0; j < fechasRango.length; j++) {
        if (fechasFestivas[i] === fechasRango[j]) {
          diasFeriadosenrango++;
        }
      }
    }
    if(diaSemana == 6){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(2, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else if(diaSemana == 5  && areaColaborador == 'lunes-viernes'){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(3, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else if(diaSemana == 5  && areaColaborador == 'lunes-sabado'){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else{
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    
    var reingresoComp = moment(fechaReingreso);
    var day = reingresoComp.format('DD');
    var month = reingresoComp.format('MM');
    var year = reingresoComp.format('YYYY');
    reingresoComp = year + '/' + month + '/' + day;
    for (let i = 0; i < fechasFestivas.length; i++){
     if(fechasFestivas[i] === reingresoComp){
      fechaReingreso = moment(fechaReingreso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      fechaReingreso = year + '-' + month + '-' + day;
     }  
    }
    //document.getElementById('fechaReingreso').value = fechaReingreso;
    var diasPermiso = fechaFinalizacionPermiso.diff(fechaInicioPermiso, 'days');
    diasPermiso = diasPermiso - diasFeriadosenrango;
    //document.getElementById('totalDiaspermiso').value = diasPermiso;
    fechaInicioPermiso = moment(fechaInicioPermiso);
    diaInicio = fechaInicioPermiso.day();
    var totaldiaspermiso = 0;
    for(i=0;i<=diasPermiso;i++){
      if(areaColaborador == 'lunes-viernes'){
        if( (diaInicio)!= 6 && (diaInicio)!= 0 ){
          totaldiaspermiso = totaldiaspermiso + 1;
        }
      }
      else{
        if( (diaInicio)!= 0 ){
          totaldiaspermiso = totaldiaspermiso + 1;
        }
      }
      diaInicio = diaInicio + 1;
      if(diaInicio == 7){
        diaInicio = 0;
      }
    }
    if(document.getElementById("menuPermisoremunerado").style.display == 'block'){
      document.getElementById('totalDiaspermiso').value = totaldiaspermiso;
      document.getElementById('fechaReingreso').value = fechaReingreso;
    }
    else if(document.getElementById("menuPermisonoremunerado").style.display == 'block'){
      document.getElementById('totalDiaspermisopnr').value = totaldiaspermiso;
      document.getElementById('fechaReingresopnr').value = fechaReingreso;
    }
  }

  //función que devuelve la fecha actual en formato día - mes - año
  function fechaActualj(){
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1; // Months start at 0!
    var dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    var formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
  }

  //función que devuelve la fecha actual en formato año - mes - día
  function fechaActualformattwoj(){
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1; // Months start at 0!
    var dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    //var formattedToday = dd + '/' + mm + '/' + yyyy;
    var formattedTodayformattwo = yyyy + '-' + mm + '-' + dd;
    return formattedTodayformattwo;
  }


  //función que calcula las horas de permiso en un intervalo para el formulario de registro
  function horasPermiso(){
    var dataArea = document.getElementById("dataArea").value;
    //console.log(dataArea);
    // obtener los valores de los inputs de tiempo
    var horaInicio = document.getElementById("horaInicio").value;
    var horaFinal = document.getElementById("horaFinal").value;
    // separar los valores de hora, minutos y segundos
    horaInicio = horaInicio.split(":");
    horaFinal = horaFinal.split(":");
    var horaInicioh = parseInt(horaInicio[0]);
    var horaIniciom = parseInt(horaInicio[1]);
    var horaFinalh = parseInt(horaFinal[0]);
    var horaFinalm = parseInt(horaFinal[1]);
    // calcular la diferencia de tiempo en segundos
    var diferencia = (horaFinalh - horaInicioh) * 3600 + (horaFinalm - horaIniciom) * 60;
    // convertir la diferencia de tiempo a un formato legible
    var horas = Math.floor(diferencia / 3600);
    var minutos = Math.floor((diferencia % 3600) / 60);
    // mostrar la diferencia de tiempo en un formato legible
    
    var horaIniciomilisegundos = (horaInicioh * 3600) + (horaIniciom * 60);
    var horaFinalmilisegundos = (horaFinalh * 3600) + (horaFinalm * 60);
    if(dataArea == 'Administrativo'){
      var horaFinalalmuerzo = 46800;
    }
    else{
      var horaFinalalmuerzo = 50400;
    }

    if(horaFinalmilisegundos >= 43200 && horaIniciomilisegundos <= horaFinalalmuerzo){
          if(horaIniciomilisegundos >= 43200 && horaFinalmilisegundos <= horaFinalalmuerzo){
            alert("No se requiere de permiso por ser horario del almuerzo");
            horas = 0;
            minutos = 0;
          }
          else if(horaIniciomilisegundos <= 43200 && horaFinalmilisegundos <= horaFinalalmuerzo){  
            var difrango = 43200 - horaIniciomilisegundos;
            horas = Math.floor(difrango / 3600);
            minutos = Math.floor((difrango % 3600) / 60);
          }
          else if(horaIniciomilisegundos < 43200 && horaFinalmilisegundos > horaFinalalmuerzo){
            var difrango1 = 43200 - horaIniciomilisegundos;
            var difrango2 = horaFinalmilisegundos - horaFinalalmuerzo;
            var difrango = difrango1 + difrango2;
            horas = Math.floor(difrango / 3600);
            minutos = Math.floor((difrango % 3600) / 60);
          }
          else if(horaIniciomilisegundos >= 43200 && horaFinalmilisegundos >= horaFinalalmuerzo){  
            var difrango = horaFinalmilisegundos - horaFinalalmuerzo;
            horas = Math.floor(difrango / 3600);
            minutos = Math.floor((difrango % 3600) / 60);
          }
    }
    
    if(horas>4 || (horas == 4 && minutos != 0)){
      alert("Debe seleccionar un rango menor a 4 horas");
      document.getElementById("registrarNovedadpermisoremunerado").style.display = 'none';
      document.getElementById("tiempoPermiso").value = '';
    }
    else{
      if(horas<0 || minutos <0){
        alert("Debe seleccionar una hora de finalización mayor a la hora de inicio");
        document.getElementById("registrarNovedadpermisoremunerado").style.display = 'none';
        document.getElementById("tiempoPermiso").value = '';
      }
      else{
        document.getElementById("registrarNovedadpermisoremunerado").style.display = 'block';
        document.getElementById("tiempoPermiso").value = horas + " horas, " + minutos + " minutos";
      }
    }
  }

  //funcion que calcula las horas de permiso en un intervalo para el formulario historial de registro
  function horasPermisoH(){
    var cedula = document.getElementById("datacededitpr").value;
    activarLoading(); 
    buscarArea(cedula, function(areaC){
      var dataArea = areaC;
      var horaInicio = document.getElementById("horaIniciopr").value;
      var horaFinal = document.getElementById("horaFinalpr").value;
      // separar los valores de hora, minutos y segundos
      horaInicio = horaInicio.split(":");
      horaFinal = horaFinal.split(":");
      var horaInicioh = parseInt(horaInicio[0]);
      var horaIniciom = parseInt(horaInicio[1]);
      var horaFinalh = parseInt(horaFinal[0]);
      var horaFinalm = parseInt(horaFinal[1]);
      // calcular la diferencia de tiempo en segundos
      var diferencia = (horaFinalh - horaInicioh) * 3600 + (horaFinalm - horaIniciom) * 60;
      // convertir la diferencia de tiempo a un formato legible
      var horas = Math.floor(diferencia / 3600);
      var minutos = Math.floor((diferencia % 3600) / 60);
      // mostrar la diferencia de tiempo en un formato legible
      var horaIniciomilisegundos = (horaInicioh * 3600) + (horaIniciom * 60);
      var horaFinalmilisegundos = (horaFinalh * 3600) + (horaFinalm * 60);
      if(dataArea == 'Administrativo'){
        var horaFinalalmuerzo = 46800;
      }
      else{
        var horaFinalalmuerzo = 50400;
      }
      if(horaFinalmilisegundos >= 43200 && horaIniciomilisegundos <= horaFinalalmuerzo){
            if(horaIniciomilisegundos >= 43200 && horaFinalmilisegundos <= horaFinalalmuerzo){
              alert("No se requiere de permiso por ser horario del almuerzo");
              horas = 0;
              minutos = 0;
            }
            else if(horaIniciomilisegundos <= 43200 && horaFinalmilisegundos <= horaFinalalmuerzo){  
              var difrango = 43200 - horaIniciomilisegundos;
              horas = Math.floor(difrango / 3600);
              minutos = Math.floor((difrango % 3600) / 60);
            }
            else if(horaIniciomilisegundos < 43200 && horaFinalmilisegundos > horaFinalalmuerzo){
              var difrango1 = 43200 - horaIniciomilisegundos;
              var difrango2 = horaFinalmilisegundos - horaFinalalmuerzo;
              var difrango = difrango1 + difrango2;
              horas = Math.floor(difrango / 3600);
              minutos = Math.floor((difrango % 3600) / 60);
            }
            else if(horaIniciomilisegundos >= 43200 && horaFinalmilisegundos >= horaFinalalmuerzo){  
              var difrango = horaFinalmilisegundos - horaFinalalmuerzo;
              horas = Math.floor(difrango / 3600);
              minutos = Math.floor((difrango % 3600) / 60);
            }
      } 
      if(horas>4 || (horas == 4 && minutos != 0)){
        alert("Debe seleccionar un rango menor a 4 horas");
        document.getElementById("corregirPr").style.display = 'none';
        document.getElementById("tiempoPermisopr").value = '';
      }
      else{
        if(horas<0 || minutos <0){
          alert("Debe seleccionar una hora de finalización mayor a la hora de inicio");
          document.getElementById("corregirPr").style.display = 'none';
          document.getElementById("tiempoPermisopr").value = '';
        }
        else{
          document.getElementById("corregirPr").style.display = 'block';
          document.getElementById("tiempoPermisopr").value = horas + " horas, " + minutos + " minutos";
        }
    }
      desactivarLoading();
    });
  }

  //Función que resetea los valores del formulario permiso remunerado, no se utiliza el boton tipo "reset" porque hay valores de inputs necesarios ocultos
  function limpiarFormpr(){
    document.getElementById("fechaIniciopermiso").value = "";
    document.getElementById("fechaFinalizacionpermiso").value = "";
    document.getElementById("fechaReingreso").value = "";
    document.getElementById("totalDiaspermiso").value = "";
    document.getElementById("adjuntoDocumento").value = "";
    document.getElementById("prObservaciones").value = "";
    document.getElementById("adjuntoDefuncion").value = "";
    document.getElementById("adjuntoRegistrocivil").value = "";
    document.getElementById("horaInicio").value = "";
    document.getElementById("horaFinal").value = "";
    document.getElementById("tiempoPermiso").value = "";
  }

  //Función que resetea los valores del formulario permiso remunerado, no se utiliza el boton tipo "reset" porque hay valores de inputs necesarios ocultos
  function limpiarFormpnr(){
    document.getElementById("detallePermiso").value = "";
    document.getElementById("fechaIniciopermisopnr").value = "";
    document.getElementById("fechaFinalizacionpermisopnr").value = "";
    document.getElementById("fechaReingresopnr").value = "";
    document.getElementById("totalDiaspermisopnr").value = "";
    document.getElementById("autorizacionColaboradorpnr").value = "";
    document.getElementById("adjuntoDocumentopnr").value = "";
  }

  //Función que resetea los valores del formulario retiro de personal, no se utiliza el boton tipo "reset" porque hay valores de inputs necesarios ocultos
  function limpiarFormrp(){
    document.getElementById("adjuntoCartarenuncia").value = "";
    document.getElementById("laborohastaRp").value = "";
    document.getElementById("observacionesrp").value = "";
  }

  //Función que resetea los valores del formulario reintegro de personal, no se utiliza el boton tipo "reset" porque hay valores de inputs necesarios ocultos
  function limpiarFormrip(){
    document.getElementById("tipodereintegro").value = "";
    document.getElementById("perteneceProyecto").value = "";
    document.getElementById("fechaReintegrorip").value = "";
    document.getElementById("observacionesrip").value = "";
  }

  //Función que resetea los valores del formulario permiso por embarazo, no se utiliza el boton tipo "reset" porque hay valores de inputs necesarios ocultos
  function limpiarFormemb(){
    document.getElementById("adjuntoPruebaembarazo").value = "";
    document.getElementById("adjuntoEpicrisis").value = "";
    document.getElementById("fechaProbabledelparto").value = "";
  }

  //Función que resetea los valores del formulario vacaciones, no se utiliza el boton tipo "reset" porque hay valores de inputs necesarios ocultos
  function limpiarFormv(){
    document.getElementById("fechaSolicitud").value = "";
    document.getElementById("fechaIngreso").value = "";
    document.getElementById("fechaDesde").value = "";
    document.getElementById("fechaHasta").value = "";
    document.getElementById("diasDisfrutados").value = "";
    document.getElementById("diasCompensados").value = "";
    document.getElementById("diasLiquidados").value = "";
    document.getElementById("adjuntoDocumentov").value = "";
    document.getElementById("autorizacionColaboradorv").value = "";
  }

  //función que activa el input hora final de tipo time
  function activarHorafinal(){
    if (document.getElementById("horaFinal").disabled == false){
      horasPermiso();
    }
    document.getElementById("horaFinal").disabled = false;
  }

  //función que envia al servidor los datos consignados en el formulario estado de embarazo
  function datosEstadoembarazo(form){
    event.preventDefault();
    //encendemos boton con spinner cargando...
    document.querySelector('#registrarNovedadembarazo').classList.toggle("d-none");
    document.querySelector('#botonGuardando').classList.toggle("d-none");
    //console.log(form);
    google.script.run
    .withSuccessHandler(function() {
      alert('Los datos fueron enviados exitosamente.');
      //ocultamos boton con spinner cargando...
      document.querySelector('#registrarNovedadembarazo').classList.toggle('d-none');
      document.querySelector('#botonGuardando').classList.toggle('d-none');
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadformEmbarazo( form )
  }

  //función que recibe los datos de la base de colaboradores que se utilizan para autocompletar el formulario de registro absentismo
  function enviarDatosautocomplete( datos ){
    var formatced = datos[1].replaceAll(/[\[\]]/g, '');
    var cedulasDB = formatced.split(',');
    var fomattotal = datos[0].replaceAll(/[[\[\]'"]+/g, '');
    var bdtotal = fomattotal.split(",");
    /*$("#formcedula").autocomplete({
      minLength: 1,
      source: cedulasDB,
      select: function (event, ui) { 
        console.log(ui);
        var cedulaSel = ui.item.value;
        //buscamos el indice del campo seleccionado para poder diligenciar los datos del formulario automáticamente
        var encontrarIndice = bdtotal.indexOf(cedulaSel);
        //se asignan los valores correspondientes de acuerdo al número de cédula seleccionado en el formulario de absentismo
        document.getElementById("formcolaborador").value = bdtotal[encontrarIndice+1];
        document.getElementById("formregional").value = bdtotal[encontrarIndice+11];
        document.getElementById("formoficina").value = bdtotal[encontrarIndice+12];
        document.getElementById("formcargo").value = bdtotal[encontrarIndice+3];
        document.getElementById("formselecttipoabsentismo").disabled = false;
        try{
          document.getElementById("dataced").value = cedulaSel;
          document.getElementById("dataArea").value = bdtotal[encontrarIndice+12];
        }
        catch(err){
          document.getElementById("datacedpnr").value = cedulaSel;
          document.getElementById("dataAreapnr").value = bdtotal[encontrarIndice+12];
        }
        try{
          document.getElementById("datacedRp").value = cedulaSel;
          document.getElementById("dataAreaRp").value = bdtotal[encontrarIndice+12];
        }
        catch(err){
        }
      }
    });*/
    $("#formcedula").on("keydown", function(event) {
    if (event.which === 13) {
      event.preventDefault(); // Evita el comportamiento predeterminado del Enter (enviar el formulario, etc.)
      // Aquí puedes llamar a la función que deseas ejecutar al presionar Enter
      var cedulaSel = $("#formcedula").val();
      //var cedulaSel = ui.item.value;
        //buscamos el indice del campo seleccionado para poder diligenciar los datos del formulario automáticamente
        var encontrarIndice = bdtotal.indexOf(cedulaSel);
        if(encontrarIndice == -1){
          alert("El número de cédula ingresado no se encuentra en la base de datos");
          document.getElementById("formcolaborador").value = "";
          document.getElementById("formregional").value = "";
          document.getElementById("formoficina").value = "";
          document.getElementById("formcargo").value = "";
          document.getElementById("formselecttipoabsentismo").disabled = true;
        }
        else{
        //se asignan los valores correspondientes de acuerdo al número de cédula seleccionado en el formulario de absentismo
        document.getElementById("formcolaborador").value = bdtotal[encontrarIndice+1];
        document.getElementById("formregional").value = bdtotal[encontrarIndice+11];
        document.getElementById("formoficina").value = bdtotal[encontrarIndice+12];
        document.getElementById("formcargo").value = bdtotal[encontrarIndice+3];
        document.getElementById("formtipo").value = bdtotal[encontrarIndice+10];
        document.getElementById("formselecttipoabsentismo").disabled = false;
        try{
          document.getElementById("dataced").value = cedulaSel;
          document.getElementById("dataArea").value = bdtotal[encontrarIndice+12];
        }
        catch(err){
          document.getElementById("datacedpnr").value = cedulaSel;
          document.getElementById("dataAreapnr").value = bdtotal[encontrarIndice+12];
        }
        try{
          document.getElementById("datacedRp").value = cedulaSel;
          document.getElementById("dataAreaRp").value = bdtotal[encontrarIndice+12];
        }
        catch(err){
        }
       }
     }
    });

    desactivarLoading();
  }

  //función que recibe los datos de la base de colaboradores que se utilizan para autocompletar el formulario de vacaciones
  function enviarDatosautocompletevacaciones( datos ){
    var formatced = datos[1].replaceAll(/[\[\]]/g, '');
    var cedulasDB = formatced.split(',');
    var fomattotal = datos[0].replaceAll(/[[\[\]'"]+/g, '');
    var bdtotal = fomattotal.split(",");
    /*$("#formcedula").autocomplete({
      minLength: 1,
      source: cedulasDB,
      select: function (event, ui) { 
        var cedulaSel = ui.item.value;
        //buscamos el indice del campo seleccionado para poder diligenciar los datos del formulario automáticamente
        var encontrarIndice = bdtotal.indexOf(cedulaSel);
        //se asignan los valores correspondientes de acuerdo al número de cédula seleccionado en el formulario de absentismo
        document.getElementById("formcolaborador").value = bdtotal[encontrarIndice+1];
        document.getElementById("formregional").value = bdtotal[encontrarIndice+11];
        document.getElementById("formoficina").value = bdtotal[encontrarIndice+12];
        document.getElementById("formcargo").value = bdtotal[encontrarIndice+3];
      }
    });*/
    $("#formcedula").on("keydown", function(event) {
    if (event.which === 13) {
      event.preventDefault(); // Evita el comportamiento predeterminado del Enter (enviar el formulario, etc.)
      // Aquí puedes llamar a la función que deseas ejecutar al presionar Enter
      var cedulaSel = $("#formcedula").val();
      var encontrarIndice = bdtotal.indexOf(cedulaSel);
      if(encontrarIndice == -1){
          alert("El número de cédula ingresado no se encuentra en la base de datos");
          document.getElementById("formcolaborador").value = "";
          document.getElementById("formregional").value = "";
          document.getElementById("formoficina").value = "";
          document.getElementById("formcargo").value = "";
          document.getElementById("tituloTipopermiso").style.display = "none";
          document.getElementById("menuVacaciones").style.display = "none";
        }
      else{
        //se asignan los valores correspondientes de acuerdo al número de cédula seleccionado en el formulario de absentismo
        document.getElementById("formcolaborador").value = bdtotal[encontrarIndice+1];
        document.getElementById("formregional").value = bdtotal[encontrarIndice+11];
        document.getElementById("formoficina").value = bdtotal[encontrarIndice+12];
        document.getElementById("formcargo").value = bdtotal[encontrarIndice+3];
        document.getElementById("formtipo").value = bdtotal[encontrarIndice+10];
        document.getElementById("tituloTipopermiso").style.display = "block";
        document.getElementById("menuVacaciones").style.display = "block";
      }
    }
    });
    desactivarLoading();
  }


  //función que envia al servidor el número de cédula seleccionado para la opción registro de absentismo
  function buscarCedulas(){
    activarLoading();
    event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarDatosautocomplete ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatosautocompleteced(); //función de respuesta del lado del cliente
  }

  

  //función que envia al servidor el número de cédula seleccionado para la opción de vacaciones
  function buscarCedulasvacaciones(){
    alert("1. Recuerde que las solicitudes de vacaciones en disfrute y compensadas, deben ser solicitadas con 15 días hábiles de anticipación y estar previamente socializadas con su líder inmediato.\n\n2. Si la solicitud de vacaciones incluye días compensados, recuerda anexar una carta formal de solicitud indicando la cantidad de días que deseas como compensadas.");
    activarLoading();
    event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarDatosautocompletevacaciones ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatosautocompleteced(); //función de respuesta del lado del cliente
  }

  //función que organiza los datos de la tabla pendientes aprobación para los diferentes tipos de absentismo
  function enviarDatospendientesaprobacion( datos ){
    if (datos.length > 0){
        var resultados = document.getElementById('table');
        resultados.innerHTML = '';
        table = [];
        $('#loadingModal').modal('hide');
        var datostablas = [['Número Predial'], ['Avalúo'], ['Área Terreno'], ['Área Construcción'], ['Matricula'], ['Dirección']];
        var datosTable = [];
        for (i=0; i < datos.length; i++){
          if(datos[i][16] == 'Estado de embarazo'){
            datosTable.push(['Estado de embarazo', datos[i][0], datos[i][3], datos[i][4], datos[i][1]]);
          }
          else if(datos[i][1] == 'Permiso remunerado'){
            datosTable.push(['Permiso remunerado',  datos[i][0], datos[i][5], datos[i][6], datos[i][3]]);
          }
          else if(datos[i][1] == 'Permiso no remunerado'){
            datosTable.push(['Permiso no remunerado',  datos[i][0], datos[i][5], datos[i][6], datos[i][3]]);
          }
          else if(datos[i][24] == 'Retiro de personal'){
            datosTable.push(['Retiro de personal',  datos[i][0], datos[i][3], datos[i][4], datos[i][1]]);
          }
          else if(datos[i][18] == 'Reintegro de personal'){
            datosTable.push(['Reintegro de personal',  datos[i][0], datos[i][3], datos[i][4], datos[i][1]]);
          }
          else if(datos[i][33] == 'Vacaciones'){
            datosTable.push(['Vacaciones',  datos[i][0], datos[i][3], datos[i][4], datos[i][1]]);
          }
        }
        var select = datosTable;
        var filtro = "pendienteAprobacionembarazo";
        buildTableSelect(datostablas, select, filtro);
      }
    //}
    else{
      alert("No existen registros pendientes");
      /*$('body').removeClass('modal-open');
      $('.modal-backdrop').remove();*/
      $('#loadingModal').modal('hide');
    }
  }

  //función que organiza los datos de la tabla historial de registro para los diferentes tipos de absentismo
  function enviarDatoshistorialregistro( datos ){
    if (datos.length > 0){
        var resultados = document.getElementById('table');
        resultados.innerHTML = '';
        table = [];
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        var datostablas = [[['Número Predial'], ['Avalúo'], ['Área Terreno'], ['Área Construcción'], ['Matricula'], ['Dirección']]];
        var datosTable = [];
        for (i=0; i < datos.length; i++){
          if(datos[i][16] == 'Estado de embarazo'){
            datosTable.push(['Estado de embarazo', datos[i][0], datos[i][3], datos[i][4], datos[i][1], datos[i][14]]);
          }
          else if(datos[i][1] == 'Permiso remunerado'){
            datosTable.push(['Permiso remunerado',  datos[i][0], datos[i][5], datos[i][6], datos[i][3], datos[i][26]]);
          }
          else if(datos[i][1] == 'Permiso no remunerado'){
            datosTable.push(['Permiso no remunerado',  datos[i][0], datos[i][5], datos[i][6], datos[i][3], datos[i][26]]);
          }
          else if(datos[i][24] == 'Retiro de personal'){
            datosTable.push(['Retiro de personal',  datos[i][0], datos[i][3], datos[i][4], datos[i][1], datos[i][15]]);
          }
          else if(datos[i][18] == 'Reintegro de personal'){
            datosTable.push(['Reintegro de personal',  datos[i][0], datos[i][3], datos[i][4], datos[i][1], datos[i][17]]);
          }
          else if(datos[i][33] == 'Vacaciones'){
            datosTable.push(['Vacaciones',  datos[i][0], datos[i][3], datos[i][4], datos[i][1], datos[i][24]]);
          }
        }
        var select = datosTable;
        var filtro = "historialRegistro";
        buildTableSelect(datostablas, select, filtro);
      }
    //}
    else{
      alert("No existen resgistros pendientes");
    }
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla pendiente aprobación para estado de embarazo
  function datosColpendiente( idSol ){
    $('#estadoEmbarazomodal').modal("show");
    document.getElementById("observacionesTh").value = "";
    event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarPendientesfinalizar ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitud( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla historial de registro para estado de embarazo
  function datosHistorialeemb( idSol ){
    //$('#estadoEmbarazomodalhistorial').modal("show");
    //document.getElementById("observacionesTh").value = "";
    event.preventDefault();
    google.script.run
    .withSuccessHandler( diligenciarModalemb ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitud( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla historial de registro para permiso remunerado y no remunerado
  function datosHistorialpr( idSol ){
    //$('#permisoRemuneradomodalhistorial').modal("show");
    //document.getElementById("observacionesTh").value = "";
    event.preventDefault();
    google.script.run
    .withSuccessHandler( diligenciarModalpr ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitudpr( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla historial de registro para reintegro de personal
  function datosHistorialrp( idSol ){
    //$('#permisoRemuneradomodalhistorial').modal("show");
    //document.getElementById("observacionesTh").value = "";
    event.preventDefault();
    google.script.run
    .withSuccessHandler( diligenciarModalrp ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitudrp( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla historial de registro para retiro de personal
  function datosHistorialrip( idSol ){
    //$('#permisoRemuneradomodalhistorial').modal("show");
    //document.getElementById("observacionesTh").value = "";
    event.preventDefault();
    google.script.run
    .withSuccessHandler( diligenciarModalrip ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitudrip( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla historial de registro para vacaciones
  function datosHistorialv( idSol ){
    //$('#permisoRemuneradomodalhistorial').modal("show");
    //document.getElementById("observacionesTh").value = "";
    event.preventDefault();
    google.script.run
    .withSuccessHandler( diligenciarModalv ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitudv( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla pendiente aprobación para permiso remunerado
  function datosColpendientepr( idSol ){
    $('#permisoRemuneradomodal').modal("show");
    event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarPendientesfinalizarpr ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitudpr( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla pendiente aprobación para retiro de personal
  function datosColpendienterp( idSol ){
    $('#retiroPersonalmodal').modal("show");
    event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarPendientesfinalizarrp ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitudrp( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla pendiente aprobación para solicitud de vacaciones
  function datosColpendientev( idSol ){
    $('#Vacacionesmodal').modal("show");
    event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarPendientesfinalizarv ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitudv( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el id de la solicitud seleccionada en la tabla pendiente aprobación para solicitud reintegro de personal
  function datosColpendienterip( idSol ){
    $('#reintegroPersonalmodal').modal("show");
    event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarPendientesfinalizarrip ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitudrip( idSol ); //función de respuesta del lado del cliente
  }

  //funcion que recibe el los datos del registro seleccionado en la tabla historial de registro
  function datotablaHistorialderegistro( row ){
    var fechasolicitud = formatDate(row[4]);
    document.getElementById("formtipoabsentismo").value = row[0];
    document.getElementById("formcedula").value = row[3];
    document.getElementById("formcolaborador").value = row[2];
    document.getElementById("formidsolicitud").value = row[1];
    document.getElementById("formfechasolicitud").value = fechasolicitud;
    document.getElementById("formestado").value = row[5];
    document.getElementById("tituloTipopermiso").style.display = 'block';
    document.getElementById("tituloTipopermiso").innerHTML = row[0];
    if( row[5] !== 'devuelto'){
      document.getElementById("limpiarRegistro").style.display = 'none';
      document.getElementById("registrarNovedadembarazo").style.display = 'none';
      document.getElementById("labellinkPruebaembarazo").style.display = 'flex';
      document.getElementById("labellinkEpicrisis").style.display = 'flex';
      document.getElementById("linkPruebaembarazo").style.display = 'flex';
      document.getElementById("linkEpicrisis").style.display = 'flex';
      document.getElementById("labeladjuntoPruebaembarazo").style.display = 'none';
      document.getElementById("labeladjuntoEpicrisis").style.display = 'none';
      document.getElementById("adjuntoPruebaembarazo").style.display = 'none';
      document.getElementById("adjuntoEpicrisis").style.display = 'none';
      document.getElementById("labelobservacionesTh").style.display = 'none';
      document.getElementById("observacionesTh").style.display = 'none';
    }
    else{
      document.getElementById("limpiarRegistro").style.display = 'flex';
      document.getElementById("registrarNovedadembarazo").style.display = 'flex';
      document.getElementById("labellinkPruebaembarazo").style.display = 'flex';
      document.getElementById("labellinkEpicrisis").style.display = 'flex';
      document.getElementById("linkPruebaembarazo").style.display = 'flex';
      document.getElementById("linkEpicrisis").style.display = 'flex';
      document.getElementById("labeladjuntoPruebaembarazo").style.display = 'flex';
      document.getElementById("labeladjuntoEpicrisis").style.display = 'flex';
      document.getElementById("adjuntoPruebaembarazo").style.display = 'flex';
      document.getElementById("adjuntoEpicrisis").style.display = 'flex';
      document.getElementById("labelobservacionesTh").style.display = 'flex';
      document.getElementById("observacionesTh").style.display = 'flex';
    }
    if( row[0] == 'Estado de embarazo'){
     document.getElementById("editarEstadodeembarazo").style.display = 'flex'; 
     datosHistorialregistro( row[1] );
    }
  }

  function datosHistorialregistro( idSol ){
    event.preventDefault();
    google.script.run
    .withSuccessHandler( llenarDatahistorialregistro ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesporsolicitud( idSol ); //función de respuesta del lado del cliente
  }

  function llenarDatahistorialregistro( data ){
    document.getElementById("linkPruebaembarazo").href = data[0][8];
    document.getElementById("linkEpicrisis").href = data[0][9];
    document.getElementById("autorizacionColaborador").value = data[0][2];
    var fechaProbabledelparto = formatDate(data[0][10]);
    document.getElementById("fechaProbabledelparto").value = fechaProbabledelparto;
    //document.getElementById("adjuntoPruebaembarazo").innerHTMLautorizacionColaborador
    if( data[0][14] == 'devuelto'){
      document.getElementById("observacionesTh").value = data[0][13];
      document.getElementById("autorizacionColaborador").disabled = false;
      document.getElementById("fechaProbabledelparto").disabled = false;
    }
    else{
       document.getElementById("autorizacionColaborador").disabled = true;
       document.getElementById("fechaProbabledelparto").disabled = true;
    }
  }

  function formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  //función que carga los datos en el modal y que estan guardados en la hoja estado de embarazo
  function enviarPendientesfinalizar( datos ){
    document.getElementById('formcolaborador').value = datos[0][3];
    document.getElementById('idsolicitud').value = datos[0][0];
    var urlEstadoembarazo = datos[0][8];
    var urlEpicrisis = datos[0][9];
    document.getElementById('linkPruebaembarazo').setAttribute('href', urlEstadoembarazo);
    document.getElementById('linkEpicrisis').setAttribute('href', urlEpicrisis);
    document.getElementById('autorizacionColaborador').value = datos[0][2];
    document.getElementById('fechaProbabledelparto').value = datos[0][10];
    document.getElementById('cancelarsolicitudemb').style.display = 'block';
  }

  //función que carga los datos en el modal historial de registro y que estan guardados en la hoja estado de embarazo
  function diligenciarModalemb( datos ){
    if(datos[0][14] == 'devuelto'){
      //document.getElementById('menuOpcionedicionemb').style.display = 'block';
      document.getElementById('menuEditarpruebaembarazo').style.display = 'block';
      document.getElementById('menuEditarepicrisis').style.display = 'block';
      document.getElementById("corregirEmb").style.display = 'block';
      document.getElementById('corregirEmb').innerHTML = 'Guardar cambios';
      document.getElementById('editarAutorizacioncolaborador').disabled = false;
      document.getElementById('editarFechaprobabledelparto').disabled = false;
      //document.getElementById('corregirEmb').style.display = 'block';
      //document.getElementById('corregirEmb').innerHTML = 'Guardar cambios';
    }
    else{
      document.getElementById("corregirEmb").style.display = 'none';
      //document.getElementById('menuOpcionedicionemb').style.display = 'none';
      document.getElementById('corregirEmb').style.display = 'none';
      document.getElementById('menuEditarpruebaembarazo').style.display = 'none';
      document.getElementById('menuEditarepicrisis').style.display = 'none';
      //document.getElementById('menuEditarautorizacion').style.display = 'none';
      document.getElementById('editarAutorizacioncolaborador').disabled = true;
      document.getElementById('editarFechaprobabledelparto').disabled = true;
      document.getElementById('menuEditarfechaparto').style.display = 'none';
    }
    document.getElementById('formcolaboradorh').value = datos[0][3];
    document.getElementById('idsolicitudh').value = datos[0][0];
    var urlEstadoembarazo = datos[0][8];
    var urlEpicrisis = datos[0][9];
    if(urlEstadoembarazo == "N/A"){
      document.getElementById("linkPruebaembarazoh").style.display = 'none';
      document.getElementById("botonsinadjuntoemb").style.display = 'block';
    }
    else{
      document.getElementById("linkPruebaembarazoh").style.display = 'block'; 
      document.getElementById('linkPruebaembarazoh').setAttribute('href', urlEstadoembarazo);
      document.getElementById("botonsinadjuntoemb").style.display = 'none';
    }
    if(urlEpicrisis == "N/A"){
      document.getElementById("linkEpicrisish").style.display = 'none';
      document.getElementById("botonsinadjuntoepi").style.display = 'block';
    }
    else{
      document.getElementById("linkEpicrisish").style.display = 'block'; 
      document.getElementById('linkEpicrisish').setAttribute('href', urlEpicrisis);
      document.getElementById("botonsinadjuntoepi").style.display = 'none';
    }
    
    //document.getElementById('autorizacionColaboradorh').value = datos[0][2];
    document.getElementById('menuEditarautorizacion').style.display = 'block';
    document.getElementById('menuEditarfechaparto').style.display = 'block';
    document.getElementById('editarAutorizacioncolaborador').value = datos[0][2];
    //document.getElementById('fechaProbabledelpartoh').value = datos[0][10];
    document.getElementById('editarFechaprobabledelparto').value = datos[0][10];
    document.getElementById('usuarioRevisionembh').value = datos[0][12];
    document.getElementById('observacionRevisionembh').value = datos[0][13];
    document.getElementById('fecheRevisionh').value = datos[0][15];
    document.getElementById('estadoRevisionh').value = datos[0][14];
    desactivarLoading();
    $('#estadoEmbarazomodalhistorial').modal("show");
  }

  //función que carga los datos en el modal historial de registro y que estan guardados en la hoja retiro de personal
  function diligenciarModalrp( datos ){
    if(datos[0][15] == 'Devuelto jefe inmediato' || datos[0][15] == 'Devuelto lider regional' || datos[0][15] == 'Devuelto responsable th'){
      document.getElementById('menuEditarcartarenunciarp').style.display = 'block';
      document.getElementById("corregirRp").style.display = 'block';
      document.getElementById('corregirRp').innerHTML = 'Guardar cambios';
      document.getElementById('editarLaborohastarp').disabled = false;
      document.getElementById('editarObservacionesrp').disabled = false;
    }
    else{
      document.getElementById('menuEditarcartarenunciarp').style.display = 'none';
      document.getElementById("corregirRp").style.display = 'none';
      document.getElementById('editarLaborohastarp').disabled = true;
      document.getElementById('editarObservacionesrp').disabled = true;
    }
    document.getElementById('usuarioRevisionrp').value = datos[0][12];
    document.getElementById('observacionRevisionrp').value = datos[0][14];
    document.getElementById('fechaRevisionrp').value = datos[0][13];
    document.getElementById('estadoRevisionrp').value = datos[0][15];
    document.getElementById('formcolaboradorrp').value = datos[0][3];
    document.getElementById('idsolicitudrp').value = datos[0][0];
    document.getElementById('editarFecharegistrorp').value = datos[0][1];
    var urlCartarenunciarp = datos[0][8];
    if(urlCartarenunciarp == "N/A"){
      document.getElementById("linkCartarenunciarp").style.display = 'none';
      document.getElementById("botonsinadjuntocartarp").style.display = 'block';
    }
    else{
      document.getElementById("linkCartarenunciarp").style.display = 'block'; 
      document.getElementById('linkCartarenunciarp').setAttribute('href', urlCartarenunciarp);
      document.getElementById("botonsinadjuntocartarp").style.display = 'none';
    }
    document.getElementById('editarLaborohastarp').value = datos[0][9];
    document.getElementById('editarObservacionesrp').value = datos[0][10];
    desactivarLoading();
    $('#retiroPersonalhistorial').modal("show");
  }

  //función que carga los datos en el modal historial de registro y que estan guardados en la hoja reintegro de personal
  function diligenciarModalrip( datos ){
    if(datos[0][17] == 'Devuelto responsable th'){
      document.getElementById("corregirRip").style.display = 'block';
      document.getElementById('editarTiporeintegrorip').disabled = false;
      document.getElementById('editarProyectorip').disabled = false;
      document.getElementById('editarFechareintegrorip').disabled = false;
      document.getElementById('editarObservacionesrip').disabled = false;
    }
    else{
      document.getElementById("corregirRip").style.display = 'none';
      document.getElementById('editarTiporeintegrorip').disabled = true;
      document.getElementById('editarProyectorip').disabled = true;
      document.getElementById('editarFechareintegrorip').disabled = true;
      document.getElementById('editarObservacionesrip').disabled = true;
    }
    document.getElementById('usuarioRevisionrip').value = datos[0][14];
    document.getElementById('observacionRevisionrip').value = datos[0][16];
    document.getElementById('fechaRevisionrip').value = datos[0][15];
    document.getElementById('estadoRevisionrip').value = datos[0][17];
    document.getElementById('formcolaboradorrip').value = datos[0][3];
    document.getElementById('idsolicitudrip').value = datos[0][0];
    document.getElementById('editarTiporeintegrorip').value = datos[0][8];
    document.getElementById('editarProyectorip').value = datos[0][9];
    document.getElementById('editarFechareintegrorip').value = datos[0][10];
    document.getElementById('editarObservacionesrip').value = datos[0][11];
    desactivarLoading();
    $('#reintegroPersonalhistorial').modal("show");
  }

  //función que carga los datos en el modal historial de registro y que estan guardados en la hoja retiro de personal
  function diligenciarModalv( datos ){
    if(datos[0][24] == 'Devuelto jefe inmediato' || datos[0][24] == 'Devuelto lider regional' || datos[0][24] == 'Devuelto responsable th'){
      document.getElementById('menuEditardocumentoadjuntov').style.display = 'block';
      document.getElementById("corregirV").style.display = 'block';
      document.getElementById('editarFechasolicitudv').disabled = false;
      document.getElementById('editarFechaingresov').disabled = false;
      document.getElementById('editarDesdev').disabled = false;
      document.getElementById('editarHastav').disabled = false;
      document.getElementById('editarFechareingresov').disabled = true;
      document.getElementById('editarDiasdisfrutadosv').disabled = true;
      document.getElementById('editarDiascompensadov').disabled = false;
      document.getElementById('editarDiasliquidadosv').disabled = true;
      document.getElementById('editarAutorizacioncolaboradorv').disabled = false;
    }
    else{
      document.getElementById('menuEditardocumentoadjuntov').style.display = 'none';
      document.getElementById("corregirV").style.display = 'none';
      document.getElementById('editarFechasolicitudv').disabled = true;
      document.getElementById('editarFechaingresov').disabled = true;
      document.getElementById('editarDesdev').disabled = true;
      document.getElementById('editarHastav').disabled = true;
      document.getElementById('editarFechareingresov').disabled = true;
      document.getElementById('editarDiasdisfrutadosv').disabled = true;
      document.getElementById('editarDiascompensadov').disabled = true;
      document.getElementById('editarDiasliquidadosv').disabled = true;
      document.getElementById('editarAutorizacioncolaboradorv').disabled = true;
    }
    document.getElementById('datacedv').value = datos[0][4];
    document.getElementById('usuarioRevisionv').value = datos[0][21];
    document.getElementById('observacionRevisionv').value = datos[0][23];
    document.getElementById('fechaRevisionv').value = datos[0][22];
    document.getElementById('estadoRevisionv').value = datos[0][24];
    document.getElementById('formcolaboradorv').value = datos[0][2];
    document.getElementById('idsolicitudv').value = datos[0][0];
    document.getElementById('editarFechasolicitudv').value = datos[0][8];
    document.getElementById('editarFechaingresov').value = datos[0][9];
    document.getElementById('editarDesdev').value = datos[0][10];
    document.getElementById('editarHastav').value = datos[0][11];
    document.getElementById('editarFechareingresov').value = datos[0][16];
    document.getElementById('editarDiasdisfrutadosv').value = datos[0][13];
    document.getElementById('editarDiascompensadov').value = datos[0][12];
    document.getElementById('editarDiasliquidadosv').value = datos[0][17];
    document.getElementById('editarAutorizacioncolaboradorv').value = datos[0][19]; 
    var urlDocumentov = datos[0][18];
    if(urlDocumentov == "N/A"){
      document.getElementById("linkDocumentoadjuntov").style.display = 'none';
      document.getElementById("botonsinadjunto").style.display = 'block';
    }
    else{
      document.getElementById("linkDocumentoadjuntov").style.display = 'block'; 
      document.getElementById('linkDocumentoadjuntov').setAttribute('href', urlDocumentov);
      document.getElementById("botonsinadjunto").style.display = 'none';
    }
    desactivarLoading();
    $('#vacacioneshistorial').modal("show");
  }

  //función que carga los datos en el modal historial de registro y que estan guardados en la hoja estado de embarazo
  function diligenciarModalpr( datos ){
    document.getElementById('formcolaboradoreditPr').value = datos[0][5];
    document.getElementById('datacededitpr').value = datos[0][6];
    document.getElementById('idsolicitudeditPr').value = datos[0][0];
    document.getElementById('mestadorevisionPr').style.display = 'block';
    document.getElementById('estadoRevisionepr').value = datos[0][26];
    if(datos[0][2] == 'Calamidad familiar' || datos[0][2] == 'Matrimonio' || datos[0][2] == 'Permiso remunerado'){
      //ocultamos los inputs de los otros tipos de permiso
      document.getElementById('mregistrocivilPr').style.display = 'none';
      document.getElementById('menuRegistrocivilpr').style.display = 'none';
      document.getElementById('menuObservacionespr').style.display = 'none';
      document.getElementById('menuHorainiciopr').style.display = 'none';
      document.getElementById('menuHorafinalpr').style.display = 'none';
      document.getElementById('menuTiempopermisopr').style.display = 'none';
      document.getElementById('mactadefuncionPr').style.display = 'none';
      document.getElementById('menuActadedefuncionpr').style.display = 'none';
      document.getElementById('menuDetallepermisopnr').style.display = 'none';
      //mostramos los inputs correspondientes
      document.getElementById('mtipopermisoPr').style.display = 'block';
      document.getElementById('menuFecharegistropr').style.display = 'block';
      document.getElementById('menuFechainiciopr').style.display = 'block';
      document.getElementById('menuFechafinalizacionpr').style.display = 'block';
      document.getElementById('menuFechareingresopr').style.display = 'block';
      document.getElementById('menuTotaldiaspermisopr').style.display = 'block';
      document.getElementById('menuEditarautorizacionpr').style.display = 'block';
      document.getElementById('mdocumentoadjuntoPr').style.display = 'block';
      //diligenciamos los datos en los inputs correspondientes
      document.getElementById('tipopermisoPr').value = datos[0][2];
      var fechaderegistro = datos[0][3];
      var fecharegistroComp = moment(fechaderegistro, 'DD/MM/YYYY');
      var fecharegistroForm = moment(fecharegistroComp.format('YYYY-MM-DD'));  
      document.getElementById('editarFecharegistropr').value = fecharegistroForm._i;
      document.getElementById('editarFechainiciopr').value = datos[0][15];
      document.getElementById('editarFechafinalizacionpr').value = datos[0][16];
      document.getElementById('editarFechareingresopr').value = datos[0][17];
      document.getElementById('editarTotaldiaspermisopr').value = datos[0][18];
      document.getElementById('editarAutorizacioncolaboradorpr').value = datos[0][4];
      var urldoc = datos[0][10];
      if(urldoc == "N/A"){
        document.getElementById("documentoadjuntoPr").style.display = 'none';
        document.getElementById("botonsinadjuntopr").style.display = 'flex';
      }
      else{
        document.getElementById("documentoadjuntoPr").style.display = 'flex'; 
        document.getElementById('documentoadjuntoPr').setAttribute('href', urldoc);
        document.getElementById("botonsinadjuntopr").style.display = 'none';
      }
      //activamos el menu de editar cuando la solicitud ha sido devuelta
      if(datos[0][26] == 'Devuelto jefe inmediato' || datos[0][26] == 'Devuelto gerente' || datos[0][26] == 'Devuelto lider regional' || datos[0][26] == 'Devuelto responsable th'){
        document.getElementById('editarFechainiciopr').disabled = false;
        document.getElementById('editarFechafinalizacionpr').disabled = false;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = false;
        //document.getElementById('editarFecharegistropr').disabled = false;
        document.getElementById('menuAdjuntardocumentopr').style.display = 'block';
        document.getElementById('corregirPr').style.display = 'block';
        if(datos[0][26] == 'Devuelto jefe inmediato'){
          document.getElementById('usuarioRevisionepr').value = datos[0][23];
          document.getElementById('fechaRevisionepr').value = datos[0][24];
          document.getElementById('observacionRevisionepr').value = datos[0][25];
        }
        else if(datos[0][26] == 'Devuelto gerente'){
          document.getElementById('usuarioRevisionepr').value = datos[0][27];
          document.getElementById('fechaRevisionepr').value = datos[0][28];
          document.getElementById('observacionRevisionepr').value = datos[0][29];
        }
        else if(datos[0][26] == 'Devuelto lider regional'){
          document.getElementById('usuarioRevisionepr').value = datos[0][30];
          document.getElementById('fechaRevisionepr').value = datos[0][31];
          document.getElementById('observacionRevisionepr').value = datos[0][32];
        }
        else if(datos[0][26] == 'Devuelto responsable th'){
          document.getElementById('usuarioRevisionepr').value = datos[0][33];
          document.getElementById('fechaRevisionepr').value = datos[0][34];
          document.getElementById('observacionRevisionepr').value = datos[0][35];
        }
        document.getElementById('tituloDatosrevision').style.display = 'block';
      }
      else{
        document.getElementById('usuarioRevisionepr').value = datos[0][23];
        document.getElementById('fechaRevisionepr').value = datos[0][24];
        document.getElementById('observacionRevisionepr').value = datos[0][25];
        document.getElementById('editarFechainiciopr').disabled = true;
        document.getElementById('editarFechafinalizacionpr').disabled = true;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarFecharegistropr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = true;
        document.getElementById('menuAdjuntardocumentopr').style.display = 'none';
        document.getElementById('corregirPr').style.display = 'none';
      }
    }
    else if(datos[0][2] == 'Luto'){
      //ocultamos los inputs de los otros tipos de permiso
      document.getElementById('menuFecharegistropr').style.display = 'none';
      document.getElementById('mdocumentoadjuntoPr').style.display = 'none';
      document.getElementById('menuAdjuntardocumentopr').style.display = 'none';
      document.getElementById('menuHorainiciopr').style.display = 'none';
      document.getElementById('menuHorafinalpr').style.display = 'none';
      document.getElementById('menuTiempopermisopr').style.display = 'none';
      document.getElementById('menuDetallepermisopnr').style.display = 'none';
      //mostramos los inputs correspondientes
      document.getElementById('mtipopermisoPr').style.display = 'block';
      document.getElementById('menuFechainiciopr').style.display = 'block';
      document.getElementById('menuFechafinalizacionpr').style.display = 'block';
      document.getElementById('menuFechareingresopr').style.display = 'block';
      document.getElementById('menuTotaldiaspermisopr').style.display = 'block';
      document.getElementById('menuEditarautorizacionpr').style.display = 'block';
      document.getElementById('mregistrocivilPr').style.display = 'block';
      document.getElementById('mactadefuncionPr').style.display = 'block';
      document.getElementById('menuObservacionespr').style.display = 'block';
      //diligenciamos los datos en los inputs correspondientes
      document.getElementById('tipopermisoPr').value = datos[0][2];
      document.getElementById('editarFechainiciopr').value = datos[0][15];
      document.getElementById('editarFechafinalizacionpr').value = datos[0][16];
      document.getElementById('editarFechareingresopr').value = datos[0][17];
      document.getElementById('editarTotaldiaspermisopr').value = datos[0][18];
      document.getElementById('editarAutorizacioncolaboradorpr').value = datos[0][4];
      var urlRegistrocivil = datos[0][12];
      if(urlRegistrocivil == "N/A"){
        document.getElementById("registrocivilPr").style.display = 'none';
        document.getElementById("botonsinadjuntoregistrocivilPr").style.display = 'block';
      }
      else{
        document.getElementById("registrocivilPr").style.display = 'block'; 
        document.getElementById('registrocivilPr').setAttribute('href', urlRegistrocivil);
        document.getElementById("botonsinadjuntoregistrocivilPr").style.display = 'none';
      }
      var urlActadedefuncion = datos[0][11];
      if(urlActadedefuncion == "N/A"){
        document.getElementById("actadefuncionPr").style.display = 'none';
        document.getElementById("botonsinadjuntoactadefuncionPr").style.display = 'block';
      }
      else{
        document.getElementById("actadefuncionPr").style.display = 'block'; 
        document.getElementById('actadefuncionPr').setAttribute('href', urlActadedefuncion);
        document.getElementById("botonsinadjuntoactadefuncionPr").style.display = 'none';
      }
      document.getElementById('editarObservacionespr').value = datos[0][13];
      if(datos[0][26] == 'Devuelto jefe inmediato' || datos[0][26] == 'Devuelto gerente' || datos[0][26] == 'Devuelto lider regional' || datos[0][26] == 'Devuelto responsable th'){
        document.getElementById('editarFechafinalizacionpr').disabled = false;
        document.getElementById('editarFechainiciopr').disabled = false;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = false;
        document.getElementById('editarObservacionespr').disabled = false;
        document.getElementById('menuRegistrocivilpr').style.display = 'block';
        document.getElementById('menuActadedefuncionpr').style.display = 'block';
        document.getElementById('corregirPr').style.display = 'block';
        if(datos[0][26] == 'Devuelto jefe inmediato'){
          document.getElementById('usuarioRevisionepr').value = datos[0][23];
          document.getElementById('fechaRevisionepr').value = datos[0][24];
          document.getElementById('observacionRevisionepr').value = datos[0][25];
        }
        else if(datos[0][26] == 'Devuelto gerente'){
          document.getElementById('usuarioRevisionepr').value = datos[0][27];
          document.getElementById('fechaRevisionepr').value = datos[0][28];
          document.getElementById('observacionRevisionepr').value = datos[0][29];
        }
        else if(datos[0][26] == 'Devuelto lider regional'){
          document.getElementById('usuarioRevisionepr').value = datos[0][30];
          document.getElementById('fechaRevisionepr').value = datos[0][31];
          document.getElementById('observacionRevisionepr').value = datos[0][32];
        }
        else if(datos[0][26] == 'Devuelto responsable th'){
          document.getElementById('usuarioRevisionepr').value = datos[0][33];
          document.getElementById('fechaRevisionepr').value = datos[0][34];
          document.getElementById('observacionRevisionepr').value = datos[0][35];
        }
        document.getElementById('tituloDatosrevision').style.display = 'block';
        document.getElementById('mdatosrevision').style.display = 'flex';
      }
      else{
        document.getElementById('usuarioRevisionepr').value = datos[0][23];
        document.getElementById('fechaRevisionepr').value = datos[0][24];
        document.getElementById('observacionRevisionepr').value = datos[0][25];
        document.getElementById('editarFechainiciopr').disabled = true;
        document.getElementById('editarFechafinalizacionpr').disabled = true;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = true;
        document.getElementById('editarObservacionespr').disabled = true;
        document.getElementById('menuRegistrocivilpr').style.display = 'none';
        document.getElementById('menuActadedefuncionpr').style.display = 'none';
        document.getElementById('corregirPr').style.display = 'none';
      }
    }
    else if(datos[0][2] == 'Permiso personal'){
      //ocultamos los inputs de los otros tipos de permiso
      document.getElementById('menuFecharegistropr').style.display = 'none';
      document.getElementById('menuFechafinalizacionpr').style.display = 'none';
      document.getElementById('menuFechareingresopr').style.display = 'none';
      document.getElementById('menuTotaldiaspermisopr').style.display = 'none';
      document.getElementById('menuRegistrocivilpr').style.display = 'none';
      document.getElementById('menuActadedefuncionpr').style.display = 'none';
      document.getElementById('menuDetallepermisopnr').style.display = 'none';
      document.getElementById('mregistrocivilPr').style.display = 'none';
      document.getElementById('mactadefuncionPr').style.display = 'none';
      //mostramos los inputs correspondientes
      document.getElementById('mtipopermisoPr').style.display = 'block';
      document.getElementById('menuFechainiciopr').style.display = 'block';
      document.getElementById('menuEditarautorizacionpr').style.display = 'block';
      document.getElementById('mdocumentoadjuntoPr').style.display = 'block';
      document.getElementById('menuObservacionespr').style.display = 'block';
      document.getElementById('menuHorainiciopr').style.display = 'block';
      document.getElementById('menuHorafinalpr').style.display = 'block';
      document.getElementById('menuTiempopermisopr').style.display = 'block';
      //diligenciamos los datos en los inputs correspondientes
      document.getElementById('tipopermisoPr').value = datos[0][2];
      document.getElementById('editarFechainiciopr').value = datos[0][15];
      document.getElementById('editarAutorizacioncolaboradorpr').value = datos[0][4];
      var urldoc = datos[0][10];
      if(urldoc == "N/A"){
        document.getElementById("documentoadjuntoPr").style.display = 'none';
        document.getElementById("botonsinadjuntopr").style.display = 'block';
      }
      else{
        document.getElementById("documentoadjuntoPr").style.display = 'block'; 
        document.getElementById('documentoadjuntoPr').setAttribute('href', urldoc);
        document.getElementById("botonsinadjuntopr").style.display = 'none';
      }
      document.getElementById('editarObservacionespr').value = datos[0][13];
      if(datos[0][19].length == 4){
        var horainicio = '"0'+datos[0][19]+'"';
      }
      else{
        var horainicio = '"'+datos[0][19]+'"';
      }
      document.getElementById('horaIniciopr').value = eval(horainicio);
      if(datos[0][20].length == 4){
        var horafinal = '"0'+datos[0][20]+'"';
      }
      else{
        var horafinal = '"'+datos[0][20]+'"';
      }
      document.getElementById('horaFinalpr').value = eval(horafinal);
      document.getElementById('tiempoPermisopr').value = datos[0][21];
      if(datos[0][26] == 'Devuelto jefe inmediato' || datos[0][26] == 'Devuelto gerente' || datos[0][26] == 'Devuelto lider regional' || datos[0][26] == 'Devuelto responsable th'){
        document.getElementById('editarFechainiciopr').disabled = false;
        document.getElementById('editarFechafinalizacionpr').disabled = false;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = false;
        document.getElementById('horaIniciopr').disabled = false;
        document.getElementById('horaFinalpr').disabled = false;
        document.getElementById('tiempoPermisopr').disabled = true;
        document.getElementById('editarObservacionespr').disabled = false;
        document.getElementById('menuAdjuntardocumentopr').style.display = 'block';
        document.getElementById('corregirPr').style.display = 'block';
        if(datos[0][26] == 'Devuelto jefe inmediato'){
          document.getElementById('usuarioRevisionepr').value = datos[0][23];
          document.getElementById('fechaRevisionepr').value = datos[0][24];
          document.getElementById('observacionRevisionepr').value = datos[0][25];
        }
        else if(datos[0][26] == 'Devuelto gerente'){
          document.getElementById('usuarioRevisionepr').value = datos[0][27];
          document.getElementById('fechaRevisionepr').value = datos[0][28];
          document.getElementById('observacionRevisionepr').value = datos[0][29];
        }
        else if(datos[0][26] == 'Devuelto lider regional'){
          document.getElementById('usuarioRevisionepr').value = datos[0][30];
          document.getElementById('fechaRevisionepr').value = datos[0][31];
          document.getElementById('observacionRevisionepr').value = datos[0][32];
        }
        else if(datos[0][26] == 'Devuelto responsable th'){
          document.getElementById('usuarioRevisionepr').value = datos[0][33];
          document.getElementById('fechaRevisionepr').value = datos[0][34];
          document.getElementById('observacionRevisionepr').value = datos[0][35];
        }
      }
      else{
        document.getElementById('usuarioRevisionepr').value = datos[0][23];
        document.getElementById('fechaRevisionepr').value = datos[0][24];
        document.getElementById('observacionRevisionepr').value = datos[0][25];
        document.getElementById('editarFechainiciopr').disabled = true;
        document.getElementById('editarFechafinalizacionpr').disabled = true;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = true;
        document.getElementById('horaIniciopr').disabled = true;
        document.getElementById('horaFinalpr').disabled = true;
        document.getElementById('tiempoPermisopr').disabled = true;
        document.getElementById('editarObservacionespr').disabled = true;
        document.getElementById('menuAdjuntardocumentopr').style.display = 'none';
        document.getElementById('corregirPr').style.display = 'none';
      }
    }
     else if(datos[0][2] == 'Volemos'){
      //ocultamos los inputs de los otros tipos de permiso
      document.getElementById('menuFecharegistropr').style.display = 'none';
      document.getElementById('menuEditarautorizacionpr').style.display = 'none';
      document.getElementById('menuTotaldiaspermisopr').style.display = 'none';
      document.getElementById('menuHorainiciopr').style.display = 'none';
      document.getElementById('menuHorafinalpr').style.display = 'none';
      document.getElementById('menuTiempopermisopr').style.display = 'none';
      document.getElementById('mregistrocivilPr').style.display = 'none';
      document.getElementById('menuRegistrocivilpr').style.display = 'none';
      document.getElementById('mactadefuncionPr').style.display = 'none';
      document.getElementById('menuActadedefuncionpr').style.display = 'none';
      document.getElementById('menuDetallepermisopnr').style.display = 'none';
      //mostramos los inputs correspondientes
      document.getElementById('mtipopermisoPr').style.display = 'block';
      document.getElementById('menuFechainiciopr').style.display = 'block';
      document.getElementById('menuFechafinalizacionpr').style.display = 'block';
      document.getElementById('menuFechareingresopr').style.display = 'block';
      document.getElementById('mdocumentoadjuntoPr').style.display = 'block';
      document.getElementById('menuObservacionespr').style.display = 'block';
      //diligenciamos los datos en los inputs correspondientes
      document.getElementById('tipopermisoPr').value = datos[0][2];
      document.getElementById('editarFechainiciopr').value = datos[0][15];
      document.getElementById('editarFechafinalizacionpr').value = datos[0][16];
      document.getElementById('editarFechareingresopr').value = datos[0][17];
      var urldoc = datos[0][10];
      if(urldoc == "N/A"){
        document.getElementById("botonsinadjuntopr").style.display = 'block';
        document.getElementById("documentoadjuntoPr").style.display = 'none';
      }
      else{
        document.getElementById("botonsinadjuntopr").style.display = 'none';
        document.getElementById("documentoadjuntoPr").style.display = 'block'; 
        document.getElementById('documentoadjuntoPr').setAttribute('href', urldoc);
      }
      //document.getElementById('observacionesPr').value = datos[0][13];
      document.getElementById('editarObservacionespr').value = datos[0][13];
      if(datos[0][26] == 'Devuelto jefe inmediato' || datos[0][26] == 'Devuelto gerente' || datos[0][26] == 'Devuelto lider regional' || datos[0][26] == 'Devuelto responsable th'){
        document.getElementById('editarFechainiciopr').disabled = false;
        document.getElementById('editarFechafinalizacionpr').disabled = false;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = false;
        document.getElementById('editarObservacionespr').disabled = false;
        document.getElementById('menuAdjuntardocumentopr').style.display = 'block';
        document.getElementById('corregirPr').style.display = 'block';
        if(datos[0][26] == 'Devuelto jefe inmediato'){
          document.getElementById('usuarioRevisionepr').value = datos[0][23];
          document.getElementById('fechaRevisionepr').value = datos[0][24];
          document.getElementById('observacionRevisionepr').value = datos[0][25];
        }
        else if(datos[0][26] == 'Devuelto gerente'){
          document.getElementById('usuarioRevisionepr').value = datos[0][27];
          document.getElementById('fechaRevisionepr').value = datos[0][28];
          document.getElementById('observacionRevisionepr').value = datos[0][29];
        }
        else if(datos[0][26] == 'Devuelto lider regional'){
          document.getElementById('usuarioRevisionepr').value = datos[0][30];
          document.getElementById('fechaRevisionepr').value = datos[0][31];
          document.getElementById('observacionRevisionepr').value = datos[0][32];
        }
        else if(datos[0][26] == 'Devuelto responsable th'){
          document.getElementById('usuarioRevisionepr').value = datos[0][33];
          document.getElementById('fechaRevisionepr').value = datos[0][34];
          document.getElementById('observacionRevisionepr').value = datos[0][35];
        }
        document.getElementById('tituloDatosrevision').style.display = 'block';
        document.getElementById('mdatosrevision').style.display = 'flex';
      }
      else{
        document.getElementById('usuarioRevisionepr').value = datos[0][23];
        document.getElementById('fechaRevisionepr').value = datos[0][24];
        document.getElementById('observacionRevisionepr').value = datos[0][25];
        document.getElementById('editarFechainiciopr').disabled = true;
        document.getElementById('editarFechafinalizacionpr').disabled = true;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = true;
        document.getElementById('editarObservacionespr').disabled = true;
        document.getElementById('menuAdjuntardocumentopr').style.display = 'none';
        document.getElementById('corregirPr').style.display = 'none';
      }  
    }
    else if(datos[0][2] == 'Permiso no remunerado'){
      //ocultamos los inputs de los otros tipos de permiso
      document.getElementById('menuFecharegistropr').style.display = 'none';
      document.getElementById('menuEditarautorizacionpr').style.display = 'none';
      document.getElementById('menuTotaldiaspermisopr').style.display = 'none';
      document.getElementById('menuHorainiciopr').style.display = 'none';
      document.getElementById('menuHorafinalpr').style.display = 'none';
      document.getElementById('menuTiempopermisopr').style.display = 'none';
      document.getElementById('mregistrocivilPr').style.display = 'none';
      document.getElementById('menuRegistrocivilpr').style.display = 'none';
      document.getElementById('mactadefuncionPr').style.display = 'none';
      document.getElementById('menuActadedefuncionpr').style.display = 'none';
      document.getElementById('menuObservacionespr').style.display = 'none';
      //mostramos los inputs correspondientes
      document.getElementById('menuDetallepermisopnr').style.display = 'block';
      document.getElementById('mtipopermisoPr').style.display = 'block';
      document.getElementById('menuFechainiciopr').style.display = 'block';
      document.getElementById('menuFechafinalizacionpr').style.display = 'block';
      document.getElementById('menuFechareingresopr').style.display = 'block';
      document.getElementById('mdocumentoadjuntoPr').style.display = 'block';
      
      //diligenciamos los datos en los inputs correspondientes
      document.getElementById('tipopermisoPr').value = datos[0][2];
      document.getElementById('editarFechainiciopr').value = datos[0][15];
      document.getElementById('editarFechafinalizacionpr').value = datos[0][16];
      document.getElementById('editarFechareingresopr').value = datos[0][17];
      var urldoc = datos[0][10];
      if(urldoc == "N/A"){
        document.getElementById("documentoadjuntoPr").style.display = 'none';
        document.getElementById("botonsinadjuntopr").style.display = 'block';
      }
      else{
        document.getElementById("botonsinadjuntopr").style.display = 'none';
        document.getElementById("documentoadjuntoPr").style.display = 'block'; 
        document.getElementById('documentoadjuntoPr').setAttribute('href', urldoc);
      }
      //document.getElementById('observacionesPr').value = datos[0][13];
      document.getElementById('editarDetallepermisopnr').value = datos[0][14];
      if(datos[0][26] == 'Devuelto jefe inmediato' || datos[0][26] == 'Devuelto gerente' || datos[0][26] == 'Devuelto lider regional' || datos[0][26] == 'Devuelto responsable th'){
        document.getElementById('editarFechainiciopr').disabled = false;
        document.getElementById('editarFechafinalizacionpr').disabled = false;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = false;
        document.getElementById('editarDetallepermisopnr').disabled = false;
        document.getElementById('menuAdjuntardocumentopr').style.display = 'block';
        document.getElementById('corregirPr').style.display = 'block';
        if(datos[0][26] == 'Devuelto jefe inmediato'){
          document.getElementById('usuarioRevisionepr').value = datos[0][23];
          document.getElementById('fechaRevisionepr').value = datos[0][24];
          document.getElementById('observacionRevisionepr').value = datos[0][25];
        }
        else if(datos[0][26] == 'Devuelto gerente'){
          document.getElementById('usuarioRevisionepr').value = datos[0][27];
          document.getElementById('fechaRevisionepr').value = datos[0][28];
          document.getElementById('observacionRevisionepr').value = datos[0][29];
        }
        else if(datos[0][26] == 'Devuelto lider regional'){
          document.getElementById('usuarioRevisionepr').value = datos[0][30];
          document.getElementById('fechaRevisionepr').value = datos[0][31];
          document.getElementById('observacionRevisionepr').value = datos[0][32];
        }
        else if(datos[0][26] == 'Devuelto responsable th'){
          document.getElementById('usuarioRevisionepr').value = datos[0][33];
          document.getElementById('fechaRevisionepr').value = datos[0][34];
          document.getElementById('observacionRevisionepr').value = datos[0][35];
        }
        document.getElementById('tituloDatosrevision').style.display = 'block';
        document.getElementById('mdatosrevision').style.display = 'flex';
      }
      else{
        document.getElementById('usuarioRevisionepr').value = datos[0][23];
        document.getElementById('fechaRevisionepr').value = datos[0][24];
        document.getElementById('observacionRevisionepr').value = datos[0][25];
        document.getElementById('editarDetallepermisopnr').value = datos[0][14];
        document.getElementById('editarFechainiciopr').disabled = true;
        document.getElementById('editarFechafinalizacionpr').disabled = true;
        document.getElementById('editarFechareingresopr').disabled = true;
        document.getElementById('editarTotaldiaspermisopr').disabled = true;
        document.getElementById('editarAutorizacioncolaboradorpr').disabled = true;
        document.getElementById('editarDetallepermisopnr').disabled = true;
        document.getElementById('menuAdjuntardocumentopr').style.display = 'none';
        document.getElementById('corregirPr').style.display = 'none';
      }  
    }
    desactivarLoading();
    $('#permisoRemuneradomodalhistorial').modal("show");
  }

  //función que carga los datos en el modal y que estan guardados en la hoja permiso remunerado
  function enviarPendientesfinalizarpr( datos ){
    document.getElementById("observacionesJi").value = "";
    document.getElementById("cancelarsolicitud").style.display = 'none';
    console.log(datos[0][2]);
    if(datos[0][1] == "Permiso remunerado"){
      document.getElementById('formcolaboradorpr').value = datos[0][5];
      document.getElementById('idsolicitudpr').value = datos[0][0];
      document.getElementById("finalizarPrji").innerHTML = "Aprobar";
      if( datos[0][2] == "Calamidad familiar" || datos[0][2] == "Matrimonio" || datos[0][2] == "Permiso remunerado"  || datos[0][2] == "Volemos"){
        document.getElementById("formDatosaprobji").style.display = "none";
        document.getElementById('formActadefuncion').style.display = 'none';
        document.getElementById('formRegistrocivil').style.display = 'none';
        document.getElementById('formHorainicio').style.display = 'none';
        document.getElementById('formHorafinal').style.display = 'none';
        document.getElementById('formTiempopermiso').style.display = 'none';
        document.getElementById('fechaIniciopermiso').value = datos[0][15];
        document.getElementById('fechaFinalizacionpermiso').value = datos[0][16];
        document.getElementById('fechaReingreso').value = datos[0][17];
        document.getElementById('totalDiaspermiso').value = datos[0][18];
        document.getElementById('tipoPermiso').value = datos[0][2];
        var urlDocumento = datos[0][10];
        document.getElementById('linkAdjuntodocumento').setAttribute('href', urlDocumento);
        document.getElementById('prObservaciones').value = datos[0][13];
      }
      else if(datos[0][2] == "Luto"){
        document.getElementById("formDatosaprobji").style.display = "none";
        document.getElementById('formHorainicio').style.display = 'none';
        document.getElementById('formHorafinal').style.display = 'none';
        document.getElementById('formTiempopermiso').style.display = 'none';
        document.getElementById('fechaIniciopermiso').value = datos[0][15];
        document.getElementById('fechaFinalizacionpermiso').value = datos[0][16];
        document.getElementById('fechaReingreso').value = datos[0][17];
        document.getElementById('totalDiaspermiso').value = datos[0][18];
        document.getElementById('tipoPermiso').value = datos[0][2];
        document.getElementById('formAdjuntodocumento').style.display = 'none';
        document.getElementById('formActadefuncion').style.display = 'block';
        document.getElementById('formRegistrocivil').style.display = 'block';
        var urlActadefuncion = datos[0][11];
        var urlRegistrocivil = datos[0][12];
        document.getElementById('linkadjuntoDefuncion').setAttribute('href', urlActadefuncion);
        document.getElementById('linkadjuntoRegistrocivil').setAttribute('href', urlRegistrocivil);
        document.getElementById('prObservaciones').value = datos[0][13];
      }
      else if(datos[0][2] == "Permiso personal"){
        document.getElementById("formDatosaprobji").style.display = "none";
        document.getElementById('formActadefuncion').style.display = 'none';
        document.getElementById('formRegistrocivil').style.display = 'none';
        document.getElementById('formFechafinalizacion').style.display = 'none';
        document.getElementById('formFechareingreso').style.display = 'none';
        document.getElementById('formTotaldiaspermiso').style.display = 'none';
        document.getElementById('formHorainicio').style.display = 'block';
        document.getElementById('formHorafinal').style.display = 'block';
        document.getElementById('formTiempopermiso').style.display = 'block';
        document.getElementById('fechaIniciopermiso').value = datos[0][15];
        document.getElementById('tipoPermiso').value = datos[0][2];
        var urlDocumento = datos[0][10];
        document.getElementById('linkAdjuntodocumento').setAttribute('href', urlDocumento);
        document.getElementById('horaInicio').value = datos[0][19];
        document.getElementById('horaFinal').value = datos[0][20];
        document.getElementById('tiempoPermiso').value = datos[0][21];
        document.getElementById('prObservaciones').value = datos[0][13];
      }
    }
    else if(datos[0][1] == "Permiso no remunerado"){
      document.getElementById('formcolaboradorpr').value = datos[0][5];
      document.getElementById('idsolicitudpr').value = datos[0][0];
      document.getElementById("formDatosaprobji").style.display = "none";
      document.getElementById('formActadefuncion').style.display = 'none';
      document.getElementById('formRegistrocivil').style.display = 'none';
      document.getElementById('formHorainicio').style.display = 'none';
      document.getElementById('formHorafinal').style.display = 'none';
      document.getElementById('formTiempopermiso').style.display = 'none';
      document.getElementById('fechaIniciopermiso').value = datos[0][15];
      document.getElementById('fechaFinalizacionpermiso').value = datos[0][16];
      document.getElementById('fechaReingreso').value = datos[0][17];
      document.getElementById('totalDiaspermiso').value = datos[0][18];
      document.getElementById('tipoPermiso').value = datos[0][2];
      var urlDocumento = datos[0][10];
      document.getElementById('linkAdjuntodocumento').setAttribute('href', urlDocumento);
      document.getElementById('prObservaciones').value = datos[0][14];
    }
      document.getElementById("formDatosaprobji").style.display = "none";
      document.getElementById("formDatosgerente").style.display = "none";
      document.getElementById("formDatosliderregional").style.display = "none";

      if( datos[0][26] == "Pendiente jefe inmediato"){
        document.getElementById("finalizarPrji").innerHTML = "Aprobar";
        document.getElementById("tituloFormpr").innerHTML = "Revisión jefe inmediato";
      }
      else if(datos[0][26] == "Pendiente gerente"){
        document.getElementById("finalizarPrji").innerHTML = "Aprobar";
        document.getElementById("tituloFormpr").innerHTML = "Revisión gerente";
        document.getElementById("formDatosaprobji").style.display = "flex";
        document.getElementById("fechaRevisionjefe").value = datos[0][24];
        document.getElementById("nombrejefeinmediato").value = datos[0][23];
        document.getElementById("observacionesJefe").value = datos[0][25];
      }
      else if(datos[0][26] == "Pendiente lider regional"){
        document.getElementById("finalizarPrji").innerHTML = "Aprobar";
        document.getElementById("tituloFormpr").innerHTML = "Revisión Lider regional";
        document.getElementById("formDatosaprobji").style.display = "flex";
        document.getElementById("fechaRevisionjefe").value = datos[0][24];
        document.getElementById("nombrejefeinmediato").value = datos[0][23];
        document.getElementById("observacionesJefe").value = datos[0][25];
        document.getElementById("formDatosgerente").style.display = "flex";
        document.getElementById("fechaRevisiongerente").value = datos[0][28];
        document.getElementById("nombregerente").value = datos[0][27];
        document.getElementById("observacionesGerente").value = datos[0][29];
      }
      else if(datos[0][26] == "Pendiente responsable th" && datos[0][1] != 'Permiso personal' && datos[0][2] != 'Luto' && datos[0][18] > 3){
        document.getElementById("cancelarsolicitud").style.display = 'flex';
        document.getElementById("finalizarPrji").innerHTML = "Finalizar";
        document.getElementById("tituloFormpr").innerHTML = "Revisión responsable th";
        document.getElementById("formDatosaprobji").style.display = "flex";
        document.getElementById("fechaRevisionjefe").value = datos[0][24];
        document.getElementById("nombrejefeinmediato").value = datos[0][23];
        document.getElementById("observacionesJefe").value = datos[0][25];
        document.getElementById("formDatosgerente").style.display = "flex";
        document.getElementById("fechaRevisiongerente").value = datos[0][28];
        document.getElementById("nombregerente").value = datos[0][27];
        document.getElementById("observacionesGerente").value = datos[0][29];
        document.getElementById("formDatosliderregional").style.display = "flex";
        document.getElementById("fechaRevisionliderregional").value = datos[0][31];
        document.getElementById("nombreliderregional").value = datos[0][30];
        document.getElementById("observacionesLiderregional").value = datos[0][32];
      }
      else if(datos[0][26] == "Pendiente responsable th" && (datos[0][1] == 'Permiso personal' || datos[0][18] <= 3) || datos[0][2] == 'Luto'){
        document.getElementById("cancelarsolicitud").style.display = 'flex';
        document.getElementById("finalizarPrji").innerHTML = "Finalizar";
        document.getElementById("tituloFormpr").innerHTML = "Revisión responsable th";
        document.getElementById("formDatosaprobji").style.display = "flex";
        document.getElementById("fechaRevisionjefe").value = datos[0][24];
        document.getElementById("nombrejefeinmediato").value = datos[0][23];
        document.getElementById("observacionesJefe").value = datos[0][25];
      }
      else if(datos[0][26] == "Finalizado" ){       
      }
      else if(datos[0][26] == "Devuelto jefe inmediato"){
        alert("Este registro fue devuelto por el jefe inmediato, por favor revise el historial de registros");
      }
  }

  //función para diligenciar el modal de solicitudes pendientes para retiro de personal
  function enviarPendientesfinalizarrp( datos ){
    document.getElementById("observacionesJirp").value = "";
    document.getElementById('formcolaboradorrp').value = datos[0][3];
    document.getElementById('idsolicitudrp').value = datos[0][0];
    document.getElementById("finalizarRp").innerHTML = "Aprobar";
    var urlDocumento = datos[0][8];
    document.getElementById('linkCartarenuncia').setAttribute('href', urlDocumento);
    document.getElementById('fechaRegistrorp').value = datos[0][1];;
    document.getElementById('fechaLaborohastarp').value = datos[0][9];
    document.getElementById('observacionesrp').value = datos[0][10];
    document.getElementById("formDatosaprobjirp").style.display = "none";
    document.getElementById("formDatosliderregionalrp").style.display = "none";
    document.getElementById("cancelarsolicitudrp").style.display = "none";
    
      if( datos[0][15] == "Pendiente jefe inmediato"){
        document.getElementById("finalizarRp").innerHTML = "Aprobar";
        document.getElementById("tituloFormrp").innerHTML = "Revisión jefe inmediato";
        document.getElementById("cancelarsolicitudrp").style.display = "none";
      }    
      else if(datos[0][15] == "Pendiente lider regional"){
        document.getElementById("finalizarRp").innerHTML = "Aprobar";
        document.getElementById("tituloFormrp").innerHTML = "Revisión lider regional";
        document.getElementById("formDatosaprobjirp").style.display = "flex";
        document.getElementById("fechaRevisionjeferp").value = datos[0][13];
        document.getElementById("nombrejefeinmediatorp").value = datos[0][12];
        document.getElementById("observacionesJeferp").value = datos[0][14];
        document.getElementById("cancelarsolicitudrp").style.display = "none";
      }
      else if(datos[0][15] == "Pendiente responsable th"){
        document.getElementById("cancelarsolicitudrp").style.display = "block";
        document.getElementById("finalizarRp").innerHTML = "Finalizar";
        document.getElementById("tituloFormrp").innerHTML = "Revisión responsable th";
        document.getElementById("formDatosaprobjirp").style.display = "flex";
        document.getElementById("fechaRevisionjeferp").value = datos[0][13];
        document.getElementById("nombrejefeinmediatorp").value = datos[0][12];
        document.getElementById("observacionesJeferp").value = datos[0][14];
        /*document.getElementById("formDatosliderregionalrp").style.display = "flex";
        document.getElementById("fechaRevisionliderregionalrp").value = datos[0][17];
        document.getElementById("nombreliderregionalrp").value = datos[0][16];
        document.getElementById("observacionesLiderregionalrp").value = datos[0][18];*/
      }
      else if(datos[0][15] == "Finalizado" ){       
      }
  }

  //función para diligenciar el modal de solicitudes pendientes por vacaciones
  function enviarPendientesfinalizarv( datos ){ 
    document.getElementById('formcolaboradorv').value = datos[0][3];
    document.getElementById('idsolicitudv').value = datos[0][0];
    document.getElementById("finalizarV").innerHTML = "Aprobar";
    var urlDocumento = datos[0][18];
    document.getElementById('linkDocumento').setAttribute('href', urlDocumento);
    document.getElementById('fechaRegistrov').value = datos[0][1];;
    document.getElementById('fechaIngresov').value = datos[0][9];
    document.getElementById('fechaDesde').value = datos[0][10];
    document.getElementById('fechaHasta').value = datos[0][11];
    document.getElementById('diasCompensados').value = datos[0][12];
    document.getElementById('diasDisfrutados').value = datos[0][13];
    document.getElementById('diasLiquidados').value = datos[0][17];
    document.getElementById("formDatosaprobjiv").style.display = "none";
    document.getElementById("formDatosliderregionalv").style.display = "none";
    document.getElementById("cancelarsolicitudv").style.display = "none";
      if(datos[0][24] == "Pendiente jefe inmediato"){
        document.getElementById("tituloFormv").innerHTML = "Revisión jefe inmediato";
        document.getElementById("finalizarV").innerHTML = "Aprobar";
        document.getElementById("cancelarsolicitudv").style.display = "none";
      }    
      else if(datos[0][24] == "Pendiente lider regional"){
        document.getElementById("finalizarV").innerHTML = "Aprobar";
        document.getElementById("tituloFormv").innerHTML = "Revisión lider regional";
        document.getElementById("formDatosaprobjiv").style.display = "flex";
        document.getElementById("fechaRevisionjefev").value = datos[0][22];
        document.getElementById("nombrejefeinmediatov").value = datos[0][21];
        document.getElementById("observacionesJefev").value = datos[0][23];
        document.getElementById("cancelarsolicitudv").style.display = "none";
      }
      else if(datos[0][24] == "Pendiente responsable th"){
        document.getElementById("cancelarsolicitudv").style.display = "block";
        document.getElementById("finalizarV").innerHTML = "Finalizar";
        document.getElementById("tituloFormv").innerHTML = "Revisión responsable th";
        document.getElementById("formDatosaprobjiv").style.display = "flex";
        document.getElementById("fechaRevisionjefev").value = datos[0][22];
        document.getElementById("nombrejefeinmediatov").value = datos[0][21];
        document.getElementById("observacionesJefev").value = datos[0][23];
        document.getElementById("formDatosliderregionalv").style.display = "flex";
        document.getElementById("fechaRevisionliderregionalv").value = datos[0][26];
        document.getElementById("nombreliderregionalv").value = datos[0][25];
        document.getElementById("observacionesLiderregionalv").value = datos[0][27];
      }
      else if(datos[0][24] == "Finalizado" ){       
      }
  }

  //función para diligenciar el modal de solicitudes pendientes por vacaciones
  function enviarPendientesfinalizarrip( datos ){
    document.getElementById('formcolaboradorrip').value = datos[0][3];
    document.getElementById('idsolicitudrip').value = datos[0][0];
    document.getElementById("finalizarRip").innerHTML = "Finalizar";
    document.getElementById('tipoReintegro').value = datos[0][8];
    document.getElementById('proyectoPertenece').value = datos[0][9];
    document.getElementById('fechaReintegro').value = datos[0][10];
    document.getElementById('observacionesRip').value = datos[0][11];
    if(datos[0][17] == "Pendiente responsable th"){
      document.getElementById("tituloFormrip").innerHTML = "Revisión responsable th";
      document.getElementById("finalizarRip").innerHTML = "Finalizar";
      document.getElementById("cancelarsolicitudrip").style.display = "block";
    }    
    else if(datos[0][17] == "Finalizado" ){       
    }
  }

  //función que se ejecuta al finalizar la solicitud de absentismo por estado de embarazo
  function finalizarSolicitudembarazo(){
    var input = document.getElementById("observacionesTh").value;
    /*if (input.trim() === "") {
      alert("Por favor, ingresa un valor en el  campo observaciones");
      return;
    }*/
    var idSolicitud = document.getElementById("idsolicitud").value;
    var observacionesThfin = document.getElementById("observacionesTh").value;
    document.getElementById("devolverTh").disabled = true;
    document.getElementById("cancelarsolicitudemb").disabled = true;
    document.querySelector("#finalizarTh").classList.toggle("d-none");
    document.querySelector('#botonGuardando').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevueltaf ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //alert('Los datos fueron enviados exitosamente.');
      //ocultamos boton con spinner cargando...
      document.getElementById("devolverTh").disabled = false;
      document.getElementById("cancelarsolicitudemb").disabled = false;
      document.querySelector("#finalizarTh").classList.toggle("d-none");
      document.querySelector('#botonGuardando').classList.toggle("d-none");
      $('#estadoEmbarazomodal').modal('hide')
      datosPendientesaprobacion();
      alert("La solicitud ha finalizado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .finalizarEstadoembarazo( idSolicitud, observacionesThfin );
  }

  //función que se ejecuta al finalizar la solicitud de absentismo por permiso remunerado y revision del jefe inmediato
  function ffinalizarPrji(){
    var inputji = document.getElementById("observacionesJi").value;
    /*if (inputji.trim() === "") {
      alert("Por favor, ingresa un valor en el  campo observaciones");
      return;
    }*/
    var idSolicitud = document.getElementById("idsolicitudpr").value;
    var observacionesThfin = document.getElementById("observacionesJi").value;
    //var cedula = 
    event.preventDefault();
    document.getElementById('devolverPrji').disabled = true;
    document.getElementById('cancelarsolicitud').disabled = true;
    document.querySelector('#finalizarPrji').classList.toggle('d-none');
    document.querySelector('#botonGuardandopr1').classList.toggle('d-none');
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevueltaf ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //alert('Los datos fueron enviados exitosamente.');
      //ocultamos boton con spinner cargando...
      document.getElementById("devolverPrji").disabled = false;
      document.getElementById('cancelarsolicitud').disabled = false;
      document.querySelector("#finalizarPrji").classList.toggle("d-none");
      document.querySelector('#botonGuardandopr1').classList.toggle("d-none");
      $('#permisoRemuneradomodal').modal('hide');
      datosPendientesaprobacion();
      alert("La solicitud ha finalizado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .finalizarPermisoremuneradoji( idSolicitud, observacionesThfin );
  }

  //función que se ejecuta al finalizar la solicitud de absentismo por retiro de personal
  function ffinalizarRp(){
    var input = document.getElementById("observacionesJirp").value;
    /*if (input.trim() === "") {
      alert("Por favor, ingresa un valor en el  campo observaciones");
      return;
    }*/
    var idSolicitud = document.getElementById("idsolicitudrp").value;
    var observacionesThfin = document.getElementById("observacionesJirp").value;
    //var cedula = 
    event.preventDefault();
    document.getElementById("devolverRp").disabled = true;
    document.getElementById("cancelarsolicitudrp").disabled = true;
    document.querySelector('#finalizarRp').classList.toggle('d-none');
    document.querySelector('#botonGuardandorp').classList.toggle('d-none');
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevueltaf ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //alert('Los datos fueron enviados exitosamente.');
      //ocultamos boton con spinner cargando...
      document.getElementById("devolverRp").disabled = false;
      document.getElementById("cancelarsolicitudrp").disabled = false;
      document.querySelector('#finalizarRp').classList.toggle('d-none');
      document.querySelector('#botonGuardandorp').classList.toggle('d-none');
      $('#retiroPersonalmodal').modal('hide');
      datosPendientesaprobacion();
      alert("La solicitud ha finalizado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .finalizarRetiropersonal( idSolicitud, observacionesThfin );
  }

  //función que se ejecuta al finalizar la solicitud de absentismo por retiro de personal
  function ffinalizarV(){
    var input = document.getElementById("observacionesJiv").value;
    /*if (input.trim() === "") {
      alert("Por favor, ingresa un valor en el  campo observaciones");
      return;
    }*/
    var idSolicitud = document.getElementById("idsolicitudv").value;
    var observacionesThfin = document.getElementById("observacionesJiv").value;
    //var cedula = 
    event.preventDefault();
    document.getElementById("devolverV").disabled = true;
    document.getElementById("cancelarsolicitudv").disabled = true;
    document.querySelector('#finalizarV').classList.toggle('d-none');
    document.querySelector('#botonGuardandov').classList.toggle('d-none');
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevueltaf ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //alert('Los datos fueron enviados exitosamente.');
      //ocultamos boton con spinner cargando...
      document.getElementById("devolverV").disabled = false;
      document.getElementById("cancelarsolicitudv").disabled = false;
      document.querySelector('#finalizarV').classList.toggle('d-none');
      document.querySelector('#botonGuardandov').classList.toggle('d-none');
      $('#Vacacionesmodal').modal('hide');
      datosPendientesaprobacion();
      alert("La solicitud ha finalizado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .finalizarVacaciones( idSolicitud, observacionesThfin );
  }

  //función que se ejecuta al finalizar la solicitud de absentismo por reintegro de personal
  function ffinalizarRip(){
    var input = document.getElementById("observacionesJirip").value;
    /*if (input.trim() === "") {
      alert("Por favor, ingresa un valor en el  campo observaciones");
      return;
    }*/
    var idSolicitud = document.getElementById("idsolicitudrip").value;
    var observacionesThfin = document.getElementById("observacionesJirip").value;
    //var cedula = 
    event.preventDefault();
    document.getElementById("devolverRip").disabled = true;
    document.getElementById("cancelarsolicitudrip").disabled = true;
    document.querySelector('#finalizarRip').classList.toggle('d-none');
    document.querySelector('#botonGuardandorip').classList.toggle('d-none');
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevueltaf ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //alert('Los datos fueron enviados exitosamente.');
      //ocultamos boton con spinner cargando...
      document.getElementById("devolverRip").disabled = false;
      document.getElementById("cancelarsolicitudrip").disabled = false;
      document.querySelector('#finalizarRip').classList.toggle('d-none');
      document.querySelector('#botonGuardandorip').classList.toggle('d-none');
      $('#reintegroPersonalmodal').modal('hide');
      datosPendientesaprobacion();
      alert("La solicitud ha finalizado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .finalizarReintegropersonal( idSolicitud, observacionesThfin );
  }


  //función que se ejecuta al devolver la solicitud de absentismo por estado de embarazo
  function devolverSolicitudembarazo(){
    var idSolicituddev = document.getElementById("idsolicitud").value;
    var observacionesThdev = document.getElementById("observacionesTh").value;
    var nombreCol = document.getElementById("formcolaborador").value;
    document.getElementById("finalizarTh").disabled = true;
    document.querySelector("#devolverTh").classList.toggle("d-none");
    document.querySelector('#botonGuardando').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevuelta ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.getElementById("finalizarTh").disabled = false;
      document.querySelector("#devolverTh").classList.toggle("d-none");
      document.querySelector('#botonGuardando').classList.toggle("d-none");
      $('#estadoEmbarazomodal').modal('hide')
      datosPendientesaprobacion();
      alert("La devolución de la solicitud ha terminado con exito, el usuario " + nombreCol + " sera notificado por correo electronico");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .devSolicitudembarazo( idSolicituddev, observacionesThdev, nombreCol ); //función de respuesta del lado del cliente
  }

  //función que se ejecuta al devolver la solicitud de absentismo por permiso remunerado
  function devolverPermisoRji(){
    var idSolicituddev = document.getElementById("idsolicitudpr").value;
    var observacionesThdev = document.getElementById("observacionesJi").value;
    var nombreCol = document.getElementById("formcolaboradorpr").value;
    document.getElementById("cancelarsolicitud").disabled = true;
    document.getElementById("finalizarPrji").disabled = true;
    document.querySelector("#devolverPrji").classList.toggle("d-none");
    document.querySelector('#botonGuardando').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevuelta ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.getElementById("finalizarPrji").disabled = false;
      document.getElementById("cancelarsolicitud").disabled = false;
      document.querySelector("#devolverPrji").classList.toggle("d-none");
      document.querySelector('#botonGuardando').classList.toggle("d-none");
      $('#permisoRemuneradomodal').modal('hide')
      datosPendientesaprobacion();
      alert("La devolución de la solicitud " + idSolicituddev + " ha terminado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .devSolicitudprji( idSolicituddev, observacionesThdev, nombreCol ); //función de respuesta del lado del cliente
  }

  //funcion que escribe devuelto en la columna estado de la hoja retiro de personal
  function devolverSolicitudretiropersonal(){
    var idSolicituddev = document.getElementById("idsolicitudrp").value;
    var observacionesThdev = document.getElementById("observacionesJirp").value;
    var nombreCol = document.getElementById("formcolaboradorrp").value;
    document.getElementById("cancelarsolicitudrp").disabled = true;
    document.getElementById("finalizarRp").disabled = true;
    document.querySelector("#devolverRp").classList.toggle("d-none");
    document.querySelector('#botonGuardandorp').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevuelta ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.getElementById("finalizarRp").disabled = false;
      document.getElementById("cancelarsolicitudrp").disabled = false;
      document.querySelector("#devolverRp").classList.toggle("d-none");
      document.querySelector('#botonGuardandorp').classList.toggle("d-none");
      $('#retiroPersonalmodal').modal('hide')
      datosPendientesaprobacion();
      alert("La devolución de la solicitud " + idSolicituddev + " ha terminado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .devSolicitudrp( idSolicituddev, observacionesThdev, nombreCol ); //función de respuesta del lado del cliente
  }

  //funcion que escribe devuelto en la columna estado de la hoja vacaciones
  function devolverSolicitudvacaciones(){
    var idSolicituddev = document.getElementById("idsolicitudv").value;
    var observacionesThdev = document.getElementById("observacionesJiv").value;
    var nombreCol = document.getElementById("formcolaboradorv").value;
    document.getElementById("cancelarsolicitudv").disabled = true;
    document.getElementById("finalizarV").disabled = true;
    document.querySelector("#devolverV").classList.toggle("d-none");
    document.querySelector('#botonGuardandov').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevuelta ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.getElementById("finalizarV").disabled = false;
      document.getElementById("cancelarsolicitudv").disabled = false;
      document.querySelector("#devolverV").classList.toggle("d-none");
      document.querySelector('#botonGuardandov').classList.toggle("d-none");
      $('#Vacacionesmodal').modal('hide')
      datosPendientesaprobacion();
      alert("La devolución de la solicitud " + idSolicituddev + " ha terminado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .devSolicitudv( idSolicituddev, observacionesThdev, nombreCol ); //función de respuesta del lado del cliente
  }

  //funcion que escribe devuelto en la columna estado de la hoja reintegro de personal
  function devolverSolicitudreintegropersonal(){
    var idSolicituddev = document.getElementById("idsolicitudrip").value;
    var observacionesThdev = document.getElementById("observacionesJirip").value;
    var nombreCol = document.getElementById("formcolaboradorrip").value;
    document.getElementById("cancelarsolicitudrip").disabled = true;
    document.getElementById("finalizarRip").disabled = true;
    document.querySelector("#devolverRip").classList.toggle("d-none");
    document.querySelector('#botonGuardandorip').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    //.withSuccessHandler( mensajeNotificaciondevuelta ) //función de respuesta del lado del servidor
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.getElementById("finalizarRip").disabled = false;
      document.getElementById("cancelarsolicitudrip").disabled = false;
      document.querySelector("#devolverRip").classList.toggle("d-none");
      document.querySelector('#botonGuardandorip').classList.toggle("d-none");
      $('#reintegroPersonalmodal').modal('hide')
      datosPendientesaprobacion();
      alert("La devolución de la solicitud " + idSolicituddev + " ha terminado con exito");
      //reLoad( "?page=pendienteaprobacion" );
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .devSolicitudrip( idSolicituddev, observacionesThdev, nombreCol ); //función de respuesta del lado del cliente
  }

  function editarSolicitudembarazo( form ){
    //utilizamos el input dataid oculto en el formulario para enviar solo una solicitud al servidor a traves del formulario
    document.getElementById("dataid").value = document.getElementById("formidsolicitud").value;
    document.getElementById("dataced").value = document.getElementById("formcedula").value;
    document.querySelector('#registrarNovedadembarazo').classList.toggle("d-none");
    document.querySelector('#botonGuardando').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.querySelector('#registrarNovedadembarazo').classList.toggle('d-none');
      document.querySelector('#botonGuardando').classList.toggle('d-none');
      alert("La solicitud ha sido editada con exito");
      $('#historialRegistromodal').modal('hide')
      datosHistorialderegistro();
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadformEditarembarazo( form );
  }

  //función que envia al servidor la solicitud de aprobaciones pendientes dependiendo del rol 
  function datosPendientesaprobacion(){
    activarLoading();
    //event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarDatospendientesaprobacion ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatospendientesaprobacion(); //función de respuesta del lado del cliente
  }

  function datosHistorialderegistro(){
    activarLoading();
    //event.preventDefault();
    google.script.run
    .withSuccessHandler( enviarDatoshistorialregistro ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDatoshistorialregistro(); //función de respuesta del lado del cliente
  }

  //función que alerta al usuario sobre un error cuando se guardaban los datos
  function showError( error ){
    alert( "Se presento el siguiente error: " + error );
  }

  //funcion que se activa al dar clic en alguno de los button radio
  function radioClick(opcionesPermiso){
    limpiarFormpr();
    if(opcionesPermiso.value=='Matrimonio'){
      document.getElementById('fechaReingreso').disabled = true;
      document.getElementById('formAdjuntodocumento').style.display = 'block';
      document.getElementById('adjuntoDocumento').required = true;
      document.getElementById('formFechainicio').style.display = 'block';
      document.getElementById('fechaIniciopermiso').required = true;
      document.getElementById('formAutorizacioncol').style.display = 'block';
      document.getElementById('formFechafinalizacion').style.display = 'block';
      document.getElementById('fechaFinalizacionpermiso').required = true;
      document.getElementById('formFechareingreso').style.display = 'block';
      document.getElementById('formTotaldiaspermiso').style.display = 'block';
      document.getElementById('formActadefuncion').style.display = 'none';
      document.getElementById('adjuntoDefuncion').required = false;
      document.getElementById('formRegistrocivil').style.display = 'none';
      document.getElementById('adjuntoRegistrocivil').required = false;
      document.getElementById('formHorainicio').style.display = 'none';
      document.getElementById('formHorafinal').style.display = 'none';
      document.getElementById('formTiempopermiso').style.display = 'none';
      document.getElementById('horaInicio').required = false;
      document.getElementById('horaFinal').required = false;
      document.getElementById('labelprObservaciones').innerHTML = 'Observaciones';
    }
    if(opcionesPermiso.value=='Calamidad familiar' || opcionesPermiso.value=='Permiso remunerado'){
      document.getElementById('fechaReingreso').disabled = true;
      document.getElementById('formFechainicio').style.display = 'block';
      document.getElementById('fechaIniciopermiso').required = true;
      document.getElementById('formAutorizacioncol').style.display = 'block';
      document.getElementById('formFechafinalizacion').style.display = 'block';
      document.getElementById('fechaFinalizacionpermiso').required = true;
      document.getElementById('formFechareingreso').style.display = 'block';
      document.getElementById('formTotaldiaspermiso').style.display = 'block';
      document.getElementById('formAdjuntodocumento').style.display = 'block';
      document.getElementById('adjuntoDocumento').required = false;
      document.getElementById('formActadefuncion').style.display = 'none';
      document.getElementById('adjuntoDefuncion').required = false;
      document.getElementById('formRegistrocivil').style.display = 'none';
      document.getElementById('adjuntoRegistrocivil').required = false;
      document.getElementById('formHorainicio').style.display = 'none';
      document.getElementById('formHorafinal').style.display = 'none';
      document.getElementById('formTiempopermiso').style.display = 'none';
      document.getElementById('horaInicio').required = false;
      document.getElementById('horaFinal').required = false;
      document.getElementById('labelprObservaciones').innerHTML = 'Observaciones';
    }
    if(opcionesPermiso.value=='Luto'){
      document.getElementById('fechaReingreso').disabled = true;
      document.getElementById('formAdjuntodocumento').style.display = 'none';
      document.getElementById('formAutorizacioncol').style.display = 'block';
      document.getElementById('adjuntoDocumento').required = false;
      document.getElementById('formActadefuncion').style.display = 'block';
      document.getElementById('formRegistrocivil').style.display = 'block';
      document.getElementById('adjuntoDefuncion').required = true;
      document.getElementById('adjuntoRegistrocivil').required = true;
      document.getElementById('formFechainicio').style.display = 'block';
      document.getElementById('fechaIniciopermiso').required = true;
      document.getElementById('formFechafinalizacion').style.display = 'block';
      document.getElementById('fechaFinalizacionpermiso').required = true;
      document.getElementById('formFechareingreso').style.display = 'block';
      document.getElementById('formTotaldiaspermiso').style.display = 'block';
      document.getElementById('formHorainicio').style.display = 'none';
      document.getElementById('formHorafinal').style.display = 'none';
      document.getElementById('formTiempopermiso').style.display = 'none';
      document.getElementById('horaInicio').required = false;
      document.getElementById('horaFinal').required = false;
      document.getElementById('labelprObservaciones').innerHTML = 'Observaciones';
    }  
    if(opcionesPermiso.value=='Permiso personal'){
      document.getElementById('fechaReingreso').disabled = true;
      document.getElementById('formAdjuntodocumento').style.display = 'block';
      document.getElementById('formAutorizacioncol').style.display = 'block';
      document.getElementById('formActadefuncion').style.display = 'none';
      document.getElementById('formRegistrocivil').style.display = 'none';
      //document.getElementById('formFechainicio').style.display = 'none';
      document.getElementById('formFechafinalizacion').style.display = 'none';
      document.getElementById('formFechafinalizacion').style.display = 'none';
      document.getElementById('formFechareingreso').style.display = 'none';
      document.getElementById('formTotaldiaspermiso').style.display = 'none';
      document.getElementById('adjuntoDefuncion').required = false;
      document.getElementById('adjuntoRegistrocivil').required = false;
      document.getElementById('adjuntoDocumento').required = false;
      document.getElementById('fechaIniciopermiso').required = true;
      document.getElementById('fechaFinalizacionpermiso').required = false;
      document.getElementById('formHorainicio').style.display = 'block';
      document.getElementById('formHorafinal').style.display = 'block';
      document.getElementById('formTiempopermiso').style.display = 'block';
      document.getElementById('horaInicio').required = true;
      document.getElementById('horaFinal').required = true;
      document.getElementById('labelprObservaciones').innerHTML = 'Observaciones';
    }
    if(opcionesPermiso.value=='Volemos'){
      document.getElementById('formTotaldiaspermiso').style.display = 'none';
      document.getElementById('formFechainicio').style.display = 'block';
      document.getElementById('fechaIniciopermiso').required = true;
      document.getElementById('formFechafinalizacion').style.display = 'block';
      document.getElementById('fechaFinalizacionpermiso').required = true;
      document.getElementById('formFechareingreso').style.display = 'block';
      document.getElementById('fechaReingreso').disabled = false;
      document.getElementById('formTotaldiaspermiso').style.display = 'none';
      document.getElementById('formAdjuntodocumento').style.display = 'block';
      document.getElementById('adjuntoDocumento').required = false;
      document.getElementById('formActadefuncion').style.display = 'none';
      document.getElementById('adjuntoDefuncion').required = false;
      document.getElementById('formRegistrocivil').style.display = 'none';
      document.getElementById('adjuntoRegistrocivil').required = false;
      document.getElementById('formHorainicio').style.display = 'none';
      document.getElementById('formHorafinal').style.display = 'none';
      document.getElementById('formTiempopermiso').style.display = 'none';
      document.getElementById('horaInicio').required = false;
      document.getElementById('horaFinal').required = false;
      document.getElementById('formAutorizacioncol').style.display = 'none';
      document.getElementById('labelprObservaciones').innerHTML = 'Observaciones (Diligencie el rango de horas del permiso solicitado si este no cubre todo el día laboral)';
    }
  }

  //función que se recibe los datos del formulario permiso remunerado
  function datosPermisoremunerado(form){
    event.preventDefault();
    document.getElementById("fechaReingreso").disabled = false;
    document.getElementById("totalDiaspermiso").disabled = false;
    document.getElementById("tiempoPermiso").disabled = false;
    document.getElementById("tiempoPermiso").style.display = 'none';
    document.getElementById("fechaReingreso").style.display = 'none';
    document.getElementById("totalDiaspermiso").style.display = 'none';
    //encendemos boton con spinner cargando...
    document.querySelector('#botonGuardandopr').classList.toggle('d-none');
    document.querySelector('#registrarNovedadpermisoremunerado').classList.toggle('d-none');
    google.script.run
    .withSuccessHandler(function() {
      alert('Los datos fueron enviados exitosamente.');
      document.querySelector('#registrarNovedadpermisoremunerado').classList.toggle('d-none');
      //ocultamos boton con spinner cargando...
      document.querySelector('#botonGuardandopr').classList.toggle('d-none');
      document.getElementById("fechaReingreso").disabled = true;
      document.getElementById("totalDiaspermiso").disabled = true;
      document.getElementById("tiempoPermiso").disabled = true;
      document.getElementById("fechaReingreso").style.display = 'flex';
      document.getElementById("totalDiaspermiso").style.display = 'flex';
      document.getElementById("tiempoPermiso").style.display = 'flex';
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadpermisoRemunerado( form )
  }

  //función que se recibe los datos del formulario vacaciones
  function datosVacaciones(form){
    event.preventDefault();
    var input = document.getElementById("diasCompensados").value;
    var adjunto = document.getElementById("adjuntoDocumentov").value;
    if (input > 0 && adjunto.trim() === "") {
      alert("Por favor adjunte el documento");
      return;
    }
    else{
      document.getElementById("diasLiquidados").disabled = false;
      document.getElementById("diasLiquidados").style.display = 'none';
      document.getElementById("diasDisfrutados").disabled = false;
      document.getElementById("diasDisfrutados").style.display = 'none';
      //encendemos boton con spinner cargando...
      document.querySelector('#botonGuardandov').classList.toggle('d-none');
      document.querySelector('#registrarNovedadvacaciones').classList.toggle('d-none');
      document.getElementById("datacedV").value = document.getElementById("formcedula").value;
      google.script.run
      .withSuccessHandler(function() {
        alert('Los datos fueron enviados exitosamente.');
        document.querySelector('#registrarNovedadvacaciones').classList.toggle('d-none');
        //ocultamos boton con spinner cargando...
        document.querySelector('#botonGuardandov').classList.toggle('d-none');
        document.getElementById("diasLiquidados").disabled = true;
        document.getElementById("diasLiquidados").style.display = 'flex';
        document.getElementById("diasDisfrutados").disabled = true;
        document.getElementById("diasDisfrutados").style.display = 'flex';
      })
      .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
      .uploadVacaciones( form )
    }
  }

  //función que se recibe los datos del formulario permiso no remunerado
  function datosPermisonoremunerado(form){
    event.preventDefault();
    document.getElementById("fechaReingresopnr").disabled = false;
    document.getElementById("totalDiaspermisopnr").disabled = false;
    document.getElementById("fechaReingresopnr").style.display = 'none';
    document.getElementById("totalDiaspermisopnr").style.display = 'none';
    //encendemos boton con spinner cargando...
    document.querySelector('#botonGuardandopnr').classList.toggle('d-none');
    document.querySelector('#registrarNovedadpermisonoremunerado').classList.toggle('d-none');
    google.script.run
    .withSuccessHandler(function() {
      alert('Los datos fueron enviados exitosamente.');
      document.querySelector('#registrarNovedadpermisonoremunerado').classList.toggle('d-none');
      //ocultamos boton con spinner cargando...
      document.querySelector('#botonGuardandopnr').classList.toggle('d-none');
      document.getElementById("fechaReingresopnr").disabled = true;
      document.getElementById("totalDiaspermisopnr").disabled = true;
      document.getElementById("fechaReingresopnr").style.display = 'flex';
      document.getElementById("totalDiaspermisopnr").style.display = 'flex';
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadpermisonoRemunerado( form )
  }

  //función que cancela la solicitud de absentismo para los formularios de permiso remunerado y permiso no remunerado
  function cancelarSolicitud(){
    event.preventDefault();
    //encendemos boton con spinner cargando...
    document.getElementById('botonGuardando').style.display = 'block';
    document.getElementById('cancelarsolicitud').style.display = 'none';
    var idSol = document.getElementById('idsolicitudpr').value;
    google.script.run
    .withSuccessHandler(function() {
      alert('La solicitud fue cancelada exitosamente.');
      $('#permisoRemuneradomodal').modal('hide');
      datosPendientesaprobacion();
      //ocultamos boton con spinner cargando...
      document.getElementById('cancelarsolicitud').style.display = 'block'; 
      document.getElementById('botonGuardando').style.display = 'none';
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadCancelarsolicitud( idSol )
  }

  //función que cancela la solicitud de absentismo para los formularios de permiso remunerado y permiso no remunerado
  function cancelarSolicitudemb(){
    event.preventDefault();
    //encendemos boton con spinner cargando...
    document.getElementById('botonGuardando').style.display = 'block';
    document.getElementById('cancelarsolicitud').style.display = 'none';
    var idSol = document.getElementById('idsolicitud').value;
    google.script.run
    .withSuccessHandler(function() {
      alert('La solicitud fue cancelada exitosamente.');
      $('#estadoEmbarazomodal').modal('hide');
      datosPendientesaprobacion();
      //ocultamos boton con spinner cargando...
      document.getElementById('cancelarsolicitud').style.display = 'block'; 
      document.getElementById('botonGuardando').style.display = 'none';
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadCancelarsolicitudemb( idSol )
  }

  //función que cancela la solicitud de absentismo para el formulario de retiro de personal
  function cancelarSolicitudrp(){
    event.preventDefault();
    //encendemos boton con spinner cargando...
    document.getElementById('botonGuardandorp').style.display = 'block';
    document.getElementById('cancelarsolicitudrp').style.display = 'none';
    var idSol = document.getElementById('idsolicitudrp').value;
    google.script.run
    .withSuccessHandler(function() {
      alert('La solicitud fue cancelada exitosamente.');
      $('#retiroPersonalmodal').modal('hide');
      datosPendientesaprobacion();
      //ocultamos boton con spinner cargando...
      document.getElementById('cancelarsolicitudrp').style.display = 'block'; 
      document.getElementById('botonGuardandorp').style.display = 'none';
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadCancelarsolicitudrp( idSol )
  }

  //función que cancela la solicitud de absentismo para el formulario de vacaciones
  function cancelarSolicitudv(){
    event.preventDefault();
    //encendemos boton con spinner cargando...
    document.getElementById('botonGuardandov').style.display = 'block';
    document.getElementById('cancelarsolicitudv').style.display = 'none';
    var idSol = document.getElementById('idsolicitudv').value;
    google.script.run
    .withSuccessHandler(function() {
      alert('La solicitud fue cancelada exitosamente.');
      $('#Vacacionesmodal').modal('hide');
      datosPendientesaprobacion();
      //ocultamos boton con spinner cargando...
      document.getElementById('cancelarsolicitudv').style.display = 'block'; 
      document.getElementById('botonGuardandov').style.display = 'none';
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadCancelarsolicitudv( idSol )
  }

  //función que cancela la solicitud de absentismo para el formulario de reintegro de personal
  function cancelarSolicitudrip(){
    event.preventDefault();
    //encendemos boton con spinner cargando...
    document.getElementById('botonGuardandorip').style.display = 'block';
    document.getElementById('cancelarsolicitudrip').style.display = 'none';
    var idSol = document.getElementById('idsolicitudrip').value;
    google.script.run
    .withSuccessHandler(function() {
      alert('La solicitud fue cancelada exitosamente.');
      $('#reintegroPersonalmodal').modal('hide');
      datosPendientesaprobacion();
      //ocultamos boton con spinner cargando...
      document.getElementById('cancelarsolicitudrip').style.display = 'block'; 
      document.getElementById('botonGuardandorip').style.display = 'none';
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadCancelarsolicitudrip( idSol )
  }

  //función que se recibe los datos del formulario permiso remunerado
  function datosRetirodepersonal(form){
    event.preventDefault();
    //encendemos boton con spinner cargando...
    document.querySelector('#botonGuardandorp').classList.toggle('d-none');
    document.querySelector('#registrarNovedadretirodepersonal').classList.toggle('d-none');
    google.script.run
    .withSuccessHandler(function() {
      alert('Los datos fueron enviados exitosamente.');
      document.querySelector('#registrarNovedadretirodepersonal').classList.toggle('d-none');
      //ocultamos boton con spinner cargando...
      document.querySelector('#botonGuardandorp').classList.toggle('d-none');
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadretirodePersonal( form )
  }

  //función que se recibe los datos del formulario permiso remunerado
  function datosReintegrodepersonal(form){
    event.preventDefault();
    //encendemos boton con spinner cargando...
    document.querySelector('#botonGuardandorip').classList.toggle('d-none');
    document.querySelector('#registrarNovedadreintegrodepersonal').classList.toggle('d-none');
    google.script.run
    .withSuccessHandler(function() {
      alert('Los datos fueron enviados exitosamente.');
      document.querySelector('#registrarNovedadreintegrodepersonal').classList.toggle('d-none');
      //ocultamos boton con spinner cargando...
      document.querySelector('#botonGuardandorip').classList.toggle('d-none');
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadreintegrodePersonal( form )
  }

  //función que calcula los dias liquidados para el formulario de vacaciones
  function calcularDliquidados(){
    activarLoading();
    vardC = document.getElementById("diasCompensados").value;
    //if(vardC>7){
      //alert("Si vas a tomar días compensados en dinero máximo son 7 días");
    //}
    //else{
    var cedula = document.getElementById("formcedula").value;
    google.script.run
    .withSuccessHandler( validarDliquidados ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .datosDiaspendientesced( cedula ); //función de respuesta del lado del cliente 
    //}
  }

  //función que valida los dias liquidados para el formulario historial de registro
  function validarDliquidados( datos ){
    var diasP = parseInt(datos[0]);
    var diasDisf = document.getElementById("diasDisfrutados").value;
    var diasDcomp = document.getElementById("diasCompensados").value;
    var diasLiq = parseInt(diasDisf) + parseInt(diasDcomp);
    if(diasP<diasLiq){
      alert("el número de días liquidados no puede ser mayor al número de días pendientes por vacaciones (" + diasP + " días pendientes por vacaciones).");
      document.getElementById("registrarNovedadvacaciones").disabled = true;
    }
    else{
      document.getElementById("diasLiquidados").value = diasLiq;
      document.getElementById("registrarNovedadvacaciones").disabled = false;
    }
    if(document.getElementById("diasLiquidados").value == 0){
      document.getElementById("registrarNovedadvacaciones").disabled = true;
    }
    desactivarLoading();
  }

  //función que calcula los dias liquidados para el formulario historial de registro
  function calcularDliquidadosH(){
    activarLoading();
    vardC = document.getElementById("editarDiascompensadov").value;
    //if(vardC>7){
      //alert("Si vas a tomar días compensados en dinero máximo son 7 días");
    //}
    //else{
    var cedula = document.getElementById("datacedv").value;
    console.log(cedula);
    google.script.run
    .withSuccessHandler( validarDliquidadosH ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .datosDiaspendientesced( cedula ); //función de respuesta del lado del cliente 
    //}
  }

  //función que valida los dias liquidados para el formulario historial de registro
  function validarDliquidadosH( datos ){
    var diasP = parseInt(datos[0]);
    var diasDisf = document.getElementById("editarDiasdisfrutadosv").value;
    var diasDcomp = document.getElementById("editarDiascompensadov").value;
    var diasLiq = parseInt(diasDisf) + parseInt(diasDcomp);
    if(diasP<diasLiq){
      alert("el número de días liquidados no puede ser mayor al número de días pendientes por vacaciones (" + diasP + " días pendientes por vacaciones).");
      document.getElementById("corregirV").disabled = true;
    }
    else{
      document.getElementById("editarDiasliquidadosv").value = diasLiq;
      document.getElementById("corregirV").disabled = false;
    }
    if(document.getElementById("editarDiasdisfrutadosv").value == 0){
      document.getElementById("corregirV").disabled = true;
    }
    desactivarLoading();
  }

  //función que activa el campo de fecha dia de reingreso para el formulario de vacaciones
  function activarFecharegistrov(){
    document.getElementById("fechaHasta").disabled = false;
  }

  //función que calcula la fecha de reingreso y los dias disfrutados
  function calcularFechasv(){
    //event.preventDefault();
    activarLoading();
    //validarDliquidados();
    google.script.run
    .withSuccessHandler( registrarFechasv ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDferiados(); //función de respuesta del lado del cliente 
  }

  //función para calcular feriados y domingos para el formulario de vacaciones
  function registrarFechasv( datos ){
    if(datos[0].length > 0){
      var festivos = datos[0].replaceAll(/[[\[\]'"]+/g, '');
      festivos = festivos.split(",");
      const formatoYYYYMMDD = fecha => {
        const isoDate = new Date(fecha).toISOString();
        return isoDate.slice(0, 10).replace(/-/g, "/");
      };
      var fechasFestivas = festivos.map(formatoYYYYMMDD);
    }
    else{
      var festivos = '';
    }  
    var tArea = datos[1].replaceAll(/[[\[\]'"]+/g, '');
    tArea = tArea.split(",");
    var tAreainput = document.getElementById("formtipo").value;
    if(tAreainput == 'Administrativo'){
      var areaColaborador = tArea[0];
    }
    else{
      //var areaColaborador = tArea[1];
      var areaColaborador = tArea[0];
    }
    var fechaHastav = document.getElementById('fechaHasta').value;
    fechaFinalizacionPermiso = moment(fechaHastav);
    var fechaDesdev = document.getElementById('fechaDesde').value;
    var diaSemana = fechaFinalizacionPermiso.day();
    var fechasRango = [];
    for (let fecha = new Date(fechaDesdev); fecha <= fechaFinalizacionPermiso; fecha.setDate(fecha.getDate() + 1)) {
      fechasRango.push(fecha.toISOString().slice(0, 10).replace(/-/g, '/'));
    }
    let diasFeriadosenrango = 0;
    for (let i = 0; i < fechasFestivas.length; i++) {
      for (let j = 0; j < fechasRango.length; j++) {
        if (fechasFestivas[i] === fechasRango[j]) {
          diasFeriadosenrango++;
        }
      }
    }
    if(diaSemana == 6){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(2, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else if(diaSemana == 5){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else{
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }  
    var reingresoComp = moment(fechaReingreso);
    var day = reingresoComp.format('DD');
    var month = reingresoComp.format('MM');
    var year = reingresoComp.format('YYYY');
    reingresoComp = year + '/' + month + '/' + day;
    for (let i = 0; i < fechasFestivas.length; i++){
     if(fechasFestivas[i] === reingresoComp){
      fechaReingreso = moment(fechaReingreso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      fechaReingreso = year + '-' + month + '-' + day;
     }  
    }
    //document.getElementById('fechaReingreso').value = fechaReingreso;
    var diasPermiso = fechaFinalizacionPermiso.diff(fechaDesdev, 'days');
    diasPermiso = diasPermiso - diasFeriadosenrango;
    //document.getElementById('totalDiaspermiso').value = diasPermiso;
    fechaInicioPermiso = moment(fechaDesdev);
    diaInicio = fechaInicioPermiso.day();
    var totaldiaspermiso = 0;

    for(i=0;i<=diasPermiso;i++){
        if(areaColaborador == 'lunes-viernes'){
        if( (diaInicio)!= 6 && (diaInicio)!= 0 ){
          totaldiaspermiso = totaldiaspermiso + 1;
        }
      }
      else{
        if( (diaInicio)!= 0 ){
          totaldiaspermiso = totaldiaspermiso + 1;
        }
      }

      diaInicio = diaInicio + 1;
      if(diaInicio == 7){
        diaInicio = 0;
      }
    }
    if(totaldiaspermiso<7){
      alert("Puedes tomar parcialmente como mínimo 7 días continuos en tiempo");
      document.getElementById("registrarNovedadvacaciones").disabled = true;
    }
    else{
      document.getElementById('diasDisfrutados').value = totaldiaspermiso;
      document.getElementById("registrarNovedadvacaciones").disabled = false;
      var diasComp = document.getElementById("diasCompensados").value;
      document.getElementById("diasLiquidados").value = parseInt(totaldiaspermiso) + parseInt(diasComp);
    }
    document.getElementById('fechaReingresov').value = fechaReingreso;
    //calcularDliquidados();
    desactivarLoading();
    var inputdC = document.getElementById('diasCompensados'); // seleccionamos el input por su id
    inputdC.onchange(); // activamos el evento onchange
  }

  //función que calcula la fecha de reingreso y los dias disfrutados en el formulario historial de registro
  function calcularFechasvH(){
    //event.preventDefault();
    activarLoading();
    //validarDliquidados();
    google.script.run
    .withSuccessHandler( registrarFechasvH ) //función de respuesta del lado del servidor
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .obtenerDferiados(); //función de respuesta del lado del cliente 
  }

  //función para calcular feriados y domingos para el formulario historial de registro
  function registrarFechasvH( datos ){
    if(datos[0].length > 0){
      var festivos = datos[0].replaceAll(/[[\[\]'"]+/g, '');
      festivos = festivos.split(",");
      const formatoYYYYMMDD = fecha => {
        const isoDate = new Date(fecha).toISOString();
        return isoDate.slice(0, 10).replace(/-/g, "/");
      };
      var fechasFestivas = festivos.map(formatoYYYYMMDD);
    }
    else{
      var festivos = '';
    }  
    var fechaHastav = document.getElementById('editarHastav').value;
    fechaFinalizacionPermiso = moment(fechaHastav);
    var fechaDesdev = document.getElementById('editarDesdev').value;
    var diaSemana = fechaFinalizacionPermiso.day();
    var fechasRango = [];
    for (let fecha = new Date(fechaDesdev); fecha <= fechaFinalizacionPermiso; fecha.setDate(fecha.getDate() + 1)) {
      fechasRango.push(fecha.toISOString().slice(0, 10).replace(/-/g, '/'));
    }
    let diasFeriadosenrango = 0;
    for (let i = 0; i < fechasFestivas.length; i++) {
      for (let j = 0; j < fechasRango.length; j++) {
        if (fechasFestivas[i] === fechasRango[j]) {
          diasFeriadosenrango++;
        }
      }
    }
    if(diaSemana == 6){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(2, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else if(diaSemana == 5){
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }
    else{
      var fechaReingreso = moment(fechaFinalizacionPermiso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      //fechaReingreso = day + '-' + month + '-' + year;
      fechaReingreso = year + '-' + month + '-' + day;
    }  
    var reingresoComp = moment(fechaReingreso);
    var day = reingresoComp.format('DD');
    var month = reingresoComp.format('MM');
    var year = reingresoComp.format('YYYY');
    reingresoComp = year + '/' + month + '/' + day;
    for (let i = 0; i < fechasFestivas.length; i++){
     if(fechasFestivas[i] === reingresoComp){
      fechaReingreso = moment(fechaReingreso).add(1, 'd');
      var day = fechaReingreso.format('DD');
      var month = fechaReingreso.format('MM');
      var year = fechaReingreso.format('YYYY');
      fechaReingreso = year + '-' + month + '-' + day;
     }  
    }
    //document.getElementById('fechaReingreso').value = fechaReingreso;
    var diasPermiso = fechaFinalizacionPermiso.diff(fechaDesdev, 'days');
    diasPermiso = diasPermiso - diasFeriadosenrango;
    //document.getElementById('totalDiaspermiso').value = diasPermiso;
    fechaInicioPermiso = moment(fechaDesdev);
    diaInicio = fechaInicioPermiso.day();
    var totaldiaspermiso = 0;
    for(i=0;i<=diasPermiso;i++){
        if( (diaInicio)!= 0 ){
          totaldiaspermiso = totaldiaspermiso + 1;
        }
      diaInicio = diaInicio + 1;
      if(diaInicio == 7){
        diaInicio = 0;
      }
    }
    if(totaldiaspermiso<7){
      alert("Puedes tomar parcialmente como mínimo 7 días continuos en tiempo");
      document.getElementById("botonGuardandoeditv").disabled = true;
    }
    else{
      document.getElementById('editarDiasdisfrutadosv').value = totaldiaspermiso;
      document.getElementById("botonGuardandoeditv").disabled = false;
      var diasComp = document.getElementById("editarDiascompensadov").value;
      document.getElementById("editarDiasliquidadosv").value = parseInt(totaldiaspermiso) + parseInt(diasComp);
    }
    document.getElementById('editarFechareingresov').value = fechaReingreso;
    //calcularDliquidados();
    desactivarLoading();
    var inputdD = document.getElementById('editarDiascompensadov'); // seleccionamos el input por su id
    inputdD.onchange(); // activamos el evento onchange
  }

  //función que habilita de edición de las solicitudes devuelta por embarazo
  function editarCampoemb(id){
    var checkBox = document.getElementById(id);
    if (checkBox.checked == true){
     document.getElementById("corregirEmb").style.display = 'block';
     document.getElementById('corregirEmb').innerHTML = 'Guardar cambios';
     if(id=='editarPruebaemb'){
       document.getElementById("menuEditarpruebaembarazo").style.display = 'block';
       //var x = document.getElementById("adjuntoEditarpruebaembarazo").required;
     }
     else if(id=='editarEpicrisis'){
       document.getElementById("menuEditarepicrisis").style.display = 'block';
     } 
     else if(id=='editarAutorizacion'){
       document.getElementById("menuEditarautorizacion").style.display = 'block';
     }
     else if(id=='editarFechaparto'){
       document.getElementById("menuEditarfechaparto").style.display = 'block';
     }
    }
    else{
     if(id=='editarPruebaemb'){
       document.getElementById("menuEditarpruebaembarazo").style.display = 'none';
     }
     else if(id=='editarEpicrisis'){
       document.getElementById("menuEditarepicrisis").style.display = 'none';
     } 
     else if(id=='editarAutorizacion'){
       document.getElementById("menuEditarautorizacion").style.display = 'none';
     }
     else if(id=='editarFechaparto'){
       document.getElementById("menuEditarfechaparto").style.display = 'none';
     } 
    }
  }

  //función que habilita de edición de las solicitudes devueltas por permiso remunerada
  function editarCampopr(id){
    var checkBox = document.getElementById(id);
    if (checkBox.checked == true){
     document.getElementById("corregirPr").style.display = 'block';
     document.getElementById('corregirPr').innerHTML = 'Guardar cambios';
     if(id=='cfechainicioPr'){
       document.getElementById("menuFechainiciopr").style.display = 'block';
       //var x = document.getElementById("adjuntoEditarpruebaembarazo").required;
     }
     else if(id=='cfechafinalizacionPr'){
       document.getElementById("menuFechafinalizacionpr").style.display = 'block';
     } 
     else if(id=='cfechaReingresoPr'){
       document.getElementById("menuFechareingresopr").style.display = 'block';
     }
     else if(id=='ctotaldiaspermisoPr'){
       document.getElementById("menuTotaldiaspermisopr").style.display = 'block';
     }
     else if(id=='cautorizacioncolaboradorPr'){
       document.getElementById("menuEditarautorizacionpr").style.display = 'block';
     }
     else if(id=='cdocumentoadjuntoPr'){
       document.getElementById("menuAdjuntardocumentopr").style.display = 'block';
     }
     else if(id=='cactadefuncionPr'){
       document.getElementById("menuActadedefuncionpr").style.display = 'block';
     }
     else if(id=='cregistrocivilPr'){
       document.getElementById("menuRegistrocivilpr").style.display = 'block';
     }
     else if(id=='cobservacionesPr'){
       document.getElementById("menuObservacionespr").style.display = 'block';
     }
     else if(id=='chorainicioPr'){
       document.getElementById("menuHorainiciopr").style.display = 'block';
     }else if(id=='chorafinalPr'){
       document.getElementById("menuHorafinalpr").style.display = 'block';
     }
     else if(id=='chorafinalPr'){
       document.getElementById("menuHorafinalpr").style.display = 'block';
     }
     else if(id=='ctiempopermisoPr'){
       document.getElementById("menuTiempopermisopr").style.display = 'block';
     }
    }
    else{
     if(id=='cfechainicioPr'){
       document.getElementById("menuFechainiciopr").style.display = 'none';
     }
     else if(id=='cfechafinalizacionPr'){
       document.getElementById("menuFechafinalizacionpr").style.display = 'none';
     } 
     else if(id=='cfechaReingresoPr'){
       document.getElementById("menuFechareingresopr").style.display = 'none';
     }
     else if(id=='ctotaldiaspermisoPr'){
       document.getElementById("menuTotaldiaspermisopr").style.display = 'none';
     }
     else if(id=='cautorizacioncolaboradorPr'){
       document.getElementById("menuEditarautorizacionpr").style.display = 'none';
     }
     else if(id=='cdocumentoadjuntoPr'){
       document.getElementById("menuAdjuntardocumentopr").style.display = 'none';
     }
     else if(id=='cactadefuncionPr'){
       document.getElementById("menuActadedefuncionpr").style.display = 'none';
     }
     else if(id=='cregistrocivilPr'){
       document.getElementById("menuRegistrocivilpr").style.display = 'none';
     }
     else if(id=='cobservacionesPr'){
       document.getElementById("menuObservacionespr").style.display = 'none';
     }
     else if(id=='chorainicioPr'){
       document.getElementById("menuHorainiciopr").style.display = 'none';
     }
     else if(id=='chorafinalPr'){
       document.getElementById("menuHorafinalpr").style.display = 'none';
     }
     else if(id=='ctiempopermisoPr'){
       document.getElementById("menuTiempopermisopr").style.display = 'none';
     }
    }
  }

  //función que guarda los cambio del formulario de correcciones para estado de embarazo
  function editarEstadoembarazo( form ){
    //utilizamos el input dataid oculto en el formulario para enviar solo una solicitud al servidor a traves del formulario
    document.getElementById("dataidemb").value = document.getElementById("idsolicitudh").value;
    document.querySelector('#corregirEmb').classList.toggle("d-none");
    document.querySelector('#botonGuardandoeditemb').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.querySelector('#corregirEmb').classList.toggle('d-none');
      document.querySelector('#botonGuardandoeditemb').classList.toggle('d-none');
      $('#estadoEmbarazomodalhistorial').modal('hide');
      datosHistorialderegistro();
      alert("La solicitud ha sido editada con exito");
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadeditEmbarazo( form );
  }

  //función que guarda los cambio del formulario de correcciones para retiro de personal
  function editarRetiropersonal( form ){
    //utilizamos el input dataid oculto en el formulario para enviar solo una solicitud al servidor a traves del formulario
    document.getElementById("dataidrp").value = document.getElementById("idsolicitudrp").value;
    document.querySelector('#corregirRp').classList.toggle("d-none");
    document.querySelector('#botonGuardandoeditrp').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.querySelector('#corregirRp').classList.toggle('d-none');
      document.querySelector('#botonGuardandoeditrp').classList.toggle('d-none');
      $('#retiroPersonalhistorial').modal('hide');
      datosHistorialderegistro();
      alert("La solicitud ha sido editada con exito");
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadeditRp( form );
  }

  //función que guarda los cambio del formulario de correcciones para reintegro de personal
  function editarReintegropersonal( form ){
    //utilizamos el input dataid oculto en el formulario para enviar solo una solicitud al servidor a traves del formulario
    document.getElementById("dataidrip").value = document.getElementById("idsolicitudrip").value;
    document.querySelector('#corregirRip').classList.toggle("d-none");
    document.querySelector('#botonGuardandoeditrip').classList.toggle("d-none");
    event.preventDefault();
    google.script.run
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.querySelector('#corregirRip').classList.toggle('d-none');
      document.querySelector('#botonGuardandoeditrip').classList.toggle('d-none');
      $('#reintegroPersonalhistorial').modal('hide');
      datosHistorialderegistro();
      alert("La solicitud ha sido editada con exito");
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadeditRip( form );
  }

  //función que guarda los cambio del formulario de correcciones para retiro de personal
  function editarVacaciones( form ){
    //utilizamos el input dataid oculto en el formulario para enviar solo una solicitud al servidor a traves del formulario
    document.getElementById("dataidv").value = document.getElementById("idsolicitudv").value;
    document.querySelector('#corregirV').classList.toggle("d-none");
    document.querySelector('#botonGuardandoeditv').classList.toggle("d-none");
    document.getElementById("editarFechareingresov").disabled = false;
    document.getElementById("editarDiasdisfrutadosv").disabled = false;
    document.getElementById("editarDiasliquidadosv").disabled = false;
    document.getElementById("menueditarFechareingresov").style.display = "none";
    document.getElementById("menueditarDiasdisfrutadosv").style.display = "none";
    document.getElementById("menueditarDiasliquidadosv").style.display = "none";
    event.preventDefault();
    google.script.run
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.querySelector('#corregirV').classList.toggle('d-none');
      document.querySelector('#botonGuardandoeditv').classList.toggle('d-none');
      document.getElementById("editarFechareingresov").disabled = true;
      document.getElementById("editarDiasdisfrutadosv").disabled = true;
      document.getElementById("editarDiasliquidadosv").disabled = true;
      document.getElementById("menueditarFechareingresov").style.display = "block";
      document.getElementById("menueditarDiasdisfrutadosv").style.display = "block";
      document.getElementById("menueditarDiasliquidadosv").style.display = "block";
      $('#vacacioneshistorial').modal('hide');
      datosHistorialderegistro();
      alert("La solicitud ha sido editada con exito");
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadeditV( form );
  }


  //función que guarda los cambio del formulario de correcciones para permiso remunerado
  function editarPermisoremunerado( form ){
    event.preventDefault();
    //utilizamos el input dataid oculto en el formulario para enviar solo una solicitud al servidor a traves del formulario
    document.getElementById("dataidpr").value = document.getElementById("idsolicitudeditPr").value;
    document.getElementById("datatipopermiso").value = document.getElementById("tipopermisoPr").value;
    document.querySelector('#corregirPr').classList.toggle("d-none");
    document.querySelector('#botonGuardandoeditpr').classList.toggle("d-none"); 
    document.getElementById("editarFechareingresopr").disabled = false;
    document.getElementById("editarTotaldiaspermisopr").disabled = false;
    document.getElementById("tiempoPermisopr").disabled = false;
    document.getElementById("menuFechareingresopr").style.display = 'none';
    document.getElementById("menuTotaldiaspermisopr").style.display = 'none';
    document.getElementById("menuTiempopermisopr").style.display = 'none';
    google.script.run
    .withSuccessHandler(function() {
      //ocultamos boton con spinner cargando...
      document.querySelector('#corregirPr').classList.toggle('d-none');
      document.querySelector('#botonGuardandoeditpr').classList.toggle('d-none');
      document.getElementById("editarFechareingresopr").disabled = true;
      document.getElementById("editarTotaldiaspermisopr").disabled = true;
      document.getElementById("tiempoPermisopr").disabled = true;
      document.getElementById("menuFechareingresopr").style.display = 'block';
      document.getElementById("menuTotaldiaspermisopr").style.display = 'block';
      document.getElementById("menuTiempopermisopr").style.display = 'block';
      $('#permisoRemuneradomodalhistorial').modal('hide');
      datosHistorialderegistro();
      alert("La solicitud ha sido editada con exito");
    })
    .withFailureHandler ( showError ) //función de respuesta de error del lado del servidor
    .uploadeditPr( form );
  }

  //función que refresca la pagina en la cual se estaba navegando
  function reLoad( paginaOrigen ) {
    google.script.run
    .withSuccessHandler(function(url){
      window.open(url,'_top');
    })
    .getScriptURLp( paginaOrigen );
  }

  //función que despliega el modal cargando...
  function activarLoading(){
    //loadingModal.show();
    $('#loadingModal').modal("show");
  }
  
  //función que oculta el modal cargando...
  function desactivarLoading(){
    //alert("lll");
    $('#loadingModal').modal("hide");
  }

  //función para personalizar los mensajes de alerta
  function alertDGC(mensaje) {
    var dgcTiempo = 500;
    var ventanaCS = '<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje" style="text-align: justify;">' + mensaje + '<br><div class="dgcAceptar" >Aceptar</div></div></div></div></div>';
    $('body').append(ventanaCS);
    var alVentana = $('.dgcVentana').height();
    var alNav = $(window).height();
    var supNav = $(window).scrollTop();
    $('.dgcAlert').css('height', $(document).height());
    $('.dgcVentana').css('top', ((alNav - alVentana) / 2 + supNav - 100) + 'px');
    $('.dgcAlert').css('display', 'block');
    $('.dgcAlert').animate({opacity: 1}, dgcTiempo);
    $('.dgcCerrar,.dgcAceptar, .dgcCerrar2').click(function (e) {
        $('.dgcAlert').animate({opacity: 0}, dgcTiempo);
        setTimeout("$('.dgcAlert').remove()", dgcTiempo);
    });
  }
  window.alert = function (message) {
    alertDGC(message);
  };

  function datosPendientesaprobacion(){
        //activarLoading();
        //event.preventDefault();
        var resultados = document.getElementById('table');
        resultados.innerHTML = '';
        table = [];
        var datostablas = [['Número Predial'], ['t_id_lc_terreno'], ['Área Terreno'], ['Matricula'], ['Dirección']];
        var datosTable = [];
        var datauser = validacionusuarios();
        /*var datoslcinteresados = select_query("SELECT t_id FROM valparaiso.lc_interesado where documento_identidad = '"+datauser[0][8]+"'");
        var datoslcderecho = select_query("SELECT unidad FROM valparaiso.lc_derecho where interesado_lc_interesado = '"+datoslcinteresados+"'");
        var datoslcpredio = [];
        for(j = 0; j < datoslcderecho.length; j++) {
            var resultado = select_query("SELECT * FROM valparaiso.lc_predio where t_id = '" + datoslcderecho[j][0] + "'");
            datoslcpredio.push(resultado);
        }
        var coluebaunit = [];
        for(l = 0; l < datoslcpredio.length; l++){
          var resultado2 = select_query("SELECT ue_lc_terreno FROM valparaiso.col_uebaunit where baunit = '"+datoslcpredio[l][0][0]+"' and ue_lc_terreno is not null");
          coluebaunit.push(resultado2); 
        }
        var lcterreno =[];
        for(m = 0; m < datoslcpredio.length; m++){
          var resultado3 = select_query("SELECT * FROM valparaiso.lc_terreno where t_id = '"+coluebaunit[0][0]+"'");
          lcterreno.push(resultado3);
        }*/

        var sqlCompilada = select_query("SELECT lp.*, lt.* FROM valparaiso.lc_interesado li JOIN valparaiso.lc_derecho ld ON li.t_id = ld.interesado_lc_interesado JOIN valparaiso.lc_predio lp ON ld.unidad = lp.t_id JOIN valparaiso.col_uebaunit cu ON lp.t_id = cu.baunit JOIN valparaiso.lc_terreno lt ON cu.ue_lc_terreno = lt.t_id WHERE li.documento_identidad = '"+datauser[0][8]+"'");
        //console.log(sqlCompilada);
        for(n =0; n < sqlCompilada.length; n++){
          datosTable.push([sqlCompilada[n][8], sqlCompilada[n][26], sqlCompilada[n][28], sqlCompilada[n][7], sqlCompilada[n][21]]);  
        }
        var select = datosTable;
        var filtro = "pendienteAprobacionembarazo";
        buildTableSelect(datostablas, select, filtro);
  }

  function cerrarModal(){
    $('#generartramite').modal('hide');
  }

  function cerrarModalmapa(){
    $('#mostrarMapa').modal('hide');
  }

  function selectMutacion(){
    ocultarBotonesAdj();
    var selecttramite = document.getElementById("gtramites").value;
    if(selecttramite == 'cambiopropietario'){
      document.getElementById("adjtradicion").style.display = 'flex';
      document.getElementById("adjescritura").style.display = 'flex';
      document.getElementById("botradicarMutacion").style.display = 'flex';
    }
    else if(selecttramite == 'agregacionsegregacion'){
      document.getElementById("adjtradicion").style.display = 'flex';
      document.getElementById("adjescritura").style.display = 'flex';
      document.getElementById("adjplanocuraduria").style.display = 'flex';
      document.getElementById("botradicarMutacion").style.display = 'flex';
    }
    else if(selecttramite == 'nuevasedificaciones'){
      document.getElementById("adjtradicion").style.display = 'flex';
      document.getElementById("adjescritura").style.display = 'flex';
      document.getElementById("adjplanocuraduria").style.display = 'flex';
      document.getElementById("adjlicenciaconstruccion").style.display = 'flex';
      document.getElementById("botradicarMutacion").style.display = 'flex';   
    }
    else if(selecttramite == 'afectacionavaluo'){
      document.getElementById("adjtradicion").style.display = 'flex';
      document.getElementById("adjescritura").style.display = 'flex';
      document.getElementById("botradicarMutacion").style.display = 'flex';
      document.getElementById("adjotros").style.display = 'flex';
    }
    else if(selecttramite == 'inscripcionpredios'){
      document.getElementById("adjtradicion").style.display = 'flex';
      document.getElementById("adjescritura").style.display = 'flex';
      document.getElementById("botradicarMutacion").style.display = 'flex';
    }
    else if(selecttramite == 'certificadocatastral'){
      document.getElementById("botradicarMutacion").style.display = 'flex';
    }
  }

  function ocultarBotonesAdj(){
    document.getElementById("adjtradicion").style.display = 'none';
    document.getElementById("adjescritura").style.display = 'none';
    document.getElementById("adjplanocuraduria").style.display = 'none';
    document.getElementById("adjlicenciaconstruccion").style.display = 'none';
    document.getElementById("adjotros").style.display = 'none';
    document.getElementById("botradicarMutacion").style.display = 'none';
    var fileInput = document.getElementById('file');
    /*var fileNameDisplay = document.getElementById('file-name1');
    // Reinicia el input de archivo
    fileInput.value = '';
    // Limpia el texto del elemento que muestra el nombre del archivo
    fileNameDisplay.textContent = '';*/
  }

  function uploadFile() {
    var selecttramiteup = document.getElementById("gtramites").value;
    if(selecttramiteup !== 'certificadocatastral'){
      document.querySelector('#botonGuardando').classList.toggle("d-none");
      document.querySelector('#botradicarMutacion').classList.toggle("d-none");
      /*var file = document.getElementById('file').files[0]; // Obtiene el archivo seleccionado
      console.log(file);
      var filename = file.name; // Obtiene el nombre del archivo para usarlo en la ruta de carga
      var url = 'https://storage.googleapis.com/la_celia/CARTOGRAFIA_BASICA/' + encodeURIComponent(filename);
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.setRequestHeader('x-goog-acl', 'public-read'); // Asegúrate de que el bucket esté configurado para aceptar esta cabecera

      xhr.onload = function(e) {
          if (this.status === 200) {
              console.log('Archivo cargado: ', this.responseText);
          } else {
              console.log('Error al cargar el archivo');
          }
      };
      xhr.send(file);*/
      setTimeout(function() {
        document.querySelector('#botonGuardando').classList.toggle("d-none");
        document.querySelector('#botradicarMutacion').classList.toggle("d-none");
        var ahora = new Date();
        var fechaHoraActual = ahora.toString();
        var dia = ahora.getDate();
        var mes = ahora.getMonth() + 1; // Los meses comienzan en 0
        var año = ahora.getFullYear();
        var hora = ahora.getHours();
        var minutos = ahora.getMinutes();
        var segundos = ahora.getSeconds();
        var valorAleatorio = generarValorAleatorio();
        var fechaFormateada = dia + "/" + mes + "/" + año + " " + hora + ":" + minutos + ":" + segundos;
        var idrad = dia + "" + mes + "" + año + "" + hora + "" + minutos + "" + segundos + "" + valorAleatorio;
        console.log(idrad);
        alert("El trámite fue radicado con éxito y el código de radicado es: <b>" + idrad + "</b> , Los datos del trámite fueron enviados al correo electrónico registrado.");
        cerrarModal();
    }, 3000); // 3000 milisegundos equivalen a 3 segundos
  //cerrarModal() 
  }
  else{
    alert("xxx");
  }
}

function updateFileName1() {
  var input = document.getElementById('file');
  var fileName = document.getElementById('file-name1');
  if (input.files && input.files.length > 0) {
      fileName.textContent = input.files[0].name;
  } else {
      fileName.textContent = '';
  }
}

function generarValorAleatorio() {
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var resultado = '';
  for (var i = 0; i < 4; i++) {
      resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
}

function cerrarsesionT(){
  //eliminarCookies();
  window.location.href="../index.html";
}