<template>
  <v-card>
    <v-tabs v-model="tab" background-color="transparent" color="red" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="tabular in tabs" :key="tabular">
        <v-card
          v-for="(item, index) in displayOrderItems()"
          :key="index"
          elevation="1"
        >
          <v-img
            @click="selectItem(index)"
            :src="item.photo"
            :lazy-src="item.photo"
            max-height="130"
            class="align-end"
          ></v-img>
          <v-card-title>
            <span @click="selectItem(index)">{{ item.name }}</span>
            <v-spacer></v-spacer>
            <span>{{ item.description }}</span>
          </v-card-title>
          <v-card-subtitle @click="selectItem(index)">Đơn giá: {{ item.price }} VND</v-card-subtitle>
          <v-card-text>
            <v-expand-transition>
              <div v-if="selectedItem === index">
                {{ item.description }}
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-card elevation="0"></v-card>
                  <v-btn text color="orange" @click="addItemToCart(item.id)">View Detail</v-btn>
                </v-card-actions>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import http from "../../http";
import FoodItem from "../../models/food-item";

export default {
  created() {
    let customerID = this.$store.state.customer.id;
    http.server.get("/order/customer/" + customerID).then(response => {
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
                  if (vendorOrderItem.state === "completed") {
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
    selectItem(index) {
      if (this.selectedItem === index) {
        this.selectedItem = null;
      } else {
        this.quantity = 1;
        this.selectedItem = index;
      }
    },
    displayOrderItems() {
      if (this.tab === 0) {
        return this.trackingOrder;
      } else {
        return this.doneOrder;
      }
    }
  },
  data: () => ({
    tab: 0,
    selectedItem: null,
    tabs: ["Tracking Order", "Done Order"],
    trackingOrder: [],
    doneOrder: []
  })
};
</script>