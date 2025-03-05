// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARlLIQt2SS916A9QoxsPlyDqyf43HJ_uw",
  authDomain: "unichat-b3e8e.firebaseapp.com",
  projectId: "unichat-b3e8e",
  storageBucket: "unichat-b3e8e.firebasestorage.app",
  messagingSenderId: "915186019211",
  appId: "1:915186019211:web:4fc0e74c774bdc43dc5d8e",
  measurementId: "G-GV728G8PS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Simulated Database
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Signup Functionality
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = { username, email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    window.location.href = 'login.html';
});

// Login Functionality
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password.');
    }
});

// Post Creation
document.getElementById('postForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const content = document.getElementById('postContent').value;
    const image = document.getElementById('postImage').files[0];

    const post = {
        id: posts.length + 1,
        username: JSON.parse(localStorage.getItem('currentUser')).username,
        content,
        image: image ? URL.createObjectURL(image) : null,
        likes: 0,
        comments: []
    };
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    window.location.href = 'index.html';
});

// Render Posts
document.addEventListener('DOMContentLoaded', function () {
    renderPosts();
});

function renderPosts() {
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = ''; // Clear previous posts

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (posts.length === 0) {
        postContainer.innerHTML = '<p class="text-center">No posts available.</p>';
        return;
    }

    posts.reverse().forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('card', 'mb-3', 'shadow-sm');

        let postContent = `
            <div class="card-body">
                <p class="card-text">${post.content || ''}</p>
        `;

        if (post.image) {
            postContent += `<img src="${post.image}" class="img-fluid rounded mt-2" alt="Post Image">`;
        }

        postContent += `</div>`;
        postElement.innerHTML = postContent;
        postContainer.appendChild(postElement);
    });
}


// Like Post
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    post.likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
}

// Comment Post
function commentPost(postId) {
    const comment = prompt('Enter your comment:');
    if (comment) {
        const post = posts.find(p => p.id === postId);
        post.comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    }
}

// Share Post
function sharePost(postId) {
    alert('Post shared!');
}

// Render posts on page load
if (window.location.pathname.endsWith('index.html')) {
    renderPosts();
}