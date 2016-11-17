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
			<li className="char-list" onClick={this.handleClick}>
				<div className="char-name">{this.props.name}</div>
				<img src={this.props.thumb} className="thumb" />
			</li>
		);
	},

	handleClick: function () {
		this.props.onChoose(this.props.id);
	}
});

module.exports = Character;