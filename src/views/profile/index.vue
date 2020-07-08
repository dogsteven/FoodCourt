<template>
  <v-container>
    <v-card
      max-width="700"
      class="mx-auto mb-2"
    >
      <v-card-title>
        {{ username }}'s profile
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="password"
          color="orange"
          label="Password"
          type="password"
        >
        </v-text-field>
        <v-text-field
          v-model="firstname"
          color="orange"
          label="First name"
        >
        </v-text-field>
        <v-text-field
          v-model="lastname"
          color="orange"
          label="Last name"
        >
        </v-text-field>
        <v-text-field
          v-model="email"
          color="orange"
          label="Email"
        >
        </v-text-field>

        <v-btn
          block
          text
          color="green"
        >
          Save
        </v-btn>
      </v-card-text>
    </v-card>

    
  </v-container>
</template>

<script>
export default {
  created() {
    this.username = this.$store.state.customer.username
    this.password = this.$store.state.customer.password
    this.firstname = this.$store.state.customer.firstname
    this.lastname = this.$store.state.customer.lastname
    this.email = this.$store.state.customer.email
  },

  data: () => ({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    isEditable: false
  })
}
</script>

<style>

</style>