$( document ).ready(function() {

L.mapbox.accessToken = 'pk.eyJ1IjoiYmVra2EiLCJhIjoiY2lvdGllNmRuMDBicXVjbThjeWVjZnNxayJ9.HlEvEtM4nNTSonVEtFtaCw';
// Here we don't use the second argument to map, since that would automatically
// load in non-clustered markers from the layer. Instead we add just the
// backing tileLayer, and then use the featureLayer only for its data.
var map = L.mapbox.map('map')
    .setView([37.780, -122.419], 13)
    .addLayer(L.mapbox.tileLayer('mapbox.emerald'))
    .addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true
    }));


// POPULATE LAYER WITH MARKER DATA
var csvLayer = L.mapbox.featureLayer();
   $.getJSON("/getmarkers", function(data){
    console.log(data);
    csvLayer.setGeoJSON(data);
    // console.log(csvLayer);
    });




// SEARCH BOX
var geocoder = L.mapbox.geocoder('mapbox.places');
var current = null;

var RADIUS;
var currentLocationLayer = L.mapbox.featureLayer();


    document.getElementById('submit').addEventListener('click', function() {
        var address = document.getElementById('address').value;
        geocoder.query(address, showCurrentLocation);
    });

    function showCurrentLocation(err, data) {
    // The geocoder can return an area, like a city, or a
    // point, like an address. Here we handle both cases,
    // by fitting the map bounds to an area or zooming to a point.
        if (!current) {
            current = L.marker(data.latlng);
        } else {
            current.setLatLng(data.latlng);
        }
        current.addTo(map);

        RADIUS = $("#radius_options").val();
        var filterCircle = L.circle(L.latLng(data.latlng), RADIUS, {
            // opacity: 1,
            // weight: 1,
            fill: false,
            // fillOpacity: 0.4
        });

        csvLayer.setFilter(function(feature) {
            return current.getLatLng().distanceTo(L.latLng(
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0])) < RADIUS;
        });
        csvLayer.addTo(map);
        map.fitBounds(filterCircle);
    }

    // Make corresponding navbar link active
    $('#navsearch').addClass('active');
    $('#navheat').removeClass('active');
    $('#navmarkercluster').removeClass('active');

});