let mongoose = require('mongoose');
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let StudentSchema = Schema({
    id: Number,
    prenom: String,
    nom: String,
    age: Number,
    classe: String,
    devoirRendu: Number,
    devoirTotal: Number,
    note: Number
});

StudentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Student', StudentSchema);
