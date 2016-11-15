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
			selectingCharacter: null,
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
				<div className="container">
					<div id="container-left">
						<CharacterSelect 
							id="left"
							image={leftImage}
							selected={this.selectingCharacter === 1 ? true : false}
							/>
					</div>
					<div id="container-right">
						<CharacterSelect 
							id="right"
							image={leftImage}
							selected={this.selectingCharacter === 1 ? true : false}
							/>
					</div>
				</div>
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
		// sets the selectingCharacter state to 1 or 2, to prep for loading 
		// Displays the results component now that search has occured
		this.setState({
			selectingCharacter: which,
			displayResults: true
		})

	},

	// Passed as prop into results --> character
	// sets selectingCharacter to object in store by id (character that was selected)

	onSelect: function (id) {
		var character = characterStore.get(id);
		if (this.state.selectingCharacter === 1) {
			this.setState({
				characterOne: character
			})
		} else if (this.state.selectingCharacter === 2) {
			this.setState({
				characterTwo: character
			})	
		}
	},

	// Makes 'em fight

	fight: function () {
		// if (this.state.characterOne.id === this.state.characterTwo.id) {
		// 	console.log("YOU CAN'T FIGHT THEY'RE THE SAME");
		// 	return;
		// }
		if (this.state.characterOne && this.state.characterTwo) {
			// battlemanager sometimes doesn't have ID's?
			var narrative = battleManager.narrativeBattle({id: this.state.characterOne.id}, {id: this.state.characterTwo.id });
			console.log(narrative);
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