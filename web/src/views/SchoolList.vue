<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-search
      placeholder="输入院校名称搜索"
      shape="round"
      v-model="keyWords"
      @keydown.enter="reloadSchoolFilter()"
    ></van-search>

    <div class="bg-grey-bg">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, i) in list" :key="i" class="mt-3">
          <router-link :to="{path: '/school-details?name='+item.name}">
            <div class="d-flex">
              <div>
                <van-image
                  width="5rem"
                  height="5rem"
                  fit="cover"
                  :src="item.logoUrl"
                />
              </div>
              <div class="ml-4">
                <div>
                  <span class="fs-xl text-black">{{ item.name }}</span>
                </div>
                <div class="spacing-tag mt-2">
                  <van-tag color="#EDF6FE" text-color="#1787E0" v-if="item._985"
                    >985</van-tag
                  >
                  <van-tag color="#EDF6FE" text-color="#1787E0" v-if="item._211"
                    >211</van-tag
                  >
                  <van-tag color="#FFFFFF" text-color="#969799"
                    ><van-icon name="location"></van-icon
                    >{{ item.address }}</van-tag
                  >
                  <van-tag color="#FFFFFF" text-color="#969799"
                    >隶属于：{{ item.affiliated }}</van-tag
                  >
                </div>
              </div>
            </div>
          </router-link>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      list: [],
      loading: false,
      finished: false,
      keyWords: "",
    };
  },
  mounted() {
    const { query } = this.$route;
    if (query.from === "school") {
      this.title = "找院校";
    }
    if (query.from === "home") {
      this.title = "院校库";
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {},
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await this.$http.get("/schools");
      this.list = res.data;
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      this.finished = true;
    },
    async reloadSchoolFilter() {
      const res = await this.$http.get(`search?q=${this.keyWords}`);
      this.list = res.data;
    },
  },
};
</script>

<style>
.spacing-tag .van-tag {
  margin: 0 0.2rem;
}
</style>