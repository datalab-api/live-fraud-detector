const db = require("../models/index");
var bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
var axios = require('axios');

const dataRandom = require('../config/constantes');

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";


const Role = db.role;
const User = db.user;
const Dataset = db.dataset;
const Country = db.country;
const GeoPostCode = db.geopostcode;

var JsonDataCountry = require("../../data_template/CountryCodes.json");
const {
    USERNAME_ADMIN,
    PASSWORD_ADMIN,
    EMAIL_ADMIN,
    FR_URI_CITY,
    FR_URI_METHOD
} = process.env;

module.exports = {
    initialyRoles,
    initialyUser,
    initDataset,
    loadCountryCode,
    loadCityFr
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
                element => new Country(element).save((err) => {
                    if (err) {
                        logger.error(err);
                    }
                    logger.info(`+++ Added ${element.dial_code} ${element.name} to country collection`);
                })
            );
        } else {
            logger.info("Data Country is  existe  .....");
        }
    });

}
async function loadCityFr() {

    var config = {
        method: FR_URI_METHOD,
        url: FR_URI_CITY,
        headers: {}
    };
    GeoPostCode.estimatedDocumentCount((error, count) => {
        if (count === 0 && !error) {
            axios(config).then(function (response) {
                var items = response.data.records;
                logger.info("+ Load city  Code in MongoDB ... ");
                Country.findOne({name: "France"}, function (error, country_current) {
                    if(error){
                        logger.error(error);
                    }
                    logger.info(country_current);
                    items.forEach(
                        item => logger.info(`+++ Added  to country collection`)
                        //  new GeoPostCode({
                        //     name_of_the_municipality: item.fields.nom_de_la_commune,
                        //     routing_label: item.fields.libelle_d_acheminement,
                        //     code_postal:item.fields.code_postal,
                        //     gps_cordinates:item.fields.coordonnees_gps,
                        //     country: country_current._id
                        // }).save((err) => {
                        //     if (err) {
                        //         logger.error(err);
                        //     }
                        //     logger.info(`+++ Added  to country collection`);
                        // })
                    );   
                });                             
        
            }).catch(function (error) {
                logger.error(error);
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
            logger.info(day)
            var tmp = day.split('T');
            logger.info(tmp.forEach(items => logger.info(items)));

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
