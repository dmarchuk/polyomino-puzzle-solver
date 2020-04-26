const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/app.ts'),
    output: {
        filename: 'app.js',
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.ts', '.js'],
    },
};
