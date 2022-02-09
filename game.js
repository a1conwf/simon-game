var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).on("keypress", function() {

    if ( !gameStarted ){
        gameStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }

})

$(".btn").on("click", function() {

    //Getting button`s id that user clicked on and pushing it into the userClickedPattern array
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    //Adding audio to the user clicked on button
    playSound(userChosenColour);

    //Adding animation to the user clicked on button
    animatePress(userChosenColour);

    //Checking answer
    checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {

    userClickedPattern = [];

    //Increasing game level and changing level title
    level++;
    $("#level-title").text("Level " + level);

    //Creating a random number, choosing random button colour and pushing it into gamePattern array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Adding animation effect to random chosen button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Adding audio to random chosen button
    playSound(randomChosenColour);

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100)

}

function checkAnswer(currentLevel) {

    if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){ 
        
        if ( userClickedPattern.length === gamePattern.length ) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }

    } else{

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }
    
}

function startOver() {

    gameStarted = false;
    level = 0;
    gamePattern = [];

}