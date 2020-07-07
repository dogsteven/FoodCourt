import firebase from './firebase'

let messaging = firebase.messaging()

messaging.onMessage((payload) => {
    console.log(payload)
})

export default messaging

