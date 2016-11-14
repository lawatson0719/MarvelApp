var React = require("react");


var Character = React.createClass({
	
// <Character 
	// name={character.name}
	// key={character.id}

	render: function () {
		return (
			<div>
				{this.props.name}
			</div>
		);
	}
});

module.exports = Character;