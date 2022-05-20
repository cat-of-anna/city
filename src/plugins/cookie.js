import Vue from 'vue'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)

export const getToken = () => {
  return Vue.cookie.get("token");
}

export const getUserName = () => {
  return Vue.cookie.get("username");
}