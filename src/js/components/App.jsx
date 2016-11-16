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
			// State that tells app which character to load upon selection, set to 1 or 2 on search execution
			selectingCharacter: null,

			// State that tells app whether to display the results component, set to true on search execution
			displayResults: false,

			// Character object loaded left
			characterOne: null,

			// Character object loaded right
			characterTwo: null,

			// Battledata object loaded on battle completion
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

		// Load results if search has been performed

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

		// Renders everything

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
							image={rightImage}
							selected={this.selectingCharacter === 1 ? true : false}
							/>
					</div>
				</div>
				<section className="search-bar">
					<div className="search-left">
						<Search character={1} onSearch={this.displayResults} />
					</div>
					<div className="results"></div>
					<button className="fight-button" onClick={this.fight}>{fightText}</button>
					<div className="results"></div>
					<div className="search-right">
						<Search className="search-right" character={2} onSearch={this.displayResults} />
					</div>
				</section>
				{results}
				<Battle narrative={this.state.narrative}/>
			</div>
		);
	},

	// displayResults method is passed into Search as callback and executed when search is performed
	displayResults: function (which) {
		this.setState({

			// Sets the selectingCharacter state to 1 or 2, to prep for loading 
			selectingCharacter: which,

			// Displays the results component now that search has occured
			displayResults: true
		})

	},

	// onSelect method is passed as prop into results --> character
	// sets characterOne / characterTwo to object in store by id (character that was selected)

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
		if (this.state.characterOne.id === this.state.characterTwo.id) {
			console.log("YOU CAN'T FIGHT THEY'RE THE SAME");
			return;
		}
		if (this.state.characterOne && this.state.characterTwo) {
			// battlemanager sometimes doesn't have ID's?
			var narrative = battleManager.narrativeBattle({id: this.state.characterOne.id}, {id: this.state.characterTwo.id });
			this.setState({
				narrative: narrative,
				displayResults: false,
				selectingCharacter: null
			})
			// Add battle log to battleStore
			battleStore.add(narrative);
		}
	}

});

module.exports = App;