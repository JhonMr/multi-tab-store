
module.exports = {
  mode: 'production',
  entry: {
    index: './index.js',
  },//打包入口文件名
  output: {
    path: __dirname + '/lib/',
    filename: 'multitabstorage.min.js',
    library: 'multitabstorage',
    libraryExport: "default",
    libraryTarget: "umd"
  },
  node: false,
}
