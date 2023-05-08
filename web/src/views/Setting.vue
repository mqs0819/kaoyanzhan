<template>
  <div class="setting">
    <van-nav-bar
      title="资料管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="p-3">
      <div class="bg-white">
        <van-row class="pt-3">
          <van-col span="15"
            ><div class="text-left ml-4 mt-3 fs-xl">头像</div></van-col
          >
          <van-col sapn="9">
            <!-- <van-image
              width="45"
              height="45"
              fit="cover"
              src="https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            /> -->
            <van-uploader v-model="fileList" :max-count="1" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="6"
            ><div class="text-left ml-4 mt-3 fs-xl">昵称</div></van-col
          >
          <van-col span="8">
            <van-field v-model="model.username" readonly type="tel" />
          </van-col>
          <van-col span="10">
            <van-button plain type="info" class="btn-o" @click="showPopup"
              >修改</van-button
            >
            <van-popup
              v-model="show"
              position="bottom"
              :style="{ height: '30%', background: '#f5f5f5', padding: '2rem' }"
            >
              <div class="d-flex">
                <div class="text-left fs-xl mb-4 flex-1 nick">编辑昵称</div>
                <div>
                  <van-button size="small" color="#989898" @click="show = false"
                    >取消</van-button
                  >
                  <van-button
                    size="small"
                    color="#333333"
                    class="ml-2"
                    @click="updateUsername()"
                    >确定</van-button
                  >
                </div>
              </div>
              <van-field v-model="model.username" placeholder="请输入昵称" />
              <div class="text-left mt-3 text-grey">
                仅支持汉字、字母和数字，限15个字。
              </div>
            </van-popup>
          </van-col>
        </van-row>
      </div>

      <div class="bg-white mt-4">
        <van-row>
          <van-col span="18">
            <div class="text-left ml-4 mt-3 fs-xl">账号管理</div>
          </van-col>
          <van-col span="6">
            <van-icon name="arrow" class="mt-3 ml-4"></van-icon>
          </van-col>
        </van-row>
        <van-divider />
        <van-row class="pb-3">
          <van-col span="18">
            <div class="text-left ml-4 fs-xl">通知管理</div>
          </van-col>
          <van-col span="6">
            <van-icon name="arrow" class="ml-4"></van-icon>
          </van-col>
        </van-row>
      </div>

      <div class="bg-white mt-4 pb-3">
        <van-row>
          <van-col span="18">
            <div class="text-left ml-4 mt-3 fs-xl">生日</div>
						<van-popup>
							
						</van-popup>
          </van-col>
          <van-col span="6">
            <span>去设置</span>
            <van-icon name="arrow" class="mt-3 mr-3"></van-icon>
          </van-col>
        </van-row>
        <van-divider />
        <van-row>
          <van-col span="18">
            <div class="text-left ml-4 fs-xl">性别</div>
          </van-col>
          <van-col span="6">
            <span>去设置</span>
            <van-icon name="arrow" class="mr-3"></van-icon>
          </van-col>
        </van-row>
        <van-divider />
        <van-row>
          <van-col span="18">
            <div class="text-left ml-4 fs-xl">城市</div>
          </van-col>
          <van-col span="6">
            <span>去设置</span>
            <van-icon name="arrow" class="mr-3"></van-icon>
          </van-col>
        </van-row>
      </div>
      <div class="bg-white mt-4 p-3 fs-xxl text-danger-1" @click="exit">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingView",
  data() {
    return {
      show: false,
      fileList: [
        {
          url: "https://img1.baidu.com/it/u=1403245892,3051757811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        },
      ],
      model: {
        username: "芝士土豆",
      },
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    async updateUsername() {
      const res = await this.$http.put("/users", this.model);
      console.log(res.data);
      this.model.username = res.data;
    },
    onClickLeft() {
      this.$router.back();
    },
    exit() {
      localStorage.token = "";
      this.$router.push("/");
    },
    async fetchPageUser() {

		},
  },
  created() {

	},
};
</script>

<style>
.nick {
  line-height: 2.5rem;
}
.setting {
  height: 100vh;
  background-color: #f6f6f6;
}
.btn-o {
  border: none;
}
</style>