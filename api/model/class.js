let mongoose = require('mongoose');
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let ClassSchema = Schema({
    id: Number,
    nom: String,
    years: Number,
    option: String
});

ClassSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Class', ClassSchema);
