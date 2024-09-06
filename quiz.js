// User Registration Logic
function registerUser(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(email)) {
        alert('User already exists');
        return;
    }

    // Create user object
    const user = {
        firstName,
        lastName,
        email,
        password // In a real application, never store plain text passwords
    };

    // Store user in localStorage
    localStorage.setItem(email, JSON.stringify(user));
    alert('User registered successfully');
    window.location.href = 'login.html';
}

// User Login Logic
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('confirmPassword').value;

    // Retrieve user from localStorage
    const userString = localStorage.getItem(email);
    if (!userString) {
        alert('User not found');
        return;
    }

    const user = JSON.parse(userString);
    if (user.password !== password) {
        alert('Incorrect password');
        return;
    }

    // Set session
    sessionStorage.setItem('loggedInUser', email);
    alert('Login successful');
    window.location.href = './quiz.html'; // Redirect to quiz page
}

// Session Management
function checkLoginStatus() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
            window.location.href = 'quiz.html'; // Redirect to quiz page if already logged in
        }
    } else {
        if (window.location.pathname.includes('quiz.html')) {
            window.location.href = './login.html'; // Redirect to login page if not logged in
        }
    }
}

function logoutUser() {
    sessionStorage.removeItem('loggedInUser');
    alert('Logged out successfully');
    window.location.href = './login.html';
}

// Event Listeners
window.addEventListener('load', checkLoginStatus);

if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', registerUser);
}

if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', loginUser);
}

// Add logout button to quiz page
if (window.location.pathname.includes('quiz.html')) {
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', logoutUser);
    document.body.appendChild(logoutButton);
}