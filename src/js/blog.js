//page news
import Swiper from "swiper";

//select
  $('.select__field').on('click', function () {
    $(this).toggleClass('open');
    $(this).siblings(".select__result").toggleClass('open');
  });
  $('.select__wrapper').on('mouseleave', function () {
    let comp = $(this).find(".select__result");
    if ($(comp).hasClass('open')) {
      $(comp).removeClass('open');
      $(this).find(".select__field").removeClass('open');
    }
  });
  $('.select__result li').on('click', function (event) {
    if (!$(this).hasClass('disable')) {
      let value = $(this).attr('data-value');
      let comp = $(this).closest('.select__wrapper');
      $(comp).find('.form__fld').val(value);
      $(comp).find('.select__result').toggleClass('open');
      $(comp).find('.select__field').toggleClass('open');
      // } else {
      //   event.preventDefault();
    }
  });
//TAGS
//CLICK TAGS
$('.news__tag__item').on('click', function () {
  if ($(this).find('input').attr('id') == 'tag__all') {
    let par = $(this).parents('#news__tag');
    $(par).find('.news__tag__item').each(function( index, element ) {
      if ($(element).find('input').attr('id') == 'tag__all') {
        $(element).toggleClass('active');
        let comp = $(this).find('input');
        if ($(comp).is(':checked')) {
          $(comp).attr('checked',false);
        } else {
          $(comp).attr('checked',true);
        }
      } else {
        $( element ).removeClass('active');
        let comp = $(this).find('input');
        $(comp).attr('checked',false);
      }
    });
  } else {
    $(this).toggleClass('active');
    let comp = $(this).find('input');
    if ($(comp).is(':checked')) {
      $(comp).attr('checked',false);
    } else {
      $(comp).attr('checked',true);
    }
    let par = $(this).parents('#news__tag');
    let compAll = $(par).find('#tag__all').parent();
    $(compAll).removeClass('active');
    let compAllcb = $(compAll).find('input');
    $(compAllcb).attr('checked',false);
  }
});
//SWIPER TAGS
let swiper, isActive;
const $window = $(window);

swiperFunc();
$window.on('resize', swiperFunc);

function swiperFunc() {
  const initNeeded = $window.width() < 575;
  isActive = isActive !== undefined ? isActive : !initNeeded;

  if(initNeeded && !isActive) {
    swiper = new Swiper('#news__tag', {
      initialSlide: '1',
      slidesPerView: 'auto',
    });
    isActive = true;
  }
  if(!initNeeded && isActive) {
    if (swiper) {
      swiper.destroy(true, true);
    }
    isActive = false;
  }
}

