var React = require("react");


var BattleMessage = React.createClass({
	
			// return <BattleMessage message={turn}/>


	render: function () {
		return <li>{this.props.message}</li>
	},

	componentDidMount: function () {
		setTimeout( function () {
			this.props.advance();
		},2000)
	}




});

module.exports = BattleMessage;