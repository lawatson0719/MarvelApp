var express = require("express");
var lowdb = require("lowdb");
var fileAsync = require("lowdb/lib/file-async");
var shortid = require("shortid");
var bodyParser = require("body-parser");


var app = express();
var db = lowdb("db.json", {storage: fileAsync});
var port = 3000;

app.use(bodyParser());	




// __dirname is a string that reference the current directory
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/lib"));
// Remove this wehen we start building our Sass.
app.use(express.static(__dirname + "/src/css"));

db.defaults({
	battles: {
		history: [],
		count: 0
	},
	characters: []
}).value();

app.get("/api/battles", function (req, res) {
	res.json(db);
})


app.post("/api/battles", function (req, res) {
	
	// Add battle to battle log
	var fightData = req.body;

	var battle = {
		winner: fightData.winner.name,
		loser: fightData.loser.name,
		id: shortid()
	}
	db.get("battles")push(battle).value();

	// Update characters and their win rates


    // if (animal.value()) {
    //     animal.assign({
    //         name: name,
    //         species: species
    //     }).value();
    //     res.json(animal); // status code automatically set to 200
    //     return;
    // }
	var winner = db.get("characters").find({id: fightData.winner.id});
	if (winner.value()) {
		winner.assign({
			wins: winner.value().wins + 1
		}).value();
	} else {
		winner = fightData.winner;
		winner.wins = 1;
		winner.losses = 0;
		db.get("characters").push(winner).value();
	}

	var loser = db.get("characters").find({id: fightData.loser.id});
	if (loser.value()) {
		loser.assign({
			losses: loser.value().losses + 1
		}).value();
	} else {
		loser = fightData.loser;
		loser.losses = 1;
		loser.wins = 0;
		db.get("characters").push(loser).value();
	}

	res.json(battle);
})




// 	db.get("characters").push(characterOne).value();
// 	db.get("characters").push(characterTwo).value();
// })


app.listen(port);