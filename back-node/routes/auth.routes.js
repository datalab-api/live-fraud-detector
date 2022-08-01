const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');
const BaseUrl = require('../config/endpoint.config');


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'Bearer, Origin, Content-Type, Accept'
    );
    next();
  });
  //method post register 
  app.post(
    BaseUrl.endpoint+BaseUrl.version+BaseUrl.AUTH_BASE+BaseUrl.AUTH_SIGNUP,
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  // method post login
  app.post(
    BaseUrl.endpoint+BaseUrl.version+BaseUrl.AUTH_BASE+BaseUrl.AUTH_SIGNIN,
    controller.basicAuth,
  );
  
};

