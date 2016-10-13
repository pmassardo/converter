module.exports = {
  entry: './app-client.js',
  output: {
    filename: 'public/bundle.js'
  },

  // this area will be used for things like minifications
  // module: {
  //   // loaders: [
  //   //   {
  //   //     exclude: /(node_modules|app-server.js)/,
  //   //   }
  //   ]
  // }
};
