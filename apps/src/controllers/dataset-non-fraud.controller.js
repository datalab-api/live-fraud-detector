const config = require("../config/constantes");
var bcrypt = require("bcryptjs");
const db = require("../models");
const Country = db.country;
const Dataset = db.dataset;

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

const dataRandom = require('../config/constantes');

exports.createDatasetFraud = async (req, res) => {
    if (!req.params.code) {
        return res.status(400).json({ message: 'code country not found' });
    }
    if (!req.query.number) {
        return res.status(400).json({ message: 'code country not found' });
    }
    const tmp = dataRandom.list_countries.find(({ code }) => code === req.params.code);
    faker.locale = tmp.faker;
    dataRandom.options.url = `http://api.3geonames.org/randomland.${req.params.code}.json`
    Country.findOne({ code: req.params.code })
        .exec((err, country) => {
            if (err) {
                logger.error(error);
            }
            new Promise(r => setTimeout(r, 120000));

            for (let index = 0; index < Number(req.query.number); index++) {
                request(options, function (error, response) {
                    if (error) {
                        throw new Error(error);
                        process.exit();
                    }
                    var randomCountry = JSON.parse(response.body);
                    new Adress({
                        adress: faker.address.streetAddress(true),
                        name: randomCountry.nearest.name,
                        region: randomCountry.nearest.region !== null || '',
                        city: randomCountry.nearest.city,
                        province: randomCountry.nearest.prov  !== null || '',
                        gps_cordinates: { latt: randomCountry.nearest.latt, longt: randomCountry.nearest.longt },
                        ref_country: country._id
                    }).save((err) => {
                        if (err) {
                            logger.error(err);
                        }
                        
                    });

                });
                new Promise(r => setTimeout(r, 120000));
                logger.info( index%10 === 0);



        })






}


exports.findDatasetByName = async (req, res) => {

}

exports.findAllDataset = async (req, res) => {

    Dataset.find().populate("adress", "-__v")
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