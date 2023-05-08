<template>
  <div>
    <van-search
      v-model="keyWords"
      placeholder="请输入搜索关键词"
      shape="round"
    />

    <div>
			<div v-if="isShow" class="pl-4 text-left">您还没有关注的院校/专业请关注</div>
      <router-link tag="div" to="/school-list?from=school">
        <div class="d-flex p-1 findBox">
          <div>
            <img src="../assets/images/find1.png" alt="" />
          </div>
          <div class="ml-4 pl-3">
            <div class="text-left"><h3>找院校</h3></div>
            <div class="text-grey text-left">提供800所院校</div>
          </div>
          <div class="mt-4 pl-4">
            <van-icon name="arrow" class="text-center"></van-icon>
          </div></div
      ></router-link>
      <router-link tag="div" to="">
        <div class="d-flex p-1 findBox1">
          <div>
            <img src="../assets/images/find2.png" alt="" />
          </div>
          <div class="ml-4 pl-3">
            <div class="text-left"><h3>找专业</h3></div>
            <div class="text-grey">提供2000+专业</div>
          </div>
          <div class="mt-4 pl-4">
            <van-icon name="arrow" class="text-center"></van-icon>
          </div>
        </div>
      </router-link>
    </div>
    <!-- <div class="tools p-4">
      <div class="text-left"><h3>择校工具</h3></div>
			<div class="d-flex">
				<div>
				<img src="../assets/images/tool1.png" class="w-100" alt="">
			</div>
			<div class="ml-2">
				<div>
					<img src="../assets/images/tool2.png" class="w-100" alt="">
				</div>
				<div class="mt-2">
					<img src="../assets/images/tool3.png" class="w-100" alt="">
				</div>
			</div>
			</div>
    </div> -->
    <m-tabbar activeName="home"></m-tabbar>
  </div>
</template>

<script>
export default {
  name: "SchoolView",
  data() {
    return {
      keyWords: "",
			isShow : true
    };
  },
};
</script>

<style>
.findBox {
  margin: 1rem 1.5rem;
  /* border: 2px solid #dce2ed; */
  background-color: #f7faff;
}
.findBox1 {
  margin: 1rem 1.5rem;
  background-color: #f7f8fc;
}
</style>