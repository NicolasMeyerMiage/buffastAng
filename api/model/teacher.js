let mongoose = require('mongoose');
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let TeacherSchema = Schema({
    id: Number,
    nom: String,
    ue: String,
    pic: String
});

TeacherSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Teacher', TeacherSchema);
