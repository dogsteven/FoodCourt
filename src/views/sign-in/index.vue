<template>
  <v-container>
    <v-btn
      @click="signIn"
    >
      Click here!
    </v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    signIn() {
      localStorage.setItem('account', 'ok')
      this.$store.commit('setIsSignedIn', true)
      this.$router.replace({ path: '/menu' })
    }
  },
  data: () => ({

  })
}
</script>