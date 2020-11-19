const questions = [
  {
    question: "if a = 2.1 and b = 1.4 what is a*b",
    answers: ["2.94", "3.80", "1.12", "2.96"],
    correctAnswer: 0,
  },
  {
    question:
      "The average marks of a student in ten papers are 80. If the highest and the lowest scores are not considered, the average is 81. If his highest score is 92, find the lowest",
    answers: ["55", "60", "62", "can't be determined"],
    correctAnswer: 1,
  },
  {
    question:
      "A picture was bought at a certain sum, which was the price paid for its frame. Had the frame cost Rs 100 less and the picture Rs 75 more the price for the frame would have been picture Rs 75 more the price for the frame would have been only half of that of the picture. What is the price of the frame?",
    answers: ["75", "100", "175", "275"],
    correctAnswer: 3,
  },
  {
    question:
      "There are 6 tickets to the theater, four of which are for seats in the front row. 3 tickets are selected at random. What is the probability that two of them are for the front row?",
    answers: ["0.6", "0.7", "0.9", "1/3"],
    correctAnswer: 0,
  },
];

let questionCounter = document.getElementById("question-counter");
let questionElem = document.getElementById("question");
let answers = Array.from(document.querySelectorAll("#answers li"));
let time = document.getElementById("time");
let nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let answeredQuestions = {};
function loadQuestion() {
  let question = questions[currentQuestionIndex];
  nextBtn.setAttribute("disabled", true);
  questionCounter.innerText = `Question ${currentQuestionIndex + 1} / ${
    questions.length
  }`;

  questionElem.innerText = question.question;
  questionElem.setAttribute("questionID", currentQuestionIndex);
  answers.forEach((answerElem, index) => {
    answerElem.style.borderBottom = "none";
    answerElem.innerText = question.answers[index];
    answerElem.id = index;
  });

  time.innerText = 30;
}

let interval = setInterval(() => {
  time.innerText <= 10
    ? (time.style.color = "red")
    : (time.style.color = "black");
  if (Number(time.innerText) > 0) {
    time.innerText = Number(time.innerText) - 1;
  } else {
    if (
      answeredQuestions[questionElem.getAttribute("questionID")] === undefined
    ) {
      answeredQuestions[questionElem.getAttribute("questionID")] = null;
    }
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showResult();
      clearInterval(interval);
    }
  }
}, 1000);

answers.forEach((element) => {
  element.addEventListener("click", onChoose);
});

nextBtn.addEventListener("click", (e) => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResult();
    clearInterval(interval);
  }
});

function onChoose(e) {
  answers.forEach((element) => {
    element.style.borderBottom = "none";
  });
  e.target.style.borderBottom = "2px solid red";
  answeredQuestions[questionElem.getAttribute("questionID")] = Number(
    e.target.id
  );
  nextBtn.removeAttribute("disabled");
}

function showResult() {
  let correctAnswers = 0;
  questions.forEach((question, index) => {
    if (answeredQuestions[index] === question.correctAnswer) {
      correctAnswers++;
    }
  });

  let h1 = document.createElement("h1");
  h1.innerText = `You correctly answered ${correctAnswers} out of ${questions.length} questions`;
  let quizBoard = document.getElementById("quiz-board");
  document.body.replaceChild(h1, quizBoard);
}

window.onload = loadQuestion;
