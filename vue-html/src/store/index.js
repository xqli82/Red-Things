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
        name: 'test1', level: '123', stack: [
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
    },
    deleteGroup(context,{app,data}){
      axios.delete('/user/group',{
        data:data
      }).then(res=>{
        if(res.data.code==200){
          app.$message("删除成功")
          this.dispatch('getGroup')
        }
      })
    },
    updateGroup(context,{app,data}){
      axios.put(`/user/group/${data.name}`,data)
      .then(res=>{
        if(res.data.code==200){
          app.$message('更新成功')
        }else{
          app.$message('更新失败')
        }
      })
      .catch(err=>{
        app.$message(err)
      })
    }
  },
  modules: {
  }
})
