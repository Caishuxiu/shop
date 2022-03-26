<template>
<el-card class="box-card">
  <my-bread level1="权限管理" level2="角色列表" slot="header"></my-bread>
  <el-row class="box-2">
    <el-col :span="12" class="caption">
      <i class="el-icon-document"></i>
      <span>数据列表</span>
    </el-col>
    <el-col :span="12" class="add">
      <el-button class="add-btn" @click.prevent="showAddDialog()">添加</el-button>
    </el-col>
  </el-row>
  <el-table
    class="users-table"
    :data="rolelist"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row v-for="(item1, i) in scope.row.children" :key="i">
          <el-col :span="4">
            <!-- 传角色 id 和权限 id -->
            <el-tag
              @close="deleteRight(scope.row, item1.id)"
              closable>{{item1.authName}}</el-tag>
            <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="20">
            <el-row v-for="(item2, i) in item1.children" :key="i">
              <el-col :span="4">
                <el-tag
                  @close="deleteRight(scope.row, item2.id)"
                  closable
                  type="success">{{item2.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-tag
                  @close="deleteRight(scope.row, item3.id)"
                  v-for="(item3, i) in item2.children" :key="i"
                  closable
                  type="warning">{{item3.authName}}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 无权限的提示 -->
        <span v-if="scope.row.children.length===0">未分配权限</span>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      label="#"
      width="150">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="300">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="角色描述"
      width="300">
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
        <el-button
          @click.prevent="showSetRightDialog(scope.row)"
          size="mini"
          plain
          type="warning"
          icon="el-icon-setting"
          circle></el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 修改权限的对话框 -->
  <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight" width="35%">
    <!-- 树形结构 -->
    <el-tree
      ref="tree"
      :data="treelist"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="arrcheck"
      :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
      <el-button type="primary" @click="setRoleRight()">确 定</el-button>
    </div>
  </el-dialog>

</el-card>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      rolelist: [],
      dialogFormVisibleRight: false,
      treelist: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      arrcheck: [],
      currentRoleId: -1
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    // 修改权限 - 发送请求
    async setRoleRight () {
      // roles/:roleId/rights
      // rids 树形节点中，所有全选和半选的 label 的 id
      // 获取全选的 id 的数组 arr1 getCheckedKeys
      // 获取半选的 id 的数组 arr2 getHalfCheckedKeys
      // el-tree 元素的 js 函数
      let arr1 = this.$refs.tree.getCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()

      // arr = arr1 + arr2
      // ES6 展开运算符 ...数组 or 对象
      let arr = [...arr1, ...arr2]
      // console.log(arr)
      const res = await this.$http.post(`roles/${this.currentRoleId}/rights`, {rids: arr.join(',')})
      // console.log(res)
      this.getRoleList()
      this.dialogFormVisibleRight = false
    },

    // 修改权限 - 打开对话框
    async showSetRightDialog (role) {
      // console.log(role)
      this.currentRoleId = role.id
      const res = await this.$http.get(`rights/tree`)
      // console.log(res)
      this.treelist = res.data.data
      this.dialogFormVisibleRight = true

      // 获取当前角色 role 的权限 id
      let arrtemp = []
      role.children.forEach(item1 => {
        // arrtemp.push(item1.id)
        item1.children.forEach(item2 => {
          // arrtemp.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp.push(item3.id)
          })
        })
      })
      this.arrcheck = arrtemp
    },

    // 取消权限
    async deleteRight (role, rightId) {
      // roles/:roleId/rights/:rightId
      // roleId 当前角色的 id
      // rightId 要删除的权限 id
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      // 删除成功，返回 200 和当前角色的剩余权限
      // 更新整个视图
      // this.getRoleList()
      role.children = res.data.data
    },

    async getRoleList () {
      this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      const res = await this.$http.get(`roles`)
      // console.log(res)
      this.rolelist = res.data.data
      // console.log(this.rolelist)
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
</style>
