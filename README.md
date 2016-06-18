# SF Bicycle Parking (in progress)

A web application to locate bicyle parking racks in San Francisco.  

## Table of Contents
- [Technologies Used](#Technologies)
- [Heatmap of Bicycle Parking Locations](#Heatmap)
- [Parking Details](#Parking)
- [Find Parking within Specified Radius of an Address](#Viewing)

## Technologies Used

- **Frontend**: Javascript (AJAX, JQuery), Bootstrap, HTML, CSS
- **Backend**: Python, Jinja2, Flask, SQLAlchemy
- **Database**: PostgreSQL
- **APIs**: Mapbox, Google Geocoder, Socrata Open Data API (SODA)


## Heatmap of Bicycle Parking Locations

Users can get a high level understanding of which neighborhoods/areas in San Francisco have the highest concentration of parking locations by viewing a heatmap.

![heatmap]
(/docs/static/heatmap.png)


## Parking Details

For more detailed information on parking locations, users can select the Marker option.  

The app uses Mapbox's MarkerClusterGroup to quickly render GeoJson data for thousands of points. 

![markerclusterzoomout]
(/docs/static/markerclusterzoomout.png)

By zooming in to their desired search location, users can view individual markers.  Clicking a single marker produces a popup, customized with html to display the address, building name, number of racks, and number of parking spaces for the particular location.


![markerclusterzoomin]
(/docs/static/markerclusterzoomin.png)

## Find Parking within Specified Radius of an Address

Currently users can narrow their parking location search by inputting a street address, and specifying a search radius.  For accurate results, the app uses Google's geocoding api to obtain the latitude and longitude of a user-specified address.  After creating a marker to represent the user's address, search.js adds a circle object of requested radius to the map's feature layer.  Search.js then uses Mapbox's setFilter method to render only those markers with GeoJson points within the search radius/circle object.

![markersearchradius]
(/docs/static/markersearchradius.png)