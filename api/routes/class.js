let Class = require('../model/class');

// Récupérer toutes les personnes (GET)
function getClasses(req, res) {
    let aggregateQuery = Class.aggregate();
    Class.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, classes) => {
            if (err) {res.status(500).send(err);}
            res.status(200).send(classes);
        }
    );
}

// Récupérer une personne par son id (GET)
function getClasseById(req, res){
    let classeId = req.params.id;
    Class.findOne({id: classeId}, (err, classe) =>{
        if(err){res.status(500).send(err)}
        res.status(200).json(classe);
    })
}

// Récupérer des personnes selon un paramètre (GET)
function getClasseWithParam(req, res){
    let classId = req.params.id;
    let classNom = req.params.nom;
    let classYears = req.params.years;
    if(classId) {
        Class.find({id: classId}, (err, classe) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(classe);
        })
    } else if(classNom) {
        Class.find({promo: classNom}, (err, classe) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(classe);
        })
    } else if(classYears) {
        Class.find({promo: classYears}, (err, classe) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(classe);
        })
    }
}

module.exports = { getClasses, getClasseById, getClasseWithParam };
