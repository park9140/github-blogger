window.test_files = Object.keys(window.__karma__.files).filter(function (file) {
    'use strict';
    return (/base\/test\/unit\//).test(file);
});
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/output/package',
    paths: {
        'test': '../../test',
        'testVendor': '../../vendor'
    },
    shim: {
        'testVendor/chai-jquery/chai-jquery': {
            deps: ['testVendor/chai/chai', 'jquery']
        },
        'angular': {
            deps: ['jquery']
        },
        'testVendor/angular-mocks/angular-mocks': {
            'exports': 'module',
            'deps': ['angular']
        }
    }
});

require(['config/require', 'testVendor/chai/chai', 'testVendor/chai-jquery/chai-jquery', 'testVendor/angular-mocks/angular-mocks'], function (config, chai, chaiJquery) {
    'use strict';
    //Add config from main application
    require.config(config);

    chai.should();
    chai.use(chaiJquery);

    // start test run, once Require.js is done
    require(window.test_files, function () {
        var karmaReporter = window.mocha._reporter;
        window.mocha.reporter('html');
        var htmlReporter = window.mocha._reporter;
        window.mocha._reporter = karmaReporter;
        window.$('body').append('<div id="mocha"></div>');
        window.mocha.options.growl = true;
        window.mocha._growl = function (runner) { window.$.proxy(htmlReporter, window.mocha)(runner); };
        window.__karma__.start();
    });
});

