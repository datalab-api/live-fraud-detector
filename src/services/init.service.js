var bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
var CryptoJS = require("crypto-js");
var request = require('request');
const path = require('path');
const fs = require('fs');

//joining path of directory 
//const directoryPath = path.join(__dirname, '../../adresses');
//var JsonDataCountry = require("../../data_template/CountryCodes.json");
const random_data = require('../config/constantes');

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";


// databases 
const db = require("../models/index");
const Role = db.role;
const User = db.user;
const Dataset = db.dataset;
const Country = db.country;
const Adress = db.adress;
const Product = db.product;

const {
    USERNAME_ADMIN,
    PASSWORD_ADMIN,
    EMAIL_ADMIN,
    URI_METHOD,
    API_ADRESS_RANDOM
} = process.env;


var options = {
    'method': URI_METHOD,
    'url': 'http://api.3geonames.org/randomland.FR.json',
    'headers': {
    }
};


module.exports = {
    initialyRoles,
    initialyUser,
    loadCountryCode,
    generatorAdress,
    initProduct,
    generateProduct,
    initNonFraud,
    initFraud,
    initFraud2
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
async function loadCountryCode(JsonDataCountry) {
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
            Country.insertMany(JsonDataCountry).then(function () {
                logger.info(`+++ Added  to country collection`);
            }).catch(function (error) {
                logger.error(error)      // Failure
            });
           
        } else {
            logger.info("Data Country is  existe  .....");
        }
    });

}

function generatorAdress(directoryPath) {
    Adress.estimatedDocumentCount((err, count) => {
        if (count === 0 && !err) {
            logger.info("+ Load city  Code in MongoDB ... ");
            //passsing directoryPath and callback function
            fs.readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    logger.error('Unable to scan directory: ' + err);
                    process.exit();
                } 
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file          
                    var data=fs.readFileSync(path.join(directoryPath, file), 'utf8');
                    var words=JSON.parse(data);
                    // logger.info(words);
                    Adress.insertMany(words).then(function(){
                        logger.info(`- ${file} : Data  adresses inserted is success`)  // Success
                    }).catch(function(error){
                        logger.error(error)      // Failure
                    });
        
                    
                });
            });         
        }
    });    
}

function generateProduct(){
    var products = [];
    for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
        products.push({
            name: faker.commerce.productName(),
            quantity: Math.floor(Math.random() * 10)
        });
    }
    return products;
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

async function initNonFraud(){
     // const tmp = random_data.list_countries.find(item=> item.code === String(localize).toUpperCase());
    // faker.locale = tmp.faker;
    Adress.find().sort({ state: 1 })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            } else {
                var datasets = [];
                addresses.forEach(item => {
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    //const date_payment = faker.date.soon(365, date_create);
                    const date_payment = faker.date.between(date_create, Date.now());
                    const diffTime = Math.abs(date_payment - date_create);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        addresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders: Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
                        payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                        card_nationality: item.state,
                        delivery_address: item,
                        billing_country: item.state,
                        billing_address: item.address,
                        email_changed_days: Number(diffDays),
                        email: faker.internet.email(),
                        delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                        delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                        delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                        voucher: faker.datatype.boolean(),
                        subscription: faker.datatype.boolean(),
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });

                });
                Dataset.insertMany(datasets).then(function () {
                    logger.info(`- Dataset non fraud generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }
        });
}

async function initFraud(){
    Adress.find().sort({ state: 1 })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            } else {
                var datasets = [];
                addresses.forEach(item => {
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    //const date_payment = faker.date.soon(365, date_create);
                    const date_payment = faker.date.between(date_create, Date.now());                    
                   
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        addresse_changed_days: 0,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 2),
                        items: generateProduct(),
                        payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                        card_nationality: item.state,
                        delivery_address: item,
                        billing_country: item.state,
                        billing_address: item.address,
                        email_changed_days: 0,
                        email: faker.internet.email(),
                        delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                        delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                        delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                        voucher: false,
                        subscription: false,
                        total: faker.commerce.price(5, 10000),
                        type: 'fraud',
                    });

                });
                Dataset.insertMany(datasets).then(function () {
                    logger.info(`- Dataset generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }
        });
}

async function initFraud2(){
    Adress.find().sort({ state: 1 })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            } else {
                var datasets = [];
                addresses.forEach(item => {
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    const date_payment = faker.date.between(date_create, Date.now());
                   
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        addresse_changed_days: 0,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders: Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
                        payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                        card_nationality: item.state,
                        delivery_address: item,
                        billing_country: item.state,
                        billing_address: item.address,
                        email_changed_days: 0,
                        email: faker.internet.email(),
                        delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                        delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                        delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                        voucher: faker.datatype.boolean(),
                        subscription: faker.datatype.boolean(),
                        total: faker.commerce.price(80, 300),
                        type: 'fraud2',
                    });

                });
                Dataset.insertMany(datasets).then(function () {
                    logger.info(`- Dataset generate is successfully`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }
        });
}
