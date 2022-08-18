#!/usr/bin/python


import argparse
import logging
import os
import sys
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

def shutdown():
    logging.info('Shutting down')
    sys.exit(1)


def conf_path(path):
    if os.path.isdir(path):
        return path
    else:
        raise argparse.ArgumentTypeError(f"readable_dir:{path} is not a valid path")
def parse_arguments():
    parser = argparse.ArgumentParser(
        description='this test app main in python args .', 
        prog='main'
    )
    parser.add_argument('-d', '--data', type=conf_path, help='load your data in app main')
    return parser.parse_args()

 
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

def main():
        
    args = parse_arguments()

    log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s '
    
    logging.StreamHandler()
    logging.basicConfig(
        level=logging.DEBUG, 
        encoding='utf-8', 
        format=log_format,
        datefmt='%d/%m/%Y %I:%M:%S %p'
    )
    
    logging.info('Starting server...')
            
if __name__ == '__main__':
   main()