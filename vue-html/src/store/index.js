import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stack: [
      { method: 'get', url: '/user' },
      { method: 'get', url: '/user1' },
    ],
    userGroup: [
      {
        name: 'test1', level: 0, stack: [
          { method: 'get', url: '/user' },
          { method: 'get', url: '/user1' },
        ]
      }
    ]
  },
  mutations: {
    getStack(state, data) {
      state.stack = data
    },
    getGroup(state, group) {
      state.userGroup = group
      console.log(state.userGroup)
    }
  },
  actions: {
    getGroup(context) {
      axios.get('/user/group').then(res => {
        if (res.data.code == 200) {
          context.commit('getGroup', res.data.groups)
        }
      }).catch(err => {
        console.log(err)
      })

    }
  },
  modules: {
  }
})
