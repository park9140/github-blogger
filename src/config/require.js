require.config({
    paths: {
    },
    shim: {
        'angular' : {deps: ['jquery'], 'exports' : 'angular'},
        'angular-resource' : {deps: ['angular'], 'exports' : 'angular'},
        'angular-route' : {deps: ['angular'], 'exports' : 'angular'}
    }
});
