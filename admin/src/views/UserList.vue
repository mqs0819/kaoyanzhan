<template>
  <div>
    <h1>用户列表</h1>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="avator" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avator" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column label="生日">
        <template slot-scope="scope">
          <span :title="scope.row.birth">{{
            scope.row.birth | dateFormat
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="city" label="所在省份"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      items: [],
    };
  },
  filters: {
    dateFormat(val) {
      return dayjs(val).format("YYYY-MM-DD");
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/users");
      this.items = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/users/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
</style>