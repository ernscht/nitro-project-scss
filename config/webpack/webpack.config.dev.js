const path = require('path');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const config = require('config');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, '../../'),
	entry : {
		ui: [
			'./src/ui.js',
			hotMiddlewareScript,
		],
		proto: [
			'./src/proto.js',
			hotMiddlewareScript,
		],
	},
	output: {
		path: path.resolve(__dirname, '../../public/assets'),
		filename: 'js/[name].js',
		publicPath: '/assets/',
	},
	module: {
		rules: [
			{
				test: /\.?scss$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1,
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
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				]
			},
			// {
			// 	test: /\.s?css$/,
			// 	use: [
			// 		MiniCssExtractPlugin.loader,
			// 		{
			// 			loader: 'css-loader',
			// 			options: {
			// 				importLoaders: 2,
			// 				sourceMap: true,
			// 			}
			// 		},
			// 		{
			// 			loader: 'postcss-loader',
			// 			options: {
			// 				plugins: () => [
			// 					require('autoprefixer'),
			// 				],
			// 				sourceMap: true,
			// 			}
			// 		},
			// 		{
			// 			loader: 'sass-loader',
			// 			options: {
			// 				sourceMap: true,
			// 			},
			// 		},
			// 	],
			// },
			{
				_disabled: !config.get('code.validation.eslint.live'),
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'eslint-loader',
					options: {
						cache: true,
						// formatter: require('eslint-friendly-formatter'),
					},
				},
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
				use: 'file-loader'
			},
			/* File loader for supporting fonts, for example, in CSS files.
			*/
			{
				test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
				use: 'file-loader'
			},
		],
	},
	plugins: [
		// new MiniCssExtractPlugin({
		// 	filename: 'css/[name].css',
		// 	// chunkFilename: '[id].css',
		// }),
		new webpack.HotModuleReplacementPlugin(),
		// maybe more at the end...
	],
	optimization: {
		noEmitOnErrors: true,
	},
	stats: {
		all: undefined,
		assets: false,
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
	// stats: 'minimal',
};

console.log('cwd: '+process.cwd());

if (config.get('code.validation.stylelint.live')) {
	module.exports.plugins.push(
		new StyleLintPlugin({
			configFile: './.stylelintrc',
			ignorePath: './.stylelintignore',
			files: ['src/**/*.?(s)css'],
			// lintDirtyModulesOnly: true,
			syntax: 'scss',
			quiet: false,
			failOnError: false,
			emitErrors: true,

			// files: ['(src/assets/**/*.*ss|src/patterns/**/*.*ss)'],
		})
	);
}

// filter disabled rules
// webpack doesn't know disabled flag so it needs to be removed before the config can be used
module.exports.module.rules = module.exports.module.rules
	.filter((rule) => rule._disabled !== true)
	.map((rule) => {
		delete rule._disabled;
		return rule;
	});
