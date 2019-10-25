// -------Dependencies---------
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

//---Initialize Express----
var app = express();

//connected 'db' variable to 'models' folder
var db = require("./models");

//----------Local host PORT setting----------------
var PORT = process.env.PORT || 8080;

//----------Registering Express Handlebars view engine --------
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//----------Middleware Configuration-----------
// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// targeting the 'views' folder to be static
app.use(express.static("views"));



//---------Connection to MongoDB---------------
mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true });



//--------------Routes------------------------
// When at the root route, this function will run 
app.get("/", function (req, res) {
    //to render the 'index.handlebars' template on to the homepage
    res.render("index");
});
// Route for scraping all Hacker News articles into application
app.get("/scrape", function (req, res) {
    //Using axios, grab the the body of hacker news' body of articles
    axios.get("https://news.ycombinator.com/").then(function (response) {
        // Loads that Hacker News' articles & links through cheerio then saves it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Searches and grabs every class named 'title' within an table data tag then...
        $("td.title").each(function (i, element) {
            // console.log('\nnewElement');
            // console.log(element);

            //places empty result object into 'result' variable 
            var result = {};

            // Add the News Hacker article title and save it's as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            //finds the article url link by search for each a tag with href attributes to be saved in the result object
            result.link = $(this)
                .children("a")
                .attr("href");


            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added 'result' in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
        //Sends a message to the user when the function is successfully ran to scrape Hacker News' articles
        res.send("Hacker News's articles Scrape Complete");
    });
});

//Route in scraping all Hacker News articles from the mongo DB
app.get("/articles", function (req, res) {
    //Finds and grabs every values from the 'Article' table
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // notifies client and error occured in grabbing the Hacker News articles
            res.json(err);
        });
});

// Route for grabbing a specific Hacker News article by id of the user
app.get("/articles/:id", function (req, res) {
    // Using the user's 'id' passed in the id parameter,
    // prepare a query that finds the matching ids ones within the mongo db
    db.Article.findOne({ _id: req.params.id })
        //populate it with it's note
        .populate("note")
        .then(function (dbArticle) {
            //sends back the user's article back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // notification of error
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)

        .then(function (dbNote) {
            //if note was successfully created...
            return db.Article.findOneAndUpdate(
                //finds chosen Hacker News article '_id' equal to `req.params.id`. by the user then
                { _id: req.params.id },
                //updates specfic Hacker News article noted by the user to the mongo db
                { note: dbNote._id },
                //tells the query to return the updated User the original
                { new: true });
        })

        .then(function (dbArticle) {
            // sends back to the client the updated Hacker News article with notes by the user
            res.json(dbArticle);
        })
        .catch(function (err) {
            //messages user if an error occured
            res.json(err);
        });
});


//---------Listening PORT---------------
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
