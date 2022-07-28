const config = require("../config/constantes");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


signup = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'ERREUR : le body n\'est pas bien défini, veuillez vérifiez le body' });
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
                        return res.status(200).json({ message: `SUCCES : le compte ${user.username} a été créé avec succès ! ` });
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
                    return res.status(201).json({ message: `SUCCES : le compte ${user.username} a été créé avec succès ! ` });
                });
            });
        }
    });
};


basicAuth = async (req,res,next)=>{
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return res.status(401).json(err);
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    User.findOne({
        username: username
    }).populate("roles", "-__v")
        .exec(function (err, user) {
            if (!user) {
                return res.status(404).json({ message: `ERREUR : le nom d\'utilisateur ou le mot de passe est incorrect` });
            } else {
                if (!bcrypt.compareSync(password, user.password)) {
                    return res.status(404).json({
                        message: `ERREUR : le nom d\'utilisateur ou le mot de passe est incorrect !`
                    });
                }else{
                    
                    var authorities = [];                    
                    user.roles.forEach(role =>  authorities.push("ROLE_" + role.name.toUpperCase()) );
                    var token = jwt.sign({ id: user.id, username:user.username, email: user.email, role: authorities, type: "Bearer" }, config.secret, {
                        // algorithm: 'RS256',
                        expiresIn: config.jwtExpiration,
                    });
                    res.status(200).json({
                        id: user._id,
                        token: token
                    });
                }
            }
        });

};

module.exports = {
    signup,
    basicAuth
}