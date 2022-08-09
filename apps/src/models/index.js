const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const db = {};

db.mongoose = mongoose;

db.dataset = require("./dataset.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.country = require("./country-code.model");
db.adress =require("./adress.model");
db.product = require('./product.model');

module.exports = db;