<template>
  <v-container id="menu-container" fluid>
    <v-card max-width="700" class="mx-auto mt-1" elevation="0">
      <v-card-text>
        <v-toolbar flat color="transparent">
          <v-text-field
            color="#7d4427"
            @input="value => { searchName = value }"
            append-icon="mdi-magnify"
            label="Tìm món ăn"
            single-line
          ></v-text-field>
        </v-toolbar>

        <v-chip-group column multiple>
          <v-chip
            filter
            outlined
            v-for="category in this.categories"
            :key="category"
            @click="selectCategories(category)"
          >{{category}}</v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card v-for="(item, index) in filteredFoodItems()" :key="index" elevation="1" class="ma-3">
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
          <v-rating
            dark
            color="orange"
            background-color="orange"
            x-small
            half-increments
            v-model="item.rating"
          ></v-rating>
        </v-card-title>
        <v-card-subtitle @click="selectItem(index)">Đơn giá: {{ item.price }} VND</v-card-subtitle>
        <v-card-text>
          <v-expand-transition>
            <div v-if="selectedItem === index">
              {{ item.description }}
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-card elevation="0">
                  <v-card-actions>
                    <v-btn icon @click="quantity = quantity >= 2 ? quantity - 1 : 1">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn icon color="black">{{ quantity }}</v-btn>
                    <v-btn icon @click="quantity = quantity + 1">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-btn text color="#7d4427" @click="addItemToCart(item.id)">Thêm vào giỏ</v-btn>
              </v-card-actions>
            </div>
          </v-expand-transition>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import CartItem from "../../models/cart-item";
import http from "../../http";

export default {
  created() {
    http.server.get("/categories").then(({ data }) => {
      this.categories = data;
    });
  },

  methods: {
    addItemToCart(foodID) {
      let quantity = this.quantity;
      let existIndex = this.$store.state.carts.findIndex(
        (cart) => cart.foodID === foodID
      );
      if (existIndex === -1) {
        let newCartItem = new CartItem(foodID, quantity);
        this.$store.commit("pushCartItem", newCartItem);
      } else
        this.$store.commit("increaseCartItemQuantity", {
          index: existIndex,
          amount: quantity,
        });
    },

    selectItem(index) {
      if (this.selectedItem === index) {
        this.selectedItem = null;
      } else {
        this.quantity = 1;
        this.selectedItem = index;
      }
    },

    selectCategories(category) {
      if (this.selectedCategories.includes(category) === false) {
        this.selectedCategories.push(category);
      } else {
        for (var i = 0; i < this.selectedCategories.length; i++) {
          if (this.selectedCategories[i] === category) {
            this.selectedCategories.splice(i, 1);
            break;
          }
        }
      }
    },

    filteredFoodItems() {
      return this.$store.state.foods
        .filter((item) => {
          for (let category of this.selectedCategories)
            if (item.categories.includes(category) === false) return false;
          return true;
        })
        .filter((item) => {
          var iter = 0;
          for (let c of item.name.toLowerCase()) {
            if (c === this.searchName.toLowerCase()[iter]) iter += 1;
            if (iter === this.searchName.length) return true;
          }
          return false;
        });
    },
  },

  data: () => ({
    selectedItem: null,
    quantity: 1,
    selectedCategories: [],
    categories: [],
    searchName: "",
  }),
};
</script>

<style>
</style>