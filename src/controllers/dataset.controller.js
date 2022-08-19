const { faker } = require('@faker-js/faker');
var bcrypt = require("bcryptjs");
const random_data = require('../config/constantes');
const product = require('../services/init.service');

const db = require("../models");
const Dataset = db.dataset;
const Adress = db.adress;


// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";



exports.createDataset = async (req, res) => {

}

exports.findAllDataset = async (req, res) => {

    Dataset.find().sort({ account_id: 1 }).limit(1000000)
        .exec((err, datasets) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!datasets) {
                return res.status(404).json({ message: "Adresse Not found." });
            }
            res.status(200).json(datasets);
        });
}

exports.findDatasetByState = async (req, res) => {
    if (!req.params.state) {
        return res.status(400).json({ message: 'type country not found' });
    }
    Dataset.find({ state: req.params.state }).sort({ account_id: 1 })
        .exec((err, datasets) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!datasets) {
                return res.status(404).json({ message: "Adresse Not found." });
            }
            res.status(200).json(datasets);
        });
}

exports.findAllDatasetByType = async (req, res) => {
    if (!req.query.type) {
        return res.status(400).json({ message: 'type dataset not found' });
    }
    Dataset.find({ type: req.query.type }).sort({ account_id: 1 })
        .exec((err, datasets) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!datasets) {
                return res.status(404).json({ message: "Adresse Not found." });
            }
            res.status(200).json(datasets);
        });
}

