<template>
  <div>
    <el-table
      :data="items.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
      border
    >
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="logoUrl" label="校徽" width="70">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="校名" width="150"></el-table-column>
      <el-table-column
        prop="affiliated"
        label="隶属部门"
        width="120"
      ></el-table-column>
      <el-table-column prop="tags" label="标签" width="150">
        <template slot-scope="scope">
					<el-tag type="primary" effect="plain" size="mini"  v-if="scope.row.tags.includes('644f34e0d014c05e381c8f60')">985</el-tag>
					<el-tag type="success" effect="plain" size="mini" style="margin-left:.4rem" v-if="scope.row.tags.includes('644f3500d014c05e381c8f77')">211</el-tag>
					<el-tag type="warning" effect="plain" size="mini" style="margin-left:.4rem" v-if="scope.row.tags.includes('644f5fc61f6b17d47a8c4bcd')">双一流</el-tag>
        </template>
        <el-tag type="success" effect="plain">985</el-tag>
        <el-tag type="warning" effect="plain" style="margin-left: 0.6rem"
          >211</el-tag
        >
      </el-table-column>
      <el-table-column prop="address" label="所在省份"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/schools/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button @click="remove(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="items.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
    };
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/schools/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/schools");
      this.items = res.data;
    },
    async fetchTag() {

		},
  },
  created() {
    this.fetch();
  },
};
</script>

<style scoped>
.page {
  margin-top: 1rem;
}
</style>