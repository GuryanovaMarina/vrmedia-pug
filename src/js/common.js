import 'remodal';
//VALIDATION
function validate (target) {
  try {
    //email in footer
    const value = $(target).val();
    const field_name = $(target).attr("id");
    switch(field_name) {
      case 'form__email__footer':
        if (validateEmail(value)) {
          $(target).parent(".form__block").addClass('valid');
          return true;
        } else {
          $(target).parent(".form__block").removeClass('valid');
          return false;
        }
      case 'form_email_modal':
        const comp_parent = $(target).parent(".form__block");
        const comp_grand_parent = $(comp_parent).parent(".form__block__wrap");
        const comp_lbl_error = $(comp_grand_parent).find(".form__error");
        if (validateEmail(value)) {
          comp_parent.removeClass('error');
          comp_lbl_error.removeClass('visible');
          return true;
        } else {
          if (validatePhone(value)) {
            comp_parent.removeClass('error');
            comp_lbl_error.removeClass('visible');
            return true;
          } else {
            comp_parent.addClass('error');
            comp_lbl_error.addClass('visible');
            $(target).focus();
            return false;
          }
        }
    }
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
function  validatePhone (phone) {
  try {
    const re = /^(\+|\d)[\d\(\)\ -]{5,14}\d$/;
    return re.test(phone);
  } catch (err) {
    alert(err);
  }
}

$( document ).ready(function() {
  //MODAL WINDOWS
  let modal = $('[data-remodal-id=modal]').remodal();
  let modal_success = $('[data-remodal-id=modal_success]').remodal();
  $('.remodal').on('opening', function (e) {
    $('.form__fld__js').focus();
  });
  $('.remodal').on('closing', function (e) {
    e.preventDefault();
    return false
   if (e.reason === 'confirmation') {
     modal_success.open();
   }
  });
  $('.lnk__open-modal-js').on('click', function (e) {
    const type = $(this).attr("data-model-type");
    modal.open();
    switch(type) {
      case '1':
        $('#div_question_modal').css('display','none');
        break;
      case '2':
        break;
    }
  });
  $('#btn_submit').on('click', function (e) {
    const valid = validate($('#form_email_modal'));
    if (valid) {
      modal.close();
      modal_success.open();
    } else {
      return false
    }
  });
  //VALIDATION
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
  $('#form_email_modal').keyup(function () {
    validate($(this));
  });
  // HEADER
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
    $(this).removeClass('visible');
    $('.header__close').addClass('visible');
    $('.header__top').css('background-color', '#222934');
  });
  $('.header__close').on('click', function () {
    $('.header__menu-list').removeClass('active');
    $('.dropdown__list__telegram').removeClass('visible');
    $(this).removeClass('visible');
    $('.burger').addClass('visible');
    $('.header__top').css('background-color', '#171e29');
  })
});

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
});
