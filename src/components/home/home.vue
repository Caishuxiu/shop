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
          <a href="#" class="loginOut">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边栏导航 el-menu -->
        <el-menu
        :unique-opened="true"
        background-color="#d3eeea"
        active-text-color="#121259"
        >
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
            <el-menu-item index="1-3">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>数据列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home'
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
  line-height: 110px;
}
/*.el-submenu__title:hover {*/
/*  background-color: #70C2BB !important;*/
/*}*/
.el-menu-item:hover {
  background-color: #70C2BB !important;
}

</style>
