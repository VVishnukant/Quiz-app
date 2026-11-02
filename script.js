const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Chennai", correct: false },
            { text: "Kolkata", correct: false }
        ]
    },
    {
        question: "Which is the largest planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Who is known as the Father of the Nation in India?",
        answers: [
            { text: "Jawaharlal Nehru", correct: false },
            { text: "Mahatma Gandhi", correct: true },
            { text: "Bhagat Singh", correct: false },
            { text: "Subhas Chandra Bose", correct: false }
        ]
    },
    {
        question: "How many colours are there in a rainbow?",
        answers: [
            { text: "Five", correct: false },
            { text: "Six", correct: false },
            { text: "Seven", correct: true },
            { text: "Eight", correct: false }
        ]
    }
];

const questionELement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionELement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
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
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionELement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
         showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
});


startQuiz();