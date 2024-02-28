let gamePattern=[];
let userClickedPattern=[];
let level=0;
let hasStarted=false;
const buttonColors=["red","blue","green","yellow"];


function newSequence(){

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //increment level when game starts
    level++;
    $("h1").text("Level "+ level);

    let randomNumber= Math.floor(4*Math.random());
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //using jQuery to select div with same id as randomChosenColor
    $("div#" +randomChosenColor).fadeOut(100).fadeIn(100);

    //play the desired audio based on color
    let audio = new Audio("./sounds/"+randomChosenColor+".mp3");
    audio.play();
        
}

// function to play sound when the user clicks a button
function playSound(name){
    let audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// function to animate a button click
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout( function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}

function startOver(){
   level=0;
   hasStarted=false;
   gamePattern=[];
}

function checkAnswer(currentLevel){
   
   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
     console.log("success");
    
     if(userClickedPattern.length==gamePattern.length){
        setTimeout(newSequence,1000);
        }     
     }

     else{
        playSound("wrong");

        $("body").addClass("game-over");
        
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
     }
   

}



$(".btn").click(function(){

let  userChosenColor =$(this).attr("id");

userClickedPattern.push(userChosenColor);

playSound(userChosenColor);

animatePress(userChosenColor);

checkAnswer(userClickedPattern.length-1);

});

$(document).keypress(function(){
   if(hasStarted===false){
    newSequence();
    hasStarted=true;
   }
});

