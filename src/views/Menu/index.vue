<template>
  <v-container>
    <v-btn
      @click="showItemDetail"
    >
      Click me
    </v-btn>

    <v-overlay
      v-model="isShowItemDetail"
    >
      <v-btn
        @click="isShowItemDetail = false"
      >
        <v-icon>fas fa-times-circle</v-icon>
      </v-btn>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  methods: {
    showItemDetail() {
      this.$router.go(-1)
    }
  },
  data: () => ({
    isShowItemDetail: false
  })
}
</script>