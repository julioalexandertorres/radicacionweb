function InserGeom(mod) {
    var f = obsfeature.feature;
    var observacion = document.getElementById('observaciones').value;
    var coordinates = f.values_.geometry.flatCoordinates;
    var user = document.cookie.split('=');
    user = user[0];
    switch (mod) {
        case 'Point':
            var payload = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:amco="http://amco" xmlns:gml="http://www.opengis.net/gml">\n\
                <wfs:Insert>\n\
                    <amco:capa_punto>\n\
                        <amco:geom>\n\
                            <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">\n\
                                <gml:coordinates decimal="." cs="," ts=" ">\n\
                                    ' + coordinates + '\n\
                                </gml:coordinates>\n\
                            </gml:Point>\n\
                        </amco:geom>\n\
                        <amco:usuario>' + user + '</amco:usuario>\n\
                        <amco:observaciones>' + observacion + '</amco:observaciones>\n\
                    </amco:capa_punto>\n\
                </wfs:Insert>\n\
            </wfs:Transaction>';
            $.ajax('http://35.184.176.7:8081/geoserver/amco/ows', {
                type: 'POST',
                dataType: 'xml',
                processData: false,
                contentType: 'text/xml',
                data: payload,
                success: function (xml) {
                    highlighdrawp.setStyle(PuntoStyle);
                    var markerSour = highlighdrawp.getSource();
                    markerSour.addFeature(f);
                    document.getElementById("tblatt").style.visibility = "hidden";
                    document.getElementById("panel_atr").style.visibility = "hidden";
                    document.getElementById("contenedorg").style.visibility = "hidden";
                },
                error: function (xml) {
                    console.log(xml);
                }
            });
            break;
        case 'MultiLineString':
            var coord = '';
            for (i = 0; i < coordinates.length; i = i + 2) {
                coord += [coordinates[i] + "," + coordinates[i + 1]] + " ";
            }
            coord = coord.slice(0, -1);
            var payload = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:amco="http://amco" xmlns:gml="http://www.opengis.net/gml">\n\
                <wfs:Insert>\n\
                    <amco:capa_linea>\n\
                        <amco:geom>\n\
                            <gml:MultiLineString srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">\n\
                                <gml:lineStringMember>\n\
                                    <gml:LineString srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">\n\
                                        <gml:coordinates decimal="." cs="," ts=" ">\n\
                                            ' + coord + '\
                                        </gml:coordinates>\n\
                                    </gml:LineString>\n\
                                </gml:lineStringMember>\n\
                            </gml:MultiLineString>\n\
                        </amco:geom>\n\
                        <amco:usuario>' + user + '</amco:usuario>\n\
                        <amco:observaciones>' + observacion + '</amco:observaciones>\n\
                    </amco:capa_linea>\n\
                </wfs:Insert>\n\
            </wfs:Transaction>';
            $.ajax('http://35.184.176.7:8081/geoserver/amco/ows', {
                type: 'POST',
                dataType: 'xml',
                processData: false,
                contentType: 'text/xml',
                data: payload,
                success: function (xml) {
                    highlighdrawl.setStyle(BarrioStyle);
                    var markerSour = highlighdrawl.getSource();
                    markerSour.addFeature(f);
                    document.getElementById("tblatt").style.visibility = "hidden";
                    document.getElementById("panel_atr").style.visibility = "hidden";
                    document.getElementById("contenedorg").style.visibility = "hidden";
                },
                error: function (xml) {
                    console.log(xml);
                }
            });
            break;
        case 'MultiPolygon':
            var coord = '';
            for (i = 0; i < coordinates.length; i = i + 2) {
                coord += [coordinates[i] + "," + coordinates[i + 1]] + " ";
            }
            coord = coord.slice(0, -1);
            var payload = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:amco="http://amco" xmlns:gml="http://www.opengis.net/gml">\n\
                <wfs:Insert>\n\
                    <amco:capa_poligono>\n\
                        <amco:geom>\n\
                            <gml:MultiPolygon srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">\n\
                                <gml:polygonMember>\n\
                                    <gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">\n\
                                        <gml:outerBoundaryIs>\n\
                                            <gml:LinearRing>\n\
                                                <gml:coordinates decimal="." cs="," ts=" ">\n\
                                                    ' + coord + '\
                                                </gml:coordinates>\n\
                                            </gml:LinearRing>\n\
                                        </gml:outerBoundaryIs>\n\
                                    </gml:Polygon>\n\
                                </gml:polygonMember>\n\
                            </gml:MultiPolygon>\n\
                        </amco:geom>\n\
                        <amco:usuario>' + user + '</amco:usuario>\n\
                        <amco:observaciones>' + observacion + '</amco:observaciones>\n\
                    </amco:capa_poligono>\n\
                </wfs:Insert>\n\
            </wfs:Transaction>';
            $.ajax('http://35.184.176.7:8081/geoserver/amco/ows', {
                type: 'POST',
                dataType: 'xml',
                processData: false,
                contentType: 'text/xml',
                data: payload,
                success: function (xml) {
                    highlighdrawm.setStyle(BarrioStyle);
                    var markerSour = highlighdrawm.getSource();
                    markerSour.addFeature(f);
                    document.getElementById("tblatt").style.visibility = "hidden";
                    document.getElementById("panel_atr").style.visibility = "hidden";
                    document.getElementById("contenedorg").style.visibility = "hidden";
                },
                error: function (xml) {
                    console.log(xml);
                }
            });
            break;
    }
}