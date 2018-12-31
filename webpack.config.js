const path = require("path");

module.exports = {
  entry: "./js/index.js",

  output: {
    path: path.join(__dirname, "./js"),
    filename: "app.js"
  }
};
