require(['config/require'], function () {
    'use strict';

    require([
        'jquery',
        'app/appModule'
    ],
    function (
        $,
        application
    ) {
        $(document).ready(function () {
            application.create($('body'));
        });
    });
});
