var express = require("express");

var app = express();

var port = 3000;

// __dirname is a string that reference the current directory
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/lib"));
// Remove this wehen we start building our Sass.
app.use(express.static(__dirname + "/src/css"));

app.listen(port);