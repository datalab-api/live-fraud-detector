var exit = require('exit');
// var faker = require('faker');
const { faker } = require('@faker-js/faker');
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";
const db = require("../model/index");
const DatasetModel = db.dataset;

module.exports = {    
    initRandomDataset,
    createRandomUser,
    loadData
};

function initRandomDataset (){
    if(!db){
        logger.error(' Databse Mongo not existed !');
        exit(1);
    }
    DatasetModel.estimatedDocumentCount((err,count) =>{
        if(!err && count === 0){
            new Dataset({
                id: new require('mongoose').Types.ObjectId(faker.datatype.uuid()),
                user_date_creation: faker.date.recent(),
                user_hour_creation: faker.address.countryCode(),
                payment_date: faker.date.recent(),
                payment_hour: faker.address.countryCode(),
                number_orders:faker.address.countryCode() ,
                adresse_changed_days: faker.random.numeric(100),
                browsing_time_seconds: faker.random.numeric(1000),
                page_visited: faker.random.numeric(10),
                number_ticket_opened: faker.random.numeric(10),
                items: faker.address.countryCode(),
                payment_provider: faker.finance.creditCardNumber() ,
                card_nationality: faker.finance.currencyName(),
                address_country: faker.address.countryCode(),
                delivery_address: faker.address.streetAddress() ,
                billing_country: faker.address.countryCode(),
                billing_address:faker.address.streetAddress() ,
                city: faker.address.city(),
                zip: faker.address.zip(),
                province: faker.address.state(),
                email: faker.internet.email(),
                dialling_code: faker.address.countryCode(),
                phone: faker.phone.phoneNumber(),
                delivery_company: faker.company.companyName(),
                delivery_place:faker.address.streetAddress() ,
                delivery_option:faker.address.countryCode() ,
                voucher:faker.datatype.boolean(),
                average_basket_price: faker.finance.amount() ,
                total:faker.finance.amount() ,
            }).save((err)=>{
                if(err){
                    logger.error(" Data not prived !");
                    exit(1);
                }
            });
        }
    });
}

// path apps route
function createRandomUser()  {
  return  {
    _id: faker.datatype.uuid(),
    user_date_creation: faker.date.recent(),
    user_hour_creation: faker.address.countryCode(),
    payment_date: faker.date.recent(),
    payment_hour: faker.address.countryCode(),
    number_orders:faker.address.countryCode() ,
    adresse_changed_days: faker.random.numeric(2),
    browsing_time_seconds: faker.random.numeric(2),
    page_visited: faker.random.numeric(10),
    number_ticket_opened: faker.random.numeric(2),
    items: faker.address.countryCode(),
    payment_provider: faker.finance.creditCardNumber() ,
    card_nationality: faker.finance.currencyName(),
    address_country: faker.address.countryCode(),
    delivery_address: faker.address.streetAddress() ,
    billing_country: faker.address.countryCode(),
    billing_address:faker.address.streetAddress() ,
    city: faker.address.city(),
    zip: faker.address.zipCodeByState(),
    province: faker.address.state(),
    email: faker.internet.email(),
    dialling_code: faker.address.countryCode(),
    phone: faker.phone.phoneNumber(),
    delivery_company: faker.company.companyName(),
    delivery_place:faker.address.streetAddress() ,
    delivery_option:faker.address.countryCode() ,
    voucher:faker.datatype.boolean(),
    average_basket_price: faker.finance.amount() ,
    total:faker.finance.amount() ,
  };
};

function loadData(){
    var dataset = [];

    Array.from({ length:12 }).forEach(() => {
        dataset.push(createRandomUser());
    });
    logger.info(dataset);
}
