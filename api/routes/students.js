let Student = require('../model/student');

// Récupérer toutes les personnes (GET)
function getStudents(req, res) {
    let aggregateQuery = Student.aggregate();
    Student.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, students) => {
            if (err) {res.status(500).send(err);}
            res.status(200).send(students);
        }
    );
}

// Récupérer une personne par son id (GET)
function getStudentById(req, res){
    let studentId = req.params.id;
    Student.findOne({id: studentId}, (err, student) =>{
        if(err){res.status(500).send(err)}
        res.status(200).json(student);
    })
}

// Récupérer des personnes selon un paramètre (GET)
function getStudentWithParam(req, res){
    let studentId = req.params.id;
    let studentClasse = req.params.classe;
    if(studentId) {
        Student.find({id: studentId}, (err, student) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(user);
        })
    } else if(studentClasse) {
        Student.find({classe: studentClasse}, (err, studentClasse) =>{
            if(err){res.status(500).send(err)}
            res.status(200).json(studentClasse);
        })
    }
}

module.exports = { getStudentById, getStudents, getStudentWithParam };
