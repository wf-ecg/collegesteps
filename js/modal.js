/*jslint white:false */
/*globals _, console, window, jQuery, Modal:true,
        , */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Modal = (function ($) { // IIFE
    'use strict';
    var self =  {
        name: 'Modal',
    },  W = window
    ,   C = console
    ,   Acts = 'keypress click'
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
        show: function (ele) {
            /// activate container, hide all kids, then feature one
            El.modal.addClass('active').children().hide();
            if (ele) $(ele).fadeIn();
            return this;
        },
        hide: function () {
            /// deactivate container and do whatever cleaning
            El.modal.removeClass('active');
            this.cleanup.fire();
            return this;
        },
        init: function () {
            /// bind container actions to .hide
            El.modal.on(Acts, function (evt) {
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


    function _bindings() {
        Df.modal.init();

        $.reify({
            social: '#stickyBar .sidesocial a',
            dialog: '.modal .dialog',
        }, El);

        El.social.on(Acts, function (evt) {
            evt.preventDefault();
            Df.modal.show(El.dialog);

            El.dialog.find('.utilitybtn') // transfer destination url
            .attr('href', evt.delegateTarget.href);
        });

    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        Df.inits();
        C.info('Modal init @ ' + Date() + ' debug:', W.debug);

        $(_bindings);
        return self;
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
    });

    return self.init();
}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
