const config = require("../config/constantes");
var bcrypt = require("bcryptjs");
const db = require("../models");
const Country = db.country;
const Dataset = db.dataset;

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

const generate = require('../services/dataset.service');
const { json, response } = require("express");

exports.createDatasetNonFraud = async (req, res) => {

    if (!req.query.number) {
        return res.status(400).json({ message: 'code country not found' });
    }
    generate.generate_non_fraud (req.query.number);
   
    res.status(200).json({code : 201, message : ` dataset non fraud added is ok`});
}

exports.findAllDataset = async (req, res) => {

    Dataset.find().sort({account_id:1})
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