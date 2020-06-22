<template>
    <v-container>
      {{ id }}
    </v-container>
</template>

<script>
export default {
  created() {
    this.id = this.$route.params.id
    if ((this.id in this.$store.state.foods) === false)
      this.$router.go(-1)
  },
  data: () => ({
    id: ""
  })
}
</script>