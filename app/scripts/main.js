/*jslint white:false, evil:true */
/*globals window, jQuery, $, skrollr */

document.writeln('<script src="./scripts/modal.js"><\/script>');
document.writeln('<script src="./scripts/classie.js"><\/script>');
document.writeln('<script src="./scripts/sidebarEffects.js"><\/script>');
document.writeln('<script src="./vendor/waypoints.min.js"><\/script>');
document.writeln('<script src="./vendor/jquery-scrolltofixed-min.js"><\/script>');
document.writeln('<script src="./vendor/scrollIt.min.js"><\/script>');
document.writeln('<script src="./vendor/skrollr.min.js"><\/script>');
document.writeln('<script src="./vendor/socialcount/socialcount.js"><\/script>');
document.writeln('<script src="./vendor/retina-1.1.0.min.js"><\/script>');
document.writeln('<script src="./vendor/jquery-accessibleMegaMenu.js"><\/script>');
document.writeln('<script src="./vendor/jquery.scrollUp.min.js"><\/script>');

(function (W, $) {
    W.debug = 1;

    $.fn.hasAttr = function (attr) {
        return this.attr(attr) !== undefined;
    };

    var Skrollr = W.skrollr;
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

    function drSkroll() {
        if (!Boolean('ontouchstart' in W || 'onmsgesturechange' in W)) {
            if (Skrollr) Skrollr.init();
        }
    }

    function drEtc() {
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
        if (W._V_) _V_('video_1').ready(function () {
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

    $(function init() {
        navsize1();
        navTrig();
        navClick();
        trifEff();
        faders();
        navsize2();
        quizzer();
        drSkroll();
        drEtc();
        drVid();
    });

}(window, jQuery));

// document.writeln('<script src="./scripts/libs/ecg-beacon.js"><\/script>');
document.writeln('<script src="http://localhost:7200/livereload.js?snipver=1"><\/script>');
