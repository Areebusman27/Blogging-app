
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCtkI4o51mAXz3ao0f75Q8vRWjg__SPNYk",
    authDomain: "project-1-625dd.firebaseapp.com",
    projectId: "project-1-625dd",
    storageBucket: "project-1-625dd.appspot.com",
    messagingSenderId: "792797629307",
    appId: "1:792797629307:web:0d975c15f2ef3348f30bde",
    measurementId: "G-K5CEMCKPMQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  import { getAuth ,
    createUserWithEmailAndPassword
   } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
 
 
  
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log("auth => ", getAuth(app));

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('User signed up successfully!');
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert(error.message);
            console.log("error");
            
        });
});
