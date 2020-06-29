<template>
  <v-container id="sign-in-up-container">
    <v-card class="mx-auto" max-width="500">
      <v-img max-height="200" src="../../assets/sign-in-wallpaper.png"></v-img>

      <v-card-title>
        <v-tabs color="brown" fixed-tabs v-model="tab">
          <v-tab>Sign In</v-tab>
        </v-tabs>
      </v-card-title>

      <v-card-text class="pa-5">
        <v-text-field color="brown" v-model="username" label="Username"></v-text-field>
        <v-text-field
          color="brown"
          v-model="password"
          label="Password"
          type="password"
          :rules="[requireSixCharacters]"
        ></v-text-field>
      </v-card-text>

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
    requireSixCharacters(value) {
      if (this.tab === 0) return true;
      return value.length >= 6 || value.length === 0;
    },
    isEqualToPassword(value) {
      return value === this.password || value.length === 0;
    },
    SignIn() {
      let username = this.username;
      let password = this.password;

      http.server
        .get("/customer/" + username + "/" + password)
        .then(response => {
          let data = response.data;
          if (data !== null) {
            this.$store.commit("setCustomer", data);
            this.$store.commit("setIsSignedIn", true);
            this.$router.replace({ path: "/menu" });
          } else this.$store.commit("setIsSignedIn", false);
        });
      localStorage.setItem("account", "ok");
      this.$store.commit("setIsSignedIn", true);
      this.$router.replace({ path: "/menu" });
    },
    SignUp() {
      this.$router.replace({ path: "/sign-up" });
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
    isSignInFailed: false
  })
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open%20Sans");
#sign-in-up-container {
  font-family: "Open Sans";
}
</style>