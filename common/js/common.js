$(function () {
  var ua = navigator.userAgent;
  $('#js-trigger-toggle a').click(function () {
    $('#js_navTrigger').removeClass('open');
    $('#js_gNav').hide();
    var $this = $('#js_navTrigger').find('img');
    $this.removeClass("on");
    $this.attr('src', $this.attr('src').replace("_c", "_o"));
  });
  //  if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){

  //sp navigation
  $('#js_navTrigger').click(function () {
    $(this).toggleClass('open');
    if ($(this).hasClass('open')) {
      $('#js_gNav').slideDown();
    } else {
      $('#js_gNav').slideUp();
    }
    return false;
  });
  $(".switch").on('click', function () {
    if ($(this).attr("class") == "switch") {
      this.src = this.src.replace("_o", "_c");
    } else {
      this.src = this.src.replace("_c", "_o");
    }
    $(this).toggleClass("on");
  });
  //smooth scroll
  $('a[href^="#"]').click(function () {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    if (768 >= $(window).width()) {
      var position = target.offset().top - 80;
    }
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });
  //image change
  var $setElem = $('.imgChange'),
    pcName = '_pc', //PC版のファイル名
    spName = '_sp', //スマホ版のファイル名
    replaceWidth = 960; //切り替える画面サイズ
  $setElem.each(function () {
    var $this = $(this);

    function imgSize() {
      var windowWidth = window.innerWidth;
      if (windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(spName, pcName)).css({
          visibility: 'visible'
        });
      } else if (windowWidth < replaceWidth) {
        $this.attr('src', $this.attr('src').replace(pcName, spName)).css({
          visibility: 'visible'
        });
      }
    }
    $(window).resize(function () {
      imgSize();
    });
    imgSize();
  });
  //switch

  var topBtn = $('#js-btn-top');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }


  });
  //      $(window).on('load resize scroll', function () {
  //        var scroll = $(window).scrollTop() + ($(window).height() * 0.9);
  //        $('.fadeIn').each(function (k, v) {
  //          var $this = $(this);
  //          var target = $this.offset().top;
  //          if (scroll >= target) {
  //            $this.addClass('fadeInUp');
  //          }
  //        });
  //      });

  $('#js-dobbletap:has(.mega-menu)').doubleTapToGo();

  $(window).on('load scroll resize', function () {
    $('.fadein').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight + 100) {
        $(this).addClass('scrollin');
      }
    });
  });
  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') < 0 && ua.indexOf('Android') < 0) {
    $('a[href^="tel:"]').css('cursor', 'default').click(function (event) {
      event.preventDefault();
    });
  }

  $('a.exlink-dialog').on('click',function(event){
    event.preventDefault();
    var href = $(this).attr('href');
    if(!confirm('外部サイトに移動します。よろしいですか？')){
      return false;
    } else {
      window.open(href, '_blank');
    }
  });

});
/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/



(function ($, window, document, undefined) {
  $.fn.doubleTapToGo = function (params) {
    if (!('ontouchstart' in window) &&
      !navigator.msMaxTouchPoints &&
      !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;

    this.each(function () {
      var curItem = false;

      $(this).on('click', function (e) {
        var item = $(this);
        if (item[0] != curItem[0]) {
          e.preventDefault();
          curItem = item;
        }
      });

      $(document).on('click touchstart MSPointerDown', function (e) {
        var resetItem = true,
          parents = $(e.target).parents();

        for (var i = 0; i < parents.length; i++)
          if (parents[i] == curItem[0])
            resetItem = false;

        if (resetItem)
          curItem = false;
      });
    });
    return this;
  };
})(jQuery, window, document);
