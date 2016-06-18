# SF Bicycle Parking (in progress)

A web application to locate bicyle parking racks in San Francisco.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Heatmap of Bicycle Parking Locations](#heatmap-of-bicycle-parking-locations)
- [Parking Details](#parking-details)
- [Find Parking within Specified Radius of an Address](#find-parking-within-specified-radius-of-an-address)

## Technologies Used

- **Frontend**: Javascript (AJAX, JQuery), Bootstrap, HTML, CSS
- **Backend**: Python, Jinja2, Flask, SQLAlchemy
- **Database**: PostgreSQL
- **APIs**: Mapbox, Google Geocoder, Socrata Open Data API (SODA)

## Heatmap of Bicycle Parking Locations

Users can get a high level understanding of which neighborhoods/areas in San Francisco have the highest concentration of parking locations by viewing a heatmap.

![heatmap](https://raw.githubusercontent.com/bekkam/sf-parking/master/docs/static/heatmap.png "Heatmap")

## Parking Details

For more detailed information on parking locations, users can select the Marker option.

The app uses Mapbox's MarkerClusterGroup to quickly render GeoJson data for thousands of points.

![markerclusterzoomout](https://raw.githubusercontent.com/bekkam/sf-parking/master/docs/static/markerclusterzoomout.png "Marker Cluster Zoom Out")

By zooming in to their desired search location, users can view individual markers.  Clicking a single marker produces a popup, customized with html to display the address, building name, number of racks, and number of parking spaces for the particular location.

![markerclusterzoomin](https://raw.githubusercontent.com/bekkam/sf-parking/master/docs/static/markerclusterzoomin.png "Marker Cluster Zoom In")

## Find Parking within Specified Radius of an Address

Currently users can narrow their parking location search by inputting a street address, and specifying a search radius.  For accurate results, the app uses Google's geocoding api to obtain the latitude and longitude of a user-specified address.  After creating a marker to represent the user's address, search.js adds a circle object of requested radius to the map's feature layer.  Search.js then uses Mapbox's setFilter method to render only those markers with GeoJson points within the search radius/circle object.

![markersearchradius](https://raw.githubusercontent.com/bekkam/sf-parking/master/docs/static/markersearchradius.png "Marker Search Radius")

