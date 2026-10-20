// ===========================
// Quiz Questions
// ===========================

const quizData = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Hyper Transfer Machine Language",
            "Home Tool Markup Language",
            "Hyperlink Text Management Language"
        ],
        answer: 0
    },

    {
        question: "Which language is used for styling web pages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: 1
    },

    {
        question: "Which language is used to make a website interactive?",
        options: [
            "CSS",
            "JavaScript",
            "SQL",
            "C++"
        ],
        answer: 1
    },

    {
        question: "Which tag is used to create a hyperlink?",
        options: [
            "<img>",
            "<a>",
            "<link>",
            "<p>"
        ],
        answer: 1
    },

    {
        question: "Which company developed JavaScript?",
        options: [
            "Microsoft",
            "Netscape",
            "Google",
            "Apple"
        ],
        answer: 1
    },

    {
        question: "Which HTML tag displays the largest heading?",
        options: [
            "<h6>",
            "<heading>",
            "<h1>",
            "<head>"
        ],
        answer: 2
    },

    {
        question: "Which property changes the background color in CSS?",
        options: [
            "font-color",
            "background-color",
            "color",
            "bgcolor"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for IDs in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        answer: 1
    },

    {
        question: "Which method displays a message box in JavaScript?",
        options: [
            "display()",
            "message()",
            "alert()",
            "show()"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag inserts an image?",
        options: [
            "<picture>",
            "<image>",
            "<img>",
            "<src>"
        ],
        answer: 2
    }

];

// ===========================
// Variables
// ===========================

let currentQuestion = 0;

let score = 0;

let skipped = 0;

let wrong = 0;

let userAnswers = new Array(quizData.length).fill(null);

// ===========================
// Selecting Elements
// ===========================

const question = document.getElementById("question");

const options = document.querySelector(".options");

const questionNumber = document.getElementById("question-number");

const scoreText = document.getElementById("score");

const progress = document.querySelector(".progress");

const previousBtn = document.getElementById("previous");

const nextBtn = document.getElementById("next");

const skipBtn = document.getElementById("skip");

const submitBtn = document.getElementById("submit");

// ===========================
// Load Question
// ===========================

function loadQuestion() {

    let current = quizData[currentQuestion];

    question.innerText = current.question;

    questionNumber.innerText =
        `Question ${currentQuestion + 1} of ${quizData.length}`;

    scoreText.innerText =
        `Score : ${score}`;

    progress.style.width =
        ((currentQuestion + 1) / quizData.length) * 100 + "%";

    options.innerHTML = "";

    current.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.classList.add("option");

        button.innerText = option;

        // Restore previous selected answer

        if (userAnswers[currentQuestion] === index) {

            button.style.background = "#dbeafe";

            button.style.borderColor = "#2563eb";

        }

        button.addEventListener("click", () => {

            document.querySelectorAll(".option").forEach(btn => {

                btn.style.background = "#ffffff";

                btn.style.borderColor = "#d8d8d8";

            });

            button.style.background = "#dbeafe";

            button.style.borderColor = "#2563eb";

            userAnswers[currentQuestion] = index;

        });

        options.appendChild(button);

    });

    previousBtn.disabled = currentQuestion === 0;

    if (currentQuestion === quizData.length - 1) {

        nextBtn.style.display = "none";

        submitBtn.style.display = "block";

    }

    else {

        nextBtn.style.display = "block";

        submitBtn.style.display = "none";

    }

}

// ===========================
// First Question
// ===========================

loadQuestion();
// ===========================
// Next Button
// ===========================

nextBtn.addEventListener("click", () => {

    if (userAnswers[currentQuestion] === null) {

        alert("Please select an option or click Skip.");

        return;
    }

    currentQuestion++;

    loadQuestion();

});

// ===========================
// Previous Button
// ===========================

previousBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});

// ===========================
// Skip Button
// ===========================

skipBtn.addEventListener("click", () => {

    if (userAnswers[currentQuestion] === null) {

        skipped++;

    }

    if (currentQuestion < quizData.length - 1) {

        currentQuestion++;

        loadQuestion();

    }

});

// ===========================
// Submit Quiz
// ===========================

submitBtn.addEventListener("click", () => {

    calculateResult();

});

// ===========================
// Calculate Result
// ===========================

function calculateResult() {

    score = 0;

    wrong = 0;

    skipped = 0;

    for (let i = 0; i < quizData.length; i++) {

        if (userAnswers[i] === null) {

            skipped++;

        }

        else if (userAnswers[i] === quizData[i].answer) {

            score++;

        }

        else {

            wrong++;

        }

    }

    document.querySelector(".container").style.display = "none";

    document.querySelector(".result-container").style.display = "block";

    document.getElementById("final-score").innerText =
        `${score} / ${quizData.length}`;

    document.getElementById("percentage").innerText =
        `Percentage : ${((score / quizData.length) * 100).toFixed(0)}%`;

    document.getElementById("correct-count").innerText =
        `✅ Correct Answers : ${score}`;

    document.getElementById("wrong-count").innerText =
        `❌ Wrong Answers : ${wrong}`;

    document.getElementById("skip-count").innerText =
        `⏭ Skipped Questions : ${skipped}`;

    setResultMessage();

}

// ===========================
// Result Message & Emoji
// ===========================

function setResultMessage() {

    const message = document.getElementById("result-message");

    const emoji = document.querySelector(".emoji");

    switch(score){

        case 10:

            message.innerText="Outstanding!";

            emoji.innerText="🏆";

            break;

        case 9:

            message.innerText="Excellent!";

            emoji.innerText="🌟";

            break;

        case 8:

            message.innerText="Very Good!";

            emoji.innerText="😄";

            break;

        case 7:

            message.innerText="Good!";

            emoji.innerText="🙂";

            break;

        case 6:

            message.innerText="Nice Try!";

            emoji.innerText="😊";

            break;

        case 5:

            message.innerText="Average!";

            emoji.innerText="😐";

            break;

        case 4:

            message.innerText="Keep Practicing!";

            emoji.innerText="😕";

            break;

        case 3:

            message.innerText="Better Luck Next Time!";

            emoji.innerText="😞";

            break;

        case 2:

            message.innerText="Don't Give Up!";

            emoji.innerText="😢";

            break;

        case 1:

            message.innerText="Study More!";

            emoji.innerText="😭";

            break;

        default:

            message.innerText="Try Again!";

            emoji.innerText="💀";

    }

}

// ===========================
// Restart Quiz
// ===========================

document.getElementById("restart").addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    wrong = 0;

    skipped = 0;

    userAnswers = new Array(quizData.length).fill(null);

    document.querySelector(".container").style.display = "block";

    document.querySelector(".result-container").style.display = "none";

    loadQuestion();

});