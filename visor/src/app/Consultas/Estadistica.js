function estdistica(select, titulo, param, totales, id) {
        document.getElementById("contenedorg").style.display = "block";
        document.getElementById("statistics").style.display = "block";
        document.getElementById("statistics2").style.display = "block";
        document.getElementById("botonmaximizar").style.display = "none";
        document.getElementById("contenedorgauge").style.display = "none";  

        var color = new Array(param.length);
        var dat = new Array(param.length);
        for (i = 0; i < param.length; i++) {
             if (param[i][0] === 'Direcciones Georeferenciadas') {
                color[i] = '#FFB203';
            } else if (param[i][0] === 'Direcciones sin Georeferenciar') {
                color[i] = '#ff3232';
            } 
        
     
            dat[i] = new Array(param.length);
            for (j = 0; j < param.length; j++) {
                if (i === j) {
                    dat[i][j] = totales[i][0];
                } else {
                    dat[i][j] = 0;
                }
            }
        }
    
    var serie = "[";
    for (i = 0; i < param.length; i++) {
        serie = serie + "{name: '" + param[i][0] + "',color: '" + color[i] + "',data: [" + dat[i] + "]";
        if (i === param.length - 1) {
            serie = serie + "}]";
        } else {
            serie = serie + "},";
        }
    }
    var seriep = "[{name: '" + titulo + "',data:[";
    for (i = 0; i < param.length; i++) {
        seriep = seriep + "{name: '" + param[i][0] + "',color: '" + color[i] + "',y: " + Math.round(dat[i][i] * 100 / select[0]) + "";
        if (i === param.length - 1) {
            seriep = seriep + "}]}]";
        } else {
            seriep = seriep + "},";
        }
    }
    //series: [{name: 'NPH',color: '#7f7fff',data: [12043,0,0]},{name: 'PH',color: '#ffff4c',data: [0,1832,0]},{name: 'No Const',color: '#7fbf7f',data: [0,0,647]}]
    //Highcharts Estadisticas Rango de áreas
    //console.log(id);
   // if (id !== "pie") {
       
 if(id == "gauge") { 
    document.getElementById("contenedorg").style.display = "none";
     document.getElementById("contenedorgauge").style.display = "block";   
    var serieg = "[";
    for (i = 0; i < param.length; i++) {
        serieg = serieg + "'" + param[i][0] + "  " + dat[i][i] + "', " + dat[i][i] + "],";
        if (i === param.length - 1) {
            serieg = serieg;
        } else {
            serieg = serieg + "[";
        }
    }
    serieg = "[" + serieg + "]";
   
    
    $(function () {
     Highcharts.chart('statistics3', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: titulo,
        align: 'center',
        verticalAlign: 'middle',
        y: 60
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'black',
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '150%'
        }
    },
    credits: {
                    enabled: false
                },
    series: [{
        type: 'pie',
        name: titulo,
        colors: color,
        innerSize: '50%',
        data: eval(serieg)      
     }]
    });
   }); 
   
}
       
       else{

            subtitulo='<span style="color: red">Total Predios: ' + select[0] + '</span>'
      
        $(function () {
            Highcharts.chart('statistics', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: titulo
                },
                subtitle: {
                    
                    text: subtitulo
                },
                xAxis: {
                    categories: param
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Número de Puntos'
                    }
                },
                legend: {
                    reversed: false
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: ('#000000')
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: eval(serie)
                        //series: [{name: 'NPH',color: '#7f7fff',data: [12043,0,0]},{name: 'PH',color: '#ffff4c',data: [0,1832,0]},{name: 'No Const',color: '#7fbf7f',data: [0,0,647]}]
            });
        });

        $(function () {
            Highcharts.chart('statistics2', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: titulo
                },
                subtitle: {
                    text: '<span style="color: red">Total Predios: ' + select[0] + '</span>'
                },
                legend: {
                    reversed: false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b><br>{point.percentage:.1f}%,',
                            color: ('#000000')
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: eval(seriep)
                        //series: [{name: 'NPH',color: '#7f7fff',data: [12043,0,0]},{name: 'PH',color: '#ffff4c',data: [0,1832,0]},{name: 'No Const',color: '#7fbf7f',data: [0,0,647]}]
            });
        });
    
    
  /*  $(function () {
            Highcharts.chart('statistics3', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45                       
                    }
                },
                title: {
                    text: titulo
                },
                subtitle: {
                    text: '<span style="color: red">Total Predios: ' + select[0] + '</span>'
                },
                legend: {
                    reversed: false
                },
                plotOptions: {
                    pie: {
                       innerSize: 100,
                        depth: 45
                        }
                   // }
                },
                credits: {
                    enabled: false
                },
                series: eval(seriep)
                        //series: [{name: 'NPH',color: '#7f7fff',data: [12043,0,0]},{name: 'PH',color: '#ffff4c',data: [0,1832,0]},{name: 'No Const',color: '#7fbf7f',data: [0,0,647]}]
            });
        });*/
    
     } 


