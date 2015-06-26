/*jslint white:false */
/*globals window, jQuery, $, skrollr */

(function (W, $) {
    W.debug = 1;

    $.fn.hasAttr = function (attr) {
        return this.attr(attr) !== undefined;
    };

    var navbar = $('#navbar');

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

            if (ref == '#' || ref === '') {
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

    $(function init() {
        navsize1();
        navTrig();
        navClick();
        trifEff();
        faders();
        navsize2();
        quizzer();

        if (!Boolean('ontouchstart' in W || 'onmsgesturechange' in W)) {
            skrollr.init();
        }

        $(W).load(function () {
            $('.loader').delay(300).fadeOut();
            $('#page-loader').delay(500).fadeOut('slow');
        }).resize(function () {
            navsize1();
            navsize2();
        });

        if ($.scrollUp) $.scrollUp({
            animation: 'fade',
        });
    });


}(window, jQuery));