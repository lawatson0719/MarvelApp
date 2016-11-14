var React = require("react");


var Character = React.createClass({
	
		// <Character
		// name={character.name}
		// key={character.id}
		// id={character.id}
		// onChoose={this.props.onSelect} />
		// );

	render: function () {
		return (
			<div onClick={this.handleClick}>
				{this.props.name}
			</div>
		);
	},

	handleClick: function () {
		this.props.onChoose(this.props.id);
	}
});

module.exports = Character;