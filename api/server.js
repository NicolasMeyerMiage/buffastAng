let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let user = require('./routes/users');
let auth = require('./routes/auth');
let student = require('./routes/students');
let teacher = require('./routes/teachers');
let classes = require('./routes/classes');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://tpLongAdmin:dadadaxd@clustertplong.gyaud.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log('----- ----------- -----');
    console.log("Afin d'avoir le détail des endpoints disponibles dans l'API");
    console.log("Tapez : npm run doc");
    console.log('----- ----------- -----');
    console.log("Les des chemins disponibles :");
    console.log(" - Login : http://localhost:8010/api/login");
    console.log(" - User : http://localhost:8010/api/users");
    console.log(" - Assignments : http://localhost:8010/api/assignments");
    console.log(" - Students : http://localhost:8010/api/students");
    console.log(" - Teachers : http://localhost:8010/api/teachers");
    console.log(" - Classes : http://localhost:8010/api/classes");
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

/*
 * ENDPOINTS - Assignment
 * Methods : GET - POST - PUT - DELETE
 * Requierment : AssignementSchema
 */
app.route(prefix + '/assignments').get(assignment.getAssignments);
app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);
app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);
app.route(prefix + '/assignments/id/last').get(assignment.getLastAssignment);

/*
 * ENDPOINTS - User
 * Methods : GET - POST - PUT - DELETE
 * Requierment : UserSchema
 */
app.route(prefix + '/users').get(user.getUsers);
app.route(prefix + '/users/:id')
    .get(user.getUser)
    .delete(user.deleteUser);
app.route(prefix + '/users')
    .post(user.postUser)
    .put(user.updateUser);

/*
 * ENDPOINTS - Auth
 * Methods : GET - POST
 * Requierment : UserSchema
 */
app.route(prefix + '/status').get(auth.status);
app.route(prefix + '/login').post(auth.login);

/*
 * ENDPOINTS - Classe
 * Methods : GET
 * Requierment : ClasseSchema
 */
app.route(prefix + '/classes').get(classes.getClasses);
app.route(prefix + '/classes/:id').get(classes.getClasseById);
app.route(prefix + '/classes/id/params').get(classes.getClasseWithParam);

/*
 * ENDPOINTS - Student
 * Methods : GET - POST
 * Requierment : StudentSchema
 */
app.route(prefix + '/students').get(student.getStudents);
app.route(prefix + '/students/:id').get(student.getStudentById);
app.route(prefix + '/students/id/params').get(student.getStudentWithParam);

/*
 * ENDPOINTS - Teacher
 * Methods : GET - POST
 * Requierment : TeacherSchema
 */
app.route(prefix + '/teachers').get(teacher.getTeachers);
app.route(prefix + '/teachers/:id').get(teacher.getTeacherById);
app.route(prefix + '/teachers/ue/:ue').get(teacher.getTeacherWithParam);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


