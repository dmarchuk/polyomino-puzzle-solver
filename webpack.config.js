const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/js/app.ts'),
    output: {
        filename: 'app.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
};
