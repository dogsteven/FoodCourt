<template>
  <v-container>
    <v-card max-width="700" class="mx-auto mb-2">
      <v-card-title>{{ username }}'s profile</v-card-title>
      <v-card-text>
        <v-text-field v-model="password" color="orange" label="Password" type="password"></v-text-field>
        <v-text-field v-model="firstname" color="orange" label="First name"></v-text-field>
        <v-text-field v-model="lastname" color="orange" label="Last name"></v-text-field>
        <v-text-field v-model="email" color="orange" label="Email"></v-text-field>

        <v-btn block text color="green" @click="updateProfile()">Save</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import http from "../../http";
export default {
  created() {
    this.username = this.$store.state.customer.username;
    this.password = this.$store.state.customer.password;
    this.firstname = this.$store.state.customer.firstname;
    this.lastname = this.$store.state.customer.lastname;
    this.email = this.$store.state.customer.email;
  },
  methods: {
    updateProfile() {
      var dataBody = {
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email
      };
      let config = {
        "Content-Type": "application/json"
      };
      http.server
        .put(
          "/customer/" +
            this.$store.state.customer.username +
            "/" +
            this.$store.state.customer.password,
          dataBody,
          config
        )
        .then(response => {
          if (response.data.status === true) {
            var newInfo = {
              id: this.$store.state.customer.id,
              username: this.$store.state.customer.username,
              password: this.password,
              firstname: this.firstname,
              lastname: this.lastname,
              email: this.email,
              registrationTokens: this.$store.state.customer.registrationTokens
            };
            localStorage.setItem("customer", JSON.stringify(newInfo));
            this.$store.commit("setCustomer", newInfo);
          }
        });
    }
  },
  data: () => ({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    isEditable: false
  })
};
</script>

<style>
</style>