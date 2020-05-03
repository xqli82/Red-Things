<template>
    <div>
        用户列表：
        <el-table :data="this.$store.state.user.userList" stripe style="width: 100%" border>
            <el-table-column prop="_id" label="id" width="250px">
            </el-table-column>
            <el-table-column prop="username" label="账户" width="200" align="center">
            </el-table-column>
            <el-table-column prop="nickname" label="别名" width="200" align="center">
            </el-table-column>
            <el-table-column prop="group" label="用户组" width="200" align="center">
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="editUser(scope.$index)">编辑</el-button>

                    <el-popconfirm title="确定删除吗？" @onConfirm="deleteUser(scope.row._id)">
                        <el-button size="mini" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>


        <!-- 编辑用户 -->
        <div class="div-editor" v-show="editShow">
            <el-button @click="editShow=false" class="btn-x" size="small">
                <i class="el-icon-close"></i>
            </el-button>

            <div style="padding-top: 50px;">
                <el-form :label-position="right" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="用户id:">
                        <el-input v-model="user._id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名:">
                        <el-input v-model="user.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="别名:">
                        <el-input v-model="user.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组:">
                    <el-select v-model="user.group" placeholder="用户组">
                        <el-option v-for="(item,index) in editGroup" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                </el-form>
            </div>


            <div style="float:right;margin:10px 0px">
                <el-button size="small" type="danger" @click="editShow=false">取消</el-button>
                <el-button size="small" type="primary" @click="updateUser">确定</el-button>
            </div>
        </div>


    </div>
</template>
<script>
    export default {
        data() {
            return {
                editShow: false,
                user: {},
                editGroup: []
            }
        },
        mounted() {
            this.$store.dispatch('user/getUserList', this)
            this.$store.dispatch('group/getGroups', this)
        },
        methods: {
            editUser(index) {
                this.user = this.$store.state.user.userList[index]
                this.editGroup = this.$store.state.group.groups
                this.editShow = true
            },
            deleteUser(id) {
                this.$store.dispatch('user/deleteUser', { app: this, id: id })
            },
            updateUser() {
                this.editShow=false
                this.$store.dispatch('user/updateUser',{app:this,user:this.user})
            }
        },
    }
</script>
<style scoped lang="scss">
    .div-editor {
        padding: 10px 20px;
        position: absolute;
        z-index: 1000;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        background: #fff;
        border-radius: 3px;
        width: 400px;
        min-height: 300px;
        border: 1px solid rgba(0, 0, 0, 0.4);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);

        .btn-x {
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 1001;
        }
    }
</style>