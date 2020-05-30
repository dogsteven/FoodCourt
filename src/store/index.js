import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false
  },
  mutations: {
    setIsSignedIn(state, value) {
      state.isSignedIn = value
    }
  },
  actions: {
  },
  modules: {
  }
})
