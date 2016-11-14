var React = require("react");


var Battle = React.createClass({
	
	// <Battle narrative={this.state.narrative}/>


	render: function () {
		var battle;
		if (this.props.narrative) {
			battle = this.props.narrative.fightData.map(function (turn) {
				return <li>{turn.message}</li>
			})
		}
		this.props
		return (
			<ul>
				{battle}
			</ul>
		);
	}




});

module.exports = Battle;