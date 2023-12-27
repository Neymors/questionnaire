const questions = [
    {
        questions: "What is the name of Bart teacher in the series The Simpson?",
        answers: [
            { text: "Meredith Grey", correct: false},
            { text: "Allison Tylor", correct: false},
            { text: "Edma Krabappel", correct: true},
            { text: "Eleanor Abernathy", correct: false},
        ]
    },

    {
        questions: "What is George O'Malley's pseudonym?",
        answers: [
            { text: "McRebound", correct: false},
            { text: "manwhore and slut", correct: false},
            { text: "010", correct: false},
            { text: "007", correct: true},
        ]
    },

    {
        questions: "where was the series filmed Sex Education?",
        answers: [
            { text: "Newport", correct: false},
            { text: "Swansea", correct: false},
            { text: "Dundee", correct: false},
            { text: "Symonds YatRoss-on-Wye", correct: true},
        ]
    },
];

const questionsElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currenQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currenQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currenQuestion = questions[currenQuestionIndex];
    let questionNo = currenQuestionIndex + 1;
    questionsElement.innerHTML = questionNo + ". " + currenQuestion.questions;

    currenQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionsElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currenQuestionIndex++;
    if(currenQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currenQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
