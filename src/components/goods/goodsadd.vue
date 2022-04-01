<template>
<el-card class="box-card">
  <my-bread level1="商品管理" level2="商品列表" slot="header"></my-bread>
  <div class="flex-container">
    <div class="flex-item">
      <el-alert
        class="alert"
        title="添加商品信息"
        type="success"
        center
        show-icon
        :closable="false">
      </el-alert>
      <el-steps :active="active" finish-status="success" style="margin-top: 30px; margin-left: 100px; margin-right: 100px">
        <el-step title="基本信息"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>

      <!-- 1. 基本信息 -->
      <template v-if="seen1">
        <el-form label-position="right" label-width="100px" :model="form" class="form">
          <el-form-item label="商品名称：">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格：">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量：">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量：">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
              clearable
              expandTrigger="hover"
              v-model="selectedOptions"
              :options="options"
              :props="defaultProps"></el-cascader>
          </el-form-item>
        </el-form>
        <el-button class="next-btn" @click="next">下一步，填写商品参数</el-button>
      </template>

      <!-- 2. 商品属性 -->
      <template v-if="seen2">
        <!-- 显示的是该三级分类的商品参数 -->
        <el-form label-position="right" label-width="100px" :model="form" class="form">
          <el-form-item label="商品参数：">
            <div class="flex-container-1">
              <div class="flex-item-1">
                <el-form label-position="right" label-width="80px">
                  <el-form-item
                    :label="item1.attr_name+'：'"
                    v-for="(item1, i) in arrDyparams"
                    :key="i">
                   <el-checkbox-group v-model="item1.attr_vals">
                    <el-checkbox
                      class="checkbox"
                      v-for="(item2, i) in item1.attr_vals"
                      :key="i"
                      :label="item2"
                      border></el-checkbox>
                  </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-form-item>
            <el-form-item label="商品规格：">
              <div class="flex-container-1">
                <div class="flex-item-1">
                  <el-form label-position="right" label-width="180px">
                    <el-form-item
                      class="form-1"
                      :label="item.attr_name+'：'"
                      v-for="(item, i) in arrStaticparams"
                      :key="i">
                      <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                  </el-form>
              </div>
            </div>
            </el-form-item>
        </el-form>
        <el-button @click="pre1" class="pre-btn">上一步，填写商品参数</el-button>
        <el-button @click="next1" class="next-btn-1">下一步，填写商品参数</el-button>
      </template>

      <!-- 3. 商品内容 -->
      <template v-if="seen3">
        <el-form label-position="right" label-width="100px" :model="form" class="form">
          <el-form-item label="商品参数：">
            <div class="flex-container-1">
              <div class="flex-item-1">
            <el-upload
              class="upload"
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="规格参数：">
            <div class="flex-container-1">
              <div class="flex-item-1">
                <quill-editor class="ql-editor" v-model="form.goods_introduce"></quill-editor>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-button @click="pre2" class="pre-btn">上一步，填写商品属性</el-button>
        <el-button @click="addGoods" class="add-btn">完成，提交商品</el-button>
      </template>
    </div>
  </div>
