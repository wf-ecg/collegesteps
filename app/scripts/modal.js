/*jslint white:false, laxcomma:true */
/*globals _, console, window, jQuery, Modal:true,
        , */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Modal = (function ($) { // IIFE
    'use strict';
    var self =  {
        name: 'Modal',
    },  W = window
    ,   C = console
    ,   ACT = 'keypress click'
    ,   Df, El;

    // EXTEND
    $.reify = function (x, y) { // jq-reify props w/selector vals
        $.each(x, function (i, e) {
            x[i] = $(e);
        });
        return y ? $.extend(y, x) : x; // extend optional host
    };

    $.fn.contains = function (x) {
        return Boolean(this.is(x) || this.has(x).length);
    };

    Df = { // DEFAULTS
        El: {},
        modal: {},
        inits: function () {
            // expose elements
            this.El = $.reify(El);
            this.inited = true;
        },
    };
    El = { // ELEMENTS
        body: 'body',
        modal: 'body > div.modal', // only top level containers
    };

    Df.modal = {
        cleanup: $.Callbacks(), // clean routines
        closers: $('.closer, .cancel'), // all "closers"
        bind: function (sel, cb) {
            /// map selectors to trigger show and callback
            $(sel).on(ACT, function (evt) {
                if (evt.keyCode) {
                    if (evt.keyCode === 13) evt.preventDefault();
                    if (evt.keyCode !== 32) return;
                } else {
                    evt.preventDefault();
                }
                Df.modal.show();
                cb(evt);
            });
        },
        show: function (ele) {
            /// activate container, hide all kids, then feature one
            El.modal.addClass('active').children().hide();
            if (ele) $(ele).fadeIn();
            return this;
        },
        hide: function () {
            /// deactivate container and do whatever cleaning
            El.modal.removeClass('active');
            Df.modal.cleanup.fire();
            return this;
        },
        init: function () {
            /// bind container actions to .hide
            El.modal.on(ACT, function (evt) {
                var ele = $(evt.target);
                if (Df.modal.closers.contains(ele) || ele.is(El.modal)) {
                    Df.modal.hide();
                }
            });
            El.body.on('keydown', function (evt) {
                if (evt.keyCode === 27) Df.modal.hide(); // escape key
            });
            return this;
        }
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    $.extend(self, {
        __: Df,
        init: function () {
            if (Df.inited) {
                return null;
            }
            Df.inits();
            C.info('Modal init @ ' + Date() + ' debug:', W.debug);

            $(Df.modal.init);
            return self;
        },
        bind: Df.modal.bind,
        hide: Df.modal.hide,
        show: Df.modal.show,
    });

    return self.init();
}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// Begin Customize
jQuery(function () {
    var dialog = $('.modal .dialog'); // thing to show
    var urls = $('#stickyBar .sidesocial a'); // intercept these

    Modal.bind(urls, function (evt) {
        dialog.fadeIn() // show it nicely
        .find('.utilitybtn') // find the go button
        .attr('href', evt.delegateTarget.href); // transfer url
    });

});
// End Customize
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
