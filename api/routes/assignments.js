let Assignment = require('../model/assignment');
const Teacher = require('../model/teacher');
const Student = require('../model/student');

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    let aggregateQuery = Assignment.aggregate();
    let done = req.query.rendu === 'false' ? false : req.query.rendu === 'true' ? true : undefined;
    let matching = done !== undefined ?
        (req.query.ue ? aggregateQuery.match({rendu: done, ue: req.query.ue}) : aggregateQuery.match({rendu: done}))
        : req.query.ue ? aggregateQuery.match({ue: req.query.ue}) : aggregateQuery;
    Assignment.aggregatePaginate(matching,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        async (err, assignments) => {
            if (err) {
                res.send(err);
            }
            let results = [];
                for (const assignment of assignments.docs) {
                    let result = [];
                    await Assignment.findOne({id: assignment.id}, (err, assignment) => {
                        result.push(assignment);
                    });
                    await Teacher.findOne({ue: assignment.ue}, (err, teacher) => {
                        result.push(teacher);
                    });
                    await Student.findOne({id: assignment.etudiant}, (err, student) => {
                        result.push(student);
                    });
                    results.push(result);
                }
            assignments.docs = results;
            res.send(assignments);
        }
    );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).json(assignment);
    })
}

function getLastAssignment(req, res) {
    Assignment.findOne().sort({ _id: -1 }).exec(function(err, assignment) {
        if(err) {
            res.status(500).send(err);
        }
        res.status(200).json(assignment.id);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.ue = req.body.ue;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save((err) => {
        if (err) {
            res.status(500).send('cant post assignment ', err);
        }
        res.status(201).json({message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.status(201).json({message: 'updated'})
        }
    });
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json({message: `${assignment.nom} deleted`});
    })
}

module.exports = {getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getLastAssignment};