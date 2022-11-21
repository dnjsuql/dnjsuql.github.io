$(document).ready(function () {
  HeaderCtrl.init(); // header
  SwiperCtrl.init(); // swiper
  TopbuttonCtrl.init();

  // [e] main js

  // [s] parallax
  CommonVerticalParallax.init();
  CommonAnimationDirection.init();
  CommonHalfVerticalParallax.init();
  CommonScrollAnimation.init();
  MainParallax.init(); // main parallax
});