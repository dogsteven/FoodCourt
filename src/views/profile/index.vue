<template>
  <v-container>
    <v-card max-width="700" class="mx-auto mb-2">
      <v-card-title>Tài khoản của {{ username }} </v-card-title>
      <v-card-text>
        <v-text-field v-model="password" color="#7d4427" label="Mật khẩu" type="password"></v-text-field>
        <v-text-field v-model="firstname" color="#7d4427" label="Tên"></v-text-field>
        <v-text-field v-model="lastname" color="#7d4427" label="Họ"></v-text-field>
        <v-text-field v-model="email" color="#7d4427" label="Email"></v-text-field>

        <v-btn block text color="#a2c523" @click="updateProfile()">Lưu</v-btn>
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