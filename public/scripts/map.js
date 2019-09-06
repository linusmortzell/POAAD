/**
 * A module for showing the map.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

var zoom = 16

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error)
} else {
  alert('Your browser doesn\'t support geolocation')
}

function success (position) {
  var lon = position.coords.longitude
  var lat = position.coords.latitude

  // var lonLat = OSMlonLat(lon, lat)

  // map.addLayer(markers)
  // markers.addMarker(new OpenLayers.Marker(lonLat))

  var pos = ol.proj.fromLonLat([lon, lat])

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: pos,
      zoom: 17
    })
  })

  var marker = new ol.Overlay({
    position: pos,
    positioning: 'center-center',
    element: document.getElementById('marker'),
    stopEvent: false
  })
  map.addOverlay(marker)

  // navigator.geolocation.watchPosition(updatePos, error)
}

function error (error) {
  alert('Sorry, an error occured: ' + error)
}

function updatePos (pos) {
  
}

function OSMlonLat (lon, lat) {
  var lonLat = new OpenLayers.LonLat( lon, lat).transform(
    new OpenLayers.Projection('EPSG:4326'), // transform from WGS 1984
    map.getProjectionObject() // to Spherical Mercator Projection
  )
  return lonLat
}

function getPosition () {
  navigator.geolocation.getCurrentPosition(success, error)
}

/*
 var isobaths = new ol.layer.Image({
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
