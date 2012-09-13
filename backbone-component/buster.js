var config = module.exports;

config["My tests"] = {
  environment: "browser", // or "node"
  sources: [
    "build/build.js"
  ],
  tests: [
    "spec/**/*.js"
  ]
};