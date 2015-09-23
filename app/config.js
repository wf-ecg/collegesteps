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
        jquery: '/mfal/lib/jquery/1.11.3/jquery',
        lodash: '/mfal/lib/underscore/js-1.4.4/lodash.underscore',
        modern: '/mfal/lib/modernizr/2.6.2/modernizr.min',
        migrate: 'ven/jquery-migrate-git',
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
            C.log('LiveReloading');
        }
    } catch (err) {
        C.error('config', err);
    }
});

// Load the main app module to start the app
require(['lib/xtn-jq', 'main']);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
