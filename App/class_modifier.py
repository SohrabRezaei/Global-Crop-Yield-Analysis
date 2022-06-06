import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.neural_network import MLPRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn import linear_model
from sklearn.model_selection import GridSearchCV
import pickle

class Country_modifier(BaseEstimator, TransformerMixin):
    def _init_(self):
        self.country_counts = {}
        return

    def fit(self, X, y=None):
        self.country_counts = dict(X.Country.value_counts())
        return self

    def transform(self, X, y=None):
        X["Country"] = X["Country"].apply(
            lambda x: x if self.country_counts[x] >= 200 else "Other"
        )

        return X


with open('Country_modifier.pkl', 'wb') as f:
    pickle.dump(Country_modifier, f, -1)