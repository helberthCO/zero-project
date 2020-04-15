const path = require('path');
const jsPath = require.resolve('./source/js/app.js');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync-webpack-plugin');

module.exports = {
	entry: jsPath,
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist/assets/js'),
	},

	plugins: [
    new MiniCSSExtractPlugin({
			filename: '../css/styles.css',
		}),
		new browserSync({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['./'] }
		})
	],
	
  module: {
    rules: [
      { 
        test: /\.scss$/, 
        loader: [
          MiniCSSExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer()]
						}
					},
					'sass-loader',
        ]
      }
    ]
  }
}