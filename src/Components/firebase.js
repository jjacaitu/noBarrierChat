import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBlKx7tzmawALlymKEkgJZiLdY4IE2VXHg",
    authDomain: "translatechat-6c518.firebaseapp.com",
    databaseURL: "https://translatechat-6c518.firebaseio.com",
    projectId: "translatechat-6c518",
    storageBucket: "translatechat-6c518.appspot.com",
    messagingSenderId: "187513714020",
    appId: "1:187513714020:web:aa171bc1b36018a37d3671"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
