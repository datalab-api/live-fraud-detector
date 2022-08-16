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
    generate_fraud
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
                    const date_payment = faker.date.soon(1, Date.now());
                    const diffTime = Math.abs(date_payment - date_create);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    var products = [];
                    for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
                        products.push({
                            name: faker.commerce.productName(),
                            quantity: Math.floor(Math.random() * 10)
                        });
                    }
                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            addresse_changed_days: diffDays,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: 0,
                            items: products,
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: Number(diffDays),
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                        });

                    } else {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            adresse_changed_days: diffDays,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: 0,
                            items: products,
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: Number(diffDays),
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                        });
                    }
                }

                Dataset.insertMany(datasets).then(function () {
                    logger.info(`- Dataset generate is success`);  // Success
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
                // cardinality proba non fraud 70%
                size_payment_provider = Math.round(Number(number) * 0.4);
                for (let index = 0; index < size_payment_provider; index++) {
                    const address = addresses[Math.floor(Math.random() * addresses.length)];
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    const date_payment = faker.date.soon(1, Date.now());
                    const diffTime = Math.abs(date_payment - date_create);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    var products = [];
                    for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
                        products.push({
                            name: faker.commerce.productName(),
                            quantity: Math.floor(Math.random() * 10)
                        });
                    }
                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            addresse_changed_days: diffDays,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: 0,
                            items: products,
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: Number(diffDays),
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                        });

                    } else {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            adresse_changed_days: diffDays,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: 0,
                            items: products,
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: Number(diffDays),
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                        });
                    }
                }

                Dataset.insertMany(datasets).then(function () {
                    logger.info(`- Dataset generate is success`);  // Success
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
                    const date_payment = faker.date.soon(1, Date.now());
                    const diffTime = Math.abs(date_payment - date_create);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    var products = [];
                    for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
                        products.push({
                            name: faker.commerce.productName(),
                            quantity: Math.floor(Math.random() * 10)
                        });
                    }
                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            addresse_changed_days: diffDays,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: 0,
                            items: products,
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: Number(diffDays),
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                        });

                    } else {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            adresse_changed_days: diffDays,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: 0,
                            items: products,
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: Number(diffDays),
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                        });
                    }
                }

                Dataset.insertMany(datasets).then(function () {
                    logger.info(`- Dataset generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }


        });

    // card nationality 10%
    Adress.find({ state: 'RU' })
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
                    const date_payment = faker.date.soon(1, Date.now());
                    const diffTime = Math.abs(date_payment - date_create);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    var products = [];
                    for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
                        products.push({
                            name: faker.commerce.productName(),
                            quantity: Math.floor(Math.random() * 10)
                        });
                    }
                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            addresse_changed_days: diffDays,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: 0,
                            items: products,
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: Number(diffDays),
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                        });

                    } else {
                        datasets.push({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            adresse_changed_days: diffDays,
                            browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                            page_visited: Math.floor(Math.random() * 3) + 1,
                            number_ticket_opened: 0,
                            items: products,
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email_changed_days: Number(diffDays),
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                        });
                    }
                }

                Dataset.insertMany(datasets).then(function () {
                    logger.info(`- Dataset generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }


        });
}


