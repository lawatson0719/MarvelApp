var React = require("react");

var CharacterSelect = require("./CharacterSelect.jsx");
var Search = require("./Search.jsx");
var Battle = require("./Battle.jsx");
var Results = require("./Results.jsx");
var Stats = require("./Stats.jsx");

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

			locked: false,
			// Battledata object loaded on battle completion
			narrative: null
		}
	},


	render: function () {
		// Load characters if available
		var leftImage;
		var leftStats;
		var rightImage;
		var rightStats;

		if (this.state.characterOne) {
			leftImage = this.state.characterOne.thumbnail.path + "." + this.state.characterOne.thumbnail.extension;
			leftStats = <Stats character={this.state.characterOne.id} />
		} else {
			leftImage = "";
		}

		if (this.state.characterTwo) {
			rightImage = this.state.characterTwo.thumbnail.path + "." + this.state.characterTwo.thumbnail.extension;
			rightStats = <Stats character={this.state.characterTwo.id} />
		} else {
			rightImage = "";
		}

		// Load results if search has been performed

		var results;
		if (this.state.displayResults) {
			results = <Results 
						onChoose={this.onSelect} />;
		} else {
			results = <div></div>
		}

		// Set state of fight and confirm buttons
		var fightButton;
		var confirmButton;

		if (this.state.characterOne && this.state.characterTwo) {
			confirmButton = <button className="fight-button" onClick={this.confirm}>"Confirm?"</button>
		}

		if (this.state.locked) {
			fightButton = <button className="fight-button" onClick={this.fight}>Fight!</button>
		}

		// Generate Search components 
		var leftSearch;
		var rightSearch;
		if (!this.state.locked) {
			leftSearch = <Search character={1} onSearch={this.displayResults} />;
			rightSearch = <Search className="search-right" character={2} onSearch={this.displayResults} />;
		}



		// Generate key for battle component
		var battle;
		if (this.state.narrative) {
			var battleKey = String(this.state.characterOne.id) + String(this.state.characterTwo.id);
			battle = <Battle narrative={this.state.narrative} key={battleKey} keyProp={battleKey}/>;
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
					<div className="left-stats">{leftStats}</div>
					<div className="right-stats">{rightStats}</div>
				</div>
				<section className="search-bar">
					<div className="search-left">
						{leftSearch}
					</div>
					<div className="results"></div>
					{confirmButton}
					{fightButton}
					<div className="results"></div>
					<div className="search-right">
						{rightSearch}
					</div>
				</section>
				<div className="page-break"></div>
				{results}
				{battle}
			</div>
		);
	},

	// displayResults method is passed into Search as callback and executed when search is performed
	displayResults: function (which) {
		this.setState({

			// Sets the selectingCharacter state to 1 or 2, to prep for loading 
			selectingCharacter: which,

			// Displays the results component now that search has occured
			displayResults: true,

			// Remove current battle if in progress
			narrative: null
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


	confirm: function () {
		this.setState({
			locked: true
		})
	},


	fight: function () {
		if (this.state.characterOne.id === this.state.characterTwo.id) {
			console.log("YOU CAN'T FIGHT THEY'RE THE SAME");
			return;
		}
		if (this.state.characterOne && this.state.characterTwo && !this.state.narrative) {
			// battlemanager sometimes doesn't have ID's?
			var narrative = battleManager.narrativeBattle({id: this.state.characterOne.id}, {id: this.state.characterTwo.id });
			this.setState({
				narrative: narrative,
				displayResults: false,
				selectingCharacter: null,
				locked: false
			})
			// Add battle log to battleStore
			battleStore.add(narrative);
		}
	}

});

module.exports = App;