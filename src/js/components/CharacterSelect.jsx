var React = require("react");


var CharacterSelect = React.createClass({
	
	// <CharacterSelect 
		// image={leftImage}
		// onClick={this.selectLeft} 
		// selected={this.selectedCharacter === 1 ? true : false}
		// />


	render: function () {
		return ( 
			<div id={this.props.id}></div>
		)
	}
});

module.exports = CharacterSelect;