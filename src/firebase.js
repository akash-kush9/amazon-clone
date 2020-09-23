import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAbBa9und5QhpT1OVNGhFsyTbYuKdLuQ9g",
  authDomain: "amaz-on-clone-c4.firebaseapp.com",
  databaseURL: "https://amaz-on-clone-c4.firebaseio.com",
  projectId: "amaz-on-clone-c4",
  storageBucket: "amaz-on-clone-c4.appspot.com",
  messagingSenderId: "255479621121",
  appId: "1:255479621121:web:587e60ca15226201a28200",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
const provider = firebase.auth.GoogleAuthProvider;
export { auth, db, provider };
