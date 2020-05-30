<template>
  <v-app>
    <v-navigation-drawer
      app
      fixed
      v-model="isShowDrawer"
    >
      <v-list>
        <v-list-item
          @click="signOut"
        >
          Sign out!
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      fixed
      dense
      dark
      color="#ff2400"
      v-if="isSignedIn"
    >
      <v-app-bar-nav-icon
        @click.stop="isShowDrawer = !isShowDrawer" />

      <v-toolbar-title>
        {{ $route.name }}
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view @set-is-signed-in="isSignedIn = $event"></router-view>
    </v-content>

    <v-bottom-navigation
      app
      fixed
      grow
      shift
      color="#ff2400"
      v-if="isSignedIn"
    >
      <v-btn
        to="/menu"
      >
        <span>Menu</span>
        <v-icon>fas fa-home</v-icon>
      </v-btn>

      <v-btn
        to="/cart"
      >
        <span>Cart</span>
        <v-icon>fas fa-shopping-cart</v-icon>
      </v-btn>

      <v-btn
        to="/notifications"
      >
        <span>Notification</span>
        <v-icon>fas fa-bell</v-icon>
      </v-btn>

      <v-btn
        to="/profile"
      >
        <span>Profile</span>
        <v-icon>fas fa-user-alt</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  created() {
    if (localStorage.getItem('account') !== null)
      this.isSignedIn = true
  },

  methods: {
    signOut() {
      this.isShowDrawer = false
      this.isSignedIn = false
      localStorage.removeItem('account')
      this.$router.replace({ name: '/signin' })
    }
  },

  data: () => ({
    isSignedIn: false,
    isShowDrawer: false
  }),
};
</script>

<style>
.v-bottom-navigation--fixed {
  position: fixed !important;
}
.v-item-group.v-bottom-navigation .v-btn {
  height: inherit !important;
}
</style>