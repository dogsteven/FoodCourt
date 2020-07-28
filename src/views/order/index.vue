<template>
  <v-container id="menu-container" fluid>
    <v-tabs v-model="tab" background-color="transparent" color="red" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card max-width="700" class="mx-auto mt-1" elevation="0">
          <v-card
            v-for="(item, index) in displayOrderItems()"
            :key="index"
            elevation="1"
            class="ma-3"
          >
            <v-img :src="item.photo" :lazy-src="item.photo" max-height="130" class="align-end"></v-img>
            <v-card-title>
              <span>{{ item.name }}</span>
              <v-spacer></v-spacer>
              <span v-show="tab === 0" class="text-uppercase">{{ item.description }}</span>
              <v-rating
                v-show="tab === 1"
                dark
                color="orange"
                background-color="orange"
                small
                half-increments
                v-model="item.rating"
              ></v-rating>
            </v-card-title>
            <v-card-subtitle>
              Đơn giá: {{ item.price }} VND
              <v-spacer>Số lượng: {{ item.quantity }}</v-spacer>
            </v-card-subtitle>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import http from "../../http";
import FoodItem from "../../models/food-item";

export default {
  created() {
    let customerID = this.$store.state.customer.id;
    http.server.get("/order/customer/" + customerID).then((response) => {
      if (response.data.error !== "null") {
        for (let order of response.data.body) {
          for (let vendorOrder of order.info) {
            for (let vendorOrderItem of vendorOrder.orderItem.cartItems) {
              for (let foodItem of this.$store.state.foods) {
                if (vendorOrderItem.foodID === foodItem.id) {
                  let orderItem = new FoodItem(
                    foodItem.id,
                    foodItem.vendorID,
                    foodItem.name,
                    parseInt(foodItem.price) *
                      parseInt(vendorOrderItem.quantity),
                    vendorOrderItem.quantity,
                    foodItem.category,
                    vendorOrder.state, // descripsion
                    foodItem.photo,
                    foodItem.rating,
                    foodItem.ratingTimes
                  );
                  if (
                    vendorOrder.state == "completed" ||
                    vendorOrder.state == "taked"
                  ) {
                    this.doneOrder.push(orderItem);
                  } else {
                    this.trackingOrder.push(orderItem);
                  }
                  break;
                }
              }
            }
          }
        }
      }
    });
  },
  methods: {
    // selectItem(index) {
    //   if (this.selectedItem === index) {
    //     this.selectedItem = null;
    //   } else {
    //     this.selectedItem = index;
    //   }
    // },
    displayOrderItems() {
      if (this.tab === 0) {
        return this.trackingOrder;
      } else {
        return this.doneOrder;
      }
    },
  },
  data: () => ({
    tab: 0,
    selectedItem: null,
    items: ["Tracking Order", "Done Order"],
    trackingOrder: [],
    doneOrder: [],
  }),
};
</script>