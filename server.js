// -------Dependencies---------
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs  = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var db = require("./models");

var PORT = 8080;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

