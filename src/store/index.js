import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foods: [],
    carts: [],
    customer: {
      id: null,
      info: {
        username: null,
        firstname: null,
        lastname: null,
        email: null
      }
    }
  },
  mutations: {
    pushFoodItem(state, value) {
      state.foods.push(value)
    },

    pushCartItem(state, cart) {
      state.carts.push(cart)
    },

    removeItemFromCart(state, index) {
      state.carts.splice(index, 1)
    },

    increaseCartItemQuantity(state, { index, amount }) {
      if (amount <= 0)
        return
      state.carts[index].quantity += amount
    },

    decreaseCartItemQuantity(state, { index, amount }) {
      if (amount <= 0)
        return
      if (state.carts[index].quantity > 1)
        state.carts[index].quantity = state.carts[index].quantity - amount
    },

    popCartItem(state, position) {
      state.carts.splice(position, 1)
    },

    setCustomer(state, { id, info }) {
      state.customer.id = id
      state.customer.info.username = info.username
      state.customer.info.firstname = info.firstname
      state.customer.info.lastname = info.lastname
      state.customer.info.email = info.email
    }
  },
  actions: {
  },
  modules: {
  }
})
