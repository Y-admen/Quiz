const signupPage = document.getElementById('signup-page');
const loginPage = document.getElementById('login-page');
const quizStartPage = document.getElementById('quiz-start-page');
const quizPage = document.getElementById('quiz-page');
const logoutBtn = document.getElementById('logout-btn');

// Forms
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

logoutBtn.addEventListener('click', () => {
    // Reset user data
    userData = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    clearInterval(timerInterval);

    // Hide all pages
    quizPage.style.display = 'none';
    loginPage.style.display = 'none';
    quizStartPage.style.display = 'none';
    document.getElementById('result-page').style.display = 'none';

    // Show signup page
    signupPage.style.display = 'block';

    // Clear form inputs
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('user-image-input').value = '';
});
// User data
let userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

// Signup event
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userData.firstName = document.getElementById('first-name').value;
    userData.lastName = document.getElementById('last-name').value;
    userData.email = document.getElementById('signup-email').value;
    userData.password = document.getElementById('signup-password').value;

    const imageFile = document.getElementById('user-image-input').files[0];
    if (imageFile) {
        userData.imageUrl = URL.createObjectURL(imageFile);
    }

    signupPage.style.display = 'none';
    loginPage.style.display = 'block';
});

// Login event
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === userData.email && password === userData.password) {
        loginPage.style.display = 'none';
        quizStartPage.style.display = 'block';
    } else {
        alert('Invalid login credentials');
    }
});

// Start quiz
document.getElementById('start-quiz-btn').addEventListener('click', () => {
    quizStartPage.style.display = 'none';
    quizPage.style.display = 'block';
    document.getElementById('user-name').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('user-image').src = userData.imageUrl || 'SignUp.png';
    startTimer(600); // 10-minute timer
    loadQuestion(currentQuestion);
});

let currentQuestion = 0;
let score = 0;
const totalQuestions = 20;

// Questions and answers
const questions = [{
        question: "1. What is the primary goal of AI?",
        options: ["A) To mimic human intelligence", "B) To replace human intelligence", "C) To enhance human capabilities", "D) To eliminate human intelligence"],
        answer: "A"
    },
    {
        question: "2. Which of the following is an example of AI application?",
        options: ["A) Email", "B) Calculator", "C) Social media", "D) Self-driving cars"],
        answer: "D"
    },
    {
        question: "3. What is the core concept of machine learning?",
        options: ["A) Predefined rules", "B) Learning from data", "C) Random decision-making", "D) No decision-making"],
        answer: "B"
    },
    {
        question: "4. Which programming language is commonly used in AI development?",
        options: ["A) Java", "B) C++", "C) Python", "D) HTML"],
        answer: "C"
    },
    {
        question: "5. What is the purpose of natural language processing (NLP)?",
        options: ["A) Analyzing human languages", "B) Writing computer programs", "C) Developing algorithms", "D) Creating visual graphics"],
        answer: "A"
    },
    {
        question: "6. What type of AI system is designed to perform a specific task?",
        options: ["A) General AI", "B) Narrow AI", "C) Strong AI", "D) Weak AI"],
        answer: "B"
    },
    {
        question: "7. Which AI technique involves learning from experience?",
        options: ["A) Supervised learning", "B) Unsupervised learning", "C) Reinforcement learning", "D) Semi-supervised learning"],
        answer: "C"
    },
    {
        question: "8. What is the term for AI systems that improve over time?",
        options: ["A) Static AI", "B) Dynamic AI", "C) Adaptive AI", "D) Fixed AI"],
        answer: "C"
    },
    {
        question: "9. Which AI application is used for identifying patterns in large datasets?",
        options: ["A) Clustering", "B) Classification", "C) Regression", "D) Association"],
        answer: "A"
    },
    {
        question: "10. What is the purpose of neural networks in AI?",
        options: ["A) Mimicking the human brain", "B) Processing audio signals", "C) Generating random numbers", "D) Conducting online searches"],
        answer: "A"
    },
    {
        question: "11. Which AI technology allows machines to understand and respond to human language?",
        options: ["A) Speech recognition", "B) Image recognition", "C) Text mining", "D) Sentiment analysis"],
        answer: "A"
    },
    {
        question: "12. What is the main challenge in developing AI systems with ethical considerations?",
        options: ["A) Cost", "B) Bias", "C) Speed", "D) Security"],
        answer: "B"
    },
    {
        question: "13. Which AI technique is used to predict future outcomes based on historical data?",
        options: ["A) Supervised learning", "B) Unsupervised learning", "C) Reinforcement learning", "D) Regression analysis"],
        answer: "D"
    },
    {
        question: "14. What is the term for AI systems that can make decisions without human intervention?",
        options: ["A) Autonomous AI", "B) Dependent AI", "C) Controlled AI", "D) Manual AI"],
        answer: "A"
    },
    {
        question: "15. Which AI application is used for identifying anomalies or outliers in data?",
        options: ["A) Clustering", "B) Classification", "C) Outlier detection", "D) Association"],
        answer: "C"
    },
    {
        question: "16. What is the purpose of deep learning in AI?",
        options: ["A) Processing emotions", "B) Analyzing complex data", "C) Mimicking social behavior", "D) Performing physical tasks"],
        answer: "B"
    },
    {
        question: "17. Which AI technology is used to recognize objects in images or videos?",
        options: ["A) Speech recognition", "B) Image recognition", "C) Text mining", "D) Sentiment analysis"],
        answer: "B"
    },
    {
        question: "18. What is the term for AI systems that can handle unforeseen situations?",
        options: ["A) Predictive AI", "B) Reactive AI", "C) Proactive AI", "D) Adaptive AI"],
        answer: "D"
    },
    {
        question: "19. Which AI technique is used for grouping similar data points together?",
        options: ["A) Clustering", "B) Classification", "C) Regression", "D) Association"],
        answer: "A"
    },
    {
        question: "20. What is the potential impact of AI on the future of work?",
        options: ["A) Increased unemployment", "B) Higher job satisfaction", "C) Improved work-life balance", "D) More job opportunities"],
        answer: "A"
    }
];

