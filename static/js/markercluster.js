$( document ).ready(function() {

L.mapbox.accessToken = 'pk.eyJ1IjoiYmVra2EiLCJhIjoiY2lvdGllNmRuMDBicXVjbThjeWVjZnNxayJ9.HlEvEtM4nNTSonVEtFtaCw';
// Here we don't use the second argument to map, since that would automatically
// load in non-clustered markers from the layer. Instead we add just the
// backing tileLayer, and then use the featureLayer only for its data.
var map = L.mapbox.map('map')
    .setView([37.780, -122.419], 13)
    .addLayer(L.mapbox.tileLayer('mapbox.streets'));


// Since featureLayer is an asynchronous method, we use the `.on('ready'`
// call to only use its marker data once we know it is actually loaded.
$.getJSON('/getmarkers').done(function(data){ 
    // console.log(data);
    feature_layer = L.mapbox.featureLayer(data);

    // feature_layer = L.mapbox.featureLayer(data).addTo(map);
    console.log(data);
    // The clusterGroup gets each marker in the group added to it
    // once loaded, and then is added to the map
    var clusterGroup = new L.MarkerClusterGroup();
    feature_layer.eachLayer(function(layer) {
        clusterGroup.addLayer(layer);
    });
    map.addLayer(clusterGroup);
    });
});