$(function () {
    let video = $('video').get(0)
   initVideo(video);
   initVolume(video);
   /*初始化音乐播放*/
   function initVideo(obj) {
       let video = obj;
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
               video.volume = 0.5;
              console.log(video.volume)
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
         /*  console.log(e.target);*/
           let updateT = (clickW/$('.progress').width() )* video.duration;
           video.currentTime = updateT
       });
       function getVideoTime(time) {
           let h = Math.floor(time/(60*60));
           let m = Math.floor(time/60%60);
           let s = Math.floor(time%60);
           return  ( h < 10 ? '0'+ h : h )+ ':' + (m < 10 ? '0'+ m : m) +':'+  (s < 10 ? '0'+ s : s)
       }
   }
       /*初始化音量*/
      function initVolume(obj) {
          let video = obj;
          let voiceBtn = $('.voice-btn').get(0);
          let voicePlay = $('.play-icon').get(0);
          let voiceVal=$('.voice-value').get(0);
          let voiceBackG = $('.voice-control-box').get(0);
          let voiceBG = $('.voice-bg').get(0);
          let clientH = 0;
          let playH = 0;
          $(voicePlay).css('height',56);
          $(voiceBtn).css('bottom', 51);
          $(voiceVal).text(50 + '%');
          $(voiceBG).on('click',function (e){
              if (e.stopPropagation) {
                  e.stopPropagation()
              } else {
                  e.cancelBubble = true
              }
                    console.log(e.target);
                    voiceBackG.parentNode.style.display = 'block';
                    clientH = e.offsetY;
                    let bgHeight = voiceBackG.offsetHeight;
                    playH = bgHeight - clientH;
                    let voiceValue = parseInt(((bgHeight - clientH) / bgHeight) * 100) + '%';
                    $(voicePlay).css('height', playH);
                    $(voiceBtn).css('bottom', playH - 5);
                    $(voiceVal).text(voiceValue);
                    video.volume = ((bgHeight - clientH) / bgHeight).toFixed(1);
                    console.log(video.volume);
                    clientH = 0;
                    playH = 0;
          });

      }
});