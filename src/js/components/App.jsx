var React = require("react");


var CharacterSelect = require("./CharacterSelect.jsx");
var Search = require("./Search.jsx");
var Battle = require("./Battle.jsx");
var Results = require("./Results.jsx");
var characterStore = require("../stores/characterStore.js");
var battleStore = require("../stores/battleStore.js");
var battleManager = require("battlemanager");


var App = React.createClass({


	getInitialState: function () {
		return {
			selectedCharacter: null,
			displayResults: false,
			characterOne: null,
			characterTwo: null,
			narrative: null
		}
	},


	render: function () {
		// Load characters if available

		var leftImage;
		var rightImage;

		if (this.state.characterOne) {
			leftImage = this.state.characterOne.thumbnail.path + "." + this.state.characterOne.thumbnail.extension;
		} else {
			leftImage = "";
		}

		if (this.state.characterTwo) {
			rightImage = this.state.characterTwo.thumbnail.path + "." + this.state.characterTwo.thumbnail.extension;
		} else {
			rightImage = "";
		}


		// load results if search has been performed

		var results;
		if (this.state.displayResults) {
			results = <Results 
						onChoose={this.onSelect} />;
		}


		// Set state of fight button

		var fightText = "Choose Your Combatants";
		if (this.state.characterOne && this.state.characterTwo) {
			fightText = "Fight";
		}



		return (
			<div>
				<CharacterSelect 
					image={leftImage}
					selected={this.selectedCharacter === 1 ? true : false}
					/>
				<CharacterSelect 
					image={rightImage}
					selected={this.selectedCharacter === 2 ? true : false}
					/>
				<Search character={1} onSearch={this.displayResults} />
				<div className="results"></div>
				<button className="fight-button" onClick={this.fight}>{fightText}</button>
				<div className="results"></div>
				<Search character={2} onSearch={this.displayResults} />
				{results}

				<Battle narrative={this.state.narrative}/>
			</div>
		);
	},

	// Passed as prop into both searches and executed when search occurs

	displayResults: function (which) {
		// sets the selectedCharacter state to 1 or 2, to prep for loading 
		this.setState({
			selectedCharacter: which
		})

		// Displays the results component now that search has occured
		this.setState({
			displayResults: true
		})
	},

	// Passed as prop into results --> character
	// sets selectedCharacter to object in store by id (character that was selected)

	onSelect: function (id) {
		var character = characterStore.get(id);
		if (this.state.selectedCharacter === 1) {
			this.setState({
				characterOne: character
			})
		} else if (this.state.selectedCharacter === 2) {
			this.setState({
				characterTwo: character
			})	
		}
	},

	// Makes 'em fight

	fight: function () {
		if (this.state.characterOne && this.state.characterTwo) {
			// battlemanager sometimes doesn't have ID's?
			var narrative = battleManager.narrativeBattle({id: this.state.characterOne.id}, {id: this.state.characterTwo.id });
			this.setState({
				narrative: narrative,
				displayResults: false
			})
			// Add battle log to battleStore
			battleStore.add(narrative);
		}
	}

});

module.exports = App;