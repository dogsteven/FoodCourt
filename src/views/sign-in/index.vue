<template>
  <v-container id="sign-in-up-container">
    <v-card class="mx-auto" max-width="500">
      <v-img max-height="200" src="../../assets/sign-in-wallpaper.png"></v-img>

      <v-card-title>
        <v-tabs color="brown" fixed-tabs>
          <v-tab>Sign In</v-tab>
        </v-tabs>
      </v-card-title>

      <v-form ref="form" v-model="valid" lazy-validation class="mx-5">
        <v-text-field color="brown" v-model="username" label="Username" :rules="usernameRules"></v-text-field>
        <v-text-field
          color="brown"
          v-model="password"
          label="Password"
          type="password"
          :rules="passwordRules"
        ></v-text-field>
      </v-form>

      <v-card-actions>
        <v-btn block color="brown" text @click="SignIn">Sign in</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn block color="brown" text @click="SignUp">Don't have an account? Sign up</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import http from "../../http";
export default {
  methods: {
    SignIn() {
      if (this.$refs.form.validate()) {
        let username = this.username;
        let password = this.password;

        http.server
          .get("/customer/" + username + "/" + password)
          .then(response => {
            let data = response.data;
            if (data !== null) {
              localStorage.setItem("customer", JSON.stringify(data));
              this.$store.commit("setCustomer", data);
              this.$router.replace("/menu");
            } else {
              alert("Username or Password is incorrect");
            }
          });
      }
    },
    SignUp() {
      this.$router.replace({ path: "/sign-up" });
    }
  },
  data: () => ({
    valid: true,
    username: "",
    password: "",
    isSignedIn: false,
    usernameRules: [v => !!v || "Username is required"],
    passwordRules: [v => !!v || "Password is required"]
  })
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open%20Sans");
#sign-in-up-container {
  font-family: "Open Sans";
}
</style>