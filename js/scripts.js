/*global jQuery, document, window, Waypoint, grecaptcha, google, InfoBox, Photostack, Cookies, smoothScroll*/
var headerScroll,
    flickrUserID,
    localZoneTime,
    donationSymbol,
    parallaxEffect,
    instagramUserID,
    scheduleWeekDay,
    mailchimpListURL,
    pageSmoothScroll,
    recaptchaSiteKey,
    blocksAtSameHeight,
    eventsTableWeekDay,
    eventsTableStartDay,
    instagramAccessToken,
    gfortRecaptchaSiteKey,
    notificationExpireDays,
    donationSymbolPosition,
    googleMapAPIKey;


/* =============================================================================
Settings
============================================================================= */
// Choose between ( fixed / autoHide / normal )
headerScroll = 'normal';

// Enable or disable Parallax Effect ( true / false )
parallaxEffect = true;

// Mailchimp list URL
mailchimpListURL = 'http://Graphicfort.us11.list-manage.com/subscribe/post?u=dffe9a5d2b472dbe0cc471e1b&amp;id=4150cd2f12';

// Your Website recaptcha Key
recaptchaSiteKey = '6LdHCQwTAAAAAK0HvYvQJ5oA_9W-vlv5A41xBEGp';

// Change $ to any currency symbol you want
donationSymbol = '$';

// Donation symbol Position ( left / right )
donationSymbolPosition = 'left';

// Local Time GMT Used for Timer countdown
localZoneTime = '+2';

// Make blocks at same Height as grid ( true / false )
blocksAtSameHeight = true;

// Schedule week days names
scheduleWeekDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Events Table
/*
0 => Sun
1 => Mon
2 => Tue
3 => Wed
4 => Thu
5 => Fri
6 => Sat
*/
eventsTableWeekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
eventsTableStartDay = 0;

// Instagram userID and Access Token
instagramUserID = '269801886';
instagramAccessToken = '2546719702.1677ed0.12f1f21e44014e37b3e5dacc494cfcdd';

// Flickr userID
flickrUserID = '136162511@N05';

// Notification Expire Days
notificationExpireDays = 10;

// Smooth Scroll ( true / false )
pageSmoothScroll = true;


googleMapAPIKey = 'AIzaSyBDGULVau4J4Chpc4DmyfwKoz3XRUwsEOQ';


/* =============================================================================
Ajax
============================================================================= */
jQuery.ajaxPrefilter(function (options) {
    'use strict';
    options.cache = true;
});




