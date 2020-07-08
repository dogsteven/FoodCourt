<template>
  <v-container
    id="menu-container"
    fluid
  >
<<<<<<< HEAD
  <v-card
    class="mx-auto"
    max-width="700"
  >

    <v-card-text>
      <h2 class="title mb-2">Filter</h2>

      <v-chip-group
        v-model="filter"
        column
        multiple
      >
        <v-chip filter outlined
        v-for="category in this.categories"
        :key=category
        >
        {{category}}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
=======
>>>>>>> long
    <v-card
      max-width="700"
      class="mx-auto mt-1"
      elevation="0"
    >
<<<<<<< HEAD
      <v-card-text>
        <div
          v-for="(item, index) in this.$store.state.foods"
          :key="index"
          elevation="1"
          class="ma-3"
        >
        <v-card >
          <v-img
            :src="item.photo"
            :lazy-src="item.photo"      
            max-height="130"
          >
          </v-img>
          <v-card-title
            @click="selectedItem === index ? selectedItem = null : selectedItem = index"
          >
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ item.price }} VND
          </v-card-subtitle>
          <v-card-text>
            <v-expand-transition>
              <div
                v-if="selectedItem === index"
              >
                {{ item.description }}
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="orange"
                    @click="addItemToCart(index)"
                  >
                    Add to cart
                  </v-btn>
                </v-card-actions>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
        </div>
      </v-card-text>
=======
      <v-card
        v-for="(item, index) in filteredFoodItems()"
        :key="index"
        elevation="1"
        class="ma-3"
      >
        <v-img
          @click="selectItem(index)"
          :src="item.photo"
          :lazy-src="item.photo"
          max-height="130"
          class="align-end"
        >        
              
        </v-img> 
        <v-card-title>
          <span
            @click="selectItem(index)"
          >
            {{ item.name }}
          </span>
          <v-spacer></v-spacer>
          <v-rating
            dark
            color="orange"
            background-color="orange"
            small
            half-increments
            v-model="item.rating"
          ></v-rating>        
        </v-card-title>
        <v-card-subtitle
          @click="selectItem(index)"
        >
          Đơn giá: {{ item.price }} VND
        </v-card-subtitle>
        <v-card-text>
          <v-expand-transition>
            <div
              v-if="selectedItem === index"
            >
              {{ item.description }}
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-card
                  elevation="0"
                >
                  <v-card-actions>
                    <v-btn
                      icon
                      @click="quantity = quantity >= 2 ? quantity - 1 : 1"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="black"
                    >
                      {{ quantity }}
                    </v-btn>
                    <v-btn
                      icon
                      @click="quantity = quantity + 1"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-btn
                  text
                  color="orange"
                  @click="addItemToCart(item.id)"
                >
                  Add to cart
                </v-btn>
              </v-card-actions>
            </div>
          </v-expand-transition>
        </v-card-text>
      </v-card>
>>>>>>> long
    </v-card>
  </v-container>
</template>

<script>
import CartItem from '../../models/cart-item'
import http from '../../http'

export default {
  created() {
    http.server.get('/categories').then(({ data }) => {
      this.categories = data
    })
  },

  methods: {
<<<<<<< HEAD
    addItemToCart(index) {
      console.log(this.filter)
      let exist = this.$store.state.carts.findIndex(item => item.index === index) >= 0
      if (exist === false) {
        this.$store.commit('pushCartItem', {
          index: index,
          quantity: 1
        })
=======
    addItemToCart(foodID) {
      let quantity = this.quantity
      let existIndex = this.$store.state.carts.findIndex(cart => cart.foodID === foodID)
      if (existIndex === -1) {
        let newCartItem = new CartItem(foodID, quantity)
        this.$store.commit('pushCartItem', newCartItem)
      } else
        this.$store.commit('increaseCartItemQuantity', { index: existIndex, amount: quantity })
    },

    selectItem(index) {
      if (this.selectedItem === index) {
        this.selectedItem = null
      } else {
        this.quantity = 1
        this.selectedItem = index
>>>>>>> long
      }
    }, 
    filterByChip (food) {
      if (this.filter == []) {
        return true;
      }
      let itemFilter = []
      
      this.filter.forEach(element => {
          itemFilter.push(this.categories[element])
        }
      );

      let test = (Object.values(food.categories).slice(-1)).filter(function(item) {
        console.log(typeof item)
        // if (item === null) return false;
        // return !itemFilter.includes(item); 
      }) 
      console.log(test)
      return true 
    },

    filteredFoodItems() {
      return this.$store.state.foods.filter((item) => {
        for (let category of this.selectedCategories)
          if (item.categories.includes(category) === false)
            return false
        return true
      }).filter((item) => {
        var iter = 0
        for (let c of item.name.toLowerCase()) {
          if (c === this.searchName.toLowerCase()[iter])
            iter += 1
          if (iter === this.searchName.length)
            return true
        }
        return false
      })
    }
  },
  
  data: () => ({
<<<<<<< HEAD
    selectedItem : null,
    categories: [],
    filter: [],
    selectedCate: []
=======
    selectedItem: null,
    quantity: 1,
    selectedCategories: [],
    categories: [],
    searchName: ""
>>>>>>> long
  })
}
</script>

<style>
</style>