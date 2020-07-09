<template>
  <v-container
    id="sign-in-up-container"
    fill-height
  >
  <v-row align="center">
    <v-flex px-2>
      <v-card
        class="mx-auto"
        max-width="500"
        elevation="2"
      >
        <v-img
          max-height="200"
          src="../../assets/sign-in-wallpaper.jpg"
          class="align-end white--text"
        >
        </v-img>

      
        <v-card-title>
          <v-tabs
            color="orange"
            fixed-tabs
            v-model="tab"
          >
            <v-tab>
              Login<v-spacer></v-spacer>
            </v-tab>
            <v-tab>
              <v-spacer></v-spacer>Register
            </v-tab>
          </v-tabs>
        </v-card-title>
      
        
        <v-card-text
          class="pa-5"
        >
          <v-text-field
            color="orange"
            v-model="username"
            solo
            label="Username"
            prepend-inner-icon="mdi-account"
          >
          </v-text-field>
          <v-text-field
            color="orange"
            v-model="password"
            solo
            label="Password"
            type="password"
            :rules="[requireSixCharacters]"
            prepend-inner-icon="mdi-lock"
          >
          </v-text-field>
          <v-expand-transition>
          <div
            v-show="tab === 1"
          >
            <v-text-field
              color="orange"
              v-model="repassword"
              solo
              label="Confirm password"
              type="password"
              :rules="[requireSixCharacters, isEqualToPassword]"
              prepend-inner-icon="mdi-lock"
            >

            </v-text-field>
            <v-text-field
              color="orange"
              v-model="firstname"
              solo
              label="First name"
              prepend-inner-icon="mdi-account"
            >
            </v-text-field>
            <v-text-field
              color="orange"
              v-model="lastname"
              solo
              label="Last name"
              prepend-inner-icon="mdi-account"
            >
            </v-text-field>
            <v-text-field
              color="orange"
              v-model="email"
              solo
              label="Email"
              :rules="[isEmail]"
              prepend-inner-icon="mdi-mail"
            >
            </v-text-field>
          </div>
          </v-expand-transition>
        </v-card-text>
        
        <v-card-actions>
          <v-btn
            block
            color="orange"
            width="100"
            dark
            @click="SignInOrSignUp"
          >
            {{ tab == 0 ? "Sign in" : "Sign up" }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="isSignInUpFailed" 
        timeout="2000">
        {{ message }}
      
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="isSignInFailed = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-flex>
  </v-row>
  </v-container>
</template>

<script>
import http from '../../http'

export default {
  methods: {
    isEmail(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || value.length === 0
    },

    requireSixCharacters(value) {
      if (this.tab === 0)
        return true
      return value.length >= 6 || value.length === 0
    },

    isEqualToPassword(value) {
      return value === this.password || value.length === 0
    },

    SignInOrSignUp() {
      let username = this.username
      let password = this.password
      let repassword = this.repassword
      let firstname = this.firstname
      let lastname = this.lastname
      let email = this.email
      if (this.tab === 0) {
        if (username.length === 0 || password.length === 0) {
          this.message = "Please enter your username and password!"
          this.isSignInUpFailed = true
          return
        }
        http.server.get('/customer/' + username + '/' + password).then((response) => {
          let data = response.data
          if (data !== null) {
            localStorage.setItem('customer', JSON.stringify(data))
            this.$store.commit('setCustomer', data)
            this.$router.go('/menu')
          } else {
            this.message = "Wrong username or password!"
            this.isSignInUpFailed = true
          }
        })
      } else {
        var valid = true
        if (username.length === 0 || password.length === 0 || repassword.length === 0 || firstname.length === 0 || lastname.length === 0 || email.length === 0)
          valid = false
        if (this.password !== this.repassword)
          valid = false
        if (this.isEmail(email) === false || email.length === 0)
          valid = false
        if (this.requireSixCharacters(password) === false)
          valid = false
        if (valid === false) {
          this.message = "Wrong input! Try again!"
          this.isSignInUpFailed = true
          return
        }
        var dataBody = {
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email
        }
        let config = {
          "Content-Type": "application/json"
        }
        http.server.post('/customer', dataBody, config).then((response) => {
          let data = response.data
          if (data !== null) {
            dataBody.id = data.id
            dataBody.registrationTokens = []
            localStorage.setItem('customer', JSON.stringify(dataBody))
            this.$store.commit('setCustomer', dataBody)
            this.$router.go('/menu')
          } else {
            this.message = "This username is already exists!"
            this.isSignInUpFailed = true
          }
        })
      }
    }
  },
  data: () => ({
    username: "",
    password: "",
    repassword: "",
    firstname: "",
    lastname: "",
    email: "",
    tab: 0,
    isSignInUpFailed: false,
    message: ""
  })
}
</script>

<style scoped>

</style>