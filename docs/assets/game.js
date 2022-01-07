var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {

    if (!started) {
        nextSequence();
        started = true;
    }
});

//detects user clicks
$(".btn").click(function() {

    var userChoosenColour = $(this).attr('id');
    userClickedPattern.push(userChoosenColour);

    animatePress(userChoosenColour);
    playSound(userChoosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

//gets next sequence
function nextSequence() {

    $("h1").text("Level " + level);

    var randomZeroToThree = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomZeroToThree];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
}

//check user answer
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            level++;
            setTimeout(function() {
                nextSequence();
            }, 500);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-head").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

//animate, play audio and restart function
function playSound(name) {
    var buttonSound = new Audio("assets/sounds/" + name + ".mp3");
    buttonSound.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    $("#" + currentColour).removeClass(currentColour);

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
        $("#" + currentColour).addClass(currentColour);
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}