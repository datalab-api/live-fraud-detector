const config = require("../config/constantes");
var bcrypt = require("bcryptjs");
const db = require("../models");
const GeoPostCode = db.geopostcode;
const Country = db.country;

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

exports.createGeoPostCode = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Body not found' });
    }

    const newGeoPostCode = new GeoPostCode({
        name_of_the_municipality: req.body.name_of_the_municipality,
        routing_label: req.body.routing_label,
        code_postal: req.body.code_postal,
        gps_cordinates: req.body.gps_cordinates
    });
    if (req.body.country) {
        Country.findOne({ name: req.body.country }, (err, data) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            newGeoPostCode.country = data._id;
            newGeoPostCode.save(err => {
                if (err) {
                    return res.status(500).json({ message: err });
                }
                return res.status(201).json({ message: `Create new addresse was succefully` });
            });
        });

    } else {
        return res.status(400).json({ message: `The name of country ${req.body.country} is  not found` });
    }

}

exports.findGeoPostCodeByZip = async (req, res) => {
    if (req.params.zip) {
        return res.status(404).send(` Request params not found `);
    }
    GeoPostCode.findOne(
        { name: req.params.zip }
    ).populate("country", "-__v")
        .sort({ name_of_the_municipality: 1 })
        .exec((err, addresses) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            if (!addresses) {
                return res.status(404).send({ message: "Adresse Not found." });
            }

            res.status(200).json(adresse);
        });
}


exports.findAllGeoPostCode = async (req, res) => {
    if (req.params.name) {
        return res.status(404).send(` Request params not found `);
    }
    GeoPostCode.find().populate("country", "-__v")
        .sort({ code_postal: 1 })
        .exec((err, addresses) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!addresses) {
                return res.status(404).json({ message: "Adresse Not found." });
            }
            res.status(200).json(addresses);
        });
}