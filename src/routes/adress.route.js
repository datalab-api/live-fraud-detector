const { authJwt, verifySignUp} = require('../middlewares');
const controller = require("../controllers/adress.controller");
const BaseUrl = require('../config/endpoint.config');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          'Access-Control-Allow-Headers',
          'Bearer, Origin, Content-Type, Accept'
        );
        next();
      });
    app.post(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.ADRESS_BASE + BaseUrl.ADRESS_CREATE,
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createAdress
    );
    // find all adresse
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.ADRESS_BASE + BaseUrl.ADRESS_FIND_ALL,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllAdress
    );

    // find adresse info by code country
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.ADRESS_BASE + BaseUrl.ADRESS_FIND_BY_CODE,
        [authJwt.verifyToken],
        controller.findAdressByCode
    );
};
