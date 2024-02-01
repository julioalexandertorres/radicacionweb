function calcularbuffer(mod) {
    var f = obsfeature.feature;
    var metros = document.getElementById('valorbuffer').value;
    var coordinates = f.values_.geometry.flatCoordinates;
    
    //console.log(coordinates);
    //var coo = coordinates.replace(",", " ");
    //var user = document.cookie.split('=');
    //user = user[0];
    //console.log(parametrosunid);
    
            var params = "";
           // var datospuntos = search("bogota:datostab");
      //console.log(datospuntos.length);

       //for (i = 0; i < datospuntos.length; i++) {
          //  console.log(datospuntos[i][6],datospuntos[i][7]);

           // ol.proj.transform([eval(datos[0][7]), eval(datos[0][6])], 'EPSG:4326', 'EPSG:3857'));

         // var coo = ol.proj.transform([eval(datospuntos[i][7]), eval(datospuntos[i][6])], 'EPSG:4326', 'EPSG:3857');

           // console.log(coo);

            //console.log(coordinates[0], coordinates[1]);
          var viewparams = ['query:' + coordinates[0], 'query1:' + coordinates[1], 'query2:' + metros];
           
          // var viewparams = ['query:' + coo[0], 'query1:' + coo[1], 'query2:' + metros];
          // console.log(viewparams);

            params = viewparams.join(';');
            //console.log(params);
            buffer_point.getSource().updateParams({viewparams: params});
            buffer_point.setVisible(true);

            


            document.getElementById("tblatt").style.visibility = "hidden";
            document.getElementById("panel_atr").style.visibility = "hidden";

        // }
            //console.log("SELECT * FROM terreno_amco WHERE st_intersects(geom, ST_Transform(ST_Buffer('SRID=3857;POINT(" + coordinates[0] + " " + coordinates[1] + ")', " + metros + "),4326))");
           
       /*     var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, ST_Transform(ST_Buffer('SRID=3857;POINT(" + coordinates[0] + " " + coordinates[1] + ")', " + metros + "),4326))");
              selectelement(select);     */
            
       
            
       
            
            
          
    

}


function calcularbufferLinea(){
    document.getElementById("panel_atr").style.visibility = "visible";
        document.getElementById("panel_atr").style.display = "initial";
        document.getElementById("panel_atr").style.height = "auto";
        /*document.getElementById("contenedorg").style.display = "initial";
        document.getElementById("contenedorg").style.visibility = "visible";
        document.getElementById("contenedorg").style.height = "auto";*/
        var table = document.getElementById("tblatt");
         $(".modal-dialog").css("width", "250px");
        table.style.visibility = "visible";
        table.style.display = "initial";
        table.style.height = "auto";
        table.innerHTML = "";
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        cell1.colSpan = 2;
        cell1.innerHTML = "<H5><b>ZONA DE INFLUENCIA</b></H5>";
        var row = table.insertRow(1);
        var cell2 = row.insertCell(0);
        cell2.colSpan = 2;
        cell2.style = "background-color: white; color:black; font-size: 15px; border:0; text-align:left;";
        cell2.innerHTML = "<b>Ingrese un valor en metros:</b>";
        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        var row = table.insertRow(2);
        var cell3 = row.insertCell(0);
        cell3.colSpan = 2;
        cell3.style = "background-color: white; border:0; margin:0;";
        cell3.innerHTML = "<input type='text' id='valorbuffer' name='valorbuffer' style='background-color: #white; color:black; font-size: 15px; border-top:0px; border-left:0px; border-right:0px; border-bottom:1px solid #62BAD3; text-align:center; width:100%; height:2em;' placeholder='Ejemplo: 200'>";
        var row = table.insertRow(3);
        var cell4 = row.insertCell(0);
        cell4.colSpan = 2;
        cell4.style = "background-color: white; color:black; font-size: 10px; border:0; text-align:left;";
        //cell3.innerHTML = "<button type='button' onclick='loadobs();' class='btn btn-primary btn-md btn-block'>Guardar</button>";
        cell4.innerHTML = "<button type='button' onclick=bufferlinea() class='btn btn-primary btn-md btn-block'>Calcular</button>";
}

