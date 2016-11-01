// webpack.config.js

module.exports = {
	entry: "./src/js/main.js",
	output: {
		path: "./dist",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				loader: "babel-loader"
			}
		]
	}
};