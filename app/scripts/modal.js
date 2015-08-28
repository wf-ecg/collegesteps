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
        El: El,
        modal: {},
        trigger: null,
        inits: function () {
            // expose elements
            this.El = $.reify(El);
            this.inited = true;
        },
    };
    El = { // ELEMENTS
        closers: '.closer, .cancel', // all "closers"
        modal: 'body > div.modal', // only top level containers
        watcher: 'body',
    };

    Df.modal = {
        cleanup: $.Callbacks(), // clean routines
        bind: function (sel, target, cb) {
            sel = $(sel);
            /// map selectors to trigger show and callback
            sel.on(ACT, function (evt) {
                Df.trigger = this; // remember departure

                if (evt.keyCode === undefined || evt.keyCode === 13) {
                    evt.preventDefault(); // do not trigger
                } else if (evt.keyCode !== 0 && evt.keyCode !== 32) {
                    return; // allow for spacebar open
                }
                Df.modal.show(target);
                cb(evt);
            });
        },
        show: function (ele) {
            ele = $(ele);
            /// activate container, hide all kids, then feature one
            El.modal.addClass('active').children().hide();
            if (ele.length) {
                ele.fadeIn(function () {
                    ele.find('a, button') //
                            .attr('tabindex', '0') //
                            .first().focus().end() //
                            .last().one('blur', Df.modal.hide);
                });
            }
            return this;
        },
        hide: function () {
            /// deactivate container and do whatever cleaning
            El.modal.removeClass('active').focus();
            Df.modal.cleanup.fire();
            Df.trigger.focus(); // restore focus
            return this;
        },
        init: function () {
            /// bind container actions to .hide
            El.modal.click(function (evt) {
                var ele = $(evt.target);
                if (El.closers.contains(ele) || ele.is(El.modal)) {
                    Df.modal.hide();
                }
            });
            El.watcher.on('keydown', function (evt) {
                if (evt.keyCode === 27) { // escape key
                    Df.modal.hide();
                }
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
    var triggers = $('#stickyBar .sidesocial a'); // intercept these

    Modal.bind(triggers, dialog, function (evt) {
        dialog.find('.utilitybtn') // find the go button
                .attr('href', evt.delegateTarget.href); // transfer url
    });

});
// End Customize
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
