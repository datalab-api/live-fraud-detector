const { faker } = require('@faker-js/faker');
const db = require("../models/index");
const dataRandom = require('../config/constantes');

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";


const Dataset = db.dataset;
const Adress = db.adress;

var adressJson = require("../../../adresses/data_be.json");
const {
    USERNAME_ADMIN,
    PASSWORD_ADMIN,
    EMAIL_ADMIN,
    URI_METHOD,
    API_ADRESS_RANDOM
} = process.env;

function generatorDataBe (localize,number){
    faker.locale = localize;
    for (let index = 0; index < Number(number); index++) {
        var products = [];
        for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
            products.push({
                name: faker.commerce.productName(),
                quantity: Math.floor(Math.random() * 10)
            });
        }

        const dateRandom = faker.date.between('2010-01-01T00:00:00.000Z', '2020-01-01T00:00:00.000Z');
        const tmp = dateRandom.toISOString().split('T');
        const date = tmp[0];
        const hour = tmp[1].split('.')[0];
        adress_tmp = adressJson[Math.floor(Math.random() * adressJson.length)];
        new Dataset({
            user_date_creation: date,
            user_hour_creation: hour,
            payment_date: date,
            payment_hour: hour,
            adresse_changed_days: faker.random.numeric(2),
            browsing_time_seconds: faker.random.numeric(3),
            page_visited: faker.random.numeric({ min: 0, max: 3 }),
            number_ticket_opened: faker.random.numeric(1),
            items: products,
            payment_provider: dataRandom.payment_Provider_80[Math.floor(Math.random() * dataRandom.payment_Provider_80.length)],
            card_nationality: dataRandom.card_Nationality_10[Math.floor(Math.random() * dataRandom.card_Nationality_10.length)],
            address_country: faker.address.countryCode(),
            delivery_address: adress_tmp,
            billing_country: faker.address.countryCode(),
            billing_address: adress_tmp,
            email_changed_days: faker.random.numeric({ min: 1, max: 30 }),
            email: faker.internet.email(),
            delivery_company: dataRandom.delivery_companies[Math.floor(Math.random() * dataRandom.delivery_companies.length)],
            delivery_place: dataRandom.delivery_places[Math.floor(Math.random() * dataRandom.delivery_places.length)],
            delivery_option: dataRandom.delivery_options[Math.floor(Math.random() * dataRandom.delivery_options.length)],
            voucher: faker.datatype.boolean(),
            subscription: faker.datatype.boolean(),
            total: faker.commerce.price(80, 800),
        }).save((err, dataset) => {
            if (err) {
                return({
                    code: 500,
                    message: err
                });
                process.exit();
            }
           
        });

    }
    retrurn ({
        code : 201,
        message : `+++ Add new dataset from to ${faker.locale} `
    });
}


module.exports = {
    generatorDataBe
}
