<template>
  <div class="card">
    <div class="card-title d-flex mt-4">
      <div class="flex-1 fs-xl text-left">{{ title }}</div>
      <div>
        <span style="background-color: #f4f4f4"><van-icon :name="icon" /></span>
      </div>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: { title: { type: String }, icon: { type: String } },
  name: "CardView",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card-title {
  padding: 0 1.5rem;
  text-align: left;
}
</style>