var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var battleStore = Object.create(EventEmitter.prototype);
EventEmitter.apply(battleStore);

var battledCharacters = [];


battleStore.get = function () {
	return battledCharacters;
}

battleStore.add = function (battle) {
	$.ajax({
		url: "/api/battles/",
		method: "POST",
		data: battle,
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


battleStore.fetch = function () {
	$.ajax({
		url: "/api/battles/",
		success: function (results) {
			battledCharacters = results;
		}
	})
}

window.battleStore = battleStore;
module.exports = battleStore;