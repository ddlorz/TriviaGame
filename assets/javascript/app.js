$(document).ready(function(){
  var questions = {};
  var wins = 0;
  var losses = 0;
  var timedOut = 0;
  var i = 0;
  var correctAnswer;
  var gaming = false;

  $.ajax({
    url: "https://opentdb.com/api.php?amount=50&type=multiple&category=9",
    type: "GET",
    success: function(response) {
      questions = response;
      console.log(response);
      theGame();
    }
  });

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
        reset();
      }
      else if (guess !== correctAnswer) {
        losses++;
        $("#msgBox").html("Wrong Answer!");
        reset();
      }
      console.log("Wins: " + wins + " Losses: " + losses);
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
    $("#timerBox").html("10");
    $("#winBox").html("Wins: " + wins);
    $("#lossBox").html("Losses: " + losses);
    $("#timedOutBox").html("Timed Out: " + timedOut);
    $("#timerBox").html("New Question in 5")

    timerGame = 4;
    myTimer2 = setInterval (function() { 
      $("#timerBox").html("New Question in " + timerGame)
      timerGame--;
      if (timerGame === -1) {
        theGame();
        clearTimeout(myTimer2);
      }
    }, 1000);              
   }      
}); 


  