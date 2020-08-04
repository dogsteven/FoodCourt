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
            <v-spacer></v-spacer>
            <v-btn right absolute icon @click="toMenu">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-icon class="mx-auto" color="green" size="60"> mdi-check-circle-outline</v-icon>
            </v-row>
            <v-row>
              <v-card-text class="text-center">
                Đơn hàng của bạn đã thanh toán thành công <br>
                Chuẩn bị chuyển về thực đơn
              </v-card-text>
              <v-card-text class="text-center">
                
              </v-card-text>
            </v-row>
          </v-card-text>
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
      let data = {
        customerID: this.$store.state.customer.id,
        cartItems : this.$store.state.carts
      }
      let config = {
          "Content-Type": "application/json"
      }
      http.server.post('/order', data, config).then((response) => {
        let resData = response.data
        if (resData.id != null) {
          // order successfully
          localStorage.setItem('orderID', resData.id)
          console.log(resData.id)
          for (var i = 0; i < this.$store.state.carts.length; i++) {
            this.$store.commit('removeItemFromCart', 0)
          }
          this.isShowPaymentDialog = false
          setTimeout( () => {
            this.$router.replace("/menu");
          }, 2500); 
        }
        else {
          // failed
          localStorage.setItem('error', resData.error)
          localStorage.setItem('errorItems', resData.errorItems)
          if (localStorage.getItem('error') == "Out of stock!") {
            console.log(localStorage.error)
          }
        }
      })
    },
    toMenu() {
      this.isShowPaymentDialog = false
      this.$router.replace("/menu");
    }
  },
  data: () => ({
    isShowPaymentDialog: false
  })
};
</script>

<style>

</style>
