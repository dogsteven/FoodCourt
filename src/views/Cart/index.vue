<template>
<v-container>
  <v-list two-line>
    <v-container>
      <v-card v-for="(item) in items" :key="item.id">
          <v-row>
            <v-avatar size="80" rounded>
              <v-img :src="item.img"></v-img>
            </v-avatar>
            <v-col>
              <v-card-title> {{item.title}} </v-card-title>
              <v-card-subtitle> {{item.price}} </v-card-subtitle>
              <v-row>
                <v-card-actions>
                <v-btn @click="update(item.id, item.qty - 1)" small class=""> <v-icon x-small> mdi-minus </v-icon> </v-btn>
                <v-content class="mx-3"> {{item.qty}} </v-content>
                <v-btn @click="update(item.id, item.qty + 1)" small class=""> <v-icon x-small> mdi-plus </v-icon> </v-btn>
                </v-card-actions>
              </v-row>
            </v-col>
            <v-card-actions>
               <v-btn @click="remove(index)" icon ripple  class="my-9"><v-icon color="red lighten-1" x-small> mdi-delete </v-icon></v-btn> 
            </v-card-actions>
          </v-row>
      </v-card>
      </v-container>
  </v-list>
    <v-card id="bottomCard">
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
</style>

