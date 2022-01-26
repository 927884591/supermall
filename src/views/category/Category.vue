<template>
  <div id="category">
    <NavBar class="category_nav"><template #center>分类</template></NavBar>
    <div class="main">
      <CategoryLeft ref="left"></CategoryLeft>
      <CategoryRight ref="right" :list_item="rightList"></CategoryRight>
    </div>
  </div>
</template>
<script>
import { getCategoryInfo, getCategory } from "network/category.js";

import CategoryLeft from "./childComps/CategoryLeft.vue";
import CategoryRight from "./childComps/CategoryRight.vue";

import NavBar from "components/common/navbar/NavBar.vue";
export default {
  data() {
    return {
      rightList: null,
    };
  },
  created() {},
  mounted() {
    // console.log(this.$refs.left);
    // console.log(this.$refs.left.$el.style);
  },
  components: {
    NavBar,
    CategoryLeft,
    CategoryRight,
  },
  methods: {
    async getCategoryInfo(maitKey) {
      let res = await getCategoryInfo(maitKey);
      console.log(maitKey);
      if (res) {
        console.log(res);
        this.rightList = res.list;
      }
    },
    async getCategory() {
      let res = await getCategoryInfo();
      console.log(maitKey);
      if (res) {
        this.rightList = res.list;
      }
    },
  },
};
</script>
<style scoped>
.category_nav {
  background-color: var(--color-tint);
  color: white;
}
.main {
  display: flex;
  font-size: 0.6rem;
  height: calc(100vh - 2.09rem - 1.9rem);
}
</style>
