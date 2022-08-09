const { authJwt, verifySignUp} = require('../middlewares');
const controller = require("../controllers/dataset.controller");
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
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.DATASET_BASE + BaseUrl.DATASET_CREATE,
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createDataset
    );
    // find all adresse
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.DATASET_BASE + BaseUrl.DATASET_FIND_ALL,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllDataset
    );

    // find adresse info by code country
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.DATASET_BASE + BaseUrl.DATA_FIND_BY_NAME,
        [authJwt.verifyToken],
        controller.findDatasetByName
    );
};
