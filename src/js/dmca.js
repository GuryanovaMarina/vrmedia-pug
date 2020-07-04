import 'lightgallery';
import 'lg-autoplay';
import 'lg-fullscreen';
import 'lg-hash';
import 'lg-pager';
import 'lg-thumbnail';
import 'lg-video';
import 'lg-zoom';

window.copyText = function(elem){

  var text = $('#lightgallery_remove').find(".hiddentext").html();
  var $tmp = $("<textarea>");
  $("body").append($tmp);
  $tmp.val(text).select();
  document.execCommand("copy");
  $tmp.remove();
  const comp = $( "<span class='copy_dmca__span' id='copy_dmca__span'>Текст скопирован</span>" );
  $('#copy_dmca__span').remove();
  $(elem).parent().append(comp);
  $( comp ).fadeOut( 2000 )
  //alert(comp.html() + "btnCopy");
};
$( document ).ready(function() {
  //lightgallery
  $("#lightgallery_cert").lightGallery();
  $("#lightgallery_mailbox").lightGallery();
  var $lg = $('#lightgallery_remove');
  $lg.lightGallery();
  $lg.on('onAfterAppendSubHtml.lg',function(event, index){
   // alert(index + "==index")
    if (index === 1) {
      //alert("CREATE")
      var parent = $('body').find(".lg-img-wrap");
      const comp = $( "<div class='copy_dmca' id='copy_dmca'><div class='copy_dmca__inner'><button id='btnCopy' ontouchstart='copyText(this)' onclick='copyText(this)'  ><span class='copy'></span>Копировать текст</button></div></div>" );
      $(parent).append(comp);
    }
  });
  $lg.on('onBeforeSlide.lg',function(event, prevIndex, index){
    $('.copy_dmca').remove();
  });
});
