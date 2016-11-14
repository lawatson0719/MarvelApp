var React = require("react");

var Character = require("./Character.jsx");
var characterStore = require("../stores/characterStore");

var Results = React.createClass({
		
		// results = <Results 
		// 		onSelect={this.onSelect}/>;
	
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
		var _this = this;
		var characters = this.state.searchResults.map(function (character) {
			return ( 
				<Character
				name={character.name}
				key={character.id}
				id={character.id}
				onChoose={_this.props.onChoose}
				thumb={character.thumbnail.path + "." + character.thumbnail.extension} />
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