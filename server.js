var express = require("express");
var lowdb = require("lowdb");
var fileAsync = require("lowdb/lib/file-async");
var shortid = require("shortid");
var bodyParser = require("body-parser");


var app = express();
var db = lowdb("db.json", {storage: fileAsync});
var port = 3000;

app.use(bodyParser.json());	

db.defaults({
	//Any default collections (arrays	)
}).value();


// __dirname is a string that reference the current directory
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/lib"));
// Remove this wehen we start building our Sass.
app.use(express.static(__dirname + "/src/css"));

app.listen(port);