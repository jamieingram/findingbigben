var audio_files = {};
var current_audio_id = 0;
//
$(function () {


  var modal_hidden = Cookies.get('modal-hidden');
  if (!modal_hidden) {
    $('#welcome_modal').modal('show');
    $('#welcome_modal').on('hidden.bs.modal', function () {
      //set a cookie once someone has closed the modal
      Cookies.set('modal-hidden', true, { expires: 7 });
    });
  }

  var toggleAudio = function(target) {
    var audio_id = $(target).data('audio-id');
    var audio_title = $(target).data('audio-title');
    //
    if (audio_id != current_audio_id) {
      //we are controlling a different audio file - stop the old one
      if (current_audio_id > 0) {
        var current_audio = audio_files[current_audio_id];
        var current_target = $('.js-playAudio[data-audio-id='+current_audio_id+']');
        $(current_target).find('.status-icon').removeClass('fa-pause-circle-o').addClass('fa-play-circle-o');
        current_audio.pause();
      }
      updatePlayStatus(false, false);
      highlightItem(audio_id);
      //
      current_audio_id = audio_id;
    }
    var audio = audio_files[audio_id];
    //
    if (audio.paused) {
      audio.play();
      updatePlayStatus(true, false, audio_title);
      $(target).find('.status-icon').removeClass('fa-play-circle-o').addClass('fa-pause-circle-o');
    }else{
      audio.pause();
      updatePlayStatus(false, true);
      $(target).find('.status-icon').removeClass('fa-pause-circle-o').addClass('fa-play-circle-o');
    }
  }

  var formatTime = function(seconds) {
    var output_str = "";
    var num_mins = Math.floor(seconds / 60);
    var num_secs = Math.round(seconds - (num_mins * 60));
    var output_str = "";
    if (num_mins < 10) {
      output_str = "0"+num_mins;
    }else{
      output_str = num_mins;
    }
    output_str += ":";
    if (num_secs < 10) {
      output_str += "0"+num_secs;
    }else{
      output_str += num_secs;
    }
    return output_str;
  }

  var updatePlayStatus = function(is_playing, is_paused, audio_title) {
    var icon = $('#progress-icon');
    var currentlyPlaying = $('.currently-playing');
    if (is_playing) {
      //track is playing - show the title
      currentlyPlaying.removeClass('disabled');
      $('.playing-text').html(audio_title);
      //update the icon
      icon.removeClass('fa-play-circle-o').addClass('fa-pause-circle-o');
    }else if (is_paused) {
      //just change the icon status
      icon.removeClass('fa-pause-circle-o').addClass('fa-play-circle-o');
    }else{
      //the audio has stopped - reset the display
      currentlyPlaying.addClass('disabled');
      $('.playing-text').html('Nothing selected...');
      icon.removeClass('fa-play-circle-o').addClass('fa-pause-circle-o');
    }
  }

  var highlightItem = function(item_num) {
    for (var i = 0 ; i < 12 ; i++) {
      var block = $('.month'+(i+1));
      if (item_num > 0) {
        if (i == (item_num - 1)) {
          block.fadeTo(50, 1);
        } else{
          block.fadeTo(50, 0.5);
        }
      }else{
        //fade all items back in
        block.fadeTo(50, 1);
      }
    }
  }

  $('.js-playAudio').click(function(e) {
    e.preventDefault();
    var audio_id = $(this).data('audio-id');
    var audio = audio_files[audio_id];
    if (audio_files[audio_id] == undefined || audio_files[audio_id] == -1) {
      audio = new Audio('audio/'+audio_id+'.mp3');
      $(audio).data('audio-id', audio_id);
      audio.onended = function() {
        //update the playback status - and this icon
        updatePlayStatus(false, false);
        highlightItem();
      }
      audio.onpause = function() {
        if ($(this).data('audio-id') == current_audio_id) {
          updatePlayStatus(false, true);
        }
      }
      audio.ontimeupdate = function() {
        var progress = $('.progress-time');
        var position = Math.round(this.currentTime);
        var duration = this.duration;
        var output_str = formatTime(position);
        output_str += " / " + formatTime(duration);
        progress.html(output_str);
      }
      //
      audio_files[audio_id] = audio;
    }
    toggleAudio(this);
  });

  $('.js-playStatus').click(function(e) {
    e.preventDefault();
    if (current_audio_id > 0) {
      var current_audio = audio_files[current_audio_id];
      var current_target = $('.js-playAudio[data-audio-id='+current_audio_id+']');
      toggleAudio(current_target);
    }
  });
});
