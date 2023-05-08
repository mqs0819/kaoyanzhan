<template>
  <div>
    <header class="home-header">
      <van-row>
        <van-col span="6">
          <!-- 倒计时 -->
          <div class="mt-3 ml-3">
            <div class="fs-xl">188 <span>天</span></div>
            <div class="text-grey">距2024考研</div>
          </div>
        </van-col>
        <van-col span="14">
          <router-link to="./school-list?from=home"
            ><van-search
              v-model="keyWords"
              placeholder="请输入搜索关键词"
              shape="round"
          /></router-link>
        </van-col>
        <van-col span="4">
          <router-link
            class="login fs-md"
            tag="span"
            to="./login"
            v-if="!isLogin"
            >登录/注册</router-link
          >
          <router-link class="login" tag="span" to="./mine" v-else>
            <van-icon name="manager-o" />
          </router-link>
        </van-col>
      </van-row>
    </header>

    <!-- Banner轮播图 -->
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in adsList" :key="item._id">
          <a :href="item.url">
            <img :src="item.image" alt="" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分类导航列表 -->
    <div class="category-list">
      <van-grid column-num="5" clickable>
        <van-grid-item v-for="item in categoryIcon" :key="item.title">
          <a :href="item.link">
            <div>
              <img :src="item.httpUrl" alt="" class="w-100" />
              <div>{{ item.title }}</div>
            </div>
          </a>
        </van-grid-item>
      </van-grid>
    </div>

    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-tabbar activeName="home"></m-tabbar>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "HomeView",
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      isLogin: false,
      keyWords: "",
      categoryIcon: [
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/ssml.png",
          title: "硕士目录",
					link: "/master"
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/bsml.png",
          title: "博士目录",
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/yxk.png",
          title: "院校库",
          link: "/school",
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/zxzx.png",
          title: "在线咨询",
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/wbgg.png",
          title: "网报公告",
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/tkwb.png",
          title: "统考网报",
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/wsqr.png",
          title: "网上确认",
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/cjcx.png",
          title: "成绩查询",
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/ycms.png",
          title: "远程面试",
        },
        {
          httpUrl: "http://localhost:5003/static/images/tbtj/wstj.png",
          title: "网上调剂",
        },
      ],
      newsCats: [],
      adsList: [],
    };
  },
  methods: {
    async fetchAds() {
      const res = await this.$http.get("rest/home/ads");
      console.log(res.data[0].items);
      this.adsList = res.data[0].items;
    },
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
  },
  mounted() {
    const token = localStorage.token;
    if (token) {
      this.isLogin = true;
    }
  },
  created() {
    this.fetchAds();
    this.fetchNewsCats();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.login {
  font-weight: 700;
  color: map-get($colors, "primary");
  line-height: 52px;
  .van-icon-manager-o {
    font-size: 20px;
    vertical-align: -3px;
  }
}

.swipe {
  padding: 0 1.3rem;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 10px;
  text-align: center;
  // background-color: #39a9ed;
  img {
    width: 100%;
  }
}

.category-list img {
  width: 3rem;
}
</style>
