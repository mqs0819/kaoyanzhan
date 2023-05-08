<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}学校</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input
          v-model="model.username"
          placeholder="请输入内容"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="model.password"
          placeholder="请输入内容"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="model.email" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="model.sex" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="model.birth"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所在省份">
        <el-input v-model="model.city" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.avator" :src="model.avator" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  name: "UserView",
  data() {
    return {
      model: {},
      imageUrl: "",
      cities: [
        {
          value: "Beijing",
          label: "北京",
        },
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Nanjing",
          label: "南京",
        },
        {
          value: "Chengdu",
          label: "成都",
        },
        {
          value: "Shenzhen",
          label: "深圳",
        },
        {
          value: "Guangzhou",
          label: "广州",
        },
      ],
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/users/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/users", this.model);
      }
      this.$router.push("/users/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/users/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

</style>