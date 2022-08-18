const config = require("../config/constantes");
var bcrypt = require("bcryptjs");
const db = require("../models");
const Country = db.country;

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";





exports.findAllCountry = async (req, res) => {
    Country.find(

    ).sort({ name: 1 })
        .exec((err, countries) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!countries) {
                return res.status(404).json({ message: `No countries account exists` });
            }           
            res.status(200).json(countries);
        });
};

exports.findCountryByCode = async (req, res) => {
    Country.findById(
        {code: req.params.code}
    ).exec((err, country) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!country) {
                return res.status(404).json({ message: ` country account does not exist ` });
            }
            res.status(200).json(country);
        });
};