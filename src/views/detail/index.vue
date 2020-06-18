<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="isShowDrawer">
      <v-list>
        <v-list-item @click="signOut">Sign out!</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed shift grow color="#ff2400" v-if="$store.state.isSignedIn">
      <v-app-bar-nav-icon @click.stop="isShowDrawer = !isShowDrawer" />

      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
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
