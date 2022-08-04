var exit = require('exit');
// var faker = require('faker');
const { faker } = require('@faker-js/faker');
faker.locale = 'fr';
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

const dataRandom = require('../config/constantes');
const db = require("../models/index");
const DatasetModel = db.dataset;

module.exports = {
    initRandomDataset,
    createRandomUser,
    loadData
};

function initRandomDataset() {
    if (!db) {
        logger.error(' Databse Mongo not existed !');
        exit(1);
    }
    DatasetModel.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new DatasetModel({
                
                billing_country: faker.address.countryCode(),
                billing_address: faker.address.streetAddress(),
                city: faker.address.city(),
                zip: faker.address.zip(),
                province: faker.address.state(),
                email: faker.internet.email(),
                dialling_code: faker.address.countryCode(),
                phone: faker.phone.number(),
                delivery_company: faker.company.companyName(),
                delivery_place: faker.address.streetAddress(),
                delivery_option: faker.address.countryCode(),
                voucher: faker.datatype.boolean(),
                average_basket_price: faker.finance.amount(),
                total: faker.finance.amount(),
            }).save((err) => {
                if (err) {
                    logger.error(" Data not prived !");
                    exit(1);
                }
            });
        }
    });
}

// path apps route
function createRandomUser() {
    return {        
        payment_provider: dataRandom.payment_Provider_80[Math.floor(Math.random()*dataRandom.payment_Provider_80.length)],
        card_nationality: dataRandom.card_Nationality_10[Math.floor(Math.random()*dataRandom.card_Nationality_10.length)],
        address_country: faker.address.address.streetAddress(),
        delivery_address: faker.address.secondaryAddress(),
        billing_country: faker.address.countryCode(),
        billing_address: faker.address.streetAddress(),
        city: faker.address.city(),
        zip: faker.address.zipCodeByState(),
        province: faker.address.state(),
        email: faker.internet.email(),
        dialling_code: faker.address.countryCode(),
        phone: faker.phone.number(),
        delivery_company: faker.company.companyName(),
        delivery_place: faker.address.streetAddress(),
        delivery_option: faker.address.countryCode(),
        voucher: faker.datatype.boolean(),
        average_basket_price: faker.finance.amount(),
        total: faker.finance.amount(),
    };
};

function loadData() {
    // var dataset = [];
    // Array.from({ length: 12 }).forEach(() => {
    //     new DatasetModel(createRandomUser()).save((err) => {
    //         if (err) {
    //             logger.error(" Data not prived !");
    //             exit(1);
    //         }
    //     });
    //     dataset.push(createRandomUser());
    // });

    logger.info(createRandomUser());
}