// Load question
function loadQuestion(index) {
    const question = questions[index];
    document.getElementById('question-text').textContent = question.question;
    const options = question.options.map((option, i) => `
        <input type="radio" name="option" id="option${i}" value="${option.charAt(0)}">
        <label for="option${i}">${option}</label><br>
    `).join('');
    document.getElementById('options-container').innerHTML = options;

    // Activate the "Previous" button if this is not the first question
    document.getElementById('prev-btn').disabled = index === 0;
}

// Navigate to next question
document.getElementById('next-btn').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const selectedAnswer = selectedOption.value;
        if (selectedAnswer === questions[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            loadQuestion(currentQuestion);
        } else {
            endQuiz();
        }
    } else {
        alert('Please select an answer.');
    }
});

// Navigate to previous question
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
});

// End quiz and show the result
function endQuiz() {
    quizPage.style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    document.getElementById('result-message').textContent = `Your Score: ${score} / ${totalQuestions}`;
}

// Timer settings
let timerInterval;

function startTimer(duration) {
    let timeRemaining = duration;
    const timerDisplay = document.getElementById('timer-display');

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuiz(); // End quiz when time is out
        }
        timeRemaining--;
    }, 1000);
}


// Flagged questions list
const flaggedQuestions = [];

// Flag button event listener
document.getElementById('flag-btn').addEventListener('click', () => {
    if (!flaggedQuestions.includes(currentQuestion)) {
        flaggedQuestions.push(currentQuestion);
        updateFlaggedList();
    }
});

// Update flagged questions list
function updateFlaggedList() {
    const flaggedList = document.getElementById('flagged-list');
    flaggedList.innerHTML = '';
    flaggedQuestions.forEach(questionIndex => {
        const listItem = document.createElement('li');
        listItem.textContent = `Question ${questionIndex + 1}`;
        listItem.addEventListener('click', () => {
            currentQuestion = questionIndex;
            loadQuestion(currentQuestion);
        });
        flaggedList.appendChild(listItem);
    });
}

// Return to flagged questions
const returnFlaggedBtn = document.getElementById('return-flagged-btn');

function returnToFlaggedQuestions() {
    if (flaggedQuestions.length > 0) {
        currentQuestion = flaggedQuestions[0];
        loadQuestion(currentQuestion);
        flaggedQuestions.shift();
        updateFlaggedList();
    } else {
        alert('No flagged questions remaining.');
    }
}

returnFlaggedBtn.addEventListener('click', returnToFlaggedQuestions);


function updateFlaggedList() {
    const flaggedList = document.getElementById('flagged-list');
    flaggedList.innerHTML = '';
    flaggedQuestions.forEach(questionIndex => {
        const listItem = document.createElement('li');
        listItem.textContent = `Question ${questionIndex + 1}`;
        listItem.addEventListener('click', () => {
            currentQuestion = questionIndex;
            loadQuestion(currentQuestion);
        });
        flaggedList.appendChild(listItem);
    });
}

// Update flagged questions list
function updateFlaggedList() {
    const flaggedList = document.getElementById('flagged-list');
    flaggedList.innerHTML = '';
    flaggedQuestions.forEach(questionIndex => {
        const listItem = document.createElement('li');
        listItem.textContent = `Question ${questionIndex + 1}`;
        listItem.addEventListener('click', () => {
            currentQuestion = questionIndex;
            loadQuestion(currentQuestion);
            // Ensure the quiz page is visible
            document.getElementById('quiz-page').style.display = 'block';
            // Hide other pages if necessary
            document.getElementById('quiz-start-page').style.display = 'none';
            document.getElementById('result-page').style.display = 'none';
        });
        flaggedList.appendChild(listItem);
    });
}

// Handle quiz submit
document.getElementById('submit-btn').addEventListener('click', () => {
    endQuiz();
});

returnFlaggedBtn.addEventListener('click', returnToFlaggedQuestions);