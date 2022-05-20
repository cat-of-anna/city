import Vue from 'vue'
import Vuex from 'vuex'
import {getUserName, getToken} from '@/plugins/cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: getUserName(),
    token: getToken(),
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

