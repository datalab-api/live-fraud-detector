const { faker } = require('@faker-js/faker');
const db = require("../models/index");
const random_data = require('../config/constantes');

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";


const Dataset = db.dataset;
const Adress = db.adress;

var adressJson = require("../../../adresses/data_BE.json");


function generate_non_fraud(localize, number) {
    // const tmp = random_data.list_countries.find(item=> item.code === String(localize).toUpperCase());
    // faker.locale = tmp.faker;

    for (let index = 0; index < Number(number); index++) {
        var products = [];
        for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
            products.push({
                name: faker.commerce.productName(),
                quantity: Math.floor(Math.random() * 10)
            });
        }

        const date_create = faker.date.between('2010-01-01T00:00:00.000Z', '2020-01-01T00:00:00.000Z');
        const date_payment = faker.date.soon(10, date_create);

        //logger.info(`before  ${day}/${month}/${year} ${hour}:${minutes}:${secondes} `);
        //logger.info(`new ${day}/${month}/${year} ${new_hour}:${minutes}:${secondes}`);

        adress_tmp = adressJson[Math.floor(Math.random() * adressJson.length)];
        new Dataset({
            user_date_creation: date_create.toISOString(),
            payment_date: date_payment.toISOString(),
            adresse_changed_days: Math.floor(Math.random() * 10)+1,
            browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
            page_visited: Math.floor(Math.random() * 50) + 1,
            number_ticket_opened: Math.floor(Math.random() * 10),
            items: products,
            payment_provider: random_data.payment_Provider_80[Math.floor(Math.random() * random_data.payment_Provider_80.length)],
            card_nationality: random_data.card_Nationality_10[Math.floor(Math.random() * random_data.card_Nationality_10.length)],
            address_country: faker.address.countryCode(),
            delivery_address: adress_tmp,
            billing_country: faker.address.countryCode(),
            billing_address: adress_tmp.address,
            email_changed_days: faker.random.numeric({ min: 1, max: 30 }),
            email: faker.internet.email(),
            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
            voucher: faker.datatype.boolean(),
            subscription: faker.datatype.boolean(),
            total: faker.commerce.price(80, 800),
        }).save((err) => {
            if (err) {
                logger.error({
                    code: 500,
                    message: err
                });
                process.exit();
            }
        });

    }
    logger.info({
        code: 201,
        message: `+++ Add new dataset from to ${faker.locale} `
    });
}


function generate_fraud(localize, number) {

    faker.locale = localize;
    for (let index = 0; index < Number(number); index++) {
        var products = [];
        for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
            products.push({
                name: faker.commerce.productName(),
                quantity: Math.floor(Math.random() * 10)
            });
        }

        const date_create = faker.date.between('2010-01-01T00:00:00.000Z', '2020-01-01T00:00:00.000Z');
        const date_payment = faker.date.soon(10, date_create);

        //logger.info(`before  ${day}/${month}/${year} ${hour}:${minutes}:${secondes} `);
        //logger.info(`new ${day}/${month}/${year} ${new_hour}:${minutes}:${secondes}`);

        adress_tmp = adressJson[Math.floor(Math.random() * adressJson.length)];
        new Dataset({
            user_date_creation: date_create.toISOString(),
            payment_date: date_payment.toISOString(),
            adresse_changed_days: Math.floor(Math.random() * 10)+1,
            browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
            page_visited: Math.floor(Math.random() * 50) + 1,
            number_ticket_opened: Math.floor(Math.random() * 10),
            items: products,
            payment_provider: random_data.payment_Provider_80[Math.floor(Math.random() * random_data.payment_Provider_80.length)],
            card_nationality: random_data.card_Nationality_10[Math.floor(Math.random() * random_data.card_Nationality_10.length)],
            address_country: faker.address.countryCode(),
            delivery_address: adress_tmp,
            billing_country: faker.address.countryCode(),
            billing_address: adress_tmp.address,
            email_changed_days: faker.random.numeric({ min: 1, max: 30 }),
            email: faker.internet.email(),
            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
            voucher: faker.datatype.boolean(),
            subscription: faker.datatype.boolean(),
            total: faker.commerce.price(80, 800),
        }).save((err) => {
            if (err) {
                logger.error({
                    code: 500,
                    message: err
                });
                process.exit();
            }
        });

    }
    logger.info({
        code: 201,
        message: `+++ Add new dataset from to ${faker.locale} `
    });
}


module.exports = {
    generate_non_fraud,
    generate_fraud
}
