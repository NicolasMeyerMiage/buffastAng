const bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken');
let config = require('../config')
let User = require('../model/user');
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// méthode d'authentification
function login(req, res) {
    User.findOne({login: req.body.login}, (err, user) =>{
        if(err){res.status(500).send(err)}
        if(user === null) {
            res.status(404).json({message: 'user not found in database'});
        } else {
            let compare = req.body.password == null ? res.status(400).json({message: 'wrong password'}) : bcrypt.compareSync(req.body.password, user.password);
            if(compare) {
                let token = jwt.sign({id: user._id}, config.secret, {
                    expiresIn: 600 // expiration 10 minutes
                })
                res.status(200).json({user: user, token: token});
            } else {
                res.status(400).json({message: 'wrong password'});
            }
        }
    });
}

// méthode test du token
function status(req, res) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({auth: false, message: 'Token inexistant.'});
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) return res.status(500).send({auth: false, message: 'Problème interne'});
        res.status(200).send(decoded);
    })
}

module.exports = { login, status };
