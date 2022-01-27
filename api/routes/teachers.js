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
    let teacherId = req.params._id;
    Teacher.findById({_id: teacherId}, (err, teacher) =>{
        if(err){res.status(500).send(err)}
        res.status(200).json(teacher);
    })
}

// Récupérer des personnes selon un paramètre (GET)
function getTeacherWithParam(req, res){
    let teacherUe = req.params.ue === undefined ? null : req.params.ue;
    if(teacherUe) {
        Teacher.findOne({ue: teacherUe}, (err, teacher) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(teacher);
        })
    }
}

module.exports = { getTeachers, getTeacherById, getTeacherWithParam };
