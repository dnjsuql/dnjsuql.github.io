var CommonVerticalParallax = (function() {

  var init = function () {
    if ($('[data-role="parallax01"]').length < 1) {
      return;
    }
    action();
  }

  var action = function () {

    var controller = new ScrollMagic.Controller();

    var parallax = '.parallax01';
    var $height = $('.parallax01__bottom').height();
    setPinTop = new ScrollMagic.Scene({
      triggerElement: parallax,
      triggerHook: 0,
      offset: 0,
      duration: $height
    })
    .setPin(parallax + '__textarea', { pushFollowers : false })
    // .addIndicators({ name: 'setpin'})
    .addTo(controller);

    var triggerHookTime;
    if($(window).width() < 500){
      triggerHookTime = 0.7
    } else {
      triggerHookTime = 0.3
    }
    setPinBottom = new ScrollMagic.Scene({
      triggerElement: parallax + '__textarea',
      triggerHook: triggerHookTime,
      offset: 0,
      reverse: false
    })
    .on("start", function(){
      $.Velocity.RunSequence([
        { e: $(parallax + '__title'), p: { opacity: 1, bottom: 0}, o: {duration: 500}},
        { e: $(parallax + '__bar'), p: { opacity: 1, height: '120px'}, o: {duration: 500}}
      ]);
    })
    // .addIndicators({ name: 'bottom'})
    .addTo(controller)
  }
  return {
    init: init
  };
})();

var CommonHalfVerticalParallax = (function() {

  var init = function () {
    if ($('[data-role="parallax02"]').length < 1) {
      return;
    }

    action();
  }

  var updateParallax = function () {
    updateLeftDuration();
    setPinLeft.duration(updateLeftDurationCallback);
    updateRightDuration();
    setPinRight.duration(updateRightDurationCallback);
  }

  var updateLeftDurationCallback = function () {
    return leftDurationValue;
  }
  var updateRightDurationCallback = function () {
    return rightDurationValue;
  }

  var updateLeftDuration = function () {
    leftDurationValue = $('.parallax02__rightinner').outerHeight(true) - $(window).height();
  }
  var updateRightDuration = function () {
    rightDurationValue = $('.parallax03__leftinner').outerHeight(true) - $(window).height();
  }

  var action = function () {

    var controller = new ScrollMagic.Controller();

    var leftParallax = '.parallax02__left';
    setPinLeft = new ScrollMagic.Scene({
      triggerElement: leftParallax,
      triggerHook: 0,
      duration:500
    })
    .setPin(leftParallax)
    //.addIndicators({ name: 'setpin'})
    .addTo(controller);


    var rightParallax = '.parallax03__right';
    setPinRight = new ScrollMagic.Scene({
      triggerElement: rightParallax,
      triggerHook: 0,
      duration: 500
    })
    .setPin(rightParallax, {pushFollowers: true})
    // .addIndicators({ name: 'setpin'})
    .addTo(controller);

  }

  return {
    init: init
  };
})();

