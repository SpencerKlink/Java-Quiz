var startButton = document.getElementById('start-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var submitScoreForm = document.getElementById('submit-score-form');
var userScoreElement = document.getElementById('score');
var initialsInputElement = document.getElementById('initials');
var timerElement = document.getElementById('time'); 
var currentQuestionIndex, questionsShuffled, score, timer;
var timerInterval; 
//Questions section. More can be added, changed or removed
var questions = [ 
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'High Text Markup Language', correct: false },
            { text: 'Hyper Tabular Markup Language', correct: false },
            { text: 'None of these', correct: false }
        ]
    },
    {
        question: 'Which symbol is used for comments in JavaScript?',
        answers: [
            { text: '//', correct: true },
            { text: '/* */', correct: false },
            { text: '#', correct: false },
            { text: '<!-- -->', correct: false }
        ]
    },
    {
        question: 'How do you declare a JavaScript variable?',
        answers: [
            { text: 'var myVariable;', correct: true },
            { text: 'variable myVariable;', correct: false },
            { text: 'v myVariable;', correct: false },
            { text: 'None of the above', correct: false },
        ]
    },
    {
        question: 'Which method can be used to round a number to the nearest integer?',
        answers: [
        { text: 'Math.round()', correct: true },
        { text: 'Math.ceil()', correct: false },
        { text: 'Math.floor()', correct: false },
        { text: 'Number.round()', correct: false }
    ]
    },
    {
        question: 'How can you convert a string to an integer in JavaScript?',
        answers: [
        { text: 'parseInt()', correct: true },
        { text: 'toInt()', correct: false },
        { text: 'Number()', correct: false },
        { text: 'AsInt()', correct: false }
    ]
    },
    {
        question: 'Which of the following is a way to create an object in JavaScript?',
        answers: [
        { text: 'var obj = {};', correct: true },
        { text: 'var obj = new Obj();', correct: false },
        { text: 'var obj = new OBJECT();', correct: false },
        { text: 'var obj = Object();', correct: false }
    ]
    },
    {
        question: 'How do you add an element at the beginning of an array in JavaScript?',
        answers: [
        { text: 'arr.unshift(element);', correct: true },
        { text: 'arr.push(element);', correct: false },
        { text: 'arr.addFirst(element);', correct: false },
        { text: 'arr[0] = element;', correct: false }
    ]
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        answers: [
        { text: 'onclick', correct: true },
        { text: 'onmouseover', correct: false },
        { text: 'onchange', correct: false },
        { text: 'onmouseclick', correct: false }
    ]
    },
    {
        question: 'Which operator is used to check both the value and the type?',
        answers: [
        { text: '===', correct: true },
        { text: '==', correct: false },
        { text: '=', correct: false },
        { text: '!==', correct: false }
    ]
    },
    {
        question: 'What will the following code return: Boolean(10 > 9)?',
        answers: [
        { text: 'true', correct: true },
        { text: 'false', correct: false },
        { text: 'NaN', correct: false },
        { text: 'undefined', correct: false }
    ]
    },
    {
        question: 'How do you declare a JavaScript async function?',
        answers: [
        { text: 'async function myFunc(){}', correct: true },
        { text: 'function async myFunc(){}', correct: false },
        { text: 'function myFunc() async{}', correct: false },
        { text: 'asyncFunction myFunc(){}', correct: false }
    ]
    },
    {
        question: 'Which method is used to serialize an object into a JSON string?',
        answers: [
        { text: 'JSON.stringify()', correct: true },
        { text: 'JSON.serialize()', correct: false },
        { text: 'JSON.toObject()', correct: false },
        { text: 'JSON.parse()', correct: false }
    ]
    },
    {
        question: 'What is the purpose of the "this" keyword in JavaScript?',
        answers: [
        { text: 'Refers to the current object', correct: true },
        { text: 'Refers to the previous object', correct: false },
        { text: 'Refers to the global object', correct: false },
        { text: 'None of the above', correct: false }
    ]
    }
];

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hide');
    questionsShuffled = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    score = 0;
    timer = 60; 
    timerElement.textContent = timer; 
    startTimer(); 
    setNextQuestion();
}
//Time can be adjusted for more time or less depending on the amount of questions added or removed
function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endQuiz(); 
        }
    }, 1000); 
}

function setNextQuestion() {
    resetState();
    showQuestion(questionsShuffled[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}
//This determines what will happen depending on your answer to the question and if its correct or not
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    if (!correct) {
        timer -= 5; 
        if (timer < 0) timer = 0; 
        timerElement.textContent = timer; 
    } else {
        score += 10; 
    }
    if (questionsShuffled.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval); 
    questionContainerElement.classList.add('hide');
    document.getElementById('results-container').classList.remove('hide');
    userScoreElement.textContent = score;
}
//This event listener will submit your final score and save your name and score locally
submitScoreForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var initials = initialsInputElement.value.trim();
    if (initials) { 
        localStorage.setItem('initials', initials);
        localStorage.setItem('score', score.toString());
        
        alert(`Score saved! ${initials}: ${score}`);
        initialsInputElement.value = ''; 
        alert("Please enter your initials before submitting.");
    }
});
  