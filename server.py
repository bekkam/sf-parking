import json

from jinja2 import StrictUndefined

from flask import Flask, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from config import flask_secret_key
from model import connect_to_db, Parking

app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = flask_secret_key
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def index():
    """Homepage."""

    return render_template("home.html")


@app.route('/getmarkers')
def get_markers():
    """Get marker data as json"""

    return jsonify(Parking.get_markers())


if __name__ == "__main__":
    app.debug = True
    connect_to_db(app)
    # DebugToolbarExtension(app)

    app.run()
