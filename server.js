// -------Dependencies---------
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs  = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

//---Initialize Express----
var app = express();

//connected 'db' variable to 'models' folder
var db = require("./models");

//----------Local host PORT setting----------------
var PORT = 8080;

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


