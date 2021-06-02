import Vue from 'vue'
import Vuex from'vuex'

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const state={
  cartList:[],
  counter:0,
  number:0,
  ispraise:false,
  orderList:[]
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [persistedState()]
})
export default store