exports.createDatasetNonFraud = async (req, res) => {

    if (!req.query.number) {
        return res.status(400).json({ message: 'number dataset not found' });
    }
    // cardinality 70%
    setTimeout(() => {
        Adress.find({ state: { $nin: random_data.card_nationality1 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } {
                    // cardinality proba non fraud 70%
                    size_payment_provider_70 = Math.round(Number(req.query.number) * 0.7);
                    for (let index = 0; index < size_payment_provider_70; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.between(date_create, Date.now());
                        const diffTime = Math.abs(date_payment - date_create);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        if (index < Math.round(Number(size_payment_provider_70) * 0.7)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                addresse_changed_days: Number(diffDays),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
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
                            }).save((err) => {
                                if (err) {
                                    return res.status(200).json({ code: 500, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                adresse_changed_days: Number(diffDays),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
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
                            }).save((err) => {
                                if (err) {
                                    return res.status(200).json({ code: 500, message: err });
                                }
                            });
                        }
                    }
                }




            });
    }, 30000);

    // cardinality proba 15%
    setTimeout(() => {
        Adress.find({ state: { $nin: random_data.card_nationality2 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } else {
                    size_payment_provider_15 = Math.round(Number(req.query.number) * 0.15);
                    for (let index = 0; index < size_payment_provider_15; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.between(date_create, Date.now());
                        // const date_payment = faker.date.soon(10, date_create);
                        const diffTime = Math.abs(date_payment - date_create);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        if (index < Math.round(Number(size_payment_provider_15) * 0.7)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                addresse_changed_days: Number(diffDays),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
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
                            }).save((err) => {
                                if (err) {
                                    return res.status(200).json({ code: 500, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                adresse_changed_days: Number(diffDays),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
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
                            }).save((err) => {
                                if (err) {
                                    return res.status(200).json({ code: 500, message: err });
                                }
                            });
                        }


                    }
                }




            });
    }, 30000);

    // cardinality proba 10%
    setTimeout(() => {
        Adress.find({ state: { $nin: random_data.card_nationality3 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } else {
                    // cardinality proba non fraud 70%
                    size_payment_provider_10 = Math.round(Number(req.query.number) * 0.1);
                    for (let index = 0; index < size_payment_provider_10; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.between(date_create, Date.now());
                        const diffTime = Math.abs(date_payment - date_create);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        if (index < Math.round(Number(size_payment_provider_10) * 0.7)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                addresse_changed_days: Number(diffDays),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
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
                            }).save((err) => {
                                if (err) {
                                    return res.status(200).json({ code: 500, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                adresse_changed_days: Number(diffDays),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
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
                            }).save((err) => {
                                if (err) {
                                    return res.status(200).json({ code: 500, message: err });
                                }
                            });
                        }
                    }
                }


            });
    }, 30000);


    // cardinality proba 5%
    setTimeout(() => {
        Adress.find({ state: { $nin: random_data.card_nationality4 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } else {
                    // cardinality proba non fraud 5%
                    size_payment_provider_5 = Math.round(Number(req.query.number) * 0.05);
                    for (let index = 0; index < size_payment_provider_5; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.between(date_create, Date.now());
                        const diffTime = Math.abs(date_payment - date_create);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        if (index < Math.round(Number(size_payment_provider_5) * 0.7)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                addresse_changed_days: Number(diffDays),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
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
                            }).save((err) => {
                                if (err) {
                                    logger.error(err);
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                adresse_changed_days: Number(diffDays),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
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
                            }).save((err) => {
                                if (err) {
                                    return res.status(200).json({ code: 500, message: err });
                                }
                                return res.status(200).json({ code: 201, message: ` ${req.query.number} dataset non fraud added with  successfully` });
                            });
                        }
                    }
                }

            });
    }, 10000);
}

exports.createDatasetFraud = async (req, res) => {

    if (!req.query.number) {
        return res.status(400).json({ message: 'number dataset not found' });
    }

    setTimeout(() => {
        Adress.find({ state: { $nin: random_data.card_nationality1 } })
            .exec((err, addresses) => {
                if (err) {
                    return res.status(500).json({ code: 500, message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } else {
                    // cardinality proba non fraud 70%
                    size_payment_provider = Math.round(Number(req.query.number) * 0.3);
                    for (let index = 0; index < size_payment_provider; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.soon(1, date_create);


                        if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                                page_visited: Math.floor(Math.random() * 3) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 2),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: false,
                                subscription: false,
                                total: faker.commerce.price(80, 300),
                                type: 'fraud',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                                page_visited: Math.floor(Math.random() * 3) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 2),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: false,
                                subscription: false,
                                total: faker.commerce.price(80, 300),
                                type: 'fraud',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });
                        }
                    }


                }


            });
    }, 30000);
    // card nationality 30 %


    // card nationality 40%
    setTimeout(() => {
        Adress.find({ state: { $nin: random_data.card_nationality2 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                    process.exit();
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });

                } else {
                    size_payment_provider = Math.round(Number(req.query.number) * 0.4);
                    for (let index = 0; index < size_payment_provider; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.soon(1, date_create);

                        if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                                page_visited: Math.floor(Math.random() * 3) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 2),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: false,
                                subscription: false,
                                total: faker.commerce.price(80, 300),
                                type: 'fraud',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                                page_visited: Math.floor(Math.random() * 3) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 2),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: false,
                                subscription: false,
                                total: faker.commerce.price(80, 300),
                                type: 'fraud',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });
                        }
                    }
                }
            });
    }, 30000);


    // card nationality 20%
    setTimeout(() => {
        Adress.find({ state: { $nin: random_data.card_nationality3 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } else {
                    // cardinality proba non fraud 70%
                    size_payment_provider = Math.round(Number(req.query.number) * 0.2);
                    for (let index = 0; index < size_payment_provider; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.soon(1, date_create);

                        if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                                page_visited: Math.floor(Math.random() * 3) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 2),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: false,
                                subscription: false,
                                total: faker.commerce.price(80, 300),
                                type: 'fraud',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                                page_visited: Math.floor(Math.random() * 3) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 2),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: false,
                                subscription: false,
                                total: faker.commerce.price(80, 300),
                                type: 'fraud',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });
                        }
                    }


                }


            });
    }, 30000);


    // card nationality 10%
    setTimeout(() => {
        Adress.find({ state: { $nin: random_data.card_nationality4 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } else {
                    // cardinality proba non fraud 70%
                    size_payment_provider = Math.round(Number(req.query.number) * 0.1);
                    for (let index = 0; index < size_payment_provider; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.soon(1, date_create);

                        if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                                page_visited: Math.floor(Math.random() * 3) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 2),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: false,
                                subscription: false,
                                total: faker.commerce.price(80, 300),
                                type: 'fraud',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 200) + 10,
                                page_visited: Math.floor(Math.random() * 3) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 2),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: false,
                                subscription: false,
                                total: faker.commerce.price(80, 300),
                                type: 'fraud',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });
                            return res.status(200).json({ code: 201, message: ` ${req.query.number} dataset fraud added with  successfully` });
                        }
                    }
                }
            });
    }, 30000);


}