function bufferlinea(){
        var metross = document.getElementById('valorbuffer').value;
        var metros = document.getElementById('valorbuffer').value;
        metros = metros / 100000;
        var params = "";
        var viewparams = ['query:' + metros];
        params = viewparams.join(';');
        buffer_line_base.getSource().updateParams({viewparams: params});
        buffer_line_base.setVisible(true);
        document.getElementById("tblatt").style.visibility = "hidden";
        document.getElementById("panel_atr").style.visibility = "hidden";
        if(document.getElementById("valorbuffer").value<=500){
             /* var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, ST_Transform(ST_Buffer('SRID=3857;LINESTRING(" + coordinates[0] + " " + coordinates[1] + ", " + coordinates[2] + " " + coordinates[3] + ")', " + metros + "),4326))");*/
            
         var select = select_query("SELECT * FROM terreno_rural WHERE st_intersects(geom, ST_Transform(ST_Buffer('SRID=3857;LINESTRING(-8194153.50615 664154.659298,	-8194199.88965 664167.718092,	-8194255.54717 664191.818713,	-8194687.35324 664438.942208,	-8195039.79187 664712.822483,	-8195434.42391 665014.351046,	-8195902.40549 665368.370672,	-8196147.19593 665556.629768,	-8196344.56762 665713.442368,	-8196504.30886 665835.890642,	-8196763.79571 666035.784303,	-8197114.34078 666307.767148,	-8197532.68166 666603.036702,	-8197711.7936 667014.819603,	-8197877.55389 667372.884945,	-8198068.68389 667805.266281,	-8198273.51064 668260.711378,	-8198414.10604 668579.830002,	-8198517.41498 668812.30709,	-8198814.63468 669310.97376,	-8198974.82455 669590.467585,	-8199060.75985 669732.288494,	-8199244.10862 670042.229484,	-8199432.01926 670360.015776,	-8199745.3814 670893.616185,	-8200118.07683 671515.979328,	-8200183.97908 671633.851266,	-8200360.63755 671908.880258,	-8200464.8337 672070.184684,	-8200614.33912 672303.012814,	-8200766.06536 672536.067058,	-8201179.17199 673162.931904,	-8201337.91581 673404.837451,	-8201727.53737 674086.216263,	-8201988.90885 674649.067943,	-8202395.23279 675587.040707,	-8202498.53282 675726.632925,	-8202614.196 675883.471726,	-8202811.78253 676314.233979,	-8203049.78916 676683.923792,	-8203050.56395 677057.340917,	-8203105.22293 677313.365108,	-8203143.18065 677475.687889,	-8203205.07985 677738.986034,	-8203305.93531 678173.683909,	-8203407.90174 678581.407179,	-8203446.19453 678753.135758,	-8203491.28115 678933.047308,	-8203656.81657 679610.575583,	-8203715.81479 679868.515507,	-8203797.07579 680187.244804,	-8203846.05192 680400.398288,	-8203905.16257 680671.779332,	-8203970.17871 681155.867267,	-8203902.71799 681589.022709,	-8203847.06047 681908.765285,	-8203791.06677 682215.306156,	-8203819.00239 682682.956048,	-8203797.9619 682819.205331,	-8203664.04789 683153.068321,	-8203565.74944 683406.875746,	-8203662.15323 683601.234406,	-8204021.60943 684299.423647,	-8204122.01627 684557.824902,	-8204329.40115 685084.493972,	-8204489.15129 685322.412023,	-8204687.8577 685605.677689,	-8205028.04561 686275.895689,	-8205377.14465 686955.186994,	-8205570.16819 687315.163232,	-8205694.07012 687583.544427,	-8206247.32465 688635.936558,	-8206149.25886 688352.647159,	-8206364.99381 688745.770814,	-8206605.55745 688974.412283,	-8206851.45887 689196.89785,	-8207236.06994 689554.982508,	-8207612.44225 689907.916856,	-8207884.1709 690156.375215,	-8208035.12235 690284.476276,	-8208589.82292 690644.913901,	-8208866.78582 690833.252036,	-8209147.42448 691025.954936,	-8209358.59755 691174.095917,	-8209785.61578 691470.26657,	-8210188.4877 691754.687842,	-8210462.10989 691947.619043,	-8210733.16617 692125.768419,	-8211050.09276 692355.211267,	-8211186.34893 692448.486561,	-8212096.61398 693083.62264,	-8212313.34746 693223.706396,	-8212755.73445 693534.107007,	-8213174.62636 693675.984498,	-8213847.21983 693903.302758,	-8214380.77638 694008.331816,	-8214827.72636 694039.803001,	-8215729.19271 694100.943339,	-8215866.99734 694150.435753,	-8215950.26432 694183.13666,	-8216334.32546 694343.149606,	-8217780.47029 695338.659799,	-8218442.71662 696018.39315,	-8218509.39365 696087.044684,	-8218963.23765 695937.539599,	-8219369.11408 695808.093432,	-8219634.05002 695822.980061,	-8220283.38217 695900.585842,	-8220583.38152 695985.362775,	-8220839.86386 696076.287925,	-8221275.79432 696230.158027,	-8221656.84094 696666.887077,	-8222138.40683 697215.281227,	-8222300.60267 697402.748538,	-8222553.07193 697666.022377,	-8223156.53489 697910.374128,	-8223612.83348 698124.492307,	-8224212.95575 698955.666573,	-8224303.57538 699147.617003,	-8224532.11207 699834.894788,	-8225252.34806 700395.183798,	-8225470.86377 700603.603874,	-8225900.22527 701009.125385,	-8226122.09058 701184.176351,	-8226567.25722 701501.668919,	-8226895.75325 701741.117617,	-8227400.92666 702106.103409,	-8227490.98636 702171.729951,	-8227782.4219 702382.841134,	-8227954.6287 702504.585498,	-8228132.85454 702634.835067,	-8228219.34979 702648.390463,	-8228579.57966 702841.470217,	-8228954.72078 703058.291397,	-8229417.81208 703323.16791,	-8229664.38476 703464.393252,	-8230519.20713 704044.43116,	-8230670.93336 704085.867997,	-8231235.21632 704240.08772,	-8231533.65831 704829.990382,	-8231710.54943 705193.21187,	-8231894.7843 705567.400675,	-8232081.6875 705950.228825,	-8232312.67767 706417.945372,	-8232474.97592 706441.246361,	-8232521.6199 706401.967143)', " + metross + "),4326))");
              selectelement(select);     
            }
    
}




















