//use of mongoose
var mongoose = require("mongoose");

// Setting Schema constructor to 'Schema'
var Schema = mongoose.Schema;

// Similar toa Sequelize model, create a new NoteSchema object then...
var NoteSchema = new Schema({
    //gives the new NoteSchema the string value types of the title
    title: String,
    //gives the new NoteSchema the string value types of the body
    body: String
});


//creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

//exports 'Note.js' model file
module.exports = Note;