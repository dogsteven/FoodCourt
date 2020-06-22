import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    isSignedIn: false,
    foods: {},
    cartItems: []
  }),
  mutations: {
    setIsSignedIn(state, value) {
      state.isSignedIn = value
    },
    setFoods(state, value) {
      state.foods = value
    },
    setCartItems(state, value) {
      state.cartItems = value
    }
  },
  actions: {
    queryFoods({ commit }, route) {
      http.get(route).then((response) => {
        commit('setFoods', response.data)
      }).catch((error) => {
        alert(error)
      })
    }
  },
  modules: {

  },
})
