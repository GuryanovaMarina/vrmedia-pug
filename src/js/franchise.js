import enquire from 'enquire-js';
import 'slick-carousel';


$(window).on('load', function () {
  $('.preloader path').each(function () {
    $(this).addClass('active')
  })
  setTimeout(function () {
    let preloader = $('#preloader');
    if (!preloader.hasClass('hide')) {
      preloader.addClass('hide')
    }
  }, 3200)
});

//$( document ).ready(function() {
$(function () {
  if($('.franchise__wrapper').length)
  {
    $(window).on('scroll', function () {

      if ($(window).scrollTop() > $('.franchise__first-title').offset().top) {
        $('.franchise__logo').removeClass('show')
        let slide = 0;
        for (let i = $('.franchise__slider > .franchise__slider-item').last().index(); i > 1; i--) {
          if ($('.franchise__slider-item')[i].offsetTop >= $(window).scrollTop()) {
            slide = $('.franchise__slider-item')[i].getAttribute('id').match(/\d{1,2}/)[0];
          }
        }
        $('.franchise__slider-item').each(function () {
          if ($(this).attr('id').match(/\d{1,2}/)[0] == slide - 1) {
            if ($(this).find('.franchise-title-global').text().trim() == '') {
              for (let item of $(this).prevAll()) {
                if (item.querySelector('.franchise-title-global') == null) { } else {
                  $('.franchise__text-flash').text(item.querySelector('.franchise-title-global').textContent);
                  return false;
                }
              }
              $('.franchise__text-flash').text($(this).prev().find('.franchise-title-global').text());
              return false;
            }
            if ($('.franchise__text-flash').text() == $(this).find('.franchise-title-global').text()) {
              $('.franchise__text-flash').addClass('show')
            } else {
              $('.franchise__text-flash').text($(this).find('.franchise-title-global').text());
              $('.franchise__text-flash').removeClass('show')
            }
          }
        })
      } else {
        $('.franchise__logo').addClass('show')
        $('.franchise__text-flash').removeClass('show')
      }
    });
  }

  $('.franchise__burger').on('click', function () {
    $('.franchise__burger-menu').addClass('show')
    $('.franchise__burger-menu').removeClass('hide')
    let addDelay = 1.1;

    $('.franchise__burger-menu-inner li').each(function () {
      addDelay -= 0.1;
      $(this).find('a').css('transition-delay', addDelay + 's');
    })
  })
  $('.franchise__burger-close').on('click', function () {
    $('.franchise__burger-menu').removeClass('show')
    $('.franchise__burger-menu').addClass('hide')

    $('.franchise__burger-menu-inner li').each(function () {
      $(this).find('a').css('transition-delay', '0s');
    })
  })

  $(".franchise__burger-menu-inner").on("click", "a", function (e) {
    e.preventDefault();

    $('.franchise__burger-menu').removeClass('show')
    $('.franchise__burger-menu').addClass('hide')

    $('.franchise__burger-menu-inner li').each(function () {
      $(this).find('a').css('transition-delay', '0s');
    })

    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({ scrollTop: top - 50 }, 500);

  });




  enquire.register("screen and (min-width:1000px)", {
    match: function () {
      $(document).mousemove(function (e) {
        if (e.clientX + 14 >= document.documentElement.clientWidth && e.clientY + 14 >= document.documentElement.clientHeight) {
          $('.cursor').css({ left: document.documentElement.clientWidth - 14, top: document.documentElement.clientHeight - 14 });
        } else if (e.clientX + 14 >= document.documentElement.clientWidth) {
          $('.cursor').css({ left: document.documentElement.clientWidth - 14, top: e.clientY });
        } else if (e.clientY + 14 >= document.documentElement.clientHeight) {
          $('.cursor').css({ top: document.documentElement.clientHeight - 14, left: e.clientX });
        }
        else {
          $('.cursor').css({ left: e.clientX, top: e.clientY, display: 'block' });
        }

        $('.franchise__dots li').each(function () {
          if (e.target === $('a')[0] || e.target === $('button')[0] || e.target === $('.slick-next')[0] || e.target === $('.slick-prev')[0] || e.target === $('.franchise__twelfth .form__send')[0]) {
            $('.cursor').removeClass('remove-hover');
            $('.cursor').addClass('hover');
          }
          else {
            $('.cursor').removeClass('hover')
            $('.cursor').addClass('remove-hover')
          }
        });
        for (let j = 0; j <= $('.franchise__dots li').last().index(); j++) {
          if (e.target === $('.franchise__dots li').eq(j).find('button')[0]) {
            $('.cursor').removeClass('remove-hover');
            $('.cursor').addClass('hover');
          }
        }

      })
    },
    unmatch: function () {
      $('.cursor').remove();
    }
  })


  // var wow = new WOW(); ///??????????????????
  // wow.init();

  if (document.location.href.match(/(slide)\d/)) {
    let tmp = document.location.href.match(/(slide)\d{1,2}/)[0];

    let result = getSlideIndex(tmp) - 1;

    function getSlideIndex(tmp) {
      for (let item of $('.franchise__slider-item')) {
        let slideIndex = 0;
        if (item.attributes.id.value == tmp) {
          slideIndex = tmp.match(/\d{1,2}/)[0];
          return slideIndex;
        }
      }
    }
    var slider = $('.franchise__slider').slick({
      dots: true,
      arrows: true,
      draggable: false,
      swipe: false,
      loop: false,
      dotsClass: 'franchise__dots',
      fade: true,
      initialSlide: result,
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: 1000,
          settings: "unslick"
        }
      ]
    });
    $('.franchise__join.franchise-hide').on('click', function () {
      slider.slick('slickGoTo', 10)
      for (let j = $('.franchise__dots li').last().index(); j > 0; j--) {
        $('.franchise__dots li').eq(j).addClass('active');
        $('.franchise__dots li').eq(j).removeClass('wait');
      }
    });
    for (let i = $('.franchise__dots li.slick-active').index(); i > 0; i--) {
      $('.franchise__dots li').eq(i).addClass('active');
    }
    $('.franchise__dots li.slick-active').each(function () {
      $('.franchise__wrapper').addClass('style-' + $(this).index())
    })
    for (let i = 3; i <= 5; i++) {
      if ($('.franchise__dots li').eq(i).hasClass('slick-active')) {
        $('.franchise__dots li').eq(2).addClass('wait');
        $('.franchise__dots li').eq(i).addClass('disable');
      }
    }
    if ($('.franchise__dots li').eq(6).hasClass('slick-active')) {
      $('.franchise__dots li').eq(2).removeClass('wait');
    }
    if ($('.franchise__dots li').eq(7).hasClass('slick-active')) {
      $('.franchise__dots li').eq(6).addClass('wait');
      $('.franchise__dots li').eq(7).addClass('disable');
    } else {
      $('.franchise__dots li').eq(6).removeClass('wait');
    }
    if ($('.franchise__dots li').eq(12).hasClass('slick-active')) {
      $('.franchise__dots li').eq(11).addClass('wait');
    }
    $('.franchise__join').on('click', function () {
      slider.slick('slickGoTo', 10);
      $('.franchise__wrapper .slick-next').css('display', 'none');
      if ($('.franchise__slider .slick-current').index() == $('.franchise__slider .slick-slide').last().index()) {
        $('.franchise__wrapper .slick-next').css('display', 'none');
        $(this).hide();
      }
      for (let j = $('.franchise__dots li').last().index(); j > 0; j--) {
        $('.franchise__dots li').eq(j).addClass('active');
        $('.franchise__dots li').eq(j).removeClass('wait');
      }
    });
  } else {
    var slider = $('.franchise__slider').slick({
      dots: true,
      arrows: true,
      draggable: false,
      swipe: false,
      loop: false,
      dotsClass: 'franchise__dots',
      fade: true,
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: 1000,
          settings: "unslick"
        }
      ]
    });
    $('.franchise__join.franchise-hide').on('click', function () {
      slider.slick('slickGoTo', 10);
      $('.franchise__wrapper .slick-next').css('display', 'none');
      if ($('.franchise__slider .slick-current').index() == $('.franchise__slider .slick-slide').last().index()) {
        $('.franchise__wrapper .slick-next').css('display', 'none');
        $(this).hide();
      }
      for (let j = $('.franchise__dots li').last().index(); j > 0; j--) {
        $('.franchise__dots li').eq(j).addClass('active');
        $('.franchise__dots li').eq(j).removeClass('wait');
      }
    });
  }

  $('.franchise__slider .slick-slide').each(function () {

  })

  $('.franchise__twelfth .form__send').on('click', function () {
    $('.franchise__thirteenth').addClass('show');
    setTimeout(function () {
      slider.slick('slickGoTo', 0)
    }, 1000)
    setTimeout(function () {
      $('.franchise__thirteenth').removeClass('show');
    }, 3000)
  });


  $('.franchise__dots li').on('mouseover', function () {
    if ($(this).index() == 4 || $(this).index() == 5 || $(this).index() == 3 || $(this).index() == 7) {
      $(this).addClass('active-label');
    } else {
      $(this).addClass('show-label');
    }

    for (let j = 0; j <= $(this).index(); j++) {
      $('.franchise__dots li').eq(j).addClass('active-label');
    }

    if ($(this).index() >= 2 && $(this).index() < 6) {
      $('.franchise__dots li').eq(2).addClass('show-label');
    } else {
      $('.franchise__dots li').eq(2).removeClass('show-label');
    }

    if ($(this).index() == 6 || $(this).index() == 7) {
      $('.franchise__dots li').eq(6).addClass('show-label');
    } else {
      $('.franchise__dots li').eq(6).removeClass('show-label');
    }

    for (let i = 3; i <= 5; i++) {
      if ($('.franchise__dots li').eq(i).hasClass('slick-active')) {
        $('.franchise__dots li').eq(2).addClass('wait');
        $('.franchise__dots li').eq(i).addClass('disable');
      }
    }
    if ($('.franchise__dots li').eq(6).hasClass('slick-active')) {
      $('.franchise__dots li').eq(2).removeClass('wait');
    }
    if ($('.franchise__dots li').eq(7).hasClass('slick-active')) {
      $('.franchise__dots li').eq(6).addClass('wait');
      $('.franchise__dots li').eq(7).addClass('disable');
    } else {
      $('.franchise__dots li').eq(6).removeClass('wait');
    }
    if ($('.franchise__dots li').eq(12).hasClass('slick-active')) {
      $('.franchise__dots li').eq(11).addClass('wait');
    }
  })
  $('.franchise__dots li').on('mouseout', function () {
    for (let j = 0; j <= $(this).index(); j++) {
      $('.franchise__dots li').eq(j).removeClass('active-label');
    }
    if ($(this).index() == 4 || $(this).index() == 5 || $(this).index() == 3 || $(this).index() == 7) {
      $(this).removeClass('active-label');
    } else {
      $(this).removeClass('show-label');
    }
  })


  $('#form__name').focus(function () {
    $(this).prev().addClass('active');
  });

  $('#form__email').focus(function () {
    $(this).prev().addClass('active');
  });

  $('#form__text').focus(function () {
    $(this).prev().addClass('active');
  });

  $('#form__problem').focus(function () {
    $(this).prev().addClass('active');
  });


  $('.franchise__form #form__name').focusout(function () {
    if ($(this).val() == '') {
      $(this).prev().removeClass('active');
    }
  });


  $('.franchise__slider .slick-next').on('click', function () {
    $('.franchise__slider .slick-active').find('.franchise__inner > *').addClass('animate');
    $('.franchise__dots .slick-active').addClass('active');
    let prevIndex = $('.franchise__dots .slick-active').index() - 1;
    $('.franchise__dots li').eq(prevIndex).addClass('active');
    for (let i = 3; i <= 5; i++) {
      if ($('.franchise__dots li').eq(i).hasClass('slick-active')) {
        $('.franchise__dots li').eq(2).addClass('wait');
        $('.franchise__dots li').eq(i).addClass('disable');
      }
    }
    if ($('.franchise__dots li').eq(6).hasClass('slick-active')) {
      $('.franchise__dots li').eq(2).removeClass('wait');
    }
    if ($('.franchise__dots li').eq(7).hasClass('slick-active')) {
      $('.franchise__dots li').eq(6).addClass('wait');
      $('.franchise__dots li').eq(7).addClass('disable');
    } else {
      $('.franchise__dots li').eq(6).removeClass('wait');
    }
    // if ($('.franchise__dots li').eq(13).hasClass('slick-active')) {
    //    $('.franchise__dots li').css("display", "none");
    // }
    let index = $('.slick-current').index();
    $('.franchise__wrapper').addClass('style-' + index);
    $('.franchise__wrapper').removeClass('style-' + --index);
    if (index === 9) {
      $('.franchise__wrapper .slick-next').css("display", "none");
    } else {
      $('.franchise__wrapper .slick-next').css("display", "block");
    }
  })

  $('.franchise__dots li').on('click', function () {

    if ($('.franchise__slider .slick-current').index() == $('.franchise__slider .slick-slide').last().index()) {
      $('.franchise__join.franchise-hide').hide();
      $('.franchise__wrapper .slick-next').hide();
    } else {
      $('.franchise__join.franchise-hide').show();
      $('.franchise__wrapper .slick-next').show();
    }
    if ($(this).index() < 2 || $(this).index() > 6) {
      $('.franchise__dots li').eq(2).removeClass('wait');
    }
    for (let m = 0; m <= $(this).index(); m++) {
      $('.franchise__dots li').eq(m).addClass('active');
    }
    for (let i = 0; i < $(this).index(); i++) {
      let index = $('.slick-current').index();
      $('.franchise__wrapper').removeClass('style-' + i);
      $('.franchise__wrapper').addClass('style-' + index);
      $('.franchise__dots li').eq(i).addClass('active');
      for (let i = 3; i <= 5; i++) {
        if ($('.franchise__dots li').eq(i).hasClass('slick-active')) {
          $('.franchise__dots li').eq(2).addClass('wait');
          $('.franchise__dots li').eq(i).addClass('disable');
        }
      }
      if ($('.franchise__dots li').eq(6).hasClass('slick-active')) {
        $('.franchise__dots li').eq(2).removeClass('wait');
      }
      if ($('.franchise__dots li').eq(7).hasClass('slick-active')) {
        $('.franchise__dots li').eq(6).addClass('wait');
        $('.franchise__dots li').eq(7).addClass('disable');
      } else {
        $('.franchise__dots li').eq(6).removeClass('wait');
      }
      if ($('.franchise__dots li').eq(12).hasClass('slick-active')) {
        $('.franchise__dots li').eq(11).addClass('wait');
      }
    }
    for (let j = $('.franchise__dots li').last().index(); j > $(this).index(); j--) {
      $('.franchise__dots li').eq(j).removeClass('active');
      $('.franchise__dots li').eq(j + 1).removeClass('active');
      if ($(this).index() < 2 || $(this).index() > 6) {
        $('.franchise__dots li').eq(2).removeClass('wait');
      }
      let index1 = $('.slick-current').index();
      if (index1 === 10) {
        $('.franchise__wrapper .slick-next').css("display", "none");
      } else {
        $('.franchise__wrapper .slick-next').css("display", "block");
      }
      $('.franchise__wrapper').removeClass('style-' + j);
      $('.franchise__wrapper').addClass('style-' + index1);
      for (let i = 3; i <= 5; i++) {
        if ($('.franchise__dots li').eq(i).hasClass('slick-active')) {
          $('.franchise__dots li').eq(2).addClass('wait');
          $('.franchise__dots li').eq(i).addClass('disable');
        }
      }
      if ($('.franchise__dots li').eq(6).hasClass('slick-active')) {
        $('.franchise__dots li').eq(2).removeClass('wait');
      }
      if ($('.franchise__dots li').eq(7).hasClass('slick-active')) {
        $('.franchise__dots li').eq(6).addClass('wait');
        $('.franchise__dots li').eq(7).addClass('disable');
      } else {
        $('.franchise__dots li').eq(6).removeClass('wait');
      }
      if ($('.franchise__dots li').eq(8).hasClass('slick-active')) {
        $('.franchise__dots li').eq(9).removeClass('active');
      }
      if ($('.franchise__dots li').eq(12).hasClass('slick-active')) {
        $('.franchise__dots li').eq(11).addClass('wait');
      }
    }
  })

  let testBool = true;

  $('.franchise__slider').on('wheel', (function (e) {
    e.preventDefault();

    if ($('.franchise__slider .slick-current').index() == $('.franchise__slider .slick-slide').last().index()) {
      $('.franchise__join.franchise-hide').hide();
      $('.franchise__wrapper .slick-next').hide();
    } else {
      $('.franchise__join.franchise-hide').show();
      $('.franchise__wrapper .slick-next').show();
    }

    setTimeout(function () {
      testBool = false;
    }, 500)

    if (testBool == true) {
      $('.franchise__slider .slick-active').find('h1, h3').not('.test-div').addClass('animateHideTitle');
      $('.franchise__slider .slick-active').find('p, span, ul, a, button').not('.franchise__dots, .franchise__dots button').addClass('animateHideText');
      $('.franchise__slider .slick-active').find('.franchise__inner div').not('.test-div').addClass('animateHideBlock');
      $('.franchise__slider .slick-active').find('img').addClass('animateHideImg');

      $('.franchise__slider .slick-active').next().find('h1, h3').addClass('animateShowTitle');
      $('.franchise__slider .slick-active').next().find('p, span, ul, a, button').not('.franchise__dots, .franchise__dots button').addClass('animateShowText');
      $('.franchise__slider .slick-active').next().find('.franchise__inner div').not('.test-div').addClass('animateShowBlock');
      $('.franchise__slider .slick-active').next().find('img').addClass('animateShowImg');
      $('.franchise__dots .slick-active').next().addClass('animateDots');

      $('.franchise__slider .slick-active').prev().find('h1, h3').addClass('animateShowTitle');
      $('.franchise__slider .slick-active').prev().find('p, span, ul, a, button').not('.franchise__dots, .franchise__dots button').addClass('animateShowText');
      $('.franchise__slider .slick-active').prev().find('.franchise__inner div').not('.test-div').addClass('animateShowBlock');
      $('.franchise__slider .slick-active').prev().find('img').addClass('animateShowImg');
      $('.franchise__dots .slick-active').prev().addClass('animateDots');
      setTimeout(function () {
        if (e.originalEvent.deltaY < 0) {
          $('.franchise__slider').slick('slickPrev');
        } else {
          $('.franchise__slider').slick('slickNext');
        }
        if ($('.franchise__dots li').index() < 2 || $('.franchise__dots li').index() > 6) {
          $('.franchise__dots li').eq(2).removeClass('wait');
        }
        for (let i = 3; i <= 5; i++) {
          if ($('.franchise__dots li').eq(i).hasClass('slick-active')) {
            $('.franchise__dots li').eq(2).addClass('wait');
            $('.franchise__dots li').eq(i).addClass('disable');
          }
        }
        if ($('.franchise__dots li').eq(6).hasClass('slick-active')) {
          $('.franchise__dots li').eq(2).removeClass('wait');
        }
        if ($('.franchise__dots li').eq(7).hasClass('slick-active')) {
          $('.franchise__dots li').eq(6).addClass('wait');
          $('.franchise__dots li').eq(7).addClass('disable');
        } else {
          $('.franchise__dots li').eq(6).removeClass('wait');
        }
        if ($('.franchise__dots li').eq(13).hasClass('slick-active')) {
          $('.franchise__dots li').css("display", "none");
        }
        let index = $('.slick-current').index();
        if (index === 10 || index === 13) {
          $('.franchise__wrapper .slick-next').css("display", "none");
        } else {
          $('.franchise__wrapper .slick-next').css("display", "block");
        }
        // if (index === 13) {
        //    $('.franchise__wrapper .franchise__dots').css("display", "none");
        // } else {
        //    $('.franchise__wrapper .franchise__dots').css("display", "flex");
        // }
        for (let v = 0; v <= index; v++) {
          $('.franchise__dots li').eq(v).addClass('active');
        }
        for (let c = $('.franchise__dots li').last().index(); c >= index; c--) {
          $('.franchise__dots li').eq(c).removeClass('active');
        }
        $('.franchise__wrapper').addClass('style-' + index);
        $('.franchise__wrapper').removeClass('style-' + --index);
        $('.franchise__wrapper').removeClass('style-' + (index + 2));


        setTimeout(function () {
          $('*').removeClass('animateHideTitle');
          $('*').removeClass('animateHideText');
          $('*').removeClass('animateHideBlock');
          $('*').removeClass('animateHideImg');
        }, 500);
        setTimeout(function () {
          $('*').removeClass('animateShowTitle');
          $('*').removeClass('animateShowText');
          $('*').removeClass('animateShowBlock');
          $('*').removeClass('animateShowImg');
        }, 900);
      }, 1200);
      setTimeout(function () {
        testBool = true;
      }, 1500)
    }
  }));

  $('.franchise__burger-link').on('click', function (e) {
    e.preventDefault();
    $('.franchise__burger-menu-inner li').each(function () {
      $(this).find('a').css('transition-delay', '0s');
    })
    $('.franchise__burger-menu').addClass('hide');
    $('.franchise__burger-menu').removeClass('show');
    let top = $('#slide10').offset().top;
    $('body,html').animate({ scrollTop: top }, 500);
  })


  enquire.register("screen and (max-width:1000px)", {

    match: function () {
      $('.franchise__twelfth .form__send').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
          let top = $('#slide0').offset().top;
          $('body,html').animate({ scrollTop: top }, 500);
        }, 500)
      })

      if (document.location.href.match(/(slide)\d/)) {
        let tmp = document.location.href.match(/(slide)\d{1,2}/)[0];

        let result = getSlideIndex(tmp) - 1;

        let top = $('#slide' + result).offset().top;
        $('body,html').animate({ scrollTop: top }, 500);

        function getSlideIndex(tmp) {
          for (let item of $('.franchise__slider-item')) {
            let slideIndex = 0;
            if (item.attributes.id.value == tmp) {
              slideIndex = tmp.match(/\d{1,2}/)[0];
              return slideIndex;
            }
          }
        }
      }
    }

  });

});
