<template>

  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">

      <h2>用户登录</h2>

      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>

      <el-button class="login-btn" type="primary" @click.prevent="handleLogin()">登录</el-button>

    </el-form>

  </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    // 登录请求
    handleLogin () {
      this.$http.post('login', this.formData).then((res) => {
        console.log(res)
        const {
          data,
          meta: {msg, status}
        } = res.data

        // 1. 登录成功
        // 跳转到主页
        // 2. 不成功
        // 提示消息
        if (status === 200) {
          this.$router.push({name: 'home'})
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    height: 100%;
    background-color: cadetblue;

    /* 弹性盒布局 */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-form {
    width: 350px;
    background-color: white;
    border-radius: 5px;
    padding: 30px;
  }

  .login-wrap .login-btn {
    width: 100%;
  }

</style>
