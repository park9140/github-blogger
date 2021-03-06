// Karma configuration
module.exports = function (config) {
    'use strict';
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',


        // frameworks to use
        frameworks: ['mocha', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            'test/test-main.js',
            'node_modules/mocha/mocha.css',
            {pattern: 'test/unit/**/*.js', included: false},
            {pattern: 'output/package/**/*', included: false},
            {pattern: 'vendor/**/*.js', included: false, watched: false}
        ],

        // list of files to exclude
        exclude: [

        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,

        preprocessors: {

        },

        // cli runner port
        runnerPort: 9100,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
