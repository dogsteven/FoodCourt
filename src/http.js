import axios from 'axios'

export default {
  configuration: {
    managementURL: 'http://localhost/api'
  },

  get(route, config = null) {
    return axios.get(this.configuration.managementURL + '/' + route, config)
  },

  post(route, data, config) {
    return axios.post(this.configuration.managementURL + '/' + route, data, config)
  },

  put(route, data, config) {
    return axios.put(this.configuration.managementURL + '/' + route, data, config)
  },

  delete(route, config) {
    return axios.delete(this.configuration.managementURL + '/' + route, config)
  }
}