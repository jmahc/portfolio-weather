var Jmac = {}; //SiteName can be an abbreviation (e.g. SN for SiteName)
Jmac.development = false;
Jmac.debug = false;

Jmac.global = {}

Jmac.global.init = function() {
  var t = this;

  t.init_variables();
  t.init_methods();
}
Jmac.global.init_variables = function() {
  var t = this;
}
Jmac.global.init_methods = function() {
  var t = this;

  // Standards:
  // $(function() {
  //   var hidden = "hidden";
  //   var oldTitle = document.title;
  //   var currentTitle;
  //
  //   if (hidden in document)
  //       document.addEventListener("visibilitychange", onchange);
  //   else if ((hidden = "mozHidden") in document)
  //       document.addEventListener("mozvisibilitychange", onchange);
  //   else if ((hidden = "webkitHidden") in document)
  //       document.addEventListener("webkitvisibilitychange", onchange);
  //   else if ((hidden = "msHidden") in document)
  //       document.addEventListener("msvisibilitychange", onchange);
  //   // IE 9 and lower:
  //   else if ("onfocusin" in document)
  //       document.onfocusin = document.onfocusout = onchange;
  //   // All others:
  //   else
  //       window.onpageshow = window.onpagehide
  //           = window.onfocus = window.onblur = onchange;
  //
  //   function onchange (evt) {
  //       var v = "visible", h = "hidden",
  //           evtMap = {
  //               focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
  //           };
  //
  //       evt = evt || window.event;
  //       if (evt.type in evtMap) {
  //           currentTitle = oldTitle;
  //           $(document).attr('title', currentTitle);
  //       }
  //       else {
  //           currentTitle = this[hidden] ? "Come back!" : oldTitle;
  //           $(document).attr('title', currentTitle);
  //       }
  //     }
  //     // set the initial state (but only if browser supports the Page Visibility API)
  //     if( document[hidden] !== undefined ) {
  //         onchange({type: document[hidden] ? "blur" : "focus"});
  //     }
  // })();
}

Jmac.nav = {};

Jmac.nav.init = function () {
  var t = this;

  t.init_variables();
  t.init_methods();
}

Jmac.nav.init_variables = function() {
  var t = this;

  t.$arrow = $('.arrow.bounce');
  t.$page = $('body');
  t.$nav = $('nav');
}

