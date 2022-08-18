const config = require("../config/constantes");
const { faker } = require('@faker-js/faker');

const db = require("../models");
const Product = db.product;

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

exports.createProduct = async (req,res) => {
    if (!req.params.number) {
        return res.status(400).json({ message: 'Body not found' });
    }

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

exports.findAllProduct = async (req, res) => {
    
    Product.find().sort({name:1})
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!products) {
                return res.status(404).json({ message: "Producte Not found." });
            }            
            res.status(200).json(products);
        });
}

exports.findProductByQuantity = async (req, res) => {
    if (req.query.quantity) {
        return res.status(404).send(` Request query not found `);
    } 
    Product.findOne({quantity: req.query.quantity}).sort({name:1})
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!products) {
                return res.status(404).json({ message: "Producte Not found." });
            }            
            res.status(200).json(products);
        });
}