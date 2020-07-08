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
// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
// [END get_messaging_object]
// [START set_public_vapid_key]
// Add the public key generated from the console here.
messaging.usePublicVapidKey('BPEuFU6kT_McSMSXLIIVr49BpQqXjHirLePjnEZbe4NG1Y_ySyHAwdBLO3E4FPbsgy32WTHggnM56nnLuZyE3dM');
// [END set_public_vapid_key]

// IDs of divs that display Instance ID token UI or request permission UI.
// const tokenDivId = 'token_div';
// const permissionDivId = 'permission_div';

// [START refresh_token]
// Callback fired if Instance ID token is updated.

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
  if (currentToken) {
    sendTokenToServer(currentToken);
    console.log("Token is: " + currentToken)
    // updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    // updateUIForPushPermissionRequired();
    setTokenSentToServer(false);
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
});

function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again ' + currentToken + 'unless it changes');
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}


function showToken(currentToken) {
  // Show token in console and UI.
  const tokenElement = document.querySelector('#token');
  tokenElement.textContent = currentToken;
}

export default firebase