var audio_files = {};

$(function () {
    $('.js-playAudio').click(function() {
      var audio_id = $(this).data('audio-id');
      var audio = audio_files[audio_id];
      if (audio_files[audio_id] == undefined || audio_files[audio_id] == -1) {
        audio = new Audio('audio/'+audio_id+'.mp3');
        audio_files[audio_id] = audio;
      }

      if (audio.paused) {
        stopAllAudio();
        audio.play();
        $(this).find('.audio-cell').addClass('paused');
      }else{
        stopAllAudio();
        $(this).find('.audio-cell').removeClass('paused');
        audio.pause();
      }

    });

    var stopAllAudio = function() {
      for (var i in audio_files) {
        var audio = audio_files[i];
        $('.js-AudioFiles').find('.audio-cell').removeClass('paused');
        audio.pause();
      }
    }
});
