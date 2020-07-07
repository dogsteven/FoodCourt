import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messagingToken: null,
    foods: [],
    carts: [],
    customer: {
      id: null,
      username: null,
      password: null,
      firstname: null,
      lastname: null,
      email: null,
      registrationTokens: []
    }
  },
  mutations: {
    setMessagingToken(state, token) {
      state.messagingToken = token
    },

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

    setCustomer(state, { id, username, password, firstname, lastname, email, registrationTokens }) {
      state.customer.id = id
      state.customer.username = username
      state.customer.password = password
      state.customer.firstname = firstname
      state.customer.lastname = lastname
      state.customer.email = email
      state.customer.registrationTokens = registrationTokens
    }
  },
  actions: {
  },
  modules: {
  }
})
