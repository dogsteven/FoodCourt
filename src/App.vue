<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="isShowDrawer"
    >
      <v-list>
        <v-list-item
          to='/menu'
        >
          <v-list-item-icon>
            <v-icon>fas fa-hamburger</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Menu
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to='/profile'
        >
          <v-list-item-icon>
            <v-icon>fas fa-user-alt</v-icon>
            </v-list-item-icon>
          <v-list-item-title>
            Profile
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="signout"
        >
          <v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Sign out
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="orange"
      dark
      v-if="$store.state.customer.id !== null"
    >
      <v-app-bar-nav-icon
        @click="isShowDrawer = !isShowDrawer"
      >
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn
        text
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        to="/cart"
        text
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
        ma-0
        pa-0
      >
        <router-view>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import http from './http'
export default {
  name: 'App',
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
      this.$router.go('/sign-in-up')
    }
  },
  created() {
    let customer = JSON.parse(localStorage.getItem('customer'))
    if (customer !== null) {
      this.$store.commit('setCustomer', customer)
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
  data: () => ({
    isShowDrawer: false
  }),
};
</script>