var CommonAnimationDirection = (function() {

  var init = function () {
    if ($('[data-animation="active"]').length < 1) {
      return;
    }
    action();
  }

  var action = function () {

    var controller = new ScrollMagic.Controller();
    var active = 'active'
    var fixed = 'fixed'
    var actived = 'actived'

    var img_scale = $('[data-animation="img_scale"]');
    var img_scale_end = $('[data-animation="img_scale"]').height() / 2;
    for(var i = 0; i < img_scale.length; i++) {
      scale06 = new ScrollMagic.Scene({
        triggerElement: img_scale[i],
        triggerHook: 0.5,
        offset: 0,
        duration: img_scale_end
      })
      .on('progress', function(e) {
      //  let gage = 1 + (e.progress * 0.1)
    //    let gage = 1 + (e.progress * 0.1 / 1)
        let gage = 1.1 - (e.progress / 10)
        $('[data-animation="img_scale"]').css({'transform' : 'scale(' + gage  +')'})
      })
      // .addIndicators({ name: 'test' })
      .addTo(controller)
    }

   
    var left = $('[data-animation="left"]')
    for(var i = 0; i < left.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: left[i],
        offset: 0,
        triggerHook: 0.7,
        reverse: false
      })
      .on('start', function(e) {
        left.each(function(){
          var delay = $(this).data('animation-delay') / 1000;
          $(this).css({transition : 'all ' + delay + 's' + ' ease-out'})
        })
      })
      .setClassToggle(left[i], active)
      // .addIndicators({ name: 'left' })
      .addTo(controller);
    }

    var right = $('[data-animation="right"]')
    for(var i = 0; i < right.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: right[i],
        offset: 0,
        triggerHook: 0.7,
        reverse: false
      })
      .on('start', function(e) {
        right.each(function(){
          var delay = $(this).data('animation-delay') / 1000;
          $(this).css({transition : 'all ' + delay + 's' + ' ease-out'})
        })
      })
      .setClassToggle(right[i], active)
      // .addIndicators({ name: 'right' })
      .addTo(controller);
    }

    var bottom = $('[data-animation="bottom"]')
    for(var i = 0; i < bottom.length; i++) {
      var hook;
      if(bottom.eq(i).hasClass('product-info__anchor')){
        hook = 0.9
      } else {
        hook = 0.7
      }
      new ScrollMagic.Scene({
        triggerElement: bottom[i],
        offset: -150,
        triggerHook: hook,
        reverse: false
      })
      .on('start', function(e) {
        bottom.each(function(){
          var delay = $(this).data('animation-delay') / 1000;
          $(this).css({transition : 'all ' + delay + 's' + ' ease-out'})
        })
      })
      .setClassToggle(bottom[i], active)
      //.addIndicators({ name: 'bottom' })
      .addTo(controller);
    }

    var advercard = $('[data-animation="advercard"]')
    for(var i = 0; i < advercard.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: '#advercardTrigger',
        offset: 0,
        triggerHook: 0,
        reverse: true
      })
      .on('start', function(e) {
        advercard.each(function(){
          var delay = $(this).data('animation-delay') / 1000;
          $(this).css({transition : 'all ' + delay + 's' + ' ease-out'})
        })
      })
      .setClassToggle(advercard[i], active)
      // .addIndicators({ name: 'top' })
      .addTo(controller);
    }
    var adverstiky = $('[data-animation="adverstiky"]')
    for(var i = 0; i < adverstiky.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: '#advercardTrigger',
        offset: 0,
        triggerHook: 0,
        reverse: true
      })
      .on('start', function(e) {
        adverstiky.each(function(){
          var delay = $(this).data('animation-delay') / 1000;
          $(this).find('.banner__inner--border').css({transition : 'all ' + delay + 's' + ' ease-out'})
          $(this).find('.title__small').css({transition : 'all ' + delay + 's' + ' ease-out'})
        })
      })
      .setClassToggle(adverstiky[i], active)
      //.addIndicators({ name: 'adadad' })
      .addTo(controller);
    }
    var adverstikybox = $('[data-animation="adverstikybox"]')
    for(var i = 0; i < adverstikybox.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: '#boxTrigger',
        offset: 0,
        triggerHook: 0,
        reverse: true
      })

      .setClassToggle(adverstikybox[i], fixed)
      //.addIndicators({ name: 'adadxxxxxxxad' })
      .addTo(controller);
    }
    var clipAction = $('.clip')
    for(var i = 0; i < clipAction.length; i++) {
      var thisEl = clipAction[i];
      new ScrollMagic.Scene({
        triggerElement: '.header',
        offset: 100,
        triggerHook: 0,
        reverse: true
      })
      .setClassToggle(clipAction[i], active)
      // .addIndicators({ name: 'adadxxxxxxxad' })
      .addTo(controller);
    }
  }
  return {
    init: init
  };
})();

var CommonScrollAnimation = (function() {

  var init = function () {
    if ($('[data-scroll="active"]').length < 1) {
      return;
    }
    event();
  }

  var event = function () {
    var flag = false;
    var windowHeight = 0;
    var lastOffset =	0;

    $(window).on({
      resize: function() {
        windowHeight = $(window).height();
      },
      scroll: function(e) {
        var currentOffset = $(this).scrollTop();
        if(flag){
          e.preventDefault();
          return;
        }
        if($(this).is(':animated')) {
          return;
        }
        if(currentOffset >= windowHeight) {
          return;
        }
        if(currentOffset > lastOffset) {
          if(currentOffset < windowHeight) {
            flag = true;
            $('html, body').velocity("scroll", {
              offset: windowHeight,
              // easing: 'easeOutQuart',
              // mobileHA: false,
              // duration: 600,
              complete: function () {
                setTimeout(function() {
                  lastOffset = $(window).scrollTop();
                  flag = false;
                }, 601);
              }
            })
          }
        } else {
          if(currentOffset <= windowHeight) {
            flag = true;
            $('html, body').velocity("scroll", {
              offset: 0,
              // easing: 'easeOutQuart',
              // mobileHA: false,
              // duration: 600,
              complete: function () {
                setTimeout(function() {
                  lastOffset = $(window).scrollTop();
                  flag = false;
                }, 601);
              }
            })
          }
        }
        lastOffset = currentOffset;
      }
    })
    $(window).trigger('resize');
  }

  return {
    init: init
  };
})();

