<template>
    <div>
        <div>
            <h4>添加用户</h4>
            <el-form label-position="right" label-width="80px">
                <el-form-item label="用户名：">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item label="别名：">
                    <el-input v-model="user.nickname"></el-input>
                </el-form-item>
                <el-form-item label="用户组：">
                    <el-select v-model="user.group" placeholder="用户组">
                        <el-option v-for="(item,index) in this.$store.getters.groups" :key="index" :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="createUser">创建</el-button>
                    <el-button type="danger" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <h4>重置密码</h4>
            <el-form label-position="right" label-width="80px">
                <el-form-item label="用户名：">
                    <el-input v-model="newPassword.username"></el-input>
                </el-form-item>
                <el-form-item label="新密码：">
                    <el-input v-model="newPassword.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="modifyPassword">创建新密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    nickname: '',
                    password: '',
                    group: ''
                },
                newPassword: {
                    username: '',
                    password: ''
                }
            }
        },
        mounted() {

        },
        methods: {
            createUser() {
                this.$store.dispatch('user/createUser', { app: this, user: this.user })
            },
            reset() {
                this.user.username = ''
                this.user.password = ''
                this.user.nickname = ''
                this.user.group = ''
            },
            modifyPassword() {
                this.$store.dispatch('user/modifyPassword', { app: this, data: this.newPassword })
            }
        },
    }
</script>
<style>

</style>