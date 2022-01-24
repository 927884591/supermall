<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="goBack">
        <img src="../../../assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="item"
          :class="{ activeDetail: currentIndex === index }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "../navbar/NavBar.vue";
export default {
  name: "DetailItem",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      isActive: false,
      currentIndex: 0,
      isload: true,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    titleClick(index) {
      this.currentIndex = index;
    },
    imgload(isload) {
      this.$emit("isload");
      isload = false;
    },
  },
};
</script>
<style scoped>
.left {
  margin-top: 5px;
}
.center {
  display: flex;
  font-size: 14px;
}
.item {
  flex: 1;
}
.activeDetail {
  color: pink;
}
</style>