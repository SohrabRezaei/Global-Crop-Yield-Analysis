#################################################
# Import Dependencies
#################################################
#from asyncio.windows_utils import pipe
import os

os.chdir('App')

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
#from config import password
from App.myclass.class_modifier import Country_modifier
#from dotenv import load_dotenv 




# Flask Setup
app = Flask(__name__)

# load_dotenv()
#################################################
# Database Setup
#######################################################################
engine = create_engine(f"postgresql://sohrabrezaei:{os.environ['password']}@project.cqupc8fzrokq.us-east-1.rds.amazonaws.com:5432/Global_Crop_Yield_Analysis", echo=False)


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
def yield_prediction(country, crop, rainfall, pest,temp ):
    user_input = pd.DataFrame(np.array([[country, crop, rainfall, pest,temp]]),columns=['Country','Item','Average Rainfall (mm/year)','Pesticides (Tonnes)','Average Temperature'])
    pred_y = model.predict(user_input)
    return {"predicted":round(float(pred_y),2)}


# **************************Weather Analysis****************************
@app.route("/wanalysis")
def weather_analysis():
    return render_template("wanalysis.html")

# **************************Crop Recommendation****************************
@app.route("/crop_recommendation")
def crop_page():
    return render_template("recommendation.html")
#  Recom table
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
    app.run()
