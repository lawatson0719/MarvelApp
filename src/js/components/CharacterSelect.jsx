var React = require("react");


var CharacterSelect = React.createClass({
	
	// <CharacterSelect 
		// image={leftImage}
		// onClick={this.selectLeft} 
		// selected={this.selectedCharacter === 1 ? true : false}
		// />


	render: function () {
		var style = {
			"backgroundImage": "url(" + this.props.image + ")"
		}
		return ( 
			<div id={this.props.id} style={style}>
			</div>
		)
	}
});

module.exports = CharacterSelect;