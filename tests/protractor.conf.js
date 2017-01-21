exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./e2e/*.js'],
  //multiCapabilities: [{
  //  browserName: 'firefox'
  //}, {
  //  browserName: 'chrome'
  //}]
  capabilities: {
    'browserName': 'chrome'
  },
    //baseUrl: 'http://localhost:8080',
    framework: 'jasmine2',
    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 10000
    }
};
