var timer;

var x = document.getElementById("myAudio"); // get audio files by id from html

$(document).ready(function(){
var working = false;
var active = '';
var workTime = 0;
var breakTime = 0;
checkStatus();

  //Controls if a button is disabled based on status of timer
function checkStatus() {
  if (!working) {
    $('#start').removeClass('disabled');
    $('#pause').addClass('disabled');
    $('#reset').addClass('disabled');
    } else {
    $('#pause').removeClass('disabled');
    $('#reset').removeClass('disabled');
    $('#start').addClass('disabled');
    }
}
//End Check Status

    //Function to Show Time 
    function showTime(time) {
   var min = Math.floor(time/60);
   var sec = Math.round(time%60);
      if (sec < 10) {
        sec = '0' + sec
      }
      var timeString = min+':'+sec
      $('#msg').text("Let's focus for    "+timeString+" minutes.")

      if(time == breakTime) //Change timer message, if it is break time
      {
        $('#msg').text("Yay! take break for    "+timeString+" minutes.")
      }
     }
  //End showTime

  //Enables the timer
function startTimer() {
  $('.timer').css('visibility', 'visible');
  return setInterval(function() {
    console.log("Work Timer...")
    workTime--;
    if (workTime < 0) {
      clearInterval(timer);
      timer = breakTimer();
    } else {
      showTime(workTime);
    }
  }, 1000);
}
  //End Timer

  //What Happens when #start is pressed
 function start() {     

  x.play(); //Plays the audio

   if (working == true){ 
      return
   } //Else
  workTime = $('#work').val()*60;
    breakTime = $('#break').val()*60;
   working = true;
   checkStatus();    
    timer = startTimer(); 
 } 
  //End Start Timer
  
  //What Happens when #pause/resume is pressed
  function pause() {

    x.pause(); //Pauses audio

    clearInterval(timer);
    $('.resume').unbind().click(resume);
    $('#pause').html('Resume');
    $('#pause').addClass('resume');
    $('#pause').removeClass('pause');
    $('.resume').click(resume); 
   }
  //End Pause

  //What happens when the "Resume" is pressed
  function resume(){  

    x.play(); //Serves as a dual fuction for resuming the audio
  
    $('#pause').unbind().click(pause);
    $('#pause').html('Pause');
    $('#pause').addClass('pause');
    $('#pause').removeClass('resume');
    timer = startTimer();
    }
  //What happens when #reset is pressed
  function reset() {

    x.pause(); //Serves as a dual fuction for stopping the audio

   clearInterval(timer);
    working = false;
    workTime = 0;
    breakTime = 0;
    checkStatus();
    $('.timer').css('visibility', 'hidden');
    $('#msg').html("");
  }

  //Break Timer 
  function breakTimer() {
    $('.timer').css('visibility', 'visible');
    return setInterval(function() {
      console.log("Break Timer...");
    breakTime--;
    if (breakTime < 0) {
      clearInterval(timer);
      working = false;
      start();
    } else {
      showTime(breakTime);
    }
  }, 1000);
}
  //Button Association
  $('#start').click(start);
    $('#work').keypress(function(e) {
    if(e.which == 13) {
       start();
    }
});
  //This Makes Enter Work as well to Start
  $('.pause').click(pause);
  $('#reset').click(reset); 
  
});