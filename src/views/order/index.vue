<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" background-color="#80bd9e" grow dark>
        <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card class="my-3">
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://media.cooky.vn/recipe/g5/44500/s640/cooky-recipe-cover-r44500.jpg"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="headline">Hủ tiếu</v-list-item-title>
                <v-list-item-subtitle>
                  22,000 VND
                  <span class="float-right red--text text--accent-1">Số lượng: 1</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="#80bd9e" to="/detail">Xem chi tiết</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
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
        console.log(data)
      } else {
        console.log(data)
      }
    });
  },
  data: () => ({
    tab: null,
    items: [{ tab: "Tracking Order" }, { tab: "Done Order" }]
  })
};
</script>