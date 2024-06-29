var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var currIndex = 0;

$(".btn").click(function() {
  ++currIndex;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatebutton(userChosenColour);
  if(gamePattern[currIndex-1]!==userClickedPattern[currIndex-1])
    {
      gameOver();
    }
  if(currIndex===level){
    checkAns(level);
  }
  
});

$(document).keydown(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  level += 1;
  currIndex = 0; 
  userClickedPattern = []; 
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatebutton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAns(level) {
  for (var i = 0; i < level; i++) {
    if (gamePattern[i]!== userClickedPattern[i]) {
      gameOver();
      return;
    }
  }
  userClickedPattern=[];
  setTimeout(nextSequence, 1000); 
}
function gameOver(){
  $("h1").text("Game Over:( Press any key to continue..");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  newgame();
}
function newgame(){
level=0;
started=false;
gamePattern=[];
}
