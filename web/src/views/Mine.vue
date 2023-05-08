<template>
  <div class="p-3">
    <router-link to="/setting" style="color: black">
      <div class="fs-xxl text-right">设置</div>
    </router-link>

    <van-row class="mt-2">
      <van-col span="5">
        <van-image
          width="60"
          height="60"
          fit="cover"
          src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        />
      </van-col>
      <van-col span="14">
        <div class="pl-3">
          <div class="fs-xxl text-left mt-3 text-bold">芝士土豆</div>
          <div class="text-grey text-left mt-3">硬币：1</div>
        </div>
      </van-col>
      <van-col span="5">
        <router-link to="/user">
          <div class="text-grey mt-4">
            个人主页 <van-icon name="arrow"></van-icon>
          </div>
        </router-link>
      </van-col>
    </van-row>
    <van-grid class="mt-4" clickable>
      <van-grid-item icon="like-o" text="关注" to="/mine/follow" />
      <van-grid-item icon="replay" text="历史" />
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="coupon-o" text="计划" />
    </van-grid>

    <m-card title="青少年模式"></m-card>

    <m-tabbar activeName="home"></m-tabbar>
  </div>
</template>

<script>
export default {
  name: "MineView",
  data() {
    return {};
  },
};
</script>

<style>
</style>