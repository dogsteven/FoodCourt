<template>
  <v-container>
    <v-tabs v-model="tab" background-color="#31a9b8" grow dark>
      <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>
    <v-card>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab"></v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>


<script>
import http from "../../http";
export default {
  created() {
    let customerID = this.$store.state.customer.id;
    http.server.get("/order/customer/" + customerID).then(response => {
      let data = response.data;
      if (data !== null) {
        this.order = data;
      }
    });
  },
  methods: {
    filteredOrderByState() {}
  },
  data: () => ({
    tab: null,
    items: [{ tab: "Tracking Order" }, { tab: "Done Order" }],
    order: []
  })
};
</script>