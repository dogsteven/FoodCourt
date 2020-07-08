<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="isShowDrawer">
      <v-list>
        <v-list-item @click="signOut">Sign out!</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark fixed shift grow color="#ff2400" v-if="$store.state.isSignedIn">
      <v-app-bar-nav-icon @click.stop="isShowDrawer = !isShowDrawer" />

      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-app-bar>

    <v-content >
      <router-view />
    </v-content>

    <v-bottom-navigation app fixed grow shift color="#ff2400" v-if="$store.state.isSignedIn">
      <v-btn to="/menu">
        <span>Menu</span>
        <v-icon>fas fa-home</v-icon>
      </v-btn>

      <v-btn to="/cart">
        <span>Cart</span>
        <v-icon>fas fa-shopping-cart</v-icon>
      </v-btn>

      <v-btn to="/order">
        <span>Order</span>
        <v-icon>fas fa-clipboard</v-icon>
      </v-btn>

      <v-btn to="/profile">
        <span>Profile</span>
        <v-icon>fas fa-user-alt</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import http from './http'
export default {
  name: "App",
  
  created() {
    let customer = JSON.parse(localStorage.getItem('customer'))
    if (customer !== null) {
      this.$store.commit('setCustomer', customer)
    }
    if (this.$store.state.isSignedIn === false) {
      this.signOut()
    }
    http.server.get('/food-item').then((response) => {
      let data = response.data
      if (data != null) {
        for (let key in data) {
          this.$store.commit('pushFoodItem', {
            id: key,
            name: data[key].name,
            price: data[key].price,
            quantity: data[key].quantity,
            categories: data[key].categories,
            description: data[key].description,
            photo: data[key].photo
          })
        }
      }
    })
  },
  methods: {
    signout() {
      localStorage.removeItem('customer')
      let emptyInfo = {
        id: null,
        info: {
          username: null,
          firstname: null,
          lastname: null,
          email: null
        }
      }
      this.$store.commit('setCustomer', emptyInfo)
      this.$router.go('/sign-in')
    },
    signOut() {
      localStorage.removeItem('customer')
      let emptyInfo = {
        id: null,
        info: {
          username: null,
          firstname: null,
          lastname: null,
          email: null
        }
      }
      this.$store.commit('setCustomer', emptyInfo)
      this.isShowDrawer = false;
      this.$store.commit("setIsSignedIn", false);
      localStorage.removeItem("account");
      this.$router.replace({ name: "/sign-in" });
    }
  },
  data: () => ({
    isShowDrawer: false
  })
};
</script>

<style>
</style>