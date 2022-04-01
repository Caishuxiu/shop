<template>
<el-card class="box-card">
  <!-- 1. 面包屑 -->
  <el-breadcrumb separator="/" slot="header">
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 2. 搜索 -->
  <el-row class="box-2">
    <el-col :span="12" class="caption">
      <i class="el-icon-document"></i>
      <span>数据列表</span>
    </el-col>
    <el-col :span="12" class="add">
      <el-button
        class="add-btn"
        @click.prevent="$router.push({name: 'goodsadd'})">添加</el-button>
    </el-col>
  </el-row>
  <!-- 3. 表格 -->
  <el-table
    class="users-table"
    :data="goodslist"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="60">
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="800">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格（元）">
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="商品重量">
    </el-table-column>
    <el-table-column
      label="创建日期">
      <template slot-scope="goodslist">
        {{goodslist.row.add_time | fmtDate}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button
          @click.prevent="showEditDialog(scope.row)"
          size="mini"
          plain
          class="edit-btn"
          icon="el-icon-edit"
          circle></el-button>
        <el-button
          @click.prevent="showDeleteBox(scope.row.id)"
          size="mini"
          plain
          type="danger"
          icon="el-icon-delete"
          circle></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 4. 分隔 -->
  <el-pagination
    class="paginationFormat"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[10, 20, 30]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</el-card>
</template>

<script>
export default {
  name: 'goodslist',
  data () {
    return {
      goodslist: [],
      // 分页相关数据
      total: 1,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 分页相关的函数
    handleSizeChange (val) {
      // 每页条数改，数据改
      // console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      // this.queryInfo.pagenum = 1
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getGoodsList()
    },
    showAddDialog () {},
    // 获取商品列表的请求
    async getGoodsList () {
      const res = await this.$http.get('goods', {
        params: this.queryInfo
      })
      console.log(res)
      const {meta: {status, msg}, data: {goods, total}} = res.data
      if (status === 200) {
        // 1. 给表格传数据
        this.goodslist = goods
        // 2. 给 total 传数据
        this.total = total
        // 3. 提示
        this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
.box-2 {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border: 1px solid #ebeef5;
  border-radius: 5px;
}
.caption {
  padding-left: 20px;
  padding-top: 16px;
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
.users-table {
  margin-top: 20px;
}
.edit-btn {
  background-color: #d3eeea;
  border-color: #70C2BB;
}
.paginationFormat {
  margin-top: 20px;
  float: right;
}
</style>
