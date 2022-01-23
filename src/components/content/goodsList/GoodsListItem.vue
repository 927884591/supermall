<template>
  <div class="goodsitem" @click="toDetail">
    <img :src="goodsListItem.show.img" alt="" @load="itemload" />
    <div class="goods-info">
      <p>{{ goodsListItem.title }}</p>
      <span class="price">{{ goodsListItem.price }}</span>
      <span class="collect">{{ goodsListItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    itemload() {
      this.$bus.$emit("itemload");
    },
    toDetail() {
      this.$router.push("/detail/" + this.goodsListItem.iid);
    },
  },
};
</script>
<style>
</style>