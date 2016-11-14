var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var characterStore = Object.create(EventEmitter.prototype);
EventEmitter.apply(characterStore);

var apiKey = "dcbc47e11153905633e8b3d927ab2639";
var characters = [];

characterStore.get = function (id) {
	if (id) {
		return characters.find((character) => character.id === id);
	} else {
		return characters;
	}
}

characterStore.fetch = function (search) {
	$.ajax({
		url: "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + search + "&apikey=" + apiKey,
		success: function (response) {
			console.log(response);
			characters = response.data.results;
			characterStore.emit("update");
		}
	})
	return characters; 
}

window.characterStore = characterStore;
module.exports = characterStore;