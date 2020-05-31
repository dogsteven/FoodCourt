<template>
  <v-container>
    <v-list
      v-for="(value, key) in $store.state.foods"
      :key="key"
    >
      {{ value.name }}
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