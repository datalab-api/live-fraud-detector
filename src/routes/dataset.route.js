const { authJwt, verifySignUp } = require('../middlewares');
const BaseUrl = require('../config/endpoint.config');
const controller = require("../controllers/dataset.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Bearer, Origin, Content-Type, Accept'
        );
        next();
    });

    // find all dataset
    app.get(
        BaseUrl.endpoint + BaseUrl.version + BaseUrl.DATASET_BASE,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllDataset
    );


    // create  dataset non fraud 
    app.post(
        BaseUrl.endpoint + BaseUrl.version + BaseUrl.DATASET_BASE + BaseUrl.DATASET_BASE_NON_FRAUD + BaseUrl.DATASET_NON_FRAUD_ADD,
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createDatasetNonFraud
    );

    // create  dataset  fraud 
    app.post(
        BaseUrl.endpoint + BaseUrl.version + BaseUrl.DATASET_BASE + BaseUrl.DATASET_BASE_FRAUD + BaseUrl.DATASET_FRAUD_ADD,
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createDatasetFraud
    );

    // create  dataset  fraud2
    app.post(
        BaseUrl.endpoint + BaseUrl.version + BaseUrl.DATASET_BASE + BaseUrl.DATASET_BASE_FRAUD2 + BaseUrl.DATASET_FRAUD2_ADD,
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createDatasetFraud2
    );


};
