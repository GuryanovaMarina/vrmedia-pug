$( document ).ready(function() {
  $('.title_link_js').on('click', function (e) {
    e.preventDefault();
    let offset = $(window).height();
    //offset -= 70;
    $('html, body').animate({
      scrollTop: offset
    }, 700)
  });
});
