const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/dist'),
        clean: true,
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            '...', // Minificar todos os arquivos padrões do webpack, mesmo com os outros minificadores
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        new Webpack.optimize.ModuleConcatenationPlugin(),
    ],
}