var React = require("react");


var CharacterSelect = React.createClass({
	
	// <CharacterSelect 
		// image={leftImage}
		// onClick={this.selectLeft} 
		// selected={this.selectedCharacter === 1 ? true : false}
		// />


	render: function () {
		return ( 
			<div className="char-view">
				<div className="image" id="left"></div>
				<div className="image" id="right"></div>
			</div>
		)
	}
});

module.exports = CharacterSelect;