import enquire from "enquire-js";

$( document ).ready(function() {
  //LINK DOWN
  $('.title_link_js').on('click', function (e) {
    e.preventDefault();
    let offset = $(window).height();
    //offset -= 70;
    $('html, body').animate({
      scrollTop: offset
    }, 700)
  });
  enquire.register("screen and (max-width:768px)", {
    match: function () {
      $('.hero-main__description').appendTo('.hero-main__inner__wrap');
    },
    unmatch: function () {
      $('.hero-main__description').appendTo('.hero-main__inner');
      $('.hero-main__bottom').appendTo('.hero-main__inner');
    }
  });
  enquire.register("screen and (max-width:575px)", {
    match: function () {
      $('.hero-main__bottom__col.circle').appendTo('.hero-main__inner__wrap');
    },
    unmatch: function () {
      $('.hero-main__bottom__col.circle').appendTo('.hero-main__bottom');
    }
  })
});
