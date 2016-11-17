var React = require("react");

var BattleMessage = require("./BattleMessage.jsx");
var Battle = React.createClass({
	
	// <Battle narrative={this.state.narrative} key={battleKey} keyProp={battleKey}/>


	render: function () {
		var battle = [];
		if (this.props.narrative) {
			for (var i = 0; i < this.props.narrative.fightData.length; i++) {
				let message = <BattleMessage 
								message={this.props.narrative.fightData[i].message}
								delay={i*3}
								key={this.props.keyProp + String(i)}
								/>
				battle.push(message)
			}
		}
		return (
			<section className="result-container cf">
				<h2 className="result-name">Battle Feed</h2>
				<section className="list-container">
					<div id="battle-list" className="list cf">
						<ul>
							{battle}
						</ul>
					</div>
				</section>
			</section>
		);
	}


});

module.exports = Battle;