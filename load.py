#!/usr/bin/python


import argparse
import logging
import os
from random import random
import sys
import json
import requests
import traceback
import time
# Import math library
import math
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
        raise argparse.ArgumentTypeError(
            f"readable_dir:{path} is not a valid path")


def parse_arguments():
    parser = argparse.ArgumentParser(
        description='this test app main in python args .',
        prog='main'
    )
    parser.add_argument('-d', '--data', type=conf_path,
                        help='load your data in app main')
    return parser.parse_args()


def generatorDataset(number):
    if os.path.exists(DATA_CODE):

        with open(os.path.join(DATA_CODE), 'r') as openfile:

            # Reading from json file
            json_object = json.load(openfile)
            dataset = {
                "account_id": fake.random.numeric(2),
                "user_date_creation": date,
                "user_hour_creation": hour,
                "payment_date": date,
                "payment_hour": hour,
                "adresse_changed_days": random.randint(3, 9),
                "browsing_time_seconds": random.randint(3, 9),
                "page_visited": random.randint(3, 9),
                "number_ticket_opened": random.randint(3, 9),
                "items": product_tmp,
                "payment_provider": json_object.payment_Provider_80[math.floor(math.random() * json_object.payment_Provider_80.length)],
                "card_nationality": json_object.card_Nationality_10[math.floor(math.random() * json_object.card_Nationality_10.length)],
                "delivery_address": fake.street_address(),
                "billing_country": fake.address.countryCode(),
                "billing_address": fake.address.street_address(),
                "email_changed_days": fake.random.numeric({min: 1, max: 30}),
                "email": fake.internet.email(),
                "dialling_code": fake.address.countryCode(),
                "delivery_company": json_object.delivery_companies[math.floor(math.random() * json_object.delivery_companies.length)],
                "delivery_place": json_object.delivery_places[math.floor(math.random() * json_object.delivery_places.length)],
                "delivery_option": json_object.delivery_options[math.floor(math.random() * json_object.delivery_options.length)],
                "voucher": fake.datatype.boolean(),
                "subscription": fake.datatype.boolean(),
                "total": fake.commerce.price(80, 800),
            }


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
