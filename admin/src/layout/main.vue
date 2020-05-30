<template>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['/user','/device']" router 
        >
          <li class="el-submenu">
            <div class="el-submenu__title">
              <i class="el-icon-s-home"></i>
              <router-link to="/">Home</router-link>
            </div>
          </li>
          <el-submenu index="/device">
            <template slot="title">
              <i class="el-icon-s-ticket"></i>设备管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/device/list">
                <i class="el-icon-arrow-right"></i>设备列表
              </el-menu-item>
              <el-menu-item index="/device/add">
                <i class="el-icon-arrow-right"></i>添加设备
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/user">
            <template slot="title">
              <i class="el-icon-s-custom"></i>用户管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/list">
                <i class="el-icon-arrow-right"></i>用户列表
              </el-menu-item>
              <el-menu-item index="/user/add">
                <i class="el-icon-arrow-right"></i>添加用户
              </el-menu-item>
              <el-menu-item index="/user/group">
                <i class="el-icon-arrow-right"></i>权限管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <li class="el-submenu">
            <div class="el-submenu__title">
              <i class="el-icon-s-management"></i>
              <router-link to="/red">Node-Red</router-link>
            </div>
          </li>
          <li class="el-submenu">
            <div class="el-submenu__title">
              <i class="el-icon-s-data"></i>
              <router-link to="/dashboard">DashBoard</router-link>
            </div>
          </li>
          <li class="el-submenu">
            <div class="el-submenu__title">
              <i class="el-icon-s-promotion"></i>
              <router-link to="/v5w">威武网教程</router-link>
            </div>
          </li>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <span style="text-align: left;">Red-Things IOT Platform</span>
          </div>
          <div class="right">
            <span>欢迎 : {{ username }}</span>
            <span @click="logout" class="logout">注销</span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  
  
  <script>
    import Cookies from 'js-cookie'
    export default {
      data() {
        return {
          username: '',
          stack:null
        }
      },
      methods: {
        logout() {
          Cookies.remove('token')
          window.location.href='/main'
        }
      },
      mounted() {
        this.$axios.get('/user')
        .then(res=> {
          this.username = res.data.username
        })
        .catch(err=>{
          console.log(err)
        })
  
        this.$axios.get('/stack')
        .then(res=> {
          this.$store.commit('getStack',res.data.stack) 
        })
        .catch(err=>{
          console.log(err)
        })
  
      },
    };
  </script>
  
  <style scoped lang='scss'>
  .el-header {
    background-color: #337ab7;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  
    .left {
    }
  
    .right {
      font-size: 12px;
  
      * {
        display: inline-block;
        margin: 0px 10px;
      }
    }
  }
  
  .el-aside {
    color: #333;
    height: 100vh;
  }
  
  .el-main {
    padding: 0;
  }
  
  .el-container {
    height: 100vh !important;
  }
  
  a {
    text-decoration: none;
  }
  
  .logout {
    cursor: pointer;
  }
  </style>