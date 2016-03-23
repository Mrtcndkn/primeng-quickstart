module.exports = {
  entry: "./app/boot.ts",
  output: {
      path: __dirname,
      filename:"./dist/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
      extensions: ['', '.ts',  '.js']
  },
  module: {
      loaders: [{
          test: /\.ts/, loaders: ['ts-loader'], exclude: /node_modules/
      }]
  }
};
