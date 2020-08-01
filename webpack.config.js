const path = require('path');
module.exports = {
  mode: 'production',
  entry:{
    index:'./src/index.js',
  },//打包入口文件名
  output:{
    path: path.resolve(__dirname, 'lib'),
    filename:'bundle.min.js',
    library: 'memory',
    globalObject: 'this',
    libraryExport: "default",
    libraryTarget: 'umd'
  },
  module:{
    rules:[
      {
        test:/\.js?$/i,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }

      }
    ],
  },
  devtool:'source-map'
}
