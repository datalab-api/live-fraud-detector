const db = require("../models/index");
var bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
var CryptoJS = require("crypto-js");
const configSecret = require("../config/constantes");
var request = require('request');


const dataRandom = require('../config/constantes');

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";


const Role = db.role;
const User = db.user;
const Dataset = db.dataset;
const Country = db.country;
const Adress = db.adress;

var JsonDataCountry = require("../../data_template/CountryCodes.json");
const {
    USERNAME_ADMIN,
    PASSWORD_ADMIN,
    EMAIL_ADMIN,
    URI_METHOD,
    API_ADRESS_RANDOM
} = process.env;


var options = {
    'method': URI_METHOD,
    'url': 'http://api.3geonames.org/randomland.fr.json',
    'headers': {
    }
};


module.exports = {
    initialyRoles,
    initialyUser,
    initDataset,
    loadCountryCode,
    generatorAdress
};

function initialyRoles() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    logger.error(err);
                }
                logger.info("++ Added 'user' default to roles collection");
            });

            new Role({
                name: "visitor",
            }).save((err) => {
                if (err) {
                    logger.error(err);
                }
                logger.info("++ Added 'manager' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    logger.error(err);
                }
                logger.info("++ Added 'admin' to roles collection");
            });
        }
    });
}

async function initialyUser() {
    User.estimatedDocumentCount((err, count) => {
        if (count === 0 && !err) {
            const user = new User({
                username: USERNAME_ADMIN,
                password: bcrypt.hashSync(PASSWORD_ADMIN, 8),
                email: EMAIL_ADMIN,
            });
            user.save((err, user) => {
                if (err) {
                    logger.error(err);
                }
                Role.find(
                    {
                        name: { $in: ['admin'] },
                    },
                    (err, roles) => {
                        if (err) {
                            logger.error(err);
                        }
                        user.roles = roles.map((role) => role._id);
                        user.save((err) => {
                            if (err) {
                                logger.error(err);
                            }

                            logger.info("++ Added 'admin' to user collection");

                        });
                    }
                );
            });
        }
    });
}
async function loadCountryCode() {

    Country.estimatedDocumentCount((error, count) => {
        if (count === 0 && !error) {
            logger.info("+ Load Coutry Code in MongoDB ... ");
            JsonDataCountry.forEach(
                (element) => {
                    new Country(element).save((err) => {
                        if (err) {
                            logger.error(err);
                        }
                        logger.info(`+++ Added ${element.dial_code} ${element.name} to country collection`);
                    })
                }
            );
        } else {
            logger.info("Data Country is  existe  .....");
        }
    });

}

async function generatorAdress() {

    Adress.estimatedDocumentCount((error, count) => {
        if (count === 0 && !error) {

            logger.info("+ Load city  Code in MongoDB ... ");
            Country.find().sort({ name: 1 })
                .exec((err, countries) => {
                    if (err) {
                        logger.error(error);
                    }

                    if (!countries) {
                        logger.error(`No user account exists`);
                    }
                    var data = "hello"
                    // Encrypt
                    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), configSecret.secret).toString();

                    // Decrypt
                    var bytes = CryptoJS.AES.decrypt(ciphertext, configSecret.secret);
                    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                    console.log(decryptedData); // [{id: 1}, {id: 2}]                                         

                    countries.forEach(
                        (item) => {
                            //logger.info(`${API_ADRESS_RANDOM}.${item.code}.json`);
                            options.url = `${API_ADRESS_RANDOM}.${item.code}.json`;
                            logger.info(options.url)
                            if (item.code === "FR") {
                                request(options, function (error, response) {
                                    if (error) throw new Error(error);
                                    var items = JSON.parse(response.body);
                                    new Adress({
                                        adress: CryptoJS.AES.encrypt(JSON.stringify(faker.address.streetAddress(true)), configSecret.secret).toString(),
                                        name: CryptoJS.AES.encrypt(JSON.stringify(items.nearest.name), configSecret.secret).toString(),
                                        region: CryptoJS.AES.encrypt(JSON.stringify(items.nearest.region), configSecret.secret).toString(),
                                        city: CryptoJS.AES.encrypt(JSON.stringify(items.nearest.city), configSecret.secret).toString(),
                                        province: CryptoJS.AES.encrypt(JSON.stringify(items.nearest.prov), configSecret.secret).toString(),
                                        gps_cordinates: { latt: items.nearest.latt, longt: items.nearest.longt },
                                        ref_country: item._id
                                    }).save((err) => {
                                        if (err) {
                                            logger.error(err);
                                        }
                                        logger.info(`+++ Add new address in collection`);
                                    });
                                });

                            }
                            new Promise(r => setTimeout(r, 120000));
                        }
                    );
                });
        } else {
            logger.info("Data Country is  existe  .....");
        }
    });

}



async function initDataset() {

    Dataset.estimatedDocumentCount((err, count) => {
        if (count === 0 && !err) {
            var countryCode = Country.find().sort({ name: 1 }).exec((error) => {
                if (error) {
                    logger.error(" Data Country not found ...");
                }
            });
            //const randomCountryCode = countryCode[Math.floor(Math.random() * countryCode.length)];
            faker.locale = 'fr';
            const day = new String(faker.date.recent());

            const dataSetTmp = {
                account_id: faker.random.numeric(2),
                user_date_creation: faker.date.recent(),
                user_hour_creation: faker.date.recent(),
                payment_date: faker.date.recent(),
                payment_hour: faker.date.recent(),
                adresse_changed_days: faker.random.numeric(2),
                browsing_time_seconds: faker.random.numeric(3),
                page_visited: faker.random.numeric({ min: 0, max: 3 }),
                number_ticket_opened: faker.random.numeric(1),
                items: faker.commerce.productName(),
                payment_provider: dataRandom.payment_Provider_80[Math.floor(Math.random() * dataRandom.payment_Provider_80.length)],
                card_nationality: dataRandom.card_Nationality_10[Math.floor(Math.random() * dataRandom.card_Nationality_10.length)],
                address_country: faker.address.countryCode(),
                delivery_address: faker.address.streetAddress(true),
                billing_country: faker.address.countryCode(),
                billing_address: faker.address.streetAddress(true),
                city: faker.address.cityName(),
                zip: faker.address.zipCode(),
                province: faker.address.state(),
                email_changed_days: faker.random.numeric({ min: 1, max: 30 }),
                dialling_code: faker.address.countryCode(),
                delivery_company: dataRandom.delivery_companies[Math.floor(Math.random() * dataRandom.delivery_companies.length)],
                delivery_place: dataRandom.delivery_places[Math.floor(Math.random() * dataRandom.delivery_places.length)],
                delivery_option: dataRandom.delivery_options[Math.floor(Math.random() * dataRandom.delivery_options.length)],
                voucher: faker.datatype.boolean(),
                subscription: faker.datatype.boolean(),
                total: faker.commerce.price(80, 800),
            };
            logger.info(dataSetTmp);
        }
    });
}
