// Variables to track certain things
var currQuestion = 0;
var targetAns = "";
var timeRemaining = 60;
var timer = null;
var highscores = [];

// Variables for often accessed HTML elements
var countdownEl = document.getElementById("countdown");
var enterInitalsContainerEl = document.getElementById("enter-initials-container");
var containerEl = document.getElementById("container");
var qBoxEl = document.getElementById("question-box");
var initalsEl = document.getElementById("initals");
var highscoresContainerEl = document.getElementById("highscores-container");
var highscoresListEl = document.getElementById("highscore-list");

// Adding Event Listeners
document.getElementById("ans-list").addEventListener("click", handleListClick);
document.getElementById("start-btn").addEventListener("click", handleStartBtnClick);
document.getElementById("submit").addEventListener("submit", handleSubmit);
document.getElementById("clear-btn").addEventListener("click", handleClearScoreboard);
document.getElementById("go-back-btn").addEventListener("click", handleGoBackBtn);




function enterInitals() {
    clearInterval(timer);
    timer = null;
    containerEl.style.display = "none";
    qBoxEl.style.display = "none";
    
    var finalScoreH3 = document.getElementById("final-score");
    finalScoreH3.textContent = "Your final score is " + timeRemaining;

    enterInitalsContainerEl.style.display = "block";
}

function addToHighscore(name, score) {
    highscores.push({
        playerName: name,
        playerScore: score
    });
}

function reset() {
    currQuestion = 0;
    targetAns = "";
    timeRemaining = 60;
    timer = null;
}

function generateNextQuestion() {
    if(currQuestion >= quiz.questions.length) return;

    var qEl = document.getElementById("question");
    var aListEl = document.getElementById("ans-list");
    var nextQ = quiz.questions[currQuestion].question;
    var choicesArr = quiz.questions[currQuestion].choices;
    var ans = quiz.questions[currQuestion].answer;

    qEl.textContent = nextQ;

    clearList();
    for(var i = 0; i < choicesArr.length; i++) {
        var item = document.createElement("li");
        item.textContent = choicesArr[i];
        aListEl.appendChild(item);
    }

    currQuestion++;
    targetAns = ans;
}

function showHighscores() {
    containerEl.style.display = "none";
    qBoxEl.style.display = "none";
    enterInitalsContainerEl.style.display = "none";
    highscoresContainerEl.style.display = "block";

    while(highscoresListEl.firstChild) {
        highscoresListEl.removeChild(highscoresListEl.firstChild);
    }

    for(var i = 0; i < highscores.length; i++) {
        var newLi = document.createElement("li");
        newLi.innerHTML = highscores[i].playerName + ": " + highscores[i].playerScore;
        highscoresListEl.appendChild(newLi);
    }
}

// EVENT HANDLERS ------------------------------------------

function handleGoBackBtn() {
    reset();
    qBoxEl.style.display = "none";
    enterInitalsContainerEl.style.display = "none";
    highscoresContainerEl.style.display = "none";
    containerEl.style.display = "block";
}

function handleClearScoreboard() {
    highscores = [];
    showHighscores();
}

function handleSubmit(e) {
    e.preventDefault();
    var input = initalsEl.value;
    if(input.length !== 0) {
        addToHighscore(input, timeRemaining);
        showHighscores();
    }
}

function handleListClick(e) {
    // Correct answer
    if(e.target.innerHTML === targetAns) {
        if(currQuestion < quiz.questions.length) {
            generateNextQuestion();
        } else {
            enterInitals();
        }
    } 
    // Incorrect answer
    else {
        timeRemaining = timeRemaining - 10;
        updateCountdown();
        checkValidTimer();
    }
}

function handleStartBtnClick() {
    containerEl.style.display = "none";
    qBoxEl.style.display = "block";
    generateNextQuestion();
    timer = setInterval(handleCountdown, 1000);
}

function handleCountdown() {
    updateCountdown();
    timeRemaining--;
    checkValidTimer();
}

// HELPER METHODS -------------------------------------------

function clearList() {
    var olEl = document.getElementById("ans-list");

    while(olEl.firstChild) {
        olEl.removeChild(olEl.firstChild);
    }
}

function updateCountdown() {
    countdownEl.textContent = "Time Remaining: " + timeRemaining + " seconds!";
}

function checkValidTimer() {
    if(timeRemaining <= 0) {
        timeRemaining = 0;
        enterInitals();
    }
}

const quiz = {
    "questions": [
      {
        "question": "JavaScript has a file extension of:",
        "choices": [
          ".java",
          ".js",
          ".javascript",
          ".json"
        ],
        "answer" : ".js"
      },
      {
        "question": "Which built-in method returns the calling string value converted to lower case?",
        "choices": [
          "toLowerCase()",
          "toLower()",
          "setCharLower()",
          "None of the above"
        ],
        "answer" : "toLowerCase()"
      },
      {
        "question": "Which of the following function of the Array object removes the last element from an array and returns that element?",
        "choices": [
          "pop()",
          "push()",
          "join()",
          "map()"
        ],
        "answer" : "pop()"
      },
      {
        "question": "Which of the following functions of the Array object reverses the order of the elements of an array?",
        "choices": [
          "reverse()",
          "startFromEnd()",
          "reduce()",
          "push()"
        ],
        "answer" : "reverse()"
      },
    ]
  }