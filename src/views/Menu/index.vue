<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="(item, key) in $store.state.foods"
        :key="key"
        :to="'/item-detail/' + key"
      >
        <v-list-item-title>
          {{ item.name }}
          <v-list-item-subtitle>
            {{ item.price }}VND
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

</style>