(function($) {

	function is_touch_device() {
	  return !!('ontouchstart' in window) // works on most browsers 
		  || !!('onmsgesturechange' in window); // works on ie10
	};


	// Fullscreen home
	function homeHeight() {
		var windowheight = $(window).height();
			navbarheight = $("#navbar").outerHeight();
			home = $('#home');

		if ( home.hasClass("home-fullscreen") && $("#navbar").hasClass("nav-home-bottom")) {
			home.css('height', windowheight - navbarheight);
		} else 
		if ( home.hasClass("home-fullscreen") ) {
			$('#home').css('height', windowheight);
		}

		if (windowheight < 600) {
			$(".logo-home").hide();
		} else {
			$(".logo-home").show();
		}
	};


	$(window).load(function() {
		var homeTextHeight = $("#home-slider").height()
		$(".home-text").css("height", homeTextHeight + 18 + 60)
	});

	function navBarf() {
		var navbar = $("#navbar")
		$(window).scroll(function() {
		if (navbar.hasClass("nav-fixed") && navbar.hasClass("nav-home-top") && $(window).scrollTop() >= 1) {
			navbar.addClass("nav-fixed-fixed");
		} else {
			navbar.removeClass("nav-fixed-fixed");
		}
		});

		if (navbar.hasClass("nav-home-top")) {
			$(".main-nav ul li:first-child a").addClass("active");
			$(".main-nav ul li ul li a").removeClass("active");
			$(".logo-home").css("display", "none");
		}

		if (navbar.hasClass("nav-home-bottom")) {
			navbar.addClass("submenu-up");
		}

		$(window).scroll(function() {
		if (navbar.hasClass("nav-home-bottom") && $(window).scrollTop() >= 130) {
			navbar.removeClass("submenu-up");
		} else if (navbar.hasClass("nav-home-bottom")) {
			navbar.addClass("submenu-up");
		}
		});
	};

	// Counting
	function counting() {
		$('.count-item').waypoint(function() {
	    	$('.counter').countTo();
	    	$('.counter').removeClass('counter');
		}, { offset: '90%' })
	};

	// Fixed navbar
	function fixedNavbar() {
		var navbar = $("#navbar")
			sidebarTrigger = $("#st-trigger-effects")
		if (navbar.hasClass("nav-fixed")) {
			navbar.scrollToFixed();
		};

		if (sidebarTrigger.hasClass("nav-fixed")) {
			sidebarTrigger.scrollToFixed();
		};
  	};

  	// Navbar scroll to
  	function scrollToNavbar() {
  		$('.main-nav ul li a').click( function(e) {
  			var href = $(this).attr('href');
  			if (href == '#' || href == '') {
  				e.preventDefault();
  			}
  		});
  		$.scrollIt();
  	};  


	$.fn.hasAttr = function(name) {  
			return this.attr(name) !== undefined;
	};

	
	function hideOnScroll() {
		$("#st-trigger-effects a").click(function(){
			var scrtop = $(window).scrollTop()
			scrtopvar = scrtop;
		});

		$(window).scroll(function() {
		var scrtop = $(window).scrollTop();
			scrolloffset = 10;
		if ($("#st-container").hasClass("st-menu-open")) {
	
			if (scrtopvar >= scrtop + scrolloffset || scrtopvar <= scrtop - scrolloffset) {
				$("#st-container").removeClass("st-menu-open");
			}
		}
	    });

	};   

	function animations() {
		var animOffset = '90%';
			animTime = 700;

		function fDelay(selector) {
			if ($(selector).hasAttr("fade-delay")) {
				fadeDelayAttr = $(selector).attr("fade-delay")
				fadeDelay = fadeDelayAttr;
			} else {
				fadeDelay = 0;
			}
		};

		$('.fadeLeft').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
				$(this).delay(fadeDelay).animate({opacity:1,left:"0px"},animTime);
			}, { offset: animOffset });
		});		

		$('.fadeRight').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
				$(this).delay(fadeDelay).animate({opacity:1,right:"0px"},animTime);
			}, { offset: animOffset });
		});	

		$('.fadeTop').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
			  	$(this).delay(fadeDelay).animate({opacity:1,top:"0px"},animTime);
			}, { offset: animOffset });
		});	

		$('.fadeBottom').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
				$(this).delay(fadeDelay).animate({opacity:1,bottom:"0px"},animTime);
			}, { offset: animOffset });
		});	

		$('.fadeIn').each(function () {
			$(this).waypoint(function() {
				fDelay(this);
				$(this).delay(fadeDelay).animate({opacity:1},animTime);
			}, { offset: animOffset });
		});	
		
	};


	//Function Initializing
	homeHeight();
	fixedNavbar();
	scrollToNavbar();
	hideOnScroll();
	animations();
	navBarf();

	if (!is_touch_device()) {
		var s = skrollr.init();
	}

      
	$(window).resize(function(){	
		homeHeight();
		navBarf();
	});	

})(jQuery);

$(window).load(function() {
	$(".loader").delay(300).fadeOut();
	$("#page-loader").delay(500).fadeOut("slow");
});

