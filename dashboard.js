
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc , query, where, } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtkI4o51mAXz3ao0f75Q8vRWjg__SPNYk",
    authDomain: "project-1-625dd.firebaseapp.com",
    projectId: "project-1-625dd",
    storageBucket: "project-1-625dd.appspot.com",
    messagingSenderId: "792797629307",
    appId: "1:792797629307:web:0d975c15f2ef3348f30bde",
    measurementId: "G-K5CEMCKPMQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const blogList = document.getElementById('blog-list');

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('user-email').textContent = `Logged in as: ${user.email}`;
        loadBlogs(user.uid);
    } else {
        window.location.href = "signin.html";
    }
});

document.getElementById('logout-button').addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('Logged out successfully!');
        window.location.href = "signin.html";
    }).catch((error) => {
        alert(error.message);
    });
});

document.getElementById('add-blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;

    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            uid: auth.currentUser.uid,
            title: title,
            content: content,
            createdAt: new Date()
        });
        console.log("Blog post added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e.message);
    }
    
});
 






async function loadBlogs(uid) {
    blogList.innerHTML = '';
    try {
       const q = query(collection(db, "blogs"), where("uid", "==", uid));
        
     const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            const blogData = doc.data();
            const blogItem = document.createElement('div');
            blogItem.className = 'blog-item';
            blogItem.innerHTML = `
                <h4>${blogData.title}</h4>
                <p>${blogData.content}</p>
                <button onclick="deleteBlog('${doc.id}')">Delete</button>
                <hr>
            `;
            blogList.appendChild(blogItem);
        });
    } catch (e) {
        console.error("Error loading blogs: ", e.message);
    }
}


window.deleteBlog = async (id) => {
    try {
        await deleteDoc(doc(db, "blogs", id));
        alert("Blog post deleted!");
        loadBlogs(auth.currentUser.uid); // Reload the blogs
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};
