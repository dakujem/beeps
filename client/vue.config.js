// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '^/': {
        target: 'http://localhost:8042',
      },
    },
  }
}

//
// 🤚 Heads up! 🤚
//
// On localhost, do NOT use `localhost` as the host name when serving through PHP built-in server!
// Use 127.0.0.1 instead! Otherwise you waste couple of hours to figure it out.
//
