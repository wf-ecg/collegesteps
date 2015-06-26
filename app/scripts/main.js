/*jslint white:false */
/*globals window, jQuery, $, skrollr */

(function (W, $) {
    function h() {
        return !!('ontouchstart' in W) || !!('onmsgesturechange' in W);
    }

    function a() {
        var k = $(W).height();
        var navbarheight = $('#navbar').outerHeight();
        var home = $('#home');

        if (home.hasClass('home-fullscreen') && $('#navbar').hasClass('nav-home-bottom')) {
            home.css('height', k - navbarheight);
        } else {
            if (home.hasClass('home-fullscreen')) {
                $('#home').css('height', k);
            }
        }
        if (k < 600) {
            $('.logo-home').hide();
        } else {
            $('.logo-home').show();
        }
    }

    function g() {
        var k = $('#navbar');

        $(W).scroll(function () {
            if (k.hasClass('nav-fixed') && k.hasClass('nav-home-top') && $(W).scrollTop() >= 1) {
                k.addClass('nav-fixed-fixed');
            } else {
                k.removeClass('nav-fixed-fixed');
            }
        });
        if (k.hasClass('nav-home-top')) {
            $('.main-nav ul li:first-child a').addClass('active');
            $('.main-nav ul li ul li a').removeClass('active');
            $('.logo-home').css('display', 'none');
        }
        if (k.hasClass('nav-home-bottom')) {
            k.addClass('submenu-up');
        }
        $(W).scroll(function () {
            if (k.hasClass('nav-home-bottom') && $(W).scrollTop() >= 130) {
                k.removeClass('submenu-up');
            } else {
                if (k.hasClass('nav-home-bottom')) {
                    k.addClass('submenu-up');
                }
            }
        });
    }

    function d() {
        $('.count-item').waypoint(function () {
            $('.counter').countTo();
            $('.counter').removeClass('counter');
        }, {
            offset: '90%'
        });
    }

    function f() {
        var k = $('#navbar');
        var sidebarTrigger = $('#st-trigger-effects');

        if (k.hasClass('nav-fixed')) {
            k.scrollToFixed();
        }
        if (sidebarTrigger.hasClass('nav-fixed')) {
            sidebarTrigger.scrollToFixed();
        }
    }

    function b() {
        $('.main-nav ul li a').click(function (l) {
            var k = $(this).attr('href');

            if (k == '#' || k === '') {
                l.preventDefault();
            }
        });
        $.scrollIt();
    }
    $.fn.hasAttr = function (k) {
        return this.attr(k) !== undefined;
    };

    function e() {
        var scrtopvar;

        $('#st-trigger-effects a').click(function () {
            var k = $(W).scrollTop();
            scrtopvar = k;
        });
        $(W).scroll(function () {
            var k = $(W).scrollTop();
            var scrolloffset = 10;

            if ($('#st-container').hasClass('st-menu-open')) {
                if (scrtopvar >= k + scrolloffset || scrtopvar <= k - scrolloffset) {
                    $('#st-container').removeClass('st-menu-open');
                }
            }
        });
    }

    function i() {
        var k = '90%';
        var animTime = 700;
        var fadeDelay;

        function l(m) {
            if ($(m).hasAttr('fade-delay')) {
                var fadeDelayAttr = $(m).attr('fade-delay');
                fadeDelay = fadeDelayAttr;
            } else {
                fadeDelay = 0;
            }
        }
        $('.fadeLeft').each(function () {
            $(this).waypoint(function () {
                l(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1,
                    left: '0px'
                }, animTime);
            }, {
                offset: k
            });
        });
        $('.fadeRight').each(function () {
            $(this).waypoint(function () {
                l(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1,
                    right: '0px'
                }, animTime);
            }, {
                offset: k
            });
        });
        $('.fadeTop').each(function () {
            $(this).waypoint(function () {
                l(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1,
                    top: '0px'
                }, animTime);
            }, {
                offset: k
            });
        });
        $('.fadeBottom').each(function () {
            $(this).waypoint(function () {
                l(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1,
                    bottom: '0px'
                }, animTime);
            }, {
                offset: k
            });
        });
        $('.fadeIn').each(function () {
            $(this).waypoint(function () {
                l(this);
                $(this).delay(fadeDelay).animate({
                    opacity: 1
                }, animTime);
            }, {
                offset: k
            });
        });
    }

    a();
    f();
    b();
    e();
    i();
    g();

    if (!h()) {
        var j = skrollr.init();
    }

    $(W).resize(function () {
        a();
        g();
    });

    $(W).load(function () {
        $('.loader').delay(300).fadeOut();
        $('#page-loader').delay(500).fadeOut('slow');
    });

    $(function () {
        if ($.scrollUp) $.scrollUp({
            animation: 'fade',
        });
    });

    W.debug = 1;

}(window, jQuery));
