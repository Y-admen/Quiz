// Page elements
const signupPage = document.getElementById('signup-page');
const loginPage = document.getElementById('login-page');
const quizStartPage = document.getElementById('quiz-start-page');
const quizPage = document.getElementById('quiz-page');

// Forms
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

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
});

// Quiz navigation
let currentQuestion = 1;
let flaggedQuestions = [];

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestion++;
    document.getElementById('question-text').textContent = `Question ${currentQuestion}`;
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 1) {
        currentQuestion--;
        document.getElementById('question-text').textContent = `Question ${currentQuestion}`;
    }
});

// Flag question
document.getElementById('flag-btn').addEventListener('click', () => {
    flaggedQuestions.push(currentQuestion);
    updateFlaggedList();
});

// Update flagged list
function updateFlaggedList() {
    const flaggedList = document.getElementById('flagged-list');
    flaggedList.innerHTML = '';
    flaggedQuestions.forEach((question) => {
        const li = document.createElement('li');
        li.textContent = `Question ${question}`;
        li.addEventListener('click', () => {
            currentQuestion = question;
            document.getElementById('question-text').textContent = `Question ${currentQuestion}`;
        });
        flaggedList.appendChild(li);
    });
}

// Logout button
document.getElementById('logout-btn').addEventListener('click', () => {
    quizPage.style.display = 'none';
    signupPage.style.display = 'block';
});

// Timer settings
let quizDuration = 300; // 5 minutes = 300 seconds
let timerInterval;

// صفحة جديدة لعرض النتيجة
const timeOutPage = document.getElementById('time-out-page');
const resultPage = document.getElementById('result-page');
const resultMessage = document.getElementById('result-message');

// Timer display
const timerDisplay = document.createElement('div');
timerDisplay.classList.add('timer');
document.querySelector('.quiz-header').appendChild(timerDisplay);

// Start quiz and timer
document.getElementById('start-quiz-btn').addEventListener('click', () => {
    quizStartPage.style.display = 'none';
    quizPage.style.display = 'block';
    document.getElementById('user-name').textContent = `${userData.firstName} ${userData.lastName}`;
    
    startTimer(quizDuration);
});

// Start Timer function
function startTimer(duration) {
    let timeRemaining = duration;
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        // Update timer display
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        // Check if time is out
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            quizPage.style.display = 'none';
            timeOutPage.style.display = 'block';
        }
        
        timeRemaining--;
    }, 1000);
}

// Submit button event
document.getElementById('submit-btn').addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    quizPage.style.display = 'none';
    resultPage.style.display = 'block';

    // Calculate score (this is a placeholder, you can replace it with real quiz logic)
    let score = Math.floor(Math.random() * 100); // Random score for demonstration
    resultMessage.textContent = `Your Score: ${score}`;

    if (score === 100) {
        resultMessage.textContent += ' Congratulations! You got the full mark!';
    }
});
