$( document ).ready(function() {
  // Handler for .ready() called.
    L.mapbox.accessToken = 'pk.eyJ1IjoiYmVra2EiLCJhIjoiY2lvdGllNmRuMDBicXVjbThjeWVjZnNxayJ9.HlEvEtM4nNTSonVEtFtaCw';
    var map = L.mapbox.map('map', 'mapbox.streets', {
            zoomControl: true
        }).setView([37.780, -122.419], 14);

    //CREATE A BUFFER
    var fc = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "marker-color": "#6BC65F",
            "marker-size": "large"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
                -122.419, 37.780
            ]
          }
        }
      ]
    }

    var fcLayer = L.mapbox.featureLayer().setGeoJSON(fc);
    console.log(fcLayer);
    var bufferLayer = L.mapbox.featureLayer().addTo(map);

    // Enable user dragging of buffer
    fcLayer.eachLayer(function(layer) {
        //pts
        layer.options.draggable = true;
        layer.on('drag', function(e) {
            calculateBuffer();
        });
        //lines and polys
        if(layer.editing){
            layer.editing.enable();
            layer.on('edit', function(e) {
                calculateBuffer();
            });
        }
    });

    fcLayer.addTo(map);
    calculateBuffer();

    function calculateBuffer() {
        var fc = turf.featurecollection(fcLayer.getLayers().map(function(f){
                return f.toGeoJSON()
            }));
        var buffer = turf.buffer(fc, .5, 'miles');
        buffer.properties = {
            "fill": "#6BC65F",
            "stroke": "#25561F",
            "stroke-width": 2
        };
        bufferLayer.setGeoJSON(buffer);
    }


    // LOAD MARKERS
    $.getJSON("/getmarkers", function(data){
        var items = [];
        $.each( data, function( key, val ) {
            // items.push( "<li id='" + key + "'>" + val + "</li>" );
            $.each(val, function (k, v) {
                L.mapbox.featureLayer({
                    type: "Feature",
                    geometry: v.geometry,
                    properties: {
                        "title": v.properties.address,
                        "description": "<ul><li>Location: " + v.properties.location + "</li>" 
                        + "<li>No. of racks: " + v.properties.racks + "</li>"
                        + "<li>No. of spaces: " + v.properties.spaces + "</li>"
                        + "<li>Placement: " + v.properties.placement + "</li></ul>",
                        "marker-size": 'medium',
                        // "marker-color": '#4C1B8C',
                        "marker-color": '#cc3300',
                        "marker-symbol": "bicycle",
                        "marker-allow-overlap": true
                    }
                }).addTo(map);

            });

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
});