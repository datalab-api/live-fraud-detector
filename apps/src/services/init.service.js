const db = require("../models/index");
var bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
var CryptoJS = require("crypto-js");
const configSecret = require("../config/constantes");
var request = require('request');
const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, '../../../adresses');
const dataRandom = require('../config/constantes');
var JsonDataCountry = require("../../../data_template/CountryCodes.json");

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";


// databases 
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
    generateProduct
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


