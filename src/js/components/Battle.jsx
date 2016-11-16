var React = require("react");

var BattleMessage = require("./BattleMessage.jsx");
var Battle = React.createClass({
	
		// <Battle narrative={this.state.narrative} key={battleKey}/>

	render: function () {
		var battle = [];
		if (this.props.narrative) {
			for (var i = 0; i < this.props.narrative.fightData.length; i++) {
				let message = <BattleMessage 
								message={this.props.narrative.fightData[i].message}
								delay={i*3}
								key={this.props.key + String(i)}
								/>
				battle.push(message)
			}
		}
		return (
			<ul>
				{battle}
			</ul>
		);
	}


});

module.exports = Battle;