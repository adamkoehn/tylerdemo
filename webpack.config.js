const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.glsl$/i,
                use: 'raw-loader'
            },
            {
                test: /\.obj$/i,
                use: 'raw-loader'
            }
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: './dist'
    }
};