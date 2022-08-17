const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { TokenExpiredError } = jwt;
const config = require("../config/constantes");
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

const db = require("../models");
const User = db.user;
const Role = db.role;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).json({ message: `Unauthorized: Access token expired!` });
    }
}
verifyToken = (req, res, next) => {

    try {
        if( req.headers["authorization"].split(' ')[1]){
            var token = req.headers["authorization"].split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: `Access impossible: No token provided ` });
            }
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: err });
                }
                req.userId = decoded.id;
                next();
            });
        }else {
            return res.status(404).json({ message: ` token not found ` });
        }
       
    } catch (error) {
        return res.status(404).json(error)
    }    
    
};
verifyAuth = (req, res, next) => {
    if (req.headers["Bearer"]) {
        let token = req.headers["Bearer"];

        if (!token) {
            return res.status(403).json(`Access impossible: No token provided `);
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json(err);
            }
            req.userId = decoded.id;
            next();
        });
    } else if (req.query.username && req.query.password) {
        if (req.query.grant_type && req.query.grant_type === 'ccbih') {
            User.findOne({
                username: req.query.username
            }).populate("roles", "-__v")
                .exec(function (err, user) {
                    if (!user) {
                        return res.status(404).json(`User Name or Password is incorrect`);
                    } else {
                        if (!bcrypt.compareSync(req.query.password, user.password)) {
                            return res.status(404).json(`Password is incorrect `);
                        } else {
                            req.userId = user._id;
                            next();
                        }
                    }
                });
        } else {
            return res.status(404).json(`Authorization right is incorrect!`);
        }

    } else {
        return res.status(404).json(`The login information is incorrect!`);
    }
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).json({ message: err });
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    return res.status(500).json({ message: err });
                }
               
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        return next();
                    }
                }

                return res.status(403).json({ message: `ERROR: sorry, you don't have admin rights` });

            }
        );
    });
};


const authJwt = {
    verifyToken,
    isAdmin,
    verifyAuth
};
module.exports = authJwt;