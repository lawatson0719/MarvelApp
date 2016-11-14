var React = require("react");


var CharacterSelect = require("./CharacterSelect.jsx");
var Search = require("./Search.jsx");
var Battle = require("./Battle.jsx");
var characterStore = require("../stores/characterStore.js");



var App = React.createClass({


	getInitialState: function () {
		return {
			selectedCharacter: null,
			displayResults: false
		}
	},


	render: function () {
		var results;
		if (this.state.displayResults) {
			results = <Results />;
		}
		return (
			<div>
				<header>
				</header>
				<main>
					<CharacterSelect 
						onClick={this.selectLeft} 
						selected={this.selectedCharacter === 1 ? true : false}
						/>
					<CharacterSelect 
						onClick={this.selectRight} 
						selected={this.selectedCharacter === 2 ? true : false}
						/>
					<Search side="left" />
					<Search side="right" />
					{results}
					<Battle />
				</main>
			</div>
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
	}

});

module.exports = App;