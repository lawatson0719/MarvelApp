var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var battleStore = Object.create(EventEmitter.prototype);
EventEmitter.apply(battleStore);

var battleHistory = {
	battles: [],
	characters: []
};

battleStore.add = function (battle) {
	battleHistory.battles.push(battle);
	$.ajax({
		url: "/api/battles/",
		method: "POST",
		data: battle,
		success: function (results) {
			console.log(results);
		}
	})
}

battleStore.get = function () {
	return battleHistory;
}

battleStore.fetch = function () {
	$.ajax({
		url: "/api/battles/",
		success: function (results) {
			battleHistory = results;
			console.log(results);
		}
	})
}

window.battleStore = battleStore;
module.exports = battleStore;