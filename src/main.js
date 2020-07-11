import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from './firebase'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
// [END get_messaging_object]
// [START set_public_vapid_key]
// Add the public key generated from the console here.
messaging.usePublicVapidKey('BPEuFU6kT_McSMSXLIIVr49BpQqXjHirLePjnEZbe4NG1Y_ySyHAwdBLO3E4FPbsgy32WTHggnM56nnLuZyE3dM');
// [END set_public_vapid_key]


// [START refresh_token]
// Callback fired if Instance ID token is updated.

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  appendMessage(payload);
});

// Add a message to the messages element.
function appendMessage(payload) {
  const messagesElement = document.querySelector('#messages');
  const dataHeaderELement = document.createElement('h1');
  const dataElement = document.createElement('pre');
  dataElement.style = 'overflow-x:hidden;';
  dataHeaderELement.textContent = 'Received message:';
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderELement);
  messagesElement.appendChild(dataElement);
}

