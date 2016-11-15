var React = require("react");


var BattleMessage = React.createClass({
	
		// return <BattleMessage
		 // message={turn.message} 
		 // advance={this.nextMessage}/>

	getInitialState : function () {
		return ({
			displaying: false
		})
	},

	componentDidMount : function () {
		var _this = this;
		window.getAnimationFrame(function() {
			_this.setState({
				className: this.state.className += " display-block"
			})
		})
	},

	render: function () {
		var style = {
			"display": "none",
			"transition": "display",
			"transition-delay" : this.props.delay + "s"
		}
		if (this.state.displaying) {
			style.display = "block";
		}
		return <li style={style}>{this.props.message}</li>
	}


});

module.exports = BattleMessage;