</el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'goodsadd',
  components: {
    quillEditor
  },
  data () {
    return {
      active: 0,
      // goods_cat 以‘，’分割的分类列表 -> selectedOptions -> string
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attr: []
      },
      // 级联选择器绑定的数据
      options: [],
      selectedOptions: [52, 64, 73],
      // 配置某些属性
      defaultProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      seen1: true,
      seen2: false,
      seen3: false,
      // 动态参数的数据数组
      arrDyparams: [],
      checkList: [],
      arrStaticparams: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    // 添加商品 - 发送请求
    async addGoods () {
      this.active++
      // 在发送请求前，处理 this.form 的数据
      // this.selectedOptions -> string
      // pics 是数组 [pic: 图片临时路径]
      // attr [{attr_id: ?, attr_value: ?}]
      // 遍历 -> 取数据 -> 放在一个新数组中
      this.form.goods_cat = this.selectedOptions.join(',')
      // console.log(this.arrDyparams)
      // console.log(this.arrStaticparams)
      let arr1 = this.arrDyparams.map((item) => {
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      let arr2 = this.arrStaticparams.map((item) => {
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      this.form.attrs = [...arr1, ...arr2]
      const res = await this.$http.post(`goods`, this.form)
      this.$router.push({name: 'goods'})
    },
    pre2 () {
      this.active--
      this.seen3 = false
      this.seen2 = true
    },
    // 图片上传时的相关函数
    // file 是当前上传的图片的相关信息（图片名 / 图片路径）
    handlePreview (file) {

    },
    handleRemove (file) {
      // file.response.data.tmp_path
      // console.log('移除成功')
      // console.log(file)
      // 先获取该图片的索引
      // findIndex((item) => {}) 遍历 把符合条件的元素的索引进行返回
      let index = this.form.pics.findIndex((item) => {
        return item.pic === file.response.data.tmp_path
      })
      // 从 this.form.pics 移除当前删除的图片
      this.form.pics.splice(index, 1)
      // console.log(this.form.pics)
    },
    handleSuccess (file) {
      // file.data.tmp_path 图片临时保存的数据
      // console.log('上传成功')
      // console.log(file)
      this.form.pics.push({
        pic: file.data.tmp_path
      })
    },
    pre1 () {
      this.active--
      // console.log(this.active)
      this.seen2 = false
      this.seen1 = true
    },
    next1 () {
      this.active++
      // console.log(this.active)
      this.seen2 = false
      this.seen3 = true
    },
    async next () {
      if (this.active++ > 2) this.active = 0
      if (this.active === 1) {
        console.log(this.active)
        if (this.selectedOptions.length !== 3) {
          this.$message.warning('请先选择商品的三级分类')
        } else {
          this.seen1 = !this.seen1
          this.seen2 = true
          // 获取动态参数的数据
          // id -> 分类 id
          const res1 = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
          // console.log(res1)
          this.arrDyparams = res1.data.data
          // this.arrDyparams 每个对象.attr_vals 字符串 -> 数组 -> v-for
          this.arrDyparams.forEach(item => {
            // 并不是所有的三级分类都有动态参数 -> v-for 报错 -> 空数组 [] -> v-for 不报错
            item.attr_vals =
            item.attr_vals.length === 0
              ? [] : item.attr_vals.trim().split(',')
          })
          // 获取静态参数的数据
          const res2 = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
          // console.log(res2)
          this.arrStaticparams = res2.data.data
        }
      }
    },
    // handleChange () {},
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
.flex-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  /*background-color: lightgrey;*/
}
.flex-item {
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  width: 800px;
  height: 1650px;
}
.flex-container-1 {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: #f8f9fc;
}
.flex-item-1 {
  background-color: #f8f9fc;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  width: 600px;
  min-height: 40px;
}
.alert {
  width: 600px;
  margin-top: 60px;
  margin-left: 100px;
  margin-right: 100px
}
.form {
  margin-top: 20px;
  margin-left: 100px;
  margin-right: 100px;
}
.form-1 {
  margin-top: 20px;
  margin-bottom: 20px;
  /*margin-left: 100px;*/
  margin-right: 20px;
}
.checkbox {
  margin-top: 10px;
  margin-bottom: 10px;
  /*margin-left: 20px;*/
  margin-right: 20px;
  background-color: white;
}
.next-btn {
  margin-top: 30px;
  margin-left: 450px;
  background-color: #70C2BB;
  color: #303133;
  /*background-color: #67c23a;*/
  /*color: white;*/
  border: none;
}
.pre-btn {
  margin-top: 30px;
  margin-left: 300px;
  background-color: #70C2BB;
  color: #303133;
  border: none;
}
.next-btn-1 {
  background-color: #70C2BB;
  color: #303133;
  border: none;
}
.upload {
  margin: 10px 20px;
  min-height: 70px;
  /*background-color: white;*/
}
.ql-editor {
  min-height: 100px;
  padding-top: 0;
}
.add-btn {
  background-color: #70C2BB;
  color: #303133;
  border: none;
}

</style>
