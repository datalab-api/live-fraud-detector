const db = require("../models");
const ROLES = db.role;
const User = db.user;

/**
 * function verfi
 */
checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (user) {
      return res.status(404).json({ message: `user « ${req.body.username} » not found` });
    }
    next();
  });
};
checkBodyExist = (req,res,next) =>{
    if(!req.body){
        return res.status(401).json({ message: 'Body not found' });
    }
    next();
}
checkUsernameExist = (req,res,next) =>{
    if(req.body.username){
        if(!User.findOne({username: req.body.username})){
            return res.status(404).json({
                message: `username « ${req.body.username} » not found`
            });
        }
    }
    next();
}
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(404).json({
          message: `role « ${req.body.roles[i]} » not found`
        });
        
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkRolesExisted,
  checkUsernameExist,
  checkBodyExist
};

module.exports = verifySignUp;