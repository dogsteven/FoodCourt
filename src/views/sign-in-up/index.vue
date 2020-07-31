<template>
  <v-container id="sign-in-up-container" fill-height>
    <v-row align="center">
      <v-flex px-2>
        <v-card class="mx-auto" max-width="500" elevation="2">
          <v-img
            max-height="200"
            src="../../assets/foodline.png"
            class="align-end white--text"
          ></v-img>

          <v-card-title>
            <v-tabs color="#7d4427" fixed-tabs v-model="tab">
              <v-tab>
                Đăng nhập
                <v-spacer></v-spacer>
              </v-tab>
              <v-tab>
                <v-spacer></v-spacer>Đăng ký
              </v-tab>
            </v-tabs>
          </v-card-title>

          <v-card-text class="pa-5">
            <v-text-field
              color="#7d4427"
              v-model="username"
              solo
              label="Tên đăng nhập"
              prepend-inner-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              color="#7d4427"
              v-model="password"
              solo
              label="Mật khẩu"
              type="password"
              :rules="[requireSixCharacters]"
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
            <v-expand-transition>
              <div v-show="tab === 1">
                <v-text-field
                  color="#7d4427"
                  v-model="repassword"
                  solo
                  label="Xác nhận mật khẩu"
                  type="password"
                  :rules="[requireSixCharacters, isEqualToPassword]"
                  prepend-inner-icon="mdi-lock"
                ></v-text-field>
                <v-text-field
                  color="#7d4427"
                  v-model="firstname"
                  solo
                  label="Tên"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                  color="#7d4427"
                  v-model="lastname"
                  solo
                  label="Họ"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                  color="#7d4427"
                  v-model="email"
                  solo
                  label="Email"
                  :rules="[isEmail]"
                  prepend-inner-icon="mdi-mail"
                ></v-text-field>
              </div>
            </v-expand-transition>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              color="#7d4427"
              width="100"
              dark
              @click="SignInOrSignUp"
            >{{ tab == 0 ? "Đăng nhập" : "Đăng ký" }}</v-btn>
          </v-card-actions>
        </v-card>
        <v-snackbar v-model="isSignInUpFailed" timeout="2000">
          {{ message }}
          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="isSignInFailed = false">Đóng</v-btn>
          </template>
        </v-snackbar>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import http from "../../http";

export default {
  methods: {
    isEmail(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || value.length === 0;
    },

    requireSixCharacters(value) {
      if (this.tab === 0) return true;
      return value.length >= 6 || value.length === 0;
    },

    isEqualToPassword(value) {
      return value === this.password || value.length === 0;
    },

    SignInOrSignUp() {
      let username = this.username;
      let password = this.password;
      let repassword = this.repassword;
      let firstname = this.firstname;
      let lastname = this.lastname;
      let email = this.email;
      if (this.tab === 0) {
        if (username.length === 0 || password.length === 0) {
          this.message = "Hãy điền tên đăng nhập và mật khẩu";
          this.isSignInUpFailed = true;
          return;
        }
        http.server
          .get("/customer/" + username + "/" + password)
          .then((response) => {
            let data = response.data;
            if (data !== null) {
              localStorage.setItem("customer", JSON.stringify(data));
              this.$store.commit("setCustomer", data);
              this.$router.go("/menu");
            } else {
              this.message = "Sai tên đăng nhập hoặc mật khẩu";
              this.isSignInUpFailed = true;
            }
          });
      } else {
        var valid = true;
        if (
          username.length === 0 ||
          password.length === 0 ||
          repassword.length === 0 ||
          firstname.length === 0 ||
          lastname.length === 0 ||
          email.length === 0
        )
          valid = false;
        if (this.password !== this.repassword) valid = false;
        if (this.isEmail(email) === false || email.length === 0) valid = false;
        if (this.requireSixCharacters(password) === false) valid = false;
        if (valid === false) {
          this.message = "Sai thông tin! Xin vui lòng nhập lại!";
          this.isSignInUpFailed = true;
          return;
        }
        var dataBody = {
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email,
        };
        let config = {
          "Content-Type": "application/json",
        };
        http.server.post("/customer", dataBody, config).then((response) => {
          let data = response.data;
          if (data !== null) {
            dataBody.id = data.id;
            dataBody.registrationTokens = [];
            localStorage.setItem("customer", JSON.stringify(dataBody));
            this.$store.commit("setCustomer", dataBody);
            this.$router.go("/menu");
          } else {
            this.message = "This username is already exists!";
            this.isSignInUpFailed = true;
          }
        });
      }
    },
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
    message: "",
  }),
};
</script>

<style scoped>
</style>