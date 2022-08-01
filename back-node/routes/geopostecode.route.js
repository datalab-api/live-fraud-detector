const { authJwt, verifySignUp} = require('../middlewares');
const controller = require("../controllers/geopostcode.controller");
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
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.ADRESSE_BASE + BaseUrl.ADRESSE_CREATE,
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createGeoPostCode
    );
    // find all adresse
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.ADRESSE_BASE + BaseUrl.ADRESSE_FIND_ALL,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllGeoPostCode
    );

    // find adresse info by zip
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.ADRESSE_BASE + BaseUrl.ADRESSE_FIND_BY_ZIP,
        [authJwt.verifyToken],
        controller.findGeoPostCodeByZip
    );
};
