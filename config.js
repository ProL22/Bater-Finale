import firebase from 'firebase'
require('firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyBnlPG7daTETx6iW5NAi-WSa_4TtFE9ErU",
    authDomain: "everydayneeds-a130e.firebaseapp.com",
    projectId: "everydayneeds-a130e",
    storageBucket: "everydayneeds-a130e.appspot.com",
    messagingSenderId: "654936969582",
    appId: "1:654936969582:web:55b4fd36a56225783ef17f",
    measurementId: "G-7Z1WZXTQHM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()