var React = require("react");


var BattleMessage = React.createClass({
	
		// return <BattleMessage
		// message={turn.message} 
		// advance={this.nextMessage}/>

	getInitialState : function () {
		return ({
			className: ""
		})
	},

	render: function () {
		var style = {
			"height": "0px",
			"opacity": 0,
			"transition": "height 1s, opacity 1s",
			"transitionDelay" : this.props.delay + "s"
		}

		return <li style={style} className={this.state.className}>{this.props.message}</li>
	},

	componentDidMount : function () {
		var _this = this;
		setTimeout(function () {
			_this.setState({
				className: _this.state.className += "display-block"
			})
		}, 0);
	}
});

module.exports = BattleMessage;