import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  state: {
    stack:[]
  },
  mutations: {
    setStack(state,data){
      state.stack=data
    }
  },
  actions: {
    getStack({commit},app){
      app.$http.get('/stack')
      .then(res=>{
        if(res.code==200){
          commit('setStack',res.stack)
        }
      })
    }
  },
  modules: {
    group,
    user
  }
})
