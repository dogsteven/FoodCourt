<template>
<v-container>
  <v-list three-line>
    <v-container>
      <v-card v-for="(item) in items" :key="item.id" class="border-item">
          <v-row>
            <v-col cols="4">
              <v-img id="itemImg"
              height="100"
              width="100"
              class="my-2 mx-4"
              :src="item.img"> </v-img>
            </v-col>
            <v-col cols="8">
                <v-card-title> {{item.title}} 
                <v-btn @click="remove(index)" icon ripple  class="ml-6"><v-icon color="red lighten-1" x-small> mdi-delete </v-icon></v-btn> 
                </v-card-title>
              <v-card-subtitle> {{item.price}} </v-card-subtitle>
              <v-row class="mx-3">
                <v-btn @click="update(item.id, item.qty - 1)" small class="button"> <v-icon x-small> mdi-minus </v-icon> </v-btn>
                <v-text class="mx-3"> {{item.qty}} </v-text>
                <v-btn @click="update(item.id, item.qty + 1)" small class="button"> <v-icon x-small> mdi-plus </v-icon> </v-btn>
              </v-row>
            </v-col>
          </v-row>
      </v-card>
    </v-container>
  </v-list>
    <v-card id="bottomCard">
      <!-- <v-card-actions>
                  
                </v-card-actions> -->
      <v-row class="mt-0">
        <v-card-title class="ml-5"> Tổng tiền
        </v-card-title>
        <v-card-content class="ma-auto"> {{"40,000 VNĐ"}} </v-card-content>
      </v-row>
      <v-btn x-large color="success" block dark class="mx-auto"> THANH TOÁN </v-btn>
    </v-card>

</v-container>
</template>

<script>
export default {
  data: () => ({
    data: 1,
      items: [{
          id: 1,
          img: 'https://photo-2-baomoi.zadn.vn/w1000_r1/2019_08_08_251_31770415/d3f80a5d6b1d8243db0c.jpg',
          price: "20,000 VNĐ",
          title: 'Bò kho bánh mì',
          qty: 2
      },
      ]
  }),
  computed: {
    calculateTotal() {
      var total = 0
      // var obj = this.items
      for (var i = 0; i < this.items.length; i++) {
        total += this.items[i].price * this.items[i].qty
      }
      return total
    }
  },
  method: {
    update: function(id, qty) {
      if (this.items[id].qty >= 1) {
        console.log("update")
        this.items[id].qty = qty
      }
    },
    remove: (index) => {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.v-bottom-navigation {
  position: fixed;
  width: 100%;
  left: 0px;
  bottom: 57px;
  border: 0;
}
#bottomCard {
  position: fixed;
  width: 100%;
  left: 0px;
  bottom: 57px;
  border: 0;
}
#itemImg {
  border-radius: 50%;
}
#red-background {
  background: red;
}
#blue {
  background: blue;
}
#yellow {
  background: yellow;
}
.border-item {
  border: 1px black;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

