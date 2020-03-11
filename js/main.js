(function() {
  "use strict";

  // iPad and iPod detection
  var isiPad = function() {
    return navigator.platform.indexOf("iPad") != -1;
  };

  var isiPhone = function() {
    return (
      navigator.platform.indexOf("iPhone") != -1 ||
      navigator.platform.indexOf("iPod") != -1
    );
  };

  // Carousel Feature Slide
  var testimonialCarousel = function() {
    var owl = $(".owl-carousel-fullwidth");
    owl.owlCarousel({
      animateOut: "fadeOut",
      items: 1,
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      smartSpeed: 800,
      autoHeight: false
    });
  };

  var sliderMain = function() {
    $("#qbootstrap-slider-hero .flexslider").flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function() {
        setTimeout(function() {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function() {
        setTimeout(function() {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      }
    });
  };

  // animate-box
  var contentWayPoint = function() {
    $(".animate-box").waypoint(
      function(direction) {
        if (direction === "down" && !$(this).hasClass("animated")) {
          $(this.element).addClass("fadeInUp animated");
        }
      },
      { offset: "75%" }
    );
  };

  // Burger Menu
  var burgerMenu = function() {
    $("body").on("click", ".js-qbootstrap-nav-toggle", function(event) {
      if ($("#navbar").is(":visible")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }

      event.preventDefault();
    });
  };

  // Parallax
  var parallax = function() {
    if (!isiPad() || !isiPhone()) {
      $(window).stellar();
    }
  };

  // Page Nav
  var clickMenu = function() {
    $('a:not([class="external"])').click(function(event) {
      var section = $(this).data("nav-section"),
        navbar = $("#navbar");
      $("html, body").animate(
        {
          scrollTop: $('[data-section="' + section + '"]').offset().top
        },
        500
      );

      if (navbar.is(":visible")) {
        navbar.removeClass("in");
        navbar.attr("aria-expanded", "false");
        $(".js-qbootstrap-nav-toggle").removeClass("active");
      }

      event.preventDefault();
      return false;
    });
  };

  // Reflect scrolling in navigation
  var navActive = function(section) {
    var $el = $("#navbar > ul");
    $el.find("li").removeClass("active");
    $el.each(function() {
      $(this)
        .find('a[data-nav-section="' + section + '"]')
        .closest("li")
        .addClass("active");
    });
  };
  var navigationSection = function() {
    var $section = $("div[data-section]");

    $section.waypoint(
      function(direction) {
        if (direction === "down") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: "150px"
      }
    );

    $section.waypoint(
      function(direction) {
        if (direction === "up") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: function() {
          return -$(this.element).height() + 155;
        }
      }
    );
  };

  // Animations
  var contentWayPoint = function() {
    var i = 0;
    $(".animate-box").waypoint(
      function(direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function() {
            $("body .animate-box.item-animate").each(function(k) {
              var el = $(this);
              setTimeout(
                function() {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated");
                  } else {
                    el.addClass("fadeInUp animated");
                  }

                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 50);
        }
      },
      { offset: "85%" }
    );
  };

  var inlineSVG = function() {
    $("img.svg").each(function() {
      var $img = $(this);
      var imgID = $img.attr("id");
      var imgClass = $img.attr("class");
      var imgURL = $img.attr("src");

      $.get(
        imgURL,
        function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find("svg");

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== "undefined") {
            $svg = $svg.attr("id", imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass + " replaced-svg");
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr("xmlns:a");

          // Replace image with new SVG
          $img.replaceWith($svg);
        },
        "xml"
      );
    });
  };

  // Set the date we're counting down to
  var countDownDate = new Date("Apr 11, 2020 09:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in an element with id="demo"
    // document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
    // + minutes + "Minutes " + seconds + "Seconds ";

    // Display the result in an element with id="demo"
    document.getElementById("days").innerHTML = days + " <small>days</small>";
    document.getElementById("hours").innerHTML =
      hours + " <small>hours</small> ";
    document.getElementById("minutes").innerHTML =
      minutes + " <small>minutes</small> ";
    document.getElementById("seconds").innerHTML =
      seconds + " <small>seconds</small> ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML =
        "The Wedding Ceremony is Over";
    }
  }, 1000);

  var tapOrClick = function(e) {
    if (document.getElementById("mySound").paused) {
      document.getElementById("mySound").play();
    }
  };

  var load_wishes = function(firebase) {
    firebase
      .database()
      .ref("/wishes/")
      .once("value")
      .then(function(snapshot) {
        $("#container-wishes").empty();
        snapshot.forEach(function(childNodes) {
          var wish_dom = $(".wish-message-item")
            .first()
            .clone();
          wish_dom.find(".wish-message").html(childNodes.val().wish);
          wish_dom.find(".wish-author").html(childNodes.val().nama);
          $("#container-wishes").append(wish_dom.show());
        });
      });
  };

  function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }
  // Document on load.

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCQzj146hVPxeHuPeXW9Ti3_Qq4AkytPAI",
    authDomain: "dianwidodo-cad38.firebaseapp.com",
    databaseURL: "https://dianwidodo-cad38.firebaseio.com",
    projectId: "dianwidodo-cad38",
    storageBucket: "dianwidodo-cad38.appspot.com",
    messagingSenderId: "705240339969",
    appId: "1:705240339969:web:1efba0394ee440cf8cd200",
    measurementId: "G-WHLMQRG2GT"
  };

  var slickConfig = {
    slidesToShow: 2,
    autoplay: true,
    dot: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  $(function() {
    burgerMenu();
    testimonialCarousel();
    sliderMain();
    clickMenu();
    parallax();
    navigationSection();
    contentWayPoint();
    inlineSVG();
    var query = window.location.search.substring(1);
    var qs = parse_query_string(query);
    if (typeof qs.nama !== "undefined") {
      $("#inviteModal").modal("show");
      $(".ivite-name").html(qs.nama);

      $("#inviteModal").on("hidden.bs.modal", tapOrClick);
    }

    document
      .getElementById("mainHeader")
      .addEventListener("mouseup", tapOrClick, false);
    document
      .getElementById("mainHeader")
      .addEventListener("touchend", tapOrClick, false);
    document
      .getElementById("mainHeader")
      .addEventListener("scroll", tapOrClick, false);

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error ", errorCode, errorMessage);
        $(".row-wish").hide();
      });
    firebase
      .database()
      .ref("/wishes/")
      .once("value")
      .then(function(snapshot) {
        $("#container-wishes").html("");
        snapshot.forEach(function(childNodes) {
          var wish_dom = $(".wish-message-item")
            .first()
            .clone();
          wish_dom.find(".wish-message").html(childNodes.val().wish);
          wish_dom.find(".wish-author").html(childNodes.val().nama);
          $("#container-wishes").append(wish_dom.show());
        });
        $("#container-wishes").slick(slickConfig);
      });
    $(".form-wish").on("submit", function(e) {
      e.preventDefault();
      var form = $(this);
      form.parsley().validate();
      if (form.parsley().isValid()) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            firebase
              .database()
              .ref("wishes/" + uid)
              .set({
                nama: form.find('input[name="name"]').val(),
                wish: form.find('input[name="wish"]').val()
              });

            $("#inviteModal").modal("show");
            $(".ivite-name").html(form.find('input[name="name"]').val());
            $(".invite-desc").html("Thank you for your lovely wedding message");
            $(".form-wish").each(function() {
              this.reset();
            });
            firebase
              .database()
              .ref("/wishes/")
              .once("value")
              .then(function(snapshot) {
                $("#container-wishes").html("");
                snapshot.forEach(function(childNodes) {
                  var wish_dom = $(".wish-message-item")
                    .first()
                    .clone();
                  wish_dom.find(".wish-message").html(childNodes.val().wish);
                  wish_dom.find(".wish-author").html(childNodes.val().nama);
                  $("#container-wishes").append(wish_dom.show());
                });
                $("#container-wishes").slick("unslick");
                $("#container-wishes").slick(slickConfig);
              });
          }
        });
      }
    });
  });
})();
