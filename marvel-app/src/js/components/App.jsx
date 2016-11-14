var React = require("react");


var CharacterSelect = require("./CharacterSelect.jsx");
var Search = require("./Search.jsx");
var Battle = require("./Battle.jsx");
var Results = require("./Results.jsx");
var characterStore = require("../stores/characterStore.js");



var App = React.createClass({


	getInitialState: function () {
		return {
			selectedCharacter: null,
			displayResults: false,
			characterOne: null,
			characterTwo: null
		}
	},


	render: function () {
		var results;
		if (this.state.displayResults) {
			results = <Results 
						onChoose={this.onSelect} />;
		}
		return (
			<main>
				<CharacterSelect 
					onClick={this.selectLeft} 
					selected={this.selectedCharacter === 1 ? true : false}
					/>
				<CharacterSelect 
					onClick={this.selectRight} 
					selected={this.selectedCharacter === 2 ? true : false}
					/>
				<Search character={1} onSearch={this.displayResults} />
				<div className="results"></div>
				<button className="fight-button"></button>
				<div className="results"></div>
				<Search character={2} onSearch={this.displayResults} />
				{results}
				<Battle />
			</main>
		);
	},

	selectLeft: function () {
		this.setState({
			selectedCharacter: 1
		})
	},

	selectRight: function () {
		this.setState({
			selectedCharacter: 2
		})
	},

	displayResults: function (which) {
		this.setState({
			selectedCharacter: which
		})
		this.setState({
			displayResults: true
		})
	},

	onSelect: function (id) {
		var character = characterStore.get(id);
		console.log(character);
		if (this.state.selectedCharacter === 1) {
			console.log("yo");
			this.setState({
				characterOne: character
			})
		} else if (this.state.selectedCharacter === 2) {
			this.setState({
				characterTwo: character
			})	
		}
		console.log(this.state);
	}

});

module.exports = App;