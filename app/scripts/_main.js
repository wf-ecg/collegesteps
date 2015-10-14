/*jslint white:false */
/*global define, window, _V_ */

define(['jquery', 'modal', 'xhr',
    'bootstrap', 'megamenu', 'sidebar', 'waypoints',
    'skrollr', 'scrollit', 'scrollto', 'scrollup', 'quiz'
], function ($, Modal, XHR) {
    'use strict';
    var W = window, C = W.console, navbar, sidbar;

    navbar = '#navbar';
    sidbar = '#menu-4';

    $.fn.hasAttr = function (attr) {
        return this.attr(attr) !== undefined;
    };

    function navsize1() {
        var winh = $(W).height();
        var navbarheight = navbar.outerHeight();
        var home = $('#home');

        if (home.hasClass('home-fullscreen') && navbar.hasClass('nav-home-bottom')) {
            home.css('height', winh - navbarheight);
        } else if (home.hasClass('home-fullscreen')) {
            $('#home').css('height', winh);
        }

        if (winh < 600) {
            $('.logo-home').hide();
        } else {
            $('.logo-home').show();
        }
    }

    function navsize2() {
        $(W).scroll(function () {
            if (navbar.hasClass('nav-fixed') && navbar.hasClass('nav-home-top') && $(W).scrollTop() >= 1) {
                navbar.addClass('nav-fixed-fixed');
            } else {
                navbar.removeClass('nav-fixed-fixed');
            }
        });
        if (navbar.hasClass('nav-home-top')) {
            $('.main-nav ul li:first-child a').addClass('active');
            $('.main-nav ul li ul li a').removeClass('active');
            $('.logo-home').css('display', 'none');
        }
        if (navbar.hasClass('nav-home-bottom')) {
            navbar.addClass('submenu-up');
        }
        $(W).scroll(function () {
            if (navbar.hasClass('nav-home-bottom') && $(W).scrollTop() >= 130) {
                navbar.removeClass('submenu-up');
            } else {
                if (navbar.hasClass('nav-home-bottom')) {
                    navbar.addClass('submenu-up');
                }
            }
        });
    }

    function navTrig() {
        var sidebarTrigger = $('#st-trigger-effects');

        if (navbar.hasClass('nav-fixed')) {
            navbar.scrollToFixed();
        }
        if (sidebarTrigger.hasClass('nav-fixed')) {
            sidebarTrigger.scrollToFixed();
        }
    }

    function navClick() {
        $('.main-nav ul li a').click(function (l) {
            var ref = $(this).attr('href');

            if (ref === '#' || ref === '') {
                l.preventDefault();
            }
        });
        $.scrollIt();
    }

    function trifEff() {
        var cla = 'st-menu-open';
        var ele = $('#st-container');
        var scrtopvar;

        $('#st-trigger-effects a').click(function () {
            scrtopvar = $(W).scrollTop();
        });

        $(W).scroll(function () {
            var scrtop = $(W).scrollTop();
            var scrolloffset = 10;

            if (ele.hasClass(cla)) {
                if (scrtopvar >= (scrtop + scrolloffset) || scrtopvar <= (scrtop - scrolloffset)) {
                    ele.removeClass(cla);
                }
            }
        });
    }

    function faders() {
        var animTime = 700;
        var fadeDelay;
        var limit = '90%';

        function prep(m) {
            if ($(m).hasAttr('fade-delay')) {
                fadeDelay = $(m).attr('fade-delay');
            } else {
                fadeDelay = 0;
            }
        }
        $('.fadeLeft').each(function () {
            $(this).waypoint(function () {
                prep(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1,
                    left: '0px'
                }, animTime);
            }, {
                offset: limit
            });
        });
        $('.fadeRight').each(function () {
            $(this).waypoint(function () {
                prep(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1,
                    right: '0px'
                }, animTime);
            }, {
                offset: limit
            });
        });
        $('.fadeTop').each(function () {
            $(this).waypoint(function () {
                prep(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1,
                    top: '0px'
                }, animTime);
            }, {
                offset: limit
            });
        });
        $('.fadeBottom').each(function () {
            $(this).waypoint(function () {
                prep(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1,
                    bottom: '0px'
                }, animTime);
            }, {
                offset: limit
            });
        });
        $('.fadeIn').each(function () {
            $(this).waypoint(function () {
                prep(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1
                }, animTime);
            }, {
                offset: limit
            });
        });
    }

    function quizzer() {
        $('fieldset').on('click', 'input', function (evt) {
            $(evt.delegateTarget).find('div').hide('fast');
            $(evt.target).parent().next().show('fast');
        });
    }

    function drSkroll() {
        if (!Boolean('ontouchstart' in W || 'onmsgesturechange' in W)) {
            if (W.skrollr) {
                W.skrollr.init();
            }
        }
    }

    function drEtc() {
        $('#page-loader').delay(500).fadeOut('slow');

        $(W).load(function () {
            $('.loader').delay(300).fadeOut();
        }).resize(function () {
            navsize1();
            navsize2();
        });

        if ($.scrollUp) {
            $.scrollUp({
                animation: 'fade',
            });
        }
        $('nav:first').accessibleMegaMenu({
            uuidPrefix: 'accessible-megamenu',
            menuClass: 'nav-menu',
            topNavItemClass: 'nav-item',
            panelClass: 'sub-nav',
            panelGroupClass: 'sub-nav-group',
            hoverClass: 'hover',
            focusClass: 'focus',
            openClass: 'open',
        });
    }

    function drVid() {
        if (W._V_) {
            _V_('video_1').ready(function () {
                var myPlayer = this;
                var aspectRatio = 9 / 16;
                var resizeVideoJS = function () {
                    var width = W.document.getElementById(myPlayer.id).parentElement.offsetWidth;
                    myPlayer.width(width).height(width * aspectRatio);
                };

                resizeVideoJS();
                W.onresize = resizeVideoJS;
            });
        }
    }

    function drSetnav() {
        var inum, item, navi;

        navi = $('body').data('navi');
        if (!navi) {
            return;
        }
        inum = (navi - 1);
        item = navbar.find('.nav-item').eq(inum);

        navbar.find('.nav-item').not(item) // get other page links
            .find('.sub-nav-group a').attr('data-scroll-nav', -1) // disable scroll
            .click(function () { // passthru click
                W.location = this.href;
            });

        item.addClass('active') // indicate current
            .find('a').first().attr('href', '#') // disable link
            .attr('data-scroll-nav', 0); // scroll to top

        sidbar.find('a').eq(inum) // get link to current page
            .attr('data-scroll-nav', 0) // disable
            .attr('href', '#') // disable
            .addClass('active');
    }

    function footnotes() {
        // find data-footnotes
        var trigs = $('[data-footnote]');
        var ACT = 'keypress.footnote click.footnote';

        // turn into triggers
        trigs.each(function () {
            var trig = $(this);
            var targ = trig.data('footnote');

            // target the value as classname
            targ = $('.footnote-' + targ).attr('tabindex', 0);
            trig.attr('tabindex', 0);

            // on target.ACT focus is returned to trigger
            trig.on(ACT, function () {
                targ.focus()
                    .off(ACT)
                    .on(ACT, function () {
                        trig.focus();
                    });
            });
        });
    }

    function bindModal() {
        var dialog = $('.modal .dialog'); // thing to show
        var triggers = $('#stickyBar .shares a'); // intercept these

        Modal.bind(triggers, dialog, function (data) {
            dialog.find('.utilitybtn') // find the go button
                .attr('href', data.source[0].href); // transfer url
        });
    }

    function watchInputDevice() {
        var body = $('body').on('keydown', function () {
            body.removeClass('mouse').addClass('keyboard');
        }).on('mousemove', function () {
            body.removeClass('keyboard').addClass('mouse');
        });
    }

    function init() {
        navbar = $(navbar);
        sidbar = $(sidbar);

        navsize1();
        navTrig();
        navClick();
        trifEff();
        faders();
        navsize2();
        quizzer();
        drSkroll();
        drVid();
        drSetnav();
        footnotes();
        bindModal();
        watchInputDevice();
        drEtc();
    }

    _.defer(function () {
        XHR.doit(init);
    });
});
