const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PATHS = {
	app: path.join(__dirname, '/src'),
	images: path.join(__dirname,'/src/assets'),
	build: path.join(__dirname, '/dist')
};

const options = {
	host:'localhost',
	port:'6060'
};

module.exports = {
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.[hash].js'
	},
	devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			stats: 'errors-only',
			host: options.host,
			port: options.port
		},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
				}
			},
			{
				test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'file',
				query: {
					name: '[path][name].[ext]'
				}
			},
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin({
				multiStep: true
		}),
		new htmlPlugin({
			template:path.join(PATHS.app,'/index.html'),
			inject:'body'
		}),
		new openBrowserPlugin({
			url: `http://${options.host}:${options.port}`
		})
	]
};
