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

exports.findAll = async (req, res) => {

}

