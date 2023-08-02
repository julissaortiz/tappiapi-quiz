const counter = document.getElementById("Timer");
const startQuiz = document.getElementById("start-quiz");
const starterPage = document.getElementById("starter-page");
const questionsEl = document.getElementById("questions");
const questionsTitle = document.getElementById("questions-title");
const choicesEl = document.getElementById("choices");
const submitEl = document.getElementById("submit");
const lastScreenEl = document.getElementById("last-screen");
const scoreEl = document.getElementById("Final-Score");
const initialsEl = document.getElementById("Initials");

let questionIndex = 0;
let score = 0;
let time = 0;

const endQuiz = () => {
  questionsEl.setAttribute("class", "hide");
  scoreEl.textContent = score;
  lastScreenEl.setAttribute("class", "visible");
  questionIndex = 0;
};
const startTimer = () => {
  time = 1000 * 6;
  let countDown = setInterval(() => {
    if (time > 0) {
      counter.textContent = time;
      time--;
    } else {
      counter.textContent = "--";
      /*endQuiz()*/
      clearInterval(countDown);
    }
  }, 1000);
};

const startQuestions = () => {
  questionsEl.setAttribute("class", "visible");
  questionsTitle.textContent = questions[questionIndex].Question;
  choicesEl.innerHTML = "";
  let answers = questions[questionIndex].Options;
  for (let i = 0; i < questions.length; i++) {
    console.log(questions.length);
    //let answers = questions[questionIndex].Options;
    //console.log(answers[i]);
    var button = document.createElement("submit");
    //var choiceButton=document.createElement()
    // button.textContent = answers;
    button.setAttribute("class", "answers");
    button.setAttribute("value", questions[questionIndex].Answer);
    button.textContent = i + 1 + " " + answers[i];
    //console.log(answers[i]);
    choicesEl.appendChild(button);
  }
};

const choicesHandler = (event) => {
  let choice = event.target;
  let choiceData = choice.getAttribute("value");
  console.log(Number(choiceData));
  let answer = questions[questionIndex].Answer;
  console.log("ANSWER");
  console.log(answer);
  if (answer === Number(choiceData)) {
    console.log("LOOK HERE");
    console.log(answer + choiceData);
    score += 50;
  } else {
    console.log("WRONG");
    time -= 12;
  }

  if (questionIndex === questions.length - 1) {
    time = 0;
    endQuiz();
  } else {
    questionIndex++;
    startQuestions();
  }
};

/*const startQuestions = () => {
    questionsEl.setAttribute("class", "visible");
    questionsTitle.textContent = questions[questionIndex].Question;
    choicesEl.innerHTML = "";
    //let answers = questions[questionIndex].Options;
    for (i = 0; i < questions.length; i++) {
      let answers = questions[questionIndex].Options;
      //console.log(answers[i]);
      var button = document.createElement("submit");
      //var choiceButton=document.createElement()
      //button.textContent = answers;
      button.setAttribute("class", "answers");
      button.setAttribute("value", answers);
      button.textContent = i + " " + answers[i];
      console.log(answers[i]);
      choicesEl.appendChild(button);
    }
  };
*/

const startHandler = () => {
  startTimer();
  starterPage.setAttribute("class", "hide");
  startQuestions();
};

const submitHandler = () => {
  let highScore = localStorage.getItem("High-Score");
  let parsedScore = JSON.parse(highScore);
  let Initials = initialsEl.value;
  console.log(Initials);
  if (highScore === null) {
    highScore = score;
    localStorage.setItem("High-Score", JSON.stringify(highScore));
    localStorage.setItem("Initials", JSON.stringify(Initials));
  }

  if (score > parsedScore) {
    localStorage.setItem("High-Score", JSON.stringify(score));
    localStorage.setItem("Initials", JSON.stringify(Initials));
  }

  score = 0;
  lastScreenEl.setAttribute("class", "hide");
  starterPage.setAttribute("class", "visible");
};

startQuiz.addEventListener("click", startHandler);
choicesEl.addEventListener("click", choicesHandler);
submitEl.addEventListener("click", submitHandler);
