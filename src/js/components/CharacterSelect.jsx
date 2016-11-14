var React = require("react");


var CharacterSelect = React.createClass({
	
	// <CharacterSelect 
		// image={leftImage}
		// onClick={this.selectLeft} 
		// selected={this.selectedCharacter === 1 ? true : false}
		// />


	render: function () {
		return ( 
			<div>
				<img src={this.props.image} />
			</div>
		)
	}
});

module.exports = CharacterSelect;