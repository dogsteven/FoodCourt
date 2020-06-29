<template>
  <v-container id="sign-in-up-container">
    <v-card class="mx-auto" max-width="500">
      <v-img max-height="200" src="../../assets/sign-in-wallpaper.png"></v-img>

      <v-card-title>
        <v-tabs color="brown" fixed-tabs>
          <v-tab>Sign up</v-tab>
        </v-tabs>
      </v-card-title>

      <v-form ref="form" v-model="valid" lazy-validation class="mx-5">
        <v-text-field
          color="brown"
          v-model="username"
          label="Username"
          :rules="usernameRules"
          :error-messages="errors"
          required
        ></v-text-field>
        <v-text-field
          color="brown"
          v-model="password"
          label="Password"
          type="password"
          :rules="passwordRules"
          required
        ></v-text-field>
        <v-text-field
          color="brown"
          v-model="repassword"
          label="Confirm password"
          type="password"
          :rules="[(password === repassword) || 'Password must match']"
          required
        ></v-text-field>
        <v-text-field color="brown" v-model="firstname" label="First Name"></v-text-field>
        <v-text-field color="brown" v-model="lastname" label="Last Name"></v-text-field>
        <v-text-field color="brown" v-model="email" label="Email" :rules="emailRules"></v-text-field>
      </v-form>

      <v-card-actions>
        <v-btn block color="brown" text @click="SignUp">Sign up</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn block color="brown" text @click="SignIn">Already have an account? Sign in</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import http from "../../http";
export default {
  methods: {
    SignIn() {
      this.$router.replace({ path: "/sign-in" });
    },
    SignUp() {
      if (this.$refs.form.validate()) {
        let username = this.username;
        let password = this.password;
        let firstname = this.firstname;
        let lastname = this.lastname;
        let email = this.email;
        let dataBody = {
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email
        };
        let config = {
          "Content-Type": "application/json"
        };
        http.server.post("/customer", dataBody, config).then(response => {
          let data = response.data;
          if (data !== null) {
            this.$router.go("/sign-in");
          } else {
            this.errors = "Username already exists!";
          }
        });
      }
    }
  },
  data: () => ({
    errors: [],
    valid: true,
    username: "",
    password: "",
    repassword: "",
    firstname: "",
    lastname: "",
    email: "",
    usernameRules: [v => !!v || "Username is required"],
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 10) || "Password must be more than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open%20Sans");
#sign-in-up-container {
  font-family: "Open Sans";
}
</style>