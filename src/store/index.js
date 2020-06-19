import Vue from 'vue'
import Vuex from 'vuex'

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
    },
    pushFoodItem(state, value) {
      state.foods.push(value)
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

  }
})
