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

import os
# Find the latest version of spark 3.0 from http://www.apache.org/dist/spark/ and enter as the spark version
# For example:
# spark_version = 'spark-3.0.3'
spark_version = 'spark-3.2.1'
os.environ['SPARK_VERSION']=spark_version



# Set Environment Variables
import os
os.environ["JAVA_HOME"] = "/usr/lib/jvm/java-11-openjdk-amd64"
os.environ["SPARK_HOME"] = f"/content/{spark_version}-bin-hadoop2.7"

# Start a SparkSession
import findspark
findspark.init()


# Read in data from S3 Buckets
url ='https://globalcropyieldanalysis.s3.amazonaws.com/join.csv'
spark.sparkContext.addFile(url)
join_df = spark.read.csv(SparkFiles.get("join.csv"), sep=",", header=True, inferSchema=True)

# Store environmental variable
from getpass import getpass
password = getpass('password')
# Configure settings for RDS
mode = "overwrite"
jdbc_url="jdbc:postgresql://project.cqupc8fzrokq.us-east-1.rds.amazonaws.com:5432/Global_Crop_Yield_Analysis"
config = {"user":"sohrabrezaei",
          "password": password,
          "driver":"org.postgresql.Driver"}

# Write DataFrame to undernourished table in RDS
join_df.write.jdbc(url=jdbc_url, table='Joined', mode=mode, properties=config)



# **************************HomePage Route****************************
@app.route("/")
def home():
    console.log(join_df)
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
