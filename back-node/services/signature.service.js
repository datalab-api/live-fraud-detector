var CryptoJS = require("crypto-js");
const config = require("../config/constantes");


// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

async function encryptData (data){
    var res;
   try {
        res = CryptoJS.AES.encrypt(JSON.stringify(data), config.secret).toString();

   } catch (error) {
        logger.error(error);
   }
   return res;
}