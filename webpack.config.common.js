const glob = require('glob');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
const generateHTMLPlugins = () =>
	glob.sync('./src/**/*.html').map(dir =>
		new HTMLWebpackPlugin({
			filename: path.basename(dir), // Output
			template: dir, // Input
			minify: {
				collapseWhitespace: true
			}
		}));

module.exports = {
	node: {
		fs: 'empty',
	},
	entry: ['./src/js/app.js', './src/style/main.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ['style-loader', 'css-loader?url=false', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.html$/,
				loader: 'raw-loader',
			},
			// {
			// 	test: /\.(gif|png|jpe?g|svg)$/i,
			// 	use: [
			// 		{
			// 			loader: 'file-loader',
			// 			options: {
			// 				name: '[name].[ext]',
			// 				outputPath: 'static/'
			// 			}
			// 		},
			// 		{
			// 			loader: 'image-webpack-loader',
			// 			options: {
			// 				mozjpeg: {
			// 					quality: 65
			// 				},
			// 				pngquant: {
			// 					quality: '65-90'
			// 				}
			// 			}
			// 		},
			// 	]
			// },
		],
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: './src/static/',
			to: './static/',
		}]),
		...generateHTMLPlugins(),
	],
	stats: {
		colors: true,
	},
	devtool: 'source-map',
};
