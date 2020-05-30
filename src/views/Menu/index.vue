<template>
  <v-container>
    <v-btn
      @click="isShowItemDetail = true"
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
  data: () => ({
    isShowItemDetail: false
  })
}
</script>