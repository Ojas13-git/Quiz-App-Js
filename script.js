const options = document.querySelector(".options").children;
const answerTrackerContainer = document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan2 = document.querySelector(".total-question2");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let score = 0;
let previousQuestionIndexs = [];

// questions and options and answers

const questions = [
  {
    q: "where is the capital of India",
    options: ["New Delhi", "Kolkatta", "Varanashi", "Agra"],
    answer: 1,
  },
  {
    q: "Who is the Prime Minister of India",
    options: [
      "Amit Shah",
      "Narendra Modi",
      "Rahul Gandhi",
      "None of the above",
    ],
    answer: 2,
  },
  {
    q: "where is the capital of MP",
    options: ["New Delhi", "Kolkatta", "bhopal", "Agra"],
    answer: 3,
  },
  {
    q: "Who is the Prime Minister of USA",
    options: [
      "Amit Shah",
      "Narendra Modi",
      "Rahul Gandhi",
      "None of the above",
    ],
    answer: 4,
  },
  {
    q: "where is the capital of UP",
    options: ["New Delhi", "Kolkatta", "Lakhnow", "Agra"],
    answer: 3,
  },
  {
    q: "Who is the Prime Minister of Gujrat",
    options: ["Amit Shah", "Narendra Modi", "Ahmendabad", "None of the above"],
    answer: 3,
  },
];

totalQuestionSpan.innerHTML = questions.length;

function load() {
  questionNumberSpan.innerHTML = index + 1;
  question.innerHTML = questions[questionIndex].q;
  op1.innerHTML = questions[questionIndex].options[0];
  op2.innerHTML = questions[questionIndex].options[1];
  op3.innerHTML = questions[questionIndex].options[2];
  op4.innerHTML = questions[questionIndex].options[3];
  index++;
}

function check(element) {
  if (element.id == questions[questionIndex].answer) {
    element.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    element.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
}

function disabledOptions() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add("disabled");
    if (options[i].id == questions[questionIndex].answer) {
      options[i].classList.add("correct");
    }
  }
}

function enableOptions() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("disabled", "correct", "wrong");
  }
}

function validate() {
  if (!options[0].classList.contains("disabled")) {
    alert("Please Select one option");
  } else {
    enableOptions();
    randomQuestion();
  }
}

function next() {
  validate();
}

function back() {
    if(index == 1){
        alert("you are at last ")
    } else{
        let  previousQuestionIndex = previousQuestionIndexs[index - 2]
        questionNumberSpan.innerHTML = index-1 ;
        question.innerHTML = questions[previousQuestionIndex].q;
        op1.innerHTML = questions[previousQuestionIndex].options[0];
        op2.innerHTML = questions[previousQuestionIndex].options[1];
        op3.innerHTML = questions[previousQuestionIndex].options[2];
        op4.innerHTML = questions[previousQuestionIndex].options[3];
        index--
  }
}

function randomQuestion() {
  let randomNumber = Math.round(Math.random() * (questions.length - 1));
  previousQuestionIndexs.push(randomNumber);
  let hitDuplicate = 0;
  if (index == questions.length) {
    quizOver();
  } else {
    if (myArray.length > 0) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] == randomNumber) {
          hitDuplicate = 1;
          break;
        }
      }
      if (hitDuplicate == 1) {
        randomQuestion();
      } else {
        questionIndex = randomNumber;
        load();
      }
    }
    if (myArray.length == 0) {
      questionIndex = randomNumber;
      load();
    }
  }
}

function answerTrakcer() {
  for (let i = 0; i < questions.length; i++) {
    const div = document.createElement("div");
    answerTrackerContainer.appendChild(div);
  }
}

function updateAnswerTracker(classNam) {
  answerTrackerContainer.children[index - 1].classList.add(classNam);
}

function quizOver() {
  document.querySelector(".quiz-over").classList.add("show");
  correctAnswerSpan.innerHTML = score;
  totalQuestionSpan2.innerHTML = questions.length;
  percentage.innerHTML = (score / questions.length) * 100 + "%";
}

function tryAgain() {
  window.location.reload();
}

window.onload = function () {
  randomQuestion();
  answerTrakcer();
};
