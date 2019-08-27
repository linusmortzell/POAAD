/**
 * A module for showing the map.
 *
 * @author Linus Mörtzell
 * @version 1.0.0
 */

'use strict'

console.log('hej hej')

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
map.addLayer(major)
