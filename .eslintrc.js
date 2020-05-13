module.exports = {
  extends: "eslint:recommended",
  env: {
      browser: true,
      commonjs: true,
      es6: true,
  },
  rules: {
    "no-console": "off"
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  }
};