//controller create dataset fraud 2
exports.createDatasetFraud2 = async (req, res) => {

    if (!req.query.number) {
        return res.status(400).json({ message: 'number dataset not found' });
    }

    setTimeout(() => {
        // cardinality  proba 30%
        Adress.find({ state: { $nin: random_data.card_nationality1 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } else {
                    var datasets = [];
                    // cardinality proba non fraud 70%
                    size_payment_provider = Math.round(Number(req.query.number) * 0.3);
                    for (let index = 0; index < size_payment_provider; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.between(date_create, Date.now());

                        if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: faker.datatype.boolean(),
                                subscription: faker.datatype.boolean(),
                                total: faker.commerce.price(80, 300),
                                type: 'fraud2',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: faker.datatype.boolean(),
                                subscription: faker.datatype.boolean(),
                                total: faker.commerce.price(80, 300),
                                type: 'fraud2',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });
                        }
                    }
                }
            });
    }, 30000);

    setTimeout(() => {
        // cardinality proba 40%
        Adress.find({ state: { $nin: random_data.card_nationality2 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                }
                size_payment_provider = Math.round(Number(req.query.number) * 0.4);
                for (let index = 0; index < size_payment_provider; index++) {
                    const address = addresses[Math.floor(Math.random() * addresses.length)];
                    const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                    const date_payment = faker.date.between(date_create, Date.now());

                    if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                        new Dataset({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                            page_visited: Math.floor(Math.random() * 50) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders: Math.floor(Math.random() * 20),
                            items: product.generateProduct(),
                            payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                            type: 'fraud2',
                        }).save((err) => {
                            if (err) {
                                return res.status(422).json({ code: 422, message: err });
                            }
                        });

                    } else {
                        new Dataset({
                            account_id: Math.floor(Math.random() * 80000) + 1,
                            user_date_creation: date_create.toISOString(),
                            payment_date: date_payment.toISOString(),
                            browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                            page_visited: Math.floor(Math.random() * 50) + 1,
                            number_ticket_opened: Math.floor(Math.random() * 10),
                            number_previous_orders: Math.floor(Math.random() * 20),
                            items: product.generateProduct(),
                            payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                            card_nationality: address.state,
                            delivery_address: address,
                            billing_country: address.state,
                            billing_address: address.address,
                            email: faker.internet.email(),
                            delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                            delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                            delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                            voucher: faker.datatype.boolean(),
                            subscription: faker.datatype.boolean(),
                            total: faker.commerce.price(80, 300),
                            type: 'fraud2',
                        }).save((err) => {
                            if (err) {
                                return res.status(422).json({ code: 422, message: err });
                            }
                        });
                    }
                }

            });
    }, 30000);

    setTimeout(() => {
        // cardinality proba 20%
        Adress.find({ state: { $nin: random_data.card_nationality3 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    return res.status(500).json({ code: 500, message: `Adresse Not found :${addresses}` });
                } else {
                    // cardinality proba non fraud 70%
                    size_payment_provider = Math.round(Number(req.query.number) * 0.2);
                    for (let index = 0; index < size_payment_provider; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.between(date_create, Date.now());

                        if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: faker.datatype.boolean(),
                                subscription: faker.datatype.boolean(),
                                total: faker.commerce.price(80, 300),
                                type: 'fraud2',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: faker.datatype.boolean(),
                                subscription: faker.datatype.boolean(),
                                total: faker.commerce.price(80, 300),
                                type: 'fraud2',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });
                        }
                    }
                }

            });
    }, 30000);

    setTimeout(() => {
        // cardinality proba 10%
        Adress.find({ state: { $nin: random_data.card_nationality4 } })
            .exec((err, addresses) => {
                if (err) {
                    logger.error({ message: err });
                }

                if (!addresses) {
                    logger.error({ message: "Adresse Not found." });
                } else {
                    // cardinality proba non fraud 10%
                    size_payment_provider = Math.round(Number(req.query.number) * 0.1);
                    for (let index = 0; index < size_payment_provider; index++) {
                        const address = addresses[Math.floor(Math.random() * addresses.length)];
                        const date_create = faker.date.between('2017-01-01T00:00:00.000Z', Date.now());
                        const date_payment = faker.date.between(date_create, Date.now());

                        if (index < Math.round(Number(size_payment_provider) * 0.2)) {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider1[Math.floor(Math.random() * random_data.payment_provider1.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: faker.datatype.boolean(),
                                subscription: faker.datatype.boolean(),
                                total: faker.commerce.price(80, 300),
                                type: 'fraud2',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err });
                                }
                            });

                        } else {
                            new Dataset({
                                account_id: Math.floor(Math.random() * 80000) + 1,
                                user_date_creation: date_create.toISOString(),
                                payment_date: date_payment.toISOString(),
                                browsing_time_seconds: Math.floor(Math.random() * 3600) + 10,
                                page_visited: Math.floor(Math.random() * 50) + 1,
                                number_ticket_opened: Math.floor(Math.random() * 10),
                                number_previous_orders: Math.floor(Math.random() * 20),
                                items: product.generateProduct(),
                                payment_provider: random_data.payment_provider2[Math.floor(Math.random() * random_data.payment_provider2.length)],
                                card_nationality: address.state,
                                delivery_address: address,
                                billing_country: address.state,
                                billing_address: address.address,
                                email: faker.internet.email(),
                                delivery_company: random_data.delivery_companies[Math.floor(Math.random() * random_data.delivery_companies.length)],
                                delivery_place: random_data.delivery_places[Math.floor(Math.random() * random_data.delivery_places.length)],
                                delivery_option: random_data.delivery_options[Math.floor(Math.random() * random_data.delivery_options.length)],
                                voucher: faker.datatype.boolean(),
                                subscription: faker.datatype.boolean(),
                                total: faker.commerce.price(80, 300),
                                type: 'fraud2',
                            }).save((err) => {
                                if (err) {
                                    return res.status(422).json({ code: 422, message: err }); 
                                }
                            });
                            return res.status(201).json({ code: 201, message: ` ${req.query.number} dataset fraud 2 added with  successfully` });
                        }
                    }
                }

            });
    }, 30000);

}
