var audio_files = {};

$(function () {

    var toggleAudio = function(target) {
      var audio_id = $(target).data('audio-id');
      var audio_title = $(target).data('audio-title');
      var audio = audio_files[audio_id];
      var currentlyPlaying = $('.currently-playing');
      if (audio.paused) {
        stopAllAudio();
        audio.play();
        audio.onended = function() {
          stopAllAudio();
        }

        currentlyPlaying.removeClass('disabled');
        $('.playing-text').html(audio_title);
        $(target).find('.audio-cell').addClass('paused');
      }else{
        stopAllAudio();
        currentlyPlaying.addClass('disabled');
        $('.playing-text').html('Nothing selected...');
        $(target).find('.audio-cell').removeClass('paused');
        audio.pause();
      }
    }

    var stopAllAudio = function() {
      for (var i in audio_files) {
        var audio = audio_files[i];
        $('.js-AudioFiles').find('.audio-cell').removeClass('paused');
        $('.currently-playing').addClass('disabled');
        $('.playing-text').html('Nothing selected...');
        audio.pause();
      }
    }

    $('.js-playAudio').click(function() {
      var audio_id = $(this).data('audio-id');
      var audio = audio_files[audio_id];
      if (audio_files[audio_id] == undefined || audio_files[audio_id] == -1) {
        audio = new Audio('audio/'+audio_id+'.mp3');
        audio_files[audio_id] = audio;
      }
      toggleAudio(this);
    });

    $('#welcome_modal').modal('show');
});
