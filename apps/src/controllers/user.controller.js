const config = require("../config/constantes");
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;

// logger info 
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";


exports.createUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Body not found' });
    }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        return res.status(500).json({ message: err });
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            return res.status(500).json({ message: err });
                        }
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    return res.status(500).json({ message: err });
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        return res.status(500).json({ message: err });
                    }
                });
            });
        }
        return res.status(201).json({ message: `Create success user` });
    });


};


exports.findAllUser = async (req, res) => {
    User.find(

    ).populate("roles", "-__v")
        .sort({ username: 1 })
        .exec((err, users) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!users) {
                return res.status(404).json({ message: `No user account exists` });
            }

            var authorities = [];

            users.forEach(user => user.roles[0].name = "ROLE_" + user.roles[0].name.toUpperCase());
            //users.forEach(user =>  authorities.push("ROLE_" + user.roles[0].name.toUpperCase()) );
            //Object.assign(users.roles, authorities);
           
            res.status(200).json(users);
        });
};


exports.findUserById = async (req, res) => {
    User.findById(
        req.params.id
    ).populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!user) {
                return res.status(404).json({ message: ` User account does not exist ` });
            }

            var authorities = [];
            user.roles.forEach(role =>  authorities.push("ROLE_" + role.name.toUpperCase()) );
            Object.assign(user.roles, authorities);
            res.status(200).json(user);
        });
};

exports.updateUser = async (req, res) => {
    User.findById(
        req.params.id
    ).populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            if (!user) {
                return res.status(404).json({ message: ` User account does not exist` });
            }
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            if (req.body.roles) {
                Role.find(
                    {
                        name: { $in: req.body.roles }
                    },
                    (err, roles) => {
                        if (err) {
                            return res.status(500).json({ message: err });
                        }

                        user.roles = roles.map(role => role._id);
                    });
            }
            user.save(err => {
                if (err) {
                    return res.status(500).json({ message: err });
                }
                res.status(200).json({
                    message: `User account  successfully modified`
                });
            });
        });
};

exports.deleteUser = async (req, res) => {
    User.findById(
        req.params.id
    ).populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (!user) {
                return res.status(404).json({ message: "User Not found." });
            }
            username = user.username;
            user.remove(err => {
                if (err) {
                    return res.status(500).json({ message: err });
                }
                res.status(200).json({ message: `User account ${req.body.username} has been successfully deleted` });
            });
        });
};


