var express = require("express");
var lowdb = require("lowdb");
var fileAsync = require("lowdb/lib/file-async");
var shortid = require("shortid");
var bodyParser = require("body-parser");


var app = express();
var db = lowdb("db.json", {storage: fileAsync});
var port = 3000;

app.use(bodyParser({limit:'50mb'}));	




// __dirname is a string that reference the current directory
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/lib"));
// Remove this wehen we start building our Sass.
app.use(express.static(__dirname + "/src/css"));

db.defaults({
	battles: [],
	characters: []
}).value();


app.get("/api/battles", function (req, res) {
	res.json(db.get("battles").value());
})


app.post("/api/battles", function (req, res) {
	
	var fightData = req.body;
	// Add battle to battle log
	
	if (fightData.winner !== "draw") {

		var battle = {
			winner: fightData.winner.name,
			loser: fightData.loser.name,
			id: shortid()
		}

		db.get("battles").push(battle).value();
		

		// Update characters and their win rates
		var winner = db.get("characters").find({id: fightData.winner.id});
		if (winner.value()) {
			winner.assign({
				wins: winner.value().wins + 1
			}).value();
		} else {
			winner = {
				name: fightData.winner.name,
				id: fightData.winner.id,
				losses: 0,
				wins: 1,
				draws: 0
			}
			db.get("characters").push(winner).value();
		}

		var loser = db.get("characters").find({id: fightData.loser.id});
		if (loser.value()) {
			loser.assign({
				losses: loser.value().losses + 1
			}).value();
		} else {
			loser = {
				name: fightData.loser.name,
				id: fightData.loser.id,
				losses: 1,
				wins: 0,
				draws: 0
			}
			db.get("characters").push(loser).value();
		}
	} else {
		var battle = {
			winner: fightData.winner.name,
			loser: fightData.loser.name,
			id: shortid()
		}

		db.get("battles").push(battle).value();
	}

	var letsReturn = {
		winner: fightData.winner,
		loser: fightData.loser
	}
	res.json(letsReturn);
})




// 	db.get("characters").push(characterOne).value();
// 	db.get("characters").push(characterTwo).value();
// })


app.listen(port);