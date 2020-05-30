const state = {
    groups:[]
}

const mutations = {
    setGroups(state,data){
        state.groups=data
    }
}

const actions = {
    getGroups({commit},app){
        app.$http.get('/group/list')
        .then(res=>{
            commit('setGroups',res.data)
        })
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}