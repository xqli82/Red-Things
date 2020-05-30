const state = {
    groups: []
}

const mutations = {
    setGroups(state, data) {
        state.groups = data
    }
}

const actions = {
    getGroups({ commit }, app) {
        app.$http.get('/group/list')
            .then(res => {
                if (res.code == 200) {
                    commit('setGroups', res.data)
                } else {
                    app.$message('权限组为空')
                }

            })
    },
    deleteGroup({ dispatch }, { app, id }) {
        app.$http.delete('/group/group', {
            data: {
                id: id
            }
        }).then(res => {
            if (res.code == 200) {
                app.$message("删除成功")
                dispatch('getGroups', app)
            }
        })
    },
    updateGroup({ dispatch }, { app, data }) {
        app.$http.put(`/group/group/${data.name}`, data)
            .then(res => {
                if (res.code == 200) {
                    app.$message('更新成功')
                    dispatch('getGroups', app)
                } else {
                    app.$message('更新失败')
                }
            })
            .catch(err => {
                app.$message(err)
            })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}