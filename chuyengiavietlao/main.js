/*<![CDATA[*/
// JavaScript Document
(function($) {
    "use strict";


    /* bwmap */
    function gg_bwmap_init() {
        if ($('#bwmap').length > 0) {
            $('#bwmap').each(function() {

                var $this = $(this),
                    latitude = $this.attr('data-latitude'),
                    longitude = $this.attr('data-longitude'),
                    infow = $this.attr('data-infow'),
                    infowtitle = $this.attr('data-infowtitle'),
                    infowcontent = $this.attr('data-infowcontent'),
                    mapzoom = $this.attr('data-zoom');

                var map;
                var bwmap = new google.maps.LatLng(latitude, longitude);

                function initialize() {

                    var mapOptions = {
                        zoom: 14,
                        scrollwheel: false,
                        center: bwmap,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: [{
                            featureType: 'all',
                            stylers: [{
                                saturation: -100
                            }, {
                                gamma: 0.0
                            }]
                        }]
                    };

                    map = new google.maps.Map(document.getElementById('bwmap'),
                        mapOptions);

                    var marker = new google.maps.Marker({
                        position: bwmap,
                        map: map
                    });

                    if (infow == 'use_infow') {
                        var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h1 id="firstHeading" class="firstHeading">' + infowtitle + '</h1>' +
                            '<div id="bodyContent">' +
                            '<p>' + infowcontent + '</p>' +
                            '</div>' +
                            '</div>';

                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });

                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });
                    }

                }

                google.maps.event.addDomListener(window, 'load', initialize);

            });
        }
    }

    function gg_isotope_init() {
        if ($('.image-grid:not(.owl-carousel)').length > 0) {
            var layout_modes = {
                fitrows: 'fitRows',
                masonry: 'masonry'
            }
            jQuery('.gg_posts_grid').each(function() {
                var $container = jQuery(this);
                var $thumbs = $container.find('.image-grid:not(.owl-carousel)');
                var layout_mode = $thumbs.attr('data-layout-mode');
                $thumbs.isotope({
                    // options
                    itemSelector: '.isotope-item',
                    layoutMode: (layout_modes[layout_mode] == undefined ? 'fitRows' : layout_modes[layout_mode])
                });
                $container.find('.categories_filter a').data('isotope', $thumbs).click(function(e) {
                    e.preventDefault();
                    var $thumbs = jQuery(this).data('isotope');
                    jQuery(this).parent().parent().find('.active').removeClass('active');
                    jQuery(this).parent().addClass('active');
                    $thumbs.isotope({
                        filter: jQuery(this).attr('data-filter')
                    });
                });
                jQuery(window).bind('load resize', function() {
                    $thumbs.isotope("layout");
                });
            });
        }
    }

    /* Magnific */
    function gg_magnific_init() {
        if ($('.image-grid, .team-grid, .owl-carousel.has_magnific, .wpb_image_grid.has_magnific, .wpb_single_image.has_magnific').length > 0) {
            $('.image-grid, .team-grid, .owl-carousel.has_magnific, .wpb_image_grid.has_magnific, .wpb_single_image.has_magnific').each(function() {
                $(this).magnificPopup({
                    delegate: 'a.lightbox-el',
                    type: 'image',
                    gallery: {
                        enabled: true
                    },
                    callbacks: {
                        elementParse: function(item) {
                            if (item.el.context.className == 'lightbox-el extra-links lightbox-video') {
                                item.type = 'iframe';
                            } else {
                                item.type = 'image';
                            }
                        }
                    }
                });
            });
        }
    }

    /* OwlCarousel */
    function gg_owlcarousel_init() {
        if ($('.owl-carousel').length > 0) {
            $('.owl-carousel').each(function() {

                var $this = $(this),
                    slidesPerView = $this.attr('data-slides-per-view'),
                    singleItemData = $this.attr('data-single-item') == "true" ? true : false,
                    transitionSlide = $this.attr('data-transition-slide'),
                    navigationData = $this.attr('data-navigation-owl') == "true" ? true : false,
                    paginationData = $this.attr('data-pagination-owl') == "true" ? true : false,
                    lazyloadData = $this.attr('data-lazyload') == "true" ? true : false,
                    autoplayData = $this.attr('data-autoplay') == "2000" ? 2000 : true,
                    rewindData = $this.attr('data-rewind') == "true" ? true : false,
                    speedData = $this.attr('data-speed'),
                    pagColor = $this.attr('data-pag-color'),
                    cID = $this.attr('data-c-id'),
                    heightData = $this.attr('data-height') == "true" ? true : false,
                    afterInitData = $this.attr('data-afterinit') == "navColor" ? navColor : '';

                $this.owlCarousel({
                    items: slidesPerView,
                    navigation: navigationData,
                    pagination: paginationData,
                    lazyLoad: lazyloadData,
                    navigationText: [
                        "<i class='arrow_carrot-left_alt2'></i>",
                        "<i class='arrow_carrot-right_alt2'></i>"
                    ],

                    singleItem: singleItemData,
                    transitionStyle: transitionSlide, //fade, backSlide, goDown, scaleUp
                    autoPlay: autoplayData,
                    rewindNav: rewindData,
                    slideSpeed: speedData,
                    autoHeight: heightData,
                    afterInit: navColor,
                    afterUpdate: navColor

                });

                //function for thumbnail navigation
                function navColor() {

                    if ($('.owl-carousel[data-pag-color="' + pagColor + '" ]').length > 0) {
                        $('.owl-carousel[data-pag-color="' + pagColor + '" ]').find('.owl-controls .owl-page span, .owl-controls .owl-buttons > div').css('background-color', pagColor);
                    }

                }

            });

        }
    }

    /* Portfolio overlay */
    function gg_portfolio_init() {
        if ($('.gg-overlay-page').length > 0) {
            $('.gg-overlay-page').each(function() {
                $(this).magnificPopup({
                    type: 'ajax',
                    ajax: {
                        settings: null,
                        cursor: 'mfp-ajax-cur',
                        thisError: '<a href="%url%">The content</a> could not be loaded.'
                    },
                    closeOnContentClick: false,
                    closeOnBgClick: false,
                    showCloseBtn: false,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    overflowY: 'scroll',
                    removalDelay: 500,
                    tLoading: '<div class="firstbuffer"></div><div class="secbuffer"></div><div class="thirdbuffer"></div>',
                    mainClass: 'mfp-fade gg-style',
                    callbacks: {
                        updateStatus: function(data) {

                            console.log('Status changed', data);
                            if (data.status === 'ready') {
                                gg_owlcarousel_init();
                                //get carousel instance data and store it in variable owl
                                $('body').find(".owl-carousel").data('owlCarousel');
                            }
                        },
                        parseAjax: function(mfpResponse) {
                            mfpResponse.data = $(mfpResponse.data).find('#single-header, #content');
                            console.log('Ajax content loaded:', mfpResponse);
                        },
                        ajaxContentAdded: function() {
                            $('.navigation.post-navigation').remove();
                            $('.mfp-content').prepend('<span class="close-project-overlay"><i class="icon_close"></i></span>');
                            $('.mfp-content').find('.close-project-overlay').on('click', function(e) {
                                e.preventDefault();
                                $.magnificPopup.close();

                            });
                            console.log(this.content);
                        },
                        close: function() {
                            // destroy the slider to avoid memory leaks
                            $('body').find(".owl-carousel").data('owlCarousel').destroy();
                            this.wrap.removeClass('mfp-image-loaded');
                        }
                    }

                });
            });
        }
    }

    /* Counter */
    function gg_counter_init() {
        if ($('.counter').length > 0) {
            jQuery('.counter-holder').waypoint(function() {
                $('.counter').each(function() {
                    if (!$(this).hasClass('initialized')) {
                        $(this).addClass('initialized');
                        var $this = $(this),
                            countToNumber = $this.attr('data-number'),
                            refreshInt = $this.attr('data-interval'),
                            speedInt = $this.attr('data-speed');

                        $(this).countTo({
                            from: 0,
                            to: countToNumber,
                            speed: speedInt,
                            refreshInterval: refreshInt
                        });
                    }
                });
            }, {
                offset: '85%'
            });
        }
    }

    $(document).ready(function() {

        gg_owlcarousel_init();
        gg_magnific_init();
        gg_portfolio_init();
        gg_counter_init();
        gg_isotope_init();
        gg_bwmap_init();

        // Do our DOM lookups beforehand
        var nav_container = $("#main-menu-header");
        var nav = $("nav.navbar-default");
        var top_spacing = 0;
        var waypoint_offset = 0;

        if (nav.hasClass("header-animation-on")) {
            waypoint_offset = nav.outerHeight();
        } else {
            waypoint_offset = 0;
        }

        if ($("body").hasClass("admin-bar")) {
            top_spacing = 32;
        } else {
            top_spacing = 0;
        }

        nav_container.waypoint({

            handler: function(direction) {

                if (direction == 'down') {

                    nav_container.css({
                        'height': nav.outerHeight()
                    });
                    if (nav.hasClass('header-animation-on')) {
                        nav.addClass("sticky")
                            .stop()
                            .css("top", -nav.outerHeight())
                            .css({
                                "top": top_spacing
                            });
                    }

                } else {

                    nav_container.css({
                        'height': 'auto'
                    });
                    if (nav.hasClass('header-animation-on')) {
                        nav.removeClass("sticky")
                            .stop()
                            .css("top", nav.outerHeight() + waypoint_offset)
                            .css({
                                "top": ""
                            });
                    }

                }

            },

            offset: function() {
                return -(nav.outerHeight() + waypoint_offset);
            }

        });

        var sections = $('.gg-scroll-section');
        var navigation_links = $('nav a');

        sections.waypoint({
            handler: function(direction) {
                var active_section;
                active_section = $(this);
                if (direction === "up") active_section = active_section.prev();

                var active_link = $('nav a[href*="#' + active_section.attr("id") + '"]');
                navigation_links.removeClass("selected");
                active_link.addClass("selected");
            },
            offset: '35%'
        });

        var navigation_links_hash = $('nav a[href*="#"]');
        navigation_links_hash.click(function(event) {

            $.scrollTo(

                $(this).attr('href').substring($(this).attr('href').indexOf('#')), {
                    duration: 600,
                    offset: {
                        'left': 0,
                        'top': -waypoint_offset - top_spacing + 1
                    }
                }
            );
        });


        //calling jPreLoader

        var $preloader = $('.home.preloader-on');
        if ($preloader.length > 0) {
            $preloader.jpreLoader({
                loaderVPos: '50%',
                autoClose: true,
            }, function() { //callback function
                $preloader.addClass('preloader-off');
            });
        }


        //scroll to top
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();

            } else {
                $('.scrollup').fadeOut();

            }
        });

        $('.scrollup').click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
            return false;
        });

        // here for each comment reply link of wordpress
        $('.comment-reply-link').addClass('btn btn-primary btn-xs');

        // here for the submit button of the comment reply form
        $('.more-link, #submit, input[type="button"], input[type="reset"], input[type="submit"]').addClass('btn btn-primary');

        $('table#wp-calendar').addClass('table table-striped');

        $('table').addClass('table');

        $('form').addClass('table');

        $('form').attr('role', 'form');

        var inputs = $('input, textarea')
            .not(':input[type=button], :input[type=submit], :input[type=reset]');

        $(inputs).each(function() {
            $(this).addClass('form-control');
        });


        var $scroll = 0;
        $(window).scroll(function() {
            "use strict";
            $scroll = $(window).scrollTop();
        });


        if ($('body:not(.vivido-agent-devices) .parallax-section').length) {
            $('body:not(.vivido-agent-devices) .parallax-section').each(function() {
                var $self = $(this);
                var section_height = $self.data('height');
                $self.height(section_height);
                var rate = (section_height / $(document).height()) * 0.7;

                var distance = $scroll - $self.offset().top + 104;
                var bpos = -(distance * rate);
                $self.css({
                    'background-position': 'center ' + bpos + 'px',
                    'background-attachment': 'fixed'
                });
                $(window).bind('scroll', function() {
                    var distance = $scroll - $self.offset().top + 104;
                    var bpos = -(distance * rate);
                    $self.css({
                        'background-position': 'center ' + bpos + 'px',
                        'background-attachment': 'fixed'
                    });
                });
            });
            return this;
        }

    });

})(jQuery);
/*]]>*/
< /script>
<!-- Main JS / End -->

<!-- JS -->
< script type = 'text/javascript' > /*<![CDATA[*/
    (function(a) {
        var b = new Array,
            c = new Array,
            d = function() {},
            e = 0;
        var f = {
            splashVPos: "35%",
            loaderVPos: "75%",
            splashID: "#jpreContent",
            showSplash: true,
            showPercentage: true,
            autoClose: true,
            closeBtnText: "Start!",
            onetimeLoad: false,
            debugMode: false,
            splashFunction: function() {}
        };
        var g = function() {
            if (f.onetimeLoad) {
                var a = document.cookie.split("; ");
                for (var b = 0, c; c = a[b] && a[b].split("="); b++) {
                    if (c.shift() === "jpreLoader") {
                        return c.join("=")
                    }
                }
                return false
            } else {
                return false
            }
        };
        var h = function(a) {
            if (f.onetimeLoad) {
                var b = new Date;
                b.setDate(b.getDate() + a);
                var c = a == null ? "" : "expires=" + b.toUTCString();
                document.cookie = "jpreLoader=loaded; " + c
            }
        };
        var i = function() {
            jOverlay = a("<div></div>").attr("id", "jpreOverlay").css({
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 9999999
            }).appendTo("body");
            if (f.showSplash) {
                jContent = a("<div></div>").attr("id", "jpreSlide").appendTo(jOverlay);
                var b = a(window).width() - a(jContent).width();
                a(jContent).css({
                    position: "absolute",
                    top: f.splashVPos,
                    left: Math.round(50 / a(window).width() * b) + "%"
                });
                a(jContent).html(a(f.splashID).wrap("<div/>").parent().html());
                a(f.splashID).remove();
                f.splashFunction()
            }
            jLoader = a("<div></div>").attr("id", "jpreLoader").appendTo(jOverlay);
            var c = a(window).width() - a(jLoader).width();
            a(jLoader).css({
                position: "absolute",
                top: f.loaderVPos,
                left: Math.round(50 / a(window).width() * c) + "%"
            });
            jBar = a("<div></div>").attr("id", "jpreBar").css({
                width: "0%",
                height: "100%"
            }).appendTo(jLoader);
            if (f.showPercentage) {
                jPer = a("<div></div>").attr("id", "jprePercentage").css({
                    position: "relative",
                    height: "100%"
                }).appendTo(jLoader).html("Loading...")
            }
            if (!f.autoclose) {
                jButton = a("<div></div>").attr("id", "jpreButton").on("click", function() {
                    n()
                }).css({
                    position: "relative",
                    height: "100%"
                }).appendTo(jLoader).text(f.closeBtnText).hide()
            }
        };
        var j = function(c) {
            a(c).find("*:not(script)").each(function() {
                var c = "";
                if (a(this).css("background-image").indexOf("none") == -1 && a(this).css("background-image").indexOf("-gradient") == -1) {
                    c = a(this).css("background-image");
                    if (c.indexOf("url") != -1) {
                        var d = c.match(/url\((.*?)\)/);
                        c = d[1].replace(/\"/g, "")
                    }
                } else if (a(this).get(0).nodeName.toLowerCase() == "img" && typeof a(this).attr("src") != "undefined") {
                    c = a(this).attr("src")
                }
                if (c.length > 0) {
                    b.push(c)
                }
            })
        };
        var k = function() {
            for (var a = 0; a < b.length; a++) {
                if (l(b[a]));
            }
        };
        var l = function(b) {
            var d = new Image;
            a(d).load(function() {
                m()
            }).error(function() {
                c.push(a(this).attr("src"));
                m()
            }).attr("src", b)
        };
        var m = function() {
            e++;
            var c = Math.round(e / b.length * 100);
            a(jBar).stop().animate({
                width: c + "%"
            }, 500, "linear");
            if (f.showPercentage) {
                a(jPer).text(c + "%")
            }
            if (e >= b.length) {
                e = b.length;
                h();
                if (f.showPercentage) {
                    a(jPer).text("100%")
                }
                if (f.debugMode) {
                    var d = o()
                }
                a(jBar).stop().animate({
                    width: "100%"
                }, 500, "linear", function() {
                    if (f.autoClose) n();
                    else a(jButton).fadeIn(1e3)
                })
            }
        };
        var n = function() {
            a(jOverlay).fadeOut(800, function() {
                a(jOverlay).remove();
                d()
            })
        };
        var o = function() {
            if (c.length > 0) {
                var a = "ERROR - IMAGE FILES MISSING!!!\n\r";
                a += c.length + " image files cound not be found. \n\r";
                a += "Please check your image paths and filenames:\n\r";
                for (var b = 0; b < c.length; b++) {
                    a += "- " + c[b] + "\n\r"
                }
                return true
            } else {
                return false
            }
        };
        a.fn.jpreLoader = function(b, c) {
            if (b) {
                a.extend(f, b)
            }
            if (typeof c == "function") {
                d = c
            }
            a("body").css({
                display: "block"
            });
            return this.each(function() {
                if (!g()) {
                    i();
                    j(this);
                    k()
                } else {
                    a(f.splashID).remove();
                    d()
                }
            })
        }
    })(jQuery)

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.12
 */
;
(function(a) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], a)
    } else {
        a(jQuery)
    }
}(function($) {
    var j = $.scrollTo = function(a, b, c) {
        return $(window).scrollTo(a, b, c)
    };
    j.defaults = {
        axis: 'xy',
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    j.window = function(a) {
        return $(window)._scrollable()
    };
    $.fn._scrollable = function() {
        return this.map(function() {
            var a = this,
                isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!isWin) return a;
            var b = (a.contentWindow || a).document || a.ownerDocument || a;
            return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement
        })
    };
    $.fn.scrollTo = function(f, g, h) {
        if (typeof g == 'object') {
            h = g;
            g = 0
        }
        if (typeof h == 'function') h = {
            onAfter: h
        };
        if (f == 'max') f = 9e9;
        h = $.extend({}, j.defaults, h);
        g = g || h.duration;
        h.queue = h.queue && h.axis.length > 1;
        if (h.queue) g /= 2;
        h.offset = both(h.offset);
        h.over = both(h.over);
        return this._scrollable().each(function() {
            if (f == null) return;
            var d = this,
                $elem = $(d),
                targ = f,
                toff, attr = {},
                win = $elem.is('html,body');
            switch (typeof targ) {
                case 'number':
                case 'string':
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        break
                    }
                    targ = win ? $(targ) : $(targ, this);
                    if (!targ.length) return;
                case 'object':
                    if (targ.is || targ.style) toff = (targ = $(targ)).offset()
            }
            var e = $.isFunction(h.offset) && h.offset(d, targ) || h.offset;
            $.each(h.axis.split(''), function(i, a) {
                var b = a == 'x' ? 'Left' : 'Top',
                    pos = b.toLowerCase(),
                    key = 'scroll' + b,
                    old = d[key],
                    max = j.max(d, a);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (h.margin) {
                        attr[key] -= parseInt(targ.css('margin' + b)) || 0;
                        attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0
                    }
                    attr[key] += e[pos] || 0;
                    if (h.over[pos]) attr[key] += targ[a == 'x' ? 'width' : 'height']() * h.over[pos]
                } else {
                    var c = targ[pos];
                    attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c
                }
                if (h.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                if (!i && h.queue) {
                    if (old != attr[key]) animate(h.onAfterFirst);
                    delete attr[key]
                }
            });
            animate(h.onAfter);

            function animate(a) {
                $elem.animate(attr, g, h.easing, a && function() {
                    a.call(this, targ, h)
                })
            }
        }).end()
    };
    j.max = function(a, b) {
        var c = b == 'x' ? 'Width' : 'Height',
            scroll = 'scroll' + c;
        if (!$(a).is('html,body')) return a[scroll] - $(a)[c.toLowerCase()]();
        var d = 'client' + c,
            html = a.ownerDocument.documentElement,
            body = a.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d])
    };

    function both(a) {
        return $.isFunction(a) || typeof a == 'object' ? a : {
            top: a,
            left: a
        }
    };
    return j
}));

/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.2.0", d.prototype.close = function(b) {
        function c() {
            f.detach().trigger("closed.bs.alert").remove()
        }
        var d = a(this),
            e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), d[e](null == f[b] ? this.options[b] : f[b]), setTimeout(a.proxy(function() {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b).on("keydown.bs.carousel", a.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, c.prototype.keydown = function(a) {
        switch (a.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        a.preventDefault()
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.to = function(b) {
        var c = this,
            d = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = "next" == b ? "left" : "right",
            h = "next" == b ? "first" : "last",
            i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = e[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, f && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(e)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
            return a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one("bsTransitionEnd", function() {
                e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger(m)), f && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    }), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.collapse"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
            !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        toggle: !0
    }, c.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, c.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var c = a.Event("show.bs.collapse");
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                var d = this.$parent && this.$parent.find("> .panel > .in");
                if (d && d.length) {
                    var e = d.data("bs.collapse");
                    if (e && e.transitioning) return;
                    b.call(d, "hide"), e || d.data("bs.collapse", null)
                }
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1;
                var g = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) return g.call(this);
                var h = a.camelCase(["scroll", f].join("-"));
                this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h])
            }
        }
    }, c.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    }, c.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var d = a.fn.collapse;
    a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = d, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(c) {
        var d, e = a(this),
            f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
            g = a(f),
            h = g.data("bs.collapse"),
            i = h ? "toggle" : e.data(),
            j = e.attr("data-parent"),
            k = j && a(j);
        h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = c(a(this)),
                e = {
                    relatedTarget: this
                };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.2.0", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.divider):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var c = this,
            d = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                c.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var c = this,
            d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var f = function() {
                c.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f()
        } else b && b()
    }, c.prototype.checkScrollbar = function() {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show()
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var c = a.contains(document.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !c) return;
            var d = this,
                e = this.tip(),
                f = this.getUID(this.type);
            this.setContent(), e.attr("id", f), this.$element.attr("aria-describedby", f), this.options.animation && e.addClass("fade");
            var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement,
                h = /\s?auto?\s?/i,
                i = h.test(g);
            i && (g = g.replace(h, "") || "top"), e.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(g).data("bs." + this.type, this), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element);
            var j = this.getPosition(),
                k = e[0].offsetWidth,
                l = e[0].offsetHeight;
            if (i) {
                var m = g,
                    n = this.$element.parent(),
                    o = this.getPosition(n);
                g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g, e.removeClass(m).addClass(g)
            }
            var p = this.getCalculatedOffset(g, j, k, l);
            this.applyPlacement(p, g);
            var q = function() {
                d.$element.trigger("shown.bs." + d.type), d.hoverState = null
            };
            a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j,
            m = k.left ? "left" : "top",
            n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(l, d[0][n], m)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
        }
        var c = this,
            d = this.tip(),
            e = a.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName;
        return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null, {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
            width: d ? a(window).width() : b.outerWidth(),
            height: d ? a(window).height() : b.outerHeight()
        }, d ? {
            top: 0,
            left: 0
        } : b.offset())
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.2.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, c.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        var e = a.proxy(this.process, this);
        this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.2.0", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = "offset",
            c = 0;
        a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var d = this;
        this.$body.find(this.selector).map(function() {
            var d = a(this),
                e = d.data("target") || d.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[b]().top + c, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            d.offsets.push(this[0]), d.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.2.0", c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0],
                f = a.Event("show.bs.tab", {
                    relatedTarget: e
                });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.closest("li"), c), this.activate(g, g.parent(), function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }
        var f = c.find("> .active"),
            g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(c) {
        c.preventDefault(), b.call(a(this), "show")
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.2.0", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = a(document).height(),
                d = this.$target.scrollTop(),
                e = this.$element.offset(),
                f = this.options.offset,
                g = f.top,
                h = f.bottom;
            "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= b - h ? "bottom" : null != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                null != this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""),
                    k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({
                    top: b - this.$element.height() - h
                }))
            }
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, d.offsetBottom && (d.offset.bottom = d.offsetBottom), d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);

// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.2
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);

function vc_plugin_flexslider(a) {
    var b = a ? a.find(".wpb_flexslider") : jQuery(".wpb_flexslider");
    b.each(function() {
        var a = jQuery(this),
            b = 800,
            c = 1e3 * parseInt(a.attr("data-interval")),
            d = a.attr("data-flex_fx"),
            e = !0;
        0 == c && (e = !1), a.is(":visible") && a.flexslider({
            animation: d,
            slideshow: e,
            slideshowSpeed: c,
            sliderSpeed: b,
            smoothHeight: !1
        })
    })
}

function vc_twitterBehaviour() {
    jQuery(".wpb_twitter_widget .tweets").each(function(a) {
        var b = jQuery(this),
            c = b.attr("data-tw_name");
        tw_count = b.attr("data-tw_count"), b.tweet({
            username: c,
            join_text: "auto",
            avatar_size: 0,
            count: tw_count,
            template: "{avatar}{join}{text}{time}",
            auto_join_text_default: "",
            auto_join_text_ed: "",
            auto_join_text_ing: "",
            auto_join_text_reply: "",
            auto_join_text_url: "",
            loading_text: '<span class="loading_tweets">loading tweets...</span>'
        })
    })
}

function vc_googleplus() {
    jQuery(".wpb_googleplus").length > 0 && ! function() {
        var a = document.createElement("script");
        a.type = "text/javascript", a.async = !0, a.src = "https://apis.google.com/js/plusone.js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
    }()
}

function vc_pinterest() {
    jQuery(".wpb_pinterest").length > 0 && ! function() {
        var a = document.createElement("script");
        a.type = "text/javascript", a.async = !0, a.src = "http://assets.pinterest.com/js/pinit.js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
    }()
}

function vc_progress_bar() {
    "undefined" != typeof jQuery.fn.waypoint && jQuery(".vc_progress_bar").waypoint(function() {
        jQuery(this).find(".vc_single_bar").each(function(a) {
            var b = jQuery(this),
                c = b.find(".vc_bar"),
                d = c.data("percentage-value");
            setTimeout(function() {
                c.css({
                    width: d + "%"
                })
            }, 200 * a)
        })
    }, {
        offset: "85%"
    })
}

function vc_waypoints() {
    "undefined" != typeof jQuery.fn.waypoint && jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").waypoint(function() {
        jQuery(this).addClass("wpb_start_animation")
    }, {
        offset: "85%"
    })
}

function vc_toggleBehaviour() {
    jQuery(".wpb_toggle").unbind("click").click(function(a) {
        return !jQuery(this).next().is(":animated") && void(jQuery(this).hasClass("wpb_toggle_title_active") ? jQuery(this).removeClass("wpb_toggle_title_active").next().slideUp(500) : jQuery(this).addClass("wpb_toggle_title_active").next().slideDown(500))
    }), jQuery(".wpb_toggle_content").each(function(a) {
        0 == jQuery(this).next().is("h4.wpb_toggle") && jQuery('<div class="last_toggle_el_margin"></div>').insertAfter(this)
    })
}

function vc_tabsBehaviour(a) {
    jQuery(function(a) {
        a(document.body).off("click.preview", "a")
    });
    var b = a || jQuery(".wpb_tabs, .wpb_tour"),
        c = jQuery.ui ? jQuery.ui.version.split(".") : "1.10",
        d = 1 == parseInt(c[0]) && parseInt(c[1]) < 9;
    b.each(function(a) {
        var b, c = jQuery(this).attr("data-interval"),
            e = [];
        b = jQuery(this).find(".wpb_tour_tabs_wrapper").tabs({
            show: function(a, b) {
                wpb_prepare_tab_content(a, b)
            },
            beforeActivate: function(a, b) {
                1 !== b.newPanel.index() && b.newPanel.find(".vc_pie_chart:not(.vc-ready)")
            },
            activate: function(a, b) {
                wpb_prepare_tab_content(a, b)
            }
        }).tabs("rotate", 1e3 * c), jQuery(this).find(".wpb_tab").each(function() {
            e.push(this.id)
        }), jQuery(this).find(".wpb_tabs_nav a").click(function(a) {
            if (a.preventDefault(), jQuery.inArray(jQuery(this).attr("href"), e)) return d ? b.tabs("select", jQuery(this).attr("href")) : b.tabs("option", "active", jQuery(jQuery(this).attr("href")).index() - 1), !1
        }), jQuery(this).find(".wpb_prev_slide a, .wpb_next_slide a").click(function(a) {
            if (a.preventDefault(), d) {
                var c = b.tabs("option", "selected");
                jQuery(this).parent().hasClass("wpb_next_slide") ? c++ : c--, c < 0 ? c = b.tabs("length") - 1 : c >= b.tabs("length") && (c = 0), b.tabs("select", c)
            } else {
                var c = b.tabs("option", "active"),
                    e = b.find(".wpb_tab").length;
                c = jQuery(this).parent().hasClass("wpb_next_slide") ? c + 1 >= e ? 0 : c + 1 : c - 1 < 0 ? e - 1 : c - 1, b.tabs("option", "active", c)
            }
        })
    })
}

function vc_accordionBehaviour() {
    jQuery(".wpb_accordion").each(function(a) {
        var b, d = (jQuery(this).attr("data-interval"), !isNaN(jQuery(this).data("active-tab")) && parseInt(jQuery(this).data("active-tab")) > 0 && parseInt(jQuery(this).data("active-tab")) - 1),
            e = d === !1 || "yes" === jQuery(this).data("collapsible");
        b = jQuery(this).find(".wpb_accordion_wrapper").accordion({
            header: "> div > h3",
            autoHeight: !1,
            heightStyle: "content",
            active: d,
            collapsible: e,
            navigation: !0,
            activate: vc_accordionActivate,
            change: function(a, b) {
                void 0 != jQuery.fn.isotope && b.newContent.find(".isotope").isotope("layout"), vc_carouselBehaviour(b.newPanel)
            }
        })
    })
}

function vc_teaserGrid() {
    var a = {
        fitrows: "fitRows",
        masonry: "masonry"
    };
    jQuery(".wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)").each(function() {
        var b = jQuery(this),
            c = b.find(".wpb_thumbnails"),
            d = c.attr("data-layout-mode");
        c.isotope({
            itemSelector: ".isotope-item",
            layoutMode: void 0 == a[d] ? "fitRows" : a[d]
        }), b.find(".categories_filter a").data("isotope", c).click(function(a) {
            a.preventDefault();
            var b = jQuery(this).data("isotope");
            jQuery(this).parent().parent().find(".active").removeClass("active"), jQuery(this).parent().addClass("active"), b.isotope({
                filter: jQuery(this).attr("data-filter")
            })
        }), jQuery(window).bind("load resize", function() {
            c.isotope("layout")
        })
    })
}

function vc_carouselBehaviour(a) {
    var b = a ? a.find(".wpb_carousel") : jQuery(".wpb_carousel");
    b.each(function() {
        var a = jQuery(this);
        if (a.data("carousel_enabled") !== !0 && a.is(":visible")) {
            a.data("carousel_enabled", !0);
            var c = (jQuery(this).width(), getColumnsCount(jQuery(this))),
                d = 500;
            jQuery(this).hasClass("columns_count_1") && (d = 900);
            var e = jQuery(this).find(".wpb_thumbnails-fluid li");
            e.css({
                "margin-right": e.css("margin-left"),
                "margin-left": 0
            }), jQuery(this).find(".wpb_wrapper:eq(0)").jCarouselLite({
                btnNext: jQuery(this).find(".next"),
                btnPrev: jQuery(this).find(".prev"),
                visible: c,
                speed: d
            }).width("100%");
            var f = jQuery(this).find("ul.wpb_thumbnails-fluid");
            f.width(f.width() + 300), jQuery(window).resize(function() {
                var a = screen_size;
                screen_size = getSizeName(), a != screen_size && window.setTimeout("location.reload()", 20)
            })
        }
    }), void 0 !== window.Swiper && jQuery(".swiper-container").each(function() {
        var b, a = jQuery(this),
            c = 0,
            d = jQuery(this).data("settings");
        "vertical" === d.mode && (a.find(".swiper-slide").each(function() {
            var a = jQuery(this).outerHeight(!0);
            a > c && (c = a)
        }), a.height(c), a.css("overflow", "hidden")), jQuery(window).resize(function() {
            a.find(".swiper-slide").each(function() {
                var a = jQuery(this).outerHeight(!0);
                a > c && (c = a)
            }), a.height(c)
        }), b = jQuery(this).swiper(jQuery.extend(d, {
            onFirstInit: function(b) {
                b.slides.length < 2 ? a.find(".vc-arrow-left,.vc-arrow-right").hide() : 0 === b.activeIndex && b.params.loop !== !0 ? a.find(".vc-arrow-left").hide() : a.find(".vc-arrow-left").show()
            },
            onSlideChangeStart: function(b) {
                b.slides.length > 1 && b.params.loop !== !0 && (0 === b.activeIndex ? a.find(".vc-arrow-left").hide() : a.find(".vc-arrow-left").show(), b.slides.length - 1 === b.activeIndex ? a.find(".vc-arrow-right").hide() : a.find(".vc-arrow-right").show())
            }
        })), a.find(".vc-arrow-left").click(function(a) {
            a.preventDefault(), b.swipePrev()
        }), a.find(".vc-arrow-right").click(function(a) {
            a.preventDefault(), b.swipeNext()
        }), b.reInit()
    })
}

function vc_slidersBehaviour() {
    jQuery(".wpb_gallery_slides").each(function(a) {
        var b = jQuery(this);
        if (b.hasClass("wpb_slider_nivo")) {
            var d = 800,
                e = 1e3 * b.attr("data-interval");
            0 == e && (e = 9999999999), b.find(".nivoSlider").nivoSlider({
                effect: "boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse",
                slices: 15,
                boxCols: 8,
                boxRows: 4,
                animSpeed: d,
                pauseTime: e,
                startSlide: 0,
                directionNav: !0,
                directionNavHide: !0,
                controlNav: !0,
                keyboardNav: !1,
                pauseOnHover: !0,
                manualAdvance: !1,
                prevText: "Prev",
                nextText: "Next"
            })
        } else if (b.hasClass("wpb_flexslider"), 1) {
            if (b.hasClass("wpb_image_grid")) {
                var f = b.find(".wpb_image_grid_ul");
                f.isotope({
                    itemSelector: ".isotope-item",
                    layoutMode: "fitRows"
                }), jQuery(window).load(function() {
                    f.isotope("layout")
                })
            }
        } else;
    })
}

function vc_prettyPhoto() {
    try {
        jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({
            animationSpeed: "normal",
            padding: 15,
            opacity: .7,
            showTitle: !0,
            allowresize: !0,
            counter_separator_label: "/",
            hideflash: !1,
            deeplinking: !1,
            modal: !1,
            callback: function() {
                var a = location.href,
                    b = !!a.indexOf("#!prettyPhoto");
                b && (location.hash = "!")
            },
            social_tools: ""
        })
    } catch (a) {}
}

function getColumnsCount(a) {
    for (var b = !1, c = 1; 0 == b;) {
        if (a.hasClass("columns_count_" + c)) return b = !0, c;
        c++
    }
}

function getSizeName() {
    var a = "",
        b = jQuery(window).width();
    return b > 1170 ? a = "desktop_wide" : b > 960 && b < 1169 ? a = "desktop" : b > 768 && b < 959 ? a = "tablet" : b > 300 && b < 767 ? a = "mobile" : b < 300 && (a = "mobile_portrait"), a
}

function loadScript(a, b, c) {
    var d = document.createElement("script");
    d.type = "text/javascript", d.readyState && (d.onreadystatechange = function() {
        "loaded" != d.readyState && "complete" != d.readyState || (d.onreadystatechange = null, c())
    }), d.src = a, b.get(0).appendChild(d)
}

function wpb_prepare_tab_content(a, b) {
    var f, g, c = b.panel || b.newPanel,
        d = c.find(".vc_pie_chart:not(.vc-ready)"),
        e = c.find('[data-ride="vc-carousel"]');
    if (vc_carouselBehaviour(), vc_plugin_flexslider(c), d.length && jQuery.fn.vcChat && d.vcChat(), e.length && jQuery.fn.carousel && e.carousel("resizeAction"), f = c.find(".isotope"), g = c.find(".wpb_gmaps_widget"), f.length > 0 && f.isotope("layout"), g.length && !g.is(".map_ready")) {
        var h = g.find("iframe");
        h.attr("src", h.attr("src")), g.addClass("map_ready")
    }
    c.parents(".isotope").length && c.parents(".isotope").each(function() {
        jQuery(this).isotope("layout")
    })
}
document.documentElement.className += " js_active ", document.documentElement.className += "ontouchstart" in document.documentElement ? " vc_mobile " : " vc_desktop ",
    function() {
        var a = ["-webkit-", "-o-", "-moz-", "-ms-", ""];
        for (var b in a) a[b] + "transform" in document.documentElement.style && (document.documentElement.className += " vc_transform ")
    }(), jQuery(window).load(function() {});
var vc_js = function() {
    vc_twitterBehaviour(), vc_toggleBehaviour(), vc_tabsBehaviour(), vc_accordionBehaviour(), vc_teaserGrid(), vc_carouselBehaviour(), vc_slidersBehaviour(), vc_prettyPhoto(), vc_googleplus(), vc_pinterest(), vc_progress_bar(), vc_plugin_flexslider(), window.setTimeout(vc_waypoints, 1500)
};
jQuery(document).ready(function(a) {
    window.vc_js()
}), "function" != typeof window.vc_plugin_flexslider, "function" != typeof window.vc_twitterBehaviour, "function" != typeof window.vc_googleplus, "function" != typeof window.vc_pinterest, "function" != typeof window.vc_progress_bar, "function" != typeof window.vc_waypoints, "function" != typeof window.vc_toggleBehaviour, "function" != typeof window.vc_tabsBehaviour, "function" != typeof window.vc_accordionBehaviour, "function" != typeof window.vc_teaserGrid, "function" != typeof window.vc_carouselBehaviour, "function" != typeof window.vc_slidersBehaviour, "function" != typeof window.vc_prettyPhoto;
var screen_size = getSizeName(),
    vc_accordionActivate = function(a, b) {
        var c = b.newPanel.find(".vc_pie_chart:not(.vc-ready)"),
            d = b.newPanel.find('[data-ride="vc-carousel"]');
        void 0 != jQuery.fn.isotope && b.newPanel.find(".isotope").isotope("layout"), vc_carouselBehaviour(b.newPanel), vc_plugin_flexslider(b.newPanel), c.length && jQuery.fn.vcChat && c.vcChat(), d.length && jQuery.fn.carousel && d.carousel("resizeAction"), b.newPanel.parents(".isotope").length && b.newPanel.parents(".isotope").each(function() {
            jQuery(this).isotope("layout")
        })
    };

! function(a, b, c) {
    "use strict";

    function d(d) {
        var e = a(b).height(),
            f = a(c).height();
        "window" === d.settings.resizeTo ? a(d).css("height", f) : f >= e ? a(d).css("height", f) : a(d).css("height", e)
    }

    function e(b) {
        a(b.controlbox).append(b.settings.preloadHtml), b.settings.preloadCallback && b.settings.preloadCallback.call(b)
    }

    function f(b) {
        var d, c = b.find("video").get(0);
        d = b.settings.controlPosition ? a(b.settings.controlPosition).find(".ui-video-background-play a") : b.find(".ui-video-background-play a"), c.paused ? (c.play(), d.toggleClass("ui-icon-pause ui-icon-play").text(b.settings.controlText[1])) : c.ended ? (c.play(), d.toggleClass("ui-icon-pause ui-icon-play").text(b.settings.controlText[1])) : (c.pause(), d.toggleClass("ui-icon-pause ui-icon-play").text(b.settings.controlText[0]))
    }

    function g(b) {
        var d, c = b.find("video").get(0);
        d = b.settings.controlPosition ? a(b.settings.controlPosition).find(".ui-video-background-mute a") : b.find(".ui-video-background-mute a"), 0 === c.volume ? (c.volume = 1, d.toggleClass("ui-icon-volume-on ui-icon-volume-off").text(b.settings.controlText[2])) : (c.volume = 0, d.toggleClass("ui-icon-volume-on ui-icon-volume-off").text(b.settings.controlText[3]))
    }

    function h(b) {
        b.settings.resize && a(c).on("resize", function() {
            d(b)
        }), b.controls.find(".ui-video-background-play a").on("click", function(a) {
            a.preventDefault(), f(b)
        }), b.controls.find(".ui-video-background-mute a").on("click", function(a) {
            a.preventDefault(), g(b)
        }), b.settings.loop && b.find("video").on("ended", function() {
            a(this).get(0).play(), a(this).toggleClass("paused").text(b.settings.controlText[1])
        })
    }

    function i(b) {
        a(b.controlbox).html(b.controls), h(b), b.settings.loadedCallback && b.settings.loadedCallback.call(b)
    }
    var j = {
        init: function(c) {
            return this.each(function() {
                var k, l, f = a(this),
                    g = "",
                    h = "",
                    j = f.data("video-options");
                b.createElement("video").canPlayType ? (f.settings = a.extend(!0, {}, a.fn.videobackground.defaults, j, c), f.settings.initialised || (f.settings.initialised = !0, f.settings.resize && d(f), a.each(f.settings.videoSource, function() {
                    l = "[object Array]" === Object.prototype.toString.call(this), g = l && void 0 !== this[1] ? g + '<source src="' + this[0] + '" type="' + this[1] + '">' : l ? g + '<source src="' + this[0] + '">' : g + '<source src="' + this + '">'
                }), h = h + 'preload="' + f.settings.preload + '"', f.settings.poster && (h = h + ' poster="' + f.settings.poster + '"'), f.settings.autoplay && (h += ' autoplay="autoplay"'), f.settings.loop && (h += ' loop="loop"'), a(f).html("<video " + h + ">" + g + "</video>"), f.controlbox = a('<div class="ui-video-background ui-widget ui-widget-content ui-corner-all"></div>'), f.settings.controlPosition ? a(f.settings.controlPosition).append(f.controlbox) : a(f).append(f.controlbox), f.controls = a('<ul class="ui-video-background-controls"><li class="ui-video-background-play"><a class="ui-icon ui-icon-pause" href="#">' + f.settings.controlText[1] + '</a></li><li class="ui-video-background-mute"><a class="ui-icon ui-icon-volume-on" href="#">' + f.settings.controlText[2] + "</a></li></ul>"), f.settings.preloadHtml || f.settings.preloadCallback ? (e(f), f.find("video").on("canplaythrough", function() {
                    f.settings.autoplay && f.find("video").get(0).play(), i(f)
                })) : f.find("video").on("canplaythrough", function() {
                    f.settings.autoplay && f.find("video").get(0).play(), i(f)
                }), f.data("video-options", f.settings))) : (f.settings = a.extend(!0, {}, a.fn.videobackground.defaults, j, c), f.settings.initialised || (f.settings.initialised = !0, f.settings.poster && (k = a('<img class="ui-video-background-poster" src="' + f.settings.poster + '">'), f.append(k)), f.data("video-options", f.settings)))
            })
        },
        play: function(b) {
            return this.each(function() {
                var c = a(this),
                    d = c.data("video-options");
                c.settings = a.extend(!0, {}, d, b), c.settings.initialised && (f(c), c.data("video-options", c.settings))
            })
        },
        mute: function(b) {
            return this.each(function() {
                var c = a(this),
                    d = c.data("video-options");
                c.settings = a.extend(!0, {}, d, b), c.settings.initialised && (g(c), c.data("video-options", c.settings))
            })
        },
        resize: function(b) {
            return this.each(function() {
                var c = a(this),
                    e = c.data("video-options");
                c.settings = a.extend(!0, {}, e, b), c.settings.initialised && (d(c), c.data("video-options", c.settings))
            })
        },
        destroy: function(d) {
            return this.each(function() {
                var e = a(this),
                    f = e.data("video-options");
                e.settings = a.extend(!0, {}, f, d), e.settings.initialised && (e.settings.initialised = !1, b.createElement("video").canPlayType ? (e.find("video").off("ended"), e.settings.controlPosition ? (a(e.settings.controlPosition).find(".ui-video-background-mute a").off("click"), a(e.settings.controlPosition).find(".ui-video-background-play a").off("click")) : (e.find(".ui-video-background-mute a").off("click"), e.find(".ui-video-background-play a").off("click")), a(c).off("resize"), e.find("video").off("canplaythrough"), e.settings.controlPosition ? a(e.settings.controlPosition).find(".ui-video-background").remove() : e.find(".ui-video-background").remove(), a("video", e).remove()) : e.settings.poster && e.find(".ui-video-background-poster").remove(), e.removeData("video-options"))
            })
        }
    };
    a.fn.videobackground = function(b) {
        return this.length ? j[b] ? j[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.videobackground") : j.init.apply(this, arguments) : this
    }, a.fn.videobackground.defaults = {
        videoSource: [],
        poster: null,
        autoplay: !0,
        preload: "auto",
        loop: !1,
        controlPosition: null,
        controlText: ["Play", "Pause", "Mute", "Unmute"],
        resize: !0,
        preloadHtml: "",
        preloadCallback: null,
        loadedCallback: null,
        resizeTo: "document"
    }
}(jQuery, document, window);

"function" !== typeof Object.create && (Object.create = function(f) {
    function g() {}
    g.prototype = f;
    return new g
});
(function(f, g, k) {
    var l = {
        init: function(a, b) {
            this.$elem = f(b);
            this.options = f.extend({}, f.fn.owlCarousel.options, this.$elem.data(), a);
            this.userOptions = a;
            this.loadContent()
        },
        loadContent: function() {
            function a(a) {
                var d, e = "";
                if ("function" === typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [a]);
                else {
                    for (d in a.owl) a.owl.hasOwnProperty(d) && (e += a.owl[d].item);
                    b.$elem.html(e)
                }
                b.logIn()
            }
            var b = this,
                e;
            "function" === typeof b.options.beforeInit && b.options.beforeInit.apply(this, [b.$elem]);
            "string" === typeof b.options.jsonPath ?
                (e = b.options.jsonPath, f.getJSON(e, a)) : b.logIn()
        },
        logIn: function() {
            this.$elem.data("owl-originalStyles", this.$elem.attr("style"));
            this.$elem.data("owl-originalClasses", this.$elem.attr("class"));
            this.$elem.css({
                opacity: 0
            });
            this.orignalItems = this.options.items;
            this.checkBrowser();
            this.wrapperWidth = 0;
            this.checkVisible = null;
            this.setVars()
        },
        setVars: function() {
            if (0 === this.$elem.children().length) return !1;
            this.baseClass();
            this.eventTypes();
            this.$userItems = this.$elem.children();
            this.itemsAmount = this.$userItems.length;
            this.wrapItems();
            this.$owlItems = this.$elem.find(".owl-item");
            this.$owlWrapper = this.$elem.find(".owl-wrapper");
            this.playDirection = "next";
            this.prevItem = 0;
            this.prevArr = [0];
            this.currentItem = 0;
            this.customEvents();
            this.onStartup()
        },
        onStartup: function() {
            this.updateItems();
            this.calculateAll();
            this.buildControls();
            this.updateControls();
            this.response();
            this.moveEvents();
            this.stopOnHover();
            this.owlStatus();
            !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle);
            !0 === this.options.autoPlay &&
                (this.options.autoPlay = 5E3);
            this.play();
            this.$elem.find(".owl-wrapper").css("display", "block");
            this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility();
            this.onstartup = !1;
            this.eachMoveUpdate();
            "function" === typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
        },
        eachMoveUpdate: function() {
            !0 === this.options.lazyLoad && this.lazyLoad();
            !0 === this.options.autoHeight && this.autoHeight();
            this.onVisibleItems();
            "function" === typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
        },
        updateVars: function() {
            "function" === typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]);
            this.watchVisibility();
            this.updateItems();
            this.calculateAll();
            this.updatePosition();
            this.updateControls();
            this.eachMoveUpdate();
            "function" === typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
        },
        reload: function() {
            var a = this;
            g.setTimeout(function() {
                a.updateVars()
            }, 0)
        },
        watchVisibility: function() {
            var a = this;
            if (!1 === a.$elem.is(":visible")) a.$elem.css({
                    opacity: 0
                }),
                g.clearInterval(a.autoPlayInterval), g.clearInterval(a.checkVisible);
            else return !1;
            a.checkVisible = g.setInterval(function() {
                a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
                    opacity: 1
                }, 200), g.clearInterval(a.checkVisible))
            }, 500)
        },
        wrapItems: function() {
            this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
            this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
            this.wrapperOuter = this.$elem.find(".owl-wrapper-outer");
            this.$elem.css("display", "block")
        },
        baseClass: function() {
            var a = this.$elem.hasClass(this.options.baseClass),
                b = this.$elem.hasClass(this.options.theme);
            a || this.$elem.addClass(this.options.baseClass);
            b || this.$elem.addClass(this.options.theme)
        },
        updateItems: function() {
            var a, b;
            if (!1 === this.options.responsive) return !1;
            if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
            a = f(this.options.responsiveBaseWidth).width();
            a > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems);
            if (!1 !== this.options.itemsCustom)
                for (this.options.itemsCustom.sort(function(a, b) {
                        return a[0] - b[0]
                    }), b = 0; b < this.options.itemsCustom.length; b += 1) this.options.itemsCustom[b][0] <= a && (this.options.items = this.options.itemsCustom[b][1]);
            else a <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]),
                a <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), a <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), a <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), a <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
            this.options.items > this.itemsAmount &&
                !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
        },
        response: function() {
            var a = this,
                b, e;
            if (!0 !== a.options.responsive) return !1;
            e = f(g).width();
            a.resizer = function() {
                f(g).width() !== e && (!1 !== a.options.autoPlay && g.clearInterval(a.autoPlayInterval), g.clearTimeout(b), b = g.setTimeout(function() {
                    e = f(g).width();
                    a.updateVars()
                }, a.options.responsiveRefreshRate))
            };
            f(g).resize(a.resizer)
        },
        updatePosition: function() {
            this.jumpTo(this.currentItem);
            !1 !== this.options.autoPlay && this.checkAp()
        },
        appendItemsSizes: function() {
            var a =
                this,
                b = 0,
                e = a.itemsAmount - a.options.items;
            a.$owlItems.each(function(c) {
                var d = f(this);
                d.css({
                    width: a.itemWidth
                }).data("owl-item", Number(c));
                if (0 === c % a.options.items || c === e) c > e || (b += 1);
                d.data("owl-roundPages", b)
            })
        },
        appendWrapperSizes: function() {
            this.$owlWrapper.css({
                width: this.$owlItems.length * this.itemWidth * 2,
                left: 0
            });
            this.appendItemsSizes()
        },
        calculateAll: function() {
            this.calculateWidth();
            this.appendWrapperSizes();
            this.loops();
            this.max()
        },
        calculateWidth: function() {
            this.itemWidth = Math.round(this.$elem.width() /
                this.options.items)
        },
        max: function() {
            var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
            this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = a);
            return a
        },
        min: function() {
            return 0
        },
        loops: function() {
            var a = 0,
                b = 0,
                e, c;
            this.positionsInArray = [0];
            this.pagesInArray = [];
            for (e = 0; e < this.itemsAmount; e += 1) b += this.itemWidth, this.positionsInArray.push(-b), !0 === this.options.scrollPerPage && (c = f(this.$owlItems[e]),
                c = c.data("owl-roundPages"), c !== a && (this.pagesInArray[a] = this.positionsInArray[e], a = c))
        },
        buildControls: function() {
            if (!0 === this.options.navigation || !0 === this.options.pagination) this.owlControls = f('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem);
            !0 === this.options.pagination && this.buildPagination();
            !0 === this.options.navigation && this.buildButtons()
        },
        buildButtons: function() {
            var a = this,
                b = f('<div class="owl-buttons"/>');
            a.owlControls.append(b);
            a.buttonPrev =
                f("<div/>", {
                    "class": "owl-prev",
                    html: a.options.navigationText[0] || ""
                });
            a.buttonNext = f("<div/>", {
                "class": "owl-next",
                html: a.options.navigationText[1] || ""
            });
            b.append(a.buttonPrev).append(a.buttonNext);
            b.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {
                a.preventDefault()
            });
            b.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(b) {
                b.preventDefault();
                f(this).hasClass("owl-next") ? a.next() : a.prev()
            })
        },
        buildPagination: function() {
            var a = this;
            a.paginationWrapper =
                f('<div class="owl-pagination"/>');
            a.owlControls.append(a.paginationWrapper);
            a.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(b) {
                b.preventDefault();
                Number(f(this).data("owl-page")) !== a.currentItem && a.goTo(Number(f(this).data("owl-page")), !0)
            })
        },
        updatePagination: function() {
            var a, b, e, c, d, g;
            if (!1 === this.options.pagination) return !1;
            this.paginationWrapper.html("");
            a = 0;
            b = this.itemsAmount - this.itemsAmount % this.options.items;
            for (c = 0; c < this.itemsAmount; c += 1) 0 === c % this.options.items &&
                (a += 1, b === c && (e = this.itemsAmount - this.options.items), d = f("<div/>", {
                    "class": "owl-page"
                }), g = f("<span></span>", {
                    text: !0 === this.options.paginationNumbers ? a : "",
                    "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
                }), d.append(g), d.data("owl-page", b === c ? e : c), d.data("owl-roundPages", a), this.paginationWrapper.append(d));
            this.checkPagination()
        },
        checkPagination: function() {
            var a = this;
            if (!1 === a.options.pagination) return !1;
            a.paginationWrapper.find(".owl-page").each(function() {
                f(this).data("owl-roundPages") ===
                    f(a.$owlItems[a.currentItem]).data("owl-roundPages") && (a.paginationWrapper.find(".owl-page").removeClass("active"), f(this).addClass("active"))
            })
        },
        checkNavigation: function() {
            if (!1 === this.options.navigation) return !1;
            !1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem ===
                this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")))
        },
        updateControls: function() {
            this.updatePagination();
            this.checkNavigation();
            this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
        },
        destroyControls: function() {
            this.owlControls && this.owlControls.remove()
        },
        next: function(a) {
            if (this.isTransition) return !1;
            this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1;
            if (this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0))
                if (!0 === this.options.rewindNav) this.currentItem = 0, a = "rewind";
                else return this.currentItem = this.maximumItem, !1;
            this.goTo(this.currentItem, a)
        },
        prev: function(a) {
            if (this.isTransition) return !1;
            this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ?
                this.options.items : 1);
            if (0 > this.currentItem)
                if (!0 === this.options.rewindNav) this.currentItem = this.maximumItem, a = "rewind";
                else return this.currentItem = 0, !1;
            this.goTo(this.currentItem, a)
        },
        goTo: function(a, b, e) {
            var c = this;
            if (c.isTransition) return !1;
            "function" === typeof c.options.beforeMove && c.options.beforeMove.apply(this, [c.$elem]);
            a >= c.maximumItem ? a = c.maximumItem : 0 >= a && (a = 0);
            c.currentItem = c.owl.currentItem = a;
            if (!1 !== c.options.transitionStyle && "drag" !== e && 1 === c.options.items && !0 === c.browser.support3d) return c.swapSpeed(0), !0 === c.browser.support3d ? c.transition3d(c.positionsInArray[a]) : c.css2slide(c.positionsInArray[a], 1), c.afterGo(), c.singleItemTransition(), !1;
            a = c.positionsInArray[a];
            !0 === c.browser.support3d ? (c.isCss3Finish = !1, !0 === b ? (c.swapSpeed("paginationSpeed"), g.setTimeout(function() {
                c.isCss3Finish = !0
            }, c.options.paginationSpeed)) : "rewind" === b ? (c.swapSpeed(c.options.rewindSpeed), g.setTimeout(function() {
                c.isCss3Finish = !0
            }, c.options.rewindSpeed)) : (c.swapSpeed("slideSpeed"), g.setTimeout(function() {
                    c.isCss3Finish = !0
                },
                c.options.slideSpeed)), c.transition3d(a)) : !0 === b ? c.css2slide(a, c.options.paginationSpeed) : "rewind" === b ? c.css2slide(a, c.options.rewindSpeed) : c.css2slide(a, c.options.slideSpeed);
            c.afterGo()
        },
        jumpTo: function(a) {
            "function" === typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]);
            a >= this.maximumItem || -1 === a ? a = this.maximumItem : 0 >= a && (a = 0);
            this.swapSpeed(0);
            !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1);
            this.currentItem =
                this.owl.currentItem = a;
            this.afterGo()
        },
        afterGo: function() {
            this.prevArr.push(this.currentItem);
            this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2];
            this.prevArr.shift(0);
            this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp());
            "function" === typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
        },
        stop: function() {
            this.apStatus = "stop";
            g.clearInterval(this.autoPlayInterval)
        },
        checkAp: function() {
            "stop" !== this.apStatus && this.play()
        },
        play: function() {
            var a = this;
            a.apStatus = "play";
            if (!1 === a.options.autoPlay) return !1;
            g.clearInterval(a.autoPlayInterval);
            a.autoPlayInterval = g.setInterval(function() {
                a.next(!0)
            }, a.options.autoPlay)
        },
        swapSpeed: function(a) {
            "slideSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" !== typeof a && this.$owlWrapper.css(this.addCssSpeed(a))
        },
        addCssSpeed: function(a) {
            return {
                "-webkit-transition": "all " + a + "ms ease",
                "-moz-transition": "all " + a + "ms ease",
                "-o-transition": "all " + a + "ms ease",
                transition: "all " + a + "ms ease"
            }
        },
        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            }
        },
        doTranslate: function(a) {
            return {
                "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + a + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" +
                    a + "px, 0px, 0px)",
                transform: "translate3d(" + a + "px, 0px,0px)"
            }
        },
        transition3d: function(a) {
            this.$owlWrapper.css(this.doTranslate(a))
        },
        css2move: function(a) {
            this.$owlWrapper.css({
                left: a
            })
        },
        css2slide: function(a, b) {
            var e = this;
            e.isCssFinish = !1;
            e.$owlWrapper.stop(!0, !0).animate({
                left: a
            }, {
                duration: b || e.options.slideSpeed,
                complete: function() {
                    e.isCssFinish = !0
                }
            })
        },
        checkBrowser: function() {
            var a = k.createElement("div");
            a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
            a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
            this.browser = {
                support3d: null !== a && 1 === a.length,
                isTouch: "ontouchstart" in g || g.navigator.msMaxTouchPoints
            }
        },
        moveEvents: function() {
            if (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) this.gestures(), this.disabledEvents()
        },
        eventTypes: function() {
            var a = ["s", "e", "x"];
            this.ev_types = {};
            !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] :
                !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]);
            this.ev_types.start = a[0];
            this.ev_types.move = a[1];
            this.ev_types.end = a[2]
        },
        disabledEvents: function() {
            this.$elem.on("dragstart.owl", function(a) {
                a.preventDefault()
            });
            this.$elem.on("mousedown.disableTextSelect", function(a) {
                return f(a.target).is("input, textarea, select, option")
            })
        },
        gestures: function() {
            function a(a) {
                if (void 0 !== a.touches) return {
                    x: a.touches[0].pageX,
                    y: a.touches[0].pageY
                };
                if (void 0 === a.touches) {
                    if (void 0 !== a.pageX) return {
                        x: a.pageX,
                        y: a.pageY
                    };
                    if (void 0 === a.pageX) return {
                        x: a.clientX,
                        y: a.clientY
                    }
                }
            }

            function b(a) {
                "on" === a ? (f(k).on(d.ev_types.move, e), f(k).on(d.ev_types.end, c)) : "off" === a && (f(k).off(d.ev_types.move), f(k).off(d.ev_types.end))
            }

            function e(b) {
                b = b.originalEvent || b || g.event;
                d.newPosX = a(b).x - h.offsetX;
                d.newPosY = a(b).y - h.offsetY;
                d.newRelativeX = d.newPosX - h.relativePos;
                "function" === typeof d.options.startDragging && !0 !== h.dragging && 0 !== d.newRelativeX && (h.dragging = !0, d.options.startDragging.apply(d, [d.$elem]));
                (8 < d.newRelativeX || -8 > d.newRelativeX) && !0 === d.browser.isTouch && (void 0 !== b.preventDefault ? b.preventDefault() : b.returnValue = !1, h.sliding = !0);
                (10 < d.newPosY || -10 > d.newPosY) && !1 === h.sliding && f(k).off("touchmove.owl");
                d.newPosX = Math.max(Math.min(d.newPosX, d.newRelativeX / 5), d.maximumPixels + d.newRelativeX / 5);
                !0 === d.browser.support3d ? d.transition3d(d.newPosX) : d.css2move(d.newPosX)
            }

            function c(a) {
                a = a.originalEvent || a || g.event;
                var c;
                a.target = a.target || a.srcElement;
                h.dragging = !1;
                !0 !== d.browser.isTouch && d.$owlWrapper.removeClass("grabbing");
                d.dragDirection = 0 > d.newRelativeX ? d.owl.dragDirection = "left" : d.owl.dragDirection = "right";
                0 !== d.newRelativeX && (c = d.getNewPosition(), d.goTo(c, !1, "drag"), h.targetElement === a.target && !0 !== d.browser.isTouch && (f(a.target).on("click.disable", function(a) {
                        a.stopImmediatePropagation();
                        a.stopPropagation();
                        a.preventDefault();
                        f(a.target).off("click.disable")
                    }),
                    a = f._data(a.target, "events").click, c = a.pop(), a.splice(0, 0, c)));
                b("off")
            }
            var d = this,
                h = {
                    offsetX: 0,
                    offsetY: 0,
                    baseElWidth: 0,
                    relativePos: 0,
                    position: null,
                    minSwipe: null,
                    maxSwipe: null,
                    sliding: null,
                    dargging: null,
                    targetElement: null
                };
            d.isCssFinish = !0;
            d.$elem.on(d.ev_types.start, ".owl-wrapper", function(c) {
                c = c.originalEvent || c || g.event;
                var e;
                if (3 === c.which) return !1;
                if (!(d.itemsAmount <= d.options.items)) {
                    if (!1 === d.isCssFinish && !d.options.dragBeforeAnimFinish || !1 === d.isCss3Finish && !d.options.dragBeforeAnimFinish) return !1;
                    !1 !== d.options.autoPlay && g.clearInterval(d.autoPlayInterval);
                    !0 === d.browser.isTouch || d.$owlWrapper.hasClass("grabbing") || d.$owlWrapper.addClass("grabbing");
                    d.newPosX = 0;
                    d.newRelativeX = 0;
                    f(this).css(d.removeTransition());
                    e = f(this).position();
                    h.relativePos = e.left;
                    h.offsetX = a(c).x - e.left;
                    h.offsetY = a(c).y - e.top;
                    b("on");
                    h.sliding = !1;
                    h.targetElement = c.target || c.srcElement
                }
            })
        },
        getNewPosition: function() {
            var a = this.closestItem();
            a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem =
                a = 0);
            return a
        },
        closestItem: function() {
            var a = this,
                b = !0 === a.options.scrollPerPage ? a.pagesInArray : a.positionsInArray,
                e = a.newPosX,
                c = null;
            f.each(b, function(d, g) {
                e - a.itemWidth / 20 > b[d + 1] && e - a.itemWidth / 20 < g && "left" === a.moveDirection() ? (c = g, a.currentItem = !0 === a.options.scrollPerPage ? f.inArray(c, a.positionsInArray) : d) : e + a.itemWidth / 20 < g && e + a.itemWidth / 20 > (b[d + 1] || b[d] - a.itemWidth) && "right" === a.moveDirection() && (!0 === a.options.scrollPerPage ? (c = b[d + 1] || b[b.length - 1], a.currentItem = f.inArray(c, a.positionsInArray)) :
                    (c = b[d + 1], a.currentItem = d + 1))
            });
            return a.currentItem
        },
        moveDirection: function() {
            var a;
            0 > this.newRelativeX ? (a = "right", this.playDirection = "next") : (a = "left", this.playDirection = "prev");
            return a
        },
        customEvents: function() {
            var a = this;
            a.$elem.on("owl.next", function() {
                a.next()
            });
            a.$elem.on("owl.prev", function() {
                a.prev()
            });
            a.$elem.on("owl.play", function(b, e) {
                a.options.autoPlay = e;
                a.play();
                a.hoverStatus = "play"
            });
            a.$elem.on("owl.stop", function() {
                a.stop();
                a.hoverStatus = "stop"
            });
            a.$elem.on("owl.goTo", function(b, e) {
                a.goTo(e)
            });
            a.$elem.on("owl.jumpTo", function(b, e) {
                a.jumpTo(e)
            })
        },
        stopOnHover: function() {
            var a = this;
            !0 === a.options.stopOnHover && !0 !== a.browser.isTouch && !1 !== a.options.autoPlay && (a.$elem.on("mouseover", function() {
                a.stop()
            }), a.$elem.on("mouseout", function() {
                "stop" !== a.hoverStatus && a.play()
            }))
        },
        lazyLoad: function() {
            var a, b, e, c, d;
            if (!1 === this.options.lazyLoad) return !1;
            for (a = 0; a < this.itemsAmount; a += 1) b = f(this.$owlItems[a]), "loaded" !== b.data("owl-loaded") && (e = b.data("owl-item"), c = b.find(".lazyOwl"), "string" !== typeof c.data("src") ?
                b.data("owl-loaded", "loaded") : (void 0 === b.data("owl-loaded") && (c.hide(), b.addClass("loading").data("owl-loaded", "checked")), (d = !0 === this.options.lazyFollow ? e >= this.currentItem : !0) && e < this.currentItem + this.options.items && c.length && this.lazyPreload(b, c)))
        },
        lazyPreload: function(a, b) {
            function e() {
                a.data("owl-loaded", "loaded").removeClass("loading");
                b.removeAttr("data-src");
                "fade" === d.options.lazyEffect ? b.fadeIn(400) : b.show();
                "function" === typeof d.options.afterLazyLoad && d.options.afterLazyLoad.apply(this, [d.$elem])
            }

            function c() {
                f += 1;
                d.completeImg(b.get(0)) || !0 === k ? e() : 100 >= f ? g.setTimeout(c, 100) : e()
            }
            var d = this,
                f = 0,
                k;
            "DIV" === b.prop("tagName") ? (b.css("background-image", "url(" + b.data("src") + ")"), k = !0) : b[0].src = b.data("src");
            c()
        },
        autoHeight: function() {
            function a() {
                var a = f(e.$owlItems[e.currentItem]).height();
                e.wrapperOuter.css("height", a + "px");
                e.wrapperOuter.hasClass("autoHeight") || g.setTimeout(function() {
                    e.wrapperOuter.addClass("autoHeight")
                }, 0)
            }

            function b() {
                d += 1;
                e.completeImg(c.get(0)) ? a() : 100 >= d ? g.setTimeout(b,
                    100) : e.wrapperOuter.css("height", "")
            }
            var e = this,
                c = f(e.$owlItems[e.currentItem]).find("img"),
                d;
            void 0 !== c.get(0) ? (d = 0, b()) : a()
        },
        completeImg: function(a) {
            return !a.complete || "undefined" !== typeof a.naturalWidth && 0 === a.naturalWidth ? !1 : !0
        },
        onVisibleItems: function() {
            var a;
            !0 === this.options.addClassActive && this.$owlItems.removeClass("active");
            this.visibleItems = [];
            for (a = this.currentItem; a < this.currentItem + this.options.items; a += 1) this.visibleItems.push(a), !0 === this.options.addClassActive && f(this.$owlItems[a]).addClass("active");
            this.owl.visibleItems = this.visibleItems
        },
        transitionTypes: function(a) {
            this.outClass = "owl-" + a + "-out";
            this.inClass = "owl-" + a + "-in"
        },
        singleItemTransition: function() {
            var a = this,
                b = a.outClass,
                e = a.inClass,
                c = a.$owlItems.eq(a.currentItem),
                d = a.$owlItems.eq(a.prevItem),
                f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem],
                g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;
            a.isTransition = !0;
            a.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": g + "px",
                "-moz-perspective-origin": g +
                    "px",
                "perspective-origin": g + "px"
            });
            d.css({
                position: "relative",
                left: f + "px"
            }).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                a.endPrev = !0;
                d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                a.clearTransStyle(d, b)
            });
            c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                a.endCurrent = !0;
                c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
                a.clearTransStyle(c, e)
            })
        },
        clearTransStyle: function(a,
            b) {
            a.css({
                position: "",
                left: ""
            }).removeClass(b);
            this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
        },
        owlStatus: function() {
            this.owl = {
                userOptions: this.userOptions,
                baseElement: this.$elem,
                userItems: this.$userItems,
                owlItems: this.$owlItems,
                currentItem: this.currentItem,
                prevItem: this.prevItem,
                visibleItems: this.visibleItems,
                isTouch: this.browser.isTouch,
                browser: this.browser,
                dragDirection: this.dragDirection
            }
        },
        clearEvents: function() {
            this.$elem.off(".owl owl mousedown.disableTextSelect");
            f(k).off(".owl owl");
            f(g).off("resize", this.resizer)
        },
        unWrap: function() {
            0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove());
            this.clearEvents();
            this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
        },
        destroy: function() {
            this.stop();
            g.clearInterval(this.checkVisible);
            this.unWrap();
            this.$elem.removeData()
        },
        reinit: function(a) {
            a = f.extend({}, this.userOptions,
                a);
            this.unWrap();
            this.init(a, this.$elem)
        },
        addItem: function(a, b) {
            var e;
            if (!a) return !1;
            if (0 === this.$elem.children().length) return this.$elem.append(a), this.setVars(), !1;
            this.unWrap();
            e = void 0 === b || -1 === b ? -1 : b;
            e >= this.$userItems.length || -1 === e ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(e).before(a);
            this.setVars()
        },
        removeItem: function(a) {
            if (0 === this.$elem.children().length) return !1;
            a = void 0 === a || -1 === a ? -1 : a;
            this.unWrap();
            this.$userItems.eq(a).remove();
            this.setVars()
        }
    };
    f.fn.owlCarousel = function(a) {
        return this.each(function() {
            if (!0 ===
                f(this).data("owl-init")) return !1;
            f(this).data("owl-init", !0);
            var b = Object.create(l);
            b.init(a, this);
            f.data(this, "owlCarousel", b)
        })
    };
    f.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1E3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: g,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    }
})(jQuery, window, document);

/*! Magnific Popup - v0.9.9 - 2013-12-04
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2013 Dmitry Semenov; */
(function(e) {
    var t, n, i, o, r, a, s, l = "Close",
        c = "BeforeClose",
        d = "AfterClose",
        u = "BeforeAppend",
        p = "MarkupParse",
        f = "Open",
        m = "Change",
        g = "mfp",
        h = "." + g,
        v = "mfp-ready",
        C = "mfp-removing",
        y = "mfp-prevent-close",
        w = function() {},
        b = !!window.jQuery,
        I = e(window),
        x = function(e, n) {
            t.ev.on(g + e + h, n)
        },
        k = function(t, n, i, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
        },
        T = function(n, i) {
            t.ev.triggerHandler(g + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
        },
        E = function(n) {
            return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn
        },
        _ = function() {
            e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t)
        },
        S = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    w.prototype = {
        constructor: w,
        init: function() {
            var n = navigator.appVersion;
            t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = S(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = e(document), t.popupsCache = {}
        },
        open: function(n) {
            i || (i = e(document.body));
            var r;
            if (n.isObj === !1) {
                t.items = n.items.toArray(), t.index = 0;
                var s, l = n.items;
                for (r = 0; l.length > r; r++)
                    if (s = l[r], s.parsed && (s = s.el[0]), s === n.el[0]) {
                        t.index = r;
                        break
                    }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (t.isOpen) return t.updateItemHTML(), void 0;
            t.types = [], a = "", t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : o, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = k("bg").on("click" + h, function() {
                t.close()
            }), t.wrap = k("wrap").attr("tabindex", -1).on("click" + h, function(e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = k("container", t.wrap)), t.contentContainer = k("content"), t.st.preloader && (t.preloader = k("preloader", t.container, t.st.tLoading));
            var c = e.magnificPopup.modules;
            for (r = 0; c.length > r; r++) {
                var d = c[r];
                d = d.charAt(0).toUpperCase() + d.slice(1), t["init" + d].call(t)
            }
            T("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(p, function(e, t, n, i) {
                n.close_replaceWith = E(i.type)
            }), a += " mfp-close-btn-in") : t.wrap.append(E())), t.st.alignTop && (a += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            }) : t.wrap.css({
                top: I.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: o.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && o.on("keyup" + h, function(e) {
                27 === e.keyCode && t.close()
            }), I.on("resize" + h, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && t.wrap.addClass(a);
            var u = t.wH = I.height(),
                m = {};
            if (t.fixedContentPos && t._hasScrollBar(u)) {
                var g = t._getScrollbarSize();
                g && (m.marginRight = g)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : m.overflow = "hidden");
            var C = t.st.mainClass;
            return t.isIE7 && (C += " mfp-ie7"), C && t._addClassToMFP(C), t.updateItemHTML(), T("BuildControls"), e("html").css(m), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || i), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(v), t._setFocus()) : t.bgOverlay.addClass(v), o.on("focusin" + h, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(u), T(f), n
        },
        close: function() {
            t.isOpen && (T(c), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(C), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            T(l);
            var n = C + " " + v + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                var i = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
            }
            o.off("keyup" + h + " focusin" + h), t.ev.off(h), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, T(d)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || I.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), T("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (T("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                var o = t.st[i] ? t.st[i].markup : !1;
                T("FirstMarkupParse", o), t.currTemplate[i] = o ? e(o) : !0
            }
            r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(a, i), n.preloaded = !0, T(m, n), r = n.type, t.container.prepend(t.contentContainer), T("AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(E()) : t.content = e : t.content = "", T(u), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(n) {
            var i = t.items[n],
                o = i.type;
            if (i = i.tagName ? {
                    el: e(i)
                } : {
                    data: i,
                    src: i.src
                }, i.el) {
                for (var r = t.types, a = 0; r.length > a; a++)
                    if (i.el.hasClass("mfp-" + r[a])) {
                        o = r[a];
                        break
                    }
                i.src = i.el.attr("data-mfp-src"), i.src || (i.src = i.el.attr("href"))
            }
            return i.type = o || t.st.type || "inline", i.index = n, i.parsed = !0, t.items[n] = i, T("ElementParse", i), t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) {
                i.mfpEl = this, t._openClick(i, e, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
            if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
                var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t)) return !0
                    } else if (a > I.width()) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
                var o = {
                    status: e,
                    text: i
                };
                T("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(y)) {
                var i = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (i && o) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (i) return !0
                } else if (o && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || I.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) {
            return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)), T(p, [t, n, i]), e.each(n, function(e, n) {
                if (void 0 === n || n === !1) return !0;
                if (o = e.split("_"), o.length > 1) {
                    var i = t.find(h + "-" + o[0]);
                    if (i.length > 0) {
                        var r = o[1];
                        "replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n)
                    }
                } else t.find(h + "-" + e).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.id = "mfp-sbm", e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: w.prototype,
        modules: [],
        open: function(t, n) {
            return _(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, e.fn.magnificPopup = function(n) {
        _();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = b ? i.data("magnificPopup") : i[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({
                    mfpEl: o
                }, i, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else n = e.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var P, O, z, M = "inline",
        B = function() {
            z && (O.after(z.addClass(P)).detach(), z = null)
        };
    e.magnificPopup.registerModule(M, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(M), x(l + "." + M, function() {
                    B()
                })
            },
            getInline: function(n, i) {
                if (B(), n.src) {
                    var o = t.st.inline,
                        r = e(n.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (O || (P = o.hiddenClass, O = k(P), P = "mfp-" + P), z = r.after(O).detach().removeClass(P)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                    return n.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
            }
        }
    });
    var F, H = "ajax",
        L = function() {
            F && i.removeClass(F)
        },
        A = function() {
            L(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(H, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(H), F = t.st.ajax.cursor, x(l + "." + H, A), x("BeforeChange." + H, A)
            },
            getAjax: function(n) {
                F && i.addClass(F), t.updateStatus("loading");
                var o = e.extend({
                    url: n.src,
                    success: function(i, o, r) {
                        var a = {
                            data: i,
                            xhr: r
                        };
                        T("ParseAjax", a), t.appendContent(e(a.data), H), n.finished = !0, L(), t._setFocus(), setTimeout(function() {
                            t.wrap.addClass(v)
                        }, 16), t.updateStatus("ready"), T("AjaxContentAdded")
                    },
                    error: function() {
                        L(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(o), ""
            }
        }
    });
    var j, N = function(n) {
        if (n.data && void 0 !== n.data.title) return n.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(t, n);
            if (n.el) return n.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var e = t.st.image,
                    n = ".image";
                t.types.push("image"), x(f + n, function() {
                    "image" === t.currItem.type && e.cursor && i.addClass(e.cursor)
                }), x(l + n, function() {
                    e.cursor && i.removeClass(e.cursor), I.off("resize" + h)
                }), x("Resize" + n, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, j && clearInterval(j), e.isCheckingImgSize = !1, T("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    o = function(r) {
                        j && clearInterval(j), j = setInterval(function() {
                            return i.naturalWidth > 0 ? (t._onImageHasSize(e), void 0) : (n > 200 && clearInterval(j), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500), void 0)
                        }, r)
                    };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0,
                    r = function() {
                        n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, T("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a()))
                    },
                    a = function() {
                        n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    },
                    s = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", n.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: N(n),
                    img_replaceWith: n.img
                }, n), t.resizeImage(), n.hasSize ? (j && clearInterval(j), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
            }
        }
    });
    var W, R = function() {
        return void 0 === W && (W = void 0 !== document.createElement("p").style.MozTransform), W
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, a = n.duration,
                        s = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
                        },
                        d = function() {
                            t.content.css("visibility", "visible")
                        };
                    x("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return d(), void 0;
                            r = s(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function() {
                                r.css(t._getOffset(!0)), o = setTimeout(function() {
                                    d(), setTimeout(function() {
                                        r.remove(), e = r = null, T("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), x(c + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                r = s(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), x(l + i, function() {
                        t._allowZoom() && (d(), r && r.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(n) {
                var i;
                i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var o = i.offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    a = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var s = {
                    width: i.width(),
                    height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r
                };
                return R() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
            }
        }
    });
    var Z = "iframe",
        q = "//about:blank",
        D = function(e) {
            if (t.currTemplate[Z]) {
                var n = t.currTemplate[Z].find("iframe");
                n.length && (e || (n[0].src = q), t.isIE8 && n.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(Z, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(Z), x("BeforeChange", function(e, t, n) {
                    t !== n && (t === Z ? D() : n === Z && D(!0))
                }), x(l + "." + Z, function() {
                    D()
                })
            },
            getIframe: function(n, i) {
                var o = n.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() {
                    return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                });
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
            }
        }
    });
    var K = function(e) {
            var n = t.items.length;
            return e > n - 1 ? e - n : 0 > e ? n + e : e
        },
        Y = function(e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var n = t.st.gallery,
                    i = ".mfp-gallery",
                    r = Boolean(e.fn.mfpFastClick);
                return t.direction = !0, n && n.enabled ? (a += " mfp-gallery", x(f + i, function() {
                    n.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function() {
                        return t.items.length > 1 ? (t.next(), !1) : void 0
                    }), o.on("keydown" + i, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), x("UpdateStatus" + i, function(e, n) {
                    n.text && (n.text = Y(n.text, t.currItem.index, t.items.length))
                }), x(p + i, function(e, i, o, r) {
                    var a = t.items.length;
                    o.counter = a > 1 ? Y(n.tCounter, r.index, a) : ""
                }), x("BuildControls" + i, function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var i = n.arrowMarkup,
                            o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            a = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y),
                            s = r ? "mfpFastClick" : "click";
                        o[s](function() {
                            t.prev()
                        }), a[s](function() {
                            t.next()
                        }), t.isIE7 && (k("b", o[0], !1, !0), k("a", o[0], !1, !0), k("b", a[0], !1, !0), k("a", a[0], !1, !0)), t.container.append(o.add(a))
                    }
                }), x(m + i, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), x(l + i, function() {
                    o.off(i), t.wrap.off("click" + i), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
                }), void 0) : !1
            },
            next: function() {
                t.direction = !0, t.index = K(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = K(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    i = Math.min(n[0], t.items.length),
                    o = Math.min(n[1], t.items.length);
                for (e = 1;
                    (t.direction ? o : i) >= e; e++) t._preloadItem(t.index + e);
                for (e = 1;
                    (t.direction ? i : o) >= e; e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = K(n), !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)), T("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        i.hasSize = !0
                    }).on("error.mfploader", function() {
                        i.hasSize = !0, i.loadError = !0, T("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    e.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(e) {
                    return e.src.replace(/\.\w+$/, function(e) {
                        return "@2x" + e
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var e = t.st.retina,
                            n = e.ratio;
                        n = isNaN(n) ? n() : n, n > 1 && (x("ImageHasSize." + U, function(e, t) {
                            t.img.css({
                                "max-width": t.img[0].naturalWidth / n,
                                width: "100%"
                            })
                        }), x("ElementParse." + U, function(t, i) {
                            i.src = e.replaceSrc(i, n)
                        }))
                    }
                }
            }
        }),
        function() {
            var t = 1e3,
                n = "ontouchstart" in window,
                i = function() {
                    I.off("touchmove" + r + " touchend" + r)
                },
                o = "mfpFastClick",
                r = "." + o;
            e.fn.mfpFastClick = function(o) {
                return e(this).each(function() {
                    var a, s = e(this);
                    if (n) {
                        var l, c, d, u, p, f;
                        s.on("touchstart" + r, function(e) {
                            u = !1, f = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, d = p.clientY, I.on("touchmove" + r, function(e) {
                                p = e.originalEvent ? e.originalEvent.touches : e.touches, f = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - d) > 10) && (u = !0, i())
                            }).on("touchend" + r, function(e) {
                                i(), u || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function() {
                                    a = !1
                                }, t), o())
                            })
                        })
                    }
                    s.on("click" + r, function() {
                        a || o()
                    })
                })
            }, e.fn.destroyMfpFastClick = function() {
                e(this).off("touchstart" + r + " click" + r), n && I.off("touchmove" + r + " touchend" + r)
            }
        }(), _()
})(window.jQuery || window.Zepto);

(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 100, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        onUpdate: null, // callback method for every time the element is updated,
        onComplete: null, // callback method for when the element finishes updating
    };
})(jQuery);



/********************************************
	-	THEMEPUNCH TOOLS Ver. 1.0     -
	 Last Update of Tools 16.04.2014
*********************************************/


/*
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.6
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.skinkers.com/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 *
 * Copyright (c) 2010 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function(a) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function(f) {
    var p = "left",
        o = "right",
        e = "up",
        x = "down",
        c = "in",
        z = "out",
        m = "none",
        s = "auto",
        l = "swipe",
        t = "pinch",
        A = "tap",
        j = "doubletap",
        b = "longtap",
        y = "hold",
        D = "horizontal",
        u = "vertical",
        i = "all",
        r = 10,
        g = "start",
        k = "move",
        h = "end",
        q = "cancel",
        a = "ontouchstart" in window,
        v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
        d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        B = "TouchSwipe";
    var n = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe"
    };
    f.fn.swipe = function(G) {
        var F = f(this),
            E = F.data(B);
        if (E && typeof G === "string") {
            if (E[G]) {
                return E[G].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                f.error("Method " + G + " does not exist on jQuery.swipe")
            }
        } else {
            if (!E && (typeof G === "object" || !G)) {
                return w.apply(this, arguments)
            }
        }
        return F
    };
    f.fn.swipe.defaults = n;
    f.fn.swipe.phases = {
        PHASE_START: g,
        PHASE_MOVE: k,
        PHASE_END: h,
        PHASE_CANCEL: q
    };
    f.fn.swipe.directions = {
        LEFT: p,
        RIGHT: o,
        UP: e,
        DOWN: x,
        IN: c,
        OUT: z
    };
    f.fn.swipe.pageScroll = {
        NONE: m,
        HORIZONTAL: D,
        VERTICAL: u,
        AUTO: s
    };
    f.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: i
    };

    function w(E) {
        if (E && (E.allowPageScroll === undefined && (E.swipe !== undefined || E.swipeStatus !== undefined))) {
            E.allowPageScroll = m
        }
        if (E.click !== undefined && E.tap === undefined) {
            E.tap = E.click
        }
        if (!E) {
            E = {}
        }
        E = f.extend({}, f.fn.swipe.defaults, E);
        return this.each(function() {
            var G = f(this);
            var F = G.data(B);
            if (!F) {
                F = new C(this, E);
                G.data(B, F)
            }
        })
    }

    function C(a4, av) {
        var az = (a || d || !av.fallbackToMouseEvents),
            J = az ? (d ? (v ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
            ay = az ? (d ? (v ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
            U = az ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
            S = az ? null : "mouseleave",
            aD = (d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel");
        var ag = 0,
            aP = null,
            ab = 0,
            a1 = 0,
            aZ = 0,
            G = 1,
            aq = 0,
            aJ = 0,
            M = null;
        var aR = f(a4);
        var Z = "start";
        var W = 0;
        var aQ = null;
        var T = 0,
            a2 = 0,
            a5 = 0,
            ad = 0,
            N = 0;
        var aW = null,
            af = null;
        try {
            aR.bind(J, aN);
            aR.bind(aD, a9)
        } catch (ak) {
            f.error("events not supported " + J + "," + aD + " on jQuery.swipe")
        }
        this.enable = function() {
            aR.bind(J, aN);
            aR.bind(aD, a9);
            return aR
        };
        this.disable = function() {
            aK();
            return aR
        };
        this.destroy = function() {
            aK();
            aR.data(B, null);
            return aR
        };
        this.option = function(bc, bb) {
            if (av[bc] !== undefined) {
                if (bb === undefined) {
                    return av[bc]
                } else {
                    av[bc] = bb
                }
            } else {
                f.error("Option " + bc + " does not exist on jQuery.swipe.options")
            }
            return null
        };

        function aN(bd) {
            if (aB()) {
                return
            }
            if (f(bd.target).closest(av.excludedElements, aR).length > 0) {
                return
            }
            var be = bd.originalEvent ? bd.originalEvent : bd;
            var bc, bb = a ? be.touches[0] : be;
            Z = g;
            if (a) {
                W = be.touches.length
            } else {
                bd.preventDefault()
            }
            ag = 0;
            aP = null;
            aJ = null;
            ab = 0;
            a1 = 0;
            aZ = 0;
            G = 1;
            aq = 0;
            aQ = aj();
            M = aa();
            R();
            if (!a || (W === av.fingers || av.fingers === i) || aX()) {
                ai(0, bb);
                T = at();
                if (W == 2) {
                    ai(1, be.touches[1]);
                    a1 = aZ = au(aQ[0].start, aQ[1].start)
                }
                if (av.swipeStatus || av.pinchStatus) {
                    bc = O(be, Z)
                }
            } else {
                bc = false
            }
            if (bc === false) {
                Z = q;
                O(be, Z);
                return bc
            } else {
                if (av.hold) {
                    af = setTimeout(f.proxy(function() {
                        aR.trigger("hold", [be.target]);
                        if (av.hold) {
                            bc = av.hold.call(aR, be, be.target)
                        }
                    }, this), av.longTapThreshold)
                }
                ao(true)
            }
            return null
        }

        function a3(be) {
            var bh = be.originalEvent ? be.originalEvent : be;
            if (Z === h || Z === q || am()) {
                return
            }
            var bd, bc = a ? bh.touches[0] : bh;
            var bf = aH(bc);
            a2 = at();
            if (a) {
                W = bh.touches.length
            }
            if (av.hold) {
                clearTimeout(af)
            }
            Z = k;
            if (W == 2) {
                if (a1 == 0) {
                    ai(1, bh.touches[1]);
                    a1 = aZ = au(aQ[0].start, aQ[1].start)
                } else {
                    aH(bh.touches[1]);
                    aZ = au(aQ[0].end, aQ[1].end);
                    aJ = ar(aQ[0].end, aQ[1].end)
                }
                G = a7(a1, aZ);
                aq = Math.abs(a1 - aZ)
            }
            if ((W === av.fingers || av.fingers === i) || !a || aX()) {
                aP = aL(bf.start, bf.end);
                al(be, aP);
                ag = aS(bf.start, bf.end);
                ab = aM();
                aI(aP, ag);
                if (av.swipeStatus || av.pinchStatus) {
                    bd = O(bh, Z)
                }
                if (!av.triggerOnTouchEnd || av.triggerOnTouchLeave) {
                    var bb = true;
                    if (av.triggerOnTouchLeave) {
                        var bg = aY(this);
                        bb = E(bf.end, bg)
                    }
                    if (!av.triggerOnTouchEnd && bb) {
                        Z = aC(k)
                    } else {
                        if (av.triggerOnTouchLeave && !bb) {
                            Z = aC(h)
                        }
                    }
                    if (Z == q || Z == h) {
                        O(bh, Z)
                    }
                }
            } else {
                Z = q;
                O(bh, Z)
            }
            if (bd === false) {
                Z = q;
                O(bh, Z)
            }
        }

        function L(bb) {
            var bc = bb.originalEvent;
            if (a) {
                if (bc.touches.length > 0) {
                    F();
                    return true
                }
            }
            if (am()) {
                W = ad
            }
            a2 = at();
            ab = aM();
            if (ba() || !an()) {
                Z = q;
                O(bc, Z)
            } else {
                if (av.triggerOnTouchEnd || (av.triggerOnTouchEnd == false && Z === k)) {
                    bb.preventDefault();
                    Z = h;
                    O(bc, Z)
                } else {
                    if (!av.triggerOnTouchEnd && a6()) {
                        Z = h;
                        aF(bc, Z, A)
                    } else {
                        if (Z === k) {
                            Z = q;
                            O(bc, Z)
                        }
                    }
                }
            }
            ao(false);
            return null
        }

        function a9() {
            W = 0;
            a2 = 0;
            T = 0;
            a1 = 0;
            aZ = 0;
            G = 1;
            R();
            ao(false)
        }

        function K(bb) {
            var bc = bb.originalEvent;
            if (av.triggerOnTouchLeave) {
                Z = aC(h);
                O(bc, Z)
            }
        }

        function aK() {
            aR.unbind(J, aN);
            aR.unbind(aD, a9);
            aR.unbind(ay, a3);
            aR.unbind(U, L);
            if (S) {
                aR.unbind(S, K)
            }
            ao(false)
        }

        function aC(bf) {
            var be = bf;
            var bd = aA();
            var bc = an();
            var bb = ba();
            if (!bd || bb) {
                be = q
            } else {
                if (bc && bf == k && (!av.triggerOnTouchEnd || av.triggerOnTouchLeave)) {
                    be = h
                } else {
                    if (!bc && bf == h && av.triggerOnTouchLeave) {
                        be = q
                    }
                }
            }
            return be
        }

        function O(bd, bb) {
            var bc = undefined;
            if (I() || V()) {
                bc = aF(bd, bb, l)
            } else {
                if ((P() || aX()) && bc !== false) {
                    bc = aF(bd, bb, t)
                }
            }
            if (aG() && bc !== false) {
                bc = aF(bd, bb, j)
            } else {
                if (ap() && bc !== false) {
                    bc = aF(bd, bb, b)
                } else {
                    if (ah() && bc !== false) {
                        bc = aF(bd, bb, A)
                    }
                }
            }
            if (bb === q) {
                a9(bd)
            }
            if (bb === h) {
                if (a) {
                    if (bd.touches.length == 0) {
                        a9(bd)
                    }
                } else {
                    a9(bd)
                }
            }
            return bc
        }

        function aF(be, bb, bd) {
            var bc = undefined;
            if (bd == l) {
                aR.trigger("swipeStatus", [bb, aP || null, ag || 0, ab || 0, W, aQ]);
                if (av.swipeStatus) {
                    bc = av.swipeStatus.call(aR, be, bb, aP || null, ag || 0, ab || 0, W, aQ);
                    if (bc === false) {
                        return false
                    }
                }
                if (bb == h && aV()) {
                    aR.trigger("swipe", [aP, ag, ab, W, aQ]);
                    if (av.swipe) {
                        bc = av.swipe.call(aR, be, aP, ag, ab, W, aQ);
                        if (bc === false) {
                            return false
                        }
                    }
                    switch (aP) {
                        case p:
                            aR.trigger("swipeLeft", [aP, ag, ab, W, aQ]);
                            if (av.swipeLeft) {
                                bc = av.swipeLeft.call(aR, be, aP, ag, ab, W, aQ)
                            }
                            break;
                        case o:
                            aR.trigger("swipeRight", [aP, ag, ab, W, aQ]);
                            if (av.swipeRight) {
                                bc = av.swipeRight.call(aR, be, aP, ag, ab, W, aQ)
                            }
                            break;
                        case e:
                            aR.trigger("swipeUp", [aP, ag, ab, W, aQ]);
                            if (av.swipeUp) {
                                bc = av.swipeUp.call(aR, be, aP, ag, ab, W, aQ)
                            }
                            break;
                        case x:
                            aR.trigger("swipeDown", [aP, ag, ab, W, aQ]);
                            if (av.swipeDown) {
                                bc = av.swipeDown.call(aR, be, aP, ag, ab, W, aQ)
                            }
                            break
                    }
                }
            }
            if (bd == t) {
                aR.trigger("pinchStatus", [bb, aJ || null, aq || 0, ab || 0, W, G, aQ]);
                if (av.pinchStatus) {
                    bc = av.pinchStatus.call(aR, be, bb, aJ || null, aq || 0, ab || 0, W, G, aQ);
                    if (bc === false) {
                        return false
                    }
                }
                if (bb == h && a8()) {
                    switch (aJ) {
                        case c:
                            aR.trigger("pinchIn", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
                            if (av.pinchIn) {
                                bc = av.pinchIn.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ)
                            }
                            break;
                        case z:
                            aR.trigger("pinchOut", [aJ || null, aq || 0, ab || 0, W, G, aQ]);
                            if (av.pinchOut) {
                                bc = av.pinchOut.call(aR, be, aJ || null, aq || 0, ab || 0, W, G, aQ)
                            }
                            break
                    }
                }
            }
            if (bd == A) {
                if (bb === q || bb === h) {
                    clearTimeout(aW);
                    clearTimeout(af);
                    if (Y() && !H()) {
                        N = at();
                        aW = setTimeout(f.proxy(function() {
                            N = null;
                            aR.trigger("tap", [be.target]);
                            if (av.tap) {
                                bc = av.tap.call(aR, be, be.target)
                            }
                        }, this), av.doubleTapThreshold)
                    } else {
                        N = null;
                        aR.trigger("tap", [be.target]);
                        if (av.tap) {
                            bc = av.tap.call(aR, be, be.target)
                        }
                    }
                }
            } else {
                if (bd == j) {
                    if (bb === q || bb === h) {
                        clearTimeout(aW);
                        N = null;
                        aR.trigger("doubletap", [be.target]);
                        if (av.doubleTap) {
                            bc = av.doubleTap.call(aR, be, be.target)
                        }
                    }
                } else {
                    if (bd == b) {
                        if (bb === q || bb === h) {
                            clearTimeout(aW);
                            N = null;
                            aR.trigger("longtap", [be.target]);
                            if (av.longTap) {
                                bc = av.longTap.call(aR, be, be.target)
                            }
                        }
                    }
                }
            }
            return bc
        }

        function an() {
            var bb = true;
            if (av.threshold !== null) {
                bb = ag >= av.threshold
            }
            return bb
        }

        function ba() {
            var bb = false;
            if (av.cancelThreshold !== null && aP !== null) {
                bb = (aT(aP) - ag) >= av.cancelThreshold
            }
            return bb
        }

        function ae() {
            if (av.pinchThreshold !== null) {
                return aq >= av.pinchThreshold
            }
            return true
        }

        function aA() {
            var bb;
            if (av.maxTimeThreshold) {
                if (ab >= av.maxTimeThreshold) {
                    bb = false
                } else {
                    bb = true
                }
            } else {
                bb = true
            }
            return bb
        }

        function al(bb, bc) {
            if (av.allowPageScroll === m || aX()) {
                bb.preventDefault()
            } else {
                var bd = av.allowPageScroll === s;
                switch (bc) {
                    case p:
                        if ((av.swipeLeft && bd) || (!bd && av.allowPageScroll != D)) {
                            bb.preventDefault()
                        }
                        break;
                    case o:
                        if ((av.swipeRight && bd) || (!bd && av.allowPageScroll != D)) {
                            bb.preventDefault()
                        }
                        break;
                    case e:
                        if ((av.swipeUp && bd) || (!bd && av.allowPageScroll != u)) {
                            bb.preventDefault()
                        }
                        break;
                    case x:
                        if ((av.swipeDown && bd) || (!bd && av.allowPageScroll != u)) {
                            bb.preventDefault()
                        }
                        break
                }
            }
        }

        function a8() {
            var bc = aO();
            var bb = X();
            var bd = ae();
            return bc && bb && bd
        }

        function aX() {
            return !!(av.pinchStatus || av.pinchIn || av.pinchOut)
        }

        function P() {
            return !!(a8() && aX())
        }

        function aV() {
            var be = aA();
            var bg = an();
            var bd = aO();
            var bb = X();
            var bc = ba();
            var bf = !bc && bb && bd && bg && be;
            return bf
        }

        function V() {
            return !!(av.swipe || av.swipeStatus || av.swipeLeft || av.swipeRight || av.swipeUp || av.swipeDown)
        }

        function I() {
            return !!(aV() && V())
        }

        function aO() {
            return ((W === av.fingers || av.fingers === i) || !a)
        }

        function X() {
            return aQ[0].end.x !== 0
        }

        function a6() {
            return !!(av.tap)
        }

        function Y() {
            return !!(av.doubleTap)
        }

        function aU() {
            return !!(av.longTap)
        }

        function Q() {
            if (N == null) {
                return false
            }
            var bb = at();
            return (Y() && ((bb - N) <= av.doubleTapThreshold))
        }

        function H() {
            return Q()
        }

        function ax() {
            return ((W === 1 || !a) && (isNaN(ag) || ag < av.threshold))
        }

        function a0() {
            return ((ab > av.longTapThreshold) && (ag < r))
        }

        function ah() {
            return !!(ax() && a6())
        }

        function aG() {
            return !!(Q() && Y())
        }

        function ap() {
            return !!(a0() && aU())
        }

        function F() {
            a5 = at();
            ad = event.touches.length + 1
        }

        function R() {
            a5 = 0;
            ad = 0
        }

        function am() {
            var bb = false;
            if (a5) {
                var bc = at() - a5;
                if (bc <= av.fingerReleaseThreshold) {
                    bb = true
                }
            }
            return bb
        }

        function aB() {
            return !!(aR.data(B + "_intouch") === true)
        }

        function ao(bb) {
            if (bb === true) {
                aR.bind(ay, a3);
                aR.bind(U, L);
                if (S) {
                    aR.bind(S, K)
                }
            } else {
                aR.unbind(ay, a3, false);
                aR.unbind(U, L, false);
                if (S) {
                    aR.unbind(S, K, false)
                }
            }
            aR.data(B + "_intouch", bb === true)
        }

        function ai(bc, bb) {
            var bd = bb.identifier !== undefined ? bb.identifier : 0;
            aQ[bc].identifier = bd;
            aQ[bc].start.x = aQ[bc].end.x = bb.pageX || bb.clientX;
            aQ[bc].start.y = aQ[bc].end.y = bb.pageY || bb.clientY;
            return aQ[bc]
        }

        function aH(bb) {
            var bd = bb.identifier !== undefined ? bb.identifier : 0;
            var bc = ac(bd);
            bc.end.x = bb.pageX || bb.clientX;
            bc.end.y = bb.pageY || bb.clientY;
            return bc
        }

        function ac(bc) {
            for (var bb = 0; bb < aQ.length; bb++) {
                if (aQ[bb].identifier == bc) {
                    return aQ[bb]
                }
            }
        }

        function aj() {
            var bb = [];
            for (var bc = 0; bc <= 5; bc++) {
                bb.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                })
            }
            return bb
        }

        function aI(bb, bc) {
            bc = Math.max(bc, aT(bb));
            M[bb].distance = bc
        }

        function aT(bb) {
            if (M[bb]) {
                return M[bb].distance
            }
            return undefined
        }

        function aa() {
            var bb = {};
            bb[p] = aw(p);
            bb[o] = aw(o);
            bb[e] = aw(e);
            bb[x] = aw(x);
            return bb
        }

        function aw(bb) {
            return {
                direction: bb,
                distance: 0
            }
        }

        function aM() {
            return a2 - T
        }

        function au(be, bd) {
            var bc = Math.abs(be.x - bd.x);
            var bb = Math.abs(be.y - bd.y);
            return Math.round(Math.sqrt(bc * bc + bb * bb))
        }

        function a7(bb, bc) {
            var bd = (bc / bb) * 1;
            return bd.toFixed(2)
        }

        function ar() {
            if (G < 1) {
                return z
            } else {
                return c
            }
        }

        function aS(bc, bb) {
            return Math.round(Math.sqrt(Math.pow(bb.x - bc.x, 2) + Math.pow(bb.y - bc.y, 2)))
        }

        function aE(be, bc) {
            var bb = be.x - bc.x;
            var bg = bc.y - be.y;
            var bd = Math.atan2(bg, bb);
            var bf = Math.round(bd * 180 / Math.PI);
            if (bf < 0) {
                bf = 360 - Math.abs(bf)
            }
            return bf
        }

        function aL(bc, bb) {
            var bd = aE(bc, bb);
            if ((bd <= 45) && (bd >= 0)) {
                return p
            } else {
                if ((bd <= 360) && (bd >= 315)) {
                    return p
                } else {
                    if ((bd >= 135) && (bd <= 225)) {
                        return o
                    } else {
                        if ((bd > 45) && (bd < 135)) {
                            return x
                        } else {
                            return e
                        }
                    }
                }
            }
        }

        function at() {
            var bb = new Date();
            return bb.getTime()
        }

        function aY(bb) {
            bb = f(bb);
            var bd = bb.offset();
            var bc = {
                left: bd.left,
                right: bd.left + bb.outerWidth(),
                top: bd.top,
                bottom: bd.top + bb.outerHeight()
            };
            return bc
        }

        function E(bb, bc) {
            return (bb.x > bc.left && bb.x < bc.right && bb.y > bc.top && bb.y < bc.bottom)
        }
    }
}));



if (typeof(console) === 'undefined') {
    var console = {}
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function() {};
}

if (window.tplogs == true)
    try {
        console.groupCollapsed("ThemePunch GreenSocks Logs");
    } catch (e) {}


var oldgs = window.GreenSockGlobals;
oldgs_queue = window._gsQueue;

var punchgs = window.GreenSockGlobals = {};

if (window.tplogs == true)
    try {
        console.info("Build GreenSock SandBox for ThemePunch Plugins");
        console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");
    } catch (e) {}

/*!
 * VERSION: 1.13.1
 * DATE: 2014-07-22
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
(function(t, e) {
    "use strict";
    var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!i.TweenLite) {
        var s, n, r, a, o, l = function(t) {
                var e, s = t.split("."),
                    n = i;
                for (e = 0; s.length > e; e++) n[s[e]] = n = n[s[e]] || {};
                return n
            },
            h = l("com.greensock"),
            _ = 1e-10,
            u = function(t) {
                var e, i = [],
                    s = t.length;
                for (e = 0; e !== s; i.push(t[e++]));
                return i
            },
            f = function() {},
            m = function() {
                var t = Object.prototype.toString,
                    e = t.call([]);
                return function(i) {
                    return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                }
            }(),
            p = {},
            c = function(s, n, r, a) {
                this.sc = p[s] ? p[s].sc : [], p[s] = this, this.gsClass = null, this.func = r;
                var o = [];
                this.check = function(h) {
                    for (var _, u, f, m, d = n.length, v = d; --d > -1;)(_ = p[n[d]] || new c(n[d], [])).gsClass ? (o[d] = _.gsClass, v--) : h && _.sc.push(this);
                    if (0 === v && r)
                        for (u = ("com.greensock." + s).split("."), f = u.pop(), m = l(u.join("."))[f] = this.gsClass = r.apply(r, o), a && (i[f] = m, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function() {
                                return m
                            }) : s === e && "undefined" != typeof module && module.exports && (module.exports = m)), d = 0; this.sc.length > d; d++) this.sc[d].check()
                }, this.check(!0)
            },
            d = t._gsDefine = function(t, e, i, s) {
                return new c(t, e, i, s)
            },
            v = h._class = function(t, e, i) {
                return e = e || function() {}, d(t, [], function() {
                    return e
                }, i), e
            };
        d.globals = i;
        var g = [0, 0, 1, 1],
            T = [],
            y = v("easing.Ease", function(t, e, i, s) {
                this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? g.concat(e) : g
            }, !0),
            w = y.map = {},
            P = y.register = function(t, e, i, s) {
                for (var n, r, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)
                    for (r = l[_], n = s ? v("easing." + r, null, !0) : h.easing[r] || {}, a = u.length; --a > -1;) o = u[a], w[r + "." + o] = w[o + r] = n[o] = t.getRatio ? t : t[o] || new t
            };
        for (r = y.prototype, r._calcEnd = !1, r.getRatio = function(t) {
                if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                var e = this._type,
                    i = this._power,
                    s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
            }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = s.length; --n > -1;) r = s[n] + ",Power" + n, P(new y(null, null, 1, n), r, "easeOut", !0), P(new y(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), P(new y(null, null, 3, n), r, "easeInOut");
        w.linear = h.easing.Linear.easeIn, w.swing = h.easing.Quad.easeInOut;
        var b = v("events.EventDispatcher", function(t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        r = b.prototype, r.addEventListener = function(t, e, i, s, n) {
            n = n || 0;
            var r, l, h = this._listeners[t],
                _ = 0;
            for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) r = h[l], r.c === e && r.s === i ? h.splice(l, 1) : 0 === _ && n > r.pr && (_ = l + 1);
            h.splice(_, 0, {
                c: e,
                s: i,
                up: s,
                pr: n
            }), this !== a || o || a.wake()
        }, r.removeEventListener = function(t, e) {
            var i, s = this._listeners[t];
            if (s)
                for (i = s.length; --i > -1;)
                    if (s[i].c === e) return s.splice(i, 1), void 0
        }, r.dispatchEvent = function(t) {
            var e, i, s, n = this._listeners[t];
            if (n)
                for (e = n.length, i = this._eventTarget; --e > -1;) s = n[e], s.up ? s.c.call(s.s || i, {
                    type: t,
                    target: i
                }) : s.c.call(s.s || i)
        };
        var k = t.requestAnimationFrame,
            A = t.cancelAnimationFrame,
            S = Date.now || function() {
                return (new Date).getTime()
            },
            x = S();
        for (s = ["ms", "moz", "webkit", "o"], n = s.length; --n > -1 && !k;) k = t[s[n] + "RequestAnimationFrame"], A = t[s[n] + "CancelAnimationFrame"] || t[s[n] + "CancelRequestAnimationFrame"];
        v("Ticker", function(t, e) {
            var i, s, n, r, l, h = this,
                u = S(),
                m = e !== !1 && k,
                p = 500,
                c = 33,
                d = function(t) {
                    var e, a, o = S() - x;
                    o > p && (u += o - c), x += o, h.time = (x - u) / 1e3, e = h.time - l, (!i || e > 0 || t === !0) && (h.frame++, l += e + (e >= r ? .004 : r - e), a = !0), t !== !0 && (n = s(d)), a && h.dispatchEvent("tick")
                };
            b.call(h), h.time = h.frame = 0, h.tick = function() {
                d(!0)
            }, h.lagSmoothing = function(t, e) {
                p = t || 1 / _, c = Math.min(e, p, 0)
            }, h.sleep = function() {
                null != n && (m && A ? A(n) : clearTimeout(n), s = f, n = null, h === a && (o = !1))
            }, h.wake = function() {
                null !== n ? h.sleep() : h.frame > 10 && (x = S() - p + 5), s = 0 === i ? f : m && k ? k : function(t) {
                    return setTimeout(t, 0 | 1e3 * (l - h.time) + 1)
                }, h === a && (o = !0), d(2)
            }, h.fps = function(t) {
                return arguments.length ? (i = t, r = 1 / (i || 60), l = this.time + r, h.wake(), void 0) : i
            }, h.useRAF = function(t) {
                return arguments.length ? (h.sleep(), m = t, h.fps(i), void 0) : m
            }, h.fps(t), setTimeout(function() {
                m && (!n || 5 > h.frame) && h.useRAF(!1)
            }, 1500)
        }), r = h.Ticker.prototype = new h.events.EventDispatcher, r.constructor = h.Ticker;
        var C = v("core.Animation", function(t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
                o || a.wake();
                var i = this.vars.useFrames ? q : B;
                i.add(this, i._time), this.vars.paused && this.paused(!0)
            }
        });
        a = C.ticker = new h.Ticker, r = C.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
        var R = function() {
            o && S() - x > 2e3 && a.wake(), setTimeout(R, 2e3)
        };
        R(), r.play = function(t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, r.pause = function(t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, r.resume = function(t, e) {
            return null != t && this.seek(t, e), this.paused(!1)
        }, r.seek = function(t, e) {
            return this.totalTime(Number(t), e !== !1)
        }, r.restart = function(t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
        }, r.reverse = function(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, r.render = function() {}, r.invalidate = function() {
            return this
        }, r.isActive = function() {
            var t, e = this._timeline,
                i = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
        }, r._enabled = function(t, e) {
            return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, r._kill = function() {
            return this._enabled(!1, !1)
        }, r.kill = function(t, e) {
            return this._kill(t, e), this
        }, r._uncache = function(t) {
            for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
            return this
        }, r._swapSelfInParams = function(t) {
            for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
            return i
        }, r.eventCallback = function(t, e, i, s) {
            if ("on" === (t || "").substr(0, 2)) {
                var n = this.vars;
                if (1 === arguments.length) return n[t];
                null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, r.delay = function(t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, r.duration = function(t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, r.totalDuration = function(t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, r.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, r.totalTime = function(t, e, i) {
            if (o || a.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration,
                        n = this._timeline;
                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? s - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline)
                        for (; n._timeline;) n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), n = n._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), O.length && M())
            }
            return this
        }, r.progress = r.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
        }, r.startTime = function(t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, r.timeScale = function(t) {
            if (!arguments.length) return this._timeScale;
            if (t = t || _, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime,
                    i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, r.reversed = function(t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, r.paused = function(t) {
            if (!arguments.length) return this._paused;
            if (t != this._paused && this._timeline) {
                o || t || a.wake();
                var e = this._timeline,
                    i = e.rawTime(),
                    s = i - this._pauseTime;
                !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !t && this._enabled(!0, !1), this
        };
        var D = v("core.SimpleTimeline", function(t) {
            C.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        r = D.prototype = new C, r.constructor = D, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function(t, e) {
            var i, s;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                for (s = t._startTime; i && i._startTime > s;) i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
        }, r._remove = function(t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, this._timeline && this._uncache(!0)), this
        }, r.render = function(t, e, i) {
            var s, n = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; n;) s = n._next, (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s
        }, r.rawTime = function() {
            return o || a.wake(), this._totalTime
        };
        var I = v("TweenLite", function(e, i, s) {
                if (C.call(this, i, s), this.render = I.prototype.render, null == e) throw "Cannot tween a null target.";
                this.target = e = "string" != typeof e ? e : I.selector(e) || e;
                var n, r, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                    l = this.vars.overwrite;
                if (this._overwrite = l = null == l ? Q[I.defaultOverwrite] : "number" == typeof l ? l >> 0 : Q[l], (o || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
                    for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], n = 0; a.length > n; n++) r = a[n], r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (a.splice(n--, 1), this._targets = a = a.concat(u(r))) : (this._siblings[n] = $(r, this, !1), 1 === l && this._siblings[n].length > 1 && K(r, this, null, 1, this._siblings[n])) : (r = a[n--] = I.selector(r), "string" == typeof r && a.splice(n + 1, 1)) : a.splice(n--, 1);
                else this._propLookup = {}, this._siblings = $(e, this, !1), 1 === l && this._siblings.length > 1 && K(e, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_, this.render(-this._delay))
            }, !0),
            E = function(e) {
                return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
            },
            z = function(t, e) {
                var i, s = {};
                for (i in t) G[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!U[i] || U[i] && U[i]._autoCSS) || (s[i] = t[i], delete t[i]);
                t.css = s
            };
        r = I.prototype = new C, r.constructor = I, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = r._lazy = !1, I.version = "1.13.1", I.defaultEase = r._ease = new y(null, null, 1, 1), I.defaultOverwrite = "auto", I.ticker = a, I.autoSleep = !0, I.lagSmoothing = function(t, e) {
            a.lagSmoothing(t, e)
        }, I.selector = t.$ || t.jQuery || function(e) {
            var i = t.$ || t.jQuery;
            return i ? (I.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
        };
        var O = [],
            L = {},
            N = I._internals = {
                isArray: m,
                isSelector: E,
                lazyTweens: O
            },
            U = I._plugins = {},
            F = N.tweenLookup = {},
            j = 0,
            G = N.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1
            },
            Q = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            },
            q = C._rootFramesTimeline = new D,
            B = C._rootTimeline = new D,
            M = N.lazyRender = function() {
                var t = O.length;
                for (L = {}; --t > -1;) s = O[t], s && s._lazy !== !1 && (s.render(s._lazy, !1, !0), s._lazy = !1);
                O.length = 0
            };
        B._startTime = a.time, q._startTime = a.frame, B._active = q._active = !0, setTimeout(M, 1), C._updateRoot = I.render = function() {
            var t, e, i;
            if (O.length && M(), B.render((a.time - B._startTime) * B._timeScale, !1, !1), q.render((a.frame - q._startTime) * q._timeScale, !1, !1), O.length && M(), !(a.frame % 120)) {
                for (i in F) {
                    for (e = F[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete F[i]
                }
                if (i = B._first, (!i || i._paused) && I.autoSleep && !q._first && 1 === a._listeners.tick.length) {
                    for (; i && i._paused;) i = i._next;
                    i || a.sleep()
                }
            }
        }, a.addEventListener("tick", C._updateRoot);
        var $ = function(t, e, i) {
                var s, n, r = t._gsTweenID;
                if (F[r || (t._gsTweenID = r = "t" + j++)] || (F[r] = {
                        target: t,
                        tweens: []
                    }), e && (s = F[r].tweens, s[n = s.length] = e, i))
                    for (; --n > -1;) s[n] === e && s.splice(n, 1);
                return F[r].tweens
            },
            K = function(t, e, i, s, n) {
                var r, a, o, l;
                if (1 === s || s >= 4) {
                    for (l = n.length, r = 0; l > r; r++)
                        if ((o = n[r]) !== e) o._gc || o._enabled(!1, !1) && (a = !0);
                        else if (5 === s) break;
                    return a
                }
                var h, u = e._startTime + _,
                    f = [],
                    m = 0,
                    p = 0 === e._duration;
                for (r = n.length; --r > -1;)(o = n[r]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || H(e, 0, p), 0 === H(o, h, p) && (f[m++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((p || !o._initted) && 2e-10 >= u - o._startTime || (f[m++] = o)));
                for (r = m; --r > -1;) o = f[r], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
                return a
            },
            H = function(t, e, i) {
                for (var s = t._timeline, n = s._timeScale, r = t._startTime; s._timeline;) {
                    if (r += s._startTime, n *= s._timeScale, s._paused) return -100;
                    s = s._timeline
                }
                return r /= n, r > e ? r - e : i && r === e || !t._initted && 2 * _ > r - e ? _ : (r += t.totalDuration() / t._timeScale / n) > e + _ ? 0 : r - e - _
            };
        r._init = function() {
            var t, e, i, s, n, r = this.vars,
                a = this._overwrittenProps,
                o = this._duration,
                l = !!r.immediateRender,
                h = r.ease;
            if (r.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), n = {};
                for (s in r.startAt) n[s] = r.startAt[s];
                if (n.overwrite = !1, n.immediateRender = !0, n.lazy = l && r.lazy !== !1, n.startAt = n.delay = null, this._startAt = I.to(this.target, 0, n), l)
                    if (this._time > 0) this._startAt = null;
                    else if (0 !== o) return
            } else if (r.runBackwards && 0 !== o)
                if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                else {
                    i = {};
                    for (s in r) G[s] && "autoCSS" !== s || (i[s] = r[s]);
                    if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && r.lazy !== !1, i.immediateRender = l, this._startAt = I.to(this.target, 0, i), l) {
                        if (0 === this._time) return
                    } else this._startAt._init(), this._startAt._enabled(!1)
                }
            if (this._ease = h = h ? h instanceof y ? h : "function" == typeof h ? new y(h, r.easeParams) : w[h] || I.defaultEase : I.defaultEase, r.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, r.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
            else e = this._initProps(this.target, this._propLookup, this._siblings, a);
            if (e && I._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
                for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = r.onUpdate, this._initted = !0
        }, r._initProps = function(e, i, s, n) {
            var r, a, o, l, h, _;
            if (null == e) return !1;
            L[e._gsTweenID] && M(), this.vars.css || e.style && e !== t && e.nodeType && U.css && this.vars.autoCSS !== !1 && z(this.vars, e);
            for (r in this.vars) {
                if (_ = this.vars[r], G[r]) _ && (_ instanceof Array || _.push && m(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[r] = _ = this._swapSelfInParams(_, this));
                else if (U[r] && (l = new U[r])._onInitTween(e, this.vars[r], this)) {
                    for (this._firstPT = h = {
                            _next: this._firstPT,
                            t: l,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: !0,
                            n: r,
                            pg: !0,
                            pr: l._priority
                        }, a = l._overwriteProps.length; --a > -1;) i[l._overwriteProps[a]] = this._firstPT;
                    (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = i[r] = h = {
                    _next: this._firstPT,
                    t: e,
                    p: r,
                    f: "function" == typeof e[r],
                    n: r,
                    pg: !1,
                    pr: 0
                }, h.s = h.f ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), h.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - h.s || 0;
                h && h._next && (h._next._prev = h)
            }
            return n && this._kill(n, e) ? this._initProps(e, i, s, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && K(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, n)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[e._gsTweenID] = !0), o)
        }, r.render = function(t, e, i) {
            var s, n, r, a, o = this._time,
                l = this._duration,
                h = this._rawPrevTime;
            if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, n = "onComplete"), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > h || h === _) && h !== t && (i = !0, h > _ && (n = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : _);
            else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && h > 0 && h !== _) && (n = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : _)) : this._initted || (i = !0);
            else if (this._totalTime = this._time = t, this._easeType) {
                var u = t / l,
                    f = this._easeType,
                    m = this._easePower;
                (1 === f || 3 === f && u >= .5) && (u = 1 - u), 3 === f && (u *= 2), 1 === m ? u *= u : 2 === m ? u *= u * u : 3 === m ? u *= u * u * u : 4 === m && (u *= u * u * u * u), this.ratio = 1 === f ? 1 - u : 2 === f ? u : .5 > t / l ? u / 2 : 1 - u / 2
            } else this.ratio = this._ease.getRatio(t / l);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = h, O.push(this), this._lazy = t, void 0;
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || T))), r = this._firstPT; r;) r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
                this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || T)), n && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this.vars[n].apply(this.vars[n + "Scope"] || this, this.vars[n + "Params"] || T), 0 === l && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0))
            }
        }, r._kill = function(t, e) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : I.selector(e) || e;
            var i, s, n, r, a, o, l, h;
            if ((m(e) || E(e)) && "number" != typeof e[0])
                for (i = e.length; --i > -1;) this._kill(t, e[i]) && (o = !0);
            else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1;)
                        if (e === this._targets[i]) {
                            a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                            break
                        }
                } else {
                    if (e !== this.target) return !1;
                    a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (a) {
                    l = t || a, h = t !== s && "all" !== s && t !== a && ("object" != typeof t || !t._tempKill);
                    for (n in l)(r = a[n]) && (r.pg && r.t._kill(l) && (o = !0), r.pg && 0 !== r.t._overwriteProps.length || (r._prev ? r._prev._next = r._next : r === this._firstPT && (this._firstPT = r._next), r._next && (r._next._prev = r._prev), r._next = r._prev = null), delete a[n]), h && (s[n] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return o
        }, r.invalidate = function() {
            return this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = this._lazy = !1, this._propLookup = this._targets ? {} : [], this
        }, r._enabled = function(t, e) {
            if (o || a.wake(), t && this._gc) {
                var i, s = this._targets;
                if (s)
                    for (i = s.length; --i > -1;) this._siblings[i] = $(s[i], this, !0);
                else this._siblings = $(this.target, this, !0)
            }
            return C.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? I._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
        }, I.to = function(t, e, i) {
            return new I(t, e, i)
        }, I.from = function(t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new I(t, e, i)
        }, I.fromTo = function(t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new I(t, e, s)
        }, I.delayedCall = function(t, e, i, s, n) {
            return new I(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                useFrames: n,
                overwrite: 0
            })
        }, I.set = function(t, e) {
            return new I(t, 0, e)
        }, I.getTweensOf = function(t, e) {
            if (null == t) return [];
            t = "string" != typeof t ? t : I.selector(t) || t;
            var i, s, n, r;
            if ((m(t) || E(t)) && "number" != typeof t[0]) {
                for (i = t.length, s = []; --i > -1;) s = s.concat(I.getTweensOf(t[i], e));
                for (i = s.length; --i > -1;)
                    for (r = s[i], n = i; --n > -1;) r === s[n] && s.splice(i, 1)
            } else
                for (s = $(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
            return s
        }, I.killTweensOf = I.killDelayedCallsTo = function(t, e, i) {
            "object" == typeof e && (i = e, e = !1);
            for (var s = I.getTweensOf(t, e), n = s.length; --n > -1;) s[n]._kill(i, t)
        };
        var J = v("plugins.TweenPlugin", function(t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = J.prototype
        }, !0);
        if (r = J.prototype, J.version = "1.10.1", J.API = 2, r._firstPT = null, r._addTween = function(t, e, i, s, n, r) {
                var a, o;
                return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
                    _next: this._firstPT,
                    t: t,
                    p: e,
                    s: i,
                    c: a,
                    f: "function" == typeof t[e],
                    n: n || e,
                    r: r
                }, o._next && (o._next._prev = o), o) : void 0
            }, r.setRatio = function(t) {
                for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
            }, r._kill = function(t) {
                var e, i = this._overwriteProps,
                    s = this._firstPT;
                if (null != t[this._propName]) this._overwriteProps = [];
                else
                    for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                return !1
            }, r._roundProps = function(t, e) {
                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
            }, I._onPluginEvent = function(t, e) {
                var i, s, n, r, a, o = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; o;) {
                        for (a = o._next, s = n; s && s.pr > o.pr;) s = s._next;
                        (o._prev = s ? s._prev : r) ? o._prev._next = o: n = o, (o._next = s) ? s._prev = o : r = o, o = a
                    }
                    o = e._firstPT = n
                }
                for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                return i
            }, J.activate = function(t) {
                for (var e = t.length; --e > -1;) t[e].API === J.API && (U[(new t[e])._propName] = t[e]);
                return !0
            }, d.plugin = function(t) {
                if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                var e, i = t.propName,
                    s = t.priority || 0,
                    n = t.overwriteProps,
                    r = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_roundProps",
                        initAll: "_onInitAllProps"
                    },
                    a = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                        J.call(this, i, s), this._overwriteProps = n || []
                    }, t.global === !0),
                    o = a.prototype = new J(i);
                o.constructor = a, a.API = t.API;
                for (e in r) "function" == typeof t[e] && (o[r[e]] = t[e]);
                return a.version = t.version, J.activate([a]), a
            }, s = t._gsQueue) {
            for (n = 0; s.length > n; n++) s[n]();
            for (r in p) p[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r)
        }
        o = !1
    }
})("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");


/*!
 * VERSION: 1.13.1
 * DATE: 2014-07-22
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
            var s = function(t) {
                    e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                    var i, s, r = this.vars;
                    for (s in r) i = r[s], o(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                    o(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                },
                r = 1e-10,
                n = i._internals,
                a = n.isSelector,
                o = n.isArray,
                h = n.lazyTweens,
                l = n.lazyRender,
                _ = [],
                u = _gsScope._gsDefine.globals,
                p = function(t) {
                    var e, i = {};
                    for (e in t) i[e] = t[e];
                    return i
                },
                f = function(t, e, i, s) {
                    t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || _)
                },
                c = function(t) {
                    var e, i = [],
                        s = t.length;
                    for (e = 0; e !== s; i.push(t[e++]));
                    return i
                },
                m = s.prototype = new e;
            return s.version = "1.13.1", m.constructor = s, m.kill()._gc = !1, m.to = function(t, e, s, r) {
                var n = s.repeat && u.TweenMax || i;
                return e ? this.add(new n(t, e, s), r) : this.set(t, s, r)
            }, m.from = function(t, e, s, r) {
                return this.add((s.repeat && u.TweenMax || i).from(t, e, s), r)
            }, m.fromTo = function(t, e, s, r, n) {
                var a = r.repeat && u.TweenMax || i;
                return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
            }, m.staggerTo = function(t, e, r, n, o, h, l, _) {
                var u, f = new s({
                    onComplete: h,
                    onCompleteParams: l,
                    onCompleteScope: _,
                    smoothChildTiming: this.smoothChildTiming
                });
                for ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = c(t)), n = n || 0, u = 0; t.length > u; u++) r.startAt && (r.startAt = p(r.startAt)), f.to(t[u], e, p(r), u * n);
                return this.add(f, o)
            }, m.staggerFrom = function(t, e, i, s, r, n, a, o) {
                return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
            }, m.staggerFromTo = function(t, e, i, s, r, n, a, o, h) {
                return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
            }, m.call = function(t, e, s, r) {
                return this.add(i.delayedCall(0, t, e, s), r)
            }, m.set = function(t, e, s) {
                return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
            }, s.exportRoot = function(t, e) {
                t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                var r, n, a = new s(t),
                    o = a._timeline;
                for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
                return o.add(a, 0), a
            }, m.add = function(r, n, a, h) {
                var l, _, u, p, f, c;
                if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                    if (r instanceof Array || r && r.push && o(r)) {
                        for (a = a || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++) o(p = r[u]) && (p = new s({
                            tweens: p
                        })), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === a ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === a && (p._startTime -= p.delay())), l += h;
                        return this._uncache(!0)
                    }
                    if ("string" == typeof r) return this.addLabel(r, n);
                    if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                    r = i.delayedCall(0, r)
                }
                if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                    for (f = this, c = f.rawTime() > r._startTime; f._timeline;) c && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
                return this
            }, m.remove = function(e) {
                if (e instanceof t) return this._remove(e, !1);
                if (e instanceof Array || e && e.push && o(e)) {
                    for (var i = e.length; --i > -1;) this.remove(e[i]);
                    return this
                }
                return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
            }, m._remove = function(t, i) {
                e.prototype._remove.call(this, t, i);
                var s = this._last;
                return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
            }, m.append = function(t, e) {
                return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
            }, m.insert = m.insertMultiple = function(t, e, i, s) {
                return this.add(t, e || 0, i, s)
            }, m.appendMultiple = function(t, e, i, s) {
                return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
            }, m.addLabel = function(t, e) {
                return this._labels[t] = this._parseTimeOrLabel(e), this
            }, m.addPause = function(t, e, i, s) {
                return this.call(f, ["{self}", e, i, s], this, t)
            }, m.removeLabel = function(t) {
                return delete this._labels[t], this
            }, m.getLabelTime = function(t) {
                return null != this._labels[t] ? this._labels[t] : -1
            }, m._parseTimeOrLabel = function(e, i, s, r) {
                var n;
                if (r instanceof t && r.timeline === this) this.remove(r);
                else if (r && (r instanceof Array || r.push && o(r)))
                    for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
                if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
                if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                else {
                    if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                    i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
                }
                return Number(e) + i
            }, m.seek = function(t, e) {
                return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
            }, m.stop = function() {
                return this.paused(!0)
            }, m.gotoAndPlay = function(t, e) {
                return this.play(t, e)
            }, m.gotoAndStop = function(t, e) {
                return this.pause(t, e)
            }, m.render = function(t, e, i) {
                this._gc && this._enabled(!0, !1);
                var s, n, a, o, u, p = this._dirty ? this.totalDuration() : this._totalDuration,
                    f = this._time,
                    c = this._startTime,
                    m = this._timeScale,
                    d = this._paused;
                if (t >= p ? (this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (u = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = p + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (u = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== f && this._first || i || u) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _)), this._time >= f)
                        for (s = this._first; s && (a = s._next, !this._paused || d);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                    else
                        for (s = this._last; s && (a = s._prev, !this._paused || d);)(s._active || f >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                    this._onUpdate && (e || (h.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _))), o && (this._gc || (c === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (n && (h.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || _)))
                }
            }, m._hasPausedChild = function() {
                for (var t = this._first; t;) {
                    if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
                    t = t._next
                }
                return !1
            }, m.getChildren = function(t, e, s, r) {
                r = r || -9999999999;
                for (var n = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
                return n
            }, m.getTweensOf = function(t, e) {
                var s, r, n = this._gc,
                    a = [],
                    o = 0;
                for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
                return n && this._enabled(!1, !0), a
            }, m._contains = function(t) {
                for (var e = t.timeline; e;) {
                    if (e === this) return !0;
                    e = e.timeline
                }
                return !1
            }, m.shiftChildren = function(t, e, i) {
                i = i || 0;
                for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                if (e)
                    for (s in n) n[s] >= i && (n[s] += t);
                return this._uncache(!0)
            }, m._kill = function(t, e) {
                if (!t && !e) return this._enabled(!1, !1);
                for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0);
                return r
            }, m.clear = function(t) {
                var e = this.getChildren(!1, !0, !0),
                    i = e.length;
                for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                return t !== !1 && (this._labels = {}), this._uncache(!0)
            }, m.invalidate = function() {
                for (var t = this._first; t;) t.invalidate(), t = t._next;
                return this
            }, m._enabled = function(t, i) {
                if (t === this._gc)
                    for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
                return e.prototype._enabled.call(this, t, i)
            }, m.duration = function(t) {
                return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
            }, m.totalDuration = function(t) {
                if (!arguments.length) {
                    if (this._dirty) {
                        for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                        this._duration = this._totalDuration = s, this._dirty = !1
                    }
                    return this._totalDuration
                }
                return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
            }, m.usesFrames = function() {
                for (var e = this._timeline; e._timeline;) e = e._timeline;
                return e === t._rootFramesTimeline
            }, m.rawTime = function() {
                return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
            }, s
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), module.exports = e())
    }("TimelineLite");



/*!
 * VERSION: beta 1.9.4
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
        var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope,
            n = r.com.greensock,
            a = 2 * Math.PI,
            o = Math.PI / 2,
            h = n._class,
            l = function(e, i) {
                var s = h("easing." + e, function() {}, !0),
                    r = s.prototype = new t;
                return r.constructor = s, r.getRatio = i, s
            },
            _ = t.register || function() {},
            u = function(t, e, i, s) {
                var r = h("easing." + t, {
                    easeOut: new e,
                    easeIn: new i,
                    easeInOut: new s
                }, !0);
                return _(r, t), r
            },
            c = function(t, e, i) {
                this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
            },
            p = function(e, i) {
                var s = h("easing." + e, function(t) {
                        this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                    }, !0),
                    r = s.prototype = new t;
                return r.constructor = s, r.getRatio = i, r.config = function(t) {
                    return new s(t)
                }, s
            },
            f = u("Back", p("BackOut", function(t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), p("BackIn", function(t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), p("BackInOut", function(t) {
                return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            })),
            m = h("easing.SlowMo", function(t, e, i) {
                e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
            }, !0),
            d = m.prototype = new t;
        return d.constructor = m, d.getRatio = function(t) {
            var e = t + (.5 - t) * this._p;
            return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, m.ease = new m(.7, .7), d.config = m.config = function(t, e, i) {
            return new m(t, e, i)
        }, e = h("easing.SteppedEase", function(t) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
        }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function(t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
        }, d.config = e.config = function(t) {
            return new e(t)
        }, i = h("easing.RoughEase", function(e) {
            e = e || {};
            for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), p = u, f = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;) i = f ? Math.random() : 1 / u * p, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), f ? s += Math.random() * r - .5 * r : p % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
                x: i,
                y: s
            };
            for (l.sort(function(t, e) {
                    return t.x - e.x
                }), o = new c(1, 1, null), p = u; --p > -1;) a = l[p], o = new c(a.x, a.y, o);
            this._prev = new c(0, 0, 0 !== o.t ? o : o.next)
        }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function(t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;) e = e.next;
                e = e.prev
            } else
                for (; e.prev && e.t >= t;) e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c
        }, d.config = function(t) {
            return new i(t)
        }, i.ease = new i, u("Bounce", l("BounceOut", function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), l("BounceIn", function(t) {
            return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), l("BounceInOut", function(t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), u("Circ", l("CircOut", function(t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), l("CircIn", function(t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), l("CircInOut", function(t) {
            return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), s = function(e, i, s) {
            var r = h("easing." + e, function(t, e) {
                    this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
                }, !0),
                n = r.prototype = new t;
            return n.constructor = r, n.getRatio = i, n.config = function(t, e) {
                return new r(t, e)
            }, r
        }, u("Elastic", s("ElasticOut", function(t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .3), s("ElasticIn", function(t) {
            return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
        }, .3), s("ElasticInOut", function(t) {
            return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
        }, .45)), u("Expo", l("ExpoOut", function(t) {
            return 1 - Math.pow(2, -10 * t)
        }), l("ExpoIn", function(t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), l("ExpoInOut", function(t) {
            return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), u("Sine", l("SineOut", function(t) {
            return Math.sin(t * o)
        }), l("SineIn", function(t) {
            return -Math.cos(t * o) + 1
        }), l("SineInOut", function(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), h("easing.EaseLookup", {
            find: function(e) {
                return t.map[e]
            }
        }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), f
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();


/*!
 * VERSION: 1.13.0
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
            var i, r, s, n, a = function() {
                    t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                },
                o = {},
                l = a.prototype = new t("css");
            l.constructor = a, a.version = "1.13.0", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", l = "px", a.suffixMap = {
                top: l,
                right: l,
                bottom: l,
                left: l,
                width: l,
                height: l,
                fontSize: l,
                padding: l,
                margin: l,
                perspective: l,
                lineHeight: ""
            };
            var h, u, f, p, _, c, d = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                v = /[^\d\-\.]/g,
                y = /(?:\d|\-|\+|=|#|\.)*/g,
                T = /opacity *= *([^)]*)/i,
                x = /opacity:([^;]*)/i,
                w = /alpha\(opacity *=.+?\)/i,
                b = /^(rgb|hsl)/,
                P = /([A-Z])/g,
                S = /-([a-z])/gi,
                k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                R = function(t, e) {
                    return e.toUpperCase()
                },
                C = /(?:Left|Right|Width)/i,
                A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                D = /,(?=[^\)]*(?:\(|$))/gi,
                M = Math.PI / 180,
                L = 180 / Math.PI,
                N = {},
                X = document,
                z = X.createElement("div"),
                I = X.createElement("img"),
                E = a._internals = {
                    _specialProps: o
                },
                F = navigator.userAgent,
                Y = function() {
                    var t, e = F.indexOf("Android"),
                        i = X.createElement("div");
                    return f = -1 !== F.indexOf("Safari") && -1 === F.indexOf("Chrome") && (-1 === e || Number(F.substr(e + 8, 1)) > 3), _ = f && 6 > Number(F.substr(F.indexOf("Version/") + 8, 1)), p = -1 !== F.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(F) && (c = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], t ? /^0.55/.test(t.style.opacity) : !1
                }(),
                B = function(t) {
                    return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                U = function(t) {
                    window.console && console.log(t)
                },
                j = "",
                W = "",
                V = function(t, e) {
                    e = e || z;
                    var i, r, s = e.style;
                    if (void 0 !== s[t]) return t;
                    for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === s[i[r] + t];);
                    return r >= 0 ? (W = 3 === r ? "ms" : i[r], j = "-" + W.toLowerCase() + "-", W + t) : null
                },
                q = X.defaultView ? X.defaultView.getComputedStyle : function() {},
                H = a.getStyle = function(t, e, i, r, s) {
                    var n;
                    return Y || "opacity" !== e ? (!r && t.style[e] ? n = t.style[e] : (i = i || q(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == s || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : s) : B(t)
                },
                Q = E.convertToPixels = function(t, i, r, s, n) {
                    if ("px" === s || !s) return r;
                    if ("auto" === s || !r) return 0;
                    var o, l, h, u = C.test(i),
                        f = t,
                        p = z.style,
                        _ = 0 > r;
                    if (_ && (r = -r), "%" === s && -1 !== i.indexOf("border")) o = r / 100 * (u ? t.clientWidth : t.clientHeight);
                    else {
                        if (p.cssText = "border:0 solid red;position:" + H(t, "position") + ";line-height:0;", "%" !== s && f.appendChild) p[u ? "borderLeftWidth" : "borderTopWidth"] = r + s;
                        else {
                            if (f = t.parentNode || X.body, l = f._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * r / 100;
                            p[u ? "width" : "height"] = r + s
                        }
                        f.appendChild(z), o = parseFloat(z[u ? "offsetWidth" : "offsetHeight"]), f.removeChild(z), u && "%" === s && a.cacheWidths !== !1 && (l = f._gsCache = f._gsCache || {}, l.time = h, l.width = 100 * (o / r)), 0 !== o || n || (o = Q(t, i, r, s, !0))
                    }
                    return _ ? -o : o
                },
                G = E.calculateOffset = function(t, e, i) {
                    if ("absolute" !== H(t, "position", i)) return 0;
                    var r = "left" === e ? "Left" : "Top",
                        s = H(t, "margin" + r, i);
                    return t["offset" + r] - (Q(t, e, parseFloat(s), s.replace(y, "")) || 0)
                },
                Z = function(t, e) {
                    var i, r, s = {};
                    if (e = e || q(t, null))
                        if (i = e.length)
                            for (; --i > -1;) s[e[i].replace(S, R)] = e.getPropertyValue(e[i]);
                        else
                            for (i in e) s[i] = e[i];
                    else if (e = t.currentStyle || t.style)
                        for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(S, R)] = e[i]);
                    return Y || (s.opacity = B(t)), r = Pe(t, e, !1), s.rotation = r.rotation, s.skewX = r.skewX, s.scaleX = r.scaleX, s.scaleY = r.scaleY, s.x = r.x, s.y = r.y, we && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ), s.filters && delete s.filters, s
                },
                $ = function(t, e, i, r, s) {
                    var n, a, o, l = {},
                        h = t.style;
                    for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || s && s[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(v, "") ? n : 0 : G(t, a), void 0 !== h[a] && (o = new fe(h, a, h[a], o)));
                    if (r)
                        for (a in r) "className" !== a && (l[a] = r[a]);
                    return {
                        difs: l,
                        firstMPT: o
                    }
                },
                K = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                J = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                te = function(t, e, i) {
                    var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                        s = K[e],
                        n = s.length;
                    for (i = i || q(t, null); --n > -1;) r -= parseFloat(H(t, "padding" + s[n], i, !0)) || 0, r -= parseFloat(H(t, "border" + s[n] + "Width", i, !0)) || 0;
                    return r
                },
                ee = function(t, e) {
                    (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                    var i = t.split(" "),
                        r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                        s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                    return null == s ? s = "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(v, "")), e.oy = parseFloat(s.replace(v, ""))), r + " " + s + (i.length > 2 ? " " + i[2] : "")
                },
                ie = function(t, e) {
                    return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                },
                re = function(t, e) {
                    return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
                },
                se = function(t, e, i, r) {
                    var s, n, a, o, l = 1e-6;
                    return null == t ? o = e : "number" == typeof t ? o = t : (s = 360, n = t.split("_"), a = Number(n[0].replace(v, "")) * (-1 === t.indexOf("rad") ? 1 : L) - ("=" === t.charAt(1) ? 0 : e), n.length && (r && (r[i] = e + a), -1 !== t.indexOf("short") && (a %= s, a !== a % (s / 2) && (a = 0 > a ? a + s : a - s)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * s) % s - (0 | a / s) * s : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * s) % s - (0 | a / s) * s)), o = e + a), l > o && o > -l && (o = 0), o
                },
                ne = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                ae = function(t, e, i) {
                    return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
                },
                oe = function(t) {
                    var e, i, r, s, n, a;
                    return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ne[t] ? ne[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), r = t.charAt(3), t = "#" + e + e + i + i + r + r), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(d), s = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ae(s + 1 / 3, e, i), t[1] = ae(s, e, i), t[2] = ae(s - 1 / 3, e, i), t) : (t = t.match(d) || ne.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ne.black
                },
                le = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
            for (l in ne) le += "|" + l + "\\b";
            le = RegExp(le + ")", "gi");
            var he = function(t, e, i, r) {
                    if (null == t) return function(t) {
                        return t
                    };
                    var s, n = e ? (t.match(le) || [""])[0] : "",
                        a = t.split(n).join("").match(g) || [],
                        o = t.substr(0, t.indexOf(a[0])),
                        l = ")" === t.charAt(t.length - 1) ? ")" : "",
                        h = -1 !== t.indexOf(" ") ? " " : ",",
                        u = a.length,
                        f = u > 0 ? a[0].replace(d, "") : "";
                    return u ? s = e ? function(t) {
                        var e, p, _, c;
                        if ("number" == typeof t) t += f;
                        else if (r && D.test(t)) {
                            for (c = t.replace(D, "|").split("|"), _ = 0; c.length > _; _++) c[_] = s(c[_]);
                            return c.join(",")
                        }
                        if (e = (t.match(le) || [n])[0], p = t.split(e).join("").match(g) || [], _ = p.length, u > _--)
                            for (; u > ++_;) p[_] = i ? p[0 | (_ - 1) / 2] : a[_];
                        return o + p.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                    } : function(t) {
                        var e, n, p;
                        if ("number" == typeof t) t += f;
                        else if (r && D.test(t)) {
                            for (n = t.replace(D, "|").split("|"), p = 0; n.length > p; p++) n[p] = s(n[p]);
                            return n.join(",")
                        }
                        if (e = t.match(g) || [], p = e.length, u > p--)
                            for (; u > ++p;) e[p] = i ? e[0 | (p - 1) / 2] : a[p];
                        return o + e.join(h) + l
                    } : function(t) {
                        return t
                    }
                },
                ue = function(t) {
                    return t = t.split(","),
                        function(e, i, r, s, n, a, o) {
                            var l, h = (i + "").split(" ");
                            for (o = {}, l = 0; 4 > l; l++) o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                            return s.parse(e, o, n, a)
                        }
                },
                fe = (E._setPluginRatio = function(t) {
                    this.plugin.setRatio(t);
                    for (var e, i, r, s, n = this.data, a = n.proxy, o = n.firstMPT, l = 1e-6; o;) e = a[o.v], o.r ? e = Math.round(e) : l > e && e > -l && (e = 0), o.t[o.p] = e, o = o._next;
                    if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)
                        for (o = n.firstMPT; o;) {
                            if (i = o.t, i.type) {
                                if (1 === i.type) {
                                    for (s = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++) s += i["xn" + r] + i["xs" + (r + 1)];
                                    i.e = s
                                }
                            } else i.e = i.s + i.xs0;
                            o = o._next
                        }
                }, function(t, e, i, r, s) {
                    this.t = t, this.p = e, this.v = i, this.r = s, r && (r._prev = this, this._next = r)
                }),
                pe = (E._parseToProxy = function(t, e, i, r, s, n) {
                    var a, o, l, h, u, f = r,
                        p = {},
                        _ = {},
                        c = i._transform,
                        d = N;
                    for (i._transform = null, N = e, r = u = i.parse(t, e, r, s), N = d, n && (i._transform = c, f && (f._prev = null, f._prev && (f._prev._next = null))); r && r !== f;) {
                        if (1 >= r.type && (o = r.p, _[o] = r.s + r.c, p[o] = r.s, n || (h = new fe(r, "s", o, h, r.r), r.c = 0), 1 === r.type))
                            for (a = r.l; --a > 0;) l = "xn" + a, o = r.p + "_" + l, _[o] = r.data[l], p[o] = r[l], n || (h = new fe(r, l, o, h, r.rxp[l]));
                        r = r._next
                    }
                    return {
                        proxy: p,
                        end: _,
                        firstMPT: h,
                        pt: u
                    }
                }, E.CSSPropTween = function(t, e, r, s, a, o, l, h, u, f, p) {
                    this.t = t, this.p = e, this.s = r, this.c = s, this.n = l || e, t instanceof pe || n.push(this.n), this.r = h, this.type = o || 0, u && (this.pr = u, i = !0), this.b = void 0 === f ? r : f, this.e = void 0 === p ? r + s : p, a && (this._next = a, a._prev = this)
                }),
                _e = a.parseComplex = function(t, e, i, r, s, n, a, o, l, u) {
                    i = i || n || "", a = new pe(t, e, 0, 0, a, u ? 2 : 1, null, !1, o, i, r), r += "";
                    var f, p, _, c, g, v, y, T, x, w, P, S, k = i.split(", ").join(",").split(" "),
                        R = r.split(", ").join(",").split(" "),
                        C = k.length,
                        A = h !== !1;
                    for ((-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) && (k = k.join(" ").replace(D, ", ").split(" "), R = R.join(" ").replace(D, ", ").split(" "), C = k.length), C !== R.length && (k = (n || "").split(" "), C = k.length), a.plugin = l, a.setRatio = u, f = 0; C > f; f++)
                        if (c = k[f], g = R[f], T = parseFloat(c), T || 0 === T) a.appendXtra("", T, ie(g, T), g.replace(m, ""), A && -1 !== g.indexOf("px"), !0);
                        else if (s && ("#" === c.charAt(0) || ne[c] || b.test(c))) S = "," === g.charAt(g.length - 1) ? ")," : ")", c = oe(c), g = oe(g), x = c.length + g.length > 6, x && !Y && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[f]).join("transparent")) : (Y || (x = !1), a.appendXtra(x ? "rgba(" : "rgb(", c[0], g[0] - c[0], ",", !0, !0).appendXtra("", c[1], g[1] - c[1], ",", !0).appendXtra("", c[2], g[2] - c[2], x ? "," : S, !0), x && (c = 4 > c.length ? 1 : c[3], a.appendXtra("", c, (4 > g.length ? 1 : g[3]) - c, S, !1)));
                    else if (v = c.match(d)) {
                        if (y = g.match(m), !y || y.length !== v.length) return a;
                        for (_ = 0, p = 0; v.length > p; p++) P = v[p], w = c.indexOf(P, _), a.appendXtra(c.substr(_, w - _), Number(P), ie(y[p], P), "", A && "px" === c.substr(w + P.length, 2), 0 === p), _ = w + P.length;
                        a["xs" + a.l] += c.substr(_)
                    } else a["xs" + a.l] += a.l ? " " + c : c;
                    if (-1 !== r.indexOf("=") && a.data) {
                        for (S = a.xs0 + a.data.s, f = 1; a.l > f; f++) S += a["xs" + f] + a.data["xn" + f];
                        a.e = S + a["xs" + f]
                    }
                    return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                },
                ce = 9;
            for (l = pe.prototype, l.l = l.pr = 0; --ce > 0;) l["xn" + ce] = 0, l["xs" + ce] = "";
            l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function(t, e, i, r, s, n) {
                var a = this,
                    o = a.l;
                return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = r || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = s, a["xn" + o] = e, a.plugin || (a.xfirst = new pe(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, s, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                    s: e + i
                }, a.rxp = {}, a.s = e, a.c = i, a.r = s, a)) : (a["xs" + o] += e + (r || ""), a)
            };
            var de = function(t, e) {
                    e = e || {}, this.p = e.prefix ? V(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || he(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                },
                me = E._registerComplexSpecialProp = function(t, e, i) {
                    "object" != typeof e && (e = {
                        parser: i
                    });
                    var r, s, n = t.split(","),
                        a = e.defaultValue;
                    for (i = i || [a], r = 0; n.length > r; r++) e.prefix = 0 === r && e.prefix, e.defaultValue = i[r] || a, s = new de(n[r], e)
                },
                ge = function(t) {
                    if (!o[t]) {
                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                        me(t, {
                            parser: function(t, i, r, s, n, a, l) {
                                var h = (_gsScope.GreenSockGlobals || _gsScope).com.greensock.plugins[e];
                                return h ? (h._cssRegister(), o[r].parse(t, i, r, s, n, a, l)) : (U("Error: " + e + " js file not loaded."), n)
                            }
                        })
                    }
                };
            l = de.prototype, l.parseComplex = function(t, e, i, r, s, n) {
                var a, o, l, h, u, f, p = this.keyword;
                if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : p && (o = [e], l = [i])), l) {
                    for (h = l.length > o.length ? l.length : o.length, a = 0; h > a; a++) e = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, p && (u = e.indexOf(p), f = i.indexOf(p), u !== f && (i = -1 === f ? l : o, i[a] += " " + p));
                    e = o.join(", "), i = l.join(", ")
                }
                return _e(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, s, n)
            }, l.parse = function(t, e, i, r, n, a) {
                return this.parseComplex(t.style, this.format(H(t, this.p, s, !1, this.dflt)), this.format(e), n, a)
            }, a.registerSpecialProp = function(t, e, i) {
                me(t, {
                    parser: function(t, r, s, n, a, o) {
                        var l = new pe(t, s, 0, 0, a, 2, s, !1, i);
                        return l.plugin = o, l.setRatio = e(t, r, n._tween, s), l
                    },
                    priority: i
                })
            };
            var ve = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                ye = V("transform"),
                Te = j + "transform",
                xe = V("transformOrigin"),
                we = null !== V("perspective"),
                be = E.Transform = function() {
                    this.skewY = 0
                },
                Pe = E.getTransform = function(t, e, i, r) {
                    if (t._gsTransform && i && !r) return t._gsTransform;
                    var s, n, o, l, h, u, f, p, _, c, d, m, g, v = i ? t._gsTransform || new be : new be,
                        y = 0 > v.scaleX,
                        T = 2e-5,
                        x = 1e5,
                        w = 179.99,
                        b = w * M,
                        P = we ? parseFloat(H(t, xe, e, !1, "0 0 0").split(" ")[2]) || v.zOrigin || 0 : 0;
                    if (ye ? s = H(t, Te, e, !0) : t.currentStyle && (s = t.currentStyle.filter.match(A), s = s && 4 === s.length ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), v.x || 0, v.y || 0].join(",") : ""), s && "none" !== s && "matrix(1, 0, 0, 1, 0, 0)" !== s) {
                        for (n = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = n.length; --o > -1;) l = Number(n[o]), n[o] = (h = l - (l |= 0)) ? (0 | h * x + (0 > h ? -.5 : .5)) / x + l : l;
                        if (16 === n.length) {
                            var S = n[8],
                                k = n[9],
                                R = n[10],
                                C = n[12],
                                O = n[13],
                                D = n[14];
                            if (v.zOrigin && (D = -v.zOrigin, C = S * D - n[12], O = k * D - n[13], D = R * D + v.zOrigin - n[14]), !i || r || null == v.rotationX) {
                                var N, X, z, I, E, F, Y, B = n[0],
                                    U = n[1],
                                    j = n[2],
                                    W = n[3],
                                    V = n[4],
                                    q = n[5],
                                    Q = n[6],
                                    G = n[7],
                                    Z = n[11],
                                    $ = Math.atan2(Q, R),
                                    K = -b > $ || $ > b;
                                v.rotationX = $ * L, $ && (I = Math.cos(-$), E = Math.sin(-$), N = V * I + S * E, X = q * I + k * E, z = Q * I + R * E, S = V * -E + S * I, k = q * -E + k * I, R = Q * -E + R * I, Z = G * -E + Z * I, V = N, q = X, Q = z), $ = Math.atan2(S, B), v.rotationY = $ * L, $ && (F = -b > $ || $ > b, I = Math.cos(-$), E = Math.sin(-$), N = B * I - S * E, X = U * I - k * E, z = j * I - R * E, k = U * E + k * I, R = j * E + R * I, Z = W * E + Z * I, B = N, U = X, j = z), $ = Math.atan2(U, q), v.rotation = $ * L, $ && (Y = -b > $ || $ > b, I = Math.cos(-$), E = Math.sin(-$), B = B * I + V * E, X = U * I + q * E, q = U * -E + q * I, Q = j * -E + Q * I, U = X), Y && K ? v.rotation = v.rotationX = 0 : Y && F ? v.rotation = v.rotationY = 0 : F && K && (v.rotationY = v.rotationX = 0), v.scaleX = (0 | Math.sqrt(B * B + U * U) * x + .5) / x, v.scaleY = (0 | Math.sqrt(q * q + k * k) * x + .5) / x, v.scaleZ = (0 | Math.sqrt(Q * Q + R * R) * x + .5) / x, v.skewX = 0, v.perspective = Z ? 1 / (0 > Z ? -Z : Z) : 0, v.x = C, v.y = O, v.z = D
                            }
                        } else if (!(we && !r && n.length && v.x === n[4] && v.y === n[5] && (v.rotationX || v.rotationY) || void 0 !== v.x && "none" === H(t, "display", e))) {
                            var J = n.length >= 6,
                                te = J ? n[0] : 1,
                                ee = n[1] || 0,
                                ie = n[2] || 0,
                                re = J ? n[3] : 1;
                            v.x = n[4] || 0, v.y = n[5] || 0, u = Math.sqrt(te * te + ee * ee), f = Math.sqrt(re * re + ie * ie), p = te || ee ? Math.atan2(ee, te) * L : v.rotation || 0, _ = ie || re ? Math.atan2(ie, re) * L + p : v.skewX || 0, c = u - Math.abs(v.scaleX || 0), d = f - Math.abs(v.scaleY || 0), Math.abs(_) > 90 && 270 > Math.abs(_) && (y ? (u *= -1, _ += 0 >= p ? 180 : -180, p += 0 >= p ? 180 : -180) : (f *= -1, _ += 0 >= _ ? 180 : -180)), m = (p - v.rotation) % 180, g = (_ - v.skewX) % 180, (void 0 === v.skewX || c > T || -T > c || d > T || -T > d || m > -w && w > m && false | m * x || g > -w && w > g && false | g * x) && (v.scaleX = u, v.scaleY = f, v.rotation = p, v.skewX = _), we && (v.rotationX = v.rotationY = v.z = 0, v.perspective = parseFloat(a.defaultTransformPerspective) || 0, v.scaleZ = 1)
                        }
                        v.zOrigin = P;
                        for (o in v) T > v[o] && v[o] > -T && (v[o] = 0)
                    } else v = {
                        x: 0,
                        y: 0,
                        z: 0,
                        scaleX: 1,
                        scaleY: 1,
                        scaleZ: 1,
                        skewX: 0,
                        perspective: 0,
                        rotation: 0,
                        rotationX: 0,
                        rotationY: 0,
                        zOrigin: 0
                    };
                    return i && (t._gsTransform = v), v.xPercent = v.yPercent = 0, v
                },
                Se = function(t) {
                    var e, i, r = this.data,
                        s = -r.rotation * M,
                        n = s + r.skewX * M,
                        a = 1e5,
                        o = (0 | Math.cos(s) * r.scaleX * a) / a,
                        l = (0 | Math.sin(s) * r.scaleX * a) / a,
                        h = (0 | Math.sin(n) * -r.scaleY * a) / a,
                        u = (0 | Math.cos(n) * r.scaleY * a) / a,
                        f = this.t.style,
                        p = this.t.currentStyle;
                    if (p) {
                        i = l, l = -h, h = -i, e = p.filter, f.filter = "";
                        var _, d, m = this.t.offsetWidth,
                            g = this.t.offsetHeight,
                            v = "absolute" !== p.position,
                            x = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + u,
                            w = r.x + m * r.xPercent / 100,
                            b = r.y + g * r.yPercent / 100;
                        if (null != r.ox && (_ = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, d = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, w += _ - (_ * o + d * l), b += d - (_ * h + d * u)), v ? (_ = m / 2, d = g / 2, x += ", Dx=" + (_ - (_ * o + d * l) + w) + ", Dy=" + (d - (_ * h + d * u) + b) + ")") : x += ", sizingMethod='auto expand')", f.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, x) : x + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === u && (v && -1 === x.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && f.removeAttribute("filter")), !v) {
                            var P, S, k, R = 8 > c ? 1 : -1;
                            for (_ = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + w), r.ieOffsetY = Math.round((g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + b), ce = 0; 4 > ce; ce++) S = J[ce], P = p[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : Q(this.t, S, parseFloat(P), P.replace(y, "")) || 0, k = i !== r[S] ? 2 > ce ? -r.ieOffsetX : -r.ieOffsetY : 2 > ce ? _ - r.ieOffsetX : d - r.ieOffsetY, f[S] = (r[S] = Math.round(i - k * (0 === ce || 2 === ce ? 1 : R))) + "px"
                        }
                    }
                },
                ke = E.set3DTransformRatio = function(t) {
                    var e, i, r, s, n, a, o, l, h, u, f, _, c, d, m, g, v, y, T, x, w, b, P, S = this.data,
                        k = this.t.style,
                        R = S.rotation * M,
                        C = S.scaleX,
                        A = S.scaleY,
                        O = S.scaleZ,
                        D = S.x,
                        L = S.y,
                        N = S.z,
                        X = S.perspective;
                    if (!(1 !== t && 0 !== t || "auto" !== S.force3D || S.rotationY || S.rotationX || 1 !== O || X || N)) return Re.call(this, t), void 0;
                    if (p) {
                        var z = 1e-4;
                        z > C && C > -z && (C = O = 2e-5), z > A && A > -z && (A = O = 2e-5), !X || S.z || S.rotationX || S.rotationY || (X = 0)
                    }
                    if (R || S.skewX) y = Math.cos(R), T = Math.sin(R), e = y, n = T, S.skewX && (R -= S.skewX * M, y = Math.cos(R), T = Math.sin(R), "simple" === S.skewType && (x = Math.tan(S.skewX * M), x = Math.sqrt(1 + x * x), y *= x, T *= x)), i = -T, a = y;
                    else {
                        if (!(S.rotationY || S.rotationX || 1 !== O || X)) return k[ye] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + D + "px," + L + "px," + N + "px)" + (1 !== C || 1 !== A ? " scale(" + C + "," + A + ")" : ""), void 0;
                        e = a = 1, i = n = 0
                    }
                    f = 1, r = s = o = l = h = u = _ = c = d = 0, m = X ? -1 / X : 0, g = S.zOrigin, v = 1e5, R = S.rotationY * M, R && (y = Math.cos(R), T = Math.sin(R), h = f * -T, c = m * -T, r = e * T, o = n * T, f *= y, m *= y, e *= y, n *= y), R = S.rotationX * M, R && (y = Math.cos(R), T = Math.sin(R), x = i * y + r * T, w = a * y + o * T, b = u * y + f * T, P = d * y + m * T, r = i * -T + r * y, o = a * -T + o * y, f = u * -T + f * y, m = d * -T + m * y, i = x, a = w, u = b, d = P), 1 !== O && (r *= O, o *= O, f *= O, m *= O), 1 !== A && (i *= A, a *= A, u *= A, d *= A), 1 !== C && (e *= C, n *= C, h *= C, c *= C), g && (_ -= g, s = r * _, l = o * _, _ = f * _ + g), s = (x = (s += D) - (s |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + s : s, l = (x = (l += L) - (l |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + l : l, _ = (x = (_ += N) - (_ |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + _ : _, k[ye] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(") + [(0 | e * v) / v, (0 | n * v) / v, (0 | h * v) / v, (0 | c * v) / v, (0 | i * v) / v, (0 | a * v) / v, (0 | u * v) / v, (0 | d * v) / v, (0 | r * v) / v, (0 | o * v) / v, (0 | f * v) / v, (0 | m * v) / v, s, l, _, X ? 1 + -_ / X : 1].join(",") + ")"
                },
                Re = E.set2DTransformRatio = function(t) {
                    var e, i, r, s, n, a = this.data,
                        o = this.t,
                        l = o.style,
                        h = a.x,
                        u = a.y;
                    return a.rotationX || a.rotationY || a.z || a.force3D === !0 || "auto" === a.force3D && 1 !== t && 0 !== t ? (this.setRatio = ke, ke.call(this, t), void 0) : (a.rotation || a.skewX ? (e = a.rotation * M, i = e - a.skewX * M, r = 1e5, s = a.scaleX * r, n = a.scaleY * r, l[ye] = (a.xPercent || a.yPercent ? "translate(" + a.xPercent + "%," + a.yPercent + "%) matrix(" : "matrix(") + (0 | Math.cos(e) * s) / r + "," + (0 | Math.sin(e) * s) / r + "," + (0 | Math.sin(i) * -n) / r + "," + (0 | Math.cos(i) * n) / r + "," + h + "," + u + ")") : l[ye] = (a.xPercent || a.yPercent ? "translate(" + a.xPercent + "%," + a.yPercent + "%) matrix(" : "matrix(") + a.scaleX + ",0,0," + a.scaleY + "," + h + "," + u + ")", void 0)
                };
            me("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
                parser: function(t, e, i, r, n, o, l) {
                    if (r._transform) return n;
                    var h, u, f, p, _, c, d, m = r._transform = Pe(t, s, !0, l.parseTransform),
                        g = t.style,
                        v = 1e-6,
                        y = ve.length,
                        T = l,
                        x = {};
                    if ("string" == typeof T.transform && ye) f = z.style, f[ye] = T.transform, f.display = "block", f.position = "absolute", X.body.appendChild(z), h = Pe(z, null, !1), X.body.removeChild(z);
                    else if ("object" == typeof T) {
                        if (h = {
                                scaleX: re(null != T.scaleX ? T.scaleX : T.scale, m.scaleX),
                                scaleY: re(null != T.scaleY ? T.scaleY : T.scale, m.scaleY),
                                scaleZ: re(T.scaleZ, m.scaleZ),
                                x: re(T.x, m.x),
                                y: re(T.y, m.y),
                                z: re(T.z, m.z),
                                xPercent: re(T.xPercent, m.xPercent),
                                yPercent: re(T.yPercent, m.yPercent),
                                perspective: re(T.transformPerspective, m.perspective)
                            }, d = T.directionalRotation, null != d)
                            if ("object" == typeof d)
                                for (f in d) T[f] = d[f];
                            else T.rotation = d;
                            "string" == typeof T.x && -1 !== T.x.indexOf("%") && (h.x = 0, h.xPercent = re(T.x, m.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (h.y = 0, h.yPercent = re(T.y, m.yPercent)), h.rotation = se("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : m.rotation, m.rotation, "rotation", x), we && (h.rotationX = se("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", x), h.rotationY = se("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", x)), h.skewX = null == T.skewX ? m.skewX : se(T.skewX, m.skewX), h.skewY = null == T.skewY ? m.skewY : se(T.skewY, m.skewY), (u = h.skewY - m.skewY) && (h.skewX += u, h.rotation += u)
                    }
                    for (we && null != T.force3D && (m.force3D = T.force3D, c = !0), m.skewType = T.skewType || m.skewType || a.defaultSkewType, _ = m.force3D || m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, _ || null == T.scale || (h.scaleZ = 1); --y > -1;) i = ve[y], p = h[i] - m[i], (p > v || -v > p || null != N[i]) && (c = !0, n = new pe(m, i, m[i], p, n), i in x && (n.e = x[i]), n.xs0 = 0, n.plugin = o, r._overwriteProps.push(n.n));
                    return p = T.transformOrigin, (p || we && _ && m.zOrigin) && (ye ? (c = !0, i = xe, p = (p || H(t, i, s, !1, "50% 50%")) + "", n = new pe(g, i, 0, 0, n, -1, "transformOrigin"), n.b = g[i], n.plugin = o, we ? (f = m.zOrigin, p = p.split(" "), m.zOrigin = (p.length > 2 && (0 === f || "0px" !== p[2]) ? parseFloat(p[2]) : f) || 0, n.xs0 = n.e = p[0] + " " + (p[1] || "50%") + " 0px", n = new pe(m, "zOrigin", 0, 0, n, -1, n.n), n.b = f, n.xs0 = n.e = m.zOrigin) : n.xs0 = n.e = p) : ee(p + "", m)), c && (r._transformType = _ || 3 === this._transformType ? 3 : 2), n
                },
                prefix: !0
            }), me("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), me("borderRadius", {
                defaultValue: "0px",
                parser: function(t, e, i, n, a) {
                    e = this.format(e);
                    var o, l, h, u, f, p, _, c, d, m, g, v, y, T, x, w, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        P = t.style;
                    for (d = parseFloat(t.offsetWidth), m = parseFloat(t.offsetHeight), o = e.split(" "), l = 0; b.length > l; l++) this.p.indexOf("border") && (b[l] = V(b[l])), f = u = H(t, b[l], s, !1, "0px"), -1 !== f.indexOf(" ") && (u = f.split(" "), f = u[0], u = u[1]), p = h = o[l], _ = parseFloat(f), v = f.substr((_ + "").length), y = "=" === p.charAt(1), y ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), g = p.substr((c + "").length - (0 > c ? 1 : 0)) || "") : (c = parseFloat(p), g = p.substr((c + "").length)), "" === g && (g = r[i] || v), g !== v && (T = Q(t, "borderLeft", _, v), x = Q(t, "borderTop", _, v), "%" === g ? (f = 100 * (T / d) + "%", u = 100 * (x / m) + "%") : "em" === g ? (w = Q(t, "borderLeft", 1, "em"), f = T / w + "em", u = x / w + "em") : (f = T + "px", u = x + "px"), y && (p = parseFloat(f) + c + g, h = parseFloat(u) + c + g)), a = _e(P, b[l], f + " " + u, p + " " + h, !1, "0px", a);
                    return a
                },
                prefix: !0,
                formatter: he("0px 0px 0px 0px", !1, !0)
            }), me("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(t, e, i, r, n, a) {
                    var o, l, h, u, f, p, _ = "background-position",
                        d = s || q(t, null),
                        m = this.format((d ? c ? d.getPropertyValue(_ + "-x") + " " + d.getPropertyValue(_ + "-y") : d.getPropertyValue(_) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                        g = this.format(e);
                    if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (p = H(t, "backgroundImage").replace(k, ""), p && "none" !== p)) {
                        for (o = m.split(" "), l = g.split(" "), I.setAttribute("src", p), h = 2; --h > -1;) m = o[h], u = -1 !== m.indexOf("%"), u !== (-1 !== l[h].indexOf("%")) && (f = 0 === h ? t.offsetWidth - I.width : t.offsetHeight - I.height, o[h] = u ? parseFloat(m) / 100 * f + "px" : 100 * (parseFloat(m) / f) + "%");
                        m = o.join(" ")
                    }
                    return this.parseComplex(t.style, m, g, n, a)
                },
                formatter: ee
            }), me("backgroundSize", {
                defaultValue: "0 0",
                formatter: ee
            }), me("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), me("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), me("transformStyle", {
                prefix: !0
            }), me("backfaceVisibility", {
                prefix: !0
            }), me("userSelect", {
                prefix: !0
            }), me("margin", {
                parser: ue("marginTop,marginRight,marginBottom,marginLeft")
            }), me("padding", {
                parser: ue("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), me("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(t, e, i, r, n, a) {
                    var o, l, h;
                    return 9 > c ? (l = t.currentStyle, h = 8 > c ? " " : ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (o = this.format(H(t, this.p, s, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
                }
            }), me("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), me("autoRound,strictUnits", {
                parser: function(t, e, i, r, s) {
                    return s
                }
            }), me("border", {
                defaultValue: "0px solid #000",
                parser: function(t, e, i, r, n, a) {
                    return this.parseComplex(t.style, this.format(H(t, "borderTopWidth", s, !1, "0px") + " " + H(t, "borderTopStyle", s, !1, "solid") + " " + H(t, "borderTopColor", s, !1, "#000")), this.format(e), n, a)
                },
                color: !0,
                formatter: function(t) {
                    var e = t.split(" ");
                    return e[0] + " " + (e[1] || "solid") + " " + (t.match(le) || ["#000"])[0]
                }
            }), me("borderWidth", {
                parser: ue("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), me("float,cssFloat,styleFloat", {
                parser: function(t, e, i, r, s) {
                    var n = t.style,
                        a = "cssFloat" in n ? "cssFloat" : "styleFloat";
                    return new pe(n, a, 0, 0, s, -1, i, !1, 0, n[a], e)
                }
            });
            var Ce = function(t) {
                var e, i = this.t,
                    r = i.filter || H(this.data, "filter"),
                    s = 0 | this.s + this.c * t;
                100 === s && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), e = !H(this.data, "filter")) : (i.filter = r.replace(w, ""), e = !0)), e || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + s + ")"), -1 === r.indexOf("pacity") ? 0 === s && this.xn1 || (i.filter = r + " alpha(opacity=" + s + ")") : i.filter = r.replace(T, "opacity=" + s))
            };
            me("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(t, e, i, r, n, a) {
                    var o = parseFloat(H(t, "opacity", s, !1, "1")),
                        l = t.style,
                        h = "autoAlpha" === i;
                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), h && 1 === o && "hidden" === H(t, "visibility", s) && 0 !== e && (o = 0), Y ? n = new pe(l, "opacity", o, e - o, n) : (n = new pe(l, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = h ? 1 : 0, l.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Ce), h && (n = new pe(l, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", r._overwriteProps.push(n.n), r._overwriteProps.push(i)), n
                }
            });
            var Ae = function(t, e) {
                    e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e))
                },
                Oe = function(t) {
                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                        this.t.setAttribute("class", 0 === t ? this.b : this.e);
                        for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Ae(i, e.p), e = e._next;
                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            me("className", {
                parser: function(t, e, r, n, a, o, l) {
                    var h, u, f, p, _, c = t.getAttribute("class") || "",
                        d = t.style.cssText;
                    if (a = n._classNamePT = new pe(t, r, 0, 0, a, 2), a.setRatio = Oe, a.pr = -11, i = !0, a.b = c, u = Z(t, s), f = t._gsClassPT) {
                        for (p = {}, _ = f.data; _;) p[_.p] = 1, _ = _._next;
                        f.setRatio(1)
                    }
                    return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : c.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.setAttribute("class", a.e), h = $(t, u, Z(t), l, p), t.setAttribute("class", c), a.data = h.firstMPT, t.style.cssText = d, a = a.xfirst = n.parse(t, h.difs, a, o)), a
                }
            });
            var De = function(t) {
                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var e, i, r, s, n = this.t.style,
                        a = o.transform.parse;
                    if ("all" === this.e) n.cssText = "", s = !0;
                    else
                        for (e = this.e.split(","), r = e.length; --r > -1;) i = e[r], o[i] && (o[i].parse === a ? s = !0 : i = "transformOrigin" === i ? xe : o[i].p), Ae(n, i);
                    s && (Ae(n, ye), this.t._gsTransform && delete this.t._gsTransform)
                }
            };
            for (me("clearProps", {
                    parser: function(t, e, r, s, n) {
                        return n = new pe(t, r, 0, 0, n, 2), n.setRatio = De, n.e = e, n.pr = -10, n.data = s._tween, i = !0, n
                    }
                }), l = "bezier,throwProps,physicsProps,physics2D".split(","), ce = l.length; ce--;) ge(l[ce]);
            l = a.prototype, l._firstPT = null, l._onInitTween = function(t, e, o) {
                if (!t.nodeType) return !1;
                this._target = t, this._tween = o, this._vars = e, h = e.autoRound, i = !1, r = e.suffixMap || a.suffixMap, s = q(t, ""), n = this._overwriteProps;
                var l, p, c, d, m, g, v, y, T, w = t.style;
                if (u && "" === w.zIndex && (l = H(t, "zIndex", s), ("auto" === l || "" === l) && this._addLazySet(w, "zIndex", 0)), "string" == typeof e && (d = w.cssText, l = Z(t, s), w.cssText = d + ";" + e, l = $(t, l, Z(t)).difs, !Y && x.test(e) && (l.opacity = parseFloat(RegExp.$1)), e = l, w.cssText = d), this._firstPT = p = this.parse(t, e, null), this._transformType) {
                    for (T = 3 === this._transformType, ye ? f && (u = !0, "" === w.zIndex && (v = H(t, "zIndex", s), ("auto" === v || "" === v) && this._addLazySet(w, "zIndex", 0)), _ && this._addLazySet(w, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : w.zoom = 1, c = p; c && c._next;) c = c._next;
                    y = new pe(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, c), y.setRatio = T && we ? ke : ye ? Re : Se, y.data = this._transform || Pe(t, s, !0), n.pop()
                }
                if (i) {
                    for (; p;) {
                        for (g = p._next, c = d; c && c.pr > p.pr;) c = c._next;
                        (p._prev = c ? c._prev : m) ? p._prev._next = p: d = p, (p._next = c) ? c._prev = p : m = p, p = g
                    }
                    this._firstPT = d
                }
                return !0
            }, l.parse = function(t, e, i, n) {
                var a, l, u, f, p, _, c, d, m, g, v = t.style;
                for (a in e) _ = e[a], l = o[a], l ? i = l.parse(t, _, a, this, i, n, e) : (p = H(t, a, s) + "", m = "string" == typeof _, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || m && b.test(_) ? (m || (_ = oe(_), _ = (_.length > 3 ? "rgba(" : "rgb(") + _.join(",") + ")"), i = _e(v, a, p, _, !0, "transparent", i, 0, n)) : !m || -1 === _.indexOf(" ") && -1 === _.indexOf(",") ? (u = parseFloat(p), c = u || 0 === u ? p.substr((u + "").length) : "", ("" === p || "auto" === p) && ("width" === a || "height" === a ? (u = te(t, a, s), c = "px") : "left" === a || "top" === a ? (u = G(t, a, s), c = "px") : (u = "opacity" !== a ? 0 : 1, c = "")), g = m && "=" === _.charAt(1), g ? (f = parseInt(_.charAt(0) + "1", 10), _ = _.substr(2), f *= parseFloat(_), d = _.replace(y, "")) : (f = parseFloat(_), d = m ? _.substr((f + "").length) || "" : ""), "" === d && (d = a in r ? r[a] : c), _ = f || 0 === f ? (g ? f + u : f) + d : e[a], c !== d && "" !== d && (f || 0 === f) && u && (u = Q(t, a, u, c), "%" === d ? (u /= Q(t, a, 100, "%") / 100, e.strictUnits !== !0 && (p = u + "%")) : "em" === d ? u /= Q(t, a, 1, "em") : "px" !== d && (f = Q(t, a, f, d), d = "px"), g && (f || 0 === f) && (_ = f + u + d)), g && (f += u), !u && 0 !== u || !f && 0 !== f ? void 0 !== v[a] && (_ || "NaN" != _ + "" && null != _) ? (i = new pe(v, a, f || u || 0, 0, i, -1, a, !1, 0, p, _), i.xs0 = "none" !== _ || "display" !== a && -1 === a.indexOf("Style") ? _ : p) : U("invalid " + a + " tween value: " + e[a]) : (i = new pe(v, a, u, f - u, i, 0, a, h !== !1 && ("px" === d || "zIndex" === a), 0, p, _), i.xs0 = d)) : i = _e(v, a, p, _, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
                return i
            }, l.setRatio = function(t) {
                var e, i, r, s = this._firstPT,
                    n = 1e-6;
                if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; s;) {
                            if (e = s.c * t + s.s, s.r ? e = Math.round(e) : n > e && e > -n && (e = 0), s.type)
                                if (1 === s.type)
                                    if (r = s.l, 2 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;
                                    else if (3 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
                            else if (4 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4;
                            else if (5 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5;
                            else {
                                for (i = s.xs0 + e + s.xs1, r = 1; s.l > r; r++) i += s["xn" + r] + s["xs" + (r + 1)];
                                s.t[s.p] = i
                            } else -1 === s.type ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(t);
                            else s.t[s.p] = e + s.xs0;
                            s = s._next
                        } else
                            for (; s;) 2 !== s.type ? s.t[s.p] = s.b : s.setRatio(t), s = s._next;
                    else
                        for (; s;) 2 !== s.type ? s.t[s.p] = s.e : s.setRatio(t), s = s._next
            }, l._enableTransforms = function(t) {
                this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || Pe(this._target, s, !0)
            };
            var Me = function() {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            l._addLazySet = function(t, e, i) {
                var r = this._firstPT = new pe(t, e, 0, 0, this._firstPT, 2);
                r.e = i, r.setRatio = Me, r.data = this
            }, l._linkCSSP = function(t, e, i, r) {
                return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), i ? i._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
            }, l._kill = function(e) {
                var i, r, s, n = e;
                if (e.autoAlpha || e.alpha) {
                    n = {};
                    for (r in e) n[r] = e[r];
                    n.opacity = 1, n.autoAlpha && (n.visibility = 1)
                }
                return e.className && (i = this._classNamePT) && (s = i.xfirst, s && s._prev ? this._linkCSSP(s._prev, i._next, s._prev._prev) : s === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, s._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
            };
            var Le = function(t, e, i) {
                var r, s, n, a;
                if (t.slice)
                    for (s = t.length; --s > -1;) Le(t[s], e, i);
                else
                    for (r = t.childNodes, s = r.length; --s > -1;) n = r[s], a = n.type, n.style && (e.push(Z(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Le(n, e, i)
            };
            return a.cascadeTo = function(t, i, r) {
                var s, n, a, o = e.to(t, i, r),
                    l = [o],
                    h = [],
                    u = [],
                    f = [],
                    p = e._internals.reservedProps;
                for (t = o._targets || o.target, Le(t, h, f), o.render(i, !0), Le(t, u), o.render(0, !0), o._enabled(!0), s = f.length; --s > -1;)
                    if (n = $(f[s], h[s], u[s]), n.firstMPT) {
                        n = n.difs;
                        for (a in r) p[a] && (n[a] = r[a]);
                        l.push(e.to(f[s], i, n))
                    }
                return l
            }, t.activate([a]), a
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = e())
    }("CSSPlugin");

/*!
 * VERSION: beta 0.2.4
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(function(t) {
    "use strict";
    var e = t.GreenSockGlobals || t,
        i = function(t) {
            var i, s = t.split("."),
                r = e;
            for (i = 0; s.length > i; i++) r[s[i]] = r = r[s[i]] || {};
            return r
        },
        s = i("com.greensock.utils"),
        r = function(t) {
            var e = t.nodeType,
                i = "";
            if (1 === e || 9 === e || 11 === e) {
                if ("string" == typeof t.textContent) return t.textContent;
                for (t = t.firstChild; t; t = t.nextSibling) i += r(t)
            } else if (3 === e || 4 === e) return t.nodeValue;
            return i
        },
        n = document,
        a = n.defaultView ? n.defaultView.getComputedStyle : function() {},
        o = /([A-Z])/g,
        h = function(t, e, i, s) {
            var r;
            return (i = i || a(t, null)) ? (t = i.getPropertyValue(e.replace(o, "-$1").toLowerCase()), r = t || i.length ? t : i[e]) : t.currentStyle && (i = t.currentStyle, r = i[e]), s ? r : parseInt(r, 10) || 0
        },
        l = function(t) {
            return t.length && t[0] && (t[0].nodeType && t[0].style && !t.nodeType || t[0].length && t[0][0]) ? !0 : !1
        },
        _ = function(t) {
            var e, i, s, r = [],
                n = t.length;
            for (e = 0; n > e; e++)
                if (i = t[e], l(i))
                    for (s = i.length, s = 0; i.length > s; s++) r.push(i[s]);
                else r.push(i);
            return r
        },
        u = ")eefec303079ad17405c",
        c = /(?:<br>|<br\/>|<br \/>)/gi,
        p = n.all && !n.addEventListener,
        f = "<div style='position:relative;display:inline-block;" + (p ? "*display:inline;*zoom:1;'" : "'"),
        m = function(t) {
            t = t || "";
            var e = -1 !== t.indexOf("++"),
                i = 1;
            return e && (t = t.split("++").join("")),
                function() {
                    return f + (t ? " class='" + t + (e ? i++ : "") + "'>" : ">")
                }
        },
        d = s.SplitText = e.SplitText = function(t, e) {
            if ("string" == typeof t && (t = d.selector(t)), !t) throw "cannot split a null element.";
            this.elements = l(t) ? _(t) : [t], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = e || {}, this.split(e)
        },
        g = function(t, e, i, s, o) {
            c.test(t.innerHTML) && (t.innerHTML = t.innerHTML.replace(c, u));
            var l, _, p, f, d, g, v, y, T, w, b, x, P, S = r(t),
                C = e.type || e.split || "chars,words,lines",
                k = -1 !== C.indexOf("lines") ? [] : null,
                R = -1 !== C.indexOf("words"),
                A = -1 !== C.indexOf("chars"),
                D = "absolute" === e.position || e.absolute === !0,
                O = D ? "&#173; " : " ",
                M = -999,
                L = a(t),
                z = h(t, "paddingLeft", L),
                I = h(t, "borderBottomWidth", L) + h(t, "borderTopWidth", L),
                E = h(t, "borderLeftWidth", L) + h(t, "borderRightWidth", L),
                N = h(t, "paddingTop", L) + h(t, "paddingBottom", L),
                F = h(t, "paddingLeft", L) + h(t, "paddingRight", L),
                X = h(t, "textAlign", L, !0),
                U = t.clientHeight,
                B = t.clientWidth,
                j = S.length,
                Y = "</div>",
                q = m(e.wordsClass),
                G = m(e.charsClass),
                V = -1 !== (e.linesClass || "").indexOf("++"),
                Q = e.linesClass;
            for (V && (Q = Q.split("++").join("")), p = q(), f = 0; j > f; f++) g = S.charAt(f), ")" === g && S.substr(f, 20) === u ? (p += Y + "<BR/>", f !== j - 1 && (p += " " + q()), f += 19) : " " === g && " " !== S.charAt(f - 1) && f !== j - 1 ? (p += Y, f !== j - 1 && (p += O + q())) : p += A && " " !== g ? G() + g + "</div>" : g;
            for (t.innerHTML = p + Y, d = t.getElementsByTagName("*"), j = d.length, v = [], f = 0; j > f; f++) v[f] = d[f];
            if (k || D)
                for (f = 0; j > f; f++) y = v[f], _ = y.parentNode === t, (_ || D || A && !R) && (T = y.offsetTop, k && _ && T !== M && "BR" !== y.nodeName && (l = [], k.push(l), M = T), D && (y._x = y.offsetLeft, y._y = T, y._w = y.offsetWidth, y._h = y.offsetHeight), k && (R !== _ && A || (l.push(y), y._x -= z), _ && f && (v[f - 1]._wordEnd = !0)));
            for (f = 0; j > f; f++) y = v[f], _ = y.parentNode === t, "BR" !== y.nodeName ? (D && (b = y.style, R || _ || (y._x += y.parentNode._x, y._y += y.parentNode._y), b.left = y._x + "px", b.top = y._y + "px", b.position = "absolute", b.display = "block", b.width = y._w + 1 + "px", b.height = y._h + "px"), R ? _ ? s.push(y) : A && i.push(y) : _ ? (t.removeChild(y), v.splice(f--, 1), j--) : !_ && A && (T = !k && !D && y.nextSibling, t.appendChild(y), T || t.appendChild(n.createTextNode(" ")), i.push(y))) : k || D ? (t.removeChild(y), v.splice(f--, 1), j--) : R || t.appendChild(y);
            if (k) {
                for (D && (w = n.createElement("div"), t.appendChild(w), x = w.offsetWidth + "px", T = w.offsetParent === t ? 0 : t.offsetLeft, t.removeChild(w)), b = t.style.cssText, t.style.cssText = "display:none;"; t.firstChild;) t.removeChild(t.firstChild);
                for (P = !D || !R && !A, f = 0; k.length > f; f++) {
                    for (l = k[f], w = n.createElement("div"), w.style.cssText = "display:block;text-align:" + X + ";position:" + (D ? "absolute;" : "relative;"), Q && (w.className = Q + (V ? f + 1 : "")), o.push(w), j = l.length, d = 0; j > d; d++) "BR" !== l[d].nodeName && (y = l[d], w.appendChild(y), P && (y._wordEnd || R) && w.appendChild(n.createTextNode(" ")), D && (0 === d && (w.style.top = y._y + "px", w.style.left = z + T + "px"), y.style.top = "0px", T && (y.style.left = y._x - T + "px")));
                    R || A || (w.innerHTML = r(w).split(String.fromCharCode(160)).join(" ")), D && (w.style.width = x, w.style.height = y._h + "px"), t.appendChild(w)
                }
                t.style.cssText = b
            }
            D && (U > t.clientHeight && (t.style.height = U - N + "px", U > t.clientHeight && (t.style.height = U + I + "px")), B > t.clientWidth && (t.style.width = B - F + "px", B > t.clientWidth && (t.style.width = B + E + "px")))
        },
        v = d.prototype;
    v.split = function(t) {
        this.isSplit && this.revert(), this.vars = t || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var e = 0; this.elements.length > e; e++) this._originals[e] = this.elements[e].innerHTML, g(this.elements[e], this.vars, this.chars, this.words, this.lines);
        return this.isSplit = !0, this
    }, v.revert = function() {
        if (!this._originals) throw "revert() call wasn't scoped properly.";
        for (var t = this._originals.length; --t > -1;) this.elements[t].innerHTML = this._originals[t];
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, d.selector = t.$ || t.jQuery || function(e) {
        return t.$ ? (d.selector = t.$, t.$(e)) : n ? n.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
    }, d.version = "0.2.4"
})(_gsScope),
function(t) {
    "use strict";
    var e = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[t]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (module.exports = e())
}("SplitText");

try {
    window.GreenSockGobals = null;
    window._gsQueue = null;
    delete(window.GreenSockGlobals);
    delete(window._gsQueue);
} catch (e) {}

try {
    window.GreenSockGlobals = oldgs;
    window._gsQueue = oldgs_queue;
} catch (e) {}

if (window.tplogs == true)
    try {
        console.groupEnd();
    } catch (e) {}




(function(e, t) {
    e.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
    };
    e.expr[":"].uncached = function(t) {
        var n = document.createElement("img");
        n.src = t.src;
        return e(t).is('img[src!=""]') && !n.complete
    };
    e.fn.waitForImages = function(t, n, r) {
        if (e.isPlainObject(arguments[0])) {
            n = t.each;
            r = t.waitForAll;
            t = t.finished
        }
        t = t || e.noop;
        n = n || e.noop;
        r = !!r;
        if (!e.isFunction(t) || !e.isFunction(n)) {
            throw new TypeError("An invalid callback was supplied.")
        }
        return this.each(function() {
            var i = e(this),
                s = [];
            if (r) {
                var o = e.waitForImages.hasImageProperties || [],
                    u = /url\((['"]?)(.*?)\1\)/g;
                i.find("*").each(function() {
                    var t = e(this);
                    if (t.is("img:uncached")) {
                        s.push({
                            src: t.attr("src"),
                            element: t[0]
                        })
                    }
                    e.each(o, function(e, n) {
                        var r = t.css(n);
                        if (!r) {
                            return true
                        }
                        var i;
                        while (i = u.exec(r)) {
                            s.push({
                                src: i[2],
                                element: t[0]
                            })
                        }
                    })
                })
            } else {
                i.find("img:uncached").each(function() {
                    s.push({
                        src: this.src,
                        element: this
                    })
                })
            }
            var f = s.length,
                l = 0;
            if (f == 0) {
                t.call(i[0])
            }
            e.each(s, function(r, s) {
                var o = new Image;
                e(o).bind("load error", function(e) {
                    l++;
                    n.call(s.element, l, f, e.type == "load");
                    if (l == f) {
                        t.call(i[0]);
                        return false
                    }
                });
                o.src = s.src
            })
        })
    };
})(jQuery)

/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for Revolution Slider
 * @version: 4.6.0 (18.08.2013)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
 **************************************************************************/

function revslider_showDoubleJqueryError(e) {
        var t = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
        t += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
        t += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
        t += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
        t = "<span style='font-size:16px;color:#BC0C06;'>" + t + "</span>";
        jQuery(e).show().html(t)
    }(function(e, t) {
        function n() {
            var e = false;
            if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
                if (navigator.userAgent.match(/OS 4_\d like Mac OS X/i)) {
                    e = true
                }
            } else {
                e = false
            }
            return e
        }

        function r(r, i) {
            if (i.navigationStyle == "preview1" || i.navigationStyle == "preview3" || i.navigationStyle == "preview4") {
                i.soloArrowLeftHalign = "left";
                i.soloArrowLeftValign = "center";
                i.soloArrowLeftHOffset = 0;
                i.soloArrowLeftVOffset = 0;
                i.soloArrowRightHalign = "right";
                i.soloArrowRightValign = "center";
                i.soloArrowRightHOffset = 0;
                i.soloArrowRightVOffset = 0;
                i.navigationArrows = "solo"
            }
            if (i.simplifyAll == "on" && (f(8) || n())) {
                r.find(".tp-caption").each(function() {
                    var t = e(this);
                    t.removeClass("customin").removeClass("customout").addClass("fadein").addClass("fadeout");
                    t.data("splitin", "");
                    t.data("speed", 400)
                });
                r.find(">ul>li").each(function() {
                    var t = e(this);
                    t.data("transition", "fade");
                    t.data("masterspeed", 500);
                    t.data("slotamount", 1);
                    var n = t.find(">img").first();
                    n.data("kenburns", "off")
                })
            }
            i.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
            if (i.fullWidth != "on" && i.fullScreen != "on") i.autoHeight = "off";
            if (i.fullScreen == "on") i.autoHeight = "on";
            if (i.fullWidth != "on" && i.fullScreen != "on") forceFulWidth = "off";
            if (i.fullWidth == "on" && i.autoHeight == "off") r.css({
                maxHeight: i.startheight + "px"
            });
            if (Q() && i.hideThumbsOnMobile == "on" && i.navigationType == "thumb") i.navigationType = "none";
            if (Q() && i.hideBulletsOnMobile == "on" && i.navigationType == "bullet") i.navigationType = "none";
            if (Q() && i.hideBulletsOnMobile == "on" && i.navigationType == "both") i.navigationType = "none";
            if (Q() && i.hideArrowsOnMobile == "on") i.navigationArrows = "none";
            if (i.forceFullWidth == "on" && r.closest(".forcefullwidth_wrapper_tp_banner").length == 0) {
                var s = r.parent().offset().left;
                var l = r.parent().css("marginBottom");
                var m = r.parent().css("marginTop");
                if (l == t) l = 0;
                if (m == t) m = 0;
                r.parent().wrap('<div style="position:relative;width:100%;height:auto;margin-top:' + m + ";margin-bottom:" + l + '" class="forcefullwidth_wrapper_tp_banner"></div>');
                r.closest(".forcefullwidth_wrapper_tp_banner").append('<div class="tp-fullwidth-forcer" style="width:100%;height:' + r.height() + 'px"></div>');
                r.css({
                    backgroundColor: r.parent().css("backgroundColor"),
                    backgroundImage: r.parent().css("backgroundImage")
                });
                r.parent().css({
                    left: 0 - s + "px",
                    position: "absolute",
                    width: e(window).width()
                });
                i.width = e(window).width()
            }
            try {
                if (i.hideThumbsUnderResolution > e(window).width() && i.hideThumbsUnderResolution != 0) {
                    r.parent().find(".tp-bullets.tp-thumbs").css({
                        display: "none"
                    })
                } else {
                    r.parent().find(".tp-bullets.tp-thumbs").css({
                        display: "block"
                    })
                }
            } catch (g) {}
            if (!r.hasClass("revslider-initialised")) {
                r.addClass("revslider-initialised");
                if (r.attr("id") == t) r.attr("id", "revslider-" + Math.round(Math.random() * 1e3 + 5));
                i.firefox13 = false;
                i.ie = !e.support.opacity;
                i.ie9 = document.documentMode == 9;
                i.origcd = i.delay;
                var y = e.fn.jquery.split("."),
                    w = parseFloat(y[0]),
                    E = parseFloat(y[1]),
                    S = parseFloat(y[2] || "0");
                if (w == 1 && E < 7) {
                    r.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' + y + " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>")
                }
                if (w > 1) i.ie = false;
                if (!e.support.transition) e.fn.transition = e.fn.animate;
                r.find(".caption").each(function() {
                    e(this).addClass("tp-caption")
                });
                if (Q()) {
                    r.find(".tp-caption").each(function() {
                        var t = e(this);
                        if (t.data("autoplayonlyfirsttime") == true || t.data("autoplayonlyfirsttime") == "true") t.data("autoplayonlyfirsttime", "false");
                        if (t.data("autoplay") == true || t.data("autoplay") == "true") t.data("autoplay", false)
                    })
                }
                var x = 0;
                var T = 0;
                var N = 0;
                var C = "http";
                if (location.protocol === "https:") {
                    C = "https"
                }
                r.find(".tp-caption").each(function(n) {
                    try {
                        if ((e(this).data("ytid") != t || e(this).find("iframe").attr("src").toLowerCase().indexOf("youtube") > 0) && x == 0) {
                            x = 1;
                            var r = document.createElement("script");
                            var i = "https";
                            r.src = i + "://www.youtube.com/iframe_api";
                            var s = document.getElementsByTagName("script")[0];
                            var o = true;
                            e("head").find("*").each(function() {
                                if (e(this).attr("src") == i + "://www.youtube.com/iframe_api") o = false
                            });
                            if (o) {
                                s.parentNode.insertBefore(r, s)
                            }
                        }
                    } catch (u) {}
                    try {
                        if ((e(this).data("vimeoid") != t || e(this).find("iframe").attr("src").toLowerCase().indexOf("vimeo") > 0) && T == 0) {
                            T = 1;
                            var a = document.createElement("script");
                            a.src = C + "://a.vimeocdn.com/js/froogaloop2.min.js";
                            var s = document.getElementsByTagName("script")[0];
                            var o = true;
                            e("head").find("*").each(function() {
                                if (e(this).attr("src") == C + "://a.vimeocdn.com/js/froogaloop2.min.js") o = false
                            });
                            if (o) s.parentNode.insertBefore(a, s)
                        }
                    } catch (u) {}
                    try {
                        if (e(this).data("videomp4") != t || e(this).data("videowebm") != t) {}
                    } catch (u) {}
                });
                r.find(".tp-caption video").each(function(t) {
                    e(this).removeClass("video-js").removeClass("vjs-default-skin");
                    e(this).attr("preload", "");
                    e(this).css({
                        display: "none"
                    })
                });
                if (i.shuffle == "on") {
                    var L = new Object,
                        A = r.find(">ul:first-child >li:first-child");
                    L.fstransition = A.data("fstransition");
                    L.fsmasterspeed = A.data("fsmasterspeed");
                    L.fsslotamount = A.data("fsslotamount");
                    for (var O = 0; O < r.find(">ul:first-child >li").length; O++) {
                        var M = Math.round(Math.random() * r.find(">ul:first-child >li").length);
                        r.find(">ul:first-child >li:eq(" + M + ")").prependTo(r.find(">ul:first-child"))
                    }
                    var _ = r.find(">ul:first-child >li:first-child");
                    _.data("fstransition", L.fstransition);
                    _.data("fsmasterspeed", L.fsmasterspeed);
                    _.data("fsslotamount", L.fsslotamount)
                }
                i.slots = 4;
                i.act = -1;
                i.next = 0;
                if (i.startWithSlide != t) i.next = i.startWithSlide;
                var D = u("#")[0];
                if (D.length < 9) {
                    if (D.split("slide").length > 1) {
                        var P = parseInt(D.split("slide")[1], 0);
                        if (P < 1) P = 1;
                        if (P > r.find(">ul:first >li").length) P = r.find(">ul:first >li").length;
                        i.next = P - 1
                    }
                }
                i.firststart = 1;
                if (i.navigationHOffset == t) i.navOffsetHorizontal = 0;
                if (i.navigationVOffset == t) i.navOffsetVertical = 0;
                r.append('<div class="tp-loader ' + i.spinner + '">' + '<div class="dot1"></div>' + '<div class="dot2"></div>' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + "</div>");
                if (r.find(".tp-bannertimer").length == 0) r.append('<div class="tp-bannertimer" style="visibility:hidden"></div>');
                var H = r.find(".tp-bannertimer");
                if (H.length > 0) {
                    H.css({
                        width: "0%"
                    })
                }
                r.addClass("tp-simpleresponsive");
                i.container = r;
                i.slideamount = r.find(">ul:first >li").length;
                if (r.height() == 0) r.height(i.startheight);
                if (i.startwidth == t || i.startwidth == 0) i.startwidth = r.width();
                if (i.startheight == t || i.startheight == 0) i.startheight = r.height();
                i.width = r.width();
                i.height = r.height();
                i.bw = i.startwidth / r.width();
                i.bh = i.startheight / r.height();
                if (i.width != i.startwidth) {
                    i.height = Math.round(i.startheight * (i.width / i.startwidth));
                    r.height(i.height)
                }
                if (i.shadow != 0) {
                    r.parent().append('<div class="tp-bannershadow tp-shadow' + i.shadow + '"></div>');
                    var s = 0;
                    if (i.forceFullWidth == "on") s = 0 - i.container.parent().offset().left;
                    r.parent().find(".tp-bannershadow").css({
                        width: i.width,
                        left: s
                    })
                }
                r.find("ul").css({
                    display: "none"
                });
                var B = r;
                r.find("ul").css({
                    display: "block"
                });
                b(r, i);
                if (i.parallax != "off") nt(r, i);
                if (i.slideamount > 1) c(r, i);
                if (i.slideamount > 1 && i.navigationType == "thumb") it(r, i);
                if (i.slideamount > 1) h(r, i);
                if (i.keyboardNavigation == "on") p(r, i);
                d(r, i);
                if (i.hideThumbs > 0) v(r, i);
                k(r, i);
                if (i.slideamount > 1) K(r, i);
                setTimeout(function() {
                    r.trigger("revolution.slide.onloaded")
                }, 500);
                e("body").data("rs-fullScreenMode", false);
                e(window).on("mozfullscreenchange webkitfullscreenchange fullscreenchange", function() {
                    e("body").data("rs-fullScreenMode", !e("body").data("rs-fullScreenMode"));
                    if (e("body").data("rs-fullScreenMode")) {
                        setTimeout(function() {
                            e(window).trigger("resize")
                        }, 200)
                    }
                });
                e(window).resize(function() {
                    if (e("body").find(r) != 0)
                        if (i.forceFullWidth == "on") {
                            var t = i.container.closest(".forcefullwidth_wrapper_tp_banner").offset().left;
                            i.container.parent().css({
                                left: 0 - t + "px",
                                width: e(window).width()
                            })
                        }
                    if (r.outerWidth(true) != i.width || r.is(":hidden")) {
                        a(r, i)
                    }
                });
                try {
                    if (i.hideThumbsUnderResoluition != 0 && i.navigationType == "thumb") {
                        if (i.hideThumbsUnderResoluition > e(window).width()) e(".tp-bullets").css({
                            display: "none"
                        });
                        else e(".tp-bullets").css({
                            display: "block"
                        })
                    }
                } catch (g) {}
                r.find(".tp-scrollbelowslider").on("click", function() {
                    var t = 0;
                    try {
                        t = e("body").find(i.fullScreenOffsetContainer).height()
                    } catch (n) {}
                    try {
                        t = t - parseInt(e(this).data("scrolloffset"), 0)
                    } catch (n) {}
                    e("body,html").animate({
                        scrollTop: r.offset().top + r.find(">ul >li").height() - t + "px"
                    }, {
                        duration: 400
                    })
                });
                var j = r.parent();
                if (e(window).width() < i.hideSliderAtLimit) {
                    r.trigger("stoptimer");
                    if (j.css("display") != "none") j.data("olddisplay", j.css("display"));
                    j.css({
                        display: "none"
                    })
                }
                o(r, i)
            }
        }
        e.fn.extend({
            revolution: function(n) {
                defaults = {
                    delay: 9e3,
                    startheight: 500,
                    startwidth: 960,
                    fullScreenAlignForce: "off",
                    autoHeight: "off",
                    hideTimerBar: "off",
                    hideThumbs: 200,
                    hideNavDelayOnMobile: 1500,
                    thumbWidth: 100,
                    thumbHeight: 50,
                    thumbAmount: 3,
                    navigationType: "bullet",
                    navigationArrows: "solo",
                    navigationInGrid: "off",
                    hideThumbsOnMobile: "off",
                    hideBulletsOnMobile: "off",
                    hideArrowsOnMobile: "off",
                    hideThumbsUnderResoluition: 0,
                    navigationStyle: "round",
                    navigationHAlign: "center",
                    navigationVAlign: "bottom",
                    navigationHOffset: 0,
                    navigationVOffset: 20,
                    soloArrowLeftHalign: "left",
                    soloArrowLeftValign: "center",
                    soloArrowLeftHOffset: 20,
                    soloArrowLeftVOffset: 0,
                    soloArrowRightHalign: "right",
                    soloArrowRightValign: "center",
                    soloArrowRightHOffset: 20,
                    soloArrowRightVOffset: 0,
                    keyboardNavigation: "on",
                    touchenabled: "on",
                    onHoverStop: "on",
                    stopAtSlide: -1,
                    stopAfterLoops: -1,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLimit: 0,
                    hideSliderAtLimit: 0,
                    shadow: 0,
                    fullWidth: "off",
                    fullScreen: "off",
                    minFullScreenHeight: 0,
                    fullScreenOffsetContainer: "",
                    fullScreenOffset: "0",
                    dottedOverlay: "none",
                    forceFullWidth: "off",
                    spinner: "spinner0",
                    swipe_treshold: 75,
                    swipe_min_touches: 1,
                    drag_block_vertical: false,
                    isJoomla: false,
                    parallax: "off",
                    parallaxLevels: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
                    parallaxBgFreeze: "off",
                    parallaxOpacity: "on",
                    parallaxDisableOnMobile: "off",
                    panZoomDisableOnMobile: "off",
                    simplifyAll: "on",
                    minHeight: 0,
                    nextSlideOnWindowFocus: "off"
                };
                n = e.extend({}, defaults, n);
                return this.each(function() {
                    if (window.tplogs == true) try {
                        console.groupCollapsed("Slider Revolution 4.6.0 Initialisation on " + e(this).attr("id"));
                        console.groupCollapsed("Used Options:");
                        console.info(n);
                        console.groupEnd();
                        console.groupCollapsed("Tween Engine:")
                    } catch (i) {}
                    if (punchgs.TweenLite == t) {
                        if (window.tplogs == true) try {
                            console.error("GreenSock Engine Does not Exist!")
                        } catch (i) {}
                        return false
                    }
                    punchgs.force3D = true;
                    if (window.tplogs == true) try {
                        console.info("GreenSock Engine Version in Slider Revolution:" + punchgs.TweenLite.version)
                    } catch (i) {}
                    if (n.simplifyAll == "on") {} else {
                        punchgs.TweenLite.lagSmoothing(1e3, 16);
                        punchgs.force3D = "true"
                    }
                    if (window.tplogs == true) try {
                        console.groupEnd();
                        console.groupEnd()
                    } catch (i) {}
                    r(e(this), n)
                })
            },
            revscroll: function(t) {
                return this.each(function() {
                    var n = e(this);
                    e("body,html").animate({
                        scrollTop: n.offset().top + n.find(">ul >li").height() - t + "px"
                    }, {
                        duration: 400
                    })
                })
            },
            revredraw: function(t) {
                return this.each(function() {
                    var t = e(this);
                    var n = t.parent().find(".tp-bannertimer");
                    var r = n.data("opt");
                    a(t, r)
                })
            },
            revpause: function(t) {
                return this.each(function() {
                    var t = e(this);
                    t.data("conthover", 1);
                    t.data("conthover-changed", 1);
                    t.trigger("revolution.slide.onpause");
                    var n = t.parent().find(".tp-bannertimer");
                    var r = n.data("opt");
                    r.bannertimeronpause = true;
                    t.trigger("stoptimer")
                })
            },
            revresume: function(t) {
                return this.each(function() {
                    var t = e(this);
                    t.data("conthover", 0);
                    t.data("conthover-changed", 1);
                    t.trigger("revolution.slide.onresume");
                    var n = t.parent().find(".tp-bannertimer");
                    var r = n.data("opt");
                    r.bannertimeronpause = false;
                    t.trigger("starttimer")
                })
            },
            revnext: function(t) {
                return this.each(function() {
                    var t = e(this);
                    t.parent().find(".tp-rightarrow").click()
                })
            },
            revprev: function(t) {
                return this.each(function() {
                    var t = e(this);
                    t.parent().find(".tp-leftarrow").click()
                })
            },
            revmaxslide: function(t) {
                return e(this).find(">ul:first-child >li").length
            },
            revcurrentslide: function(t) {
                var n = e(this);
                var r = n.parent().find(".tp-bannertimer");
                var i = r.data("opt");
                return i.act
            },
            revlastslide: function(t) {
                var n = e(this);
                var r = n.parent().find(".tp-bannertimer");
                var i = r.data("opt");
                return i.lastslide
            },
            revshowslide: function(t) {
                return this.each(function() {
                    var n = e(this);
                    n.data("showus", t);
                    n.parent().find(".tp-rightarrow").click()
                })
            }
        });
        var s = function() {
            var e, t, n = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
            };
            for (e in n) {
                if (e in document) {
                    t = n[e];
                    break
                }
            }
            return function(n) {
                if (n) document.addEventListener(t, n);
                return !document[e]
            }
        }();
        var o = function(n, r) {
            var i = document.documentMode === t,
                s = window.chrome;
            if (i && !s) {
                e(window).on("focusin", function() {
                    setTimeout(function() {
                        if (r.nextSlideOnWindowFocus == "on") n.revnext();
                        n.revredraw()
                    }, 300)
                }).on("focusout", function() {})
            } else {
                if (window.addEventListener) {
                    window.addEventListener("focus", function(e) {
                        setTimeout(function() {
                            if (r.nextSlideOnWindowFocus == "on") n.revnext();
                            n.revredraw()
                        }, 300)
                    }, false);
                    window.addEventListener("blur", function(e) {}, false)
                } else {
                    window.attachEvent("focus", function(e) {
                        setTimeout(function() {
                            if (r.nextSlideOnWindowFocus == "on") n.revnext();
                            n.revredraw()
                        }, 300)
                    });
                    window.attachEvent("blur", function(e) {})
                }
            }
        };
        var u = function(e) {
            var t = [],
                n;
            var r = window.location.href.slice(window.location.href.indexOf(e) + 1).split("_");
            for (var i = 0; i < r.length; i++) {
                r[i] = r[i].replace("%3D", "=");
                n = r[i].split("=");
                t.push(n[0]);
                t[n[0]] = n[1]
            }
            return t
        };
        var a = function(n, r) {
            try {
                if (r.hideThumbsUnderResoluition != 0 && r.navigationType == "thumb") {
                    if (r.hideThumbsUnderResoluition > e(window).width()) e(".tp-bullets").css({
                        display: "none"
                    });
                    else e(".tp-bullets").css({
                        display: "block"
                    })
                }
            } catch (i) {}
            n.find(".defaultimg").each(function(t) {
                y(e(this), r)
            });
            var s = n.parent();
            if (e(window).width() < r.hideSliderAtLimit) {
                n.trigger("stoptimer");
                if (s.css("display") != "none") s.data("olddisplay", s.css("display"));
                s.css({
                    display: "none"
                })
            } else {
                if (n.is(":hidden")) {
                    if (s.data("olddisplay") != t && s.data("olddisplay") != "undefined" && s.data("olddisplay") != "none") s.css({
                        display: s.data("olddisplay")
                    });
                    else s.css({
                        display: "block"
                    });
                    n.trigger("restarttimer");
                    setTimeout(function() {
                        a(n, r)
                    }, 150)
                }
            }
            var o = 0;
            if (r.forceFullWidth == "on") o = 0 - r.container.parent().offset().left;
            try {
                n.parent().find(".tp-bannershadow").css({
                    width: r.width,
                    left: o
                })
            } catch (i) {}
            var u = n.find(">ul >li:eq(" + r.act + ") .slotholder");
            var f = n.find(">ul >li:eq(" + r.next + ") .slotholder");
            x(n, r, n);
            punchgs.TweenLite.set(f.find(".defaultimg"), {
                opacity: 0
            });
            u.find(".defaultimg").css({
                opacity: 1
            });
            f.find(".defaultimg").each(function() {
                var i = e(this);
                if (r.panZoomDisableOnMobile == "on" && Q()) {} else {
                    if (i.data("kenburn") != t) {
                        i.data("kenburn").restart();
                        Y(n, r, true)
                    }
                }
            });
            var l = n.find(">ul >li:eq(" + r.next + ")");
            var c = n.parent().find(".tparrows");
            if (c.hasClass("preview2")) c.css({
                width: parseInt(c.css("minWidth"), 0)
            });
            I(l, r, true);
            m(n, r)
        };
        var f = function(t, n) {
            var r = e('<div style="display:none;"/>').appendTo(e("body"));
            r.html("<!--[if " + (n || "") + " IE " + (t || "") + "]><a>&nbsp;</a><![endif]-->");
            var i = r.find("a").length;
            r.remove();
            return i
        };
        var l = function(e, t) {
            if (e.next == t.find(">ul >li").length - 1) {
                e.looptogo = e.looptogo - 1;
                if (e.looptogo <= 0) e.stopLoop = "on"
            }
            k(t, e)
        };
        var c = function(t, n) {
            var r = "hidebullets";
            if (n.hideThumbs == 0) r = "";
            if (n.navigationType == "bullet" || n.navigationType == "both") {
                t.parent().append('<div class="tp-bullets ' + r + " simplebullets " + n.navigationStyle + '"></div>')
            }
            var i = t.parent().find(".tp-bullets");
            t.find(">ul:first >li").each(function(e) {
                var n = t.find(">ul:first >li:eq(" + e + ") img:first").attr("src");
                i.append('<div class="bullet"></div>');
                var r = i.find(".bullet:first")
            });
            i.find(".bullet").each(function(r) {
                var i = e(this);
                if (r == n.slideamount - 1) i.addClass("last");
                if (r == 0) i.addClass("first");
                i.click(function() {
                    var e = false;
                    if (n.navigationArrows == "withbullet" || n.navigationArrows == "nexttobullets") {
                        if (i.index() - 1 == n.act) e = true
                    } else {
                        if (i.index() == n.act) e = true
                    }
                    if (n.transition == 0 && !e) {
                        if (n.navigationArrows == "withbullet" || n.navigationArrows == "nexttobullets") {
                            n.next = i.index() - 1
                        } else {
                            n.next = i.index()
                        }
                        l(n, t)
                    }
                })
            });
            i.append('<div class="tpclear"></div>');
            m(t, n)
        };
        var h = function(e, n) {
            function u(t) {
                e.parent().append('<div style="' + i + '" class="tp-' + t + "arrow " + s + " tparrows " + o + '"><div class="tp-arr-allwrapper"><div class="tp-arr-iwrapper"><div class="tp-arr-imgholder"></div><div class="tp-arr-imgholder2"></div><div class="tp-arr-titleholder"></div><div class="tp-arr-subtitleholder"></div></div></div></div>')
            }
            var r = e.find(".tp-bullets");
            var i = "",
                s = "hidearrows";
            if (n.hideThumbs == 0) s = "";
            var o = n.navigationStyle;
            if (n.navigationArrows == "none") i = "visibility:hidden;display:none";
            n.soloArrowStyle = "default" + " " + n.navigationStyle;
            if (n.navigationArrows != "none" && n.navigationArrows != "nexttobullets") o = n.soloArrowStyle;
            u("left");
            u("right");
            e.parent().find(".tp-rightarrow").click(function() {
                if (n.transition == 0) {
                    if (e.data("showus") != t && e.data("showus") != -1) n.next = e.data("showus") - 1;
                    else n.next = n.next + 1;
                    e.data("showus", -1);
                    if (n.next >= n.slideamount) n.next = 0;
                    if (n.next < 0) n.next = 0;
                    if (n.act != n.next) l(n, e)
                }
            });
            e.parent().find(".tp-leftarrow").click(function() {
                if (n.transition == 0) {
                    n.next = n.next - 1;
                    n.leftarrowpressed = 1;
                    if (n.next < 0) n.next = n.slideamount - 1;
                    l(n, e)
                }
            });
            m(e, n)
        };
        var p = function(n, r) {
            e(document).keydown(function(e) {
                if (r.transition == 0 && e.keyCode == 39) {
                    if (n.data("showus") != t && n.data("showus") != -1) r.next = n.data("showus") - 1;
                    else r.next = r.next + 1;
                    n.data("showus", -1);
                    if (r.next >= r.slideamount) r.next = 0;
                    if (r.next < 0) r.next = 0;
                    if (r.act != r.next) l(r, n)
                }
                if (r.transition == 0 && e.keyCode == 37) {
                    r.next = r.next - 1;
                    r.leftarrowpressed = 1;
                    if (r.next < 0) r.next = r.slideamount - 1;
                    l(r, n)
                }
            });
            m(n, r)
        };
        var d = function(t, n) {
            var r = "vertical";
            if (n.touchenabled == "on") {
                if (n.drag_block_vertical == true) r = "none";
                t.swipe({
                    allowPageScroll: r,
                    fingers: n.swipe_min_touches,
                    treshold: n.swipe_treshold,
                    swipe: function(i, s, o, u, a, f) {
                        switch (s) {
                            case "left":
                                if (n.transition == 0) {
                                    n.next = n.next + 1;
                                    if (n.next == n.slideamount) n.next = 0;
                                    l(n, t)
                                }
                                break;
                            case "right":
                                if (n.transition == 0) {
                                    n.next = n.next - 1;
                                    n.leftarrowpressed = 1;
                                    if (n.next < 0) n.next = n.slideamount - 1;
                                    l(n, t)
                                }
                                break;
                            case "up":
                                if (r == "none") e("html, body").animate({
                                    scrollTop: t.offset().top + t.height() + "px"
                                });
                                break;
                            case "down":
                                if (r == "none") e("html, body").animate({
                                    scrollTop: t.offset().top - e(window).height() + "px"
                                });
                                break
                        }
                    }
                })
            }
        };
        var v = function(e, t) {
            var n = e.parent().find(".tp-bullets");
            var r = e.parent().find(".tparrows");
            if (n == null) {
                e.append('<div class=".tp-bullets"></div>');
                var n = e.parent().find(".tp-bullets")
            }
            if (r == null) {
                e.append('<div class=".tparrows"></div>');
                var r = e.parent().find(".tparrows")
            }
            e.data("hideThumbs", t.hideThumbs);
            n.addClass("hidebullets");
            r.addClass("hidearrows");
            if (Q()) {
                try {
                    e.hammer().on("touch", function() {
                        e.addClass("hovered");
                        if (t.onHoverStop == "on") e.trigger("stoptimer");
                        clearTimeout(e.data("hideThumbs"));
                        n.removeClass("hidebullets");
                        r.removeClass("hidearrows")
                    });
                    e.hammer().on("release", function() {
                        e.removeClass("hovered");
                        e.trigger("starttimer");
                        if (!e.hasClass("hovered") && !n.hasClass("hovered")) e.data("hideThumbs", setTimeout(function() {
                            n.addClass("hidebullets");
                            r.addClass("hidearrows");
                            e.trigger("starttimer")
                        }, t.hideNavDelayOnMobile))
                    })
                } catch (i) {}
            } else {
                n.hover(function() {
                    t.overnav = true;
                    if (t.onHoverStop == "on") e.trigger("stoptimer");
                    n.addClass("hovered");
                    clearTimeout(e.data("hideThumbs"));
                    n.removeClass("hidebullets");
                    r.removeClass("hidearrows")
                }, function() {
                    t.overnav = false;
                    e.trigger("starttimer");
                    n.removeClass("hovered");
                    if (!e.hasClass("hovered") && !n.hasClass("hovered")) e.data("hideThumbs", setTimeout(function() {
                        n.addClass("hidebullets");
                        r.addClass("hidearrows")
                    }, t.hideThumbs))
                });
                r.hover(function() {
                    t.overnav = true;
                    if (t.onHoverStop == "on") e.trigger("stoptimer");
                    n.addClass("hovered");
                    clearTimeout(e.data("hideThumbs"));
                    n.removeClass("hidebullets");
                    r.removeClass("hidearrows")
                }, function() {
                    t.overnav = false;
                    e.trigger("starttimer");
                    n.removeClass("hovered")
                });
                e.on("mouseenter", function() {
                    e.addClass("hovered");
                    if (t.onHoverStop == "on") e.trigger("stoptimer");
                    clearTimeout(e.data("hideThumbs"));
                    n.removeClass("hidebullets");
                    r.removeClass("hidearrows")
                });
                e.on("mouseleave", function() {
                    e.removeClass("hovered");
                    e.trigger("starttimer");
                    if (!e.hasClass("hovered") && !n.hasClass("hovered")) e.data("hideThumbs", setTimeout(function() {
                        n.addClass("hidebullets");
                        r.addClass("hidearrows")
                    }, t.hideThumbs))
                })
            }
        };
        var m = function(t, n) {
            var r = t.parent();
            var i = r.find(".tp-bullets");
            if (n.navigationType == "thumb") {
                i.find(".thumb").each(function(t) {
                    var r = e(this);
                    r.css({
                        width: n.thumbWidth * n.bw + "px",
                        height: n.thumbHeight * n.bh + "px"
                    })
                });
                var s = i.find(".tp-mask");
                s.width(n.thumbWidth * n.thumbAmount * n.bw);
                s.height(n.thumbHeight * n.bh);
                s.parent().width(n.thumbWidth * n.thumbAmount * n.bw);
                s.parent().height(n.thumbHeight * n.bh)
            }
            var o = r.find(".tp-leftarrow");
            var u = r.find(".tp-rightarrow");
            if (n.navigationType == "thumb" && n.navigationArrows == "nexttobullets") n.navigationArrows = "solo";
            if (n.navigationArrows == "nexttobullets") {
                o.prependTo(i).css({
                    "float": "left"
                });
                u.insertBefore(i.find(".tpclear")).css({
                    "float": "left"
                })
            }
            var a = 0;
            if (n.forceFullWidth == "on") a = 0 - n.container.parent().offset().left;
            var f = 0,
                l = 0;
            if (n.navigationInGrid == "on") {
                f = t.width() > n.startwidth ? (t.width() - n.startwidth) / 2 : 0, l = t.height() > n.startheight ? (t.height() - n.startheight) / 2 : 0
            }
            if (n.navigationArrows != "none" && n.navigationArrows != "nexttobullets") {
                o.css({
                    position: "absolute"
                });
                u.css({
                    position: "absolute"
                });
                if (n.soloArrowLeftValign == "center") o.css({
                    top: "50%",
                    marginTop: n.soloArrowLeftVOffset - Math.round(o.innerHeight() / 2) + "px"
                });
                if (n.soloArrowLeftValign == "bottom") o.css({
                    top: "auto",
                    bottom: 0 + n.soloArrowLeftVOffset + "px"
                });
                if (n.soloArrowLeftValign == "top") o.css({
                    bottom: "auto",
                    top: 0 + n.soloArrowLeftVOffset + "px"
                });
                if (n.soloArrowLeftHalign == "center") o.css({
                    left: "50%",
                    marginLeft: a + n.soloArrowLeftHOffset - Math.round(o.innerWidth() / 2) + "px"
                });
                if (n.soloArrowLeftHalign == "left") o.css({
                    left: f + n.soloArrowLeftHOffset + a + "px"
                });
                if (n.soloArrowLeftHalign == "right") o.css({
                    right: f + n.soloArrowLeftHOffset - a + "px"
                });
                if (n.soloArrowRightValign == "center") u.css({
                    top: "50%",
                    marginTop: n.soloArrowRightVOffset - Math.round(u.innerHeight() / 2) + "px"
                });
                if (n.soloArrowRightValign == "bottom") u.css({
                    top: "auto",
                    bottom: 0 + n.soloArrowRightVOffset + "px"
                });
                if (n.soloArrowRightValign == "top") u.css({
                    bottom: "auto",
                    top: 0 + n.soloArrowRightVOffset + "px"
                });
                if (n.soloArrowRightHalign == "center") u.css({
                    left: "50%",
                    marginLeft: a + n.soloArrowRightHOffset - Math.round(u.innerWidth() / 2) + "px"
                });
                if (n.soloArrowRightHalign == "left") u.css({
                    left: f + n.soloArrowRightHOffset + a + "px"
                });
                if (n.soloArrowRightHalign == "right") u.css({
                    right: f + n.soloArrowRightHOffset - a + "px"
                });
                if (o.position() != null) o.css({
                    top: Math.round(parseInt(o.position().top, 0)) + "px"
                });
                if (u.position() != null) u.css({
                    top: Math.round(parseInt(u.position().top, 0)) + "px"
                })
            }
            if (n.navigationArrows == "none") {
                o.css({
                    visibility: "hidden"
                });
                u.css({
                    visibility: "hidden"
                })
            }
            if (n.navigationVAlign == "center") i.css({
                top: "50%",
                marginTop: n.navigationVOffset - Math.round(i.innerHeight() / 2) + "px"
            });
            if (n.navigationVAlign == "bottom") i.css({
                bottom: 0 + n.navigationVOffset + "px"
            });
            if (n.navigationVAlign == "top") i.css({
                top: 0 + n.navigationVOffset + "px"
            });
            if (n.navigationHAlign == "center") i.css({
                left: "50%",
                marginLeft: a + n.navigationHOffset - Math.round(i.innerWidth() / 2) + "px"
            });
            if (n.navigationHAlign == "left") i.css({
                left: 0 + n.navigationHOffset + a + "px"
            });
            if (n.navigationHAlign == "right") i.css({
                right: 0 + n.navigationHOffset - a + "px"
            })
        };
        var g = function(n) {
            var r = n.container;
            n.beforli = n.next - 1;
            n.comingli = n.next + 1;
            if (n.beforli < 0) n.beforli = n.slideamount - 1;
            if (n.comingli >= n.slideamount) n.comingli = 0;
            var i = r.find(">ul:first-child >li:eq(" + n.comingli + ")"),
                s = r.find(">ul:first-child >li:eq(" + n.beforli + ")"),
                o = s.find(".defaultimg").attr("src"),
                u = i.find(".defaultimg").attr("src");
            if (n.arr == t) {
                n.arr = r.parent().find(".tparrows"), n.rar = r.parent().find(".tp-rightarrow"), n.lar = r.parent().find(".tp-leftarrow"), n.raimg = n.rar.find(".tp-arr-imgholder"), n.laimg = n.lar.find(".tp-arr-imgholder"), n.raimg_b = n.rar.find(".tp-arr-imgholder2"), n.laimg_b = n.lar.find(".tp-arr-imgholder2"), n.ratit = n.rar.find(".tp-arr-titleholder"), n.latit = n.lar.find(".tp-arr-titleholder")
            }
            var a = n.arr,
                f = n.rar,
                l = n.lar,
                c = n.raimg,
                h = n.laimg,
                p = n.raimg_b,
                d = n.laimg_b,
                v = n.ratit,
                m = n.latit;
            if (i.data("title") != t) v.html(i.data("title"));
            if (s.data("title") != t) m.html(s.data("title"));
            if (f.hasClass("itishovered")) {
                f.width(v.outerWidth(true) + parseInt(f.css("minWidth"), 0))
            }
            if (l.hasClass("itishovered")) {
                l.width(m.outerWidth(true) + parseInt(l.css("minWidth"), 0))
            }
            if (a.hasClass("preview2") && !a.hasClass("hashoveralready")) {
                a.addClass("hashoveralready");
                if (!Q()) a.hover(function() {
                    var t = e(this),
                        n = t.find(".tp-arr-titleholder");
                    if (e(window).width() > 767) t.width(n.outerWidth(true) + parseInt(t.css("minWidth"), 0));
                    t.addClass("itishovered")
                }, function() {
                    var t = e(this),
                        n = t.find(".tp-arr-titleholder");
                    t.css({
                        width: parseInt(t.css("minWidth"), 0)
                    });
                    t.removeClass("itishovered")
                });
                else {
                    var a = e(this),
                        g = a.find(".tp-arr-titleholder");
                    g.addClass("alwayshidden");
                    punchgs.TweenLite.set(g, {
                        autoAlpha: 0
                    })
                }
            }
            if (s.data("thumb") != t) o = s.data("thumb");
            if (i.data("thumb") != t) u = i.data("thumb");
            if (!a.hasClass("preview4")) {
                punchgs.TweenLite.to(c, .5, {
                    autoAlpha: 0,
                    onComplete: function() {
                        c.css({
                            backgroundImage: "url(" + u + ")"
                        });
                        h.css({
                            backgroundImage: "url(" + o + ")"
                        })
                    }
                });
                punchgs.TweenLite.to(h, .5, {
                    autoAlpha: 0,
                    onComplete: function() {
                        punchgs.TweenLite.to(c, .5, {
                            autoAlpha: 1,
                            delay: .2
                        });
                        punchgs.TweenLite.to(h, .5, {
                            autoAlpha: 1,
                            delay: .2
                        })
                    }
                })
            } else {
                p.css({
                    backgroundImage: "url(" + u + ")"
                });
                d.css({
                    backgroundImage: "url(" + o + ")"
                });
                punchgs.TweenLite.fromTo(p, .8, {
                    force3D: punchgs.force3d,
                    x: 0
                }, {
                    x: -c.width(),
                    ease: punchgs.Power3.easeOut,
                    delay: 1,
                    onComplete: function() {
                        c.css({
                            backgroundImage: "url(" + u + ")"
                        });
                        punchgs.TweenLite.set(p, {
                            x: 0
                        })
                    }
                });
                punchgs.TweenLite.fromTo(d, .8, {
                    force3D: punchgs.force3d,
                    x: 0
                }, {
                    x: c.width(),
                    ease: punchgs.Power3.easeOut,
                    delay: 1,
                    onComplete: function() {
                        h.css({
                            backgroundImage: "url(" + o + ")"
                        });
                        punchgs.TweenLite.set(d, {
                            x: 0
                        })
                    }
                });
                punchgs.TweenLite.fromTo(c, .8, {
                    x: 0
                }, {
                    force3D: punchgs.force3d,
                    x: -c.width(),
                    ease: punchgs.Power3.easeOut,
                    delay: 1,
                    onComplete: function() {
                        punchgs.TweenLite.set(c, {
                            x: 0
                        })
                    }
                });
                punchgs.TweenLite.fromTo(h, .8, {
                    x: 0
                }, {
                    force3D: punchgs.force3d,
                    x: c.width(),
                    ease: punchgs.Power3.easeOut,
                    delay: 1,
                    onComplete: function() {
                        punchgs.TweenLite.set(h, {
                            x: 0
                        })
                    }
                })
            }
            if (f.hasClass("preview4") && !f.hasClass("hashoveralready")) {
                f.addClass("hashoveralready");
                f.hover(function() {
                    var t = e(this).find(".tp-arr-iwrapper");
                    var n = e(this).find(".tp-arr-allwrapper");
                    punchgs.TweenLite.fromTo(t, .4, {
                        x: t.width()
                    }, {
                        x: 0,
                        delay: .3,
                        ease: punchgs.Power3.easeOut,
                        overwrite: "all"
                    });
                    punchgs.TweenLite.to(n, .2, {
                        autoAlpha: 1,
                        overwrite: "all"
                    })
                }, function() {
                    var t = e(this).find(".tp-arr-iwrapper");
                    var n = e(this).find(".tp-arr-allwrapper");
                    punchgs.TweenLite.to(t, .4, {
                        x: t.width(),
                        ease: punchgs.Power3.easeOut,
                        delay: .2,
                        overwrite: "all"
                    });
                    punchgs.TweenLite.to(n, .2, {
                        delay: .6,
                        autoAlpha: 0,
                        overwrite: "all"
                    })
                });
                l.hover(function() {
                    var t = e(this).find(".tp-arr-iwrapper");
                    var n = e(this).find(".tp-arr-allwrapper");
                    punchgs.TweenLite.fromTo(t, .4, {
                        x: 0 - t.width()
                    }, {
                        x: 0,
                        delay: .3,
                        ease: punchgs.Power3.easeOut,
                        overwrite: "all"
                    });
                    punchgs.TweenLite.to(n, .2, {
                        autoAlpha: 1,
                        overwrite: "all"
                    })
                }, function() {
                    var t = e(this).find(".tp-arr-iwrapper");
                    var n = e(this).find(".tp-arr-allwrapper");
                    punchgs.TweenLite.to(t, .4, {
                        x: 0 - t.width(),
                        ease: punchgs.Power3.easeOut,
                        delay: .2,
                        overwrite: "all"
                    });
                    punchgs.TweenLite.to(n, .2, {
                        delay: .6,
                        autoAlpha: 0,
                        overwrite: "all"
                    })
                })
            }
        };
        var y = function(n, r) {
            r.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").css({
                height: r.container.height()
            });
            r.container.closest(".rev_slider_wrapper").css({
                height: r.container.height()
            });
            r.width = parseInt(r.container.width(), 0);
            r.height = parseInt(r.container.height(), 0);
            r.bw = r.width / r.startwidth;
            r.bh = r.height / r.startheight;
            if (r.bh > r.bw) r.bh = r.bw;
            if (r.bh < r.bw) r.bw = r.bh;
            if (r.bw < r.bh) r.bh = r.bw;
            if (r.bh > 1) {
                r.bw = 1;
                r.bh = 1
            }
            if (r.bw > 1) {
                r.bw = 1;
                r.bh = 1
            }
            r.height = Math.round(r.startheight * (r.width / r.startwidth));
            if (r.height > r.startheight && r.autoHeight != "on") r.height = r.startheight;
            if (r.fullScreen == "on") {
                r.height = r.bw * r.startheight;
                var i = r.container.parent().width();
                var s = e(window).height();
                if (r.fullScreenOffsetContainer != t) {
                    try {
                        var o = r.fullScreenOffsetContainer.split(",");
                        e.each(o, function(t, n) {
                            s = s - e(n).outerHeight(true);
                            if (s < r.minFullScreenHeight) s = r.minFullScreenHeight
                        })
                    } catch (u) {}
                    try {
                        if (r.fullScreenOffset.split("%").length > 1 && r.fullScreenOffset != t && r.fullScreenOffset.length > 0) {
                            s = s - e(window).height() * parseInt(r.fullScreenOffset, 0) / 100
                        } else {
                            if (r.fullScreenOffset != t && r.fullScreenOffset.length > 0) s = s - parseInt(r.fullScreenOffset, 0)
                        }
                        if (s < r.minFullScreenHeight) s = r.minFullScreenHeight
                    } catch (u) {}
                }
                r.container.parent().height(s);
                r.container.closest(".rev_slider_wrapper").height(s);
                r.container.css({
                    height: "100%"
                });
                r.height = s;
                if (r.minHeight != t && r.height < r.minHeight) r.height = r.minHeight
            } else {
                if (r.minHeight != t && r.height < r.minHeight) r.height = r.minHeight;
                r.container.height(r.height)
            }
            r.slotw = Math.ceil(r.width / r.slots);
            if (r.fullScreen == "on") r.sloth = Math.ceil(e(window).height() / r.slots);
            else r.sloth = Math.ceil(r.height / r.slots);
            if (r.autoHeight == "on") r.sloth = Math.ceil(n.height() / r.slots)
        };
        var b = function(n, r) {
            n.find(".tp-caption").each(function() {
                e(this).addClass(e(this).data("transition"));
                e(this).addClass("start")
            });
            n.find(">ul:first").css({
                overflow: "hidden",
                width: "100%",
                height: "100%",
                maxHeight: n.parent().css("maxHeight")
            });
            if (r.autoHeight == "on") {
                n.find(">ul:first").css({
                    overflow: "hidden",
                    width: "100%",
                    height: "100%",
                    maxHeight: "none"
                });
                n.css({
                    maxHeight: "none"
                });
                n.parent().css({
                    maxHeight: "none"
                })
            }
            n.find(">ul:first >li").each(function(n) {
                var r = e(this);
                r.css({
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                });
                if (r.data("link") != t) {
                    var i = r.data("link");
                    var s = "_self";
                    var o = 60;
                    if (r.data("slideindex") == "back") o = 0;
                    var u = r.data("linktoslide");
                    if (r.data("target") != t) s = r.data("target");
                    if (i == "slide") {
                        r.append('<div class="tp-caption sft slidelink" style="width:100%;height:100%;z-index:' + o + ';" data-x="center" data-y="center" data-linktoslide="' + u + '" data-start="0"><a style="width:100%;height:100%;display:block"><span style="width:100%;height:100%;display:block"></span></a></div>')
                    } else {
                        u = "no";
                        r.append('<div class="tp-caption sft slidelink" style="width:100%;height:100%;z-index:' + o + ';" data-x="center" data-y="center" data-linktoslide="' + u + '" data-start="0"><a style="width:100%;height:100%;display:block" target="' + s + '" href="' + i + '"><span style="width:100%;height:100%;display:block"></span></a></div>')
                    }
                }
            });
            n.parent().css({
                overflow: "visible"
            });
            n.find(">ul:first >li >img").each(function(n) {
                var i = e(this);
                i.addClass("defaultimg");
                if (i.data("lazyload") != t && i.data("lazydone") != 1) {} else {
                    y(i, r)
                }
                i.wrap('<div class="slotholder" style="width:100%;height:100%;"' + 'data-duration="' + i.data("duration") + '"' + 'data-zoomstart="' + i.data("zoomstart") + '"' + 'data-zoomend="' + i.data("zoomend") + '"' + 'data-rotationstart="' + i.data("rotationstart") + '"' + 'data-rotationend="' + i.data("rotationend") + '"' + 'data-ease="' + i.data("ease") + '"' + 'data-duration="' + i.data("duration") + '"' + 'data-bgpositionend="' + i.data("bgpositionend") + '"' + 'data-bgposition="' + i.data("bgposition") + '"' + 'data-duration="' + i.data("duration") + '"' + 'data-kenburns="' + i.data("kenburns") + '"' + 'data-easeme="' + i.data("ease") + '"' + 'data-bgfit="' + i.data("bgfit") + '"' + 'data-bgfitend="' + i.data("bgfitend") + '"' + 'data-owidth="' + i.data("owidth") + '"' + 'data-oheight="' + i.data("oheight") + '"' + "></div>");
                if (r.dottedOverlay != "none" && r.dottedOverlay != t) i.closest(".slotholder").append('<div class="tp-dottedoverlay ' + r.dottedOverlay + '"></div>');
                var s = i.attr("src"),
                    o = i.data("lazyload"),
                    u = i.data("bgfit"),
                    a = i.data("bgrepeat"),
                    l = i.data("bgposition");
                if (u == t) u = "cover";
                if (a == t) a = "no-repeat";
                if (l == t) l = "center center";
                var c = i.closest(".slotholder");
                i.replaceWith('<div class="tp-bgimg defaultimg" data-lazyload="' + i.data("lazyload") + '" data-bgfit="' + u + '"data-bgposition="' + l + '" data-bgrepeat="' + a + '" data-lazydone="' + i.data("lazydone") + '" src="' + s + '" data-src="' + s + '" style="background-color:' + i.css("backgroundColor") + ";background-repeat:" + a + ";background-image:url(" + s + ");background-size:" + u + ";background-position:" + l + ';width:100%;height:100%;"></div>');
                if (f(8)) {
                    c.find(".tp-bgimg").css({
                        backgroundImage: "none",
                        "background-image": "none"
                    });
                    c.find(".tp-bgimg").append('<img class="ieeightfallbackimage defaultimg" src="' + s + '" style="width:100%">')
                }
                i.css({
                    opacity: 0
                });
                i.data("li-id", n)
            })
        };
        var w = function(e, n, r, i) {
            var s = e,
                o = s.find(".defaultimg"),
                u = s.data("zoomstart"),
                a = s.data("rotationstart");
            if (o.data("currotate") != t) a = o.data("currotate");
            if (o.data("curscale") != t) u = o.data("curscale");
            y(o, n);
            var l = o.data("src"),
                c = o.css("background-color"),
                h = n.width,
                p = n.height,
                d = o.data("fxof");
            if (n.autoHeight == "on") p = n.container.height();
            if (d == t) d = 0;
            fullyoff = 0;
            var v = 0,
                m = o.data("bgfit"),
                g = o.data("bgrepeat"),
                b = o.data("bgposition");
            if (m == t) m = "cover";
            if (g == t) g = "no-repeat";
            if (b == t) b = "center center";
            if (f(8)) {
                s.data("kenburns", "off");
                var w = l;
                l = ""
            }
            if (n.panZoomDisableOnMobile == "on" && Q()) {
                s.data("kenburns", "off")
            }
            if (s.data("kenburns") == "on") {
                m = u;
                if (m.toString().length < 4) m = G(m, s, n)
            }
            if (i == "horizontal") {
                if (!r) var v = 0 - n.slotw;
                for (var E = 0; E < n.slots; E++) {
                    s.append('<div class="slot" style="position:absolute;' + "top:" + (0 + fullyoff) + "px;" + "left:" + (d + E * n.slotw) + "px;" + "overflow:hidden;width:" + (n.slotw + .6) + "px;" + "height:" + p + 'px">' + '<div class="slotslide" style="position:absolute;' + "top:0px;left:" + v + "px;" + "width:" + (n.slotw + .6) + "px;" + "height:" + p + 'px;overflow:hidden;">' + '<div style="background-color:' + c + ";" + "position:absolute;top:0px;" + "left:" + (0 - E * n.slotw) + "px;" + "width:" + h + "px;height:" + p + "px;" + "background-image:url(" + l + ");" + "background-repeat:" + g + ";" + "background-size:" + m + ";background-position:" + b + ';">' + "</div></div></div>");
                    if (u != t && a != t) punchgs.TweenLite.set(s.find(".slot").last(), {
                        rotationZ: a
                    });
                    if (f(8)) {
                        s.find(".slot ").last().find(".slotslide").append('<img class="ieeightfallbackimage" src="' + w + '" style="width:100%;height:auto">');
                        S(s, n)
                    }
                }
            } else {
                if (!r) var v = 0 - n.sloth;
                for (var E = 0; E < n.slots + 2; E++) {
                    s.append('<div class="slot" style="position:absolute;' + "top:" + (fullyoff + E * n.sloth) + "px;" + "left:" + d + "px;" + "overflow:hidden;" + "width:" + h + "px;" + "height:" + n.sloth + 'px">' + '<div class="slotslide" style="position:absolute;' + "top:" + v + "px;" + "left:0px;width:" + h + "px;" + "height:" + n.sloth + "px;" + 'overflow:hidden;">' + '<div style="background-color:' + c + ";" + "position:absolute;" + "top:" + (0 - E * n.sloth) + "px;" + "left:0px;" + "width:" + h + "px;height:" + p + "px;" + "background-image:url(" + l + ");" + "background-repeat:" + g + ";" + "background-size:" + m + ";background-position:" + b + ';">' + "</div></div></div>");
                    if (u != t && a != t) punchgs.TweenLite.set(s.find(".slot").last(), {
                        rotationZ: a
                    });
                    if (f(8)) {
                        s.find(".slot ").last().find(".slotslide").append('<img class="ieeightfallbackimage" src="' + w + '" style="width:100%;height:auto;">');
                        S(s, n)
                    }
                }
            }
        };
        var E = function(e, n, r) {
            var i = e;
            var s = i.find(".defaultimg");
            var o = i.data("zoomstart");
            var u = i.data("rotationstart");
            if (s.data("currotate") != t) u = s.data("currotate");
            if (s.data("curscale") != t) o = s.data("curscale") * 100;
            y(s, n);
            var a = s.data("src");
            var l = s.css("backgroundColor");
            var c = n.width;
            var h = n.height;
            if (n.autoHeight == "on") h = n.container.height();
            var p = s.data("fxof");
            if (p == t) p = 0;
            fullyoff = 0;
            var d = 0;
            if (f(8)) {
                var v = a;
                a = ""
            }
            var m = 0;
            if (n.sloth > n.slotw) m = n.sloth;
            else m = n.slotw;
            if (!r) {
                var d = 0 - m
            }
            n.slotw = m;
            n.sloth = m;
            var g = 0;
            var b = 0;
            var w = s.data("bgfit");
            var E = s.data("bgrepeat");
            var x = s.data("bgposition");
            if (w == t) w = "cover";
            if (E == t) E = "no-repeat";
            if (x == t) x = "center center";
            if (i.data("kenburns") == "on") {
                w = o;
                if (w.toString().length < 4) w = G(w, i, n)
            }
            for (var T = 0; T < n.slots; T++) {
                b = 0;
                for (var N = 0; N < n.slots; N++) {
                    i.append('<div class="slot" ' + 'style="position:absolute;' + "top:" + (fullyoff + b) + "px;" + "left:" + (p + g) + "px;" + "width:" + m + "px;" + "height:" + m + "px;" + 'overflow:hidden;">' + '<div class="slotslide" data-x="' + g + '" data-y="' + b + '" ' + 'style="position:absolute;' + "top:" + 0 + "px;" + "left:" + 0 + "px;" + "width:" + m + "px;" + "height:" + m + "px;" + 'overflow:hidden;">' + '<div style="position:absolute;' + "top:" + (0 - b) + "px;" + "left:" + (0 - g) + "px;" + "width:" + c + "px;" + "height:" + h + "px;" + "background-color:" + l + ";" + "background-image:url(" + a + ");" + "background-repeat:" + E + ";" + "background-size:" + w + ";background-position:" + x + ';">' + "</div></div></div>");
                    b = b + m;
                    if (f(8)) {
                        i.find(".slot ").last().find(".slotslide").append('<img src="' + v + '">');
                        S(i, n)
                    }
                    if (o != t && u != t) punchgs.TweenLite.set(i.find(".slot").last(), {
                        rotationZ: u
                    })
                }
                g = g + m
            }
        };
        var S = function(e, t) {
            if (f(8)) {
                var n = e.find(".ieeightfallbackimage");
                var r = n.width(),
                    i = n.height();
                if (t.startwidth / t.startheight < e.data("owidth") / e.data("oheight")) n.css({
                    width: "auto",
                    height: "100%"
                });
                else n.css({
                    width: "100%",
                    height: "auto"
                });
                setTimeout(function() {
                    var r = n.width(),
                        i = n.height();
                    if (e.data("bgposition") == "center center") n.css({
                        position: "absolute",
                        top: t.height / 2 - i / 2 + "px",
                        left: t.width / 2 - r / 2 + "px"
                    });
                    if (e.data("bgposition") == "center top" || e.data("bgposition") == "top center") n.css({
                        position: "absolute",
                        top: "0px",
                        left: t.width / 2 - r / 2 + "px"
                    });
                    if (e.data("bgposition") == "center bottom" || e.data("bgposition") == "bottom center") n.css({
                        position: "absolute",
                        bottom: "0px",
                        left: t.width / 2 - r / 2 + "px"
                    });
                    if (e.data("bgposition") == "right top" || e.data("bgposition") == "top right") n.css({
                        position: "absolute",
                        top: "0px",
                        right: "0px"
                    });
                    if (e.data("bgposition") == "right bottom" || e.data("bgposition") == "bottom right") n.css({
                        position: "absolute",
                        bottom: "0px",
                        right: "0px"
                    });
                    if (e.data("bgposition") == "right center" || e.data("bgposition") == "center right") n.css({
                        position: "absolute",
                        top: t.height / 2 - i / 2 + "px",
                        right: "0px"
                    });
                    if (e.data("bgposition") == "left bottom" || e.data("bgposition") == "bottom left") n.css({
                        position: "absolute",
                        bottom: "0px",
                        left: "0px"
                    });
                    if (e.data("bgposition") == "left center" || e.data("bgposition") == "center left") n.css({
                        position: "absolute",
                        top: t.height / 2 - i / 2 + "px",
                        left: "0px"
                    })
                }, 20)
            }
        };
        var x = function(t, n, r) {
            r.find(".slot").each(function() {
                e(this).remove()
            });
            n.transition = 0
        };
        var T = function(n, r) {
            n.find("img, .defaultimg").each(function(n) {
                var i = e(this);
                if (i.data("lazyload") != i.attr("src") && r < 3 && i.data("lazyload") != t && i.data("lazyload") != "undefined") {
                    if (i.data("lazyload") != t && i.data("lazyload") != "undefined") {
                        i.attr("src", i.data("lazyload"));
                        var s = new Image;
                        s.onload = function(e) {
                            i.data("lazydone", 1);
                            if (i.hasClass("defaultimg")) N(i, s)
                        };
                        s.error = function() {
                            i.data("lazydone", 1)
                        };
                        s.src = i.attr("src");
                        if (s.complete) {
                            if (i.hasClass("defaultimg")) N(i, s);
                            i.data("lazydone", 1)
                        }
                    }
                } else {
                    if ((i.data("lazyload") === t || i.data("lazyload") === "undefined") && i.data("lazydone") != 1) {
                        var s = new Image;
                        s.onload = function() {
                            if (i.hasClass("defaultimg")) N(i, s);
                            i.data("lazydone", 1)
                        };
                        s.error = function() {
                            i.data("lazydone", 1)
                        };
                        if (i.attr("src") != t && i.attr("src") != "undefined") {
                            s.src = i.attr("src")
                        } else s.src = i.data("src");
                        if (s.complete) {
                            if (i.hasClass("defaultimg")) {
                                N(i, s)
                            }
                            i.data("lazydone", 1)
                        }
                    }
                }
            })
        };
        var N = function(e, t) {
            var n = e.closest("li");
            var r = t.width;
            var i = t.height;
            n.data("owidth", r);
            n.data("oheight", i);
            n.find(".slotholder").data("owidth", r);
            n.find(".slotholder").data("oheight", i);
            n.data("loadeddone", 1)
        };
        var C = function(n, r, i) {
            T(n, 0);
            var s = setInterval(function() {
                i.bannertimeronpause = true;
                i.container.trigger("stoptimer");
                i.cd = 0;
                var o = 0;
                n.find("img, .defaultimg").each(function(t) {
                    if (e(this).data("lazydone") != 1) {
                        o++
                    }
                });
                if (o > 0) T(n, o);
                else {
                    clearInterval(s);
                    if (r != t) r()
                }
            }, 100)
        };
        var k = function(e, n) {
            try {
                var r = e.find(">ul:first-child >li:eq(" + n.act + ")")
            } catch (i) {
                var r = e.find(">ul:first-child >li:eq(1)")
            }
            n.lastslide = n.act;
            var s = e.find(">ul:first-child >li:eq(" + n.next + ")");
            var o = s.find(".defaultimg");
            n.bannertimeronpause = true;
            e.trigger("stoptimer");
            n.cd = 0;
            if (o.data("lazyload") != t && o.data("lazyload") != "undefined" && o.data("lazydone") != 1) {
                if (!f(8)) o.css({
                    backgroundImage: 'url("' + s.find(".defaultimg").data("lazyload") + '")'
                });
                else {
                    o.attr("src", s.find(".defaultimg").data("lazyload"))
                }
                o.data("src", s.find(".defaultimg").data("lazyload"));
                o.data("lazydone", 1);
                o.data("orgw", 0);
                s.data("loadeddone", 1);
                e.find(".tp-loader").css({
                    display: "block"
                });
                C(e.find(".tp-static-layers"), function() {
                    C(s, function() {
                        var t = s.find(".slotholder");
                        if (t.data("kenburns") == "on") {
                            var r = setInterval(function() {
                                var i = t.data("owidth");
                                if (i >= 0) {
                                    clearInterval(r);
                                    L(n, o, e)
                                }
                            }, 10)
                        } else L(n, o, e)
                    }, n)
                }, n)
            } else {
                if (s.data("loadeddone") === t) {
                    s.data("loadeddone", 1);
                    C(s, function() {
                        L(n, o, e)
                    }, n)
                } else L(n, o, e)
            }
        };
        var L = function(e, t, n) {
            e.bannertimeronpause = false;
            e.cd = 0;
            n.trigger("nulltimer");
            n.find(".tp-loader").css({
                display: "none"
            });
            y(t, e);
            m(n, e);
            y(t, e);
            A(n, e)
        };
        var A = function(e, n) {
            e.trigger("revolution.slide.onbeforeswap");
            n.transition = 1;
            n.videoplaying = false;
            try {
                var r = e.find(">ul:first-child >li:eq(" + n.act + ")")
            } catch (i) {
                var r = e.find(">ul:first-child >li:eq(1)")
            }
            n.lastslide = n.act;
            var s = e.find(">ul:first-child >li:eq(" + n.next + ")");
            setTimeout(function() {
                g(n)
            }, 200);
            var o = r.find(".slotholder");
            var u = s.find(".slotholder");
            if (u.data("kenburns") == "on" || o.data("kenburns") == "on") {
                tt(e, n);
                e.find(".kenburnimg").remove()
            }
            if (s.data("delay") != t) {
                n.cd = 0;
                n.delay = s.data("delay")
            } else {
                n.delay = n.origcd
            }
            if (n.firststart == 1) punchgs.TweenLite.set(r, {
                autoAlpha: 0
            });
            punchgs.TweenLite.set(r, {
                zIndex: 18
            });
            punchgs.TweenLite.set(s, {
                autoAlpha: 0,
                zIndex: 20
            });
            var a = 0;
            if (r.index() != s.index() && n.firststart != 1) {
                a = X(r, n)
            }
            if (r.data("saveperformance") != "on") a = 0;
            setTimeout(function() {
                e.trigger("restarttimer");
                O(e, n, s, r, o, u)
            }, a)
        };
        var O = function(n, r, i, s, o, u) {
            function T() {
                e.each(d, function(e, t) {
                    if (t[0] == h || t[8] == h) {
                        a = t[1];
                        p = t[2];
                        g = y
                    }
                    y = y + 1
                })
            }
            if (i.data("differentissplayed") == "prepared") {
                i.data("differentissplayed", "done");
                i.data("transition", i.data("savedtransition"));
                i.data("slotamount", i.data("savedslotamount"));
                i.data("masterspeed", i.data("savedmasterspeed"))
            }
            if (i.data("fstransition") != t && i.data("differentissplayed") != "done") {
                i.data("savedtransition", i.data("transition"));
                i.data("savedslotamount", i.data("slotamount"));
                i.data("savedmasterspeed", i.data("masterspeed"));
                i.data("transition", i.data("fstransition"));
                i.data("slotamount", i.data("fsslotamount"));
                i.data("masterspeed", i.data("fsmasterspeed"));
                i.data("differentissplayed", "prepared")
            }
            n.find(".active-revslide").removeClass(".active-revslide");
            i.addClass("active-revslide");
            if (i.data("transition") == t) i.data("transition", "random");
            var a = 0,
                l = i.data("transition").split(","),
                c = i.data("nexttransid") == t ? -1 : i.data("nexttransid");
            if (i.data("randomtransition") == "on") c = Math.round(Math.random() * l.length);
            else c = c + 1;
            if (c == l.length) c = 0;
            i.data("nexttransid", c);
            var h = l[c];
            if (r.ie) {
                if (h == "boxfade") h = "boxslide";
                if (h == "slotfade-vertical") h = "slotzoom-vertical";
                if (h == "slotfade-horizontal") h = "slotzoom-horizontal"
            }
            if (f(8)) {
                h = 11
            }
            var p = 0;
            if (r.parallax == "scroll" && r.parallaxFirstGo == t) {
                r.parallaxFirstGo = true;
                rt(n, r);
                setTimeout(function() {
                    rt(n, r)
                }, 210);
                setTimeout(function() {
                    rt(n, r)
                }, 420)
            }
            if (h == "boxslide" || h == "boxfade" || h == "papercut" || h == 0 || h == 1 || h == 16) h = 9;
            if (h == "slidehorizontal") {
                h = "slideleft";
                if (r.leftarrowpressed == 1) h = "slideright"
            }
            if (h == "slidevertical") {
                h = "slideup";
                if (r.leftarrowpressed == 1) h = "slidedown"
            }
            if (h == "parallaxhorizontal") {
                h = "parallaxtoleft";
                if (r.leftarrowpressed == 1) h = "parallaxtoright"
            }
            if (h == "parallaxvertical") {
                h = "parallaxtotop";
                if (r.leftarrowpressed == 1) h = "parallaxtobottom"
            }
            var d = [
                ["boxslide", 0, 1, 10, 0, "box", false, null, 0],
                ["boxfade", 1, 0, 10, 0, "box", false, null, 1],
                ["slotslide-horizontal", 2, 0, 0, 200, "horizontal", true, false, 2],
                ["slotslide-vertical", 3, 0, 0, 200, "vertical", true, false, 3],
                ["curtain-1", 4, 3, 0, 0, "horizontal", true, true, 4],
                ["curtain-2", 5, 3, 0, 0, "horizontal", true, true, 5],
                ["curtain-3", 6, 3, 25, 0, "horizontal", true, true, 6],
                ["slotzoom-horizontal", 7, 0, 0, 400, "horizontal", true, true, 7],
                ["slotzoom-vertical", 8, 0, 0, 0, "vertical", true, true, 8],
                ["slotfade-horizontal", 9, 0, 0, 500, "horizontal", true, null, 9],
                ["slotfade-vertical", 10, 0, 0, 500, "vertical", true, null, 10],
                ["fade", 11, 0, 1, 300, "horizontal", true, null, 11],
                ["slideleft", 12, 0, 1, 0, "horizontal", true, true, 12],
                ["slideup", 13, 0, 1, 0, "horizontal", true, true, 13],
                ["slidedown", 14, 0, 1, 0, "horizontal", true, true, 14],
                ["slideright", 15, 0, 1, 0, "horizontal", true, true, 15],
                ["papercut", 16, 0, 0, 600, "", null, null, 16],
                ["3dcurtain-horizontal", 17, 0, 20, 100, "vertical", false, true, 17],
                ["3dcurtain-vertical", 18, 0, 10, 100, "horizontal", false, true, 18],
                ["cubic", 19, 0, 20, 600, "horizontal", false, true, 19],
                ["cube", 19, 0, 20, 600, "horizontal", false, true, 20],
                ["flyin", 20, 0, 4, 600, "vertical", false, true, 21],
                ["turnoff", 21, 0, 1, 1600, "horizontal", false, true, 22],
                ["incube", 22, 0, 20, 200, "horizontal", false, true, 23],
                ["cubic-horizontal", 23, 0, 20, 500, "vertical", false, true, 24],
                ["cube-horizontal", 23, 0, 20, 500, "vertical", false, true, 25],
                ["incube-horizontal", 24, 0, 20, 500, "vertical", false, true, 26],
                ["turnoff-vertical", 25, 0, 1, 200, "horizontal", false, true, 27],
                ["fadefromright", 12, 1, 1, 0, "horizontal", true, true, 28],
                ["fadefromleft", 15, 1, 1, 0, "horizontal", true, true, 29],
                ["fadefromtop", 14, 1, 1, 0, "horizontal", true, true, 30],
                ["fadefrombottom", 13, 1, 1, 0, "horizontal", true, true, 31],
                ["fadetoleftfadefromright", 12, 2, 1, 0, "horizontal", true, true, 32],
                ["fadetorightfadetoleft", 15, 2, 1, 0, "horizontal", true, true, 33],
                ["fadetobottomfadefromtop", 14, 2, 1, 0, "horizontal", true, true, 34],
                ["fadetotopfadefrombottom", 13, 2, 1, 0, "horizontal", true, true, 35],
                ["parallaxtoright", 12, 3, 1, 0, "horizontal", true, true, 36],
                ["parallaxtoleft", 15, 3, 1, 0, "horizontal", true, true, 37],
                ["parallaxtotop", 14, 3, 1, 0, "horizontal", true, true, 38],
                ["parallaxtobottom", 13, 3, 1, 0, "horizontal", true, true, 39],
                ["scaledownfromright", 12, 4, 1, 0, "horizontal", true, true, 40],
                ["scaledownfromleft", 15, 4, 1, 0, "horizontal", true, true, 41],
                ["scaledownfromtop", 14, 4, 1, 0, "horizontal", true, true, 42],
                ["scaledownfrombottom", 13, 4, 1, 0, "horizontal", true, true, 43],
                ["zoomout", 13, 5, 1, 0, "horizontal", true, true, 44],
                ["zoomin", 13, 6, 1, 0, "horizontal", true, true, 45],
                ["notransition", 26, 0, 1, 0, "horizontal", true, null, 46]
            ];
            var v = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
            var m = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
            var a = 0;
            var p = 1;
            var g = 0;
            var y = 0;
            var b = new Array;
            if (u.data("kenburns") == "on") {
                if (h == "boxslide" || h == 0 || h == "boxfade" || h == 1 || h == "papercut" || h == 16) h = 11;
                Y(n, r, true, true)
            }
            if (h == "random") {
                h = Math.round(Math.random() * d.length - 1);
                if (h > d.length - 1) h = d.length - 1
            }
            if (h == "random-static") {
                h = Math.round(Math.random() * v.length - 1);
                if (h > v.length - 1) h = v.length - 1;
                h = v[h]
            }
            if (h == "random-premium") {
                h = Math.round(Math.random() * m.length - 1);
                if (h > m.length - 1) h = m.length - 1;
                h = m[h]
            }
            var S = [12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
            if (r.isJoomla == true && window.MooTools != t && S.indexOf(h) != -1) {
                var x = Math.round(Math.random() * (m.length - 2)) + 1;
                if (x > m.length - 1) x = m.length - 1;
                if (x == 0) x = 1;
                h = m[x]
            }
            T();
            if (f(8) && a > 15 && a < 28) {
                h = Math.round(Math.random() * v.length - 1);
                if (h > v.length - 1) h = v.length - 1;
                h = v[h];
                y = 0;
                T()
            }
            var N = -1;
            if (r.leftarrowpressed == 1 || r.act > r.next) N = 1;
            r.leftarrowpressed = 0;
            if (a > 26) a = 26;
            if (a < 0) a = 0;
            var C = 300;
            if (i.data("masterspeed") != t && i.data("masterspeed") > 99 && i.data("masterspeed") < 4001) C = i.data("masterspeed");
            b = d[g];
            n.parent().find(".bullet").each(function() {
                var t = e(this);
                t.removeClass("selected");
                if (r.navigationArrows == "withbullet" || r.navigationArrows == "nexttobullets") {
                    if (t.index() - 1 == r.next) t.addClass("selected")
                } else {
                    if (t.index() == r.next) t.addClass("selected")
                }
            });
            var k = new punchgs.TimelineLite({
                onComplete: function() {
                    M(n, r, u, o, i, s, k)
                }
            });
            k.add(punchgs.TweenLite.set(u.find(".defaultimg"), {
                opacity: 0
            }));
            k.pause();
            if (i.data("slotamount") == t || i.data("slotamount") < 1) {
                r.slots = Math.round(Math.random() * 12 + 4);
                if (h == "boxslide") r.slots = Math.round(Math.random() * 6 + 3);
                else if (h == "flyin") r.slots = Math.round(Math.random() * 4 + 1)
            } else {
                r.slots = i.data("slotamount")
            }
            if (i.data("rotate") == t) r.rotate = 0;
            else if (i.data("rotate") == 999) r.rotate = Math.round(Math.random() * 360);
            else r.rotate = i.data("rotate");
            if (!e.support.transition || r.ie || r.ie9) r.rotate = 0;
            if (r.firststart == 1) r.firststart = 0;
            C = C + b[4];
            if ((a == 4 || a == 5 || a == 6) && r.slots < 3) r.slots = 3;
            if (b[3] != 0) r.slots = Math.min(r.slots, b[3]);
            if (a == 9) r.slots = r.width / 20;
            if (a == 10) r.slots = r.height / 20;
            if (b[5] == "box") {
                if (b[7] != null) E(o, r, b[7]);
                if (b[6] != null) E(u, r, b[6])
            } else if (b[5] == "vertical" || b[5] == "horizontal") {
                if (b[7] != null) w(o, r, b[7], b[5]);
                if (b[6] != null) w(u, r, b[6], b[5])
            }
            if (a == 0) {
                var L = Math.ceil(r.height / r.sloth);
                var A = 0;
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    A = A + 1;
                    if (A == L) A = 0;
                    k.add(punchgs.TweenLite.from(n, C / 600, {
                        opacity: 0,
                        top: 0 - r.sloth,
                        left: 0 - r.slotw,
                        rotation: r.rotate,
                        force3D: "auto",
                        ease: punchgs.Power2.easeOut
                    }), (t * 15 + A * 30) / 1500)
                })
            }
            if (a == 1) {
                var O, _ = 0;
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    rand = Math.random() * C + 300;
                    rand2 = Math.random() * 500 + 200;
                    if (rand + rand2 > O) {
                        O = rand2 + rand2;
                        _ = t
                    }
                    k.add(punchgs.TweenLite.from(n, rand / 1e3, {
                        autoAlpha: 0,
                        force3D: "auto",
                        rotation: r.rotate,
                        ease: punchgs.Power2.easeInOut
                    }), rand2 / 1e3)
                })
            }
            if (a == 2) {
                var D = new punchgs.TimelineLite;
                o.find(".slotslide").each(function() {
                    var t = e(this);
                    D.add(punchgs.TweenLite.to(t, C / 1e3, {
                        left: r.slotw,
                        force3D: "auto",
                        rotation: 0 - r.rotate
                    }), 0);
                    k.add(D, 0)
                });
                u.find(".slotslide").each(function() {
                    var t = e(this);
                    D.add(punchgs.TweenLite.from(t, C / 1e3, {
                        left: 0 - r.slotw,
                        force3D: "auto",
                        rotation: r.rotate
                    }), 0);
                    k.add(D, 0)
                })
            }
            if (a == 3) {
                var D = new punchgs.TimelineLite;
                o.find(".slotslide").each(function() {
                    var t = e(this);
                    D.add(punchgs.TweenLite.to(t, C / 1e3, {
                        top: r.sloth,
                        rotation: r.rotate,
                        force3D: "auto",
                        transformPerspective: 600
                    }), 0);
                    k.add(D, 0)
                });
                u.find(".slotslide").each(function() {
                    var t = e(this);
                    D.add(punchgs.TweenLite.from(t, C / 1e3, {
                        top: 0 - r.sloth,
                        rotation: r.rotate,
                        ease: punchgs.Power2.easeOut,
                        force3D: "auto",
                        transformPerspective: 600
                    }), 0);
                    k.add(D, 0)
                })
            }
            if (a == 4 || a == 5) {
                setTimeout(function() {
                    o.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var P = C / 1e3,
                    H = P,
                    D = new punchgs.TimelineLite;
                o.find(".slotslide").each(function(t) {
                    var n = e(this);
                    var i = t * P / r.slots;
                    if (a == 5) i = (r.slots - t - 1) * P / r.slots / 1.5;
                    D.add(punchgs.TweenLite.to(n, P * 3, {
                        transformPerspective: 600,
                        force3D: "auto",
                        top: 0 + r.height,
                        opacity: .5,
                        rotation: r.rotate,
                        ease: punchgs.Power2.easeInOut,
                        delay: i
                    }), 0);
                    k.add(D, 0)
                });
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    var i = t * P / r.slots;
                    if (a == 5) i = (r.slots - t - 1) * P / r.slots / 1.5;
                    D.add(punchgs.TweenLite.from(n, P * 3, {
                        top: 0 - r.height,
                        opacity: .5,
                        rotation: r.rotate,
                        force3D: "auto",
                        ease: punchgs.Power2.easeInOut,
                        delay: i
                    }), 0);
                    k.add(D, 0)
                })
            }
            if (a == 6) {
                if (r.slots < 2) r.slots = 2;
                if (r.slots % 2) r.slots = r.slots + 1;
                var D = new punchgs.TimelineLite;
                setTimeout(function() {
                    o.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                o.find(".slotslide").each(function(t) {
                    var n = e(this);
                    if (t + 1 < r.slots / 2) var i = (t + 2) * 90;
                    else var i = (2 + r.slots - t) * 90;
                    D.add(punchgs.TweenLite.to(n, (C + i) / 1e3, {
                        top: 0 + r.height,
                        opacity: 1,
                        force3D: "auto",
                        rotation: r.rotate,
                        ease: punchgs.Power2.easeInOut
                    }), 0);
                    k.add(D, 0)
                });
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    if (t + 1 < r.slots / 2) var i = (t + 2) * 90;
                    else var i = (2 + r.slots - t) * 90;
                    D.add(punchgs.TweenLite.from(n, (C + i) / 1e3, {
                        top: 0 - r.height,
                        opacity: 1,
                        force3D: "auto",
                        rotation: r.rotate,
                        ease: punchgs.Power2.easeInOut
                    }), 0);
                    k.add(D, 0)
                })
            }
            if (a == 7) {
                C = C * 2;
                var D = new punchgs.TimelineLite;
                setTimeout(function() {
                    o.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                o.find(".slotslide").each(function() {
                    var t = e(this).find("div");
                    D.add(punchgs.TweenLite.to(t, C / 1e3, {
                        left: 0 - r.slotw / 2 + "px",
                        top: 0 - r.height / 2 + "px",
                        width: r.slotw * 2 + "px",
                        height: r.height * 2 + "px",
                        opacity: 0,
                        rotation: r.rotate,
                        force3D: "auto",
                        ease: punchgs.Power2.easeOut
                    }), 0);
                    k.add(D, 0)
                });
                u.find(".slotslide").each(function(t) {
                    var n = e(this).find("div");
                    D.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        left: 0,
                        top: 0,
                        opacity: 0,
                        transformPerspective: 600
                    }, {
                        left: 0 - t * r.slotw + "px",
                        ease: punchgs.Power2.easeOut,
                        force3D: "auto",
                        top: 0 + "px",
                        width: r.width,
                        height: r.height,
                        opacity: 1,
                        rotation: 0,
                        delay: .1
                    }), 0);
                    k.add(D, 0)
                })
            }
            if (a == 8) {
                C = C * 3;
                var D = new punchgs.TimelineLite;
                o.find(".slotslide").each(function() {
                    var t = e(this).find("div");
                    D.add(punchgs.TweenLite.to(t, C / 1e3, {
                        left: 0 - r.width / 2 + "px",
                        top: 0 - r.sloth / 2 + "px",
                        width: r.width * 2 + "px",
                        height: r.sloth * 2 + "px",
                        force3D: "auto",
                        opacity: 0,
                        rotation: r.rotate
                    }), 0);
                    k.add(D, 0)
                });
                u.find(".slotslide").each(function(t) {
                    var n = e(this).find("div");
                    D.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        left: 0,
                        top: 0,
                        opacity: 0,
                        force3D: "auto"
                    }, {
                        left: 0 + "px",
                        top: 0 - t * r.sloth + "px",
                        width: u.find(".defaultimg").data("neww") + "px",
                        height: u.find(".defaultimg").data("newh") + "px",
                        opacity: 1,
                        rotation: 0
                    }), 0);
                    k.add(D, 0)
                })
            }
            if (a == 9 || a == 10) {
                var B = 0;
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    B++;
                    k.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        autoAlpha: 0,
                        force3D: "auto",
                        transformPerspective: 600
                    }, {
                        autoAlpha: 1,
                        ease: punchgs.Power2.easeInOut,
                        delay: t * 5 / 1e3
                    }), 0)
                })
            }
            if (a == 11 || a == 26) {
                var B = 0;
                if (a == 26) C = 0;
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    k.add(punchgs.TweenLite.from(n, C / 1e3, {
                        autoAlpha: 0,
                        force3D: "auto",
                        ease: punchgs.Power2.easeInOut
                    }), 0)
                })
            }
            if (a == 12 || a == 13 || a == 14 || a == 15) {
                C = 1e3;
                setTimeout(function() {
                    punchgs.TweenLite.set(o.find(".defaultimg"), {
                        autoAlpha: 0
                    })
                }, 100);
                var j = r.width;
                var F = r.height;
                var q = u.find(".slotslide");
                if (r.fullWidth == "on" || r.fullScreen == "on") {
                    j = q.width();
                    F = q.height()
                }
                var R = 0;
                var U = 0;
                if (a == 12) R = j;
                else if (a == 15) R = 0 - j;
                else if (a == 13) U = F;
                else if (a == 14) U = 0 - F;
                var z = 1;
                var W = 1;
                var X = 1;
                var V = punchgs.Power2.easeInOut;
                var $ = punchgs.Power2.easeInOut;
                var J = C / 1e3;
                var K = J;
                if (p == 1) z = 0;
                if (p == 2) z = 0;
                if (p == 3) {
                    V = punchgs.Power2.easeInOut;
                    $ = punchgs.Power1.easeInOut;
                    J = C / 1200
                }
                if (p == 4 || p == 5) W = .6;
                if (p == 6) W = 1.4;
                if (p == 5 || p == 6) {
                    X = 1.4;
                    z = 0;
                    j = 0;
                    F = 0;
                    R = 0;
                    U = 0
                }
                if (p == 6) X = .6;
                var Q = 0;
                k.add(punchgs.TweenLite.from(q, J, {
                    left: R,
                    top: U,
                    scale: X,
                    opacity: z,
                    rotation: r.rotate,
                    ease: $,
                    force3D: "auto"
                }), 0);
                var G = o.find(".slotslide");
                if (p == 4 || p == 5) {
                    j = 0;
                    F = 0
                }
                if (p != 1) {
                    if (a == 12) k.add(punchgs.TweenLite.to(G, K, {
                        left: 0 - j + "px",
                        force3D: "auto",
                        scale: W,
                        opacity: z,
                        rotation: r.rotate,
                        ease: V
                    }), 0);
                    else if (a == 15) k.add(punchgs.TweenLite.to(G, K, {
                        left: j + "px",
                        force3D: "auto",
                        scale: W,
                        opacity: z,
                        rotation: r.rotate,
                        ease: V
                    }), 0);
                    else if (a == 13) k.add(punchgs.TweenLite.to(G, K, {
                        top: 0 - F + "px",
                        force3D: "auto",
                        scale: W,
                        opacity: z,
                        rotation: r.rotate,
                        ease: V
                    }), 0);
                    else if (a == 14) k.add(punchgs.TweenLite.to(G, K, {
                        top: F + "px",
                        force3D: "auto",
                        scale: W,
                        opacity: z,
                        rotation: r.rotate,
                        ease: V
                    }), 0)
                }
            }
            if (a == 16) {
                var D = new punchgs.TimelineLite;
                k.add(punchgs.TweenLite.set(s, {
                    position: "absolute",
                    "z-index": 20
                }), 0);
                k.add(punchgs.TweenLite.set(i, {
                    position: "absolute",
                    "z-index": 15
                }), 0);
                s.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>');
                s.find(".tp-half-one").clone(true).appendTo(s).addClass("tp-half-two");
                s.find(".tp-half-two").removeClass("tp-half-one");
                var j = r.width;
                var F = r.height;
                if (r.autoHeight == "on") F = n.height();
                s.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:' + j + "px;height:" + F + 'px;"></div>');
                s.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:' + j + "px;height:" + F + 'px;"></div>');
                s.find(".tp-half-two .defaultimg").css({
                    position: "absolute",
                    top: "-50%"
                });
                s.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>');
                k.add(punchgs.TweenLite.set(s.find(".tp-half-two"), {
                    width: j,
                    height: F,
                    overflow: "hidden",
                    zIndex: 15,
                    position: "absolute",
                    top: F / 2,
                    left: "0px",
                    transformPerspective: 600,
                    transformOrigin: "center bottom"
                }), 0);
                k.add(punchgs.TweenLite.set(s.find(".tp-half-one"), {
                    width: j,
                    height: F / 2,
                    overflow: "visible",
                    zIndex: 10,
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    transformPerspective: 600,
                    transformOrigin: "center top"
                }), 0);
                var Z = s.find(".defaultimg");
                var et = Math.round(Math.random() * 20 - 10),
                    tt = Math.round(Math.random() * 20 - 10),
                    nt = Math.round(Math.random() * 20 - 10),
                    it = Math.random() * .4 - .2,
                    st = Math.random() * .4 - .2,
                    ot = Math.random() * 1 + 1,
                    ut = Math.random() * 1 + 1,
                    at = Math.random() * .3 + .3;
                k.add(punchgs.TweenLite.set(s.find(".tp-half-one"), {
                    overflow: "hidden"
                }), 0);
                k.add(punchgs.TweenLite.fromTo(s.find(".tp-half-one"), C / 800, {
                    width: j,
                    height: F / 2,
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    force3D: "auto",
                    transformOrigin: "center top"
                }, {
                    scale: ot,
                    rotation: et,
                    y: 0 - F - F / 4,
                    autoAlpha: 0,
                    ease: punchgs.Power2.easeInOut
                }), 0);
                k.add(punchgs.TweenLite.fromTo(s.find(".tp-half-two"), C / 800, {
                    width: j,
                    height: F,
                    overflow: "hidden",
                    position: "absolute",
                    top: F / 2,
                    left: "0px",
                    force3D: "auto",
                    transformOrigin: "center bottom"
                }, {
                    scale: ut,
                    rotation: tt,
                    y: F + F / 4,
                    ease: punchgs.Power2.easeInOut,
                    autoAlpha: 0,
                    onComplete: function() {
                        punchgs.TweenLite.set(s, {
                            position: "absolute",
                            "z-index": 15
                        });
                        punchgs.TweenLite.set(i, {
                            position: "absolute",
                            "z-index": 20
                        });
                        if (s.find(".tp-half-one").length > 0) {
                            s.find(".tp-half-one .defaultimg").unwrap();
                            s.find(".tp-half-one .slotholder").unwrap()
                        }
                        s.find(".tp-half-two").remove()
                    }
                }), 0);
                D.add(punchgs.TweenLite.set(u.find(".defaultimg"), {
                    autoAlpha: 1
                }), 0);
                if (s.html() != null) k.add(punchgs.TweenLite.fromTo(i, (C - 200) / 1e3, {
                    scale: at,
                    x: r.width / 4 * it,
                    y: F / 4 * st,
                    rotation: nt,
                    force3D: "auto",
                    transformOrigin: "center center",
                    ease: punchgs.Power2.easeOut
                }, {
                    autoAlpha: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotation: 0
                }), 0);
                k.add(D, 0)
            }
            if (a == 17) {
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    k.add(punchgs.TweenLite.fromTo(n, C / 800, {
                        opacity: 0,
                        rotationY: 0,
                        scale: .9,
                        rotationX: -110,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: "center center"
                    }, {
                        opacity: 1,
                        top: 0,
                        left: 0,
                        scale: 1,
                        rotation: 0,
                        rotationX: 0,
                        force3D: "auto",
                        rotationY: 0,
                        ease: punchgs.Power3.easeOut,
                        delay: t * .06
                    }), 0)
                })
            }
            if (a == 18) {
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    k.add(punchgs.TweenLite.fromTo(n, C / 500, {
                        autoAlpha: 0,
                        rotationY: 310,
                        scale: .9,
                        rotationX: 10,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: "center center"
                    }, {
                        autoAlpha: 1,
                        top: 0,
                        left: 0,
                        scale: 1,
                        rotation: 0,
                        rotationX: 0,
                        force3D: "auto",
                        rotationY: 0,
                        ease: punchgs.Power3.easeOut,
                        delay: t * .06
                    }), 0)
                })
            }
            if (a == 19 || a == 22) {
                var D = new punchgs.TimelineLite;
                k.add(punchgs.TweenLite.set(s, {
                    zIndex: 20
                }), 0);
                k.add(punchgs.TweenLite.set(i, {
                    zIndex: 20
                }), 0);
                setTimeout(function() {
                    o.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var ft = i.css("z-index"),
                    lt = s.css("z-index"),
                    ct = 90,
                    z = 1;
                if (N == 1) ct = -90;
                if (a == 19) {
                    var ht = "center center -" + r.height / 2;
                    z = 0
                } else {
                    var ht = "center center " + r.height / 2
                }
                punchgs.TweenLite.set(n, {
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    transformPerspective: 600
                });
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    D.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        transformStyle: "flat",
                        backfaceVisibility: "hidden",
                        left: 0,
                        rotationY: r.rotate,
                        z: 10,
                        top: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: ht,
                        rotationX: ct
                    }, {
                        left: 0,
                        rotationY: 0,
                        top: 0,
                        z: 0,
                        scale: 1,
                        force3D: "auto",
                        rotationX: 0,
                        delay: t * 50 / 1e3,
                        ease: punchgs.Power2.easeInOut
                    }), 0);
                    D.add(punchgs.TweenLite.to(n, .1, {
                        autoAlpha: 1,
                        delay: t * 50 / 1e3
                    }), 0);
                    k.add(D)
                });
                o.find(".slotslide").each(function(t) {
                    var n = e(this);
                    var i = -90;
                    if (N == 1) i = 90;
                    D.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        transformStyle: "flat",
                        backfaceVisibility: "hidden",
                        autoAlpha: 1,
                        rotationY: 0,
                        top: 0,
                        z: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: ht,
                        rotationX: 0
                    }, {
                        autoAlpha: 1,
                        rotationY: r.rotate,
                        top: 0,
                        z: 10,
                        scale: 1,
                        rotationX: i,
                        delay: t * 50 / 1e3,
                        force3D: "auto",
                        ease: punchgs.Power2.easeInOut
                    }), 0);
                    k.add(D)
                })
            }
            if (a == 20) {
                setTimeout(function() {
                    o.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var ft = i.css("z-index");
                var lt = s.css("z-index");
                if (N == 1) {
                    var pt = -r.width;
                    var ct = 70;
                    var ht = "left center -" + r.height / 2
                } else {
                    var pt = r.width;
                    var ct = -70;
                    var ht = "right center -" + r.height / 2
                }
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    k.add(punchgs.TweenLite.fromTo(n, C / 1500, {
                        left: pt,
                        rotationX: 40,
                        z: -600,
                        opacity: z,
                        top: 0,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: ht,
                        rotationY: ct
                    }, {
                        left: 0,
                        delay: t * 50 / 1e3,
                        ease: punchgs.Power2.easeInOut
                    }), 0);
                    k.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        rotationX: 40,
                        z: -600,
                        opacity: z,
                        top: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: ht,
                        rotationY: ct
                    }, {
                        rotationX: 0,
                        opacity: 1,
                        top: 0,
                        z: 0,
                        scale: 1,
                        rotationY: 0,
                        delay: t * 50 / 1e3,
                        ease: punchgs.Power2.easeInOut
                    }), 0);
                    k.add(punchgs.TweenLite.to(n, .1, {
                        opacity: 1,
                        force3D: "auto",
                        delay: t * 50 / 1e3 + C / 2e3
                    }), 0)
                });
                o.find(".slotslide").each(function(t) {
                    var n = e(this);
                    if (N != 1) {
                        var i = -r.width;
                        var s = 70;
                        var o = "left center -" + r.height / 2
                    } else {
                        var i = r.width;
                        var s = -70;
                        var o = "right center -" + r.height / 2
                    }
                    k.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        opacity: 1,
                        rotationX: 0,
                        top: 0,
                        z: 0,
                        scale: 1,
                        left: 0,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: o,
                        rotationY: 0
                    }, {
                        opacity: 1,
                        rotationX: 40,
                        top: 0,
                        z: -600,
                        left: i,
                        force3D: "auto",
                        scale: .8,
                        rotationY: s,
                        delay: t * 50 / 1e3,
                        ease: punchgs.Power2.easeInOut
                    }), 0);
                    k.add(punchgs.TweenLite.to(n, .1, {
                        force3D: "auto",
                        opacity: 0,
                        delay: t * 50 / 1e3 + (C / 1e3 - C / 1e4)
                    }), 0)
                })
            }
            if (a == 21 || a == 25) {
                setTimeout(function() {
                    o.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var ft = i.css("z-index");
                var lt = s.css("z-index");
                if (N == 1) {
                    var pt = -r.width;
                    var ct = 90;
                    if (a == 25) {
                        var ht = "center top 0";
                        rot2 = -ct;
                        ct = r.rotate
                    } else {
                        var ht = "left center 0";
                        rot2 = r.rotate
                    }
                } else {
                    var pt = r.width;
                    var ct = -90;
                    if (a == 25) {
                        var ht = "center bottom 0";
                        rot2 = -ct;
                        ct = r.rotate
                    } else {
                        var ht = "right center 0";
                        rot2 = r.rotate
                    }
                }
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    k.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        left: 0,
                        transformStyle: "flat",
                        rotationX: rot2,
                        z: 0,
                        autoAlpha: 0,
                        top: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: ht,
                        rotationY: ct
                    }, {
                        left: 0,
                        rotationX: 0,
                        top: 0,
                        z: 0,
                        autoAlpha: 1,
                        scale: 1,
                        rotationY: 0,
                        force3D: "auto",
                        ease: punchgs.Power3.easeInOut
                    }), 0)
                });
                if (N != 1) {
                    var pt = -r.width;
                    var ct = 90;
                    if (a == 25) {
                        var ht = "center top 0";
                        rot2 = -ct;
                        ct = r.rotate
                    } else {
                        var ht = "left center 0";
                        rot2 = r.rotate
                    }
                } else {
                    var pt = r.width;
                    var ct = -90;
                    if (a == 25) {
                        var ht = "center bottom 0";
                        rot2 = -ct;
                        ct = r.rotate
                    } else {
                        var ht = "right center 0";
                        rot2 = r.rotate
                    }
                }
                o.find(".slotslide").each(function(t) {
                    var n = e(this);
                    k.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        left: 0,
                        transformStyle: "flat",
                        rotationX: 0,
                        z: 0,
                        autoAlpha: 1,
                        top: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: ht,
                        rotationY: 0
                    }, {
                        left: 0,
                        rotationX: rot2,
                        top: 0,
                        z: 0,
                        autoAlpha: 1,
                        force3D: "auto",
                        scale: 1,
                        rotationY: ct,
                        ease: punchgs.Power1.easeInOut
                    }), 0)
                })
            }
            if (a == 23 || a == 24) {
                setTimeout(function() {
                    o.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var ft = i.css("z-index");
                var lt = s.css("z-index");
                var ct = -90;
                if (N == 1) ct = 90;
                var z = 1;
                if (a == 23) {
                    var ht = "center center -" + r.width / 2;
                    z = 0
                } else {
                    var ht = "center center " + r.width / 2
                }
                var dt = 0;
                punchgs.TweenLite.set(n, {
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    perspective: 2500
                });
                u.find(".slotslide").each(function(t) {
                    var n = e(this);
                    k.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        left: dt,
                        rotationX: r.rotate,
                        force3D: "auto",
                        opacity: z,
                        top: 0,
                        scale: 1,
                        transformPerspective: 600,
                        transformOrigin: ht,
                        rotationY: ct
                    }, {
                        left: 0,
                        rotationX: 0,
                        autoAlpha: 1,
                        top: 0,
                        z: 0,
                        scale: 1,
                        rotationY: 0,
                        delay: t * 50 / 500,
                        ease: punchgs.Power2.easeInOut
                    }), 0)
                });
                ct = 90;
                if (N == 1) ct = -90;
                o.find(".slotslide").each(function(t) {
                    var n = e(this);
                    k.add(punchgs.TweenLite.fromTo(n, C / 1e3, {
                        left: 0,
                        autoAlpha: 1,
                        rotationX: 0,
                        top: 0,
                        z: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: ht,
                        rotationY: 0
                    }, {
                        left: dt,
                        autoAlpha: 1,
                        rotationX: r.rotate,
                        top: 0,
                        scale: 1,
                        rotationY: ct,
                        delay: t * 50 / 500,
                        ease: punchgs.Power2.easeInOut
                    }), 0)
                })
            }
            k.pause();
            I(i, r, null, k);
            punchgs.TweenLite.to(i, .001, {
                autoAlpha: 1
            });
            var vt = {};
            vt.slideIndex = r.next + 1;
            vt.slide = i;
            n.trigger("revolution.slide.onchange", vt);
            setTimeout(function() {
                n.trigger("revolution.slide.onafterswap")
            }, C);
            n.trigger("revolution.slide.onvideostop")
        };
        var M = function(e, t, n, r, i, s, o) {
            punchgs.TweenLite.to(n.find(".defaultimg"), .001, {
                autoAlpha: 1,
                onComplete: function() {
                    x(e, t, i)
                }
            });
            if (i.index() != s.index()) {
                punchgs.TweenLite.to(s, .2, {
                    autoAlpha: 0,
                    onComplete: function() {
                        x(e, t, s)
                    }
                })
            }
            t.act = t.next;
            if (t.navigationType == "thumb") st(e);
            if (n.data("kenburns") == "on") {
                Y(e, t)
            }
            e.find(".current-sr-slide-visible").removeClass("current-sr-slide-visible");
            i.addClass("current-sr-slide-visible");
            if (t.parallax == "scroll" || t.parallax == "scroll+mouse" || t.parallax == "mouse+scroll") {
                rt(e, t)
            }
            o.clear()
        };
        var _ = function(t) {
            var n = t.target.getVideoEmbedCode();
            var r = e("#" + n.split('id="')[1].split('"')[0]);
            var i = r.closest(".tp-simpleresponsive");
            var s = r.parent().data("player");
            if (t.data == YT.PlayerState.PLAYING) {
                var o = i.find(".tp-bannertimer");
                var u = o.data("opt");
                if (r.closest(".tp-caption").data("volume") == "mute") s.mute();
                u.videoplaying = true;
                i.trigger("stoptimer");
                i.trigger("revolution.slide.onvideoplay")
            } else {
                var o = i.find(".tp-bannertimer");
                var u = o.data("opt");
                if (t.data != -1 && t.data != 3) {
                    u.videoplaying = false;
                    i.trigger("starttimer");
                    i.trigger("revolution.slide.onvideostop")
                }
                if (t.data == 0 && u.nextslideatend == true) u.container.revnext();
                else {
                    u.videoplaying = false;
                    i.trigger("starttimer");
                    i.trigger("revolution.slide.onvideostop")
                }
            }
        };
        var D = function(e, t, n) {
            if (e.addEventListener) e.addEventListener(t, n, false);
            else e.attachEvent(t, n, false)
        };
        var P = function(t, n) {
            var r = $f(t),
                i = e("#" + t),
                s = i.closest(".tp-simpleresponsive"),
                o = i.closest(".tp-caption");
            setTimeout(function() {
                r.addEvent("ready", function(t) {
                    if (n) r.api("play");
                    r.addEvent("play", function(e) {
                        var t = s.find(".tp-bannertimer");
                        var n = t.data("opt");
                        n.videoplaying = true;
                        s.trigger("stoptimer");
                        if (o.data("volume") == "mute") r.api("setVolume", "0")
                    });
                    r.addEvent("finish", function(e) {
                        var t = s.find(".tp-bannertimer");
                        var n = t.data("opt");
                        n.videoplaying = false;
                        s.trigger("starttimer");
                        s.trigger("revolution.slide.onvideoplay");
                        if (n.nextslideatend == true) n.container.revnext()
                    });
                    r.addEvent("pause", function(e) {
                        var t = s.find(".tp-bannertimer");
                        var n = t.data("opt");
                        n.videoplaying = false;
                        s.trigger("starttimer");
                        s.trigger("revolution.slide.onvideostop")
                    });
                    o.find(".tp-thumb-image").click(function() {
                        punchgs.TweenLite.to(e(this), .3, {
                            autoAlpha: 0,
                            force3D: "auto",
                            ease: punchgs.Power3.easeInOut
                        });
                        r.api("play")
                    })
                })
            }, 150)
        };
        var H = function(e, n) {
            var r = n.width();
            var i = n.height();
            var s = e.data("mediaAspect");
            if (s == t) s = 1;
            var o = r / i;
            e.css({
                position: "absolute"
            });
            var u = e.find("video");
            if (o < s) {
                punchgs.TweenLite.to(e, 1e-4, {
                    width: i * s,
                    force3D: "auto",
                    top: 0,
                    left: 0 - (i * s - r) / 2,
                    height: i
                })
            } else {
                punchgs.TweenLite.to(e, 1e-4, {
                    width: r,
                    force3D: "auto",
                    top: 0 - (r / s - i) / 2,
                    left: 0,
                    height: r / s
                })
            }
        };
        var B = function() {
            var e = new Object;
            e.x = 0;
            e.y = 0;
            e.rotationX = 0;
            e.rotationY = 0;
            e.rotationZ = 0;
            e.scale = 1;
            e.scaleX = 1;
            e.scaleY = 1;
            e.skewX = 0;
            e.skewY = 0;
            e.opacity = 0;
            e.transformOrigin = "center, center";
            e.transformPerspective = 400;
            e.rotation = 0;
            return e
        };
        var j = function(t, n) {
            var r = n.split(";");
            e.each(r, function(e, n) {
                n = n.split(":");
                var r = n[0],
                    i = n[1];
                if (r == "rotationX") t.rotationX = parseInt(i, 0);
                if (r == "rotationY") t.rotationY = parseInt(i, 0);
                if (r == "rotationZ") t.rotationZ = parseInt(i, 0);
                if (r == "rotationZ") t.rotation = parseInt(i, 0);
                if (r == "scaleX") t.scaleX = parseFloat(i);
                if (r == "scaleY") t.scaleY = parseFloat(i);
                if (r == "opacity") t.opacity = parseFloat(i);
                if (r == "skewX") t.skewX = parseInt(i, 0);
                if (r == "skewY") t.skewY = parseInt(i, 0);
                if (r == "x") t.x = parseInt(i, 0);
                if (r == "y") t.y = parseInt(i, 0);
                if (r == "z") t.z = parseInt(i, 0);
                if (r == "transformOrigin") t.transformOrigin = i.toString();
                if (r == "transformPerspective") t.transformPerspective = parseInt(i, 0)
            });
            return t
        };
        var F = function(t) {
            var n = t.split("animation:");
            var r = new Object;
            r.animation = j(B(), n[1]);
            var i = n[0].split(";");
            e.each(i, function(e, t) {
                t = t.split(":");
                var n = t[0],
                    i = t[1];
                if (n == "typ") r.typ = i;
                if (n == "speed") r.speed = parseInt(i, 0) / 1e3;
                if (n == "start") r.start = parseInt(i, 0) / 1e3;
                if (n == "elementdelay") r.elementdelay = parseFloat(i);
                if (n == "ease") r.ease = i
            });
            return r
        };
        var I = function(n, r, i, s) {
            if (n.data("ctl") == t) {
                n.data("ctl", new punchgs.TimelineLite)
            }
            var o = n.data("ctl"),
                u = 0,
                a = 0,
                f = n.find(".tp-caption"),
                l = r.container.find(".tp-static-layers").find(".tp-caption");
            o.pause();
            e.each(l, function(e, t) {
                f.push(t)
            });
            f.each(function(n) {
                var s = i,
                    o = -1,
                    f = e(this);
                if (f.hasClass("tp-static-layer")) {
                    var l = f.data("startslide"),
                        c = f.data("endslide");
                    if (l == -1 || l == "-1") f.data("startslide", 0);
                    if (c == -1 || c == "-1") f.data("endslide", r.slideamount);
                    if (l == 0 && c == r.slideamount - 1) f.data("endslide", r.slideamount + 1);
                    l = f.data("startslide"), c = f.data("endslide");
                    if (!f.hasClass("tp-is-shown")) {
                        if (l <= r.next && c >= r.next || l == r.next || c == r.next) {
                            f.addClass("tp-is-shown");
                            o = 1
                        } else {
                            o = 0
                        }
                    } else {
                        if (c == r.next || l > r.next || c < r.next) {
                            o = 2
                        } else {
                            o = 0
                        }
                    }
                }
                u = r.width / 2 - r.startwidth * r.bw / 2;
                var h = r.bw;
                var p = r.bh;
                if (r.fullScreen == "on") a = r.height / 2 - r.startheight * r.bh / 2;
                if (r.autoHeight == "on" || r.minHeight != t && r.minHeight > 0) a = r.container.height() / 2 - r.startheight * r.bh / 2;
                if (a < 0) a = 0;
                var d = 0;
                if (r.width < r.hideCaptionAtLimit && f.data("captionhidden") == "on") {
                    f.addClass("tp-hidden-caption");
                    d = 1
                } else {
                    if (r.width < r.hideAllCaptionAtLimit || r.width < r.hideAllCaptionAtLilmit) {
                        f.addClass("tp-hidden-caption");
                        d = 1
                    } else {
                        f.removeClass("tp-hidden-caption")
                    }
                }
                if (d == 0) {
                    if (f.data("linktoslide") != t && !f.hasClass("hasclicklistener")) {
                        f.addClass("hasclicklistener");
                        f.css({
                            cursor: "pointer"
                        });
                        if (f.data("linktoslide") != "no") {
                            f.click(function() {
                                var t = e(this);
                                var n = t.data("linktoslide");
                                if (n != "next" && n != "prev") {
                                    r.container.data("showus", n);
                                    r.container.parent().find(".tp-rightarrow").click()
                                } else if (n == "next") r.container.parent().find(".tp-rightarrow").click();
                                else if (n == "prev") r.container.parent().find(".tp-leftarrow").click()
                            })
                        }
                    }
                    if (u < 0) u = 0;
                    if (f.hasClass("tp-videolayer") || f.find("iframe").length > 0 || f.find("video").length > 0) {
                        var v = "iframe" + Math.round(Math.random() * 1e5 + 1),
                            m = f.data("videowidth"),
                            g = f.data("videoheight"),
                            y = f.data("videoattributes"),
                            b = f.data("ytid"),
                            w = f.data("vimeoid"),
                            E = f.data("videpreload"),
                            S = f.data("videomp4"),
                            x = f.data("videowebm"),
                            T = f.data("videocontrols"),
                            N = "http",
                            C = f.data("videoloop") == "loop" ? "loop" : f.data("videoloop") == "loopandnoslidestop" ? "loop" : "";
                        if (f.data("thumbimage") != t && f.data("videoposter") == t) f.data("videoposter", f.data("thumbimage"));
                        if (b != t && String(b).length > 1 && f.find("iframe").length == 0) {
                            N = "https";
                            if (T == "none") {
                                y = y.replace("controls=1", "controls=0");
                                if (y.toLowerCase().indexOf("controls") == -1) y = y + "&controls=0"
                            }
                            f.append('<iframe style="visible:hidden" src="' + N + "://www.youtube.com/embed/" + b + "?" + y + '" width="' + m + '" height="' + g + '" style="width:' + m + "px;height:" + g + 'px"></iframe>')
                        }
                        if (w != t && String(w).length > 1 && f.find("iframe").length == 0) {
                            f.append('<iframe style="visible:hidden" src="' + N + "://player.vimeo.com/video/" + w + "?" + y + '" width="' + m + '" height="' + g + '" style="width:' + m + "px;height:" + g + 'px"></iframe>')
                        }
                        if ((S != t || x != t) && f.find("video").length == 0) {
                            if (T != "controls") T = "";
                            f.append('<video style="visible:hidden" class="" ' + C + " " + T + ' preload="' + E + '" width="' + m + '" height="' + g + '"' + 'poster="' + f.data("videoposter") + '">' + '<source src="' + S + '" type="video/mp4"" />' + '<source src="' + x + '" type="video/webm"" />' + "</video>")
                        }
                        var k = false;
                        if (f.data("autoplayonlyfirsttime") == true || f.data("autoplayonlyfirsttime") == "true" || f.data("autoplay") == true) {
                            f.data("autoplay", true);
                            k = true
                        }
                        f.find("iframe").each(function() {
                            var n = e(this);
                            punchgs.TweenLite.to(n, .1, {
                                autoAlpha: 1,
                                zIndex: 0,
                                transformStyle: "preserve-3d",
                                z: 0,
                                rotationX: 0,
                                force3D: "auto"
                            });
                            if (Q()) {
                                var i = n.attr("src");
                                n.attr("src", "");
                                n.attr("src", i)
                            }
                            r.nextslideatend = f.data("nextslideatend");
                            if (f.data("videoposter") != t && f.data("videoposter").length > 2 && f.data("autoplay") != true && !s) {
                                if (f.find(".tp-thumb-image").length == 0) f.append('<div class="tp-thumb-image" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;background-image:url(' + f.data("videoposter") + '); background-size:cover"></div>');
                                else punchgs.TweenLite.set(f.find(".tp-thumb-image"), {
                                    autoAlpha: 1
                                })
                            }
                            if (n.attr("src").toLowerCase().indexOf("youtube") >= 0) {
                                if (!n.hasClass("HasListener")) {
                                    try {
                                        n.attr("id", v);
                                        var o;
                                        var u = setInterval(function() {
                                            if (YT != t)
                                                if (typeof YT.Player != t && typeof YT.Player != "undefined") {
                                                    o = new YT.Player(v, {
                                                        events: {
                                                            onStateChange: _,
                                                            onReady: function(n) {
                                                                var r = n.target.getVideoEmbedCode(),
                                                                    i = e("#" + r.split('id="')[1].split('"')[0]),
                                                                    s = i.closest(".tp-caption"),
                                                                    u = s.data("videorate"),
                                                                    a = s.data("videostart");
                                                                if (u != t) n.target.setPlaybackRate(parseFloat(u));
                                                                if (s.data("autoplay") == true || k) n.target.playVideo();
                                                                s.find(".tp-thumb-image").click(function() {
                                                                    punchgs.TweenLite.to(e(this), .3, {
                                                                        autoAlpha: 0,
                                                                        force3D: "auto",
                                                                        ease: punchgs.Power3.easeInOut
                                                                    });
                                                                    if (!Q()) {
                                                                        o.playVideo()
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    })
                                                }
                                            n.addClass("HasListener");
                                            f.data("player", o);
                                            clearInterval(u)
                                        }, 100)
                                    } catch (a) {}
                                } else {
                                    var o = f.data("player");
                                    if (f.data("forcerewind") == "on" && !Q()) o.seekTo(0);
                                    if (!Q() && f.data("autoplay") == true || k) {
                                        f.data("timerplay", setTimeout(function() {
                                            o.playVideo()
                                        }, f.data("start")))
                                    }
                                }
                            } else if (n.attr("src").toLowerCase().indexOf("vimeo") >= 0) {
                                if (!n.hasClass("HasListener")) {
                                    n.addClass("HasListener");
                                    n.attr("id", v);
                                    var l = n.attr("src");
                                    var c = {},
                                        h = l,
                                        p = /([^&=]+)=([^&]*)/g,
                                        d;
                                    while (d = p.exec(h)) {
                                        c[decodeURIComponent(d[1])] = decodeURIComponent(d[2])
                                    }
                                    if (c["player_id"] != t) l = l.replace(c["player_id"], v);
                                    else l = l + "&player_id=" + v;
                                    try {
                                        l = l.replace("api=0", "api=1")
                                    } catch (a) {}
                                    l = l + "&api=1";
                                    n.attr("src", l);
                                    var o = f.find("iframe")[0];
                                    var m = setInterval(function() {
                                        if ($f != t) {
                                            if (typeof $f(v).api != t && typeof $f(v).api != "undefined") {
                                                $f(o).addEvent("ready", function() {
                                                    P(v, k)
                                                });
                                                clearInterval(m)
                                            }
                                        }
                                    }, 100)
                                } else {
                                    if (!Q() && (f.data("autoplay") == true || f.data("forcerewind") == "on")) {
                                        var n = f.find("iframe");
                                        var g = n.attr("id");
                                        var y = $f(g);
                                        if (f.data("forcerewind") == "on") y.api("seekTo", 0);
                                        f.data("timerplay", setTimeout(function() {
                                            if (f.data("autoplay") == true) y.api("play")
                                        }, f.data("start")))
                                    }
                                }
                            }
                        });
                        if (Q() && f.data("disablevideoonmobile") == 1) f.find("video").remove();
                        if (Q() && e(window).width() < 569) f.find("video").remove();
                        if (f.find("video").length > 0) {
                            f.find("video").each(function(n) {
                                var i = this,
                                    s = e(this);
                                if (!s.parent().hasClass("html5vid")) s.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:auto;height:auto"></div>');
                                var o = s.parent();
                                if (i.addEventListener) i.addEventListener("loadedmetadata", function() {
                                    o.data("metaloaded", 1)
                                });
                                else i.attachEvent("loadedmetadata", function() {
                                    o.data("metaloaded", 1)
                                });
                                clearInterval(o.data("interval"));
                                o.data("interval", setInterval(function() {
                                    if (o.data("metaloaded") == 1 || i.duration != NaN) {
                                        clearInterval(o.data("interval"));
                                        if (!o.hasClass("HasListener")) {
                                            o.addClass("HasListener");
                                            if (f.data("dottedoverlay") != "none" && f.data("dottedoverlay") != t)
                                                if (f.find(".tp-dottedoverlay").length != 1) o.append('<div class="tp-dottedoverlay ' + f.data("dottedoverlay") + '"></div>');
                                            if (s.attr("control") == t) {
                                                if (o.find(".tp-video-play-button").length == 0) o.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><div class="tp-revstop"></div></div>');
                                                o.find("video, .tp-poster, .tp-video-play-button").click(function() {
                                                    if (o.hasClass("videoisplaying")) i.pause();
                                                    else i.play()
                                                })
                                            }
                                            if (f.data("forcecover") == 1 || f.hasClass("fullscreenvideo")) {
                                                if (f.data("forcecover") == 1) {
                                                    H(o, r.container);
                                                    o.addClass("fullcoveredvideo");
                                                    f.addClass("fullcoveredvideo")
                                                }
                                                o.css({
                                                    width: "100%",
                                                    height: "100%"
                                                })
                                            }
                                            if (i.addEventListener) i.addEventListener("play", function() {
                                                if (f.data("volume") == "mute") i.muted = true;
                                                o.addClass("videoisplaying");
                                                if (f.data("videoloop") == "loopandnoslidestop") {
                                                    r.videoplaying = false;
                                                    r.container.trigger("starttimer");
                                                    r.container.trigger("revolution.slide.onvideostop")
                                                } else {
                                                    r.videoplaying = true;
                                                    r.container.trigger("stoptimer");
                                                    r.container.trigger("revolution.slide.onvideoplay")
                                                }
                                            });
                                            else i.attachEvent("play", function() {
                                                if (f.data("volume") == "mute") i.muted = true;
                                                o.addClass("videoisplaying");
                                                if (f.data("videoloop") == "loopandnoslidestop") {
                                                    r.videoplaying = false;
                                                    r.container.trigger("starttimer");
                                                    r.container.trigger("revolution.slide.onvideostop")
                                                } else {
                                                    r.videoplaying = true;
                                                    r.container.trigger("stoptimer");
                                                    r.container.trigger("revolution.slide.onvideoplay")
                                                }
                                            });
                                            if (i.addEventListener) i.addEventListener("pause", function() {
                                                o.removeClass("videoisplaying");
                                                r.videoplaying = false;
                                                r.container.trigger("starttimer");
                                                r.container.trigger("revolution.slide.onvideostop")
                                            });
                                            else i.attachEvent("pause", function() {
                                                o.removeClass("videoisplaying");
                                                r.videoplaying = false;
                                                r.container.trigger("starttimer");
                                                r.container.trigger("revolution.slide.onvideostop")
                                            });
                                            if (i.addEventListener) i.addEventListener("ended", function() {
                                                o.removeClass("videoisplaying");
                                                r.videoplaying = false;
                                                r.container.trigger("starttimer");
                                                r.container.trigger("revolution.slide.onvideostop");
                                                if (r.nextslideatend == true) r.container.revnext()
                                            });
                                            else i.attachEvent("ended", function() {
                                                o.removeClass("videoisplaying");
                                                r.videoplaying = false;
                                                r.container.trigger("starttimer");
                                                r.container.trigger("revolution.slide.onvideostop");
                                                if (r.nextslideatend == true) r.container.revnext()
                                            })
                                        }
                                        var e = false;
                                        if (f.data("autoplayonlyfirsttime") == true || f.data("autoplayonlyfirsttime") == "true") e = true;
                                        var n = 16 / 9;
                                        if (f.data("aspectratio") == "4:3") n = 4 / 3;
                                        o.data("mediaAspect", n);
                                        if (o.closest(".tp-caption").data("forcecover") == 1) {
                                            H(o, r.container);
                                            o.addClass("fullcoveredvideo")
                                        }
                                        s.css({
                                            display: "block"
                                        });
                                        r.nextslideatend = f.data("nextslideatend");
                                        if (f.data("autoplay") == true || e == true) {
                                            if (f.data("videoloop") == "loopandnoslidestop") {
                                                r.videoplaying = false;
                                                r.container.trigger("starttimer");
                                                r.container.trigger("revolution.slide.onvideostop")
                                            } else {
                                                r.videoplaying = true;
                                                r.container.trigger("stoptimer");
                                                r.container.trigger("revolution.slide.onvideoplay")
                                            }
                                            if (f.data("forcerewind") == "on" && !o.hasClass("videoisplaying"))
                                                if (i.currentTime > 0) i.currentTime = 0;
                                            if (f.data("volume") == "mute") i.muted = true;
                                            o.data("timerplay", setTimeout(function() {
                                                if (f.data("forcerewind") == "on" && !o.hasClass("videoisplaying"))
                                                    if (i.currentTime > 0) i.currentTime = 0;
                                                if (f.data("volume") == "mute") i.muted = true;
                                                i.play()
                                            }, 10 + f.data("start")))
                                        }
                                        if (o.data("ww") == t) o.data("ww", s.attr("width"));
                                        if (o.data("hh") == t) o.data("hh", s.attr("height"));
                                        if (!f.hasClass("fullscreenvideo") && f.data("forcecover") == 1) {
                                            try {
                                                o.width(o.data("ww") * r.bw);
                                                o.height(o.data("hh") * r.bh)
                                            } catch (u) {}
                                        }
                                        clearInterval(o.data("interval"))
                                    }
                                }), 100)
                            })
                        }
                        if (f.data("autoplay") == true) {
                            setTimeout(function() {
                                if (f.data("videoloop") != "loopandnoslidestop") {
                                    r.videoplaying = true;
                                    r.container.trigger("stoptimer")
                                }
                            }, 200);
                            if (f.data("videoloop") != "loopandnoslidestop") {
                                r.videoplaying = true;
                                r.container.trigger("stoptimer")
                            }
                            if (f.data("autoplayonlyfirsttime") == true || f.data("autoplayonlyfirsttime") == "true") {
                                f.data("autoplay", false);
                                f.data("autoplayonlyfirsttime", false)
                            }
                        }
                    }
                    var L = 0;
                    var A = 0;
                    if (f.find("img").length > 0) {
                        var O = f.find("img");
                        if (O.width() == 0) O.css({
                            width: "auto"
                        });
                        if (O.height() == 0) O.css({
                            height: "auto"
                        });
                        if (O.data("ww") == t && O.width() > 0) O.data("ww", O.width());
                        if (O.data("hh") == t && O.height() > 0) O.data("hh", O.height());
                        var M = O.data("ww");
                        var D = O.data("hh");
                        if (M == t) M = 0;
                        if (D == t) D = 0;
                        O.width(M * r.bw);
                        O.height(D * r.bh);
                        L = O.width();
                        A = O.height()
                    } else {
                        if (f.find("iframe").length > 0 || f.find("video").length > 0) {
                            var I = false;
                            var O = f.find("iframe");
                            if (O.length == 0) {
                                O = f.find("video");
                                I = true
                            }
                            O.css({
                                display: "block"
                            });
                            if (f.data("ww") == t) f.data("ww", O.width());
                            if (f.data("hh") == t) f.data("hh", O.height());
                            var M = f.data("ww");
                            var D = f.data("hh");
                            var R = f;
                            if (R.data("fsize") == t) R.data("fsize", parseInt(R.css("font-size"), 0) || 0);
                            if (R.data("pt") == t) R.data("pt", parseInt(R.css("paddingTop"), 0) || 0);
                            if (R.data("pb") == t) R.data("pb", parseInt(R.css("paddingBottom"), 0) || 0);
                            if (R.data("pl") == t) R.data("pl", parseInt(R.css("paddingLeft"), 0) || 0);
                            if (R.data("pr") == t) R.data("pr", parseInt(R.css("paddingRight"), 0) || 0);
                            if (R.data("mt") == t) R.data("mt", parseInt(R.css("marginTop"), 0) || 0);
                            if (R.data("mb") == t) R.data("mb", parseInt(R.css("marginBottom"), 0) || 0);
                            if (R.data("ml") == t) R.data("ml", parseInt(R.css("marginLeft"), 0) || 0);
                            if (R.data("mr") == t) R.data("mr", parseInt(R.css("marginRight"), 0) || 0);
                            if (R.data("bt") == t) R.data("bt", parseInt(R.css("borderTop"), 0) || 0);
                            if (R.data("bb") == t) R.data("bb", parseInt(R.css("borderBottom"), 0) || 0);
                            if (R.data("bl") == t) R.data("bl", parseInt(R.css("borderLeft"), 0) || 0);
                            if (R.data("br") == t) R.data("br", parseInt(R.css("borderRight"), 0) || 0);
                            if (R.data("lh") == t) R.data("lh", parseInt(R.css("lineHeight"), 0) || 0);
                            var X = r.width;
                            var J = r.height;
                            if (X > r.startwidth) X = r.startwidth;
                            if (J > r.startheight) J = r.startheight;
                            if (!f.hasClass("fullscreenvideo")) f.css({
                                "font-size": R.data("fsize") * r.bw + "px",
                                "padding-top": R.data("pt") * r.bh + "px",
                                "padding-bottom": R.data("pb") * r.bh + "px",
                                "padding-left": R.data("pl") * r.bw + "px",
                                "padding-right": R.data("pr") * r.bw + "px",
                                "margin-top": R.data("mt") * r.bh + "px",
                                "margin-bottom": R.data("mb") * r.bh + "px",
                                "margin-left": R.data("ml") * r.bw + "px",
                                "margin-right": R.data("mr") * r.bw + "px",
                                "border-top": R.data("bt") * r.bh + "px",
                                "border-bottom": R.data("bb") * r.bh + "px",
                                "border-left": R.data("bl") * r.bw + "px",
                                "border-right": R.data("br") * r.bw + "px",
                                "line-height": R.data("lh") * r.bh + "px",
                                height: D * r.bh + "px"
                            });
                            else {
                                u = 0;
                                a = 0;
                                f.data("x", 0);
                                f.data("y", 0);
                                var K = r.height;
                                if (r.autoHeight == "on") K = r.container.height();
                                f.css({
                                    width: r.width,
                                    height: K
                                })
                            }
                            if (I == false) {
                                O.width(M * r.bw);
                                O.height(D * r.bh)
                            } else if (f.data("forcecover") != 1 && !f.hasClass("fullscreenvideo")) {
                                O.width(M * r.bw);
                                O.height(D * r.bh)
                            }
                            L = O.width();
                            A = O.height()
                        } else {
                            f.find(".tp-resizeme, .tp-resizeme *").each(function() {
                                U(e(this), r)
                            });
                            if (f.hasClass("tp-resizeme")) {
                                f.find("*").each(function() {
                                    U(e(this), r)
                                })
                            }
                            U(f, r);
                            A = f.outerHeight(true);
                            L = f.outerWidth(true);
                            var G = f.outerHeight();
                            var Y = f.css("backgroundColor");
                            f.find(".frontcorner").css({
                                borderWidth: G + "px",
                                left: 0 - G + "px",
                                borderRight: "0px solid transparent",
                                borderTopColor: Y
                            });
                            f.find(".frontcornertop").css({
                                borderWidth: G + "px",
                                left: 0 - G + "px",
                                borderRight: "0px solid transparent",
                                borderBottomColor: Y
                            });
                            f.find(".backcorner").css({
                                borderWidth: G + "px",
                                right: 0 - G + "px",
                                borderLeft: "0px solid transparent",
                                borderBottomColor: Y
                            });
                            f.find(".backcornertop").css({
                                borderWidth: G + "px",
                                right: 0 - G + "px",
                                borderLeft: "0px solid transparent",
                                borderTopColor: Y
                            })
                        }
                    }
                    if (r.fullScreenAlignForce == "on") {
                        u = 0;
                        a = 0
                    }
                    if (f.data("voffset") == t) f.data("voffset", 0);
                    if (f.data("hoffset") == t) f.data("hoffset", 0);
                    var Z = f.data("voffset") * h;
                    var et = f.data("hoffset") * h;
                    var tt = r.startwidth * h;
                    var nt = r.startheight * h;
                    if (r.fullScreenAlignForce == "on") {
                        tt = r.container.width();
                        nt = r.container.height()
                    }
                    if (f.data("x") == "center" || f.data("xcenter") == "center") {
                        f.data("xcenter", "center");
                        f.data("x", tt / 2 - f.outerWidth(true) / 2 + et)
                    }
                    if (f.data("x") == "left" || f.data("xleft") == "left") {
                        f.data("xleft", "left");
                        f.data("x", 0 / h + et)
                    }
                    if (f.data("x") == "right" || f.data("xright") == "right") {
                        f.data("xright", "right");
                        f.data("x", (tt - f.outerWidth(true) + et) / h)
                    }
                    if (f.data("y") == "center" || f.data("ycenter") == "center") {
                        f.data("ycenter", "center");
                        f.data("y", nt / 2 - f.outerHeight(true) / 2 + Z)
                    }
                    if (f.data("y") == "top" || f.data("ytop") == "top") {
                        f.data("ytop", "top");
                        f.data("y", 0 / r.bh + Z)
                    }
                    if (f.data("y") == "bottom" || f.data("ybottom") == "bottom") {
                        f.data("ybottom", "bottom");
                        f.data("y", (nt - f.outerHeight(true) + Z) / h)
                    }
                    if (f.data("start") == t) f.data("start", 1e3);
                    var rt = f.data("easing");
                    if (rt == t) rt = "punchgs.Power1.easeOut";
                    var it = f.data("start") / 1e3;
                    var st = f.data("speed") / 1e3;
                    if (f.data("x") == "center" || f.data("xcenter") == "center") var ot = f.data("x") + u;
                    else {
                        var ot = h * f.data("x") + u
                    }
                    if (f.data("y") == "center" || f.data("ycenter") == "center") var ut = f.data("y") + a;
                    else {
                        var ut = r.bh * f.data("y") + a
                    }
                    punchgs.TweenLite.set(f, {
                        top: ut,
                        left: ot,
                        overwrite: "auto"
                    });
                    if (o == 0) s = true;
                    if (f.data("timeline") != t && !s) {
                        if (o != 2) f.data("timeline").gotoAndPlay(0);
                        s = true
                    }
                    if (!s) {
                        if (f.data("timeline") != t) {}

                        function at() {}

                        function ft() {}
                        var lt = new punchgs.TimelineLite({
                            smoothChildTiming: true,
                            onStart: ft
                        });
                        lt.pause();
                        if (r.fullScreenAlignForce == "on") {}
                        var ct = f;
                        if (f.data("mySplitText") != t) f.data("mySplitText").revert();
                        if (f.data("splitin") == "chars" || f.data("splitin") == "words" || f.data("splitin") == "lines" || f.data("splitout") == "chars" || f.data("splitout") == "words" || f.data("splitout") == "lines") {
                            if (f.find("a").length > 0) f.data("mySplitText", new punchgs.SplitText(f.find("a"), {
                                type: "lines,words,chars",
                                charsClass: "tp-splitted",
                                wordsClass: "tp-splitted",
                                linesClass: "tp-splitted"
                            }));
                            else if (f.find(".tp-layer-inner-rotation").length > 0) f.data("mySplitText", new punchgs.SplitText(f.find(".tp-layer-inner-rotation"), {
                                type: "lines,words,chars",
                                charsClass: "tp-splitted",
                                wordsClass: "tp-splitted",
                                linesClass: "tp-splitted"
                            }));
                            else f.data("mySplitText", new punchgs.SplitText(f, {
                                type: "lines,words,chars",
                                charsClass: "tp-splitted",
                                wordsClass: "tp-splitted",
                                linesClass: "tp-splitted"
                            }));
                            f.addClass("splitted")
                        }
                        if (f.data("splitin") == "chars") ct = f.data("mySplitText").chars;
                        if (f.data("splitin") == "words") ct = f.data("mySplitText").words;
                        if (f.data("splitin") == "lines") ct = f.data("mySplitText").lines;
                        var ht = B();
                        var pt = B();
                        if (f.data("repeat") != t) repeatV = f.data("repeat");
                        if (f.data("yoyo") != t) yoyoV = f.data("yoyo");
                        if (f.data("repeatdelay") != t) repeatdelayV = f.data("repeatdelay");
                        if (f.hasClass("customin")) ht = j(ht, f.data("customin"));
                        else if (f.hasClass("randomrotate")) {
                            ht.scale = Math.random() * 3 + 1;
                            ht.rotation = Math.round(Math.random() * 200 - 100);
                            ht.x = Math.round(Math.random() * 200 - 100);
                            ht.y = Math.round(Math.random() * 200 - 100)
                        } else if (f.hasClass("lfr") || f.hasClass("skewfromright")) ht.x = 15 + r.width;
                        else if (f.hasClass("lfl") || f.hasClass("skewfromleft")) ht.x = -15 - L;
                        else if (f.hasClass("sfl") || f.hasClass("skewfromleftshort")) ht.x = -50;
                        else if (f.hasClass("sfr") || f.hasClass("skewfromrightshort")) ht.x = 50;
                        else if (f.hasClass("lft")) ht.y = -25 - A;
                        else if (f.hasClass("lfb")) ht.y = 25 + r.height;
                        else if (f.hasClass("sft")) ht.y = -50;
                        else if (f.hasClass("sfb")) ht.y = 50;
                        if (f.hasClass("skewfromright") || f.hasClass("skewfromrightshort")) ht.skewX = -85;
                        else if (f.hasClass("skewfromleft") || f.hasClass("skewfromleftshort")) ht.skewX = 85;
                        if (f.hasClass("fade") || f.hasClass("sft") || f.hasClass("sfl") || f.hasClass("sfb") || f.hasClass("skewfromleftshort") || f.hasClass("sfr") || f.hasClass("skewfromrightshort")) ht.opacity = 0;
                        if (q().toLowerCase() == "safari") {}
                        var dt = f.data("elementdelay") == t ? 0 : f.data("elementdelay");
                        pt.ease = ht.ease = f.data("easing") == t ? punchgs.Power1.easeInOut : f.data("easing");
                        ht.data = new Object;
                        ht.data.oldx = ht.x;
                        ht.data.oldy = ht.y;
                        pt.data = new Object;
                        pt.data.oldx = pt.x;
                        pt.data.oldy = pt.y;
                        ht.x = ht.x * h;
                        ht.y = ht.y * h;
                        var vt = new punchgs.TimelineLite;
                        if (o != 2) {
                            if (f.hasClass("customin")) {
                                if (ct != f) lt.add(punchgs.TweenLite.set(f, {
                                    force3D: "auto",
                                    opacity: 1,
                                    scaleX: 1,
                                    scaleY: 1,
                                    rotationX: 0,
                                    rotationY: 0,
                                    rotationZ: 0,
                                    skewX: 0,
                                    skewY: 0,
                                    z: 0,
                                    x: 0,
                                    y: 0,
                                    visibility: "visible",
                                    opacity: 1,
                                    delay: 0,
                                    overwrite: "all"
                                }));
                                ht.visibility = "hidden";
                                pt.visibility = "visible";
                                pt.overwrite = "all";
                                pt.opacity = 1;
                                pt.onComplete = at();
                                pt.delay = it;
                                pt.force3D = "auto";
                                lt.add(vt.staggerFromTo(ct, st, ht, pt, dt), "frame0")
                            } else {
                                ht.visibility = "visible";
                                ht.transformPerspective = 600;
                                if (ct != f) lt.add(punchgs.TweenLite.set(f, {
                                    force3D: "auto",
                                    opacity: 1,
                                    scaleX: 1,
                                    scaleY: 1,
                                    rotationX: 0,
                                    rotationY: 0,
                                    rotationZ: 0,
                                    skewX: 0,
                                    skewY: 0,
                                    z: 0,
                                    x: 0,
                                    y: 0,
                                    visibility: "visible",
                                    opacity: 1,
                                    delay: 0,
                                    overwrite: "all"
                                }));
                                pt.visibility = "visible";
                                pt.delay = it;
                                pt.onComplete = at();
                                pt.opacity = 1;
                                pt.force3D = "auto";
                                if (f.hasClass("randomrotate") && ct != f) {
                                    for (var n = 0; n < ct.length; n++) {
                                        var mt = new Object;
                                        var gt = new Object;
                                        e.extend(mt, ht);
                                        e.extend(gt, pt);
                                        ht.scale = Math.random() * 3 + 1;
                                        ht.rotation = Math.round(Math.random() * 200 - 100);
                                        ht.x = Math.round(Math.random() * 200 - 100);
                                        ht.y = Math.round(Math.random() * 200 - 100);
                                        if (n != 0) gt.delay = it + n * dt;
                                        lt.append(punchgs.TweenLite.fromTo(ct[n], st, mt, gt), "frame0")
                                    }
                                } else lt.add(vt.staggerFromTo(ct, st, ht, pt, dt), "frame0")
                            }
                        }
                        f.data("timeline", lt);
                        var yt = new Array;
                        if (f.data("frames") != t) {
                            var bt = f.data("frames");
                            bt = bt.replace(/\s+/g, "");
                            bt = bt.replace("{", "");
                            var wt = bt.split("}");
                            e.each(wt, function(e, t) {
                                if (t.length > 0) {
                                    var n = F(t);
                                    V(f, r, n, "frame" + (e + 10), h)
                                }
                            })
                        }
                        lt = f.data("timeline");
                        if (f.data("end") != t && (o == -1 || o == 2)) {
                            $(f, r, f.data("end") / 1e3, ht, "frame99", h)
                        } else {
                            if (o == -1 || o == 2) $(f, r, 999999, ht, "frame99", h);
                            else $(f, r, 200, ht, "frame99", h)
                        }
                        lt = f.data("timeline");
                        f.data("timeline", lt);
                        z(f, h);
                        lt.resume()
                    }
                }
                if (s) {
                    W(f);
                    z(f, h);
                    if (f.data("timeline") != t) {
                        var Et = f.data("timeline").getTweensOf();
                        e.each(Et, function(e, n) {
                            if (n.vars.data != t) {
                                var r = n.vars.data.oldx * h;
                                var i = n.vars.data.oldy * h;
                                if (n.progress() != 1 && n.progress() != 0) {
                                    try {
                                        n.vars.x = r;
                                        n.vary.y = i
                                    } catch (s) {}
                                } else {
                                    if (n.progress() == 1) {
                                        punchgs.TweenLite.set(n.target, {
                                            x: r,
                                            y: i
                                        })
                                    }
                                }
                            }
                        })
                    }
                }
            });
            var c = e("body").find("#" + r.container.attr("id")).find(".tp-bannertimer");
            c.data("opt", r);
            if (s != t) setTimeout(function() {
                s.resume()
            }, 30)
        };
        var q = function() {
            var e = navigator.appName,
                t = navigator.userAgent,
                n;
            var r = t.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (r && (n = t.match(/version\/([\.\d]+)/i)) != null) r[2] = n[1];
            r = r ? [r[1], r[2]] : [e, navigator.appVersion, "-?"];
            return r[0]
        };
        var R = function() {
            var e = navigator.appName,
                t = navigator.userAgent,
                n;
            var r = t.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (r && (n = t.match(/version\/([\.\d]+)/i)) != null) r[2] = n[1];
            r = r ? [r[1], r[2]] : [e, navigator.appVersion, "-?"];
            return r[1]
        };
        var U = function(e, n) {
            if (e.data("fsize") == t) e.data("fsize", parseInt(e.css("font-size"), 0) || 0);
            if (e.data("pt") == t) e.data("pt", parseInt(e.css("paddingTop"), 0) || 0);
            if (e.data("pb") == t) e.data("pb", parseInt(e.css("paddingBottom"), 0) || 0);
            if (e.data("pl") == t) e.data("pl", parseInt(e.css("paddingLeft"), 0) || 0);
            if (e.data("pr") == t) e.data("pr", parseInt(e.css("paddingRight"), 0) || 0);
            if (e.data("mt") == t) e.data("mt", parseInt(e.css("marginTop"), 0) || 0);
            if (e.data("mb") == t) e.data("mb", parseInt(e.css("marginBottom"), 0) || 0);
            if (e.data("ml") == t) e.data("ml", parseInt(e.css("marginLeft"), 0) || 0);
            if (e.data("mr") == t) e.data("mr", parseInt(e.css("marginRight"), 0) || 0);
            if (e.data("bt") == t) e.data("bt", parseInt(e.css("borderTopWidth"), 0) || 0);
            if (e.data("bb") == t) e.data("bb", parseInt(e.css("borderBottomWidth"), 0) || 0);
            if (e.data("bl") == t) e.data("bl", parseInt(e.css("borderLeftWidth"), 0) || 0);
            if (e.data("br") == t) e.data("br", parseInt(e.css("borderRightWidth"), 0) || 0);
            if (e.data("ls") == t) e.data("ls", parseInt(e.css("letterSpacing"), 0) || 0);
            if (e.data("lh") == t) e.data("lh", parseInt(e.css("lineHeight"), 0) || "auto");
            if (e.data("minwidth") == t) e.data("minwidth", parseInt(e.css("minWidth"), 0) || 0);
            if (e.data("minheight") == t) e.data("minheight", parseInt(e.css("minHeight"), 0) || 0);
            if (e.data("maxwidth") == t) e.data("maxwidth", parseInt(e.css("maxWidth"), 0) || "none");
            if (e.data("maxheight") == t) e.data("maxheight", parseInt(e.css("maxHeight"), 0) || "none");
            if (e.data("wii") == t) e.data("wii", parseInt(e.css("width"), 0) || 0);
            if (e.data("hii") == t) e.data("hii", parseInt(e.css("height"), 0) || 0);
            if (e.data("wan") == t) e.data("wan", e.css("-webkit-transition"));
            if (e.data("moan") == t) e.data("moan", e.css("-moz-animation-transition"));
            if (e.data("man") == t) e.data("man", e.css("-ms-animation-transition"));
            if (e.data("ani") == t) e.data("ani", e.css("transition"));
            if (!e.hasClass("tp-splitted")) {
                e.css("-webkit-transition", "none");
                e.css("-moz-transition", "none");
                e.css("-ms-transition", "none");
                e.css("transition", "none");
                punchgs.TweenLite.set(e, {
                    fontSize: Math.round(e.data("fsize") * n.bw) + "px",
                    letterSpacing: Math.floor(e.data("ls") * n.bw) + "px",
                    paddingTop: Math.round(e.data("pt") * n.bh) + "px",
                    paddingBottom: Math.round(e.data("pb") * n.bh) + "px",
                    paddingLeft: Math.round(e.data("pl") * n.bw) + "px",
                    paddingRight: Math.round(e.data("pr") * n.bw) + "px",
                    marginTop: e.data("mt") * n.bh + "px",
                    marginBottom: e.data("mb") * n.bh + "px",
                    marginLeft: e.data("ml") * n.bw + "px",
                    marginRight: e.data("mr") * n.bw + "px",
                    borderTopWidth: Math.round(e.data("bt") * n.bh) + "px",
                    borderBottomWidth: Math.round(e.data("bb") * n.bh) + "px",
                    borderLeftWidth: Math.round(e.data("bl") * n.bw) + "px",
                    borderRightWidth: Math.round(e.data("br") * n.bw) + "px",
                    lineHeight: Math.round(e.data("lh") * n.bh) + "px",
                    minWidth: e.data("minwidth") * n.bw + "px",
                    minHeight: e.data("minheight") * n.bh + "px",
                    overwrite: "auto"
                });
                setTimeout(function() {
                    e.css("-webkit-transition", e.data("wan"));
                    e.css("-moz-transition", e.data("moan"));
                    e.css("-ms-transition", e.data("man"));
                    e.css("transition", e.data("ani"))
                }, 30);
                if (e.data("maxheight") != "none") e.css({
                    maxHeight: e.data("maxheight") * n.bh + "px"
                });
                if (e.data("maxwidth") != "none") e.css({
                    maxWidth: e.data("maxwidth") * n.bw + "px"
                })
            }
        };
        var z = function(n, r) {
            n.find(".rs-pendulum").each(function() {
                var n = e(this);
                if (n.data("timeline") == t) {
                    n.data("timeline", new punchgs.TimelineLite);
                    var i = n.data("startdeg") == t ? -20 : n.data("startdeg"),
                        s = n.data("enddeg") == t ? 20 : n.data("enddeg");
                    speed = n.data("speed") == t ? 2 : n.data("speed"), origin = n.data("origin") == t ? "50% 50%" : n.data("origin"), easing = n.data("ease") == t ? punchgs.Power2.easeInOut : n.data("ease");
                    i = i * r;
                    s = s * r;
                    n.data("timeline").append(new punchgs.TweenLite.fromTo(n, speed, {
                        force3D: "auto",
                        rotation: i,
                        transformOrigin: origin
                    }, {
                        rotation: s,
                        ease: easing
                    }));
                    n.data("timeline").append(new punchgs.TweenLite.fromTo(n, speed, {
                        force3D: "auto",
                        rotation: s,
                        transformOrigin: origin
                    }, {
                        rotation: i,
                        ease: easing,
                        onComplete: function() {
                            n.data("timeline").restart()
                        }
                    }))
                }
            });
            n.find(".rs-slideloop").each(function() {
                var n = e(this);
                if (n.data("timeline") == t) {
                    n.data("timeline", new punchgs.TimelineLite);
                    var i = n.data("xs") == t ? 0 : n.data("xs"),
                        s = n.data("ys") == t ? 0 : n.data("ys");
                    xe = n.data("xe") == t ? 0 : n.data("xe"), ye = n.data("ye") == t ? 0 : n.data("ye"), speed = n.data("speed") == t ? 2 : n.data("speed"), easing = n.data("ease") == t ? punchgs.Power2.easeInOut : n.data("ease");
                    i = i * r;
                    s = s * r;
                    xe = xe * r;
                    ye = ye * r;
                    n.data("timeline").append(new punchgs.TweenLite.fromTo(n, speed, {
                        force3D: "auto",
                        x: i,
                        y: s
                    }, {
                        x: xe,
                        y: ye,
                        ease: easing
                    }));
                    n.data("timeline").append(new punchgs.TweenLite.fromTo(n, speed, {
                        force3D: "auto",
                        x: xe,
                        y: ye
                    }, {
                        x: i,
                        y: s,
                        onComplete: function() {
                            n.data("timeline").restart()
                        }
                    }))
                }
            });
            n.find(".rs-pulse").each(function() {
                var n = e(this);
                if (n.data("timeline") == t) {
                    n.data("timeline", new punchgs.TimelineLite);
                    var r = n.data("zoomstart") == t ? 0 : n.data("zoomstart"),
                        i = n.data("zoomend") == t ? 0 : n.data("zoomend");
                    speed = n.data("speed") == t ? 2 : n.data("speed"), easing = n.data("ease") == t ? punchgs.Power2.easeInOut : n.data("ease");
                    n.data("timeline").append(new punchgs.TweenLite.fromTo(n, speed, {
                        force3D: "auto",
                        scale: r
                    }, {
                        scale: i,
                        ease: easing
                    }));
                    n.data("timeline").append(new punchgs.TweenLite.fromTo(n, speed, {
                        force3D: "auto",
                        scale: i
                    }, {
                        scale: r,
                        onComplete: function() {
                            n.data("timeline").restart()
                        }
                    }))
                }
            });
            n.find(".rs-wave").each(function() {
                var n = e(this);
                if (n.data("timeline") == t) {
                    n.data("timeline", new punchgs.TimelineLite);
                    var i = n.data("angle") == t ? 10 : n.data("angle"),
                        s = n.data("radius") == t ? 10 : n.data("radius"),
                        o = n.data("speed") == t ? -20 : n.data("speed"),
                        u = n.data("origin") == t ? -20 : n.data("origin");
                    i = i * r;
                    s = s * r;
                    var a = {
                        a: 0,
                        ang: i,
                        element: n,
                        unit: s
                    };
                    n.data("timeline").append(new punchgs.TweenLite.fromTo(a, o, {
                        a: 360
                    }, {
                        a: 0,
                        force3D: "auto",
                        ease: punchgs.Linear.easeNone,
                        onUpdate: function() {
                            var e = a.a * (Math.PI / 180);
                            punchgs.TweenLite.to(a.element, .1, {
                                force3D: "auto",
                                x: Math.cos(e) * a.unit,
                                y: a.unit * (1 - Math.sin(e))
                            })
                        },
                        onComplete: function() {
                            n.data("timeline").restart()
                        }
                    }))
                }
            })
        };
        var W = function(n) {
            n.find(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function() {
                var n = e(this);
                if (n.data("timeline") != t) {
                    n.data("timeline").pause();
                    n.data("timeline", null)
                }
            })
        };
        var X = function(n, r) {
            var i = 0;
            var s = n.find(".tp-caption"),
                o = r.container.find(".tp-static-layers").find(".tp-caption");
            e.each(o, function(e, t) {
                s.push(t)
            });
            s.each(function(n) {
                var s = -1;
                var o = e(this);
                if (o.hasClass("tp-static-layer")) {
                    if (o.data("startslide") == -1 || o.data("startslide") == "-1") o.data("startslide", 0);
                    if (o.data("endslide") == -1 || o.data("endslide") == "-1") o.data("endslide", r.slideamount);
                    if (o.hasClass("tp-is-shown")) {
                        if (o.data("startslide") > r.next || o.data("endslide") < r.next) {
                            s = 2;
                            o.removeClass("tp-is-shown")
                        } else {
                            s = 0
                        }
                    } else {
                        s = 2
                    }
                }
                if (s != 0) {
                    W(o);
                    if (o.find("iframe").length > 0) {
                        punchgs.TweenLite.to(o.find("iframe"), .2, {
                            autoAlpha: 0
                        });
                        if (Q()) o.find("iframe").remove();
                        try {
                            var u = o.find("iframe");
                            var a = u.attr("id");
                            var f = $f(a);
                            f.api("pause");
                            clearTimeout(o.data("timerplay"))
                        } catch (l) {}
                        try {
                            var c = o.data("player");
                            c.stopVideo();
                            clearTimeout(o.data("timerplay"))
                        } catch (l) {}
                    }
                    if (o.find("video").length > 0) {
                        try {
                            o.find("video").each(function(t) {
                                var n = e(this).parent();
                                var r = n.attr("id");
                                clearTimeout(n.data("timerplay"));
                                var i = this;
                                i.pause()
                            })
                        } catch (l) {}
                    }
                    try {
                        var h = o.data("timeline");
                        var p = h.getLabelTime("frame99");
                        var d = h.time();
                        if (p > d) {
                            var v = h.getTweensOf(o);
                            e.each(v, function(e, t) {
                                if (e != 0) t.pause()
                            });
                            if (o.css("opacity") != 0) {
                                var m = o.data("endspeed") == t ? o.data("speed") : o.data("endspeed");
                                if (m > i) i = m;
                                h.play("frame99")
                            } else h.progress(1, false)
                        }
                    } catch (l) {}
                }
            });
            return i
        };
        var V = function(e, n, r, i, s) {
            var o = e.data("timeline");
            var u = new punchgs.TimelineLite;
            var a = e;
            if (r.typ == "chars") a = e.data("mySplitText").chars;
            else if (r.typ == "words") a = e.data("mySplitText").words;
            else if (r.typ == "lines") a = e.data("mySplitText").lines;
            r.animation.ease = r.ease;
            if (r.animation.rotationZ != t) r.animation.rotation = r.animation.rotationZ;
            r.animation.data = new Object;
            r.animation.data.oldx = r.animation.x;
            r.animation.data.oldy = r.animation.y;
            r.animation.x = r.animation.x * s;
            r.animation.y = r.animation.y * s;
            o.add(u.staggerTo(a, r.speed, r.animation, r.elementdelay), r.start);
            o.addLabel(i, r.start);
            e.data("timeline", o)
        };
        var $ = function(e, n, r, i, s, o) {
            var u = e.data("timeline");
            var a = new punchgs.TimelineLite;
            var f = B();
            var l = e.data("endspeed") == t ? e.data("speed") : e.data("endspeed");
            f.ease = e.data("endeasing") == t ? punchgs.Power1.easeInOut : e.data("endeasing");
            l = l / 1e3;
            if (e.hasClass("ltr") || e.hasClass("ltl") || e.hasClass("str") || e.hasClass("stl") || e.hasClass("ltt") || e.hasClass("ltb") || e.hasClass("stt") || e.hasClass("stb") || e.hasClass("skewtoright") || e.hasClass("skewtorightshort") || e.hasClass("skewtoleft") || e.hasClass("skewtoleftshort") || e.hasClass("fadeout") || e.hasClass("randomrotateout")) {
                if (e.hasClass("skewtoright") || e.hasClass("skewtorightshort")) f.skewX = 35;
                else if (e.hasClass("skewtoleft") || e.hasClass("skewtoleftshort")) f.skewX = -35;
                if (e.hasClass("ltr") || e.hasClass("skewtoright")) f.x = n.width + 60;
                else if (e.hasClass("ltl") || e.hasClass("skewtoleft")) f.x = 0 - (n.width + 60);
                else if (e.hasClass("ltt")) f.y = 0 - (n.height + 60);
                else if (e.hasClass("ltb")) f.y = n.height + 60;
                else if (e.hasClass("str") || e.hasClass("skewtorightshort")) {
                    f.x = 50;
                    f.opacity = 0
                } else if (e.hasClass("stl") || e.hasClass("skewtoleftshort")) {
                    f.x = -50;
                    f.opacity = 0
                } else if (e.hasClass("stt")) {
                    f.y = -50;
                    f.opacity = 0
                } else if (e.hasClass("stb")) {
                    f.y = 50;
                    f.opacity = 0
                } else if (e.hasClass("randomrotateout")) {
                    f.x = Math.random() * n.width;
                    f.y = Math.random() * n.height;
                    f.scale = Math.random() * 2 + .3;
                    f.rotation = Math.random() * 360 - 180;
                    f.opacity = 0
                } else if (e.hasClass("fadeout")) {
                    f.opacity = 0
                }
                if (e.hasClass("skewtorightshort")) f.x = 270;
                else if (e.hasClass("skewtoleftshort")) f.x = -270;
                f.data = new Object;
                f.data.oldx = f.x;
                f.data.oldy = f.y;
                f.x = f.x * o;
                f.y = f.y * o;
                f.overwrite = "auto";
                var c = e;
                var c = e;
                if (e.data("splitout") == "chars") c = e.data("mySplitText").chars;
                else if (e.data("splitout") == "words") c = e.data("mySplitText").words;
                else if (e.data("splitout") == "lines") c = e.data("mySplitText").lines;
                var h = e.data("endelementdelay") == t ? 0 : e.data("endelementdelay");
                u.add(a.staggerTo(c, l, f, h), r)
            } else if (e.hasClass("customout")) {
                f = j(f, e.data("customout"));
                var c = e;
                if (e.data("splitout") == "chars") c = e.data("mySplitText").chars;
                else if (e.data("splitout") == "words") c = e.data("mySplitText").words;
                else if (e.data("splitout") == "lines") c = e.data("mySplitText").lines;
                var h = e.data("endelementdelay") == t ? 0 : e.data("endelementdelay");
                f.onStart = function() {
                    punchgs.TweenLite.set(e, {
                        transformPerspective: f.transformPerspective,
                        transformOrigin: f.transformOrigin,
                        overwrite: "auto"
                    })
                };
                f.data = new Object;
                f.data.oldx = f.x;
                f.data.oldy = f.y;
                f.x = f.x * o;
                f.y = f.y * o;
                u.add(a.staggerTo(c, l, f, h), r)
            } else {
                i.delay = 0;
                u.add(punchgs.TweenLite.to(e, l, i), r)
            }
            u.addLabel(s, r);
            e.data("timeline", u)
        };
        var J = function(t, n) {
            t.children().each(function() {
                try {
                    e(this).die("click")
                } catch (t) {}
                try {
                    e(this).die("mouseenter")
                } catch (t) {}
                try {
                    e(this).die("mouseleave")
                } catch (t) {}
                try {
                    e(this).unbind("hover")
                } catch (t) {}
            });
            try {
                t.die("click", "mouseenter", "mouseleave")
            } catch (r) {}
            clearInterval(n.cdint);
            t = null
        };
        var K = function(n, r) {
            r.cd = 0;
            r.loop = 0;
            if (r.stopAfterLoops != t && r.stopAfterLoops > -1) r.looptogo = r.stopAfterLoops;
            else r.looptogo = 9999999;
            if (r.stopAtSlide != t && r.stopAtSlide > -1) r.lastslidetoshow = r.stopAtSlide;
            else r.lastslidetoshow = 999;
            r.stopLoop = "off";
            if (r.looptogo == 0) r.stopLoop = "on";
            if (r.slideamount > 1 && !(r.stopAfterLoops == 0 && r.stopAtSlide == 1)) {
                var i = n.find(".tp-bannertimer");
                n.on("stoptimer", function() {
                    var t = e(this).find(".tp-bannertimer");
                    t.data("tween").pause();
                    if (r.hideTimerBar == "on") t.css({
                        visibility: "hidden"
                    })
                });
                n.on("starttimer", function() {
                    if (r.conthover != 1 && r.videoplaying != true && r.width > r.hideSliderAtLimit && r.bannertimeronpause != true && r.overnav != true)
                        if (r.stopLoop == "on" && r.next == r.lastslidetoshow - 1 || r.noloopanymore == 1) {
                            r.noloopanymore = 1
                        } else {
                            i.css({
                                visibility: "visible"
                            });
                            i.data("tween").resume()
                        }
                    if (r.hideTimerBar == "on") i.css({
                        visibility: "hidden"
                    })
                });
                n.on("restarttimer", function() {
                    var t = e(this).find(".tp-bannertimer");
                    if (r.stopLoop == "on" && r.next == r.lastslidetoshow - 1 || r.noloopanymore == 1) {
                        r.noloopanymore = 1
                    } else {
                        t.css({
                            visibility: "visible"
                        });
                        t.data("tween").kill();
                        t.data("tween", punchgs.TweenLite.fromTo(t, r.delay / 1e3, {
                            width: "0%"
                        }, {
                            force3D: "auto",
                            width: "100%",
                            ease: punchgs.Linear.easeNone,
                            onComplete: s,
                            delay: 1
                        }))
                    }
                    if (r.hideTimerBar == "on") t.css({
                        visibility: "hidden"
                    })
                });
                n.on("nulltimer", function() {
                    i.data("tween").pause(0);
                    if (r.hideTimerBar == "on") i.css({
                        visibility: "hidden"
                    })
                });
                var s = function() {
                    if (e("body").find(n).length == 0) {
                        J(n, r);
                        clearInterval(r.cdint)
                    }
                    n.trigger("revolution.slide.slideatend");
                    if (n.data("conthover-changed") == 1) {
                        r.conthover = n.data("conthover");
                        n.data("conthover-changed", 0)
                    }
                    r.act = r.next;
                    r.next = r.next + 1;
                    if (r.next > n.find(">ul >li").length - 1) {
                        r.next = 0;
                        r.looptogo = r.looptogo - 1;
                        if (r.looptogo <= 0) {
                            r.stopLoop = "on"
                        }
                    }
                    if (r.stopLoop == "on" && r.next == r.lastslidetoshow - 1) {
                        n.find(".tp-bannertimer").css({
                            visibility: "hidden"
                        });
                        n.trigger("revolution.slide.onstop");
                        r.noloopanymore = 1
                    } else {
                        i.data("tween").restart()
                    }
                    k(n, r)
                };
                i.data("tween", punchgs.TweenLite.fromTo(i, r.delay / 1e3, {
                    width: "0%"
                }, {
                    force3D: "auto",
                    width: "100%",
                    ease: punchgs.Linear.easeNone,
                    onComplete: s,
                    delay: 1
                }));
                i.data("opt", r);
                n.hover(function() {
                    if (r.onHoverStop == "on" && !Q()) {
                        n.trigger("stoptimer");
                        n.trigger("revolution.slide.onpause");
                        var i = n.find(">ul >li:eq(" + r.next + ") .slotholder");
                        i.find(".defaultimg").each(function() {
                            var n = e(this);
                            if (n.data("kenburn") != t) {
                                n.data("kenburn").pause()
                            }
                        })
                    }
                }, function() {
                    if (n.data("conthover") != 1) {
                        n.trigger("revolution.slide.onresume");
                        n.trigger("starttimer");
                        var i = n.find(">ul >li:eq(" + r.next + ") .slotholder");
                        i.find(".defaultimg").each(function() {
                            var n = e(this);
                            if (n.data("kenburn") != t) {
                                n.data("kenburn").play()
                            }
                        })
                    }
                })
            }
        };
        var Q = function() {
            var e = ["android", "webos", "iphone", "ipad", "blackberry", "Android", "webos", , "iPod", "iPhone", "iPad", "Blackberry", "BlackBerry"];
            var t = false;
            for (i in e) {
                if (navigator.userAgent.split(e[i]).length > 1) {
                    t = true
                }
            }
            return t
        };
        var G = function(e, t, n) {
            var r = t.data("owidth");
            var i = t.data("oheight");
            if (r / i > n.width / n.height) {
                var s = n.container.width() / r;
                var o = i * s;
                var u = o / n.container.height() * e;
                e = e * (100 / u);
                u = 100;
                e = e;
                return e + "% " + u + "%" + " 1"
            } else {
                var s = n.container.width() / r;
                var o = i * s;
                var u = o / n.container.height() * e;
                return e + "% " + u + "%"
            }
        };
        var Y = function(n, r, i, s) {
            try {
                var o = n.find(">ul:first-child >li:eq(" + r.act + ")")
            } catch (u) {
                var o = n.find(">ul:first-child >li:eq(1)")
            }
            r.lastslide = r.act;
            var a = n.find(">ul:first-child >li:eq(" + r.next + ")"),
                l = a.find(".slotholder"),
                c = l.data("bgposition"),
                h = l.data("bgpositionend"),
                p = l.data("zoomstart") / 100,
                d = l.data("zoomend") / 100,
                v = l.data("rotationstart"),
                m = l.data("rotationend"),
                g = l.data("bgfit"),
                y = l.data("bgfitend"),
                b = l.data("easeme"),
                w = l.data("duration") / 1e3,
                E = 100;
            if (g == t) g = 100;
            if (y == t) y = 100;
            var S = g,
                x = y;
            g = G(g, l, r);
            y = G(y, l, r);
            E = G(100, l, r);
            if (p == t) p = 1;
            if (d == t) d = 1;
            if (v == t) v = 0;
            if (m == t) m = 0;
            if (p < 1) p = 1;
            if (d < 1) d = 1;
            var T = new Object;
            T.w = parseInt(E.split(" ")[0], 0), T.h = parseInt(E.split(" ")[1], 0);
            var N = false;
            if (E.split(" ")[2] == "1") {
                N = true
            }
            l.find(".defaultimg").each(function() {
                var t = e(this);
                if (l.find(".kenburnimg").length == 0) l.append('<div class="kenburnimg" style="position:absolute;z-index:1;width:100%;height:100%;top:0px;left:0px;"><img src="' + t.attr("src") + '" style="-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;position:absolute;width:' + T.w + "%;height:" + T.h + '%;"></div>');
                else {
                    l.find(".kenburnimg img").css({
                        width: T.w + "%",
                        height: T.h + "%"
                    })
                }
                var n = l.find(".kenburnimg img");
                var i = Z(r, c, g, n, N),
                    o = Z(r, h, y, n, N);
                if (N) {
                    i.w = S / 100;
                    o.w = x / 100
                }
                if (s) {
                    punchgs.TweenLite.set(n, {
                        autoAlpha: 0,
                        transformPerspective: 1200,
                        transformOrigin: "0% 0%",
                        top: 0,
                        left: 0,
                        scale: i.w,
                        x: i.x,
                        y: i.y
                    });
                    var u = i.w,
                        a = u * n.width() - r.width,
                        p = u * n.height() - r.height,
                        d = Math.abs(i.x / a * 100),
                        v = Math.abs(i.y / p * 100);
                    if (p == 0) v = 0;
                    if (a == 0) d = 0;
                    t.data("bgposition", d + "% " + v + "%");
                    if (!f(8)) t.data("currotate", et(n));
                    if (!f(8)) t.data("curscale", T.w * u + "%  " + (T.h * u + "%"));
                    l.find(".kenburnimg").remove()
                } else t.data("kenburn", punchgs.TweenLite.fromTo(n, w, {
                    autoAlpha: 1,
                    force3D: punchgs.force3d,
                    transformOrigin: "0% 0%",
                    top: 0,
                    left: 0,
                    scale: i.w,
                    x: i.x,
                    y: i.y
                }, {
                    autoAlpha: 1,
                    rotationZ: m,
                    ease: b,
                    x: o.x,
                    y: o.y,
                    scale: o.w,
                    onUpdate: function() {
                        var e = n[0]._gsTransform.scaleX;
                        var i = e * n.width() - r.width,
                            s = e * n.height() - r.height,
                            o = Math.abs(n[0]._gsTransform.x / i * 100),
                            u = Math.abs(n[0]._gsTransform.y / s * 100);
                        if (s == 0) u = 0;
                        if (i == 0) o = 0;
                        t.data("bgposition", o + "% " + u + "%");
                        if (!f(8)) t.data("currotate", et(n));
                        if (!f(8)) t.data("curscale", T.w * e + "%  " + (T.h * e + "%"))
                    }
                }))
            })
        };
        var Z = function(e, t, n, r, i) {
            var s = new Object;
            if (!i) s.w = parseInt(n.split(" ")[0], 0) / 100;
            else s.w = parseInt(n.split(" ")[1], 0) / 100;
            switch (t) {
                case "left top":
                case "top left":
                    s.x = 0;
                    s.y = 0;
                    break;
                case "center top":
                case "top center":
                    s.x = ((0 - r.width()) * s.w + parseInt(e.width, 0)) / 2;
                    s.y = 0;
                    break;
                case "top right":
                case "right top":
                    s.x = (0 - r.width()) * s.w + parseInt(e.width, 0);
                    s.y = 0;
                    break;
                case "center left":
                case "left center":
                    s.x = 0;
                    s.y = ((0 - r.height()) * s.w + parseInt(e.height, 0)) / 2;
                    break;
                case "center center":
                    s.x = ((0 - r.width()) * s.w + parseInt(e.width, 0)) / 2;
                    s.y = ((0 - r.height()) * s.w + parseInt(e.height, 0)) / 2;
                    break;
                case "center right":
                case "right center":
                    s.x = (0 - r.width()) * s.w + parseInt(e.width, 0);
                    s.y = ((0 - r.height()) * s.w + parseInt(e.height, 0)) / 2;
                    break;
                case "bottom left":
                case "left bottom":
                    s.x = 0;
                    s.y = (0 - r.height()) * s.w + parseInt(e.height, 0);
                    break;
                case "bottom center":
                case "center bottom":
                    s.x = ((0 - r.width()) * s.w + parseInt(e.width, 0)) / 2;
                    s.y = (0 - r.height()) * s.w + parseInt(e.height, 0);
                    break;
                case "bottom right":
                case "right bottom":
                    s.x = (0 - r.width()) * s.w + parseInt(e.width, 0);
                    s.y = (0 - r.height()) * s.w + parseInt(e.height, 0);
                    break
            }
            return s
        };
        var et = function(e) {
            var t = e.css("-webkit-transform") || e.css("-moz-transform") || e.css("-ms-transform") || e.css("-o-transform") || e.css("transform");
            if (t !== "none") {
                var n = t.split("(")[1].split(")")[0].split(",");
                var r = n[0];
                var i = n[1];
                var s = Math.round(Math.atan2(i, r) * (180 / Math.PI))
            } else {
                var s = 0
            }
            return s < 0 ? s += 360 : s
        };
        var tt = function(n, r) {
            try {
                var i = n.find(">ul:first-child >li:eq(" + r.act + ")")
            } catch (s) {
                var i = n.find(">ul:first-child >li:eq(1)")
            }
            r.lastslide = r.act;
            var o = n.find(">ul:first-child >li:eq(" + r.next + ")");
            var u = i.find(".slotholder");
            var a = o.find(".slotholder");
            n.find(".defaultimg").each(function() {
                var n = e(this);
                punchgs.TweenLite.killTweensOf(n, false);
                punchgs.TweenLite.set(n, {
                    scale: 1,
                    rotationZ: 0
                });
                punchgs.TweenLite.killTweensOf(n.data("kenburn img"), false);
                if (n.data("kenburn") != t) {
                    n.data("kenburn").pause()
                }
                if (n.data("currotate") != t && n.data("bgposition") != t && n.data("curscale") != t) punchgs.TweenLite.set(n, {
                    rotation: n.data("currotate"),
                    backgroundPosition: n.data("bgposition"),
                    backgroundSize: n.data("curscale")
                });
                if (n != t && n.data("kenburn img") != t && n.data("kenburn img").length > 0) punchgs.TweenLite.set(n.data("kenburn img"), {
                    autoAlpha: 0
                })
            })
        };
        var nt = function(t, n) {
            if (Q() && n.parallaxDisableOnMobile == "on") return false;
            t.find(">ul:first-child >li").each(function() {
                var t = e(this);
                for (var r = 1; r <= 10; r++) t.find(".rs-parallaxlevel-" + r).each(function() {
                    var t = e(this);
                    t.wrap('<div style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:' + t.css("zIndex") + '" class="tp-parallax-container" data-parallaxlevel="' + n.parallaxLevels[r - 1] + '"></div>')
                })
            });
            if (n.parallax == "mouse" || n.parallax == "scroll+mouse" || n.parallax == "mouse+scroll") {
                t.mouseenter(function(e) {
                    var n = t.find(".current-sr-slide-visible");
                    var r = t.offset().top,
                        i = t.offset().left,
                        s = e.pageX - i,
                        o = e.pageY - r;
                    n.data("enterx", s);
                    n.data("entery", o)
                });
                t.on("mousemove.hoverdir, mouseleave.hoverdir", function(r) {
                    var i = t.find(".current-sr-slide-visible");
                    switch (r.type) {
                        case "mousemove":
                            var s = t.offset().top,
                                o = t.offset().left,
                                u = i.data("enterx"),
                                a = i.data("entery"),
                                f = u - (r.pageX - o),
                                l = a - (r.pageY - s);
                            i.find(".tp-parallax-container").each(function() {
                                var t = e(this),
                                    r = parseInt(t.data("parallaxlevel"), 0) / 100,
                                    i = f * r,
                                    s = l * r;
                                if (n.parallax == "scroll+mouse" || n.parallax == "mouse+scroll") punchgs.TweenLite.to(t, .4, {
                                    force3D: "auto",
                                    x: i,
                                    ease: punchgs.Power3.easeOut,
                                    overwrite: "all"
                                });
                                else punchgs.TweenLite.to(t, .4, {
                                    force3D: "auto",
                                    x: i,
                                    y: s,
                                    ease: punchgs.Power3.easeOut,
                                    overwrite: "all"
                                })
                            });
                            break;
                        case "mouseleave":
                            i.find(".tp-parallax-container").each(function() {
                                var t = e(this);
                                if (n.parallax == "scroll+mouse" || n.parallax == "mouse+scroll") punchgs.TweenLite.to(t, 1.5, {
                                    force3D: "auto",
                                    x: 0,
                                    ease: punchgs.Power3.easeOut
                                });
                                else punchgs.TweenLite.to(t, 1.5, {
                                    force3D: "auto",
                                    x: 0,
                                    y: 0,
                                    ease: punchgs.Power3.easeOut
                                })
                            });
                            break
                    }
                });
                if (Q()) window.ondeviceorientation = function(n) {
                    var r = Math.round(n.beta || 0),
                        i = Math.round(n.gamma || 0);
                    var s = t.find(".current-sr-slide-visible");
                    if (e(window).width() > e(window).height()) {
                        var o = i;
                        i = r;
                        r = o
                    }
                    var u = 360 / t.width() * i,
                        a = 180 / t.height() * r;
                    s.find(".tp-parallax-container").each(function() {
                        var t = e(this),
                            n = parseInt(t.data("parallaxlevel"), 0) / 100,
                            r = u * n,
                            i = a * n;
                        punchgs.TweenLite.to(t, .2, {
                            force3D: "auto",
                            x: r,
                            y: i,
                            ease: punchgs.Power3.easeOut
                        })
                    })
                }
            }
            if (n.parallax == "scroll" || n.parallax == "scroll+mouse" || n.parallax == "mouse+scroll") {
                e(window).on("scroll", function(e) {
                    rt(t, n)
                })
            }
        };
        var rt = function(t, n) {
            if (Q() && n.parallaxDisableOnMobile == "on") return false;
            var r = t.offset().top,
                i = e(window).scrollTop(),
                s = r + t.height() / 2,
                o = r + t.height() / 2 - i,
                u = e(window).height() / 2,
                a = u - o;
            if (s < u) a = a - (u - s);
            var f = t.find(".current-sr-slide-visible");
            t.find(".tp-parallax-container").each(function(t) {
                var n = e(this),
                    r = parseInt(n.data("parallaxlevel"), 0) / 100,
                    i = a * r;
                n.data("parallaxoffset", i);
                punchgs.TweenLite.to(n, .2, {
                    force3D: "auto",
                    y: i,
                    ease: punchgs.Power3.easeOut
                })
            });
            if (n.parallaxBgFreeze != "on") {
                var l = n.parallaxLevels[0] / 100,
                    c = a * l;
                punchgs.TweenLite.to(t, .2, {
                    force3D: "auto",
                    y: c,
                    ease: punchgs.Power3.easeOut
                })
            }
        };
        var it = function(n, r) {
            var i = n.parent();
            if (r.navigationType == "thumb" || r.navsecond == "both") {
                i.append('<div class="tp-bullets tp-thumbs ' + r.navigationStyle + '"><div class="tp-mask"><div class="tp-thumbcontainer"></div></div></div>')
            }
            var s = i.find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");
            var o = s.parent();
            o.width(r.thumbWidth * r.thumbAmount);
            o.height(r.thumbHeight);
            o.parent().width(r.thumbWidth * r.thumbAmount);
            o.parent().height(r.thumbHeight);
            n.find(">ul:first >li").each(function(e) {
                var i = n.find(">ul:first >li:eq(" + e + ")");
                var o = i.find(".defaultimg").css("backgroundColor");
                if (i.data("thumb") != t) var u = i.data("thumb");
                else var u = i.find("img:first").attr("src");
                s.append('<div class="bullet thumb" style="background-color:' + o + ";position:relative;width:" + r.thumbWidth + "px;height:" + r.thumbHeight + "px;background-image:url(" + u + ') !important;background-size:cover;background-position:center center;"></div>');
                var a = s.find(".bullet:first")
            });
            var u = 10;
            s.find(".bullet").each(function(t) {
                var i = e(this);
                if (t == r.slideamount - 1) i.addClass("last");
                if (t == 0) i.addClass("first");
                i.width(r.thumbWidth);
                i.height(r.thumbHeight);
                if (u < i.outerWidth(true)) u = i.outerWidth(true);
                i.click(function() {
                    if (r.transition == 0 && i.index() != r.act) {
                        r.next = i.index();
                        l(r, n)
                    }
                })
            });
            var a = u * n.find(">ul:first >li").length;
            var f = s.parent().width();
            r.thumbWidth = u;
            if (f < a) {
                e(document).mousemove(function(t) {
                    e("body").data("mousex", t.pageX)
                });
                s.parent().mouseenter(function() {
                    var t = e(this);
                    t.addClass("over");
                    var r = t.offset();
                    var i = e("body").data("mousex") - r.left;
                    var s = t.width();
                    var o = t.find(".bullet:first").outerWidth(true);
                    var u = o * n.find(">ul:first >li").length;
                    var a = u - s + 15;
                    var f = a / s;
                    i = i - 30;
                    var l = 0 - i * f;
                    if (l > 0) l = 0;
                    if (l < 0 - u + s) l = 0 - u + s;
                    ot(t, l, 200)
                });
                s.parent().mousemove(function() {
                    var t = e(this);
                    var r = t.offset();
                    var i = e("body").data("mousex") - r.left;
                    var s = t.width();
                    var o = t.find(".bullet:first").outerWidth(true);
                    var u = o * n.find(">ul:first >li").length - 1;
                    var a = u - s + 15;
                    var f = a / s;
                    i = i - 3;
                    if (i < 6) i = 0;
                    if (i + 3 > s - 6) i = s;
                    var l = 0 - i * f;
                    if (l > 0) l = 0;
                    if (l < 0 - u + s) l = 0 - u + s;
                    ot(t, l, 0)
                });
                s.parent().mouseleave(function() {
                    var t = e(this);
                    t.removeClass("over");
                    st(n)
                })
            }
        };
        var st = function(e) {
            var t = e.parent().find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");
            var n = t.parent();
            var r = n.offset();
            var i = n.find(".bullet:first").outerWidth(true);
            var s = n.find(".bullet.selected").index() * i;
            var o = n.width();
            var i = n.find(".bullet:first").outerWidth(true);
            var u = i * e.find(">ul:first >li").length;
            var a = u - o;
            var f = a / o;
            var l = 0 - s;
            if (l > 0) l = 0;
            if (l < 0 - u + o) l = 0 - u + o;
            if (!n.hasClass("over")) {
                ot(n, l, 200)
            }
        };
        var ot = function(e, t, n) {
            punchgs.TweenLite.to(e.find(".tp-thumbcontainer"), .2, {
                force3D: "auto",
                left: t,
                ease: punchgs.Power3.easeOut,
                overwrite: "auto"
            })
        }
    })(jQuery)
/*]]>*/
