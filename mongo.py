from ast import Try
import traceback
import requests
import json
import os
import sys
from faker import Faker
from mongoengine import *
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure


    
URI = "mongodb+srv://mamadou:cireguisse@kyndryl-mdb-livefraudde.xzg6f.mongodb.net/?retryWrites=true&w=majority"
URI_host = "mongodb://localhost:27017"
Mongo_connection = MongoClient(URI);
global mydb
global mycol

faker_json = {"BE": "fr_BE", "EL": "el", "PT": "pt_PT", "UK": "uk", "ES": "es", "RO": "ro", "CZ": "cz", "FR": "fr", "HU": "hu", "HR": "hr", "RU": "ge", "SK": "sk", "DE": "de", "IT": "it", "NL": "nl", "FI": "fi", "PL": "pl", "LV": "lv"}
countries = ["BE"]

def loggingMongo():
    try:
        print('Ping connexion ok:')
        print(Mongo_connection.admin.command('ping'))
        mydb = Mongo_connection["retail"]
        mycol = mydb["addresses"]
        print(f'All database : {Mongo_connection.list_database_names()}')
        
    except:
        traceback.print_exc()
        os._exit(2)

  
  
def generatorAdress ():
	for code in countries: #We loop throught all the countries where we want to generate addresses
		addresses_array = []
		for sample in range(0,60): #We decide how many addresses we want for each country 
			try:
				resp = requests.get("http://api.3geonames.org/randomland."+code+".json")
				data = resp.json()

				data_dict = {}
				data_dict["state"] = data["nearest"]["state"]
				data_dict["name"] = data["nearest"]["name"]
				data_dict["city"] = data["nearest"]["city"]
				data_dict["prov"] = data["nearest"]["prov"]
				data_dict["region"] = data["nearest"]["region"]
				data_dict["latt"] = data["nearest"]["latt"]
				data_dict["longt"] = data["nearest"]["longt"]
				
				try:
					fake = Faker(faker_json[code])
					data_dict["address"] = fake.address()
				except: #Faker doesn't support this address language. So, we put an english address
					fake = Faker('en')
					data_dict["address"] = fake.address()

				addresses_array.append(data_dict)
				
				if sample%50 == 0: 
					print(sample, "data generated for",code)
			except: #If a country isn't supported by the API, we catch the error and continue
				traceback.print_exc()
				os._exit(2)
				
		mycol.insertMany(addresses_array)

if __name__ == '__main__':
    loggingMongo()
    #generatorAdress()