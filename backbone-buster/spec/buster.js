var config = module.exports;

config["My tests"] = {
  rootPath: "../",
  environment: "browser", // or "node"
  libs: [
    "lib/require.js",
    "src/main.js",
    "lib/underscore.js",
    "lib/jquery.js",
    // "spec/lib/testr.js", TODO find some mock lib
    "lib/**/*.js"
  ],
  sources: [
    "src/**/*.js"
  ],
  tests: [
    "spec/**/*.spec.js"
  ]
};