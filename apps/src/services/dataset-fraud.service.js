const { faker } = require('@faker-js/faker');
const db = require("../models/index");
const random_data = require('../config/constantes');

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";


const Dataset = db.dataset;
const Adress = db.adress;

module.exports = {
    generate_fraud,
    init_fraud
};

function generate_fraud(number) {
    // card nationality 30 %
    Adress.find({ state: { $nin: random_data.card_nationality1 } })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
                process.exit();
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            } else {
                var datasets = [];
                // cardinality proba non fraud 70%
                size_payment_provider = Math.round(Number(number) * 0.3);
                for (let index = 0; index < size_payment_provider; index++) {
                    const address = addresses[Math.floor(Math.random() * addresses.length)];
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    const date_payment = faker.date.soon(1, date_create);
                   
                  
                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            addresse_changed_days: 0,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders:  Math.floor(Math.random() * 2),
                            items:  generate_product(),
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: 0,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: false,
                            subscription: false,
                            total: faker.commerce.price(80, 300),
                            type: 'fraud',
                        });

                    } else {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            adresse_changed_days: 0,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders:  Math.floor(Math.random() * 2),
                            items:  generate_product(),
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: 0,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: false,
                            subscription: false,
                            total: faker.commerce.price(80, 300),
                            type: 'fraud',
                        });
                    }
                }

                Dataset.insertMany(datasets).then(function () {
                    //logger.info(`- Dataset generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }


        });

    // card nationality 40%
    Adress.find({ state: { $nin: random_data.card_nationality2 } })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
                process.exit();
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });

            } else {
                var datasets = [];
                size_payment_provider = Math.round(Number(number) * 0.4);
                for (let index = 0; index < size_payment_provider; index++) {
                    const address = addresses[Math.floor(Math.random() * addresses.length)];
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    const date_payment = faker.date.soon(1, date_create);                    
                   
                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            addresse_changed_days: 0,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders:  Math.floor(Math.random() * 2),
                            items:  generate_product(),
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: 0,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: false,
                            subscription: false,
                            total: faker.commerce.price(80, 300),
                            type: 'fraud',
                        });

                    } else {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            adresse_changed_days: 0,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders:  Math.floor(Math.random() * 2),
                            items: generate_product(),
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: 0,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: false,
                            subscription: false,
                            total: faker.commerce.price(80, 300),
                            type: 'fraud',
                        });
                    }
                }

                Dataset.insertMany(datasets).then(function () {
                    //logger.info(`- Dataset generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }


        });

    // card nationality 20%
    Adress.find({ state: { $nin: random_data.card_nationality3 } })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            } else {
                var datasets = [];
                // cardinality proba non fraud 70%
                size_payment_provider = Math.round(Number(number) * 0.2);
                for (let index = 0; index < size_payment_provider; index++) {
                    const address = addresses[Math.floor(Math.random() * addresses.length)];
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    const date_payment = faker.date.soon(1, date_create);                   
                   
                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            addresse_changed_days: 0,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders:  Math.floor(Math.random() * 2),
                            items:  generate_product(),
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: 0,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: false,
                            subscription: false,
                            total: faker.commerce.price(80, 300),
                            type: 'fraud',
                        });

                    } else {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            adresse_changed_days: 0,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders:  Math.floor(Math.random() * 2),
                            items:  generate_product(),
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: 0,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: false,
                            subscription: false,
                            total: faker.commerce.price(80, 300),
                            type: 'fraud',
                        });
                    }
                }

                Dataset.insertMany(datasets).then(function () {
                    //logger.info(`- Dataset generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }


        });

    // card nationality 10%
    Adress.find({ state: { $nin: random_data.card_nationality4 } })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            } else {
                var datasets = [];
                // cardinality proba non fraud 70%
                size_payment_provider = Math.round(Number(number) * 0.1);
                for (let index = 0; index < size_payment_provider; index++) {
                    const address = addresses[Math.floor(Math.random() * addresses.length)];
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    const date_payment = faker.date.soon(1, date_create);                   
                   
                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            addresse_changed_days: 0,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders:  Math.floor(Math.random() * 2),
                            items:  generate_product(),
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: 0,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: false,
                            subscription: false,
                            total: faker.commerce.price(80, 300),
                            type: 'fraud',
                        });

                    } else {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            adresse_changed_days: 0,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders:  Math.floor(Math.random() * 2),
                            items:  generate_product(),
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: 0,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: false,
                            subscription: false,
                            total: faker.commerce.price(80, 300),
                            type: 'fraud',
                        });
                    }
                }

                Dataset.insertMany(datasets).then(function () {
                    //logger.info(`- Dataset generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }


        });

    logger.info(`${number} datasets fraud have been successfully created `);
}

function init_fraud() {

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
                        items: generate_product(),
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

function generate_product(){
    var products = [];
    for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
        products.push({
            name: faker.commerce.productName(),
            quantity: Math.floor(Math.random() * 10)
        });
    }
    return products;
}

