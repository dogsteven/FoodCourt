import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'

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

    popCartItem(state, position) {
      state.carts.splice(position, 1)
    },

    setCustomer(state, value) {
      state.customer.id = value.id
      state.customer.info.username = value.info.username
      state.customer.info.firstname = value.info.firstname
      state.customer.info.lastname = value.info.lastname
      state.customer.info.email = value.info.email
    }
  },
  actions: {
  },
  modules: {
  }
})