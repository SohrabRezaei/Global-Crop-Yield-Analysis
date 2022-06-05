## Database & EDA
You can find our EDA here : [EDA.ipynb](https://github.com/SohrabRezaei/Global-Crop-Yield-Analysis/blob/main/ETL/EDA.ipynb)

We have several primary-composite keys, and the tables have Many-to-Many relationships. All the four tables in our ERD have Country and Year columns, and their data type is varchar and int, respectively. All the tables have a column expressing the table's name, and their data type are int and float. In addition, the yield table has an Item column that represents the crops, and its data type is varchar. After creating the tables in pgadmin, we extracted the CSV files from Amazon S3 by utilizing pyspark. We connected our PostgreSQL to AWS relational database with the aid of JDBC. Finally, we wrote the CSV files into our RDS.

Data Cleaning and ETL files can be found here:  [Data_cleaning.ipynb](https://github.com/SohrabRezaei/Global-Crop-Yield-Analysis/blob/main/ETL/Data_Cleaning.ipynb) | [ETL.ipynb](https://github.com/SohrabRezaei/Global-Crop-Yield-Analysis/blob/main/ETL/ETL.ipynb)

Here you can find the ERD for our database:
<p align="center">
  <img src="https://github.com/SohrabRezaei/Global-Crop-Yield-Analysis/blob/main/Resources/Visuals/Deliverable_2/ERD.jpeg">
</p>