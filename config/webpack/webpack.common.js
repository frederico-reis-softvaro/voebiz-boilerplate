const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pkg = require('../../package.json');
const projectName = pkg.name.replace("@smiles/", "");

const bundleName = `${projectName}.js`;

module.exports = {
  entry: path.resolve(__dirname, '..', '..', 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, '..', '..', 'build'),
    filename: bundleName,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '..', '..', 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.platform': JSON.stringify(process.platform),
      'version': JSON.stringify(pkg.version),
    }),
    new CleanWebpackPlugin()
  ]
}
