$(document).ready(function(){
  var questions = {};
  var wins = 0;
  var losses = 0;
  var timedOut = 0;
  var i = 0;
  var correctAnswer;
  var gaming = false;
  var myTimer;
  var myTimer2;
  var starter = true;

  $("#start").on("click", function() {
    if (starter) {
      starter = false;
      $("#start").html("Restart");
      APIstart();
    }
    else {
      questions = {};
      wipeOut(); 
      starter = true;
      $("#start").html("Start");
      $("#question, .answer").empty();
    }
  });

  function wipeOut() {
    wins = 0;
    losses = 0;
    timedOut = 0;
    i = 0;
    gaming = false;

    $("#question, .answer").removeClass("hide");
    $("#gifBox").addClass("hide");

    clearTimeout(myTimer2);
    clearTimeout(myTimer);
    $("#answerBox").html("Answer: ");
    $("#timerBox").html("Timer: 15");
    $("#winBox").html("Wins: 0");
    $("#lossBox").html("Losses: 0");
    $("#timedOutBox").html("Timed Out: 0");
  };

  function APIstart() {
    $.ajax({
      url: "https://opentdb.com/api.php?amount=50&type=multiple&category=9",
      type: "GET",
      success: function(response) {
        questions = response;
        theGame();
      }
    });
  };

  function theGame() {
    gaming = true;
    $("#timerBox").html("Timer: 15");
    var timerGame = 14;
    myTimer = setInterval (function() { 
      $("#timerBox").html("Timer: " +  timerGame)
      timerGame--;
      if (timerGame === -1) {
        timedOut++;
        $("#msgBox").html("Times Up!");
        reset();
      }
    }, 1000);   

    correctAnswer = questions.results[i].correct_answer;
    var randomNumber = Math.floor((Math.random()*4) + 0);

    questions.results[i].incorrect_answers.splice(randomNumber, 0, correctAnswer);

    $("#question").html(questions.results[i].question);
    $("#answer1").html(questions.results[i].incorrect_answers[0]);
    $("#answer2").html(questions.results[i].incorrect_answers[1]);
    $("#answer3").html(questions.results[i].incorrect_answers[2]);
    $("#answer4").html(questions.results[i].incorrect_answers[3]);
  }

  $(".answer").on("click", function() {
    if (gaming) {
      guess = $(this).text();
     
      if (guess === correctAnswer) {
        wins++;
        $("#msgBox").html("Good Job!");
        $("#gifBox").attr("src", "https://media.giphy.com/media/11clOWGCHzWG7C/giphy.gif");
        reset();
      }
      else if (guess !== correctAnswer) {
        losses++;
        $("#msgBox").html("Wrong Answer!");
        $("#gifBox").attr("src", "https://media.giphy.com/media/xTcnTehwgRcbgymhTW/giphy.gif");
        reset();
      }      
    }
  });         

  $("#endButton").on("click", function() {
    reset();
  });   

   function reset() {
    gaming = false;
    i++;
    clearTimeout(myTimer);
    $("#answerBox").html("Answer: " + correctAnswer);
    $("#winBox").html("Wins: " + wins);
    $("#lossBox").html("Losses: " + losses);
    $("#timedOutBox").html("Timed Out: " + timedOut);
    $("#timerBox").html("New Question in 5")

    $("#question, .answer").addClass("hide");
    $("#gifBox").removeClass("hide");

    timerGame = 4;
    myTimer2 = setInterval (function() { 
      $("#timerBox").html("New Question in " + timerGame)
      timerGame--;
      if (timerGame === -1) {
        theGame();
        $("#question, .answer").removeClass("hide");
        $("#gifBox").addClass("hide");
        clearTimeout(myTimer2);
      }
    }, 1000);              
   };  
}); 


  