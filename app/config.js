/*jslint white:false */
/*global _, require, window */
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
        jquery: '/lib/jquery/1.11.3/jquery',
        bootstrap: '/lib/bootstrap/3.2.0/bootstrap.min',
        lodash: '/lib/underscore/js-1.4.4/lodash.underscore',
        //
        beacon: 'libs/ecg-beacon',
        console: 'libs/console',
        modal: 'libs/modal',
        sidebar: 'libs/sidebarEffects',
        stats: 'libs/ecg-stats',
        //
        megamenu: '../vendor/jquery-accessibleMegaMenu', //migrate: '../vendor/jquery-migrate-git',
        skrollr: '../vendor/skrollr',
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

require(['console'], function () {
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

    /// CUSTOM

    require(['lodash', '_main'], function (_) {
        _.delay(function () {
            if (W.debug < 2) {
                require(['stats'], function (stats) {
                    stats.init('COLLEGESTEPS');
                });
            }
        }, 1e3);
    });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
