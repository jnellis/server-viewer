
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var webpack = require('webpack');
var compiler = webpack(config);

var server = new WebpackDevServer( compiler , {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: false   ,
  proxy: {
    '^\/ws' : {
      target: 'wss://127.0.0.1/ws'
    }
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
