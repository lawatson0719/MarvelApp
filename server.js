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


// Database stores both character data (W/L) and battle history
db.defaults({
	battles: [],
	characters: []
}).value();



app.get("/api/characters", function (req, res) {
	res.json(db.get("characters").value());
})



app.post("/api/battles", function (req, res) {
	
	var fightData = req.body;
	
	if (fightData.winner !== "draw") {

		var battle = {
			draw: false,
			winner: fightData.winner.name,
			loser: fightData.loser.name,
			id: shortid()
		}		

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
			draw: true,
			winner: "none",
			loser: "none",
			id: shortid()
		}
		
	}

	// Push created battlerecord
	db.get("battles").push(battle).value();

	// Send back created character data to battleStore
	var letsReturn = {
		winner: winner,
		loser: loser
	}
	res.json(letsReturn);
})


app.listen(port);