import firebase from 'firebase'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/messaging'

var firebaseConfig = {
    apiKey: "AIzaSyDbIOTnGRqZ9I8qKD1CSLm7nrZ0iYKuoTM",
    authDomain: "food-app-e9bf0.firebaseapp.com",
    databaseURL: "https://food-app-e9bf0.firebaseio.com",
    projectId: "food-app-e9bf0",
    storageBucket: "food-app-e9bf0.appspot.com",
    messagingSenderId: "1040681844532",
    appId: "1:1040681844532:web:e7d5ac873413b738ca6f61",
    measurementId: "G-KDKCBB3FP2"
}

firebase.initializeApp(firebaseConfig)

export default firebase