<template>
  <v-container>
    <v-list
      v-for="(item, key) in $store.state.foods"
      :key="key"
    >
      <v-list-item
        @click="() => {}"
      >
        <v-list-item-avatar>
          <v-icon>fas fa-shopping-cart</v-icon>
        </v-list-item-avatar>
        <v-list-item-title
          class="menu-item-title"
        >
          {{ item.name }}
          <v-list-item-subtitle
            class="menu-item-subtitle"
          >
            {{ item.price }} VND
          </v-list-item-subtitle>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  methods: {
  },
  data: () => ({
    isShowItemDetail: false
  })
}
</script>

<style lang="sass">
@import "https://fonts.googleapis.com/css?family=Open%20Sans"

.menu-item-title
  font-size: 30px

.menu-item-subtitle
  font-family: "Open Sans"
</style>