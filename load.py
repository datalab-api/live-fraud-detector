#!/usr/bin/python


import argparse
import logging
import os
import sys
import json 
import requests
import traceback
import time
from collections import defaultdict
from faker import Faker

fake = Faker('en_US')
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_CODE = os.path.join(BASE_DIR, "data_faker.json")

adresses = defaultdict(list)

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

def loadJson():
    
    if os.path.exists(DATA_CODE):
        logging.info(DATA_CODE) 
        try:
            with open(os.path.join(DATA_CODE),'r') as country:
                JSONValues = json.load(country) 
                # 
                #JSONValues = json.dumps(country, sort_keys=True, indent=4)
                #logging.info(JSONValues)
                for index in JSONValues:
                    
                    url = "http://api.3geonames.org/randomland."+index["code"]+".json"
                    payload={}
                    headers = {}                    
                    response = requests.request("GET", url, headers=headers, data=payload)
                    data_tmp = response.text
                    data = json.loads(data_tmp)
                    adresses[data["nearest"]["state"]].append(
                        fake.address()+";"+
                        data["nearest"]["name"]+";"+
                        data["nearest"]["city"]+";"+
                        data["nearest"]["prov"]+";"+
                        data["nearest"]["region"]
                    )
                    time.sleep(3)
                
        except:
            logging.info(str(traceback.print_exc()))
            traceback.print_exc()
            os._exit(2)
    else:
        logging.error(argparse.ArgumentTypeError(f"readable_dir:{DATA_CODE} is not a valid path"))

def generateAdress(number_country):
    url = "http://api.3geonames.org/randomland.FR.json"
    payload={}
    headers = {} 
    for i in range (1,number_country):                           
        response = requests.request("GET", url, headers=headers, data=payload)
        data_tmp = response.text
        data = json.loads(data_tmp)
        adresses[data["nearest"]["state"]].append(
            fake.address()+";"+
            data["nearest"]["name"]+";"+
            data["nearest"]["city"]+";"+
            data["nearest"]["prov"]+";"+
            data["nearest"]["region"]
        )
    logging.info(adresses)
    

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
   generateAdress(200)