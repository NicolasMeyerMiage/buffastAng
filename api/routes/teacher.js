let Teacher = require('../model/teacher');

// Récupérer toutes les personnes (GET)
function getTeachers(req, res) {
    let aggregateQuery = Teacher.aggregate();
    Teacher.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, teachers) => {
            if (err) {res.status(500).send(err);}
            res.status(200).send(teachers);
        }
    );
}

// Récupérer une personne par son id (GET)
function getTeacherById(req, res){
    let teacherId = req.params.id;
    Teacher.findOne({id: teacherId}, (err, teacher) =>{
        if(err){res.status(500).send(err)}
        res.status(200).json(teacher);
    })
}

// Récupérer des personnes selon un paramètre (GET)
function getTeacherWithParam(req, res){
    let teacherId = req.params.id;
    let teacherNom = req.params.nom;
    let teacherUe = req.params.ue;
    if(teacherId) {
        Teacher.find({id: teacherId}, (err, teacher) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(teacher);
        })
    } else if(teacherNom) {
        Teacher.find({promo: teacherNom}, (err, teacher) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(teacher);
        })
    } else if(teacherUe) {
        Teacher.find({promo: teacherUe}, (err, teacher) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(teacher);
        })
    }
}

module.exports = { getTeachers, getTeacherById, getTeacherWithParam };
