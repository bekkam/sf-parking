$( document ).ready(function() {


    L.mapbox.accessToken = 'pk.eyJ1IjoiYmVra2EiLCJhIjoiY2lvdGllNmRuMDBicXVjbThjeWVjZnNxayJ9.HlEvEtM4nNTSonVEtFtaCw';
    var map = L.mapbox.map('map', 'mapbox.emerald', {
            zoomControl: true
        }).setView([37.780, -122.419], 13);


    // HEATMAP
    $.getJSON('/getheatmap').done(function(data){ 
        console.log(data);
        heat = L.heatLayer([], {
            radius: 5,
            blur: 7, 
            maxZoom: 16
        });
        feature_layer = L.mapbox.featureLayer(data);   
        heat.addTo(map);                            
        feature_layer.on('click', function(e) {     
        });
        feature_layer.eachLayer(function(l) {       
            heat.addLatLng(l.getLatLng());
        });        
    });

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



    $('#navheat').addClass('active');
    $('#navmarkercluster').removeClass('active');
    $('#navsearch').removeClass('active');

});