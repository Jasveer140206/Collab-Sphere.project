const firebaseConfig = {
    apiKey: "AIzaSyAJAzQb0DJlj0nNUbGRLS7hC3oZ11BjpmQ",
    authDomain: "collabsphere-8e836.firebaseapp.com",
    projectId: "collabsphere-8e836",
    storageBucket: "collabsphere-8e836.firebasestorage.app",
    messagingSenderId: "934484819548",
    appId: "1:934484819548:web:0a7d77dab19eb82a8b7099"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();