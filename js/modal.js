/*jslint white:false */
/*globals _, C, W, jQuery, Modal:true,
        , */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Modal = (function ($) { // IIFE
    'use strict';
    var name = 'Modal',
        self =  {},
        W = window,
        C = console,
        Df, El, ACT = 'keypress click';

    Df = { // DEFAULTS
        El: {},
        modal: {},
        inits: function () {
            // provide access to elements
            this.El = $.reify(El);

            Df.inited = true;
        },
    };
    El = { // ELEMENTS
        body: 'body',
        modal: 'body > div.modal', // only top level containers
        social: '#stickyBar .sidesocial a',
        dialog: 'body > .modal .dialog',
    };

    Df.modal = {
        cleanup: $.Callbacks(), //          clean routines
        closers: $('.closer, .cancel'), //  all "closers"
        show: function (ele) {
            El.modal.addClass('active') //  activate modal layer
            .children().hide(); //          and hide all kids
            if (ele) $(ele).fadeIn(); //    feature an item

            return this;
        },
        hide: function () {
            El.modal.removeClass('active'); //  deactivate container
            this.cleanup.fire(); //             do whatever cleaning
            return this;
        },
        init: function () {
            // bind container actions to .hide
            El.modal.on(ACT, function (evt) {
                var ele = $(evt.target);

                if (Df.modal.closers.contains(ele) || ele.is(El.modal)) {
                    Df.modal.hide();
                }
            }).on('keyup', function (evt) {
                // bind escape key to .hide
                if (evt.which === 27) Df.modal.hide();
            });
            return this;
        }
    };

    $.reify = function (x, y) { // jq-reify props w/selector vals
        $.each(x, function (i, e) {
            x[i] = $(e);
        });
        return y ? $.extend(y, x) : x; // extend optional host
    };
    $.fn.contains = function (x) {
        return Boolean(this.is(x) || this.has(x).length);
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function bindings() {

        El.social.on(ACT, function (evt) {
            evt.preventDefault();

            Df.modal.show(El.dialog);
            El.dialog.find('.utilitybtn').attr('href', evt.delegateTarget.href);
        });

        Df.modal.init();
        Df.modal.cleanup.add(function () {
            try {
                //Df.player.pause();
            } catch (err) {
                C.log(err);
            }
        });

        El.body.on('keydown', function (evt) {
            if (evt.keyCode === 27) { // react to escape key
                Df.modal.hide();
            }
        });

    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        Df.inits();
        C.info('Modal init @ ' + Date() + ' debug:', W.debug);

        $(bindings);
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        init: _init,
    });
    self.init();
    return self;
}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
