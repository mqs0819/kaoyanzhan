<template>
  <div>
    <van-nav-bar
      :title="model.name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="detail-header">
      <div class="d-flex text-white p-3">
        <div class="p-2 bg-white" style="border-radius: 0.3rem">
          <van-image :src="model.logoUrl" width="5rem"></van-image>
        </div>
        <div class="text-left ml-2 p-1">
          <div>
            <span class="fs-xl">{{ model.name }}</span>
            <span class="ml-3">
              <van-icon name="location">{{ model.address }}</van-icon>
            </span>
          </div>
          <div class="mt-3 mb-3">院校隶属：{{ model.affiliated }}</div>
          <div>双一流建设高校 | 研究生院 | 自主划线院校</div>
        </div>
      </div>
      <div>
        <van-button type="info" @click="modify()">
          {{ isFollow ? "取消关注" : "关注" }}
        </van-button>
      </div>
    </div>
    <div>
      <m-card title="招生信息" icon="arrow">
        <div class="nav-list p-3">
          <van-row gutter="5">
            <van-col span="8">
              <a
                :href="model.official_website"
                class="nav-list-item d-flex text-black bg-grey-bg"
              >
                <div class="icon">
                  <img
                    src="https://t3.chei.com.cn/yz/wap/assets/images/sch/sch-yxgk-1.svg"
                    alt=""
                  />
                </div>
                <div class="title">院校官网</div>
              </a>
            </van-col>
            <van-col span="8">
              <a class="nav-list-item d-flex text-black bg-grey-bg">
                <div class="icon">
                  <img
                    src="https://t3.chei.com.cn/yz/wap/assets/images/sch/sch-yxgk-2.svg"
                    alt=""
                  />
                </div>
                <div class="title">院系设置</div>
              </a>
            </van-col>
            <van-col span="8">
              <a to="" class="nav-list-item d-flex text-black bg-grey-bg">
                <div class="icon">
                  <img
                    src="https://t3.chei.com.cn/yz/wap/assets/images/sch/sch-yxgk-3.svg"
                    alt=""
                  />
                </div>
                <div class="title">专业介绍</div>
              </a>
            </van-col>
          </van-row>
        </div>
      </m-card>
    </div>
    <hr />
    <div class="p-3 text-left">
      <div class="fs-xl mb-3">招生简章</div>
      <div class="ml-4">北京大学2023年硕士研究生招生简章</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      isFollow: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    modify() {
      if (this.isFollow) {
        this.isFollow = false;
      } else {
        this.isFollow = true;
      }
    },
    async fetchPage() {
      const res = await this.$http.get(
        `schools/detail?name=${this.$route.query.name}`
      );
      this.model = res.data;
    },
  },
  created() {
    this.fetchPage();
  },
};
</script>

<style lang="scss" scoped>
.detail-header {
  background: url(../assets/images/sch-wap-banner.jpg) no-repeat 0 0;
}
.van-button {
  margin: 1rem 0;
  width: 12rem;
  height: 2rem;
  background-color: #208fe8;
  border: 1px solid white;
  border-radius: 0.5rem;
}
.nav-list {
  .icon {
    img {
      width: 1.4rem;
    }
    margin-right: 0.2rem;
  }
  .nav-list-item {
    padding: 0.6rem 1.5rem;
    line-height: 1.5rem;
  }
}
</style>