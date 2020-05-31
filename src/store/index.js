import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    isSignedIn: false,
    foods: {}
  }),
  mutations: {
    setIsSignedIn(state, value) {
      state.isSignedIn = value
    },
    setFoods(state, value) {
      state.foods = value
    }
  },
  actions: {
    queryFoods({ commit }, url) {
      axios.get(url).then((response) => {
        commit('setFoods', response.data)
      }).catch((error) => {
        alert(error)
      })
    }
  },
  modules: {

  }
})
