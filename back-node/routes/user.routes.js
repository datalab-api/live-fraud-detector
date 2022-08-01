const { authJwt, verifySignUp} = require('../middlewares');
const controller = require("../controllers/user.controller");
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
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.USER_BASE + BaseUrl.USER_CREATE,
        [
            verifySignUp.checkDuplicateUsername,
            verifySignUp.checkRolesExisted,
            authJwt.verifyToken
        ],
        controller.createUser
    );
    // find all user
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.USER_BASE + BaseUrl.USER_FIND_ALL,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllUser
    );

    // find user info by Id
    app.get(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.USER_BASE + BaseUrl.USER_FIND,
        [authJwt.verifyToken],
        controller.findUserById
    );
    // update user by id 
    app.put(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.USER_BASE + BaseUrl.USER_UPDATE,
        [authJwt.verifyToken],
        controller.updateUser
    );
    // delete user by id 
    app.delete(
        BaseUrl.endpoint+BaseUrl.version+ BaseUrl.USER_BASE + BaseUrl.USER_DELETE,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteUser
    );
};


