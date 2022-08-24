var CryptoJS = require("crypto-js");
const configSecret = require("../config/constantes");
var request = require('request');


const db = require("../models");
const Adress = db.adress;
const Country = db.country;

// logger info 
var log4js = require("log4js");
const Dataset = require("../models/dataset.model");
var logger = log4js.getLogger();
logger.level = "debug";
exports.createAdress = async (req, res) => {
    if (!req.query.code) {
        return res.status(404).json({code: 404, data: 'Body not found' });
    }
    configSecret.options.url= `${API_ADRESS_RANDOM}.${req.query.code}.json`;
    Country.findById(
        {code: req.query.code}
    ).exec((err, country) => {
            if (err) {
                return res.status(500).json({ code: 500, data: err });
            }

            if (!country) {
                return res.status(404).json({code: 404, data: ` country account does not exist ` });
            }
              
            if(req.query.occurence !== null){
                for (let index = 0; index < Number(req.query.occurence); index++) {
                    request(configSecret.options, function (error, response) {
                        if (error) throw new Error(error);
                        var items = JSON.parse(response.body);
                        new Adress({
                            adress: faker.address.streetAddress(true),
                            name:items.nearest.name,
                            region: items.nearest.region,
                            city: items.nearest.city,
                            province:items.nearest.prov,
                            gps_cordinates: { latt: items.nearest.latt, longt: items.nearest.longt },
                            ref_country: country._id
                        }).save((err) => {
                            if (err) {
                                logger.error(err);
                            }
                            logger.info(`+++ Add new address in collection`);
                        });    
                    });
                    new Promise(r => setTimeout(r, 120000));                    
                }
            }else{
                request(configSecret.options, function (error, response) {
                    if (error) throw new Error(error);
                    var items = JSON.parse(response.body);
                    new Adress({
                        adress: faker.address.streetAddress(true),
                        name:items.nearest.name,
                        region: items.nearest.region,
                        city: items.nearest.city,
                        province:items.nearest.prov,
                        gps_cordinates: { latt: items.nearest.latt, longt: items.nearest.longt },
                        ref_country: country._id
                    }).save((err) => {
                        if (err) {
                            logger.error(err);
                        }
                        logger.info(`+++ Add new address in collection`);
                    });                           
                });
                
            }                               
    });    
}

exports.createAdressCrypted = async (req, res) => {
    if (!req.query.code) {
        return res.status(400).json({ data: 'Body not found' });
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


exports.findAllAdress = async (req, res) => {
    if(req.query.state){
        Adress.find({state:req.query.state}).sort({city:1})
        .exec((err, addresses) => {
            if (err) {
                return res.status(500).json({ code: 500, data: err });
            }

            if (!addresses) {
                return res.status(404).json({code: 404, data: ` adress not found ` });
            }            
            res.status(200).json({
                code: 200,
                total_count: addresses.length,
                addresses: addresses
            });
        });
    }else {
        Adress.find().sort({state:1})
        .exec((err, addresses) => {
            if (err) {
                return res.status(500).json({ code: 500, data: err });
            }

            if (!addresses) {
                return res.status(404).json({code: 404, data: ` adress not found ` });
            }            
            res.status(200).json({
                code: 200,
                total_count: addresses.length,
                addresses: addresses
            });
        });
    }
    
}
exports.findAllAdressDecrypted = async (req, res) => {
    
    Adress.find().populate("ref_country", "-__v")
        .exec((err, addresses) => {
            if (err) {
                return res.status(500).json({ data: err });
            }

            if (!addresses) {
                return res.status(404).json({ data: "Adresse Not found." });
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
