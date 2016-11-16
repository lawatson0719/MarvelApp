var React = require("react");

var Results = require("./Results.jsx");
var characterStore = require("../stores/characterStore.js");


var Search = React.createClass({
	
	// <Search 
			// side="left"
			// onSearch={this.displayResults} />


	getInitialState: function () {
		return {
			searchValue : ""
		}
	},

	render: function () {
		return (
			<div>
				<input 
					className="search-results"
					ref="searchInput" 
					type="text" 
					onChange={this.onChange} 
					onKeyDown={this.onKey}
					placeholder="Search Superheroes"
					value={this.state.searchValue} />
				<button onClick={this.handleClick}>Search</button>
			</div>
		);
	},

	onChange: function () {
		this.setState({
			searchValue: this.refs.searchInput.value
		})
	},

	onKey: function (e) {
		if (e.keyCode == 13) {
			if (this.refs.searchInput.value) {
				characterStore.fetch(this.refs.searchInput.value);
				this.setState({
					searchValue: ""
				})
				this.props.onSearch(this.props.character);
			}
		}
	},

	handleClick: function () {
		if (this.refs.searchInput.value) {
			characterStore.fetch(this.refs.searchInput.value);
			this.setState({
				searchValue: ""
			})
			this.props.onSearch(this.props.character);
		}
	}


});

module.exports = Search;