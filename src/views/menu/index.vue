<template>
  <v-container
    id="menu-container"
  >
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
    <v-card
      max-width="700"
      class="mx-auto"
      elevation="0"
    >
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
    </v-card>
  </v-container>
</template>

<script>
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}
export default {
  methods: {
    addItemToCart(index) {
      console.log(this.filter)
      let exist = this.$store.state.carts.findIndex(item => item.index === index) >= 0
      if (exist === false) {
        this.$store.commit('pushCartItem', {
          index: index,
          quantity: 1
        })
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
  },
  created() {
      for (let item of this.$store.state.foods) {
        for (let category of item.categories) {
          if (!(this.categories.includes(category, 0))) {
            this.categories.push(category);
          }
        }
      }
  },
  data: () => ({
    selectedItem : null,
    categories: [],
    filter: [],
    selectedCate: []
  })
}
</script>

<style>
</style>