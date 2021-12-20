const bcrypt = require("bcryptjs");
let User = require('../model/user');

// Récupérer tous les users (GET)
function getUsers(req, res) {
    let aggregateQuery = User.aggregate();
    User.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, users) => {
            if (err) {res.status(500).send(err);}
            res.status(200).send(users);
        }
    );
}

// Récupérer un user par son id (GET)
function getUser(req, res){
    let userId = req.params.id;
    User.findOne({id: userId}, (err, user) =>{
        if(err){res.status(500).send(err)}
        res.status(200).json(user);
    })
}

// Ajout d'un user (POST)
function postUser(req, res){
    let user = new User();
    user.id = req.body.id;
    user.login = req.body.login;
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.role = req.body.role;

    console.log("POST user reçu :");
    console.log(user);

    if(user.login == null || user.password == null || user.role == null || user.id == null) {
        res.status(400).send('cant post user because of null attributs');
    } else {
        user.save( (err) => {
            if(err){res.status(500).send('cant post user ', err);}
            res.status(201).json({ message: `${user.login} saved!`})
        });
    }
}

// Update d'un user (PUT)
function updateUser(req, res) {
    console.log("UPDATE recu user : ");
    console.log(req.body);
    if(req.body.password != null){bcrypt.hashSync(req.body.password, 10);}
    User.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, user) => {
        if(err){res.status(500).send(err)}
        else {
          res.status(201).json({message: 'updated'})
        }
    });
}

// suppression d'un user (DELETE)
function deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err){res.status(500).send(err);}
        res.status(200).json({message: `${user.login} deleted`});
    })
}

// méthode d'authentification
function login(req, res) {
    User.findOne({login: req.body.login}, (err, user) =>{
        if(err){res.status(500).send(err)}
        if(user === null) {
            res.status(404).json({message: 'user not found in database'});
        } else {
            let compare = req.body.password == null ? res.status(400).json({message: 'wrong password'}) : bcrypt.compareSync(req.body.password, user.password);
            if(compare) {
                res.status(200).json(user);
            } else {
                res.status(400).json({message: 'wrong password'});
            }
        }
    });
}

module.exports = { getUsers, getUser, postUser, updateUser, deleteUser, login };
