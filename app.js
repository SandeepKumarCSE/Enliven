 
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
 


 const firebaseConfig = {
   apiKey: "AIzaSyCCrQNpP3NKx6VeXsxIOgx6qbDd7uBclgM",
   authDomain: "rahulji-b36b1.firebaseapp.com",
   projectId: "rahulji-b36b1",
   storageBucket: "rahulji-b36b1.firebasestorage.app",
   messagingSenderId: "114604315111",
   appId: "1:114604315111:web:dbd40f3c0650e51377ed42",
   measurementId: "G-WDT0T24TSY"
 };

 
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const showLogin = document.getElementById('showLogin');
const showSignup = document.getElementById('showSignup');


showLogin.addEventListener('click', showLoginForm);
showSignup.addEventListener('click', showSignupForm);
signupForm.addEventListener('submit', handleSignup);
loginForm.addEventListener('submit', handleLogin);


function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

// Signup handler
async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        document.getElementById('signup-error').textContent = "Passwords do not match";
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: name });
        alert('Registration successful! Redirecting...');
        window.location.href = './MAIN/index.html';
    } catch (error) {
        handleAuthError(error, 'signup-error');
    }
}

// Login handler
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert('Login successful! Redirecting...');
        window.location.href = '/dashboard';
    } catch (error) {
        handleAuthError(error, 'login-error');
    }
}


function handleAuthError(error, elementId) {
    let message = '';
    switch (error.code) {
        case 'auth/email-already-in-use':
            message = 'Email already in use';
            break;
        case 'auth/invalid-email':
            message = 'Invalid email address';
            break;
        case 'auth/weak-password':
            message = 'Password should be at least 6 characters';
            break;
        case 'auth/user-not-found':
            message = 'User not found';
            break;
        case 'auth/wrong-password':
            message = 'Incorrect password';
            break;
        default:
            message = 'Error processing request';
    }
    document.getElementById(elementId).textContent = message;
}

// Auth state listener
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in:', user.email);
        
    } else {
        console.log('User logged out');
    }
});