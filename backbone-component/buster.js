var fs = require('fs');

var config = module.exports;

config["My tests"] = {
  environment: "browser", // or "node",
  libs: [
    "spec/helper.js"
  ],
  sources: [
    "build/build.js"
  ],
  resources: [
    { path: "/", content: fs.readFileSync('./spec/test-index.html') }
  ],
  tests: [
    "spec/**/*.js"
  ]
};