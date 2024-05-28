// Import the individual Firebase services you need
import { initializeApp } from 'firebase/app'; // Import the core Firebase module
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Authentication module
import { getFirestore } from 'firebase/firestore'; // Import Firebase Firestore module (if needed)

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

// Get the auth service
const auth = getAuth(firebaseApp);

// Handle sign-up form submission
async function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById('wf-sign-up-email').value;
  const password = document.getElementById('wf-sign-up-password').value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert('User signed up successfully');
  } catch (error) {
    alert('Error signing up: ' + error.message);
  }
}

// Handle login form submission
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('wf-log-in-email').value;
  const password = document.getElementById('wf-log-in-password').value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert('User signed in successfully');
  } catch (error) {
    alert('Error signing in: ' + error.message);
  }
}

// Handle account deletion
async function handleDeleteAccount() {
  const user = auth.currentUser;
  if (user) {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await user.delete();
        alert('User account deleted successfully');
      } catch (error) {
        alert('Error deleting account: ' + error.message);
      }
    }
  } else {
    alert('No user is currently signed in.');
  }
}

// Ensure DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const deleteAccountBtn = document.getElementById('delete-account-btn');

  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', handleSignup);
  }

  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', handleDeleteAccount);
  }
});
