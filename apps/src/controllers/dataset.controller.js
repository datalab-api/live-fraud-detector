const config = require("../config/constantes");
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Dataset = db.dataset;

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

exports.createDataset = async (req, res) => {

}


exports.findDatasetByName = async (req, res) => {

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