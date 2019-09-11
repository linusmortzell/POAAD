/**
 * A module for showing the map.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

var resolution = 3.92
var map
var marker
var blavik = [18.087922, 64.870118]

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error)
  navigator.geolocation.watchPosition(updatePos, error)
} else {
  alert('Your browser doesn\'t support geolocation')
}

function success (position) {
  var coords = [position.coords.longitude, position.coords.latitude]

  var pos = getOlProj(coords)
  createMap(pos)
  createMarker(pos)
}

function error (error) {
  alert('Sorry, an error occured: ' + error)
}

function updatePos () {
  console.log(map.getView().getProperties())
  getPosition()
    .then((position) => {
      var pos = getOlProj([position.coords.longitude, position.coords.latitude])
      map.setView(new ol.View({
        center: pos,
        resolution: resolution
      }))
      marker.setPosition(pos)
    })
    .catch((err) => {
      console.error(err.message)
    })
}

function createMap (pos) {
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: pos,
      resolution: resolution
    })
  })

  var blavikensFVO = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      url: 'http://localhost:8080/geoserver/BlavikensFVO/wms',
      params: { LAYERS: 'BlavikensFVO:BlavikensFVO_grupp' },
      serverType: 'geoserver'
    })
  })

  map.addLayer(blavikensFVO)
  map.on('postrender', e => { resolution = e.frameState.viewState.resolution })
}

function createMarker (pos) {
  marker = new ol.Overlay({
    position: pos,
    positioning: 'center-center',
    element: document.querySelector('#marker'),
    stopEvent: false
  })
  map.addOverlay(marker)
}

function getPosition (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

function getOlProj (position) {
  return ol.proj.fromLonLat([position[0], position[1]])
}

/*
 var isobaths = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://localhost:8000/geoserver/BlavikensFVO/wms',
    params: { LAYERS: 'BlavikensFVO:BlavikensFVO_grupp' },
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
