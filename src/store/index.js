import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'

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
  mounted () {
    axios
      .get('https://aqueous-harbor-47765.herokuapp.com/api/test/database/Food?fbclid=IwAR2jWZxsYQwGpxw27-v3fNys9ZtBXV1HG74ZwB97CQuf3OagJLjOq6rrClI')
      .then(response => (this.info = response))
  }
})
