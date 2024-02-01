globalstyle = "sinconsulta";
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
function rango(style, id) {  
    globalstyle = style;
    document.getElementById("botonminimizar").style.display = "block";
    //document.getElementById("div_heatmap").style.display = "block";
    var pgetextent = [-8325183.102637, 1222020.558635, -8321300.877419, 1224257.524511];
    //predio.getSource().updateParams({'CQL_FILTER': null});
    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear: function (num) {
            num += '';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }
            return this.simbol + splitLeft + splitRight;
        },
        new : function (num, simbol) {
            this.simbol = simbol || '';
            return this.formatear(num);
        }
    }
    
    if (style === "SC") {
    			predio.setVisible(true);
     			construcciones.setVisible(false);
    			var select = search("amco:TotalPrediosAmco");
    		    var param = [['Prest Comercial-Mun Habitacional'], ['Mun Comercial-Prest Residencial'], ['Sin Comparación']];
                var total1 = search("amco:diferencia_destino_aguas", "prest");
                var total2 = search("amco:diferencia_destino_aguas", "mun");
                var total3 = search("amco:diferencia_destino_aguas", "Sin Comparacion");
                var totales = total1.concat(total2, total3);
                predio.getSource().updateParams({'STYLES': "diferencia_destino_aguas"});
               
                estdistica(select, style, param, totales, id);
            //map.getView().fitExtent(pgetextent, map.getSize());
  	
    	}
    else if(style === "FC") {
                predio.setVisible(true);
     			    construcciones.setVisible(false);
                var select = search("amco:TotalPrediosAmco");
    		       var param = [['Predio con Ficha'], ['Predio Sin Ficha']];
                var total1 = search("amco:ficha", "ficha");
                var total2 = search("amco:ficha", "Sin");
                 
                var totales = total1.concat(total2);
                predio.getSource().updateParams({'STYLES': "ficha"});
                var titulo = "Predios con Ficha";
                estdistica(select, titulo, param, totales, id);      
    }
    else if(style === "DI") {
                predio.setVisible(true);
     			    construcciones.setVisible(false);
                var select = search("amco:TotalPrediosAmco");
    		       var param = [['Consistentes'], ['Inconsistentes']];
                var total1 = search("amco:dif_ica", "igual");
                var total2 = search("amco:dif_ica", "diferente");
                 
                var totales = total1.concat(total2);
                predio.getSource().updateParams({'STYLES': "dif_ica"});
                var titulo = "ICA";
                estdistica(select, titulo, param, totales, id);      
    }
  
    else if(style === "DS") {
                predio.setVisible(true);
     			    construcciones.setVisible(false);
                var select = search("amco:TotalPrediosAmco");
    		       var param = [['Consistentes'], ['Inconsistentes'], ['Sin Comparación']];
                var total1 = search("amco:dif_sui", "igual");
                var total2 = search("amco:dif_sui", "diferente");
                var total3 = search("amco:dif_sui", "Sin Comparacion");
                 
                var totales = total1.concat(total2, total3);
                predio.getSource().updateParams({'STYLES': "dif_sui"});
                var titulo = "SUI";
                estdistica(select, titulo, param, totales, id);      
    }
    
    else if(style === "AUI") {
                predio.setVisible(true);
                aui.setVisible(true);
     			    construcciones.setVisible(false);
     			    var extent = [-8428496.537415, 536331.883370, -8425372.327742, 538123.786334];
     			    map.getView().fitExtent(extent, map.getSize());
                var select = search("amco:TotalPrediosAui");
    		       var param = [['Predios para reubicación'], ['Predios para compra']];
                var total1 = search("amco:aui_predios", "Predios para reubicacion");
                var total2 = search("amco:aui_predios", "Predios para compra");
               
                var totales = total1.concat(total2);
                predio.getSource().updateParams({'STYLES': ""});
                var titulo = "Proyecto Plan Parcial";
                estdistica(select, titulo, param, totales, id);   
                alert("El reporte corresponde al listado de predios que se intersectan con el poligono del proyecto del plan parcial");   
    				 window.open('./export/Reporte.xlsx');
    }
}
