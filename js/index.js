$(function () {
   let video = $('video').get(0);
   video.addEventListener('canplay',()=>{//当视频准备好播放时
       $('video').css('display','block');
       //显示视频的时间
       let videoTime = getVideoTime(video.duration) ;
        $('.whole-time').text(videoTime)
   });
   $('.switch').on('click',function () {
       if($(this).hasClass('itlike-play3')){
           $(this).removeClass('itlike-play3').addClass('itlike-pause2');
           //播放
           video.play();

       }else {
           $(this).removeClass('itlike-pause2').addClass('itlike-play3');
           video.pause()
       }
   });
   video.addEventListener('timeupdate',()=>{
  /*     console.log(video.currentTime);*/
       let currentTime = getVideoTime(video.currentTime);
       $('.current-time').text(currentTime);
       //计时条动起来
       let widthProgress =  (video.currentTime/video.duration) * $('.progress').width() ;
      /* console.log(widthProgress)*/
       $('.progress-line').css('width',widthProgress)

   });
   video.addEventListener('ended',()=>{
       video.currentTime = 0;
       $('.switch').removeClass('itlike-pause2').addClass('itlike-play3')

   });
    $('.fullScreen').on('click',()=>{
        if( $('.fullScreen').hasClass('itlike-enlarge')){
            video.webkitRequestFullScreen()
        }else {
          window.webkitCancelFullScreen()
        }
    });
    $('.progress-bar').on('click',function (e) {
       let clickW = e.offsetX;
       let updateT = (clickW/$('.progress').width() )* video.duration;
       video.currentTime = updateT
    });
   function getVideoTime(time) {
       let h = Math.floor(time/(60*60));
       let m = Math.floor(time/60%60);
       let s = Math.floor(time%60);
       return  ( h < 10 ? '0'+ h : h )+ ':' + (m < 10 ? '0'+ m : m) +':'+  (s < 10 ? '0'+ s : s)
   }

});