const { authJwt, verifySignUp} = require('../middlewares');
const BaseUrl = require('../config/endpoint.config');

const controller = require("../controllers/dataset.controller");
const nonfraudeController =require('../controllers/dataset-non-fraud.controller');


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
    // find all dataset
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.DATASET_BASE + BaseUrl.DATASET_FIND_ALL,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllDataset
    );

    // find dataset by name
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.DATASET_BASE + BaseUrl.DATA_FIND_BY_NAME,
        [authJwt.verifyToken],
        controller.findDatasetByName
    );

    // create  dataset non fraud 
    app.post(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.DATASET_BASE + BaseUrl.DATASET_BASE_NON_FRAUD + BaseUrl.DATASET_NON_FRAUD_ADD,
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        nonfraudeController.createDatasetNonFraud
    );

    // find all dataset non fraud 
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.DATASET_BASE + BaseUrl.DATASET_BASE_NON_FRAUD + BaseUrl.DATASET_NON_FRAUD_FIND,
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        nonfraudeController.createDatasetNonFraud
    );
};
