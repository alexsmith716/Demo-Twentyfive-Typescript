const path = require('path');
const webpack = require('webpack');
// const CssnanoPlugin = require('cssnano-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');

const rootPath = path.resolve(__dirname, '../');
const buildPath = path.resolve(rootPath, './build');
const assetPath = path.resolve(rootPath, './build/dist');

const generatedIdent = (name, localName, lr) => {
	const b = Buffer.from(lr).toString('base64');
	// eslint-disable-next-line space-infix-ops
	return `${name}__${localName}--${b.substring(b.length - 12, b.length - 3)}`;
};

module.exports = {
	context: path.resolve(__dirname, '..'),
	name: 'client',
	target: 'web',
	mode: 'production',

	entry: {
		main: [
			'./src/client.js',
		],
	},

	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: assetPath,
		publicPath: '/dist/',
	},

	module: {
		rules: [
			{
				type: 'javascript/auto',
				test: /\.mjs$/,
				use: [],
				include: /node_modules/,
			},

			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: 'graphql-tag/loader',
			},

			// ====================================================================================
			
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					babelrc: false,
					configFile: path.resolve(rootPath, 'babel.config.js'),
					// cacheDirectory: true,
					// cacheCompression: false,
				},
			},

			// ====================================================================================

			{
				test: /\.(css)$/,
				use: [
					{
						loader: ExtractCssChunks.loader,
						options: {
							modules: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								getLocalIdent: (loaderContext, localIdentName, localName) => {
									const lr = loaderContext.resourcePath;
									if (path.basename(lr).indexOf('global.scss') !== -1) {
										return localName;
									}
									if (path.basename(lr).indexOf('graphiql.css') !== -1) {
										return localName;
									}
									return generatedIdent(
										path.basename(lr).replace(/\.[^/.]+$/, ''),
										localName,
										lr
									);
								},
							},
							importLoaders: 2,
						},
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: false,
							config: {
								path: 'postcss.config.js',
							},
						},
					},
				],
			},

			// ====================================================================================

			{
				test: /\.(scss)$/,
				use: [
					{
						loader: ExtractCssChunks.loader,
						options: {
							modules: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								getLocalIdent: (loaderContext, localIdentName, localName) => {
									const lr = loaderContext.resourcePath;
									if (path.basename(lr).indexOf('global.scss') !== -1) {
										return localName;
									}
									return generatedIdent(
										path.basename(lr).replace(/\.[^/.]+$/, ''),
										localName,
										lr
									);
								},
							},
							importLoaders: 2,
						},
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: false,
							config: {
								path: 'postcss.config.js',
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								sourceMap: false,
								outputStyle: 'compressed',
							},
						},
					},
				],
			},

			// ====================================================================================

			{
				test: /\.(gif|jpg|svg|png|ico|woff|woff2|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							esModule: false,
						},
					},
				],
			},
		],
	},

	performance: {
		hints: false,
	},

	optimization: {
		// minimizer: [new CssnanoPlugin()],
		minimize: true,
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-universal-component|react-hot-loader)[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},

	resolve: {
		modules: ['node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css', '.scss', '.mjs'],
		alias: {
			react: path.resolve('./node_modules/react'),
		},
	},

	plugins: [
		new WebpackBar({ name: 'Client' }),

		new ForkTsCheckerWebpackPlugin(),

		new CopyPlugin({
			patterns: [
				{ from: '../**', to: './build/dist', context: './src/build' },
			],
		}),

		new ExtractCssChunks({
			filename: '[name].[contenthash].css',
		}),

		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true,
		}),

		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),

		new webpack.DefinePlugin({
			'process.env.IS_CLIENT': JSON.stringify(true),
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false,
		}),

		new webpack.HashedModuleIdsPlugin(),
	],
};
