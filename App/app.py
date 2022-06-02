# Import Dependencies
import os
from flask import (Flask, render_template, jsonify, request, redirect)
# import psycopPPg2
import pandas as pd
import pickle
import numpy as np

# Flask Setup
app = Flask(__name__)

#######################################################################
# Database Setup
#######################################################################
# use PySpark to connect to DB please!



# **************************HomePage Route****************************
@app.route("/")
def home():
    return render_template("index.html")

# **************************Yield Prediction****************************
@app.route("/api/prediction")
def yield_prediction():
    return render_template("prediction.html")

# **************************Weather Analysis****************************
@app.route("/wanalysis")
def weather_analysis():
    return render_template("wanalysis.html")

# **************************Crop Recommendation****************************
@app.route("/api/crop_recommendation")
def crop_recommendation():
    return render_template("recommendation.html")
# **************************Our Team****************************
@app.route("/our_team")
def our_team():
    return render_template("team.html")


if __name__ == "__main__":
    app.run(debug=True)
