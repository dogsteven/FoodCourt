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
    </v-card>
    <v-snackbar v-model="isSignInFailed" timeout="2000">
      <template v-slot:action="{ attrs }">
        Wrong username or password!
        <v-btn color="ref" text v-bind="attrs" @click="isSignInFailed = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card-actions>
      <v-btn block color="brown" text @click="SignUp">Sign up</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
// import http from "../../http";
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
      // let username = this.username;
      // let password = this.password;
      // let firstname = this.firstname;
      // let lastname = this.lastname;
      // let email = this.email;
      // http.server
      //   .get("/customer/" + username + "/" + password)
      //   .then(response => {
      //     let data = response.data;
      //     if (data !== null) {
      //       localStorage.setItem("customer", JSON.stringify(data));
      //       this.$store.commit("setCustomer", data);
      //       this.$router.go("/menu");
      //     } else this.isSignInFailed = true;
      //   });
      localStorage.setItem("account", "ok");
      this.$store.commit("setIsSignedIn", true);
      this.$router.replace({ path: "/menu" });
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