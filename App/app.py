#################################################
# Import Dependencies
#################################################
from asyncio.windows_utils import pipe
import os
from flask import (Flask, render_template, jsonify, request, redirect,url_for)
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
from config import password
from class_modifier import Country_modifier


# Flask Setup
app = Flask(__name__)

#################################################
# Database Setup
#######################################################################
engine = create_engine(f"postgresql://sohrabrezaei:{password}@project.cqupc8fzrokq.us-east-1.rds.amazonaws.com:5432/Global_Crop_Yield_Analysis", echo=False)


Base = automap_base()
Base.prepare(engine, reflect=True)

# Temp = Base.classes.temp
# Rain = Base.classes.rainfall
# Joined = Base.classes.joined

session = Session(engine)

# Machine Learning Model 


with open(r"model_pickle.pkl", "rb") as input_file:
   model = pickle.load(input_file)


#######################################################################


# **************************HomePage Route****************************
@app.route("/")
def home():
    return render_template("index.html")

# **************************Yield Prediction****************************
@app.route("/prediction")
def yield_page():
    return render_template("prediction.html")

@app.route("/api/predict/<country>/<crop>/<rainfall>/<pest>/<temp>/")
def yield_prediction(rainfall,pest,temp,crop, country):
    to_scale = pd.DataFrame({"Average Rainfall (mm/year)":[float(rainfall)],"Pesticides (Tonnes)":[float(pest)],"Average Temperature":[float(temp)]})
    scale = model.transform(to_scale)
    crop_index = int(crop)
    country_index = int(country)
    encoded_arr = np.zeros(27)
    encoded_arr[crop_index] = 1
    encoded_arr[country_index] = 1
    pred_arr = np.hstack((scale, encoded_arr))
    pred_y = model.predict(pred_arr)
    return { "predicted": pred_y}

    """
    'x0_Bolivia', 'x0_Brazil', 'x0_Burundi', 'x0_Cameroon',
       'x0_Colombia', 'x0_Democratic Republic of the Congo', 'x0_Ecuador',
       'x0_Guatemala', 'x0_Honduras', 'x0_Kenya', 'x0_Mali', 'x0_Other',
       'x0_Peru', 'x0_Rwanda', 'x0_Tanzania', 'x0_Uganda', 'x0_Venezuela',
       'x1_Cassava', 'x1_Maize', 'x1_Plantains and others', 'x1_Potatoes',
       'x1_Rice, paddy', 'x1_Sorghum', 'x1_Soybeans', 'x1_Sweet potatoes',
       'x1_Wheat', 'x1_Yams'
    """


# **************************Weather Analysis****************************
@app.route("/wanalysis")
def weather_analysis():
    return render_template("wanalysis.html")

# **************************Crop Recommendation****************************
@app.route("/crop_recommendation")
def crop_page():
    return render_template("recommendation.html")

@app.route("/api/crops")
def crop_recommendation():
    query = """
    SELECT "Country",
    "Item",
    "Year",
    AVG("Yield (hg/ha)") as "Avg_Yield"
    FROM joined
    WHERE "Country" IN ('India', 'China', 'United States of America', 'Indonesia', 
                    'Pakistan', 'Brazil', 'United Kingdom', 'Bangladesh', 'Russia',
                    'Mexico', 'Japan', 'France', 'Italy', 'Egypt', 'Vietnam', 
                    'Democratic Republic of the Congo', 'Turkey', 'Iran', 'Germany',
                    'Thailand')
        AND "Year" = 2013
    GROUP BY "Country", "Item", "Year"
    ORDER BY "Country" ASC, "Avg_Yield" DESC
    """
    df = pd.read_sql(query, con=engine)
    country_json = {}
    for country in df.Country.unique():
        curr_country_table = df.loc[df.Country == country]
        country_json[country] = { row["Item"]:row["Avg_Yield"] for idx, row in df.loc[df.Country == country][:3].iterrows()}
    return(country_json)

# **************************Our Team****************************
@app.route("/our_team")
def our_team():
    return render_template("team.html")


if __name__ == "__main__":
    app.run(debug=True)
