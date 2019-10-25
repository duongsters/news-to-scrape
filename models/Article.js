var mongoose = require("mongoose");

// Setting Schema constructor to 'Schema'
var Schema = mongoose.Schema;

// Similar to Sequelize model, create a new ArticleSchema object (aka user's chosen Hacker News article) then...
var ArticleSchema = new Schema({
    title: {
        // `title` is required and of type String
        type: String,
        required: true
    },
    link: {
        // `link` is required and of type String
        type: String,
        required: true
    },
    //allow us to populate to the client the Hacker News article with an associated user note
    note: {
        // `note` object that stores a user note id...
        // The ref property links the ObjectId to the Note.js file model
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// This creates the articles from the above schema created using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

//exports 'Article.js' model file
module.exports = Article;