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


// POPULATE MARKER CLUSTERGROUP
// Since featureLayer is an asynchronous method, we use the `.on('ready'`
// call to only use its marker data once we know it is actually loaded.
$.getJSON('/getmarkers').done(function(data){ 
    // console.log(data);
    feature_layer = L.mapbox.featureLayer(data);

    // The clusterGroup gets each marker in the group added to it
    // once loaded, and then is added to the map
    var clusterGroup = new L.MarkerClusterGroup();
    feature_layer.eachLayer(function(layer) {
        simplestyle = 
                        layer.feature.properties.address + "</br>" +
                        "<ul><li>Location: " + layer.feature.properties.location + "</li>" 
                        + "<li>No. of racks: " + layer.feature.properties.racks + "</li>"
                        + "<li>No. of spaces: " + layer.feature.properties.spaces + "</li>"
                        + "<li>Placement: " + layer.feature.properties.placement + "</li></ul>"
        layer.bindPopup(simplestyle);
        clusterGroup.addLayer(layer);
    });
    map.addLayer(clusterGroup);
    });


// SEARCH BOX

var geocoder = L.mapbox.geocoder('mapbox.places');
var current = null;

    document.getElementById('submit').addEventListener('click', function() {
        var address = document.getElementById('address').value;
        geocoder.query(address, showMap);
    });

        function showMap(err, data) {
        // The geocoder can return an area, like a city, or a
        // point, like an address. Here we handle both cases,
        // by fitting the map bounds to an area or zooming to a point.
            console.log(data.latlng[0]);
            console.log(err);

            if (!current) {
                console.log("!current");
                current = L.marker(data.latlng).addTo(map);

            } else {
                current.setLatLng(data.latlng);
            }
        }


    // ADD DIRECTIONS PANEL
    // move the attribution control out of the way
    map.attributionControl.setPosition('bottomleft');

    // create the initial directions object, from which the layer
    // and inputs will pull data.
    var directions = L.mapbox.directions({
        profile: 'mapbox.cycling'
    });

    var directionsLayer = L.mapbox.directions.layer(directions)
        .addTo(map);

    var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
        .addTo(map);

    var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
        .addTo(map);

    var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
        .addTo(map);

    var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
        .addTo(map);

    // Activate the corresponding navbar link
    $('#navmarkercluster').addClass('active');
    $('#naveheat').removeClass('active');
    $('#navsearch').removeClass('active');


});