var MainParallax = (function () {

  var init = function () {
    if ($('[data-role="mainparallax"]').length < 1) {
      return;
    }
    action();
    setTimeout(function(){
      $('.parallax02__container').height($('.parallax02__rightinner').outerHeight());
      $('.parallax03').height($('.parallax03__leftinner').outerHeight());
    },1000)
  }
  
  var action = function () {
    var controller = new ScrollMagic.Controller();

    var bottomHeight = $('.mainparallax__bottom').height();
    parallax01 = new ScrollMagic.Scene({
      triggerElement: ".mainparallax",
      triggerHook: 0,
      offset: 0,
      duration: bottomHeight
    })
    .setPin(".mainparallax__section", { pushFollowers : false })
    .on('progress', function(e) {
      if(e.progress > 0.7) {
        $('.mainparallax__section .text-line').css({'visibility' : 'hidden'})
      } else {
        $('.mainparallax__section .text-line').css({'visibility' : 'visible'})
      }
    })
    // .addIndicators()
    .addTo(controller);

    animation01 = new ScrollMagic.Scene({
      triggerElement: '.mainparallax__section',
      triggerHook: 0.3,
      offset: 0,
      reverse: false
    })
    .on("start", function(){
      $.Velocity.RunSequence([
        { e: $('.mainparallax__section .fade-text'), p: { opacity: 1, bottom: 0}, o: {duration: 500}},
        { e: $('.mainparallax__section .fade-bar'), p: { height: '120px'}, o: {duration: 700}},
        { e: $('.mainparallax__section .fade-text2'), p: { opacity: 1, bottom: 0}, o: {duration: 1200}}
      ]);
    })
    // .addIndicators({ name: 'fadetext01' })
    .addTo(controller)

    var bottomHeight2 = $('.mainparallax02__bottom').height();
    parallax02 = new ScrollMagic.Scene({
      triggerElement: ".mainparallax02",
      triggerHook: 0,
      offset: 0,
      duration: bottomHeight2
    })
    .setPin(".mainparallax02__section", { pushFollowers : false })
    .on('progress', function(e) {
      if(e.progress > 0.8) {
       $('.mainparallax02__section .text-line').css({'visibility' : 'hidden'})
      } else {
       $('.mainparallax02__section .text-line').css({'visibility' : 'visible'})
      }
    })
    // .addIndicators()
    .addTo(controller);

    animation02 = new ScrollMagic.Scene({
      triggerElement: '.mainparallax02__section',
      triggerHook: 0.3,
      offset: 0,
      reverse: false
    })
    .on("start", function(){
      $.Velocity.RunSequence([
        { e: $('.mainparallax02__section .fade-text'), p: { opacity: 1, bottom: 0}, o: {duration: 500}},
        { e: $('.mainparallax02__section .fade-bar'), p: { height: '120px'}, o: {duration: 500}},
        { e: $('.mainparallax02__section .fade-text2'), p: { opacity: 1, bottom: 0}, o: {duration: 1200}}
      ]);
    })
    // .addIndicators({ name: 'fadetext02' })
    .addTo(controller)


    var scaleHeight = $('.z00s03').height();
    scale01 = new ScrollMagic.Scene({
      triggerElement: '.z00s03',
      triggerHook: 0.5,
      offset: 0,
      duration: scaleHeight
    })
    .on('progress', function(e) {
      let gage = 1.1 - (e.progress / 10)
      $('.company-info__bg--type01').css({'transform' : 'scale(' + gage  +')'})
    })
    // .addIndicators({ name: 'test' })
    .addTo(controller)

    var scaleHeight2 = $('.z00s04').height();
    scale02 = new ScrollMagic.Scene({
      triggerElement: '.z00s04',
      triggerHook: 0.5,
      offset: 0,
      duration: scaleHeight2
    })
    .on('progress', function(e) {
      let gage = 1.1 - (e.progress / 10)
      $('.company-info__bg--type02').css({'transform' : 'scale(' + gage  +')'})
    })
    // .addIndicators()
    .addTo(controller)

    var scaleHeight3 = $('.z00s05').height();
    scale03 = new ScrollMagic.Scene({
      triggerElement: '.z00s05',
      triggerHook: 0.5,
      offset: 0,
      duration: scaleHeight3
    })
    .on('progress', function(e) {
      let gage = 1.1 - (e.progress / 10)
      $('.company-info__bg--type03').css({'transform' : 'scale(' + gage  +')'})
    })
    // .addIndicators()
    .addTo(controller)
  }
  return {
    init: init,
  };
})();
