var CryptoJS = require("crypto-js");
const configSecret = require("../config/constantes");
var request = require('request');


const db = require("../models");
const Adress = db.adress;
const Country = db.country;

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

exports.createAdress = async (req, res) => {
    if (!req.query.code) {
        return res.status(400).json({ message: 'Body not found' });
    }
    configSecret.options.url= `${API_ADRESS_RANDOM}.${req.query.code}.json`;
    request(configSecret.options, function (error, response) {
        if (error) throw new Error(error);
        var items = JSON.parse(response.body);
        new Adress({
            adress: CryptoJS.AES.encrypt(JSON.stringify(faker.address.streetAddress(true)), configSecret.secret).toString(),
            name: CryptoJS.AES.encrypt(JSON.stringify(items.nearest.name), configSecret.secret).toString(),
            region: CryptoJS.AES.encrypt(JSON.stringify(items.nearest.region), configSecret.secret).toString(),
            city: CryptoJS.AES.encrypt(JSON.stringify(items.nearest.city), configSecret.secret).toString(),
            province: CryptoJS.AES.encrypt(JSON.stringify(items.nearest.prov), configSecret.secret).toString(),
            gps_cordinates: { latt: items.nearest.latt, longt: items.nearest.longt },
            ref_country: items._id
        }).save((err) => {
            if (err) {
                logger.error(err);
            }
            logger.info(`+++ Add new address in collection`);
        });
    });
    

}

exports.findAdressByProvince = async (req, res) => {
    if (req.query.prov) {
        return res.status(404).send(` Request query not found `);
    }
    Adress.findOne(
        { 
            province: req.query.prov
        }
    ).populate("ref_country", "-__v")
        .sort({ name: 1 })
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


exports.findAllAdress = async (req, res) => {
    
    Adress.find().populate("ref_country", "-__v")
        .exec((err, addresses) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!addresses) {
                return res.status(404).json({ message: "Adresse Not found." });
            }
            addresses.forEach(
                (item) => {
                    // Decrypt
                    //var bytes = CryptoJS.AES.decrypt(item.name, configSecret.secret);
                    //var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                    
                    item.name = (CryptoJS.AES.decrypt(item.name, configSecret.secret)).toString(CryptoJS.enc.Utf8);
                    item.adress = (CryptoJS.AES.decrypt(item.adress, configSecret.secret)).toString(CryptoJS.enc.Utf8);
                    item.region = (CryptoJS.AES.decrypt(item.region, configSecret.secret)).toString(CryptoJS.enc.Utf8);
                    item.city = (CryptoJS.AES.decrypt(item.city, configSecret.secret)).toString(CryptoJS.enc.Utf8);
                    item.province = (CryptoJS.AES.decrypt(item.province, configSecret.secret)).toString(CryptoJS.enc.Utf8);

                }
            )
            res.status(200).json(addresses);
        });
}