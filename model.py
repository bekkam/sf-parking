"""Models and database functions for Ratings project."""
import json
from flask_sqlalchemy import SQLAlchemy

from config import username, password

db = SQLAlchemy()


##############################################################################
# Model definitions

class Parking(db.Model):
    """Parking locations."""

    __tablename__ = "parkingspots"

    parking_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    address = db.Column(db.String(64), nullable=True)
    location = db.Column(db.String(100), nullable=True)
    placement = db.Column(db.String(64), nullable=True)
    install_month = db.Column(db.Integer, nullable=True)
    install_year = db.Column(db.Integer, nullable=True)
    num_racks = db.Column(db.Integer, nullable=True)
    num_spaces = db.Column(db.Integer, nullable=True)
    lat = db.Column(db.Float(15), nullable=False)
    longitude = db.Column(db.Float(15), nullable=False)

    @classmethod
    def get_markers(cls):

        features = []
        for point in cls.query.limit(100):
            current = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [point.lat, point.longitude]
                    },
                "properties": {
                    "address": point.address,
                    "location": point.location,
                    "placement": point.placement,
                    "install date": str(point.install_month) + '/' + str(point.install_year),
                    "racks": point.num_racks,
                    "spaces": point.num_spaces
                }
            }
            features.append(current)

        result = {"data": features}
        return result

##############################################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://%s:%s@localhost/bikeapp' % (username, password)
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    from server import app
    connect_to_db(app)
    print "Connected to DB."