//nueva funcion

function estadistica_espacio_publico(select, param, totales, porcentajes) {
    if (totales === null) {
        alert("No existe espacio público en esta area");
    }
    document.getElementById("statistics").style.display = "block";
    var color = new Array(param.length);
    var dat = new Array(param.length);
    for (i = 0; i < param.length; i++) {
        if (param[i][0] === 'Espacio Publico') {
            color[i] = '#7fbf7f';
        } else if (param[i][0] === 'Espacio Publico Propuesto') {
            color[i] = '#ffff4c';
        } else if (param[i][0] === 'Parque') {
            color[i] = '#7f7fff';
        }
        dat[i] = new Array(param.length);

        for (j = 0; j < param.length; j++) {
            if (i === j) {
                dat[i][j] = totales[i][0];
                //console.log(dat[i][j]);
            } else {
                dat[i][j] = 0;
            }
        }
    }
    //console.log(porcentajes[0][0]);
    //console.log(porcentajes[1][0]);
    var existente = porcentajes[0][0];
    var propuesto = porcentajes[1][0];
    var totalhec = parseInt(existente) + parseInt(propuesto);
    var serie = "[";
    for (i = 0; i < param.length; i++) {
        serie = serie + "{name: '" + param[i][0] + "',color:'" + color[i] + "',data: [['" + param[i][0] + "'," + porcentajes[i] + "],{ y: 12.8,sliced: false, selected: true}]}";
        if (i === param.length - 1) {
            serie = serie + "]]";
        } else {
            serie = serie + "]";
        }
    }
//console.log(serie);

//[{name: 'Espacio Publico Propuesto',color:'#ffff4c',data: [['Espacio Publico Propuesto',0.8108160014234198],{ y: 12.8,sliced: false, selected: true}]}]{name: 'Espacio Publico',color:'#7fbf7f',data: [['Espacio Publico',0.770197994965995],{ y: 12.8,sliced: false, selected: true}]}]{name: 'Parque',color:'#7f7fff',data: [['Parque',0.41898600361058536],{ y: 12.8,sliced: false, selected: true}]}]]


    $(function () {

        $(document).ready(function () {

            // Build the chart
            Highcharts.chart('statistics', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Espacio Público'
                },
                subtitle: {
                    text: '<span style="color: red">Total Hectareas: ' + totalhec + '</span><br><span style="color: red">Total Hectareas Existentes: ' + parseInt(existente) + '</span><br><span style="color: red">Total Hectareas Propuestas: ' + parseInt(propuesto) + '</span>'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                        name: 'Espacio Público',
                        colorByPoint: true,
                        data: [{
                                name: 'Existente',
                                y: parseInt(existente)
                            }, {
                                name: 'Propuesto',
                                y: parseInt(propuesto),
                                sliced: true,
                                selected: true
                            }]
                    }]
            });
        });
    });

}

 }
 
 
 function estadisticaarboles(selectarb, titulo, param, totales, id) {

var gaugeOptions = {
    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor:'#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// The speed gauge
var chartSpeed = Highcharts.chart('statistics', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 200,
        title: {
            text: 'Speed'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Speed',
        data: [80],
        dataLabels: {
            format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">km/h</span>' +
                '</div>'
        },
        tooltip: {
            valueSuffix: ' km/h'
        }
    }]

}));

// The RPM gauge
var chartRpm = Highcharts.chart('statistics', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 5,
        title: {
            text: 'RPM'
        }
    },

    series: [{
        name: 'RPM',
        data: [1],
        dataLabels: {
            format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y:.1f}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">' +
                '* 1000 / min' +
                '</span>' +
                '</div>'
        },
        tooltip: {
            valueSuffix: ' revolutions/min'
        }
    }]

}));

// Bring life to the dials
setInterval(function () {
    // Speed
    var point,
        newVal,
        inc;

    if (chartSpeed) {
        point = chartSpeed.series[0].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200) {
            newVal = point.y - inc;
        }

        point.update(newVal);
    }

    // RPM
    if (chartRpm) {
        point = chartRpm.series[0].points[0];
        inc = Math.random() - 0.5;
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 5) {
            newVal = point.y - inc;
        }

        point.update(newVal);
    }
}, 2000);


}
 
