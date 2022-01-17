<template>
  <div class="home-nav">
    <div class="right">
      <slot name="right"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="left">
      <slot name="left"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
};
</script>
<style>
.home-nav {
  height: 44px;
  line-height: 44px;
  display: flex;
}
.right {
  width: 60px;
}
.left {
  width: 60px;
}
.center {
  flex: 1;
}
</style>