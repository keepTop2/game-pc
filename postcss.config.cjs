module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "IOS 7.1",
        "FF > 31",
        "ie >= 8",
        "last 10 versions"
      ],
      grid: true
    },
    'postcss-pxtorem': {
      rootValue: 19.2,
      propList: ['*'],
    },
  }
}