Jmac.nav.init_methods = function () {
  var t = this;

  //enables navbar affix-top
  t.$nav.affix();

  //navbar affix closes arrow
  t.$nav.on('affixed.bs.affix', function () {
      t.$arrow.fadeOut(200);
  });
  t.$nav.on('affixed-top.bs.affix', function () {
      t.$arrow.fadeIn(200);
  });
  //Remove arrow bounce
  if(t.$nav.hasClass('affix'))
  {
      t.$arrow.fadeOut(200);
  }

  //enables scrollspy for navbar
  t.$page.scrollspy({target: '#navbar'});

  //smooth scrolling
  $('a[href*=#]:not([href=#])').click(function () {
    if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if(target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}

Jmac.home = {};

Jmac.home.init = function () {
    var t = this;

    t.init_variables();
    t.init_methods();
}

Jmac.home.init_variables = function () {
    var t = this;

    t.$nav = $('nav');
    t.$arrow = $('.arrow.bounce');
    t.$page = $('body');
    t.$hero = $('.homepage-hero-module');
    t.$navBar = $('#navbar');
    t.$modal = $('#myModal');
    t.$modalTrigger = $('.icon-modal');
    t.$modalTitle = $('.modal-title');
    t.$modalImage = $('.modal-image');
    t.$modalLink = $('.modal-link');
    t.$projects = $('#projects');
    t.scrollDuration = t.$projects.height();
    t.controller = new ScrollMagic.Controller({globalSceneOptions: {duration: t.scrollDuration}});
}

Jmac.home.init_methods = function () {
    var t = this;

    	// build scenes
    	new ScrollMagic.Scene({triggerElement: "#bigHalfCircle"})
    					.setClassToggle(".portfolio-item", "fade-in") // add class toggle
    					.addTo(t.controller);

    $(function () {
      //close navbar menu on click mobile
      $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click touchstart', function () {
        $(".navbar-nav li a").on('click', function(event) {
          $(".navbar-collapse").collapse('hide');
        });
      });

      function preload(arrayOfImages) {
          $(arrayOfImages).each(function(){
          $('<img/>')[0].src = this;
          // Alternatively you could use:
          // (new Image()).src = this;
            });
      }

      // Usage:

      preload([
          'images/web/2-com.png',
          'images/web/bulwark.png',
          'images/web/columbia.png',
          'images/web/cub.png',
          'images/web/horace.png',
          'images/web/red.png',
          'images/web/vf.png',
          'images/web/yanmar.png',
      ]);

      //Remove arrow bounce
      if(t.$nav.hasClass('affix'))
      {
          t.$arrow.fadeOut(200);
      }

      //video scaling
      scaleVideoContainer();
      initBannerVideoSize('.video-container .poster img');
      initBannerVideoSize('.video-container .filter');
      initBannerVideoSize('.video-container video');

      $(window).on('resize', function () {
          scaleVideoContainer();
          scaleBannerVideoSize('.video-container .poster img');
          scaleBannerVideoSize('.video-container .filter');
          scaleBannerVideoSize('.video-container video');
      });

      t.$modalTrigger.on('click', function () {
          var $item = $(this).closest('.item-information');
          var company = getCompanyInfo($item);

          t.$modalTitle.text(company.title);
          t.$modalLink.attr('href', company.link).text(company.link);
          t.$modalImage.attr('src', company.image);
      });
    });

    var getCompanyInfo = function ($elements) {
        var info = {};
        var t = $elements.find('h4').text();
        var l = $elements.find('h4').data("link");
        var x = t.split(' ');
        var site = x[0];
        var i = 'images/web/' + site.toLowerCase() + '.png';

        info.title = t;
        info.link = l;
        info.image = i;

        return info;
    };

    function scaleVideoContainer() {

        var height = $(window).height() + 5;
        var unitHeight = parseInt(height) + 'px';
        t.$hero.css('height',unitHeight);

    };

    function initBannerVideoSize(element) {

        $(element).each(function(){
            $(this).data('height', $(this).height());
            $(this).data('width', $(this).width());
        });

        scaleBannerVideoSize(element);

    };

    function scaleBannerVideoSize(element) {

        var windowWidth = $(window).width(),
        windowHeight = $(window).height() + 5,
        videoWidth,
        videoHeight;
        var windowRatio = windowHeight / windowWidth;

        $(element).each(function(){
            var videoAspectRatio = $(this).data('height')/$(this).data('width');

            $(this).width(windowWidth);

            if(windowWidth < 1000) {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;

                if($(this).hasClass('no-stretch')) {
                  var increase = 300;
                  var newW = videoWidth + increase;
                  var newH = (newW * videoHeight) / videoWidth;
                  videoWidth = newW;
                  videoHeight = newH;

                    $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

                }
                $(this).width(videoWidth).height(videoHeight);
            } else if (windowWidth > 1000) {
                if(windowRatio < 0.8 && windowRatio > 0.58) {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;
                videoWidth = (videoHeight / videoAspectRatio) + 200;

                $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
                $(this).width(videoWidth).height(videoHeight);
              }
            }

            $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
        });
    };

    Jmac.nav.init();
}

Jmac.geolocate = {};

Jmac.geolocate.init = function () {
    var t = this;

    t.init_variables();
    t.init_methods();
}

Jmac.geolocate.init_variables = function () {
    var t = this;

    t.$lookupButton = $('#lookup_coordinates');
    t.$latInput = $('#Latitude');
    t.$lngInput = $('#Longitude');
    t.baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    t.$city = $('#City');
    t.$state = $('#State');
    t.$postalCode = $('#Zip');
    t.$form = $('.user-search-weather');
}

Jmac.geolocate.init_methods = function () {
    var t = this;

    t.$lookupButton.on('click', function () {
        var address = t.$city.val() + ", " + " " + t.$postalCode.val();
        var encoded = encodeURIComponent(address);

        $.getJSON(t.baseUrl + encoded, function (data) {
            if (data && data.results.length > 0) {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;

                query = lat + "," + lng;
            } else {
                alert('Could not determine geo-coordinates for that address.  Please enter them manually.');
            }
        }).done(function() {
          console.log('The query is now' + query)
          t.$form.hide();
          getWeather();
        });
    });
}
