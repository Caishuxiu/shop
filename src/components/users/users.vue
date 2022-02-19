<template>
  <el-card class="box-card">
    <!-- 1. 面包屑 -->
    <el-breadcrumb separator="/" slot="header">
      <el-breadcrumb-item> 用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2. 搜索 -->
    <el-row class="box-1">
      <el-col :span="12" class="caption">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </el-col>
      <el-col :span="12" class="search">
        <el-input placeholder="请输入内容" v-model="query">
          <el-button slot="append" class="search-btn">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row class="box-2">
      <el-col :span="12" class="caption">
        <i class="el-icon-document"></i>
        <span>数据列表</span>
      </el-col>
      <el-col :span="12" class="add">
        <el-button class="add-btn">添加</el-button>
      </el-col>
    </el-row>
    <!-- 3. 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="80">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Email">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Telephone">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Date">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Status">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Operation">
      </el-table-column>
    </el-table>
    <!-- 4. 分隔 -->

  </el-card>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      tableData: [{
        date: '2016-05-02',
        name: 'Jennie',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: 'Jennie',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: 'Jennie',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: 'Jennie',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: 'Jennie',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: 'Jennie',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户列表的请求
    async getUserList () {
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(
        `users?query=${this.query}' +
        '&pagenum=${this.pagenum}' +
        '&pagesize=${this.pagesize}`)
      console.log(res)
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
.box-1 {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border: 1px solid #ebeef5;
  border-radius: 5px;
}
.box-2 {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  margin-top: 20px;
}
.caption {
  padding-left: 20px;
  padding-top: 16px;
}
.search {
  width: 300px;
  float: right;
  padding: 10px 20px;
}
.search-btn {
  background-color: #70C2BB !important;
  color: #303133 !important;
}
.add {
  padding: 10px 20px;
}
.add-btn {
  background-color: #70C2BB;
  color: #303133;
  float: right;
  border: none;
}

</style>
