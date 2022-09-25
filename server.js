"use strict";
require("dotenv").config({ path: "./.env" })
const https = require("https");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
var session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');


const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
var morgan = require('morgan');
const cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();


const app = express();


var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

// setup the logger
app.use(morgan('combined'));



// process .env 
const PORT = process.env.PORT_BACKEND || 8080;
const HOSTNAME = process.env.HOST_API || `localhost`;
const MONGO_URI = process.env.MONGO_URI_HOST;
//const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@kyndryl-mdb-livefraudde.xzg6f.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

const initData = require("./src/services/init.service");
const optionsMongose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true, // Don"t build indexes
  maxPoolSize: 50, // Maintain up to 10 socket connections
  //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  //socketTimeoutMS: 60000, // Close sockets after 45 seconds of inactivity
};

// mongo connect
mongoose.connect(MONGO_URI, optionsMongose).then(() => {
  logger.info("MongoDB : Connection established successfully ....");
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    //.log(names); // [{ name: 'dbname.myCollection' }]
    names.forEach(element => {
      console.log(element.name)
    });
});
  initData.initialyRoles();
  new Promise(r => setTimeout(r, 120000));
  initData.initialyUser();
  new Promise(r => setTimeout(r, 120000));
  //initData.generatorAdress();
  // setTimeout(() => {
  //   initData.initFraud();
  // }, 10000);  
})
  .catch((err) => {
    logger.error(`MongoDB Connexion Error : ${err}`);
    process.exit();
  });

var corsOptions = {
  origin: `http://${HOSTNAME}:${PORT}`,
  optionSuccessStatus: 200
};
app.use(cors());
//add security app
app.use(cookieParser());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl({ allow: true }));
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts({
  maxAge: 123456,
  includeSubDomains: false,
  preload: true
}));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// parse requests of content-type = application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1) // trust first proxy
// app.use(session({
//   secret: require("./src/config/constantes").secret,
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     secure: true,
//     maxAge: 60000
//   }
// }));

app.use(expressCspHeader({
  policies: {
    'default-src': [expressCspHeader.NONE],
    'img-src': [expressCspHeader.SELF],
  }
}));




// import doc swagger api 
//const swaggerDocument = require('./src/swagger.json');
const swaggerDocument = YAML.load('./src/swagger.yaml');
app.use('/api/REST/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/address.route")(app);
require("./src/routes/dataset.route")(app);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
})

http.createServer(corsOptions, app).listen(PORT, () => {
  logger.info(`Server running at http://${HOSTNAME}:${PORT} ...`);
});