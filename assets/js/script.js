//when start is clicked
//timer is activated
//1st question propagates
//4 multiple choices are propagated

// when right answer is clicked
//2nd question and choices are propagated
//a message will display 'correct'

//when wrong choice is clicked
//timer will be reduced by 3 seconds
//a message will display 'Wrong choice'
//next question and answers will display

//when quiz is done
// you will presented with your score
//and a form to save your initials and score
//a clear button will show up and allow you to clear history

// timer
var timeEl = document.getElementById("timer");
var startBtnEl = document.getElementById("Start");
var restartBtnEl = document.getElementById("Restart");
var scoreBtnEl = document.getElementById("scores");
var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var inputEl = document.getElementById("input_score");
var hsEl = document.getElementById("high_scores");
var answerOneEl = document.getElementById("one");

var startingTime = 60;

function startQuiz(event) {
  event.stopPropagation();
  scoreBtnEl.setAttribute("style", "display: none");
  quiz();
  var timeInterval = setInterval(function () {
    if (startingTime > 1) {
      timeEl.textContent = startingTime + " seconds remaining";
      startingTime--;
    } else if (startingTime === 1) {
      timeEl.textContent = startingTime + " second remaining";
      startingTime--;
    } else {
      timeEl.textContent = "";
      clearInterval(timeInterval);
      scoreBtnEl.setAttribute("style", "display: block");
      gameOver();
    }
  }, 100);
}
function quiz() {
  questionEl.textContent = "what is this 'a'";
  answersEl.children[0].children[0].textContent = "String";
  answersEl.children[1].children[0].textContent = "Boolean";
  answersEl.children[2].children[0].textContent = "null";
  answersEl.children[3].children[0].textContent = "number";
  function string() {


  };
};

function correct(string){
    answerOneEl.addEventListener("click", string);
}

function gameOver() {
  questionEl.setAttribute("style", "display: none");
  answersEl.textContent = "Game Over!!";
  window.alert("please try again");
  //hides start button and replaces it with a reset button
  startBtnEl.setAttribute("style", "display: none");
  restartBtnEl.setAttribute("style", "display: block");
  return;
}
//restarts webpage when restart button is clicked
function restartGame() {
  location.reload();
}
//Displays High scores and changes text to match the content
//will need to add a function that will add high scores stored locally and
//sorts hs by high to low
//Needs a button that when pressed will delete any stored information from hs table
function seeScores() {
  questionEl.textContent = "High Scores";
  answersEl.setAttribute("style", "display: none");
  startBtnEl.setAttribute("style", "display: none");
  hsEl.setAttribute("style", "display: block");
  restartBtnEl.setAttribute("style", "display: block");
}
//needs a function that tells the webpage that the game is done
function gameComplete() {
  questionEl.textContent = "Please type in your name to record your Score";
  answersEl.setAttribute("style", "display: none");
  startBtnEl.setAttribute("style", "display: none");
  inputEl.textContent("Enter");
  inputEl.setAttribute("style", "display: block");
}

//look up event delegation for click button
//listens for a click on startBtnEl and then starts game
startBtnEl.addEventListener("click", startQuiz);
//listens for a click on restartBtnEl and then reloads page
restartBtnEl.addEventListener("click", restartGame);
scoreBtnEl.addEventListener("click", seeScores);


//when see scores is clicked takes us to a new webpage that has the stored values of the previous last high scores
// need a way to be able to store data locally
// of hs and user name
//need a way to order scores from high to low

//use for later
