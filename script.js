// Define an array of quiz questions
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["home tool markup language", "hyperlink and text markup language", "hyper text markup language"],
    correctAnswer: "hyper text markup language"
  },
  {
    question: "Which character is used to indicate an end tag?",
    options: ["^", "/", "<", "*"],
    correctAnswer: "/"
  },
  {
    question: "Which of these elements are all <table> elements?",
    options: ["<table><tr><tt>", "<thead><body><tr>", "<table><head><tfoot>", "<table><tr><td>"],
    correctAnswer: "<table><tr><td>"
  },
  {
    question: "How can you make a numbered list?",
    options: ["<ol>", "<dl>", "<list>", "<ul>"],
    correctAnswer: "<ol>"
  },
  {
    question: "What does CSS stand for?",
    options: ["colorful style sheets", "computer style sheets", "creative style sheets", "cascading style sheets"],
    correctAnswer: "cascading style sheets"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<style>", "<css>"],
    correctAnswer: "<style>"
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["styles", "class", "font", "style"],
    correctAnswer: "style"
  },
  {
    question: "How do you insert a comment in a CSS file?",
    options: ["//this is a comment", "/*this is a comment*/", "'this is a comment", "//this is a comment//"],
    correctAnswer: "/*this is a comment*/"
  },
  {
    question: "Which property is used to change the font of an element?",
    options: ["font-style", "font-family", "font-weight"],
    correctAnswer: "font-family" 
  },
  {
    question: "When using the padding property; are you allowed to use negative values?",
    options: ["YES", "NO"],
    correctAnswer: "NO"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<javascript>", "<scripting>", "<script>"],
    correctAnswer: "<script>"
  }
];

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 100;
let timerInterval;

// Function to start the quiz
function startQuiz() {
  // Hide the start button and display the first question
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}

// Function to display a question and its options
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");

  // Clear previous question and answer options
  questionText.innerHTML = "";
  answerButtons.innerHTML = "";

  // Display the current question
  questionText.innerHTML = currentQuestion.question;

  // Create answer buttons for each option
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);

    // Add click event listener to check the answer
    button.addEventListener("click", function() {
      checkAnswer(option);
    });
  });
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Check if the selected answer is correct
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  }

  // Move to the next question or end the quiz if all questions are answered
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;

    // Update the timer text
    document.getElementById("timer").textContent = timeLeft;

    // End the quiz if time runs out
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Calculate the score percentage
  const scorePercentage = (score / quizQuestions.length) * 100;

  // Display the final score
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} out of ${quizQuestions.length}</p>
    <p>Score Percentage: ${scorePercentage}%</p>
  `;
}

// Add event listener to start the quiz when the start button is clicked
document.getElementById("start-button").addEventListener("click", startQuiz)
