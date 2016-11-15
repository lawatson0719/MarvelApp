var React = require("react");

var BattleMessage = require("./BattleMessage.jsx");
var Battle = React.createClass({
	
	// <Battle narrative={this.state.narrative}/>
	getInitialState: function () {
		return {
			battles: [],
			renderedBattles: [],
			currentlyRendering: 0
		}
	},

	componentWillMount: function () {
		var battle = [];
		if (this.props.narrative) {
			battle = this.props.narrative.fightData.map(function (turn) {
				return <BattleMessage message={turn.message} advance={this.nextMessage}/>
			})
			var first = battle[0];
			console.log(first);
			this.setState({
				battles: battle,
				renderedBattles: [battle[0]]
			})
		}
	},

	render: function () {

		return (
			<ul>
				{this.state.renderedBattles}
			</ul>
		);
	},

	nextMessage: function () {
		var newBattles = this.state.renderedBattles;
		newBattles.push(this.state.battles[currentlyRendering]);
		this.setState({
			renderedBattles: newBattles,
			currentlyRendering: this.state.currentlyRendering + 1
		})
	}


});

module.exports = Battle;