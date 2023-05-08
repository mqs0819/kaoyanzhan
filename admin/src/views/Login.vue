<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form :model="ruleForm" :rules="rules" @submit.native.prevent="login">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
        <!-- 创建代码数量 -->
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入合法字符", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入合法字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async login() {
      const res = await this.$http.post("login", this.model);
      // sessionStorage.token = res.data.token
      console.log(res.data);
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
  },
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>
