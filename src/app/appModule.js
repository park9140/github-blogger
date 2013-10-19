define([
    'jquery',
    'angular',
    'text!app/app.html',
    'angular-route'
],
function (
    $,
    angular,
    template
) {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        // $routeProvider.when('/config', {
        //     template: configEditorTemplate,
        //     controller: 'ConfigEditorController'
        // }).when('/dashboard', {
        //     template: dashboardTemplate,
        //     controller: 'Dashboard'
        // }).when('/teamcity', {
        //     template: iframeTemplate,
        //     controller: 'IFrame'
        // }).when('/targetprocess', {
        //     template: iframeTemplate,
        //     controller: 'IFrame'
        // });
        $routeProvider.otherwise({
            template: '<div>Content</div>'
        });
    }]);
    return {
        /**
         * Creates a new boostrapped app from this module
         * @return {jqueryElement}
         */
        create: function (element) {
            element.append($.parseHTML(template));
            angular.bootstrap(element, ['app']);
            return element;
        }
    };
});
