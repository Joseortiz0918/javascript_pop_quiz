// timer counts down from 60 seconds whilst quiz is being completed
var timeEl = document.getElementById("timer");
// Starts quiz and timer
var startBtnEl = document.getElementById("Start");
//when quiz is not done in  time this will reload the webpage and you will be able to do the quiz from the start
var restartBtnEl = document.getElementById("Restart");
//shows the user past scores stored in local memory
var scoreBtnEl = document.getElementById("scores");

// Placeholder of quiz questions will propagate questions stored in question array
var questionEl = document.getElementById("question");
// Placeholder of quiz answers will propagate questions stored in question array
var answersEl = document.getElementById("answers");
//Propagates new set of question and answers for quiz
var nextBtnEl = document.getElementById("Next");
//tells user their final score when quiz is completed
var finalScoreEl = document.getElementById("final-score");

var scoreTextEl = document.getElementById("scoreText");
var hsEl = document.getElementById("highScores");
var submitBtnEl = document.getElementById("submit");


var inputEl = document.getElementById("input-score");

var startingTime = 60;
var gameFinished = false;
function startQuiz(event) {
  event.stopPropagation();
  scoreBtnEl.setAttribute("style", "display: none");
  quiz();
  var timer = setInterval(function () {
    if (gameFinished === true) {
      return;
    } else if (startingTime > 1) {
      timeEl.textContent = startingTime + " seconds remaining";
      startingTime--;
    } else if (startingTime === 1) {
      timeEl.textContent = startingTime + " second remaining";
      startingTime--;
    } else {
      timeEl.textContent = "";
      clearInterval(timer);
      scoreBtnEl.setAttribute("style", "display: block");
      gameOver();
    }
  }, 1000);
}

let currentQuestionIndex = 0;

function quiz() {
  currentQuestionIndex = 0;
  startBtnEl.setAttribute("style", "display: none");
  showQuestions();
}
function showQuestions() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("aBtn");
    answersEl.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("Incorrect");
  }
  Array.from(answersEl.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtnEl.setAttribute("style", "display: block");
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    gameComplete();
    gameFinished = true;
    let ScoreText = timeEl.textContent;
    const scoreArray = ScoreText.split(" ");
    let finalScore = scoreArray[0];
    finalScoreEl.textContent = finalScore + " points!";
  }
}

nextBtnEl.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  }
});

function resetState() {
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
}

const questions = [
  {
    question: "what is 'a'?",
    answers: [
      { text: "String", correct: true },
      { text: "Boolean", correct: false },
      { text: "null", correct: false },
      { text: "number", correct: false },
    ],
  },
  {
    question: "what is '<id>'?",
    answers: [
      { text: "a page", correct: false },
      { text: "an element", correct: true },
      { text: "repeat", correct: false },
      { text: "letter", correct: false },
    ],
  },
  {
    question: "how do you declare a variable?",
    answers: [
      { text: "a page", correct: false },
      { text: "an element", correct: false },
      { text: "repeat", correct: true },
      { text: "letter", correct: false },
    ],
  },
  {
    question: "what is is a function?",
    answers: [
      { text: "a page", correct: false },
      { text: "an element", correct: false },
      { text: "repeat", correct: false },
      { text: "letter", correct: true },
    ],
  },
];

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
    
  inputEl.setAttribute("style", "display: none");
  submitBtnEl.setAttribute("style", "display: none");
  questionEl.textContent = "High Scores";
  answersEl.setAttribute("style", "display: none");
  startBtnEl.setAttribute("style", "display: none");
  hsEl.setAttribute("style", "display: block");
  restartBtnEl.setAttribute("style", "display: block");
  renderHighScores();
}
//needs a function that tells the webpage that the game is done
function gameComplete() {
  resetState();

  nextBtnEl.setAttribute("style", "display: none");
  submitBtnEl.setAttribute("style", "display:block");
  questionEl.textContent = "Please type in your name to record your Score";
  answersEl.setAttribute("style", "display: none");
  startBtnEl.setAttribute("style", "display: none");
  inputEl.setAttribute("style", "display: block");

 
  renderHighScores();
  function displayMessage(type, message) {
    messageDisplay.textContent = message;
    messageDisplay.setAttribute("class", type);
  }

  formInputScore.addEventListener("submit", function (e) {
    e.preventDefault();
    var userName = userNameInput.value;
    console.log(userName);
    if (userName === "") {
      displayMessage("error", "Username can not be blank");
    } else {
      displayMessage("success", "You have successfully entered you high-score");
      highScores.push(userName);
      storeHighScores();
      seeScores();
      
    }
  });
}
function renderHighScores() {
    highScoresList.innerHTML="";
    for(var i=0;i<highScores.length; i++){
        var highScore= highScores[i];
        var li =document.createElement("li");
        li.textContent=highScore;
        li.setAttribute("data-index", i);
    }
  
}

function init(){
    var storedHighScores= JSON.parse(localStorage.getItem("highScores"))
    if(storedHighScores !== null){
    highScores=storedHighScores;
}

renderHighScores();
}
var highScores=[]

function storeHighScores() { 
    localStorage.setItem("highScores",JSON.stringify(highScores));}




var userNameInput = document.querySelector("#userName");
var formInputScore=document.querySelector("#input-score")
var formFinalScore=document.querySelector("#final-score")
var messageDisplay = document.querySelector("#messageDisplay");
var highScoresList = document.querySelector("#highScores");

init()



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

/*  function startLiveUpdate(){
    var scoreUpdate=startingTime
    var newScore = setInterval(function () {
        if(gameDone=true){
            return;
        }
        if (scoreUpdate > 1) {
          scoreTextEl.textContent = scoreUpdate;
          scoreUpdate--;
        } else if (scoreUpdate === 1) {
          scoreTextEl.textContent = scoreUpdate;
          scoreUpdate--;
        } else {
          timeEl.textContent = "";
          scoreTextEl.text= score;
          clearInterval(newScore);
          
        }
      },1000);
 }
 startLiveUpdate();*/



 /*var userName = localStorage.getItem("userName");
  console.log(userName);
  var recordedHighScore = localStorage.getItem("userHighScore");
  console.log(recordedHighScore);
  if (!userName || !recordedHighScore) {
    return;
  }
  highScoresList.textContent =
    userName.textContent + " " + recordedHighScore.textContent;
    
    
    
    //in bewteen 
    formInputScore.addEventListener("submit", function (e) {
    e.preventDefault();

    var userName = userNameInput.value;
    console.log(userName);
    
    let userHighScore = finalScoreEl.textContent;
    const highScoreArray = userHighScore.split(" ");
    let recodedScore = highScoreArray[0];
    console.log(recodedScore);*/
    
