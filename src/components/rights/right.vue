<template>
<el-card class="box-card">
  <!-- 1. 面包屑 -->
<!--  <el-breadcrumb separator="/" slot="header">-->
<!--    <el-breadcrumb-item>权限管理</el-breadcrumb-item>-->
<!--    <el-breadcrumb-item>权限列表</el-breadcrumb-item>-->
<!--  </el-breadcrumb>-->

  <my-bread level1="权限管理" level2="权限列表" slot="header"></my-bread>

  <!-- 2. 表格 -->
  <el-table
    :data="rightlist"
    height="600px"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="100">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label=" 路径">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
        <!-- scope.row.level 0 1 2 -->
        <span v-if="scope.row.level==='0'">一级</span>
        <span v-if="scope.row.level==='1'">二级</span>
        <span v-if="scope.row.level==='2'">三级</span>
      </template>
    </el-table-column>
  </el-table>

</el-card>
</template>

<script>
export default {
  name: 'right',
  data () {
    return {
      rightlist: []
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    async getRightList () {
      this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      const res = await this.$http.get(`rights/list`)
      console.log(res)
      this.rightlist = res.data.data
      // console.log(rightlist)
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
</style>
