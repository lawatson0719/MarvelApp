var React = require("react");

var Character = require("./Character.jsx");
var characterStore = require("../stores/characterStore");

var Results = React.createClass({
	
	getInitialState: function () {
		return {
			searchResults: characterStore.get()
		}
	},

	componentWillMount: function () {
		var _this = this;
		characterStore.on("update", function () {
			_this.setState({
				searchResults: characterStore.get()
			})
		})
	},

	render: function () {
		var characters = this.state.searchResults.map(function (character) {
			return ( 
				<Character
				name={character.name}
				key={character.id}/>
				);
		})


		return (
			<div>
				{characters}
			</div>
		);
	}
});

module.exports = Results;