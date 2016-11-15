var React = require("react");

var BattleMessage = require("./BattleMessage.jsx");
var Battle = React.createClass({
	
	// <Battle narrative={this.state.narrative}/>

	getInitialState: function () {
		return {
			battles: null,
			renderedBattles: [],
			currentlyRendering: 0
		}
	},

	// componentWillMount: function () {
	// 	var battle = [];
	// 	if (this.props.narrative) {
	// 		battle = this.props.narrative.fightData.map(function (turn) {
	// 			return <BattleMessage message={turn.message} advance={this.nextMessage}/>
	// 		})
	// 		var first = battle[0];
	// 		console.log(first);
	// 		this.setState({
	// 			battles: battle,
	// 			renderedBattles: [battle[0]]
	// 		})
	// 	}
	// },

	render: function () {
		// var _this = this;
		// var battle;
		// if (!this.state.battles && this.props.narrative) {
		// 	battle = this.props.narrative.fightData.map(function (turn) {
		// 		return <BattleMessage message={turn.message} advance={_this.nextMessage}/>
		// 	})
		// 	this.setState({
		// 		battles: battle,
		// 		renderedBattles: this.state.renderedBattles.concat(battle[0])
		// 	})
		// }
		var battle = [];
		if (this.props.narrative) {
			for (var i = 0; i < this.props.narrative.fightData.length; i++) {
				let message = <BattleMessage 
								message={this.props.narrative.fightData[i].message}
								delay = {i*3000}
								/>
				battle.push(message)
			}
		}
		return (
			<ul>
				{battle}
			</ul>
		);
	},

	nextMessage: function () {
		this.setState({
			renderedBattles: this.state.renderedBattles.concat(this.state.battles[this.state.currentlyRendering]),
			currentlyRendering: this.state.currentlyRendering + 1
		})
	}


});

module.exports = Battle;