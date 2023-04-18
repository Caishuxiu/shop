<template>
  <el-card class="box-card">
    <!-- 1. 面包屑 -->
    <el-breadcrumb separator="/" slot="header">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2. 搜索 -->
    <el-row class="box-1">
      <el-col :span="12" class="caption">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </el-col>
      <el-col :span="12" class="search">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
          <el-button
            @click.prevent="searchUsers()"
            slot="append" class="search-btn">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row class="box-2">
      <el-col :span="12" class="caption">
        <i class="el-icon-document"></i>
        <span>数据列表</span>
      </el-col>
      <el-col :span="12" class="add">
        <el-button class="add-btn" @click.prevent="showAddDialog()">添加</el-button>
      </el-col>
    </el-row>
    <!-- 3. 表格 -->
    <el-table
      class="users-table"
      :data="userlist"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="Name"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="Telephone">
      </el-table-column>
      <el-table-column
        label="Date">
        <template slot-scope="userlist">
          {{userlist.row.create_time | fmtDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="Status">
        <template slot-scope="scope">
          <el-switch
            @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#70C2BB"
            inactive-color="#dcdfe6">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="Operation">
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
            @click.prevent="showSetUserRoleDialog(scope.row)"
            size="mini"
            plain
            type="warning"
            icon="el-icon-setting"
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
      :page-sizes="[6, 12, 18]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 对话框  -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd" width="25%">
      <el-form :model="form">
        <el-form-item label="用户：" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false" class="cancel-btn">取 消</el-button>
        <el-button @click="addUser()" class="sure-btn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit" width="25%">
      <el-form :model="form">
        <el-form-item label="用户：" label-width="100px">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false" class="cancel-btn">取 消</el-button>
        <el-button @click="editUser()" class="sure-btn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleSet" width="30%">
      <el-form :model="form">
        <el-form-item>
          <!-- 如果 select 绑定的数据和 option 的数据一样，则显示 option 的 label 数据 -->
          <el-select v-model="currentRole" class="setStyle">
            <el-option label="请选择" :value="-1"></el-option>
             <el-option
               :label="item.roleName"
               :value="item.id"
                v-for="(item, i) in roles"
               :key="i"
             ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSet = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      // query: '',
      userlist: [],
      // 分页相关数据
      total: 1,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 6
      },
      // pagenum: 1,
      // pagesize: 2,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleSet: false,
      // 添加用户的表单数据
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      currentRole: -1,
      currentUserId: -1,
      // 保存所有的角色数据
      roles: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 分配角色 - 发送请求
    async setRole () {
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {
        rid: this.currentRole
      })
      this.dialogFormVisibleSet = false
    },

    // 分配角色 - 打开对话框
    async showSetUserRoleDialog (user) {
      this.dialogFormVisibleSet = true
      // console.log('修改状态')
      this.currentUserId = user.id

      // 获取所有用户的角色 id
      const res1 = await this.$http.get(`roles`)
      // console.log(res1)
      this.roles = res1.data.data

      // 获取当前用户的角色 id
      const res = await this.$http.get(`users/${user.id}`)
      console.log(res)
      this.currentRole = res.data.data.rid
    },

    // 修改用户状态
    async changeMgState (user) {
      // 发送请求
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      // this.mg_state = !this.mg_state
      // console.log(res)
      // console.log('修改状态')
    },

    // 编辑用户 - 发送请求
    async editUser () {
      // const res = await this.$http.put('users/' + this.form.id, this.form)
      // console.log(res)
      this.$http.put('users/' + this.form.id, this.form)
      this.dialogFormVisibleEdit = false
      this.getUserList()
    },

    // 编辑用户 - 显示对话框
    showEditDialog (user) {
      this.dialogFormVisibleEdit = true
      this.form = user
    },

    // 删除用户 - 打开消息盒子
    showDeleteBox (userId) {
      this.$confirm('删除用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除请求 :id -> 用户 id
        // 1. data () 中找 userId
        // 2. 把 userId 以参数形式传进来
        const res = await this.$http.delete('users/' + userId)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.queryInfo.pagenum = 1
          // 1. 更新视图
          this.getUserList()
          // 2. 提示
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 添加用户 - 发送请求
    async addUser () {
      // 添加用户 - 关闭对话框
      this.dialogFormVisibleAdd = false

      const res = await this.$http.post('users', this.form)
      console.log(res)
      const {meta: {status, msg}, data} = res.data
      if (status === 201) {
        // 1. 提示成功
        this.$message.success(msg)
        // 2. 更新视图
        this.getUserList()
        // 3. 清空文本框
        this.form = {}
      } else {
        this.$message.warning(msg)
      }
    },
    // 添加用户 - 显示对话框
    showAddDialog () {
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    // 搜索用户
    searchUsers () {
      // console.log('search')
      // 按照 input 绑定的 query 参数发请求
      this.getUserList()
    },
    // 分页相关的函数
    handleSizeChange (val) {
      // 每页条数改，数据改
      console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      // this.queryInfo.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getUserList()
    },

    // 获取用户列表的请求
    async getUserList () {
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      // const res = await this.$http.get(
      //   `users?query=${this.query}' +
      //   '&pagenum=${this.pagenum}' +
      //   '&pagesize=${this.pagesize}`)
      const res = await this.$http.get('users', {
        params: this.queryInfo
      })
      // console.log(res)
      const {meta: {status, msg}, data: {users, total}} = res.data
      if (status === 200) {
        // 1. 给表格传数据
        this.userlist = users
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
.users-table {
  margin-top: 20px;
}
.cancel-btn {
  background-color: white;
  color: #303133;
}
.sure-btn {
  background-color: #70C2BB;
  color: #303133;
  border: none;
}
.edit-btn {
  background-color: #d3eeea;
  border-color: #70C2BB;
}
.paginationFormat {
  margin-top: 20px;
  float: right;
}
.setStyle {
  width: 80%;
}

</style>
