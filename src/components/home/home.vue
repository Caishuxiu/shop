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
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home'
}
</script>

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

</style>
