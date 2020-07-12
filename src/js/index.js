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
      $('.hero__description').appendTo('.hero__inner__wrap');
    },
    unmatch: function () {
      $('.hero__description').appendTo('.hero__inner');
      $('.hero__bottom').appendTo('.hero__inner');
    }
  })
});
