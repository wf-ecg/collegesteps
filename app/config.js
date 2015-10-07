/*jslint white:false */
/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window), C = (W.C || W.console || {});

W.SHIET = {};
W.debug = 0;

require.config({
    baseUrl: 'scripts',
    paths: {
        lr: 'http://localhost:7200/livereload.js?snipver=1',
        lib: 'libs',
        ven: '../vendor',
        jquery: '/lib/jquery/1.11.3/jquery.min',
        bootstrap: '/lib/bootstrap/3.2.0/bootstrap.min',
        lodash: '/lib/underscore/js-1.4.4/lodash.underscore',
        modal: 'libs/modal',
        sidebar: 'libs/sidebarEffects',
        beacon: '../vendor/ecg-beacon',
        megamenu: '../vendor/jquery-accessibleMegaMenu',
        migrate: '../vendor/jquery-migrate-git',
        skrollr: '../vendor/skrollr.min',
        scrollit: '../vendor/scrollIt.min',
        scrollto: '../vendor/jquery-scrolltofixed-min',
        scrollup: '../vendor/jquery.scrollUp.min',
        waypoints: '../vendor/waypoints.min',
    },
    shim: {
        skrollr: {
            deps: ['jquery'],
            exports: 'skrollr',
        },
        megamenu: ['jquery'],
        scrollit: ['jquery'],
        sidebar: ['jquery'],
        scrollto: ['jquery'],
        scrollup: ['jquery'],
        waypoints: ['jquery'],
        xhr: ['jquery'],
    }
});

require(['lib/console'], function () {
    try {
        W.SHIET.init();

        if (W.SHIET.trident) { // debug IE less
            W.debug--;
        }
        if (W.location.hostname === 'localhost') { // debug local more
            if (W.debug > 0) {
                $('html').addClass('debug');
            }
            W.debug++;
        }
        if (W.debug > 0) { // any debug should attempt livereload
            require(['lr']);
            C.warn('LiveReloading');
        }
    } catch (err) {
        C.error('config', err);
    }

    // Load the main app module to start the app
    require(['_main']);
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
