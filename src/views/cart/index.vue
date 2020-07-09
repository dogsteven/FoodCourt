<template>
  <v-container id="card-container">
    <v-card v-if="$store.state.carts.length === 0" class="mx-auto" elevation="0">
      <v-card-text class="text-center">Empty cart!</v-card-text>
    </v-card> 
    <v-card class="mx-auto pb-16" max-width="700" elevation="0">
      <v-card v-for="(item, index) in $store.state.carts" :key="index" elevation="1" class="ma-3">
        <v-img :src="$store.state.foods[getFoodItemIndexByID(item.foodID)].photo" max-height="130"></v-img>

        <v-card-title>{{ $store.state.foods[getFoodItemIndexByID(item.foodID)].name }}</v-card-title>
        <v-card-subtitle>
          Số lượng: {{ item.quantity }}
          <br />
          Đơn giá: {{ $store.state.foods[getFoodItemIndexByID(item.foodID)].price }} VND, tổng cộng: {{ $store.state.foods[getFoodItemIndexByID(item.foodID)].price * item.quantity }}
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-card elevation="0">
            <v-card-actions>
              <v-btn
                icon
                @click="$store.commit('decreaseCartItemQuantity', { index: index, amount: 1 })"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="$store.commit('increaseCartItemQuantity', { index: index, amount: 1 })"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-btn text color="red" @click="$store.commit('removeItemFromCart', index)">Remove</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>

    <v-footer v-if="$store.state.carts.length >= 0" inset app>
      <v-dialog v-model="isShowPaymentDialog" max-width="500">
        <v-card>
          <v-card-title>
            Online Payment
            <v-spacer></v-spacer>
            <v-btn right absolute icon @click="isShowPaymentDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>Enter your FakeMomo's account</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field label="Username" color="orange"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn text block color="green">Make payment</v-btn>
          </v-card-actions>
        </v-card>

        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            block
            color="orange"
            v-on="on"
            v-bind="attrs"
            @click="purchase"
            :disabled="$store.state.carts.length === 0"
          >Online Payment</v-btn>
        </template>
      </v-dialog>
    </v-footer>
  </v-container>
</template>

<script>
import http from '../../http'
export default {
  methods: {
    getFoodItemIndexByID(id) {
      return this.$store.state.foods.findIndex(item => item.id === id)
    },
    purchase() {
      console.log("PURCHASE!")
      let data = {
        customerID: this.$store.state.customer.id,
        cartItems: this.$store.state.carts.map((item) => {
          let index = this.$store.state.foods.findIndex(i => i.id === item.foodID)
          let vendorID = this.$store.state.foods[index].vendorID
          return {
              foodItemID: item.foodID,
              vendorID: vendorID,
              quantity: item.quantity
          }
          })
      }
      let config = {
          "Content-Type": "application/json"
      }
      http.server.post('/order', data, config).then((response) => {
        console.log(data)
        let resData = response.data
        console.log(response)
        if (resData.id != null) {
          // order successfully
          localStorage.setItem('orderID', resData.id)
          console.log('success')
        }
        else {
          // failed
          localStorage.setItem('orderID', resData.id)
          console.log('failed')
        }
      })
    }
  },
  data: () => ({
    isShowPaymentDialog: false
  })
};
</script>

<style>

</style>
