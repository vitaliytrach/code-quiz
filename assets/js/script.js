var questionIndex = 0;
var targetAns = "";
var timeRemaining = 60;
var isPlaying = false;
var highscores = [];

// Variables for HTML elements
var sceneOne = document.getElementById("container");
var sceneTwo = document.getElementById("question-box");
var sceneThree = document.getElementById("enter-initials-container");
var sceneFour = document.getElementById("highscores-container");
var ansList = document.getElementById("ans-list");

// Adding the listeners
document.getElementById("start-btn").addEventListener("click", handleStartQuizBtn);
document.getElementById("ans-list").addEventListener("click", handleChoiceSelection);
document.getElementById("submit").addEventListener("submit", handleSubmit);
document.getElementById("clear-btn").addEventListener("click", handleClearHighscores);
document.getElementById("go-back-btn").addEventListener("click", handleGoBackBtn);
document.getElementById("highscore").addEventListener("click", handleViewHighScore);

// Event method for when user selects "View Highscores" button
function handleViewHighScore() {
    sceneOne.style.display = "none";
    sceneTwo.style.display = "none";
    sceneThree.style.display = "none";
    updateScoreBoard();
    sceneFour.style.display = "block";
}

// Event method for when user presses "Go Back" button on the high scores scene
function handleGoBackBtn() {
    sceneFour.style.display = "none";
    resetGame();
    sceneOne.style.display = "block";
}

// Event method for when user clears scoreboard
function handleClearHighscores() {
    highscores = [];
    resetList(document.getElementById("highscore-list"));
}

// event for when user submits their initials and score to the highscores
function handleSubmit(e) {
    e.preventDefault();
    var inputBox = document.getElementById("initals");
    var initals = inputBox.value;

    if(initals === "") {
        return;
    } 

    insertAtCorrectSpot(initals, timeRemaining);

    sceneThree.style.display = "none";
    updateScoreBoard();
    sceneFour.style.display = "block";
}

// event method for when user starts the quiz
function handleStartQuizBtn() {
    isPlaying = true;
    generateNextQuestion();
    sceneOne.style.display = "none";
    sceneTwo.style.display = "block";

    var timer = setInterval(function() {
        if(sceneTwo.style.display === "none") {
            clearInterval(timer);
            return;
        }

        timeRemaining--;
        updateTimer();
        
        if(timeRemaining === 0 || !isPlaying) {
            resetList(ansList);
            enterHighScore();
            clearInterval(timer);
        }
    }, 1000);
}

// Event method for when user makes a select
function handleChoiceSelection(e) {

    // if ans is incorrect
    if(e.target.textContent !== targetAns) {
        timeRemaining -= 10;
        updateTimer();
    }

    if(questionIndex >= quiz.questions.length) {
        isPlaying = false;
        enterHighScore();
    } else {
        resetList(ansList);
        generateNextQuestion();
    }
}

function enterHighScore() {
    sceneTwo.style.display = "none";

    var msg = document.getElementById("final-score");
    msg.textContent = "Your final score is: " + timeRemaining;

    sceneThree.style.display = "block";
}

// Generating the next quiz question
function generateNextQuestion() {
    var question = document.getElementById("question");
    targetAns = quiz.questions[questionIndex].answer;

    // Update the question
    question.textContent = quiz.questions[questionIndex].question;

    // Print all the options
    for(var i = 0; i < quiz.questions[questionIndex].choices.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = quiz.questions[questionIndex].choices[i];
        ansList.appendChild(newLi);
    }

    questionIndex++;
}

// updating and creating all the scoreboard li elements
function updateScoreBoard() {
    var list = document.getElementById("highscore-list");
    resetList(list);

    for(var i = 0; i < highscores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = highscores[i].player + " - " + highscores[i].score;
        list.appendChild(newLi);
    }
}

// Updating the timer on the UI
function updateTimer() {
    var countdown = document.getElementById("countdown");

    if(timeRemaining <= 0) {
        timeRemaining = 0;
    }

    countdown.textContent = "Time Remaining: " + timeRemaining + " seconds!";
}

// Removes children of an HTML list
function resetList(list) {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

// Method to reset the game to inital state
function resetGame() {
    questionIndex = 0;
    targetAns = "";
    timeRemaining = 60;
    updateTimer();
    isPlaying = false;
    resetList(ansList);
    document.getElementById("initals").value = "";
}

// Method to insert at the proper spot when adding to scoreboard
function insertAtCorrectSpot(player, score) {
    var index = 0;

    for(var i = 0; i < highscores.length; i++) {
        var currScore = highscores[i].score;

        if(score >= currScore) {
            index = i;
            break;
        }
    }

    highscores.splice(index, 0, {
        "player": player,
        "score": score
    })
}

// js object to hold all the data on the quiz
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