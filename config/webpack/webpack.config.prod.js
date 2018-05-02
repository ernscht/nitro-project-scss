const path = require('path');
const webpack = require('webpack');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const pkg = require('../../package.json');
const bannerData = {
	date: new Date().toISOString().slice(0, 19),
	pkg: require('../../package.json'),
};
const banner = `${bannerData.pkg.name}
	@version v${bannerData.pkg.version}
	@date ${bannerData.date}`;

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	context: path.resolve(__dirname, '../../'),
	entry: {
		ui: './src/ui.js',
		proto: './src/proto.js',
	},
	output: {
		path: path.resolve(__dirname, '../../public/assets'),
		filename: 'js/[name].min.js',
		publicPath: '/assets/',
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: true,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer'),
							],
							sourceMap: true,
						}
					},
					// {
					// 	loader: 'resolve-url-loader',
					// 	options: {
					// 		sourceMap: true,
					// 	},
					// },
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.hbs$/,
				exclude: /node_modules/,
				use: {
					loader: 'handlebars-loader',
					options: {
						// helperDirs: [
						// 	path.resolve(__dirname, '../../app/templating/hbs/helpers'),
						// ],
						// knownHelpers: [],
						// runtime: '',
						// partialDirs: ''
					}
				}
			},
			/**
			 * File loader for supporting images, for example, in CSS files.
			 */
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'images/[hash].[ext]',
				},
			},
			/**
			 *File loader for supporting fonts, for example, in CSS files.
			 */
			{
				test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
				},
			},
		],
	},
	optimization: {
		// minimizer: [
		// 	new UglifyJsPlugin({
		// 		cache: true,
		// 		parallel: true,
		// 		sourceMap: true // set to true if you want JS source maps
		// 	}),
		// 	new OptimizeCSSAssetsPlugin({}),
		// ],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		},
	},
	stats: {
		all: undefined,
		assets: true,
		children: false,
		chunks: false,
		modules: false,
		colors: true,
		depth: false,
		entrypoints: false,
		errors: true,
		errorDetails: false,
		hash: false,
		warnings: false,
	},
	plugins: [
		new webpack.BannerPlugin({ banner }),
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css',
			chunkFilename: '[id].css',
		}),
		new OptimizeCSSAssetsPlugin({
			// cssProcessorOptions: {
			// 	sourceMap: true,
			// },
		}),
	],
};
