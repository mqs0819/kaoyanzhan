<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}学校</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="学校名称">
        <el-input v-model="model.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-input v-model="model.address" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="学校所属工程">
        <el-select v-model="model.tags" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="隶属">
        <el-input
          v-model="model.affiliated"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="官网">
        <el-input
          v-model="model.official_website"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="校徽">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.logoUrl" :src="model.logoUrl" class="avatar" />
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
  name: "SchoolView",
  data() {
    return {
      categories: [],
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
        res = await this.$http.put(`rest/schools/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/schools", this.model);
      }
      this.$router.push("/schools/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/schools/${this.id}`);
      this.model = res.data;
    },
    async fetchCatgories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
  },
  created() {
    this.fetchCatgories();
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