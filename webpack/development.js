const path = require('path');
const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {
                    from: /.*/, to: path.posix.join('/', 'index.html')
                },
            ],
        },
        contentBase: false,
        compress: true,
        host: '127.0.0.1',
        port: 8080,
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/'
    }
});
