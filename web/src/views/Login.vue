<template>
  <!-- <div class="login">
			<div>请先登录</div>
      <van-form @submit="login">
        <van-field
          v-model="model.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="model.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
  </div> -->
  <div>
    <div class="login">
      <div class="card">
        <div id="owl" class="owl">
          <div class="eyes"></div>
          <div class="arm-up-right"></div>
          <div class="arm-up-left"></div>
          <div class="arm-down-left"></div>
          <div class="arm-down-right"></div>
        </div>
        <div class="content">
            <div class="item">
              <img class="icon" src="../assets/images/account.png" alt="" />
              <input
                type="text"
                v-model="model.username"
                placeholder="账号"
              />
            </div>
            <div class="item">
              <img class="icon" src="../assets/images/pwd.png" alt="" />
              <input
                type="password"
                placeholder="密码"
                v-model="model.password"
                @focus="onFucus()"
                @blur="onBlur()"
              />
            </div>
            <div class="item" @click="login">
              <button>登陆</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "LoginView",
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("users", this.model);
      localStorage.token = res.data.token;
      this.$router.push("/");
      Toast.success("登录成功");
    },
    onFucus() {
      let owl = document.getElementById("owl");
      owl.classList.add("owl-close");
    },

    onBlur() {
      let owl = document.getElementById("owl");
      owl.classList.remove("owl-close");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 3rem;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.card {
  position: relative;
  padding: 30px;
  width: 400px;
  border-radius: 5px;
  box-shadow: 0 0 6px #dddddd;
}

.content .item {
  display: flex;
  position: relative;
  padding: 10px 0;
}

.content .icon {
  position: absolute;
  left: 8px;
  top: 22px;
  width: 20px;
  height: 20px;
}

.content .code {
  height: 40px;
}

.content input {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  height: 40px;
  outline: 0;
  padding-left: 35px;
  width: 100%;
}

.content input::input-placeholder {
  color: #a8abb2 !important;
}

input::-webkit-input-placeholder {
  color: #a8abb2;
}

input::-moz-placeholder {
  color: #a8abb2;
}

input::-moz-placeholder {
  color: #a8abb2;
}

input::-ms-input-placeholder {
  color: #a8abb2;
}

.content button {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.1s;
  padding: 8px 15px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.content button:hover {
  background-color: rgba(64, 160, 255, 0.7);
}

.content button:active {
  background-color: rgba(64, 160, 255, 0.8);
}

.owl {
  position: absolute;
  top: -82px;
  left: 50%;
  width: 116px;
  height: 92px;
  background-size: 116px 92px;
  margin-left: -64px;
  cursor: pointer;
  background-image: url(../assets/images/face.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.owl .eyes {
  width: 100%;
  height: 100%;
  opacity: 0;
  background-image: url(../assets/images/eye.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transition: 0.1s ease-out 0s;
}

.owl .arm-up-right {
  width: 51px;
  height: 41px;
  position: absolute;
  bottom: 10px;
  right: 5px;
  z-index: 2;
  background-position: 0 25px;
  opacity: 0;
  background-image: url(../assets/images/arm-up-right.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transform: translateX(57px) scale(0.8);
  transform-origin: 0 40px;
  transition: background-position 0.3s ease-out, transform 0.3s ease-out,
    opacity 0s linear 0.2s;
}

.owl .arm-up-left {
  position: absolute;
  bottom: 10px;
  left: -3px;
  width: 52px;
  height: 41px;
  z-index: 2;
  background-position: 0 25px;
  opacity: 0;
  transform: translateX(-34px) scale(0.8);
  transform-origin: 0 40px;
  background-image: url(../assets/images/arm-up-left.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transition: background-position 0.3s ease-out, transform 0.3s ease-out,
    opacity 0s linear 0.2s;
}

.owl .arm-down-left {
  position: absolute;
  bottom: 2px;
  left: -34px;
  width: 43px;
  height: 25px;
  z-index: 1;
  transition: 0.3s ease-out;
  background-image: url(../assets/images/arm-down-left.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.owl .arm-down-right {
  position: absolute;
  bottom: 1px;
  right: -40px;
  width: 43px;
  height: 26px;
  z-index: 1;
  transition: 0.3s ease-out;
  background-image: url(../assets/images/arm-down-right.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.owl-close .eyes {
  opacity: 1;
  transition: 0.1s ease-out 0.2s;
}

.owl-close .arm-up-right {
  background-position: 0 0;
  opacity: 1;
  transform: scale(1);
  transition: background-position 0.3s ease-out, transform 0.3s ease-out;
}

.owl-close .arm-up-left {
  transform: scale(1);
  background-position: 0 0;
  opacity: 1;
  transition: background-position 0.3s ease-out, transform 0.3s ease-out;
}

.owl-close .arm-down-left {
  transform: translateX(40px) scale(0) translateY(-10px);
}

.owl-close .arm-down-right {
  transform: translateX(-32px) scale(0) translateY(-8px);
}
</style>