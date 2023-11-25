// firebaseHandler.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, push, set, query, orderByChild, equalTo, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";


const firebaseConfig = {
    //replace here with api info
    apiKey: "AIzaSyCN-En8Aggb8gRm9OcNnkn9BpoqImHsiOs",
    authDomain: "gpt-tutor-85689.firebaseapp.com",
    projectId: "gpt-tutor-85689",
    storageBucket: "gpt-tutor-85689.appspot.com",
    messagingSenderId: "749346035662",
    appId: "1:749346035662:web:e4fcae5979840da3503d9f",
    measurementId: "G-YXQQHJEHT8"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var email = document.querySelector('[name="username"]').value;
    var password = document.querySelector('[name="password"]').value;
  
    // Check if username and password are not empty
    if (!email || !password) {
      alert('Username and password are required!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (!password) {
      alert('Password is required!');
      return;
    }
  
    var passwordHash = CryptoJS.SHA256(password).toString();
  
// Reference to the users in the database
const usersRef = ref(database, 'Users');
  
// Query the database for the submitted email
const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));

get(emailQuery).then((snapshot) => {
  if (snapshot.exists()) {
    alert('An account with this email already exists.');
    return;
  }

  // If no existing user, create a new user reference with a unique key
  const newUserRef = push(usersRef);

  // Set the user data at the new reference
  set(newUserRef, {
    email: email,
    password: passwordHash
  }).then(() => {
    alert('Sign Up Successful!');
    window.location.href = 'quiz_one.html';
  }).catch((error) => {
    console.error('Error saving data: ', error);
    alert('Error during sign up. Please try again.');
  });

}).catch((error) => {
  console.error('Error querying database: ', error);
  alert('Error checking user existence.');
});

});
  
