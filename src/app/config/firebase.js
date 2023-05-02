import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBlFzugN5PUIc8xK2YZuOptMnoGqqcOD60",
    authDomain: "react-demo-c5653.firebaseapp.com",
    projectId: "react-demo-c5653",
    storageBucket: "react-demo-c5653.appspot.com",
    messagingSenderId: "798146450723",
    appId: "1:798146450723:web:b1a6c633e2a2daaa1e2896",
    measurementId: "G-X8FJFW76JF"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;