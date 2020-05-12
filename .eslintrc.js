module.exports = {
  extends: "eslint:recommended",
  env: {
      browser: true,
      commonjs: true,
      es6: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  }
};
