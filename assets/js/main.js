(function ($) {
	"use strict";
	
	var potencyApp = {
		/* ---------------------------------------------
		 Preloader
		--------------------------------------------- */	
		preloader: function() {
			$('.preloader').delay(1).fadeOut('slow');
			setTimeout(function() {
			    //After 2s, the no-scroll class of the body will be removed
			    $('body').removeClass('no-scroll');
			}, 1); //Here you can change preloader time
		},	
		/* ---------------------------------------------
		 One Page Menu Script
		--------------------------------------------- */
		onePageMenu: function() {
			function onePageNav($selector) {
				var $navSelector = $($selector);
				$navSelector
				.not('[href="#"]')
				.not('[href="#0"]')
				.on('click', function(event) {
				    if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
				      	var target = $(this.hash);
				      	target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

				      	$navSelector.removeClass("active");
				      	if( target.length) {
					      	if($(this)[0].hash.slice(1) === target[0].id) {
					      		$(this).addClass("active");
					      	} else {
					      		$(this).removeClass("active");
					      	}
				      	}
				     	
					    if (target.length) {
					        event.preventDefault();
					        $('html, body').animate({
					          	scrollTop: target.offset().top
					        }, 1000);
					    }
				    }
				});

				$navSelector.each(function(event) {
			      	var target = $(this.hash);
			      	if( target.length) {
				      	if(location.hash.slice(1) === target[0].id) {
				      		$(this).addClass("active");
				      	} else if(!location.hash) {
				      		
				      	} else {
				      		$(this).removeClass("active");
				      	}
			      	}
				});

				function onScroll(event){
				    var scrollPos = $(document).scrollTop();
				    $navSelector.each(function () {
				        var currLink = $(this);
		                if(currLink[0].hash !== "" && $(currLink[0].hash).position() !== undefined) {

	                		var $getNavHas = $(currLink).prop('href').split('#')[1],
	                			$getSection = $('#' + $getNavHas); 

	                		$getSection.each(function() {
		                		var $topPos = $(this).offset().top,
		                			$topPosRound = Math.round($topPos - 120 ),
		                			$presentPos = Math.round(scrollPos);

		                		if ($topPosRound <= $presentPos && $topPosRound + $(this).height() > $presentPos) {
		                		    $(currLink).parent().addClass("active"); 
		                		} else {
		                			$(currLink).parent().removeClass("active");
		                		}
	                		});
		                } else {
		                	return false;
		                }
				    });
				}

				$(document).on("scroll", onScroll);	     
			}
			onePageNav('.mainmenu li a');
		},

		/* ---------------------------------------------
		 Background Image
		--------------------------------------------- */
		background_image: function() {
			$("[data-bg-color], [data-bg-image], [data-bg-particles]").each(function() {
			    var $this = $(this);

			    if( $this.hasClass("pt-separate-bg-element") ){
			        $this.append('<div class="pt-background">');

			        // Background Color

			        if( $("[data-bg-color]") ){
			            $this.find(".pt-background").css("background-color", $this.attr("data-bg-color") );
			        }

			        // Particles

			        if( $this.attr("data-bg-particles-line-color") || $this.attr("data-bg-particles-dot-color") ){
			            $this.find(".pt-background").append('<div class="pt-background-particles">');
			            $(".pt-background-particles").each(function () {
			                var lineColor = $this.attr("data-bg-particles-line-color");
			                var dotColor = $this.attr("data-bg-particles-dot-color");
			                var parallax = $this.attr("data-bg-particles-parallax");
			                $(this).particleground({
			                    density: 15000,
			                    lineWidth: 0.2,
			                    lineColor: lineColor,
			                    dotColor: dotColor,
			                    parallax: parallax,
			                    proximity: 200
			                });
			            });
			        }

			        // Background Image

			        if( $this.attr("data-bg-image") !== undefined ){
			            $this.find(".pt-background").append('<div class="pt-background-image">');
			            $this.find(".pt-background-image").css("background-image", "url("+ $this.attr("data-bg-image") +")" );
			            $this.find(".pt-background-image").css("background-size", $this.attr("data-bg-size") );
			            $this.find(".pt-background-image").css("background-position", $this.attr("data-bg-position") );
			            $this.find(".pt-background-image").css("opacity", $this.attr("data-bg-image-opacity") );

			            $this.find(".pt-background-image").css("background-size", $this.attr("data-bg-size") );
			            $this.find(".pt-background-image").css("background-repeat", $this.attr("data-bg-repeat") );
			            $this.find(".pt-background-image").css("background-position", $this.attr("data-bg-position") );
			            $this.find(".pt-background-image").css("background-blend-mode", $this.attr("data-bg-blend-mode") );
			        }

			        // Parallax effect

			        if( $this.attr("data-bg-parallax") !== undefined ){
			            $this.find(".pt-background-image").addClass("pt-parallax-element");
			        }
			    }
			    else {

			        if(  $this.attr("data-bg-color") !== undefined ){
			            $this.css("background-color", $this.attr("data-bg-color") );
			            if( $this.hasClass("btn") ) {
			                $this.css("border-color", $this.attr("data-bg-color"));
			            }
			        }

			        if( $this.attr("data-bg-image") !== undefined ){
			            $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );

			            $this.css("background-size", $this.attr("data-bg-size") );
			            $this.css("background-repeat", $this.attr("data-bg-repeat") );
			            $this.css("background-position", $this.attr("data-bg-position") );
			            $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
			        }

			    }
			});
		},		
		/* ---------------------------------------------
		 Litmus Menu
		--------------------------------------------- */
		potency_menu_script: function() {
			var $submenu = $('.mainmenu').find('li').has('.sub-menu');
			$submenu.prepend("<span class='menu-click'><i class='menu-arrow fa fa-plus'></i></span>");
			var $mobileSubMenuOpen = $(".menu-click");
			$mobileSubMenuOpen.each(function() {
				var $self = $(this);
				$self.on("click", function(e) {
					e.stopImmediatePropagation();
				    $self.siblings(".sub-menu").slideToggle("slow");
				    $self.children(".menu-arrow").toggleClass("menu-extend");
				});
			});

			//hamburger Menu
			var $hamburger_link = $('.hamburger-menu-link');
			$hamburger_link.on('click', function(e) {
				e.preventDefault();
				$('.hamburger-content').toggleClass('active');
				$('.site-header').toggleClass('hamburger-header');
			});

			var $hamburger_close = $('.close-hamburger');
			$hamburger_close.on('click', function(e) {
				e.preventDefault();
				$('.hamburger-content').removeClass('active');
				$('.site-header').removeClass('hamburger-header');
			});

			var $overlayClose = $('.overlaybg');
			$overlayClose.on('click', function(e) {
				e.preventDefault();
				$('.hamburger-content').removeClass('active');
				$('.site-header').removeClass('hamburger-header');
			});

			var el = document.querySelector('.menu-block');
			SimpleScrollbar.initEl(el);

			var menuelem = $('.hamburger-content .menu-block');
			var delay_count = 0;
			menuelem.find('ul.mainmenu > li').each(function(){
				$(this).css('transition-delay', (delay_count * 200) + 'ms');
				delay_count++;
			});
		},
		/* ---------------------------------------------
		Portfolio / Hover Animation
		 --------------------------------------------- */
		popupscript: function() {		
			$('.img-popup-btn').magnificPopup({ 
				type: 'image', 
				gallery:{
					enabled: true
				}
			});

			function getScrollBarWidth () {
			    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
			    $outer.remove();
			    return 100 - widthWithScroll;
			}

			var $popupImage = $(".popup-image");

			if ( $popupImage.length > 0 ) {
			    $popupImage.magnificPopup({
			        type:'image',
			        fixedContentPos: false,
			        gallery: { enabled:true },
			        removalDelay: 300,
			        mainClass: 'mfp-fade',
			        callbacks: {
			            // This prevenpt pushing the entire page to the right after opening Magnific popup image
			            open: function() {
			                $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
			            },
			            close: function() {
			                $(".page-wrapper, .navbar-nav").css("margin-right", 0);
			            }
			        }
			    });
			}

			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			       disableOn: 700,
			       type: 'iframe',
			       mainClass: 'mfp-fade',
			       removalDelay: 160,
			       preloader: false,

			       fixedContentPos: false
			   });

			//Video Popup
			var $videoPopup = $(".video-popup");

			if ( $videoPopup.length > 0 ) {
			    $videoPopup.magnificPopup({
			        type: "iframe",
			        removalDelay: 300,
			        mainClass: "mfp-fade",
			        overflowY: "hidden",
			        iframe: {
			            markup: '<div class="mfp-iframe-scaler">'+
			            '<div class="mfp-close"></div>'+
			            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
			            '</div>',
			            patterns: {
			                youtube: {
			                    index: 'youtube.com/',
			                    id: 'v=',
			                    src: '//www.youtube.com/embed/%id%?autoplay=1'
			                },
			                vimeo: {
			                    index: 'vimeo.com/',
			                    id: '/',
			                    src: '//player.vimeo.com/video/%id%?autoplay=1'
			                },
			                gmaps: {
			                    index: '//maps.google.',
			                    src: '%id%&output=embed'
			                }
			            },
			            srcAction: 'iframe_src'
			        }
			    });
			}
		},
		/* ---------------------------------------------
		Isotope Activation
		 --------------------------------------------- */
		isotope_activation: function() {
			var IsoGriddoload = $('.portfolio-grid');
			IsoGriddoload.isotope({
			    itemSelector: '.item',
			    masonryHorizontal: {
			        rowHeight: 100
			    }
			});

			var ProjMli = $('.portfolio-filter li a');
			var ProjGrid = $('.portfolio-grid');
			ProjMli.on('click', function(e) {
				e.preventDefault();
			    ProjMli.removeClass("active");
			    $(this).addClass("active");
			    var selector = $(this).attr('data-filter');
			    ProjGrid.isotope({
			        filter: selector,
			        animationOptions: {
			            duration: 750,
			            easing: 'linear',
			            queue: false,
			        }
			    });
			});
		},
		
		/* ---------------------------------------------
		Content Video Responsive
		 --------------------------------------------- */
		content_video: function() {
			var $postVideo = $('.blog-single-page');
			$postVideo.fitVids();

			$('[data-toggle="tooltip"]').tooltip(); 
		},		
		/* ---------------------------------------------
		 All Carousel Active Script
		--------------------------------------------- */
		allCarousel: function() {
			var $owlCarousel = $(".owl-carousel");

			if( $owlCarousel.length ){
			    $owlCarousel.each(function() {

			        var items = parseInt( $(this).attr("data-owl-items"), 10);
			        if( !items ) items = 1;

			        var nav = parseInt( $(this).attr("data-owl-nav"), 2);
			        if( !nav ) nav = 0;

			        var dots = parseInt( $(this).attr("data-owl-dots"), 2);
			        if( !dots ) dots = 0;

			        var center = parseInt( $(this).attr("data-owl-center"), 2);
			        if( !center ) center = 0;

			        var loop = parseInt( $(this).attr("data-owl-loop"), 2);
			        if( !loop ) loop = 0;

			        var margin = parseInt( $(this).attr("data-owl-margin"));
			        if( !margin ) margin = 0;

			        var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
			        if( !autoWidth ) autoWidth = 0;

			        var navContainer = $(this).attr("data-owl-nav-container");
			        if( !navContainer ) navContainer = 0;

			        var autoplay = parseInt( $(this).attr("data-owl-autoplay"), 2);
			        if( !autoplay ) autoplay = 0;

			        var autoplayTimeOut = parseInt( $(this).attr("data-owl-autoplay-timeout"), 10);
			        if( !autoplayTimeOut ) autoplayTimeOut = 5000;

			        var autoHeight = parseInt( $(this).attr("data-owl-auto-height"), 2);
			        if( !autoHeight ) autoHeight = 0;

			        var animationIn = $(this).attr("data-owl-anim-in");
			        if( !animationIn ) animationIn = 0;
			        else animationIn = $(this).attr("data-owl-anim-in");	        

			        var animationOut = $(this).attr("data-owl-anim-out");
			        if( !animationOut ) animationOut = 0;
			        else animationOut = $(this).attr("data-owl-anim-out");


			        if( $("body").hasClass("rtl") ) var rtl = true;
			        else rtl = false;

			        if( items === 1 ){
			            $(this).owlCarousel({
			                navContainer: navContainer,
			                animateOut: animationOut,
			                animateIn: animationIn,
			                autoplayTimeout: autoplayTimeOut,
			                autoplay: 1,
			                autoHeight: autoHeight,
			                center: center,
			                loop: loop,
			                margin: margin,
			                autoWidth: autoWidth,
			                items: 1,
			                autoplayHoverPause: 1,
			                nav: nav,
			                dots: dots,
			                rtl: rtl,
			                navText: []
			            });
			        }
			        else {
			            $(this).owlCarousel({
			                navContainer: navContainer,
			                animateOut: animationOut,
			                animateIn: animationIn,
			                autoplayTimeout: autoplayTimeOut,
			                autoplay: autoplay,
			                autoHeight: autoHeight,
			                center: center,
			                loop: loop,
			                margin: margin,
			                autoWidth: autoWidth,
			                items: 1,
			                autoplayHoverPause: 1,
			                nav: nav,
			                dots: dots,
			                rtl: rtl,
			                navText: [],
			                responsive: {
			                    1199: {
			                        items: items
			                    },
			                    992: {
			                        items: 2
			                    },
			                    768: {
			                        items: 1
			                    },
			                    0: {
			                        items: 1
			                    }
			                }
			            });
			        }

			        if( $(this).find(".owl-item").length === 1 ){
			            $(this).find(".owl-nav").css( { "opacity": 0,"pointer-events": "none"} );
			        }

			    });
			}
		},

		/* ---------------------------------------------
		 Progress Bar
		--------------------------------------------- */
		progress_var: function() {
			var $progressBar = $('.skill-progress');

			var $skillBar = $('.skill-bar');
			if($progressBar.length) {
				var $section = $progressBar.parent();
	
				function loadDaBars() {
					$skillBar.each(function() {
						$(this).find('.progress-content').animate({
							width: $(this).attr('data-percentage')
						}, 1500);
						$(this).find('.progress-mark').animate({
							left: $(this).attr('data-percentage')
						}, {
							duration: 1500,
							step: function(now, fx) {
								var data = Math.round(now);
								$(this).find('.percent').html(data + '%');
							}
						});
					});
				}
				loadDaBars();
			}
		},
		/* ---------------------------------------------
		 Scroll top
		--------------------------------------------- */
	    scroll_top: function () {
	    	//Fixed Navbar
	    	var $fixedHeader = $('.fixed-header');
	    	$(window).on('scroll', function() {
	    		if($(this).scrollTop() >= 350) {
	    			$fixedHeader
	    			.addClass('sticky-enable');
	    		} else {
	    			$fixedHeader
	    			.removeClass('sticky-enable');
	    		}
	    	});
			
			var $scrolltop = $('#scroll-top');
			$(window).on('scroll', function() {
				if($(this).scrollTop() > $(this).height()) {
					$scrolltop
					.addClass('btn-show')
					.removeClass('btn-hide');
				} else {
					$scrolltop
					.addClass('btn-hide')
					.removeClass('btn-show');
				}
			});
			$("a[href='#top']").on('click', function() {
				$("html, body").animate({
					scrollTop: 0
				}, "normal");
				return false;
			});

		},
		/* ---------------------------------------------
		 function initializ
		 --------------------------------------------- */
		initializ: function() {
			potencyApp.onePageMenu();
			potencyApp.potency_menu_script();
			potencyApp.content_video();
			potencyApp.background_image();
			potencyApp.allCarousel();
			potencyApp.progress_var();
			potencyApp.popupscript();
			potencyApp.scroll_top();
		}
	};
	/* ---------------------------------------------
	 Document ready function
	 --------------------------------------------- */
	$(function() {
		potencyApp.initializ();
	});

	$(window).on('load', function() {
		potencyApp.preloader();
		potencyApp.isotope_activation();
	});
})(jQuery);
