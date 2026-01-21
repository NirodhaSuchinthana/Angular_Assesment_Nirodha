module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/loan-system-frontend'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['Edge'],
    customLaunchers: {
      Edge: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    restartOnFileChange: true
  });
  
  // Logic to handle Edge on macOS using karma-chrome-launcher
  if (process.platform === 'darwin') {
    const fs = require('fs');
    const edgePath = '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';
    const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    
    // If Edge is available, set CHROME_BIN to Edge to make the 'Edge' launcher work
    // (since it uses base: 'Chrome' which checks CHROME_BIN)
    if (fs.existsSync(edgePath)) {
      process.env.CHROME_BIN = edgePath;
    } else if (fs.existsSync(chromePath)) {
      // Fallback to Chrome if Edge is missing
      process.env.CHROME_BIN = chromePath;
    }
  }
};
