<template>
  <div>
    <img src="../../../assets/img/common/top.png" alt="" class="backtop" />
  </div>
</template>
<script>
export default {
  name: "BackTop",
};
</script>
<style scoped>
.backtop {
  position: fixed;
  z-index: 10;
  width: 50px;
  height: 50px;
  bottom: 55px;
  right: 10px;
}
</style>