/* =============================================================================
Document Ready Function
============================================================================= */
jQuery(document).ready(function () {

    'use strict';

    var isWin,
        isOpera,
        headerTimer,
        songDetails,
        delayTime = 0,
        totalEvents = 0,
        currentPosition,
        eventsTableTimer,
        elCurrentMap = [],
        notificationBlockTimer,
        progressBarBlockArray = [],
        eventsTableCurrentYear = 0,
        eventsTableCurrentMonth = 0;


    /* =========================================================================
    Opera on Win Fix
    ========================================================================= */
    isWin = /win/.test(navigator.platform.toLowerCase());
    isOpera = /opera/.test(navigator.userAgent.toLowerCase());

    if (isWin) {
        if (isOpera) {
            jQuery('html').addClass('ie9');
        }
    }


    /* =========================================================================
    UP Button
    ========================================================================= */
    /* Button
    ------------------------------------------------------------------------- */
    jQuery('#up-button a').on('click', function () {
        jQuery('html, body').animate({scrollTop: '0'}, 800);
        return false;
    });

    /* Window Scroll
    ------------------------------------------------------------------------- */
    jQuery(window).scroll(function () {
        currentPosition = jQuery(window).scrollTop();
        if (currentPosition >= 300) {
            jQuery('#up-button').addClass('correct-position');
        } else {
            jQuery('#up-button').removeClass('correct-position');
        }
    });


    /* =========================================================================
    GFort Ripple Animation
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortRippleAnimationfn(xAxes, yAxes) {

        jQuery('.gfort-ripple').remove();

        var rippleTopPosition,
            rippleLeftPosition,
            el = jQuery('.gfort-ripple-animation'),
            elPosTop = el.offset().top,
            elPosLeft = el.offset().left,
            elouterWidth = el.outerWidth(),
            elouterHeight = el.outerHeight();

        el.prepend('<span class="gfort-ripple"></span>');

        if (elouterWidth >= elouterHeight) {
            elouterHeight = elouterWidth;
        } else {
            elouterWidth = elouterHeight;
        }

        rippleLeftPosition = xAxes - elPosLeft - elouterWidth / 2;
        rippleTopPosition = yAxes - elPosTop - elouterHeight / 2;

        jQuery('.gfort-ripple').css({
            width: elouterWidth,
            height: elouterHeight,
            top: rippleTopPosition + 'px',
            left: rippleLeftPosition + 'px'
        }).addClass('ripple-animation');

    }

    /* Action
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '.wave-effect', function (e) {

        if (e.button === 2) {
            return false;
        }

        jQuery('.gfort-ripple-animation').removeClass('gfort-ripple-animation');
        jQuery(this).addClass('gfort-ripple-animation');
        gfortRippleAnimationfn(e.pageX, e.pageY);

    });


    /* ==========================================================================
    Notification Block ( Cookie )
    ========================================================================== */
    /* Notification Top Function
    ------------------------------------------------------------------------- */
    function gfortNTopfn(nbsno) {
        if (Cookies.get('LuneCookie-' + nbsno) === 'gfort-nbs-' + nbsno) {
            jQuery('.notification-block-style-' + nbsno).css('display', 'none');
        } else {
            jQuery('.notification-block-style-' + nbsno).css('display', 'block');
        }
    }

    /* Notification Top Dismiss Function
    ------------------------------------------------------------------------- */
    function gfortNTopDismissfn(nbsno) {
        jQuery('.notification-block-style-' + nbsno).slideUp(500);
        Cookies.set('LuneCookie-' + nbsno, 'gfort-nbs-' + nbsno, {expires: notificationExpireDays});
    }

    /* Notification Modal Function
    ------------------------------------------------------------------------- */
    function gfortNModalfn(nbsno) {
        if (Cookies.get('LuneCookie-' + nbsno) === 'gfort-nbs-' + nbsno) {
            jQuery('.notification-block-style-' + nbsno).find('.modal').modal('hide');
        } else {
            notificationBlockTimer = setTimeout(function () {
                jQuery('.notification-block-style-' + nbsno).find('.modal').modal({
                    show: true,
                    keyboard: false,
                    backdrop: 'static'
                });
            }, 4000);
        }
    }

    /* Notification Modal Dismiss Function
    ------------------------------------------------------------------------- */
    function gfortNModalDismissfn(nbsno) {
        jQuery('.notification-block-style-' + nbsno).find('.modal').modal('hide');
        Cookies.set('LuneCookie-' + nbsno, 'gfort-nbs-' + nbsno, {expires: notificationExpireDays});
        clearTimeout(notificationBlockTimer);
    }

    /* Notification Translate Function
    ------------------------------------------------------------------------- */
    function gfortNTranslatefn(nbsno) {
        if (Cookies.get('LuneCookie-' + nbsno) === 'gfort-nbs-' + nbsno) {
            jQuery('.notification-block-style-' + nbsno).removeClass('correct-position');
        } else {
            notificationBlockTimer = setTimeout(function () {
                jQuery('.notification-block-style-' + nbsno).addClass('correct-position');
            }, 4000);
        }
    }

    /* Notification Translate Dismiss Function
    ------------------------------------------------------------------------- */
    function gfortNTranslateDismissfn(nbsno) {
        jQuery('.notification-block-style-' + nbsno).removeClass('correct-position');
        Cookies.set('LuneCookie-' + nbsno, 'gfort-nbs-' + nbsno, {expires: notificationExpireDays});
        clearTimeout(notificationBlockTimer);
    }

    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortNotificationsfn() {

        /* Styles
        --------------------------------------------------------------------- */
        /* Style 1
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-1')) {
            gfortNTopfn(1);
        }

        /* Style 2
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-2')) {
            gfortNTopfn(2);
        }

        /* Style 3
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-3')) {
            gfortNTopfn(3);
        }

        /* Style 4
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-4')) {
            gfortNModalfn(4);
        }

        /* Style 5
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-5')) {
            gfortNModalfn(5);
        }

        /* Style 6
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-6')) {
            gfortNModalfn(6);
        }

        /* Style 7
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-7')) {
            gfortNModalfn(7);
        }

        /* Style 8
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-8')) {
            gfortNModalfn(8);
        }

        /* Style 9
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-9')) {
            gfortNModalfn(9);
        }

        /* Style 10
        ----------------------------------------------------------------- */
        if (jQuery('body').hasClass('nbs-10')) {
            gfortNTranslatefn(10);
        }

        /* Close Button
        --------------------------------------------------------------------- */
        jQuery('.close-notification').on('click', function (e) {

            e.preventDefault();
            var elNotificationClass = '.' + jQuery(this).parents('.notification-block').attr('class').replace(/\s/g, '.');

            /* Styles
            ----------------------------------------------------------------- */
            if (jQuery(elNotificationClass).hasClass('notification-block-style-1')) {
                gfortNTopDismissfn(1);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-2')) {
                gfortNTopDismissfn(2);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-3')) {
                gfortNTopDismissfn(3);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-4')) {
                gfortNModalDismissfn(4);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-5')) {
                gfortNModalDismissfn(5);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-6')) {
                gfortNModalDismissfn(6);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-7')) {
                gfortNModalDismissfn(7);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-8')) {
                gfortNModalDismissfn(8);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-9')) {
                gfortNModalDismissfn(9);
            } else if (jQuery(elNotificationClass).hasClass('notification-block-style-10')) {
                gfortNTranslateDismissfn(10);
            }

            return false;

        });

        /* Main Link
        --------------------------------------------------------------------- */
        jQuery('.notification-block-modal .main-link').on('click', function () {
            var elNotificationClass = '.' + jQuery(this).parents('.notification-block').attr('class').replace(/\s/g, '.');
            if (jQuery(elNotificationClass).hasClass('notification-block-style-9')) {
                gfortNModalDismissfn(9);
            }
        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.notification-block').length) {
        jQuery.getScript('js/plugins/cookie/js.cookie.min.js', function () {
            gfortNotificationsfn();
        });
    }


    /* =========================================================================
    Background Image Block
    ========================================================================= */
    if (jQuery('.remove-white-content').length) {
        jQuery('.remove-white-content').each(function () {
            jQuery(this).parents('.section-container').parent().addClass('border-bottom');
        });
    }


    /* =========================================================================
    Menu Button
    ========================================================================= */
    jQuery('.navbar-toggle').on('click', function () {
        jQuery('.navbar-toggle').toggleClass('gfort-toggle');
    });


    /* =========================================================================
    Header Scroll Style
    ========================================================================= */
    /* Smooth Scroll
    ------------------------------------------------------------------------- */
    if (jQuery('[data-scroll]').length) {
        jQuery.getScript('js/plugins/scrollTo/jquery.scrollTo.min.js');
    }

    /* Fixed / Auto hide header smooth scroll function
    ------------------------------------------------------------------------- */
    function gfortScrollTo() {

        /* Adding data-scroll to each link
        --------------------------------------------------------------------- */
        jQuery('.navbar-brand').each(function () {
            if (jQuery(this).attr('href').charAt(0) === '#') {
                jQuery(this).attr('data-scroll', '');
            }
        });

        jQuery('.header-menu-container a').each(function () {
            if (jQuery(this).attr('href').charAt(0) === '#') {
                jQuery(this).attr('data-scroll', '');
            }
        });

    }

    /* on click
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '[data-scroll]', function (e) {

        e.preventDefault();

        if (headerScroll === 'autoHide') {
            jQuery('html, body').scrollTo(this.hash, 800, {
                offset: 0
            });
        } else {
            jQuery('html, body').scrollTo(this.hash, 800, {
                offset: -60
            });
        }

        if (jQuery('.navbar-collapse').hasClass('in')) {
            jQuery('.navbar-toggle').removeClass('gfort-toggle');
            jQuery('.navbar-collapse').removeClass('in').addClass('collapse');
        }

    });

    /* Fixed Header Function
    ------------------------------------------------------------------------- */
    function fixedHeaderfn() {

        var headerEl = jQuery('.header-menu-container');

        headerEl = new Waypoint.Sticky({
            element: headerEl[0],
            stuckClass: 'header-menu-stuck',
            wrapper: '<div class="header-menu">'
        });

        jQuery(window).scroll(function () {
            currentPosition = jQuery(window).scrollTop();
            if (currentPosition >= 300) {
                jQuery('.header-menu-stuck').addClass('header-menu-tiny');
            } else {
                jQuery('.header-menu-stuck').removeClass('header-menu-tiny');
            }
        });

        gfortScrollTo();
        clearTimeout(headerTimer);

    }

    /* Auto Hide Header Function
    ------------------------------------------------------------------------- */
    function autoHideHeaderfn() {

        var headerEl = jQuery('.header-menu-container');

        headerEl = new Waypoint({
            element: headerEl[0],
            handler: function () {

                var lastScrollTop = 0,
                    el = jQuery(this.element),
                    elParent = el.parent(),
                    elGParentHeight = elParent.parent().outerHeight(true);

                elParent.css({height: el.outerHeight(true)});

                jQuery(window).scroll(function () {

                    currentPosition = jQuery(window).scrollTop();

                    if (currentPosition > elGParentHeight) {

                        if (currentPosition > lastScrollTop) {
                            elParent.find('.header-menu-container').addClass('header-menu-autohide');
                            if (currentPosition >= 300) {
                                jQuery('.header-menu-autohide').addClass('header-menu-tiny');
                            }
                        } else if (currentPosition < lastScrollTop) {
                            elParent.find('.header-menu-container').addClass('header-menu-stuck').removeClass('header-menu-autohide');
                        }

                    } else if (currentPosition < elGParentHeight && currentPosition < parseInt(elParent.offset().top, 10)) {
                        elParent.find('.header-menu-container').removeClass('header-menu-stuck');
                    }

                    if (currentPosition < 300) {
                        elParent.find('.header-menu-container').removeClass('header-menu-tiny');
                    }

                    lastScrollTop = currentPosition;

                });

            }
        });

        gfortScrollTo();
        clearTimeout(headerTimer);

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (headerScroll === 'fixed') {
        if (jQuery('.header-menu-container').length) {
            jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
                jQuery.getScript('js/plugins/waypoint/sticky.min.js', function () {
                    jQuery.getScript('js/plugins/scrollTo/jquery.scrollTo.min.js', function () {
                        fixedHeaderfn();
                    });
                });
            });
        }
    } else if (headerScroll === 'autoHide') {
        if (jQuery('.header-menu-container').length) {
            jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
                jQuery.getScript('js/plugins/waypoint/sticky.min.js', function () {
                    jQuery.getScript('js/plugins/scrollTo/jquery.scrollTo.min.js', function () {
                        autoHideHeaderfn();
                    });
                });
            });
        }
    }

    /* Close Notification
    ------------------------------------------------------------------------- */
    jQuery('.close-notification').on('click', function () {
        headerTimer = setTimeout(function () {
            if (headerScroll === 'fixed') {
                fixedHeaderfn();
            } else if (headerScroll === 'autoHide') {
                autoHideHeaderfn();
            }
        }, 600);
    });


    /* ==========================================================================
    Data Spy
    ========================================================================== */
    jQuery('body').attr('data-spy', 'scroll').attr('data-target', '.header-menu-container').attr('data-offset', '61');

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        jQuery('[data-spy="scroll"]').each(function () {
            jQuery(this).scrollspy('refresh');
        });
    });


    /* =========================================================================
    Sub Menu
    ========================================================================= */
    /* Arrow
    ------------------------------------------------------------------------- */
    jQuery('ul.navbar-nav li ul').parent('li').addClass('parent-list');
    jQuery('.parent-list > a').append('<span class="menu-arrow"><i class="fa fa-angle-down"></i></span>');

    /* List
    ------------------------------------------------------------------------- */
    jQuery('.parent-list > ul').addClass('sub-menu');

    /* Parent Item
    ------------------------------------------------------------------------- */
    jQuery('.parent-list').each(function () {
        var el = jQuery('> .sub-menu', this);
        jQuery('> a', this).clone().prependTo(el).wrap('<li></li>');
    });
    jQuery('.sub-menu').find('.sub-menu li:first').remove();
    jQuery('.sub-menu a').addClass('wave-effect');
    jQuery('.sub-menu li:first-child a').removeClass('wave-effect');

    /* Show / Hide Sub Menu
    ------------------------------------------------------------------------- */
    jQuery('.parent-list').on({
        mouseenter: function () {
            var el = jQuery('> ul', this),
                elHeight = el.find('> li').length * 42 + 20;
            el.animate({
                width: '200px',
                height: elHeight
            }, 300);
        },
        mouseleave: function () {
            var el = jQuery('> ul', this);
            el.animate({
                width: '0',
                height: '0'
            }, 100);
        }
    });


    /* =========================================================================
    Swiper Slider
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function swiperSliderfn() {
        jQuery('.gfort-swiper-slider').each(function (index) {

            var grabTouchMouse,
                sliderDirection,
                el = jQuery(this),
                slideItemsPerView,
                slideItemsMDPerView,
                slideItemsSMPerView,
                slideItemsXSPerView,
                centeredSlidesItems,
                slideAnimationEffect,
                windowWidth = jQuery(window).outerWidth(true);

            /* Thumbs
            ----------------------------------------------------------------- */
            if (el.hasClass('thumbs-swiper-slider')) {
                el.find('.swiper-pagination').addClass('swiper-pagination-tumbs');
                el.find('.swiper-pagination').removeClass('swiper-pagination');
                el.find('.swiper-pagination-tumbs span:first').addClass('active-swiper-slide');
                el.find('.swiper-pagination-tumbs span').each(function (slidesIndex) {
                    jQuery(this).attr('data-gfort-swiper-slide-to', slidesIndex + 1);
                });
            }

            /* Slider, Pagination and Arrows IDs
            ----------------------------------------------------------------- */
            el.attr('id', 'gfort-swiper-slider-' + index);
            el.find('.swiper-pagination').attr('id', 'gfort-swiper-pagination-' + index);
            el.find('.swiper-button-next').attr('id', 'gfort-swiper-button-next-' + index);
            el.find('.swiper-button-prev').attr('id', 'gfort-swiper-button-prev-' + index);

            /* Mouse Cursor
            ----------------------------------------------------------------- */
            grabTouchMouse = jQuery('#gfort-swiper-slider-' + index).hasClass('fade-swiper-slider')
                ? !1
                : !0;

            /* Direction
            ----------------------------------------------------------------- */
            sliderDirection = jQuery('#gfort-swiper-slider-' + index).hasClass('vertical-swiper-slider')
                ? 'vertical'
                : 'horizontal';

            /* Centerd Items
            ----------------------------------------------------------------- */
            centeredSlidesItems = jQuery('#gfort-swiper-slider-' + index).hasClass('center-swiper-slider')
                ? !0
                : !1;

            /* Animation Effect ( fade / slide )
            ----------------------------------------------------------------- */
            slideAnimationEffect = jQuery('#gfort-swiper-slider-' + index).hasClass('fade-swiper-slider')
                ? 'fade'
                : 'slide';

            /* Animation Effect ( coverflow )
            ----------------------------------------------------------------- */
            if (jQuery('#gfort-swiper-slider-' + index).hasClass('coverflow-swiper-slider')) {
                if (windowWidth < 1024) {
                    jQuery('#gfort-swiper-slider-' + index).removeClass('swiper-container-3d');
                    jQuery('#gfort-swiper-slider-' + index).find('.swiper-slide').css({transform: 'rotateY(0)'});
                    slideItemsPerView = '2';
                    slideAnimationEffect = 'slide';
                } else {
                    slideAnimationEffect = 'coverflow';
                }
            }

            /* Slide Items Per View ( on Large screen )
            ----------------------------------------------------------------- */
            slideItemsPerView = jQuery('#gfort-swiper-slider-' + index).attr('data-swiper-items');
            if (slideItemsPerView === '' || slideItemsPerView === undefined) {
                slideItemsPerView = 1;
            }

            /* Slide Items Per View ( on Medium screen )
            ----------------------------------------------------------------- */
            slideItemsMDPerView = jQuery('#gfort-swiper-slider-' + index).attr('data-swiper-md-items');
            if (slideItemsMDPerView === '' || slideItemsMDPerView === undefined) {
                slideItemsMDPerView = 2;
            }

            /* Slide Items Per View ( on Small screen )
            ----------------------------------------------------------------- */
            slideItemsSMPerView = jQuery('#gfort-swiper-slider-' + index).attr('data-swiper-sm-items');
            if (slideItemsSMPerView === '' || slideItemsSMPerView === undefined) {
                slideItemsSMPerView = 2;
            }

            /* Slide Items Per View ( on Small screen )
            ----------------------------------------------------------------- */
            slideItemsXSPerView = jQuery('#gfort-swiper-slider-' + index).attr('data-swiper-xs-items');
            if (slideItemsXSPerView === '' || slideItemsXSPerView === undefined) {
                slideItemsXSPerView = 1;
            }

            if (sliderDirection === 'horizontal') {
                if (windowWidth < 401) {
                    slideItemsPerView = 1;
                } else if (windowWidth < 601) {
                    slideItemsPerView = slideItemsPerView > 1
                        ? slideItemsXSPerView
                        : 1;
                } else if (windowWidth < 768) {
                    slideItemsPerView = slideItemsPerView > 1
                        ? slideItemsSMPerView
                        : 1;
                } else if (windowWidth < 1024) {
                    slideItemsPerView = slideItemsPerView > 1
                        ? slideItemsMDPerView
                        : 1;
                }
            } else {
                slideItemsPerView = 1;
            }

            /* Configurations
            ----------------------------------------------------------------- */
            jQuery('#gfort-swiper-slider-' + index).swiper({
                loop: true,
                speed: 800,
                coverflow: {
                    depth: 120,
                    rotate: -30,
                    stretch: 10
                },
                autoplay: 5000,
                paginationClickable: true,
                grabCursor: grabTouchMouse,
                direction: sliderDirection,
                effect: slideAnimationEffect,
                simulateTouch: grabTouchMouse,
                slidesPerView: slideItemsPerView,
                centeredSlides: centeredSlidesItems,
                autoplayDisableOnInteraction: false,
                pagination: '#gfort-swiper-pagination-' + index,
                nextButton: '#gfort-swiper-button-next-' + index,
                prevButton: '#gfort-swiper-button-prev-' + index
            });

            /* Hover
            ----------------------------------------------------------------- */
            jQuery('#gfort-swiper-slider-' + index).on({
                mouseenter: function () {
                    jQuery(this)[0].swiper.stopAutoplay();
                },
                mouseleave: function () {
                    jQuery(this)[0].swiper.startAutoplay();
                }
            });

        });
    }

    /* Slider Height Function
    ------------------------------------------------------------------------- */
    function swiperSliderHeightfn() {
        jQuery('.swiper-container-horizontal').each(function () {
            var el = jQuery(this);
            el.css({height: '100%'});
            el.css({height: el.find('.swiper-wrapper').outerHeight(true)});
            if (el.height() === 0 || el.height() < 21) {
                el.css({height: '100%'});
            }
        });
    }

    /* Swipe to Slide Funcrion
    ------------------------------------------------------------------------- */
    function swipToSlidefn() {

        jQuery('> :first-child', '[data-gfort-swiper-slide-to]').on('click', function () {

            var el = jQuery(this),
                elParent = el.parent(),
                swipToSlide = elParent.attr('data-gfort-swiper-slide-to'),
                sliderID = '#' + el.parents('.section-container').find('.gfort-swiper-slider').attr('id');

            if (jQuery(sliderID)[0] !== undefined) {
                el.parents('.section-container').find('.active-swiper-slide').removeClass('active-swiper-slide');
                elParent.addClass('active-swiper-slide');
                jQuery(sliderID)[0].swiper.slideTo(swipToSlide, 500, false);
            }

        });

        if (jQuery('[data-gfort-swiper-slide-to]').length) {
            jQuery('[data-gfort-swiper-slide-to]').parents('.section-container').find('.gfort-swiper-slider').each(function () {

                var el = jQuery(this),
                    sliderID = '#' + el.attr('id'),
                    elParents = jQuery(sliderID).parents('.section-container');

                elParents.find('.active-swiper-slide').removeClass('active-swiper-slide');
                elParents.find('[data-gfort-swiper-slide-to="1"]').addClass('active-swiper-slide');

                jQuery(sliderID)[0].swiper.on('slideChangeStart', function () {

                    var slideIndex = jQuery(sliderID)[0].swiper.activeIndex,
                        swipToSlideLength = elParents.find('[data-gfort-swiper-slide-to]').length;

                    elParents.find('.active-swiper-slide').removeClass('active-swiper-slide');
                    elParents.find('[data-gfort-swiper-slide-to="' + slideIndex + '"]').addClass('active-swiper-slide');

                    if (slideIndex > swipToSlideLength) {
                        elParents.find('[data-gfort-swiper-slide-to="1"]').addClass('active-swiper-slide');
                    }
                    if (slideIndex < 1) {
                        elParents.find('[data-gfort-swiper-slide-to="' + swipToSlideLength + '"]').addClass('active-swiper-slide');
                    }

                });

            });
        }

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.gfort-swiper-slider').length) {
        jQuery.getScript('js/plugins/swiper/js/swiper.min.js', function () {
            swiperSliderfn();
            swiperSliderHeightfn();
            swipToSlidefn();
        });
    }

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        if (jQuery('.gfort-swiper-slider').length) {
            jQuery('.gfort-swiper-slider').each(function () {
                jQuery('#' + jQuery(this).attr('id'))[0].swiper.destroy();
            });
            swiperSliderfn();
            swiperSliderHeightfn();
            swipToSlidefn();
        }
    });


    /* =========================================================================
    Dismiss Form Message
    ========================================================================= */
    function dismissFormMessagefn() {
        jQuery('.form-message-block').css({bottom: '-20%'}).fadeOut(300, function () {
            jQuery(this).remove();
        });
    }
    jQuery('body').on('click', '.form-message-block button', function () {
        dismissFormMessagefn();
    });


    /* =========================================================================
    MailChimp Form ( Subscription )
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortmailchimpfn() {
        jQuery('.subscribe-form-block form').each(function (index) {

            /* Form Message
            ----------------------------------------------------------------- */
            function mailchimpMessagefn(responsemsg) {
                if (!jQuery('.form-message-block').length) {
                    jQuery('body').append('<div class="form-message-block"><div class="form-message-container"></div><button type="button" class="form-message-close-button"><i class="fa fa-times"></i></button></div>');
                }
                jQuery('.form-message-container').html(responsemsg.msg);
                jQuery('.form-message-block').fadeIn(100).css({bottom: '24px'});
            }

            /* Callback
            ----------------------------------------------------------------- */
            function mailchimpCallbackfn(response) {
                if (response.result === 'success') {
                    jQuery('#gfort-mailchilmp-' + index).find('.subscribe-email').val('');
                    jQuery('#gfort-mailchilmp-' + index).find('.subscribe-email').removeClass('input-filled');
                    mailchimpMessagefn(response);
                } else {
                    mailchimpMessagefn(response);
                }
            }

            jQuery(this).attr('id', 'gfort-mailchilmp-' + index);

            jQuery('#gfort-mailchilmp-' + index).ajaxChimp({
                url: mailchimpListURL,
                callback: mailchimpCallbackfn
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.subscribe-form-block').length) {
        jQuery.getScript('js/plugins/ajaxchimp/jquery.ajaxchimp.min.js', function () {
            gfortmailchimpfn();
        });
    }


    /* =========================================================================
    Contact Form
    ========================================================================= */
    if (jQuery('.contact-form-block').length) {
        jQuery('.contact-form-block form').each(function (index) {

            jQuery(this).attr('id', 'gfort-contact-form-block-' + index);

            jQuery('#gfort-contact-form-block-' + index).submit(function () {

                var el = jQuery(this),
                    formValues = el.serialize(),
                    formActionURL = el.attr('action'),
                    recaptchaID = el.find('.gfort-recaptcha').attr('id');

                el.find('.gfort-new-recaptcha').removeClass('gfort-new-recaptcha');
                el.find('.gfort-recaptcha').parent().addClass('gfort-new-recaptcha');
                el.find('button').addClass('add-spin');

                jQuery.post(formActionURL, formValues, function (response) {

                    /* Form Message
                    --------------------------------------------------------- */
                    if (!jQuery('.form-message-block').length) {
                        jQuery('body').append('<div class="form-message-block"><div class="form-message-container"></div><button type="button" class="form-message-close-button"><i class="fa fa-times"></i></button></div>');
                    }
                    jQuery('.form-message-container').html(response);
                    jQuery('.form-message-block').fadeIn(100).css({bottom: '24px'});

                    /* Handle Errors
                    --------------------------------------------------------- */
                    /* Name
                    ----------------------------------------------------- */
                    if (response.match('error-name') !== null) {
                        el.find('.contact-name').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Phone
                    ----------------------------------------------------- */
                    if (response.match('error-phone') !== null) {
                        el.find('.contact-phone').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Call Back Time
                    ----------------------------------------------------- */
                    if (response.match('error-call-back-time') !== null) {
                        el.find('.contact-call-back-time').addClass('error');
                        el.find('.contact-call-back-time').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-call-back-time').removeClass('error');
                        el.find('.contact-call-back-time').next().removeClass('error');
                    }

                    /* Email
                    ----------------------------------------------------- */
                    if (response.match('error-email') !== null) {
                        el.find('.contact-email').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Subject
                    ----------------------------------------------------- */
                    if (response.match('error-subject') !== null) {
                        el.find('.contact-subject').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Message
                    ----------------------------------------------------- */
                    if (response.match('error-message') !== null) {
                        el.find('.contact-message').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Choose a car
                    ----------------------------------------------------- */
                    if (response.match('error-choose-car') !== null) {
                        el.find('.contact-choose-car').addClass('error');
                        el.find('.contact-choose-car').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-choose-car').removeClass('error');
                        el.find('.contact-choose-car').next().removeClass('error');
                    }

                    /* Pick-up Location
                    ----------------------------------------------------- */
                    if (response.match('error-pickup-location') !== null) {
                        el.find('.contact-pickup-location').addClass('error');
                        el.find('.contact-pickup-location').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-pickup-location').removeClass('error');
                        el.find('.contact-pickup-location').next().removeClass('error');
                    }

                    /* Drop-off Location
                    ----------------------------------------------------- */
                    if (response.match('error-dropoff-location') !== null) {
                        el.find('.contact-dropoff-location').addClass('error');
                        el.find('.contact-dropoff-location').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-dropoff-location').removeClass('error');
                        el.find('.contact-dropoff-location').next().removeClass('error');
                    }

                    /* Pick-up Date
                    ----------------------------------------------------- */
                    if (response.match('error-pickup-date') !== null) {
                        el.find('.contact-pickup-date').addClass('error');
                        el.find('.contact-pickup-date').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-pickup-date').removeClass('error');
                        el.find('.contact-pickup-date').next().removeClass('error');
                    }

                    /* Pick-up Time
                    ----------------------------------------------------- */
                    if (response.match('error-pickup-time') !== null) {
                        el.find('.contact-pickup-time').addClass('error');
                        el.find('.contact-pickup-time').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-pickup-time').removeClass('error');
                        el.find('.contact-pickup-time').next().removeClass('error');
                    }

                    /* Drop-off Date
                    ----------------------------------------------------- */
                    if (response.match('error-dropoff-date') !== null) {
                        el.find('.contact-dropoff-date').addClass('error');
                        el.find('.contact-dropoff-date').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-dropoff-date').removeClass('error');
                        el.find('.contact-dropoff-date').next().removeClass('error');
                    }

                    /* Drop-off Time
                    ----------------------------------------------------- */
                    if (response.match('error-dropoff-time') !== null) {
                        el.find('.contact-dropoff-time').addClass('error');
                        el.find('.contact-dropoff-time').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    } else {
                        el.find('.contact-dropoff-time').removeClass('error');
                        el.find('.contact-dropoff-time').next().removeClass('error');
                    }

                    /* Terms
                    ----------------------------------------------------- */
                    if (response.match('error-terms') !== null) {
                        el.find('.contact-terms').next().addClass('error');
                        el.find('button').removeClass('add-spin');
                    }

                    /* Captcha
                    ----------------------------------------------------- */
                    if (response.match('error-captcha') !== null) {
                        el.find('button').removeClass('add-spin');
                    }

                    /* Success
                    --------------------------------------------------------- */
                    if (response.match('success-message') !== null) {

                        el.find('.gfort-recaptcha').remove();
                        el.find('.gfort-new-recaptcha').append('<div class="gfort-recaptcha" id="' + recaptchaID + '"></div>');
                        grecaptcha.render(recaptchaID, {sitekey: gfortRecaptchaSiteKey});

                        el.find('.form-control').val('').removeClass('input-filled');

                        el.find('button').removeClass('add-spin');

                        el.find('.contact-terms').attr('checked', false);
                        el.find('.contact-terms').attr('value', 'accepted');
                        el.find('.contact-terms').next().removeClass('error');
                    }

                });

                return false;

            });

            jQuery(this).find('.form-control').on('focus', function () {
                jQuery(this).next().removeClass('error');
                dismissFormMessagefn();
            });

        });
    }


    /* =========================================================================
    BMI Form
    ========================================================================= */
    if (jQuery('.bmi-form-block').length) {
        jQuery('.bmi-form-block form').each(function (index) {

            jQuery(this).attr('id', 'gfort-bmi-form-block-' + index);

            jQuery('#gfort-bmi-form-block-' + index).submit(function () {

                var el = jQuery(this),
                    formValues = el.serialize(),
                    formActionURL = el.attr('action');

                jQuery.post(formActionURL, formValues, function (response) {

                    /* Form Message
                    --------------------------------------------------------- */
                    if (!jQuery('.form-message-block').length) {
                        jQuery('body').append('<div class="form-message-block"><div class="form-message-container"></div><button type="button" class="form-message-close-button"><i class="fa fa-times"></i></button></div>');
                    }
                    jQuery('.form-message-container').html(response);
                    jQuery('.form-message-block').fadeIn(100).css({bottom: '24px'});

                    /* Handle Errors
                    --------------------------------------------------------- */
                    if (response.match('error-weight') !== null) {
                        el.find('.bim-weight').next().addClass('error');
                    }
                    if (response.match('error-height') !== null) {
                        el.find('.bim-height').next().addClass('error');
                    }

                    /* Success
                    --------------------------------------------------------- */
                    if (response.match('success-message') !== null) {
                        el.find('.bim-weight').next().removeClass('error');
                        el.find('.bim-height').next().removeClass('error');
                        el.find('.bim-weight').val('').removeClass('input-filled');
                        el.find('.bim-height').val('').removeClass('input-filled');
                    }

                });

                return false;

            });

        });
    }


    /* =========================================================================
    Car Reservation Form
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortCar(elAttr, el) {
        jQuery.ajax({
            url: elAttr,
            error: function () {
                el.parents('.section-container').find('.car-block-container').html('Check car file location');
            },
            success: function (response) {

                var carContent = '';

                /* Car Image
                ------------------------------------------------------------- */
                if (response.carImageURL !== '') {
                    carContent += '<div class="image-block"><div class="image-block-container"><img src="' + response.carImageURL + '" alt="Image Block" /></div></div>';
                }

                /* Car Name
                ------------------------------------------------------------- */
                if (response.carName !== '') {
                    carContent += '<h4>' + response.carName + '</h4>';
                }

                /* Car Company
                ------------------------------------------------------------- */
                if (response.carCompany !== '') {
                    carContent += '<h5>' + response.carCompany + '</h5>';
                }

                /* Car Price
                ------------------------------------------------------------- */
                carContent += '<h2>';

                /* Currency
                --------------------------------------------------------- */
                if (response.carPriceCurrency !== '') {
                    carContent += '<span class="currency">' + response.carPriceCurrency + '</span>';
                }

                /* Amount
                --------------------------------------------------------- */
                if (response.carPriceAmount !== '') {
                    carContent += '<span class="amount">' + response.carPriceAmount + '</span>';
                }

                /* Duration
                --------------------------------------------------------- */
                if (response.carPriceDuration !== '') {
                    carContent += '<span class="duration">/' + response.carPriceDuration + '</span>';
                }

                carContent += '</h2>';

                /* Car Description
                ------------------------------------------------------------- */
                if (response.carDescription !== '') {
                    carContent += '<p>' + response.carDescription + '</p>';
                }

                /* Car Features
                ------------------------------------------------------------- */
                carContent += '<ul class="row">';

                /* Doors
                --------------------------------------------------------- */
                if (response.carDoors !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-car"></i>' + response.carDoors + ' Doors</li>';
                }

                /* Passengers
                --------------------------------------------------------- */
                if (response.carPassengers !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-male"></i>' + response.carPassengers + ' Passengers</li>';
                }

                /* Suitcase
                --------------------------------------------------------- */
                if (response.carSuitcase !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-suitcase"></i>' + response.carSuitcase + ' Suitcase(s)</li>';
                }

                /* Bag
                --------------------------------------------------------- */
                if (response.carBag !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-shopping-bag"></i>' + response.carBag + ' Bag(s)</li>';
                }

                /* Transmission
                --------------------------------------------------------- */
                if (response.carTransmission !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-sliders"></i>' + response.carTransmission + ' Transmission</li>';
                }

                /* Air Conditioning
                --------------------------------------------------------- */
                if (response.carAirConditioning !== '') {
                    carContent += '<li class="col-md-6 col-sm-6"><i class="fa fa-asterisk"></i>Air conditioning ' + response.carAirConditioning + '</li>';
                }

                carContent += '</ul>';

                el.parents('.section-container').find('.car-block-container').html(carContent);

            }
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '[data-car-file]', function () {
        gfortCar(jQuery(this).attr('data-car-file'), jQuery(this));
    });


    /* =========================================================================
    Form Elements
    ========================================================================= */
    /* input
    ========================================================================= */
    jQuery('.form-control').each(function () {
        jQuery(this).on({
            focus: function () {
                jQuery(this).addClass('input-filled');
            },
            focusout: function () {
                if (jQuery(this).val() === '') {
                    jQuery(this).removeClass('input-filled');
                }
            }
        });
    });


    /* Checkbox
    ========================================================================= */
    if (jQuery('input[type="checkbox"]').length) {
        jQuery('input[type="checkbox"]').each(function (index) {
            jQuery(this).attr('id', 'gfort-checkbox-' + index);
            jQuery(this).next('label').attr('for', 'gfort-checkbox-' + index);
        });
    }


    /* Recaptcha
    ========================================================================= */
    if (jQuery('.gfort-recaptcha').length) {
        jQuery.getScript('https://www.google.com/recaptcha/api.js', function () {
            gfortRecaptchaSiteKey = recaptchaSiteKey;
        });
    }


    /* Select
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortSelectfn() {
        jQuery('select').each(function (index) {
            jQuery(this).attr('id', 'gfort-select-' + index);
            jQuery('#gfort-select-' + index).gfortSelect();

            /* Price
            ----------------------------------------------------------------- */
            if (jQuery('[selected][data-price-amount]').length) {
                jQuery('[selected][data-price-amount]').each(function () {
                    jQuery(this).parents('.pricing-block-price').find('.amount').html(jQuery(this).parent().find('.selected').attr('data-price-amount'));
                });
            }

            /* Car
            ----------------------------------------------------------------- */
            if (jQuery('[selected][data-car-file]').length) {
                jQuery('[selected][data-car-file]').each(function () {
                    gfortCar(jQuery(this).attr('data-car-file'), jQuery(this));
                });
            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('select').length) {
        jQuery.getScript('js/plugins/gfortSelect/gfortSelect.min.js', function () {
            gfortSelectfn();
        });
    }


    /* =========================================================================
    Video
    ========================================================================= */
    /* Background Video
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function backgroundVideofn() {
        jQuery('.background-video-block video').each(function () {

            var elWidth = 16,
                elHeight = 9,
                el = jQuery(this),
                elParent = el.parent(),
                parentWidth = elParent.outerWidth(true),
                parentHeight = elParent.outerHeight(true),
                widthRatio = parentWidth / elWidth,
                heightRatio = parentHeight / elHeight,
                ratio = widthRatio > heightRatio
                    ? widthRatio
                    : heightRatio,
                elNewWidth = ratio * elWidth,
                elNewHeight = ratio * elHeight,
                elMarginLeft = (elNewWidth - parentWidth) / -2,
                elMarginTop = (elNewHeight - parentHeight) / -2;

            el.css({
                width: elNewWidth,
                height: elNewHeight,
                marginTop: elMarginTop,
                marginLeft: elMarginLeft
            });

        });
    }

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        backgroundVideofn();
    });

    /* Buttons
    ------------------------------------------------------------------------- */
    jQuery('.background-video-block').each(function (index) {

        var el = jQuery(this);
        el.find('video').attr('id', 'gfort-bg-video-' + index);

        if (el.find('video[autoplay]').length) {
            el.find('.video-overlayer').remove();
            el.find('button.play-button').html('<i class="fa fa-pause"></i>');
        } else {
            el.find('button.play-button').html('<i class="fa fa-play"></i>');
        }

        if (el.find('video[muted]').length) {
            el.find('button.mute-button').html('<i class="fa fa-volume-off"></i>');
        } else {
            el.find('button.mute-button').html('<i class="fa fa-volume-up"></i>');
        }

    });

    /* Play, Pause and Mute Buttons
    ------------------------------------------------------------------------- */
    jQuery('.background-video-block button').on('click', function () {

        var el = jQuery(this),
            videoOverlayer = el.parents('.background-video-block').find('.video-overlayer'),
            videoID = jQuery('#' + el.parents('.background-video-block').find('video').attr('id'))[0];

        if (el.hasClass('play-button')) {
            if (videoID.paused) {
                videoID.play();
                videoOverlayer.css({display: 'none'});
                el.html('<i class="fa fa-pause"></i>');
            } else {
                videoID.pause();
                el.html('<i class="fa fa-play"></i>');
            }
        }

        if (el.hasClass('mute-button')) {
            if (videoID.muted) {
                videoID.muted = false;
                el.html('<i class="fa fa-volume-up"></i>');
            } else {
                videoID.muted = true;
                el.html('<i class="fa fa-volume-off"></i>');
            }
        }

    });

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.background-video-block').length) {
        backgroundVideofn();
    }


    /* Normal Video
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortFitVidfn() {
        jQuery('.video-block').fitVids();
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.video-block').length) {
        jQuery.getScript('js/plugins/fitvids/jquery.fitvids.min.js', function () {
            gfortFitVidfn();
        });
    }


    /* =========================================================================
    Fancybox
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortFancyBoxfn() {
        jQuery('.fancybox').fancybox({
            nextEffect: 'none',
            prevEffect: 'none',
            openEffect: 'elastic',
            closeEffect: 'elastic',
            helpers: {
                title: {
                    type: 'inside'
                },
                media: {}
            },
            afterShow: function () {
                jQuery('<a href="javascript:void(0)" title="View Full Size" class="expander"></a>').appendTo(this.inner).on('click', function () {
                    jQuery.fancybox.toggle();
                });
            }
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.fancybox').length) {
        jQuery.getScript('js/plugins/fancybox/jquery.fancybox.pack.js', function () {
            jQuery.getScript('js/plugins/fancybox/helpers/jquery.fancybox-media.min.js', function () {
                gfortFancyBoxfn();
            });
        });
    }


    /* =========================================================================
    Share Buttons
    ========================================================================= */
    /* Facebook
    ------------------------------------------------------------------------- */
    if (jQuery('.facebook-btn-share').length) {
        jQuery('.facebook-btn-share').each(function () {
            jQuery(this).attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href);
        });
    }

    /* Twitter
    ------------------------------------------------------------------------- */
    if (jQuery('.twitter-btn-share').length) {
        jQuery('.twitter-btn-share').each(function () {
            jQuery(this).attr('href', 'https://twitter.com/home?status=' + window.location.href + ' ' + jQuery(document).find('title').text());
        });
    }

    /* Google Plus
    ------------------------------------------------------------------------- */
    if (jQuery('.google-btn-share').length) {
        jQuery('.google-btn-share').each(function () {
            jQuery(this).attr('href', 'https://plus.google.com/share?url=' + window.location.href);
        });
    }

    /* Current Page URL
    ------------------------------------------------------------------------- */
    if (jQuery('.page-link').length) {
        jQuery('.page-link').each(function () {
            jQuery(this).val(window.location.href);
        });
        jQuery('.page-link').on('click', function () {
            jQuery(this).select();
        });
    }


    /* =========================================================================
    Progress Bar
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortProgressfn() {
        jQuery('.progress-block').each(function (index) {

            jQuery(this).attr('id', 'gfort-progress-bar-block-' + index);

            progressBarBlockArray[index] = new Waypoint({
                element: jQuery('#gfort-progress-bar-block-' + index),
                handler: function () {

                    var goalValue,
                        neededValue,
                        skillsValue,
                        currentValue,
                        percentValue,
                        el = jQuery(this.element);

                    /* Value ( Donate Progress Bar )
                    --------------------------------------------------------- */
                    if (el.find('.current-value').length) {

                        goalValue = el.find('.goal-value').text();
                        goalValue = goalValue.match(/(\d+)/g);
                        goalValue = parseInt(goalValue, 10);

                        currentValue = el.find('.current-value').text();
                        currentValue = currentValue.match(/(\d+)/g);
                        currentValue = parseInt(currentValue, 10);

                        percentValue = (currentValue / goalValue) * 100;
                        percentValue = parseInt(percentValue, 10);

                        /* Progress Bar Width
                        ------------------------------------------------- */
                        if (percentValue > 100) {
                            el.find('.progress-bar').css({width: '100%'});
                        } else {
                            el.find('.progress-bar').css({width: percentValue + '%'});
                        }

                        /* Start Value
                        ------------------------------------------------- */
                        el.find('.start-value').html(percentValue + '%');

                        /* Goal Value
                        ------------------------------------------------- */
                        el.find('.donate-value-goal h3').html(goalValue);

                        /* Collected Value
                        ------------------------------------------------- */
                        el.find('.donate-value-current h3').html(currentValue);

                        /* Percent
                        ------------------------------------------------- */
                        el.find('.donate-value-percent h3').html(percentValue + '%');

                        /* Needed Value
                        ------------------------------------------------- */
                        if (currentValue > goalValue) {
                            neededValue = 0;
                        } else {
                            neededValue = goalValue - currentValue;
                        }
                        el.find('.donate-value-needed h3').html(neededValue);

                        /* Donation Symbol Position
                        ------------------------------------------------- */
                        if (donationSymbolPosition === 'right') {
                            el.find('.goal-value').html(goalValue + donationSymbol);
                            el.find('.current-value').html(currentValue + donationSymbol);
                            el.find('.donate-value-goal h3').append(donationSymbol);
                            el.find('.donate-value-current h3').append(donationSymbol);
                            el.find('.donate-value-needed h3').append(donationSymbol);
                        } else {
                            el.find('.goal-value').html(donationSymbol + goalValue);
                            el.find('.current-value').html(donationSymbol + currentValue);
                            el.find('.donate-value-goal h3').prepend(donationSymbol);
                            el.find('.donate-value-current h3').prepend(donationSymbol);
                            el.find('.donate-value-needed h3').prepend(donationSymbol);
                        }

                        /* Goal Value
                        ------------------------------------------------- */
                        el.find('.goal-value').html(
                            el.find('.current-value').html() + ' of ' + el.find('.goal-value').html()
                        );

                    }

                    /* Percent ( Skills Progress Bar )
                    --------------------------------------------------------- */
                    if (el.find('.current-percent').length) {

                        skillsValue = el.find('.current-percent').text();
                        skillsValue = skillsValue.match(/(\d+)/g);
                        skillsValue = parseInt(skillsValue, 10);

                        if (skillsValue > 100) {
                            el.find('.progress-bar').css({width: '100%'});
                        } else {
                            el.find('.progress-bar').css({width: skillsValue + '%'});
                        }

                    }

                    progressBarBlockArray[index].destroy();

                },
                offset: '100%'
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.progress-block').length) {
        jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
            gfortProgressfn();
        });
    }


    /* =========================================================================
    Audio
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortAudiofn() {
        jQuery('audio').mediaelementplayer();
        jQuery('.audio-block').each(function () {

            var el = jQuery(this).find('source');

            if (el.attr('data-song-name')) {
                songDetails = el.attr('data-song-name');
                if (el.attr('data-author-name')) {
                    songDetails += ' By ';
                    songDetails += el.attr('data-author-name');
                }
                el.parents('.mejs-container').find('.mejs-controls').append('<h4>' + songDetails + '</h4>');
            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('audio').length) {
        jQuery.getScript('js/plugins/mediaelement/js/mediaelement-and-player.min.js', function () {
            gfortAudiofn();
        });
    }


    /* =========================================================================
    Timer ( CountDown )
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortTimerfn() {
        jQuery('.timer-block').each(function () {

            var el = jQuery(this),
                yearTimer = el.attr('data-timer-year'),
                monthTimer = el.attr('data-timer-month'),
                dayTimer = el.attr('data-timer-day'),
                hourTimer = el.attr('data-timer-hour'),
                minTimer = el.attr('data-timer-min');

            el.downCount({
                date: monthTimer + '/' + dayTimer + '/' + yearTimer + ' ' + hourTimer + ':' + minTimer + ':' + '00',
                offset: localZoneTime
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.timer-block').length) {
        jQuery.getScript('js/plugins/downCount/jquery.downCount.min.js', function () {
            gfortTimerfn();
        });
    }


    /* =========================================================================
    Google Map
    ========================================================================= */
    /* Markers Function
    ------------------------------------------------------------------------- */
    function mapMarkersfn(currentMapIndex) {

        var mapMarkersLocation,
            mapJSONFileLocation = jQuery('#gfort-gmap-block-' + currentMapIndex).attr('data-marker-file-location');

        jQuery.ajax({
            url: mapJSONFileLocation,
            success: function (response) {

                mapMarkersLocation = response.locations;

                var mapMarkers = [],
                    infoWindowBox = [],
                    infoWindowContent,
                    infoWindowOptions,
                    infoWindowContentSwape;

                jQuery.each(mapMarkersLocation, function (index, response) {

                    mapMarkers[index] = new google.maps.Marker({
                        icon: response.markerImage,
                        position: new google.maps.LatLng(response.markerLocation[0], response.markerLocation[1])
                    });
                    mapMarkers[index].setMap(elCurrentMap[currentMapIndex]);

                    infoWindowContent = document.createElement('div');

                    if (response.URL === '') {
                        response.URL = '#';
                    }

                    /* Realestate infoWindow Content
                    --------------------------------------------------------- */
                    if (jQuery('#gfort-gmap-block-' + currentMapIndex).hasClass('realestate-gmap')) {

                        infoWindowContentSwape = '<div class="infoWindow-block-container"><a href="' + response.URL + '" title="' + response.title + '" class="main-link">';

                        if (response.image !== '') {
                            infoWindowContentSwape += '<div class="image-block"><div class="image-block-container"><img src="' + response.image + '" alt="' + response.title + '" /><div class="ribbon-block ribbon-block-style-2"><h4>' + response.status + '</h4></div><div class="ribbon-block ribbon-block-style-1 ribbon-bottom-right"><p>' + response.price + '</p></div></div></div><h4>' + response.title + '</h4><p>' + response.address + '</p></a></div>';
                        } else {
                            infoWindowContentSwape += '<h4>' + response.title + '</h4><p>' + response.address + '</p></a></div>';
                        }

                        infoWindowContent.innerHTML = infoWindowContentSwape;

                    }

                    /* Contact infoWindow Content
                    --------------------------------------------------------- */
                    if (jQuery('#gfort-gmap-block-' + currentMapIndex).hasClass('contact-gmap')) {

                        infoWindowContentSwape = '<div class="infoWindow-block-container"><a href="' + response.URL + '" title="' + response.title + '" class="main-link">';

                        if (response.image !== '') {
                            infoWindowContentSwape += '<div class="image-block"><div class="image-block-container"><img src="' + response.image + '" alt="' + response.title + '" /></div></div><h4>' + response.title + '</h4><p>' + response.description + '</p></a></div>';
                        } else {
                            infoWindowContentSwape += '<h4>' + response.title + '</h4><p>' + response.description + '</p></a></div>';
                        }

                        infoWindowContent.innerHTML = infoWindowContentSwape;

                    }

                    /* infoWindow Options
                    --------------------------------------------------------- */
                    infoWindowOptions = {
                        zIndex: 80,
                        maxWidth: 320,
                        alignBottom: true,
                        closeBoxMargin: '0',
                        disableAutoPan: false,
                        content: infoWindowContent,
                        enableEventPropagation: true,
                        boxClass: 'col-md-12 infoWindow-block',
                        pixelOffset: new google.maps.Size(-100, 0),
                        infoBoxClearance: new google.maps.Size(1, 1),
                        closeBoxURL: "js/plugins/infobox/close.png"
                    };

                    infoWindowBox[index] = new InfoBox(infoWindowOptions);

                    google.maps.event.addListener(mapMarkers[index], 'click', function () {
                        var i;
                        for (i = 0; i < mapMarkers.length; i += 1) {
                            infoWindowBox[i].close();
                        }
                        infoWindowBox[index].open(elCurrentMap[currentMapIndex], this);
                    });

                });

            }
        });

    }

    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortGMapfn() {
        jQuery('.gmap-block').each(function (index) {

            var elMapOptions,
                el = jQuery(this),
                elUndefinedMarker,
                elndefinedMarkerimage,
                elJSONLoaction = el.attr('data-marker-file-location'),
                elMapLatLng = new google.maps.LatLng(el.attr('data-lat'), el.attr('data-lng'));

            el.attr('id', 'gfort-gmap-block-' + index);

            elMapOptions = {
                zoom: 16,
                panControl: false,
                scrollwheel: false,
                center: elMapLatLng,
                mapTypeControl: true
            };

            elCurrentMap[index] = new google.maps.Map(document.getElementById('gfort-gmap-block-' + index), elMapOptions);

            if (elJSONLoaction === undefined) {
                elndefinedMarkerimage = 'images/markers/marker-5.png';
                elUndefinedMarker = new google.maps.Marker({
                    position: elMapLatLng,
                    icon: elndefinedMarkerimage
                });
                elUndefinedMarker.setMap(elCurrentMap[index]);
            } else {
                mapMarkersfn(index);
            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.gmap-block').length) {
        jQuery.getScript('https://maps.googleapis.com/maps/api/js?key=' + googleMapAPIKey, function () {
            jQuery.getScript('js/plugins/infobox/infobox_packed.js', function () {
                gfortGMapfn();
            });
        });
    }


    /* =========================================================================
    Background Portfolio Grid
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortBackgroundPortfoliofn() {
        jQuery('.background-portfolio-grid-container').each(function () {
            var imageWidthHeight = 800 / 600;
            jQuery(this).gridrotator({
                step: 1,
                rows: 3,
                columns: 4,
                interval: 1000,
                animSpeed: 1000,
                animType: 'fadeInOut',
                imageRatio: imageWidthHeight,
                w1024: {rows: 4, columns: 3},
                w768: {rows: 4, columns: 2},
                w480: {rows: 4, columns: 1},
                w320: {rows: 4, columns: 1},
                w240: {rows: 4, columns: 1}
            });
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.background-portfolio-grid').length) {
        jQuery.getScript('js/plugins/gridrotator/jquery.gridrotator.min.js', function () {
            gfortBackgroundPortfoliofn();
        });
    }


    /* =========================================================================
    Schedule Tabs
    ========================================================================= */
    if (jQuery('.schedule-tab-block').length) {
        jQuery('.schedule-tab-block').each(function () {

            var linkID,
                el = jQuery(this),
                currentDate = new Date(),
                getCurrentDay = scheduleWeekDay[currentDate.getDay()];

            el.find('.nav-tabs a').each(function () {
                jQuery(this).parent().removeClass('active');
                if (jQuery(this).text().toLowerCase() === getCurrentDay.toLowerCase()) {
                    jQuery(this).parent().addClass('active');
                    linkID = jQuery(this).attr('href').replace('#', '');
                }
            });

            el.find('.tab-content .tab-pane').each(function () {
                jQuery(this).removeClass('active');
                if (jQuery(this).attr('id').toLowerCase() === linkID.toLowerCase()) {
                    jQuery(this).addClass('active in');
                }
            });

        });
    }


    /* =========================================================================
    Events Table
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function eventsTablefn(currentEventsTable) {

        clearTimeout(eventsTableTimer);

        var currentTableEL = jQuery('#gfort-events-table-' + currentEventsTable);

        jQuery.ajax({
            url: currentTableEL.attr('data-events-file-location'),
            error: function () {
                currentTableEL.find('.ui-datepicker-header').append('<div class="gfort-events-month-badge"><span>Failed to get the events check json file location</span></div>');
            },
            success: function (response) {

                var eventsTableList,
                    allEvents = response.allEvents;

                currentTableEL.find('.events-table-list .row').remove();
                eventsTableList = '<div class="row"><div class="events-table-list-container">';

                /* Get all events from JSON file
                ------------------------------------------------------------- */
                jQuery.each(allEvents, function (index, response) {

                    var eventDay = response.eventDay,
                        eventMonth = response.eventMonth,
                        eventYear = response.eventYear,
                        eventTime = response.eventTime,
                        eventTitle = response.eventTitle,
                        eventURL = response.eventURL;

                    index += 1;

                    eventsTableCurrentYear = parseInt(eventsTableCurrentYear, 10);
                    eventYear = parseInt(eventYear, 10);

                    eventsTableCurrentMonth = parseInt(eventsTableCurrentMonth, 10);
                    eventMonth = parseInt(eventMonth, 10);

                    if (eventsTableCurrentYear === eventYear) {
                        if (eventsTableCurrentMonth === eventMonth) {
                            currentTableEL.find('.ui-datepicker-calendar td a').each(function () {

                                if (jQuery(this).text() === eventDay) {

                                    totalEvents += 1;
                                    jQuery(this).addClass('has-event');

                                    eventsTableList += '<div class="content-block" data-event-day="' + eventDay + '">';

                                    eventsTableList += '<div class="content-block-container"><a href="' + eventURL + '" title="' + eventTitle + '" target="_blank"><h6>' + eventTitle + '</h6><div class="date-block"><div class="date-block-container"><span>' + eventDay + ' / ' + eventMonth + ' / ' + eventYear + '</span><span> - </span><span>' + eventTime + '</span></div></div></a></div>';

                                    eventsTableList += '</div>';

                                }

                            });
                        }
                    }

                });

                eventsTableList += '</div></div>';
                currentTableEL.find('.events-table-list').append(eventsTableList);

                /* Append Month badge
                ------------------------------------------------------------- */
                if (totalEvents === 1) {
                    currentTableEL.find('.ui-datepicker-header').append('<div class="gfort-events-month-badge"><span>' + totalEvents + ' event</span></div>');
                } else if (totalEvents === 0) {
                    currentTableEL.find('.ui-datepicker-header').append('<div class="gfort-events-month-badge"><span>No events this month</span></div>');
                } else {
                    currentTableEL.find('.ui-datepicker-header').append('<div class="gfort-events-month-badge"><span>' + totalEvents + ' events</span></div>');
                }
                totalEvents = 0;

                /* Click on Month badge
                ------------------------------------------------------------- */
                jQuery('.gfort-events-month-badge span').on('click', function () {

                    delayTime = 0;

                    var eventsTableBlock = jQuery(this).parents('.events-table-block');
                    eventsTableBlock.find('.content-block').each(function () {
                        jQuery(this).hide().css({
                            top: '100px',
                            opacity: '0'
                        });
                    });
                    eventsTableBlock.find('.events-table-list').addClass('correct-position');
                    eventsTableBlock.find('.events-table-list-close').addClass('correct-position');
                    eventsTableBlock.find('.highlight-event-day').removeClass('highlight-event-day');

                    eventsTableTimer = setTimeout(function () {
                        eventsTableBlock.find('.content-block').each(function (index) {
                            jQuery(this).show().delay(delayTime).animate({
                                top: '0',
                                opacity: '1'
                            }, 400);
                            delayTime = (index + 1) * 100;
                        });
                    }, 300);

                });

            }
        });

    }

    /* Main Configuration
    ------------------------------------------------------------------------- */
    if (jQuery('.events-table-block').length) {
        eventsTableTimer = setTimeout(function () {
            jQuery('.events-table-block').each(function (index) {

                var el = jQuery(this);
                el.attr('id', 'gfort-events-table-' + index);

                /* Configuration
                ------------------------------------------------------------- */
                jQuery('#gfort-events-table-' + index).datepicker({
                    minDate: 'today',
                    nextText: 'Next',
                    prevText: 'Previous',
                    dateFormat: 'd/m/yy',
                    showOtherMonths: true,
                    hideIfNoPrevNext: true,
                    firstDay: eventsTableStartDay,
                    dayNamesMin: eventsTableWeekDay,
                    onSelect: function (dayDate, instant) {

                        instant.inline = false;

                        dayDate = jQuery(this).datepicker('getDate');
                        var selectedDay = dayDate.getDate();

                        el.find('.highlight-event-day').removeClass('highlight-event-day');
                        if (el.find('a').hasClass('ui-state-hover')) {
                            jQuery('.ui-state-hover').addClass('highlight-event-day');
                        }

                        /* Events
                        ----------------------------------------------------- */
                        el.find('.events-table-list-container .content-block').each(function () {
                            jQuery(this).hide().css({
                                top: '100px',
                                opacity: '0'
                            });
                        });

                        if (el.find('a.has-event').hasClass('highlight-event-day')) {

                            el.find('.events-table-list').addClass('correct-position');
                            el.find('.events-table-list-close').addClass('correct-position');

                            eventsTableTimer = setTimeout(function () {

                                el.find('.content-block[data-event-day="' + selectedDay + '"]').each(function (index) {
                                    jQuery(this).show().delay(delayTime).animate({
                                        top: '0',
                                        opacity: '1'
                                    }, 400);
                                    delayTime = (index + 1) * 100;
                                });

                            }, 300);

                        } else {

                            el.find('.events-table-list').removeClass('correct-position');
                            el.find('.events-table-list-close').removeClass('correct-position');

                        }

                        delayTime = 0;

                    },
                    onChangeMonthYear: function (currentYearDate, currentMonthDate) {

                        el.find('.events-table-list.correct-position').removeClass('correct-position');
                        el.find('.events-table-list-close.correct-position').removeClass('correct-position');
                        eventsTableCurrentYear = currentYearDate;
                        eventsTableCurrentMonth = currentMonthDate;
                        eventsTablefn(index);

                    }
                });

                jQuery('> div.ui-datepicker', el).wrap('<div class="events-table-block-container"></div>');
                jQuery('> div.events-table-block-container', el).append('<div class="events-table-list"></div>');
                jQuery('> div.events-table-block-container', el).append('<div class="events-table-list-close"><i class="fa fa-times"></i></div>');

                eventsTableCurrentMonth = el.datepicker('getDate').getMonth() + 1;
                eventsTableCurrentYear = el.datepicker('getDate').getFullYear();

                eventsTablefn(index);

            });
        }, 300);
    }

    /* Close Events List
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '.events-table-list-close', function () {
        jQuery(this).removeClass('correct-position');
        jQuery(this).parent().find('.events-table-list').removeClass('correct-position');
        jQuery(this).parent().find('.highlight-event-day').removeClass('highlight-event-day');
    });


    /* =========================================================================
    Date Picker
    ========================================================================= */
    if (jQuery('.date-picker').length) {
        jQuery('.date-picker').datepicker({
            minDate: 'today',
            nextText: 'Next',
            prevText: 'Previous',
            dateFormat: 'dd/mm/yy',
            showOtherMonths: true,
            hideIfNoPrevNext: true,
            beforeShow: function () {
                jQuery('#ui-datepicker-div').appendTo(jQuery(this).parent());
            },
            onSelect: function () {
                jQuery(this).parent().find('.date-picker').addClass('input-filled');
            }
        });
    }


    /* =========================================================================
    Filter
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortIsotopefn() {
        jQuery('body').on('click', '[data-filter]', function () {

            var el = jQuery(this),
                filterItemsWrapper,
                filterGroupValue = '',
                filterValue = el.attr('data-filter');

            el.parents('.filter-group').attr('data-filter-group', filterValue);
            el.parents('.filter-block').find('.filter-group').each(function () {
                filterGroupValue += jQuery(this).attr('data-filter-group');
            });

            filterItemsWrapper = el.parents('.filter-section').find('.filter-items-wrapper').attr('id');
            jQuery('#' + filterItemsWrapper).isotope({
                filter: filterGroupValue
            });

        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.filter-items-wrapper').length) {
        jQuery.getScript('js/plugins/isotope/isotope.pkgd.min.js', function () {
            gfortIsotopefn();
        });
    }

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        if (jQuery('.filter-items-wrapper').length) {
            jQuery('.filter-items-wrapper').each(function () {
                jQuery('#' + jQuery(this).attr('id')).isotope('layout');
            });
        }
    });


    /* =========================================================================
    Portfolio PhotoStack
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortPhotoStackfn() {
        jQuery('.photostack-block').each(function (index) {
            jQuery(this).attr('id', 'gfort-photostack-block-' + index);
            var portfolioStack = document.getElementById('gfort-photostack-block-' + index);
            portfolioStack = new Photostack(portfolioStack);
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.photostack-block').length) {
        jQuery.getScript('js/plugins/photostack/classie.min.js', function () {
            jQuery.getScript('js/plugins/photostack/photostack.min.js', function () {
                gfortPhotoStackfn();
            });
        });
    }


    /* =========================================================================
    tooltip
    ========================================================================= */
    jQuery('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });


    /* =========================================================================
    popover
    ========================================================================= */
    /* Team Block
    ------------------------------------------------------------------------- */
    jQuery('a.team-popover').popover({
        html: true,
        container: 'body',
        template: '<div class="popover team-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });

    /* General
    ------------------------------------------------------------------------- */
    jQuery('[data-toggle="popover"]').popover({
        html: true,
        container: 'body'
    });


    /* =========================================================================
    Pricing Table
    ========================================================================= */
    /* Select
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '[data-price-amount]', function () {
        jQuery(this).parents('.pricing-block-price').find('.amount').html(jQuery(this).attr('data-price-amount'));
    });

    /* Wide
    ------------------------------------------------------------------------- */
    if (jQuery('.pricing-block.wide-block').length) {
        jQuery('.pricing-block.wide-block').each(function () {
            jQuery(this).parent('.pricing-tables-wrapper').addClass('correct-border');
        });
    }


    /* =========================================================================
    Instagram
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortInstafn() {
        jQuery('.instagram-feed-block').each(function (index) {

            jQuery(this).attr('id', 'gfort-instagram-feed-block-' + index);

            jQuery('#gfort-instagram-feed-block-' + index).gfortInsta({
                limit: 8,
                userID: instagramUserID,
                accessToken: instagramAccessToken
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.instagram-feed-block').length) {
        jQuery.getScript('js/plugins/gfortInsta/gfortInsta.min.js', function () {
            gfortInstafn();
        });
    }


    /* =========================================================================
    Flickr Feed
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortFlickrfn() {
        jQuery('.flickr-feed-block').each(function (index) {

            jQuery(this).attr('id', 'gfort-flickr-feed-block-' + index);

            jQuery('#gfort-flickr-feed-block-' + index).jflickrfeed({
                limit: 8,
                qstrings: {
                    id: flickrUserID
                },
                itemTemplate: '<a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_q}}" alt="{{title}}" /></a>'
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.flickr-feed-block').length) {
        jQuery.getScript('js/plugins/flickr/jflickrfeed.min.js', function () {
            gfortFlickrfn();
        });
    }


    /* =========================================================================
    Twitter Feed
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortTwitterfn() {
        jQuery('.twitter-feed-block').twittie({
            count: 2,
            dateFormat: '%d %b %Y',
            username: 'graphicfort',
            loadingText: 'Loading ...',
            apiPath: 'js/plugins/tweetie/api/tweet.php',
            template: '<div class="twitter-avatar"><a href="https://twitter.com/{{user_name}}" title="{{user_name}}" target="_blank">{{avatar}}</a><span><a href="https://twitter.com/{{user_name}}" title="{{user_name}}" target="_blank">@{{user_name}}</a></span></div><div class="twitter-tweet"><p>{{tweet}}</p></div><div class="twitter-date-buttons"><div class="twitter-date"><a href="{{url}}" target="_blank">{{date}}</a></div><div class="twitter-buttons"><a href="https://twitter.com/intent/tweet?in_reply_to={{tweet_id}}" title="Reply" target="_blank"><i class="fa fa-reply"></i><span>Reply</span></a><a href="https://twitter.com/intent/retweet?tweet_id={{tweet_id}}" title="Retweet" target="_blank"><i class="fa fa-retweet"></i><span>Retweet</span></a><a href="https://twitter.com/intent/favorite?tweet_id={{tweet_id}}" title="Favourite" target="_blank"><i class="fa fa-star"></i><span>Favourite</span></a></div></div><div class="twitter-follow"><a href="https://twitter.com/intent/follow?original_referer=&screen_name=graphicfort" target="_blank" class="btn btn-gfort wave-effect"><i class="fa fa-twitter"></i><span>Follow</span></a></div>'
        }, function () {

            /* Slider
            ----------------------------------------------------------------- */
            if (jQuery('.twitter-feed-block').hasClass('twitter-slider')) {

                jQuery('.twitter-slider').each(function (index) {

                    var el = jQuery(this);
                    el.attr('id', 'gfort-twitter-slider-' + index);

                    /* Replace ul and li with slider divs
                    --------------------------------------------------------- */
                    el.find('ul.gfort-twitter-list').wrap('<div class="swiper-wrapper"/>').contents().unwrap();
                    el.find('li.gfort-twitter-item').each(function () {
                        jQuery(this).wrap('<div class="swiper-slide"><div class="gfort-twitter-item"></div></div>').contents().unwrap();
                    });

                    /* Pagination
                    --------------------------------------------------------- */
                    el.append('<div class="swiper-pagination" id="gfort-twitter-swiper-pagination-' + index + '"></div>');

                    /* Slider Configurations
                    --------------------------------------------------------- */
                    jQuery('#gfort-twitter-slider-' + index).swiper({
                        loop: true,
                        speed: 800,
                        autoplay: 5000,
                        effect: 'slide',
                        slidesPerView: 1,
                        grabCursor: false,
                        simulateTouch: false,
                        centeredSlides: false,
                        direction: 'horizontal',
                        paginationClickable: true,
                        autoplayDisableOnInteraction: false,
                        pagination: '#gfort-twitter-swiper-pagination-' + index
                    });

                    /* Hover
                    ----------------------------------------------------------------- */
                    jQuery('#gfort-twitter-slider-' + index).on({
                        mouseenter: function () {
                            jQuery(this)[0].swiper.stopAutoplay();
                        },
                        mouseleave: function () {
                            jQuery(this)[0].swiper.startAutoplay();
                        }
                    });

                });

            }
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.twitter-feed-block').length) {
        jQuery.getScript('js/plugins/tweetie/tweetie.js', function () {
            if (jQuery('.twitter-feed-block').hasClass('twitter-slider')) {
                jQuery.getScript('js/plugins/swiper/js/swiper.min.js');
            }
            gfortTwitterfn();
        });
    }


    /* =========================================================================
    Blocks Height
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortMatchHeightfn() {

        jQuery('.content-block:not(.content-block-style-2)').each(function () {
            jQuery(this).parent().find('.content-block-container').matchHeight();
        });

        jQuery('.event-block').each(function () {
            jQuery(this).parent().find('.event-block-container').matchHeight();
        });

        jQuery('.audio-block').each(function () {
            jQuery(this).parent().find('.audio-block-container').matchHeight();
        });

        jQuery('.team-block').each(function () {
            jQuery(this).parent().find('.team-block-container').matchHeight();
        });

        jQuery('.portfolio-block:not(.isotope-item)').each(function () {
            jQuery(this).parent().find('.portfolio-block-container').matchHeight();
        });

        jQuery('.client-block').each(function () {
            jQuery(this).parent().find('.client-block-container').matchHeight();
        });

        jQuery('.testimonials-block').each(function () {
            jQuery(this).parent().find('.testimonials-block-container').matchHeight();
        });

        jQuery('.pricing-block').each(function () {
            jQuery(this).parent().find('.pricing-block-container').matchHeight();
        });

        jQuery('.counter-block').each(function () {
            jQuery(this).parent().find('.counter-block-container').matchHeight();
        });

        jQuery('.faq-block').each(function () {
            jQuery(this).parent().find('.faq-block-container').matchHeight();
        });

        jQuery('.contact-block').each(function () {
            jQuery(this).parent().find('.contact-block-container').matchHeight();
        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (blocksAtSameHeight === true) {
        jQuery.getScript('js/plugins/matchHeight/jquery.matchHeight.min.js', function () {
            gfortMatchHeightfn();
        });
    }


    /* =========================================================================
    Smooth Scroll
    ========================================================================= */
    if (pageSmoothScroll === true) {
        jQuery.getScript('js/plugins/smoothscroll/smoothscroll.min.js');
    }


    /* =========================================================================
    Parallax Effect
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function parallaxEffectfn(parallaxEffect) {
        jQuery('.parallax-effect').each(function () {

            var el = jQuery(this),
                elImage = jQuery('> img', el),
                elHeight = el.outerHeight(true),
                scrollTop = jQuery(window).scrollTop(),
                elOffsetBottom = el.offset().top + elHeight,
                windowHeight = jQuery(window).outerHeight(true),
                parallaxPixel = (el.offset().top - scrollTop) * 0.30,
                differenceHeight = elImage.outerHeight(true) - elHeight;

            if (parallaxEffect !== false) {
                elImage.css({top: -differenceHeight / 2});
            }

            if ((elOffsetBottom > scrollTop) && (el.offset().top < (scrollTop + windowHeight))) {
                elImage.css({transform: 'translate(-50%,' + -parallaxPixel + 'px)'});
            }

        });
    }


    /* =========================================================================
    Check if it's a Mobile Device
    ========================================================================= */
    if (jQuery.browser.mobile) {

        /* Remove Transition From Links
        --------------------------------------------------------------------- */
        jQuery('a').each(function () {
            jQuery(this).addClass('no-transition');
        });

    } else {

        /* Transition Between Pages
        --------------------------------------------------------------------- */
        jQuery('#main-wrapper').css({
            opacity: '1'
        });

        /* Parallax Effect ( Condition )
        --------------------------------------------------------------------- */
        if (parallaxEffect === true) {
            jQuery(window).scroll(function () {
                parallaxEffectfn(false);
            });
            parallaxEffectfn();
        }

    }

});




