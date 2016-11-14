var React = require("react");


var Character = React.createClass({
	
		// <Character
		// name={character.name}
		// key={character.id}
		// id={character.id}
		// onChoose={this.props.onSelect} />
		// );

	render: function () {
		// name
		// w/l
		// thumbnail
		return (
			<div onClick={this.handleClick}>
				<img src={this.props.thumb} className="thumb" />
				{this.props.name}
				<div></div>
			</div>
		);
	},

	handleClick: function () {
		this.props.onChoose(this.props.id);
	}
});

module.exports = Character;