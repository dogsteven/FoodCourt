import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import messaging from './messaging'
import http from './http'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  created() {
    console.log("Created")

    messaging.usePublicVapidKey("BPEuFU6kT_McSMSXLIIVr49BpQqXjHirLePjnEZbe4NG1Y_ySyHAwdBLO3E4FPbsgy32WTHggnM56nnLuZyE3dM")

    messaging.onTokenRefresh(() => {
      messaging.getToken().then((refreshedToken) => {
        console.log('Refresh token: ' + refreshedToken)
        http.server.post('/customer/' + this.$store.state.customer.id + '/newRegistrationToken/' + refreshedToken)
          .then(({ status }) => {
            if (status !== false)
            this.$store.state.customer.registrationTokens.push(refreshedToken)
          })
      })
    })

    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
    })
  }
}).$mount('#app')