import 'remodal';

function validate (target) {
  try {
    //email in footer
    const email = $(target).val();
    if (validateEmail(email)) {
      $(target).parent(".form__block").addClass('valid');
    } else {
      $(target).parent(".form__block").removeClass('valid');
    }
    return false;
  } catch (err) {
    alert(err);
  }
}
function  validateEmail (email) {
  try {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } catch (err) {
    alert(err);
  }
}
$( document ).ready(function() {
  // window.REMODAL_GLOBALS = {
  //   NAMESPACE: 'remodal',
  //   DEFAULTS: {
  //   }
  // };
 //let options = {...};
  let modal_send = $('[data-remodal-id=modal_send]').remodal();
  let modal_question = $('[data-remodal-id=modal_question]').remodal();
  let modal_success = $('[data-remodal-id=modal_success]').remodal();

  //let inst = $('[data-remodal-id=modal]').remodal();
  $('.openmodal').on('click', function (e) {
    e.preventDefault();
    modal_question.open();
  });

  $('.remodal').on('opening', function (e) {
    $('.form__fld__js').focus();
  });
  $('.remodal').on('closing', function (e) {
   if (e.reason === 'confirmation') {
     modal_success.open();
   }
  });

  // $(document).on('opening', '.remodal', function () {
  //   $('.form__fld').focus();
  // });

  $('.form__fld').focus(function () {
    $(this).prev().addClass('active');
  });
  $('.form__fld').focusout(function () {
    if ($(this).val() == '') {
      $(this).prev().removeClass('active');
    } else if ($(this).val() !== '') {
      $(this).prev().addClass('active');
    }
  });
  $('#form__email__footer').keyup(function () {
    validate($(this));
  });
  // header
  $('.header__telegram__button').on('click', function(){
    let $this = $(this);
    $this.toggleClass('visible');
    let comp = $this.parent('.header__telegram__wrap');
    $(comp).find('.dropdown__list__telegram').toggleClass('visible');
  });
  $('.header__telegram__button .dropdown__list__telegram').on('click', function(event){
    event.stopPropagation();
  });

    $('.header__telegram .dropdown__list__telegram').on('mouseleave', function () {
      let $this = $(this);
      if (window.innerWidth > 991) {
        $this.removeClass('visible');
        $this.parent('.header__telegram__button').removeClass('visible');
      } else {
        $this.addClass('visible');
        $this.parent('.header__telegram__button').addClass('visible');
      }
    });


  $('.burger').on('click', function () {
    $('.header__menu-list').addClass('active');
    $('.dropdown__list__telegram').addClass('visible');
  })
  $('.header__close').on('click', function () {
    $('.header__menu-list').removeClass('active');
    $('.dropdown__list__telegram').removeClass('visible');
  })

});
//???????
$(window).on('scroll', function () {
  const offset = 150;
  const html = $('html').scrollTop();
  if (!$('.header__menu-list').hasClass('active')) {
    if (offset <= html) {
      $('.header__top').addClass('active');
    } else {
      $('.header__top').removeClass('active');
    }
  }

  // if ($('.header__top').hasClass('header__other-page')) {
  //   if (offset <= html) {
  //     $('.header__top').addClass('active');
  //     $('.header__top').removeClass('active-static');
  //   } else {
  //     $('.header__top').removeClass('active');
  //     $('.header__top').addClass('active-static');
  //   }
  // } else {
  //   if (offset <= html) {
  //     $('.header__top').addClass('active');
  //   } else {
  //     $('.header__top').removeClass('active');
  //   }
  // }



});
