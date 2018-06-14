module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },

  target: 'node',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.mjs', '.ts', '.js'],
  },

  module: {
    rules: [
      { test: /\.ts?$/, loader: 'ts-loader' },
      { test: /\.graphql$/, loader: 'raw-loader' },
    ],
  },
}
