const path = require('path');

module.exports = (env)=>{
    return(
    
        {
            entry: './src/app.js',
            output: {
                path: path.join(__dirname, 'public'),
                filename: 'bundle.js'
                },
            module: {
                rules: [
                    {
                        loader: 'babel-loader',
                        test: /\.js$/,
                        exclude: /node_modules/
                    }, {
                        test: /\.scss$/,
                        loaders: ['style-loader', 'css-loader', 'sass-loader']
                    }, {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    }
                ]
            },

            devtool: env !=='production' ? 'cheap-module-eval-source-map': false,
            
            devServer: {
                contentBase: path.join(__dirname, 'public'),
                historyApiFallback: true
            }
        });
    };
