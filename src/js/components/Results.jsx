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
			<section className="result-container cf">
				<h2 className="result-name">Choose your combatant</h2>
				<section className="list-container">
					<div className ="list cf">
						<ul>
							{characters}
						</ul>
					</div>
				</section>
			</section>
		);
	}
});

module.exports = Results;