<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="2">
          <div class="header-logo">
            <img src="../../assets/logo.svg" alt="">
          </div>
        </el-col>
        <el-col :span="20" >
          <h2 class="middle">电商后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <a href="#" class="loginOut" @click.prevent="handleOut()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边栏导航 el-menu -->
        <!-- 开启路由模式 -->
        <el-menu
          :unique-opened="true"
          :router="true"
          background-color="#d3eeea"
          active-text-color="#121259">
          <!-- 1 -->
          <el-submenu :index="''+item1.order" v-for="(item1, index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>{{item1.authName}}</span>
            </template>
              <el-menu-item :index="item2.path" v-for="(item2, index) in item1.children" :key="index">
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      menus: []
    }
  },
  // newVue 之前自动触发
  beforeCreate () {
    // 获取 token
    const token = localStorage.getItem('token')
    // if token 没有 -> 登录
    if (!token) {
      this.$router.push({name: 'login'})
    }
    // tonken 有 -> 渲染组件
  },
  created () {
    this.getMenus()
  },
  methods: {
    // 获取导航数据
    async getMenus () {
      const res = await this.$http.get(`menus`)
      console.log(res)
      this.menus = res.data.data
    },
    handleOut () {
      // 1. 清除 token
      localStorage.clear()
      // 2. 提示
      this.$message.success('退出成功')
      // 3. 来到 login 组件
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
.el-submenu:hover {
  background-color: #70C2BB !important;
}
</style>

<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #70C2BB;
  height: 100px !important;
}
.aside {
  background-color: #d3eeea;
}
.main {
  background-color: #f1faf8;
}
/* 头部样式 */
.header-logo {
  width: 100px;
  height: 100px;
}
.middle {
  /*vertical-align: center;*/
  padding-bottom: 0;
  padding-top: 10px;
  padding-left: 20px;
}
.loginOut {
  text-decoration: none;
  color: #303133;
  line-height: 110px;
}
/*.el-submenu__title:hover {*/
/*  background-color: #70C2BB !important;*/
/*}*/
.el-menu-item:hover {
  background-color: #70C2BB !important;
}
</style>
