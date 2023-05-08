<template>
  <div class="home">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="230px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          :default-openeds="['1', '2', '3', '4']"
          router
          :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-s-management"></i>院校管理</template
            >
            <el-menu-item-group>
              <template slot="title">院校</template>
              <el-menu-item index="/schools/create">新增学校</el-menu-item>
              <el-menu-item index="/schools/list">学校列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">专业</template>
              <el-menu-item index="/schools/create">新增专业</el-menu-item>
              <el-menu-item index="/schools/list">专业列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">分类编辑</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i>内容管理</template
            >
            <el-menu-item-group>
              <template slot="title">图片</template>
              <el-menu-item index="/ads/create">轮播图编辑</el-menu-item>
							<el-menu-item index="/ads/list">轮播图列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="社区">
              <el-menu-item index="/articles/create">文章编辑</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-s-custom"></i>用户管理</template
            >
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/users/create">用户编辑</el-menu-item>
              <el-menu-item index="/users/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-s-tools"></i>系统设置</template
            >
            <el-menu-item-group>
              <template slot="title">基础</template>
              <el-menu-item index="3-1">数据中心</el-menu-item>
              <el-menu-item index="3-2">消息发布</el-menu-item>
              <el-menu-item index="3-2">关于</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i
              class="el-icon-setting"
              style="margin-right: 15px; font-size: 20px"
            ></i>
            <i
              class="el-icon-bell"
              style="margin-right: 15px; font-size: 20px"
            ></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span
            ><i>{{ name }}</i></span
          >
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      name: "Admin",
    };
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
