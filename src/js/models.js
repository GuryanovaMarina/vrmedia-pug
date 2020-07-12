// import 'lightgallery';
// import 'lg-autoplay';
// import 'lg-fullscreen';
// import 'lg-hash';
// import 'lg-pager';
// import 'lg-thumbnail';
// import 'lg-video';
// import 'lg-zoom';
import Swiper from 'swiper';

$( document ).ready(function() {
  //swiper
  $(".realization__content__item__swip").each(function(index, element){
    var $this = $(this);
    // $this.addClass("instance-" + index);
    $this.find(".swiper-container").addClass("instance-" + index);
    $this.find(".swiper-button-prev-modific").addClass("btn-prev-" + index);
    $this.find(".swiper-button-next-modific").addClass("btn-next-" + index);
    $this.find(".swiper-pagination").addClass("pagination-" + index);

    if ($this.find(".swiper-slide-inner").length == 1) {
      var options = {
        direction: 'horizontal',
        navigation: {
          nextEl: ".btn-next-" + index,
          prevEl: ".btn-prev-" + index,
        },
        loop: false,
        mousewheel: true,
        keyboard: true,
        cssMode: true,
      };
      // $this.find(".swiper-button-next-modific").addClass("disable");
      // $this.find(".swiper-button-prev-modific").addClass("disable");
    } else {
      var options = {
        direction: 'horizontal',
        pagination: {
          el: '.pagination-' + index,
        },
        navigation: {
          nextEl: ".btn-next-" + index,
          prevEl: ".btn-prev-" + index,
        },
        loop: false,
      };
    }
    var swiperRealiz = new Swiper(" .instance-" + index, options);
  });
  //lightgallery
  $(".lightgallery").lightGallery();
});
