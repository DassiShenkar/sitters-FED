const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',

    entry: [
        'webpack-hot-middleware/client'

    ],

    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.scss?$/,
                loader: 'style!css!sass',
                include: path.join(__dirname, 'src', 'styles')
            },
            {
                test: /\.png$/,
                loader: 'file'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg$/,
                loader: 'babel!react-svg?' + JSON.stringify({
                    svgo: {
                        // svgo options 
                        plugins: [{removeTitle: false}],
                        floatPrecision: 2
                    }
                })
            }
        ]
    }
};
