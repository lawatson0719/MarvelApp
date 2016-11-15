var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var battleStore = Object.create(EventEmitter.prototype);
EventEmitter.apply(battleStore);


// Stores characters and their win/losses locally
var battledCharacters = [];

// Basic access method
battleStore.get = function () {
	return battledCharacters;
}


// .add is executed when battle occurs with battle results. Hands those results off to server to update database 
// and then updates locally on success.
battleStore.add = function (battle) {
	$.ajax({
		url: "/api/battles/",
		method: "POST",
		data: {
			winner: {
				id: battle.winner.id,
				name: battle.winner.name
			},
			loser: {
				id: battle.loser.id,
				name: battle.loser.name
			}
		},
		success: function (results) {
			console.log(results);
			var winner;
			var loser;
			winner = battledCharacters.find((character) => results.winner.id === character.id);
			loser = battledCharacters.find((character) => results.loser.id === character.id);
			if (winner) {
				winner.wins++;
			} else {
				battledCharacters.push(results.winner);
			}
			if (loser) {
				loser.losses++;
			} else {
				battledCharacters.push(results.loser);
			}
		}
	})
}

// Requests character win/loss data from server
battleStore.fetchCharacters = function () {
	$.ajax({
		url: "/api/characters/",
		success: function (results) {
			battledCharacters = results;
		}
	})
	return battledCharacters;
}

window.battleStore = battleStore;
module.exports = battleStore;