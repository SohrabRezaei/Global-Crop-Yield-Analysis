# Global Crop Yield Analysis
## Team members
- **[Bilal Rizvi](https://github.com/brizvi4)**
- **[Neda Ahmadi J.](https://github.com/NedaAJ)**
- **[Rabab Handa](https://github.com/RababHanda)**
- **[Sohrab Rezaei](https://github.com/SohrabRezaei)**

**Deploy** : 🔜 Our Deployment Link will be posted here!

**Checkout the presentation here**: [Global Crop Yield Analysis Presentation](https://docs.google.com/presentation/d/1IRI6LFxQkQMSdlPyFniTKJjYMbloIk532eeUkKgtX3I/edit?usp=sharing)

# Table of Content
1. [Project Overview](##Project-Overview)
2. [Why this topic?](##Why-this-topic?)
2. [Source Data](##Source-Data)
3. [Objective](##Objectives)
4. [Sections](#Sections)
    - [Meteorological Analysis](##Meteorological-Analysis)
    - [Yield Prediction](##Yield-Prediction)
    - [Crop Recommendation](##Crop-Recommendation)
5. [Tools and Technologies](#Tools-and-Technologies)
6. [Dashboard](#Dashboard)

# Project Overview🌾🌽
Agriculture is extremely important to the world economy. Understanding global agricultural output is critical for tackling food security concerns (hunger) as the human population continues to grow.

**Crop yield prediction** is a significant agricultural problem. Agricultural yield is largely influenced by meteorological conditions (rain, temperature, etc.) and pesticides, and reliable information about crop yield history is critical for making agricultural risk management and future predictions choices.

## Why this topic?
***"In 2020, between 720 and 811 million people faced hunger."*** ([FAO, 2021](https://www.fao.org/state-of-food-security-nutrition/en/))   

World hunger is now increasing, after having declined for a decade. This trend is expected to last, while being amplified by the alarming population increase.

***"We need bold actions!"***  

In 2030, almost *660 million people* may still be hungry. Hunger will not be eradicated by 2030 unless bold efforts are implemented to expedite progress, particularly actions to address significant causes of food insecurity that influence millions of people's access to food ([FAO, 2021](https://www.fao.org/state-of-food-security-nutrition/en/)).

We picked top 20 most populated countries of the world to analyze this issue at a macroscopic level and present suggestions that can be implemented to prevent the growing gap between world hunger and crop yield.

## Source Data
Original datasets for this project were taken from Kaggle: [Crop_Yield_Prediction_Dataset](https://www.kaggle.com/datasets/patelris/crop-yield-prediction-dataset?select=yield.csv)

*All dataset (publicly available dataset) on Kaggle are taken from [FAO (Food and Agriculture Organization)](http://www.fao.org/home/en/) and [World Data Bank](https://data.worldbank.org/).*


# Sections
## Meteorological Analysis 🌦️🌦️
- **Objectives**: To give the users visual representation of different weather phenomena that would affect their crop yield.
- **Model**: GeoJSON data plotting

- **How it works**: This model gets real time rainfall and temperature data of the world from OpenWeatherAPI and plots it on a world map to provide a visual representation of correlation those and the effect on crops.
- **Challenges**: Making the webpage dynamic by filtering the content of leaflet map.
- **Improvements**: Plot world harvest as a heat map on the world map to further improve the immediate inferences drawn from the rainfall vs temperature maps for crop yield.

-------------------------
## Yield Prediction 👩‍🌾👨🏿‍🌾📈
- **Objectives**: Using ML model on previous data to predict future total yield of selected crops to help current and new farmers/business owners make an informed decision based on their existing area conditions (rain, temperature, pesticides).
- **Model**: Machine Learning (RandomForest Regressor)

- **How it works**: Get customer input and send it to the app —> app communicates with the machine learning pickle file —> ML model uses given parameters to calculate the yield and sends it back to the webpage.

- **Challenges**: ML pipelining and preprocessing of users input.
- **Improvements**: Train data to provide crop yield predictions only via environmental factors, without the need of specifying a country.
-------------------
## Crop Recommendation 🌱
- **Objectives**: Advising farmers top three crops to grow in their perspective country to maximize total crop yield.
- **Model**: Getting highest yield crops of each country for year 2013 using pandas and sqlalchemy.

- **How it works**: Get customer input (country) and send it to the app —> app communicates with database —> sends back data of 3 highest yields and their historical yield plot to the webpage

- **Challenges**: Figuring out the API route which conncets to database and showcasing the data on front-end.
- **Improvements**: Creating a ML model for this section which also provides the user future yield plot for the next 5 years.

# Tools & Technologies
- **Database**
    - PostgreSQL
    - pgAdmin
    - AWS RDS / S3
    - SQLAlchemy
    - PySpark
- **Data Analysis**
    - Jupyter Notebook
    - Pandas
    - Numpy
    - Matplotlib
    - Plotly
    - Seaborn
- **Machine Learning**
    - Scikit-Learn
      - **Random Forest Regressor**
      - OneHotEncoder
      - StandardScaler
      - BaseEstimator & TransformerMixin
      - ColumnTransformer
      - Pipeline
      - Random Forest Regressor
      - Gradient Boosting Regressor
      - Linear Regression
      - MLP Regressor
      - Decision Tree Regressor
      - Linear model
      - R2
    - Pickle
- **Dashboard**
    - Javascript
    - D3
    - Flask
    - HTML
    - CSS
    - Leaflet
    - OpenWeather API
    - Heroku
    - Boostrap5

## Dashboard
***Nearly done 🚧🚧🚧***

Here you can find screenshots of our main dashboard which is an interactive website containing visualization and forecast generated by our ML model.








