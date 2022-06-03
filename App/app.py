#################################################
# Import Dependencies
#################################################
import os
from flask import (Flask, render_template, jsonify, request, redirect)
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy import func
import psycopg2
import pandas as pd
import pickle
import numpy as np
#################################################
engine = create_engine("postgresql://sohrabrezaei:Lightgreen123-_-@project.cqupc8fzrokq.us-east-1.rds.amazonaws.com:5432/Global_Crop_Yield_Analysis", echo=False)

Base = automap_base()
Base.prepare(engine, reflect=True)
session = Session(engine)

Base.classes.keys()

# # Flask Setup
app = Flask(__name__)

#######################################################################
# Database Setup
#######################################################################

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
