define(
[
    'app/appModule',
    'jquery'
],
function (application, $) {
    'use strict';

    describe('app Module', function () {

        beforeEach(function () {
            this.testArea = $('<div/>');
            application.create(this.testArea);
        });

        afterEach(function () {
            delete this.testArea;
        });

        it('should load header items on create', function () {
            $(this.testArea).should.have('header');
        });

        it('should load ng-view on create', function () {
            $('section[ng-view]', this.testArea).should.exist;
        });
    });
});