/* =============================================================================
Window Load Function
============================================================================= */
jQuery(window).load(function () {

    'use strict';

    var filterItemsWrapper;


    /* =========================================================================
    Loader Block
    ========================================================================= */
    jQuery('.loader-block').fadeOut(300);


    /* =========================================================================
    Slider Height
    ========================================================================= */
    jQuery('.swiper-container-horizontal').each(function () {
        var el = jQuery(this);
        el.css({height: '100%'});
        el.css({height: el.find('.swiper-wrapper').outerHeight(true)});
        if (el.height() === 0 || el.height() < 21) {
            el.css({height: '100%'});
        }
    });


    /* =========================================================================
    Recaptcha
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortRecaptcha() {
        jQuery('.gfort-recaptcha').each(function (index) {
            jQuery(this).attr('id', 'g-recaptcha-' + index);
            grecaptcha.render('g-recaptcha-' + index, {sitekey: gfortRecaptchaSiteKey});
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.gfort-recaptcha').length) {
        gfortRecaptcha();
    }


    /* =========================================================================
    Filter
    ========================================================================= */
    if (jQuery('.filter-section').length) {
        jQuery.getScript('js/plugins/isotope/isotope.pkgd.min.js', function () {
            jQuery('.filter-section').each(function (index) {

                var filterValue = '',
                    el = jQuery(this);

                el.find('.filter-group').each(function () {
                    filterValue += jQuery(this).attr('data-filter-group');
                });

                el.find('.filter-items-wrapper').attr('id', 'filter-items-wrapper-' + index);
                filterItemsWrapper = jQuery('#filter-items-wrapper-' + index);
                filterItemsWrapper.isotope({
                    filter: filterValue,
                    layoutMode: 'masonry',
                    itemSelector: '.isotope-item'
                });

                el.find('.wide-block').parents('.filter-items-wrapper').addClass('correct-position');

            });
        });
    }


});