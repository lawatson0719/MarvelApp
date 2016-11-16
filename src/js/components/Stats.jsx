var React = require("react");

var battleStore = require("../stores/battleStore");

var Stats = React.createClass({

	getInitialState: function () {
		return {
			character: battleStore.get(this.props.character)
		}
	},

	componentWillMount: function () {
		var _this = this;
		battleStore.on("update", function () {
			_this.setState({
				character: battleStore.get(_this.props.character)
			})
		})
	},

	render: function () {
		var wins;
		var losses;
		if (this.state.character) {
			wins = this.state.character.wins;
			losses = this.state.character.losses;
		} else {
			wins = 0;
			losses = 0;
		}

		return (
			<div>
				<span>W : {wins}</span>
				<span>L : {losses}</span>
			</div>
		);
	},


});

module.exports = Stats;