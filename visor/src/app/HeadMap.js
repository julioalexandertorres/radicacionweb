//globalstyle = "sinconsulta";
/*function putgif() {
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
 await generateheatmap(x);
 await quitgif();
 };*/
function generateheatmap() {
    var styleheatmap = globalstyle;
    var pgetextentheatmap2 = [-8086065, 874885, -8056192, 890166];
    //var pgetextentheatmap2 = [-8095392.391925, 870144.331783, -8046973.877366, 894653.608457];
    var pgetextentheatmap = [-8076738.790233, 879627.909247, -8065411.891871, 885679.062775];
    predio.setVisible(true);
    predio.getSource().updateParams({'STYLES': 'predios_sin_consulta_cucuta', 'CQL_FILTER': null});
    heatmap.setVisible(true);
    document.getElementById("contenedorg").style.display = "none";
    if (styleheatmap === "Tipo Construccion") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios con condicion de propiedad horizontal</br></br>");
        var valor = "'" + 800 + "'";
        var filtro = '"cod_ph>=' + valor + '"';
        heatmap.getSource().updateParams({'CQL_FILTER': eval(filtro)});
        heatmap.getSource().updateParams({'STYLES': 'heatmapph_ysld'});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    }
    // consulta área construida vs prestadores
    else if (styleheatmap === "Área Construida Prestadores") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios con condicion de área construida cero y que reciben algún tipo de servicio público</br></br>");
        var valor = 1;
        var filtro = '"prestadores=' + valor + '"';
        console.log(filtro);
        heatmap.getSource().updateParams({'CQL_FILTER': eval(filtro)});
        heatmap.getSource().updateParams({'STYLES': 'heatmapph_ysld'});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    }

    // consultas comparacion estrato y destino 
    else if (styleheatmap === "oficial_vs_AAA") {
        if (document.getElementById("oficial_vs_AAA").value === "Acueducto") {
            heatmap.setVisible(true);
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios de estrato mas alto en la base del prestador Acueducto que en la base de Hacienda del Municipio</br></br>");
            var valor = "'" + "prest" + "'";
            var filtro = '"dif_est_ac=' + valor + '"';
            heatmap.getSource().updateParams({'CQL_FILTER': eval(filtro)});
            heatmap.getSource().updateParams({'STYLES': 'heatmapest'});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        } else if (document.getElementById("oficial_vs_AAA").value === "Alcantarillado") {
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios de estrato mas alto en la base del prestador Alcantarillado que en la base de Hacienda del Municipio</br></br>");
            var valor = "'" + "prest" + "'";
            var filtro = '"dif_est_al=' + valor + '"';
            heatmap.getSource().updateParams({'CQL_FILTER': eval(filtro)});
            heatmap.getSource().updateParams({'STYLES': 'heatmapest'});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        } else if (document.getElementById("oficial_vs_AAA").value === "Aseo") {
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios de estrato mas alto en la base del prestador Aseo que en la base de Hacienda del Municipio</br></br>");
            var valor = "'" + "prest" + "'";
            var filtro = '"dif_est_as=' + valor + '"';
            heatmap.getSource().updateParams({'CQL_FILTER': eval(filtro)});
            heatmap.getSource().updateParams({'STYLES': 'heatmapest'});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        }

    } else if (styleheatmap === "Uso_oficial_vs_AAA") {
        predio.setVisible(true);
        if (document.getElementById("Uso_oficial_vs_AAA").value === "Acueducto") {
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios con destino comercial en la base del prestador de Acueducto y con destino Habitacional en la base de Hacienda del Municipio</br></br>");
            var valor = "'" + "PCDR" + "'";
            var filtro = '"dif_uso_ac=' + valor + '"';
            heatmap.getSource().updateParams({'STYLES': 'heatmapest', 'CQL_FILTER': eval(filtro)});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        } else if (document.getElementById("Uso_oficial_vs_AAA").value === "Alcantarillado") {
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios con destino comercial en la base del prestador de Alcantarillado y con destino Habitacional en la base de Hacienda del Municipio</br></br>");
            var valor = "'" + "PCDR" + "'";
            var filtro = '"dif_uso_al=' + valor + '"';
            heatmap.getSource().updateParams({'STYLES': 'heatmapest', 'CQL_FILTER': eval(filtro)});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        } else if (document.getElementById("Uso_oficial_vs_AAA").value === "Aseo") {
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios con destino comercial en la base del prestador de Aseo y con destino Habitacional en la base de Hacienda del Municipio</br></br>");
            var valor = "'" + "PCDR" + "'";
            var filtro = '"dif_uso_as=' + valor + '"';
            heatmap.getSource().updateParams({'STYLES': 'heatmapest', 'CQL_FILTER': eval(filtro)});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        }
    } else if (styleheatmap === "exentos") {

    } else if (styleheatmap === "Saneamiento") {
        predio.setVisible(true);
        if (document.getElementById("Saneamiento").value === "Acueducto") {
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios no reportados dentro de la base del prestador de Acueducto</br></br>");
            var valor = "'" + "SIN INFORMACION" + "'";
            var filtro = '"disp_acued=' + valor + '"';
            heatmap.getSource().updateParams({'STYLES': 'heatmapdisp', 'CQL_FILTER': eval(filtro)});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        } else if (document.getElementById("Saneamiento").value === "Alcantarillado") {
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios no reportados dentro de la base del prestador de Alcantarillado</br></br>");
            var valor = "'" + "SIN INFORMACION" + "'";
            var filtro = '"disp_alc=' + valor + '"';
            heatmap.getSource().updateParams({'STYLES': 'heatmapdisp', 'CQL_FILTER': eval(filtro)});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        } else if (document.getElementById("Saneamiento").value === "Aseo") {
            alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios no reportados dentro de la base de los prestadores de Aseo</br></br>");
            var valor = "'" + "SIN INFORMACION" + "'";
            var filtro = '"disp_aseo=' + valor + '"';
            heatmap.getSource().updateParams({'STYLES': 'heatmapdisp', 'CQL_FILTER': eval(filtro)});
            map.getView().fitExtent(pgetextentheatmap2, map.getSize());
        }
    } else if (styleheatmap === "valorizacion") {
        heatmap.setVisible(false);
        alert("GESSTOR INFORMA:</br></br>Esta funcionalidad no esta disponible para esta consulta</br></br>");
    } else if (document.getElementById("Avaluo Catastral").value === "avaluoporrangos") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios con un Avaluo Catastral mayor a 500 millones de pesos</br></br>");
        var valor = "'" + 500000000 + "'";
        var filtro = '"avaluo>' + valor + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmapravaluo', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    } else if (document.getElementById("Avaluo Catastral").value === "crecimientobase") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de crecimiento de la base Predial desde el año 2015</br></br>");
        var valor1 = "'" + "2016" + "'";
        var valor2 = "'" + "2017" + "'";
        var valor3 = "'" + "2018" + "'";
        var filtro = '"vig_incorp=' + valor1 + ' OR vig_incorp=' + valor2 + ' OR vig_incorp=' + valor3 + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmapcre', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    } else if (document.getElementById("Avaluo Catastral").value === "pagopredial") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios que no reportaron el pago a tiempo del Impuesto Predial del año 2017</br></br>");
        var valor = "'" + "NO" + "'";
        var filtro = '"pago_2017=' + valor + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmappredial', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    } else if (document.getElementById("Avaluo Catastral").value === "pagopredial2018") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios que ya cancelaron el impuesto predial para la vigencia 2018</br></br>");
        var valor = "'" + "NO" + "'";
        var filtro = '"deuda_2018=' + valor + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmappredial', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    } else if (document.getElementById("Avaluo Catastral").value === "cambiosavaluo") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios que tuvieron un cambio abrupto en el valor del avaluo</br></br>");
        var valor = "'" + 10 + "'";
        var filtro = '"var_predial>' + valor + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmapcre', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    } else if (document.getElementById("Avaluo Catastral").value === "cambiosavaluo2017") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios donde se radico solicitud de cambio de avaluo catastral </br></br>");
        var valor = "'" + 0 + "'";
        var filtro = '"aval2017p<' + valor + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmapcre', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    } else if (document.getElementById("Avaluo Catastral").value === "prediosmunicipio") {
        alert("GESSTOR INFORMA:</br></br>El siguiente mapa muestra las zonas de concentracion de predios que en la base igac aparecen como propiedad del Municipio </br></br>");
        var valor = "'" + "Municipio" + "'";
        var filtro = '"propietari=' + valor + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmapcre', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    } else if (styleheatmap === "Estratificacion") {
        heatmap.setVisible(false);
        alert("GESSTOR INFORMA:</br></br>Esta funcionalidad no esta disponible para esta consulta</br></br>");
    } else if (styleheatmap === "DiferenciaArea") {
        alert("GESSTOR INFORMA:</br></br>Este mapa muestra la concentracion de predios donde el área de registro y el área gráfica difiere en un porcentaje mayor a 10%</br></br>");
        var valor1 = "'" + 11 + "'";
        var valor2 = "'" + 10000 + "'";
        var filtro = '"dif_area_t>' + valor1 + ' AND dif_area_t<' + valor2 + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmapcre', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    } else if (styleheatmap === "Remoción en Masa") {
        alert("GESSTOR INFORMA:</br></br>Este mapa muestra la concentracion de predios con muy alto riesgo de Remoción en Masa</br></br>");
        var valor1 = "'" + 11 + "'";
        var valor2 = "'" + 10000 + "'";
        var valor = "'" + "Muy Alto Riesgo" + "'";
        var filtro = '"remocion=' + valor + '"';
        heatmap.getSource().updateParams({'STYLES': 'heatmapcre', 'CQL_FILTER': eval(filtro)});
        map.getView().fitExtent(pgetextentheatmap2, map.getSize());
    }


}
