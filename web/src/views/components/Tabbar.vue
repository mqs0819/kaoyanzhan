<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/school">专业院校</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/community">社区</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "NavbarView",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>