<template>
<el-card class="box-card">
  <my-bread level1="商品管理" level2="分类参数" slot="header"></my-bread>
  <el-alert
    title="只允许为第三级分类设置参数"
    type="error"
    :closable="false">
  </el-alert>
  <el-form label-position="right" label-width="100px" :model="form" class="form">
    <el-form-item label="商品分类：">
    <el-cascader
      @change="handleChange"
      clearable
      expandTrigger="hover"
      v-model="selectedOptions"
      :options="options"
      :props="defaultProps"
      :show-all-levels="false"></el-cascader>
    </el-form-item>
  </el-form>
  <el-tabs v-model="active" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="1">
      <el-button type="danger">设置动态参数</el-button>
      <el-table
        :data="arrDyparams"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- el-tag -->
            <el-tag
              style="margin-top: 10px;"
              :key="tag"
              v-for="tag in scope.row.attr_vals"
              closable
              :disable-transitions="false"
              @close="handleClose(scope.row, tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row.attr_vals)"
              @blur="handleInputConfirm(scope.row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="#"
          type="index">
        </el-table-column>
        <el-table-column
          label="属性名称"
          prop="attr_name">
        </el-table-column>
        <el-table-column
          label="操作">
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
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态参数" name="2">
      <el-button type="danger">设置静态参数</el-button>
      <el-table
        :data="arrStaticparams"
        style="width: 100%">
      <el-table-column
        label="#"
        type="index">
      </el-table-column>
      <el-table-column
        label="属性名称"
        prop="attr_name">
      </el-table-column>
        <el-table-column
          label="属性量"
          prop="attr_vals">
        </el-table-column>
      <el-table-column
        label="操作">
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
      </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

</el-card>
</template>

<script>
export default {
  name: 'cateparams',
  data () {
    return {
      form: {},
      // 级联选择器绑定的数据
      options: [],
      selectedOptions: [],
      // 配置某些属性
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      arrDyparams: [],
      arrStaticparams: [],
      active: '1',
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    // 点击 x 按钮
    async handleClose (scope, tag) {
      scope.attr_vals.splice(scope.attr_vals.indexOf(tag), 1)
      let putData = {
        attr_name: scope.attr_name,
        attr_sel: 'many',
        attr_vals: scope.attr_vals.join(',')
      }
      const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${scope.attr_id}`, putData)
      // console.log(res)
    },
    // 点击 New Tag 按钮
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 回车键 or 失去焦点
    async handleInputConfirm (scope) {
      let inputValue = this.inputValue
      if (inputValue) {
        scope.attr_vals.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      let putData = {
        attr_name: scope.attr_name,
        attr_sel: 'many',
        attr_vals: scope.attr_vals.join(',')
      }
      const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${scope.attr_id}`, putData)
      // console.log(res)
    },
    async handleClick () {
      if (this.active === '2') {
        if (this.selectedOptions.length === 3) {
          // 获取静态参数的数据
          const res2 = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
          // console.log(res2)
          this.arrStaticparams = res2.data.data
        }
      }
    },
    // 级联选择器改变
    async handleChange () {
      if (this.selectedOptions.length === 3) {
        // 获取动态参数的数据
        const res1 = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
        this.arrDyparams = res1.data.data
        this.arrDyparams.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0
              ? [] : item.attr_vals.trim().split(',')
        })
        console.log(this.arrDyparams)
      }
    },
    // 获取三级分类的数据
    async getCategories () {
      const res = await this.$http.get(`categories?type=3`)
      // console.log(res)
      this.options = res.data.data
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
.form {
  margin-top: 20px;
}
.edit-btn {
  background-color: #d3eeea;
  border-color: #70C2BB;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-top: 10px;
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
