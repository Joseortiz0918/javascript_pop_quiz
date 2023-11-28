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
var hsEl = document.getElementById("high-scores");
var submitBtnEl = document.getElementById("submit");
var clearHsEl = document.getElementById("clear-form");

var inputEl = document.getElementById("input-score");



var startingTime = 60;
var isWrong =false
var gameFinished = false;

function startQuiz(event) {
  event.stopPropagation();
  scoreBtnEl.setAttribute("style", "display: none");
  quiz();
  var timer = setInterval(function (isWrong) {
    if (gameFinished === true) {
      return;
    
    }if (isWrong=== true){
      timeEl.textContent = startingTime + " seconds remaining";
      startingTime-=10;
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
function wasWrong(){
  isWrong=true;
}

let currentQuestionIndex = 0;

function quiz() {
  currentQuestionIndex = 0;
  startBtnEl.setAttribute("style", "display: none");
  showQuestions();
}
function showQuestions() {
  resetState();
  nextBtnEl.setAttribute("style", "display: none");
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
    wasWrong();
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
    question: "How do you get the last character of name = 'April'?",
    answers: [
      { text: ".last()", correct: false },
      { text: "[name.length]", correct: false },
      { text: "console.log(April)", correct: false },
      { text: "[name.length-1]", correct: true },
    ],
  },
  {
    question: "How do you convert 'JOse' into 'jose'?",
    answers: [
      { text: "JOse.lower", correct: false },
      { text: "JOse.toLowerCase()", correct: true },
      { text: "JOse.toLowerCase", correct: false },
      { text: "JOse.textContent=jose", correct: false },
    ],
  },
  {
    question: "How do you get 'uce' from name = 'Bruce'?",
    answers: [
      { text: "name.substring(0,2)", correct: false },
      { text: "name.substring(2)", correct: true },
      { text: "name.substring(1)", correct:  false},
      { text: "name.substring[2]", correct: false },
    ],
  },
  {
    question: "How do you concatenate two strings ('abc' & 'def') together?",
    answers: [
      { text: "'abc','def'", correct: false },
      { text: "'abc'+='def'", correct: false },
      { text: "'abc'.concat(def)", correct: false },
      { text: "'abc'+'def'", correct: true },
    ],
  },
  {
    question: "How do you get the first character of 'Pac-Man'?",
    answers: [
      { text: "Pac-Man.first()", correct: false },
      { text: "Pac-Man.[1]", correct: false },
      { text: "Pac-Man.[0]", correct:  true},
      { text: "Pac-Man.character(0)", correct: false },
    ],
  },
  {
    question: "Is .length a property or a method?",
    answers: [
      { text: "Both", correct: false },
      { text: "Method", correct: false },
      { text: "Neither", correct:  false},
      { text: "Property", correct: true },
    ],
  },
  {
    question: "How can you find out how many characters are there in a string?",
    answers: [
      { text: "string.count", correct: false },
      { text: "string.length", correct: true },
      { text: "string.size", correct:  false},
      { text: "string.charCount", correct: false },
    ],
  },
  {
    question: "Which kind of strings support having multiple lines?",
    answers: [
      { text: "All strings support multiple lines", correct: false },
      { text: "template strings", correct: true },
      { text: "single quoted strings", correct:  false},
      { text: "double quoted strings", correct: false },
    ],
  },
  {
    question: "What does the console.log(name[1]) when name = Lincoln log to the console?",
    answers: [
      { text: "i", correct: true },
      { text: "name[1]", correct: false },
      { text: "L", correct:  false},
      { text: "Lincoln", correct: false },
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
  nextBtnEl.setAttribute("style", "display: none");

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
  renderHsFs();
  inputEl.setAttribute("style", "display: none");
  submitBtnEl.setAttribute("style", "display: none");
  questionEl.textContent = "High Scores";
  answersEl.setAttribute("style", "display: none");
  startBtnEl.setAttribute("style", "display: none");
  hsEl.setAttribute("style", "display: block");
  restartBtnEl.setAttribute("style", "display: block");
  restartBtnEl.textContent = "Go back";
  clearHsEl.setAttribute("style", "display: block");
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

  renderHsFs();
  function displayMessage(type, message) {
    messageDisplay.textContent = message;
    messageDisplay.setAttribute("class", type);
  }

  formInputScore.addEventListener("submit", function (e) {
    e.preventDefault();
    var userName = userNameInput.value;
    if (userName === "") {
      displayMessage("error", "Username can not be blank");
    } else {
      displayMessage("success", "You have successfully entered you high-score");
      finalScores.push(formFinalScore.textContent);
      highScores.push(userName);
      storeHighScores();
      seeScores();
    }
  });
  submitBtnEl.addEventListener("click", function (e) {
    e.preventDefault();
    var userName = userNameInput.value;
    if (userName === "") {
      displayMessage("error", "Username can not be blank");
    } else {
      displayMessage("success", "You have successfully entered you high-score");
      finalScores.push(formFinalScore.textContent);
      highScores.push(userName);
      storeHighScores();
      seeScores();
    }
  });
}
function renderHsFs() {
  highScoresList.innerHTML = "";
  for (var i = 0; i < highScores.length; i++) {
    var highScore = highScores[i];
    var finalScr = finalScores[i];
    var li = document.createElement("li");
    li.textContent = highScore + "---------------" + finalScr;
    highScoresList.appendChild(li);
    li.setAttribute("data-index", i);
  }
}

function init() {
  var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
  if (storedHighScores !== null) {
    highScores = storedHighScores;
    var storedFinalScores = JSON.parse(localStorage.getItem("finalScores"));
    if (storedFinalScores !== null) {
      finalScores = storedFinalScores;
    }
  }
  renderHsFs();
}

var highScores = [];
var finalScores = [];


function storeHighScores() {
  localStorage.setItem("highScores", JSON.stringify(highScores));
  localStorage.setItem("finalScores", JSON.stringify(finalScores));
}

var userNameInput = document.querySelector("#userName");
var formInputScore = document.querySelector("#input-score");
var formFinalScore = document.querySelector("#final-score");
var messageDisplay = document.querySelector("#messageDisplay");
var highScoresList = document.querySelector("#high-scores");

init();

function clearForm() {
  localStorage.clear();
  location.reload();
}

//look up event delegation for click button
//listens for a click on startBtnEl and then starts game
startBtnEl.addEventListener("click", startQuiz);
//listens for a click on restartBtnEl and then reloads page
restartBtnEl.addEventListener("click", restartGame);
scoreBtnEl.addEventListener("click", seeScores);
clearHsEl.addEventListener("click", clearForm);

//when see scores is clicked takes us to a new webpage that has the stored values of the previous last high scores
// need a way to be able to store data locally
// of hs and user name
//need a way to order scores from high to low
