/**
 * A module for showing the map.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([18.02233, 64.83165]),
    zoom: 12
  })
})

navigator.geolocation.getCurrentPosition(function(position) {       
  document.getElementById('anzeige').innerHTML="Latitude: " + position.coords.latitude + "   Longitude: " +
  position.coords.longitude + "<p>";
  var lonLat = new OpenLayers.LonLat(position.coords.longitude,
    position.coords.latitude)
    .transform(
      new OpenLayers.Projection("EPSG:4326"), //transform from WGS 1984
      map.getProjectionObject() //to Spherical Mercator Projection
    );
                                  
  markers.addMarker(new OpenLayers.Marker(lonLat));
 
  map.setCenter(lonLat, 14 // Zoom level
  );
 
});

map.setCenter(new
OpenLayers.LonLat(3,3) // Center of the map
  .transform(
    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  ), 15 // Zoom level
);
var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

/* var isobaths = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://localhost:8000/geoserver/BlavikensFVO/wms',
    params: { LAYERS: 'BlavikensFVO:BlavikensFVO_1_20_250_Isobaths' },
    serverType: 'geoserver'
  })
})
var major = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://localhost:8000/geoserver/BlavikensFVO/wms',
    params: { LAYERS: 'BlavikensFVO:BlavikensFVO_1_20_250_Major' },
    serverType: 'geoserver'
  })
})
map.addLayer(isobaths)
map.addLayer(major) */
