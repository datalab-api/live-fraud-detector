const { faker } = require('@faker-js/faker');
const db = require("../models/index");
const random_data = require('../config/constantes');
const product = require('./init.service');
// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

const Dataset = db.dataset;
const Adress = db.adress;


module.exports = {
    generate_non_fraud,
    init_non_fraud
};


function generate_non_fraud(number) {
    // cardinality 70%
    Adress.find({ state: { $nin: random_data.card_nationality1 } })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            }
            var datasets = [];
            // cardinality proba non fraud 70%
            size_payment_provider_70 = Math.round(Number(number) * 0.7);
            for (let index = 0; index < size_payment_provider_70; index++) {
                const address = addresses[Math.floor(Math.random() * addresses.length)];
                const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                const date_payment = faker.date.between(date_create, Date.now());
                const diffTime = Math.abs(date_payment - date_create);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (index < Math.round(Number(size_payment_provider_70) * 0.7)) {
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        addresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
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
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });

                } else {
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        adresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
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
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });
                }


            }

            Dataset.insertMany(datasets).then(function () {
                // logger.info(`- add  `);  // Success
            }).catch(function (error) {
                logger.error(error)      // Failure
            });

        });

    // cardinality proba 15%
    Adress.find({ state: { $nin: random_data.card_nationality2 } })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            }
            var datasets = [];
            size_payment_provider_15 = Math.round(Number(number) * 0.15);
            for (let index = 0; index < size_payment_provider_15; index++) {
                const address = addresses[Math.floor(Math.random() * addresses.length)];
                const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                const date_payment = faker.date.between(date_create, Date.now());
                // const date_payment = faker.date.soon(10, date_create);
                const diffTime = Math.abs(date_payment - date_create);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
               
                if (index < Math.round(Number(size_payment_provider_15) * 0.7)) {
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        addresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
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
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });

                } else {
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        adresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
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
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });
                }


            }

            Dataset.insertMany(datasets).then(function () {
                //logger.info(`- Dataset generate is success`);  // Success
            }).catch(function (error) {
                logger.error(error)      // Failure
            });

        });

    // cardinality proba 10%
    Adress.find({ state: { $nin: random_data.card_nationality3 } })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            }
            var datasets = [];
            // cardinality proba non fraud 70%
            size_payment_provider_10 = Math.round(Number(number) * 0.1);
            for (let index = 0; index < size_payment_provider_10; index++) {
                const address = addresses[Math.floor(Math.random() * addresses.length)];
                const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                const date_payment = faker.date.between(date_create, Date.now());
                const diffTime = Math.abs(date_payment - date_create);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
               
                if (index < Math.round(Number(size_payment_provider_10) * 0.7)) {
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        addresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
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
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });

                } else {
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        adresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
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
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });
                }
            }

            Dataset.insertMany(datasets).then(function () {
                //logger.info(`- Dataset generate is success`);  // Success
            }).catch(function (error) {
                logger.error(error)      // Failure
            });

        });

    // cardinality proba 5%
    Adress.find({ state: { $nin: random_data.card_nationality4 } })
        .exec((err, addresses) => {
            if (err) {
                logger.error({ message: err });
            }

            if (!addresses) {
                logger.error({ message: "Adresse Not found." });
            }
            var datasets = [];
            // cardinality proba non fraud 70%
            size_payment_provider_5 = Math.round(Number(number) * 0.05);
            for (let index = 0; index < size_payment_provider_5; index++) {
                const address = addresses[Math.floor(Math.random() * addresses.length)];
                const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                const date_payment = faker.date.between(date_create, Date.now());
                const diffTime = Math.abs(date_payment - date_create);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (index < Math.round(Number(size_payment_provider_5) * 0.7)) {
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        addresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
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
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });

                } else {
                    datasets.push({
                        account_id: Math.floor(Math.random() * 80000) + 1,
                        user_date_creation: date_create.toISOString(),
                        payment_date: date_payment.toISOString(),
                        adresse_changed_days: diffDays,
                        browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                        page_visited: Math.floor(Math.random() * 50) + 1,
                        number_ticket_opened: Math.floor(Math.random() * 10),
                        number_previous_orders:  Math.floor(Math.random() * 20),
                        items: product.generateProduct(),
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
                        total: faker.commerce.price(5, 10000),
                        type: 'non-fraud',
                    });
                }
            }

            Dataset.insertMany(datasets).then(function () {
                // logger.info(`- Dataset generate is success`);  // Success
            }).catch(function (error) {
                logger.error(error)      // Failure
            });

        });

    logger.info(`${number} datasets non fraud have been successfully created `);
}

function init_non_fraud() {
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
                        number_previous_orders:  Math.floor(Math.random() * 20),
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
                    logger.info(`- Dataset generate is success`);  // Success
                }).catch(function (error) {
                    logger.error(error)      // Failure
                });
            }
        });
}