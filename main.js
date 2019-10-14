"use strict";

const STORE = [
  {
    number: 1,
    question: "Where was Tom Waits Born?",
    answers: ["Pomona, CA", "Tacoma, WA", "St. Louis, MO", "Brooklyn, NY"],
    correctAnswer: "Pomona, CA"
  },
  {
    number: 2,
    question:
      "Which record label released Tom Waits' first album 'Closing Time'?",
    answers: ["Anti", "Sub Pop", "Asylum", "Atlantic"],
    correctAnswer: "Asylum"
  },
  {
    number: 3,
    question: "What was Tom Waits' first Job as a teenager?",
    answers: [
      "Pizza maker",
      "Auto mechanic",
      "Hot dog vendor",
      "Construction worker"
    ],
    correctAnswer: "Pizza maker"
  },
  {
    number: 4,
    question: "Which album marks Tom Waits' shift toward the Avant-garde?",
    answers: [
      "Mule Variations",
      "Big Money",
      "Swordfishtrombones",
      "Franks Wild Years"
    ],
    correctAnswer: "Swordfishtrombones"
  },
  {
    number: 5,
    question: "Which album by Tom Waits won a Grammy in 1992?",
    answers: [
      "The Black Rider",
      "Heart of Saturday Night",
      "Real Gone",
      "Bone Machine"
    ],
    correctAnswer: "Bone Machine"
  },
  {
    number: 6,
    question: 'Who directed the film "Down by Law" starring Tom Waits?',
    answers: [
      "Francis Ford Coppola",
      "Martin Scorcese",
      "Jim Jarmusch",
      "David Lynch"
    ],
    correctAnswer: "Jim Jarmusch"
  },
  {
    number: 7,
    question: "Members of which band played on the album Bone Machine?",
    answers: ["Primus", "Faith No More", "Smashing Pumpkins", "Sonic Youth"],
    correctAnswer: "Primus"
  },
  {
    number: 8,
    question:
      "In what year was Tom Waits inducted into the Rock'nroll Hall of Fame?",
    answers: ["1979", "1984", "1995", "2011"],
    correctAnswer: "2011"
  },
  {
    number: 9,
    question:
      "For which of the following bands did Tom waits open for early in his career?",
    answers: ["Eagles", "Kansas", "The Mothers of Invention", "Steely Dan"],
    correctAnswer: "The Mothers of Invention"
  },
  {
    number: 10,
    question:
      'Which album by Tom Waits was based on the 19th century play "Wozzeck"?',
    answers: ["Rain Dogs", "Blood Money", "Real Gone", "Blue Valentine"],
    correctAnswer: "Blood Money"
  }
];

let questionNumber = 0;
let score = 0;

//start quiz//
function startQuiz() {
  $(".flex-container").hide();
  $(".startQuiz").on("click", "button", function(event) {
    event.preventDefault();
    $(".flex-container").show();
    //removes heading

    $(".startQuiz").remove();
    $("header").remove();

    //displays score and quiz progress

    $(".score").css("display", "block");
    $(".user-progress").css("display", "block");
    $(".questionNumber").text(1);

    //displays form
    $(".questionAnswerForm").css("display", "block");

    //hides submit button until user picks an option
    hideSubmitButton();
  });
}
//retrieves question from STORE//
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `
        <h2>${STORE[questionNumber].question}</h2>
    <form aria-label="quiz options">
    <fieldset>
    <label for='answer1'>
    <input type='button' value='${
      STORE[questionNumber].answers[0]
    }' id='answer1' required>
    </label>

    <label for='answer2'>
    <input type='button' value='${
      STORE[questionNumber].answers[1]
    }' id='answer2' required>
    </label>

    <label for='answer3'>
    <input type='button' value='${
      STORE[questionNumber].answers[2]
    }' id='answer3' required>
    </label>

    <label for='answer4'>
    <input type='button' value='${
      STORE[questionNumber].answers[3]
    }' id='answer4' required>
    </label>

    <button type='submit' class='submitButton'>Submit</button>
    </fieldset>
    </form>`;
  } else {
    restartQuiz();
    removeCounter();
  }
}
//render question in DOM
function renderQuestion() {
  $(".questionAnswerForm").html(generateQuestion());

  //changes class for selected option and displays submit button
  $("input").click(function() {
    $(this).toggleClass("selected");
    let selected = $("input.selected");
    selected.not(this).removeClass("selected");
    if (selected.length > 0) {
      $(".submitButton").show();
    } else {
      $(".submitButton").hide();
    }
  });
}
//increments and displays score

function changeScore() {
  score++;
  $("#score").text(score);
}
//hides submit button until user selects option
function hideSubmitButton() {
  $(".submitButton").hide();
}

//user makes selection

function makeSelection() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    let selected = $("input.selected");

    let answer = selected.val();
    let correctAnswer = STORE[questionNumber].correctAnswer;
    if (answer === correctAnswer) {
      positiveFeedback();
    } else {
      negativeFeedback();
    }
  });
  //if user gets question right
  function positiveFeedback() {
    $(".questionAnswerForm").html(ifUserIsRight());
    changeScore();
  }
  //if user gets question wrong

  function negativeFeedback() {
    $(".questionAnswerForm").html(ifUserIsWrong());
    $(".user-progress").css("display", "none");
  }
}
// handles user feedback
function ifUserIsRight() {
  $(".questionAnswerForm").html(`
    <section id='rightAnswer'>
    <h1>Correct! Clap hands!</h1>
    <img src='https://media.giphy.com/media/dDpZKd0ghwWmQ/giphy.gif' alt="correct answer gif">
    <button class='next'>Next</button>
     </section>`);
}
function ifUserIsWrong() {
  $(".questionAnswerForm").html(`
    <section id='wrongAnswer'>
    <h1 class="wrong-answer">Incorrect!</h1>
    <h2 class="wrong-answer">The correct answer is ${STORE[questionNumber].correctAnswer}.</h2>
    <img src='https://media.giphy.com/media/CvElhTLsYUigo/giphy.gif' alt="incorrect answer gif">
    <button class='next'>Next</button>
     </section>`);
}
//handle restart screen
function showRestartScreen() {
  $("main").html(
    `<section id='restart'> 
    <h1 class='results'>Your score is ${score} out of 10</h1> 
    <button class='restartButton'>Restart quiz</button>
    </section>`
  );
}
//increments question number
function incrementQuestionNumber() {
  questionNumber++;
  $(".questionNumber").text(questionNumber);
}

//brings back question counter after user clicks next

function displayProgress() {
  $(".user-progress").show();
}
//displays end screen with button to restart quiz
function restartQuiz() {
  $("main").html(showRestartScreen());
  $("body").css(
    "background-image",
    "url('https://www.morrisonhotelgallery.com/images/big/Tom%20Waits%20233B%20(3A)II.jpg')"
  );
  $("h1").css("color", "white");
  $("main").on("click", ".restartButton", function(event) {
    location.reload();
  });
  removeCounter();
}
//removes question counter on results page
function removeCounter() {
  $(".flex-container").css("display", "none");
}
function handleNextButton() {
  $("main").on("click", ".next", function() {
    if (questionNumber < STORE.length) {
      incrementQuestionNumber();
      displayProgress();
      renderQuestion();
      makeSelection();
      hideSubmitButton();
    }
  });
}

function createQuiz() {
  startQuiz();
  generateQuestion();
  renderQuestion();
  makeSelection();
  handleNextButton();
}

$(createQuiz);
