// const { active } = require("browser-sync");

// swiper
var SwiperCtrl = (function () {
  // main : top
  var swiperMain = function() {
    var video = $(".video__item video");
    var swiper = new Swiper('.video__carousel', {
      effect: 'fade',
      autoplay : {
        delay : 5000,
        disableOnInteraction : false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
    swiper.on('slideChange', function () {
      if(swiper.activeIndex === 0){
        video[0].currentTime = 0;
      }
    });
  }
  var swiperMainMob = function() {
    var video = $(".video__item video");
    var swiper = new Swiper('.main-swiper', {
      effect: 'fade',
      autoplay : {
        delay : 5000,
        disableOnInteraction : false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
    swiper.on('slideChange', function () {
      if(swiper.activeIndex === 0){
        video[0].currentTime = 0;
      }
    });
  }
  // main : directiors
  var swiperDirectiors = function(){
    var swiper = new Swiper('.directors__list', {
      loop: true,
      touchRatio: 0,
      autoheight:'true',
      effect: 'fade',
      pagination: {
          el: '.directors__pagination',
          clickable: true,
          renderBullet: function (index, className) {
              return '<span class="' + className + '">' + "0" + (index + 1) + '</span>';
          },
      },
    });
  }

  // main : semiconductor
  var swiperSemiconductor = function() {
    slide = {
      self: '.semiconductor__slide',
      item: '.semiconductor__item',
      bullet: '.swiper-pagination-bullet',
      bulletActive: '.swiper-pagination-bullet-active',
      progress: '.semiconductor__timerbar'
    }

    box = {
      list: '.semiconductor-box__list',
      item: '.semiconductor-box__item',
      text: '.semiconductor-box__text',
      image: '.semiconductor-box__background img'
    }

    swiper = new Swiper(slide.self, {
      allowTouchMove: false,
      autoplay : {
        delay : 3000,
        disableOnInteraction : false,
      },
      pagination: {
        el: '.semiconductor__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<button type="button" class="' + className + '">' + $(slide.item).eq(index).attr('data-name') +
          '<span class="semiconductor__timer"> <span class="semiconductor__timerbar"> </span>' + '</button>';
        }
      }
    });

    var slideItem = $(box.list).find(box.item);

    $(slide.bulletActive).find(slide.progress).animate({width: '100%'});
    slideItem.eq(0).css({'z-index' : '5'}).siblings().css({'z-index' : '1'});
    slideItem.eq(0).find(box.image).css({'transform' : 'scale(1.1)'}).parents(box.item).siblings().find(box.image).css({'transform' : 'scale(2.0)', 'bottom' : '-200px'});
    slideItem.eq(0).find(box.text).css({'opacity' : '1', 'bottom' : '0'}).parents(box.item).siblings().find(box.text).css({'opacity' : '0', 'bottom' : '-30px'});

    swiper.on('slideChange', function() {
      var activeIndex = swiper.activeIndex;
      slideItem.eq(activeIndex).css({'z-index' : '5'}).siblings().css({'z-index' : '1'});
      slideItem.eq(activeIndex).find(box.image).css({'transform' : 'scale(1.1)', 'bottom' : '0'}).parents(box.item).siblings().find(box.image).css({'transform' : 'scale(2.0)', 'bottom' : '-200px'});
      slideItem.eq(activeIndex).find(box.text).css({'opacity' : '1', 'bottom' : '0'}).parents(box.item).siblings().find(box.text).css({'opacity' : '0', 'bottom' : '-30px'});
      $(slide.bulletActive).find(slide.progress).animate({width: '100%'});
      $(slide.bullet).find(slide.progress).css({width: 0});
    });

  }

  var init = function () {
    swiperMain();
    swiperMainMob();
    swiperDirectiors();
    swiperSemiconductor();
  };
  return {
    init: init
  };
})();

// top button
var TopbuttonCtrl = (function () {
  var $window, $obj;

  var displayDetectOffset = function() {
  //  if($window.scrollTop() > $('.sub').height() / 2) {
    if($window.scrollTop()) {
      $obj.this.fadeIn();
    } else {
      $obj.this.hide();
    }
  }

  var event = function(){
    $window.on('scroll', function(){
      var documentHeight = $(document).height();
      var footerHeight = $('.footer').innerHeight();
      var stopOffset = documentHeight - footerHeight - $obj.height - $obj.space;
      var restartOffset = documentHeight - footerHeight - $window.height()

      displayDetectOffset();

      if($obj.this.offset().top > stopOffset) {
        $obj.this.addClass('actived');
      }

      if($window.scrollTop() < restartOffset) {
        $obj.this.removeClass('actived');
      }
    });
    $obj.this.on('click', function(e){
      e.preventDefault();
      $('html, body, .popup__content, .popup').animate({scrollTop : 0}, 500);
      if($('.popup__header').hasClass('actived')){
        $('.popup__header').removeClass('actived')
      }
    })
  }
  var init = function(){
    if ($('.footer,.popup-footer').length < 1) {
      return;
    }

    $window = $(window);

    $obj = {
      this: $('.top-button'),
      height: $('.top-button').height(),
      space: 24
    }

    event();
    displayDetectOffset();
  }
  return {
    init: init
  }
})();
