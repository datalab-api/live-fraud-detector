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
const Product = db.product;

var JsonDataCountry = require("../../../data_template/CountryCodes.json");
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
    generatorDatasetFR,
    loadCountryCode,
    generatorAdress,
    generatorAdressFR,
    initProduct
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
    // var data = "hello"
    // // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), configSecret.secret).toString();

    // // Decrypt
    // var bytes = CryptoJS.AES.decrypt(ciphertext, configSecret.secret);
    // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // console.log(decryptedData); // [{id: 1}, {id: 2}]                    

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

function generatorAdress() {
    logger.info("+ Load city  Code in MongoDB ... ");

    dataRandom.list_countries.forEach(
        (item) => {

            // set localize faker            
            faker.locale = item.faker;
            //for (let index = 0; index < Number(number); index++) {
            logger.info(item.code)
            options.url = `http://api.3geonames.org/randomland.${item.code}.json`;
            logger.info(options.url);
            const adress = faker.address.streetAddress(true);
            setTimeout(function () {
                request(options, function (error, response) {
                    if (error) {
                        throw new Error(error);
                        process.exit();
                    }
                    //logger.info(response.body);        
                    var randomCountry = JSON.parse(response.body);
                    if (!randomCountry.nearest.region && !randomCountry.nearest.city && randomCountry.nearest.prov) {
    
                        new Adress({
                            adress: faker.address.streetAddress(true),
                            name: randomCountry.nearest.name,
                            region: randomCountry.nearest.region,
                            city: randomCountry.nearest.city,
                            province: randomCountry.nearest.prov,
                            gps_cordinates: { latt: randomCountry.nearest.latt, longt: randomCountry.nearest.longt },
                            state: randomCountry.nearest.state
                        }).save((err, product) => {
                            if (err) {
                                logger.error(err);
                            }
                        });
                        logger.info(index%10 === 0);   
                    }
    
                });
            },1000);         
        }
    )
}


function generatorAdressFR(number) {

    logger.info("+ Load city  Code in MongoDB ... ");
    Country.findOne({ code: 'FR' }).exec((err, country) => {
        if (err) {
            return res.status(500).json({ message: err });
        }

        if (!country) {
            return res.status(404).json({ message: ` country account does not exist ` });
        }
        //logger.info(country);
        for (let index = 0; index < Number(number); index++) {
            //logger.info(index);
            setTimeout(function () {
                request(options, function (error, response) {
                    if (error) {
                        throw new Error(error);
                        process.exit();
                    }
                    //logger.info(response.body);        
                    var randomCountry = JSON.parse(response.body);
                    if (!randomCountry.nearest.region && !randomCountry.nearest.city && randomCountry.nearest.prov) {
                        logger.info({
                            adress: faker.address.streetAddress(true),
                            name: randomCountry.nearest.name,
                            region: randomCountry.nearest.region,
                            city: randomCountry.nearest.city,
                            province: randomCountry.nearest.prov,
                            gps_cordinates: { latt: randomCountry.nearest.latt, longt: randomCountry.nearest.longt },
                            state: country._id
                        });
                        // new Adress({
                        //     adress: faker.address.streetAddress(true),
                        //     name: randomCountry.nearest.name,
                        //     region: randomCountry.nearest.region,
                        //     city: randomCountry.nearest.city,
                        //     province: randomCountry.nearest.prov,
                        //     gps_cordinates: { latt: randomCountry.nearest.latt, longt: randomCountry.nearest.longt },
                        //     state: country._id
                        // }).save((err) => {
                        //     if (err) {
                        //         logger.error(err);
                        //     }
                        // });
                    }
    
                });
                if(index%10 === 0){
                    logger.info(index);   
                }
            },1000);
            
        }

    });

}

async function initProduct(number) {
    for (let index = 0; index < Number(number); index++) {
        new Product({
            name: faker.commerce.productName(),
            quantity: Math.floor(Math.random() * 10)
        }).save((err, product) => {
            if (err) {
                logger.error(err);
                process.exit();
            }
            logger.info(`+++ Add new product : ${product} `);
        });
    }
}

async function generatorDatasetFR(number) {

    faker.locale = 'fr';

    Adress.find().sort({ region: 1 }).exec((err, adresses) => {

        adresses.forEach(
            (index) => {

                const dateRandom = faker.date.between('2010-01-01T00:00:00.000Z', '2020-01-01T00:00:00.000Z');
                const tmp = dateRandom.toISOString().split('T');
                const date = tmp[0];
                const hour = tmp[1].split('.')[0];

                logger.info(product_tmp);
                new Dataset({
                    account_id: faker.random.numeric(2),
                    user_date_creation: date,
                    user_hour_creation: hour,
                    payment_date: date,
                    payment_hour: hour,
                    adresse_changed_days: faker.random.numeric(2),
                    browsing_time_seconds: faker.random.numeric(3),
                    page_visited: faker.random.numeric({ min: 0, max: 3 }),
                    number_ticket_opened: faker.random.numeric(1),
                    items: product_tmp,
                    payment_provider: dataRandom.payment_Provider_80[Math.floor(Math.random() * dataRandom.payment_Provider_80.length)],
                    card_nationality: dataRandom.card_Nationality_10[Math.floor(Math.random() * dataRandom.card_Nationality_10.length)],
                    address_country: faker.address.countryCode(),
                    delivery_address: faker.address.streetAddress(true),
                    billing_country: faker.address.countryCode(),
                    billing_address: faker.address.streetAddress(true),
                    adress: index._id,
                    email_changed_days: faker.random.numeric({ min: 1, max: 30 }),
                    email: faker.internet.email(),
                    dialling_code: faker.address.countryCode(),
                    delivery_company: dataRandom.delivery_companies[Math.floor(Math.random() * dataRandom.delivery_companies.length)],
                    delivery_place: dataRandom.delivery_places[Math.floor(Math.random() * dataRandom.delivery_places.length)],
                    delivery_option: dataRandom.delivery_options[Math.floor(Math.random() * dataRandom.delivery_options.length)],
                    voucher: faker.datatype.boolean(),
                    subscription: faker.datatype.boolean(),
                    total: faker.commerce.price(80, 800),
                }).save((err, dataset) => {
                    if (err) {
                        logger.error(err);
                        process.exit();
                    }
                    logger.info(`+++ Add new product : ${dataset.account_id} `);
                });
                new Promise(r => setTimeout(r, 120000));
            }
        )

    })


}

