const state = {
    userList: [
        { username: 'test', nickname: 'ssss', _id: 123131312321, group: 'Group1' }
    ]
}

const mutations = {
    userList(state, data) {
        state.userList = data
    }
}

const actions = {
    getUserList({ commit }, app) {
        app.$http.get('/user/user')
            .then(res => {
                commit('userList', res.data)
            })
    },
    deleteUser({ dispatch }, { app, id }) {
        app.$http.delete('/user/user', {
            data: { id: id }
        })
            .then(() => {
                app.$message(`删除id为:${id}的用户成功！`)
                dispatch('getUserList', app)
            })
    },
    updateUser({ dispatch }, { app, user }) {
        app.$http.put(`/user/user/${user._id}`, user)
            .then(res => {
                console.log(res)
                app.$message('修改成功！')
                dispatch('getUserList', app)
            })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}