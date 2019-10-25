// -------Dependencies---------
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs  = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var db = require("./models");

//----------Local host PORT setting
var PORT = 8080;

//----------Registering Express Handlebars view engine 
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//----------Middleware Configuration
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

