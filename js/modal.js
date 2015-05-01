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
        El: null,
        modal: null,
        player: null,
        video: null,
        inits: function () {
            El.body = $(El.body);
            El.modal = $(El.modal);
            El.dialog = $(El.dialog);
            El.social = $(El.social);

            this.El = El;

            Df.inited = true;
        },
    };
    El = { // ELEMENTS
        body: 'body',
        modal: 'body > .modal, body > .modal .back',
        social: '#stickyBar .sidesocial a',
        dialog: 'body > .modal .dialog',
    };

    Df.modal = {
        cleanup: $.Callbacks(),
        closer: $('.closer'),
        show: function (ele) {
            El.modal.addClass('active').children().hide();
            if (ele) {
                $(ele).fadeIn(); //this.closer.insertAfter(ele);
            }
            return this;
        },
        hide: function () {
            El.modal.removeClass('active');
            this.cleanup.fire();
        },
        init: function () {
            El.modal.on(ACT, function (evt) {
                var ele = $(evt.target);

                if (ele.is('.modal, img') || evt.offsetX > evt.target.offsetWidth) {
                    Df.modal.hide();
                }

            }).on('keyup', function (evt) {
                if (evt.which === 27) {
                    Df.modal.hide();
                }
            });
            return this;
        }
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
