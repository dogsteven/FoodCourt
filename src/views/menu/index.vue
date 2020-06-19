<template>
  <v-container
    id="menu-container"
  >
    <v-card
      max-width="700"
      class="mx-auto"
      elevation="0"
    >
      <v-card-text>
        <v-card
          v-for="(item, index) in $store.state.foods"
          :key="index"
          elevation="1"
          class="ma-3"
        >
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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    addItemToCart(index) {
      let exist = this.$store.state.carts.findIndex(item => item.index === index) >= 0
      if (exist === false) {
        this.$store.commit('pushCartItem', {
          index: index,
          quantity: 1
        })
      }
    }
  },
  data: () => ({
    selectedItem: null
  })
}
</script>

<style>
</style>