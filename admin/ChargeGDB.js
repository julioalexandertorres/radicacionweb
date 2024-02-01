function ChargeGDB() {
	//console.log("inicio");
    var archivos = document.getElementById("GBDfile");//Creamos un objeto con el elemento que contiene los archivos: el campo input file
    console.log(archivos);
    var archivo = archivos.files; //Obtenemos los archivos seleccionados en el imput
    console.log(archivo);
    //Creamos una instancia del Objeto FormDara.
    var archivos = new FormData();
    /* Como son multiples archivos creamos un ciclo for que recorra la el arreglo de los archivos seleccionados en el input
     Este y añadimos cada elemento al formulario FormData en forma de arreglo, utilizando la variable i (autoincremental) como 
     indice para cada archivo, si no hacemos esto, los valores del arreglo se sobre escriben*/
    archivos.append('archivo', archivo[0]);
    /*for (i = 0; i < archivo.length; i++) {
    	console.log(i);
        archivos.append('archivo' + i, archivo[i]); //Añadimos cada archivo a el arreglo con un indice direfente
    }*/
    console.log(archivos);
    //hacemos la petición ajax  
    $.ajax({
        url: 'upload.php',
        type: 'POST',
        //async: false,
        // Form data
        //datos del formulario
        data: archivos,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            console.log("1");
            //window.open('upload.php');
            message = $("<span class='before'>Subiendo los archivos, por favor espere...</span>");
            showMessage(message);
        },
        //una vez finalizado correctamente
        success: function (data) {
            console.log("exito");
        },
        error: function (xhr) {
        		console.log("error");
        	},
        	complete: function () {
        		console.log("completo");
        	}
    }).done( function () {
		alert("DONE");
	}).fail( function () {
		alert("fail");
	});
}
function showMessage(message) {
    $(".messages").html("").show();
    $(".messages").html(message);
}
