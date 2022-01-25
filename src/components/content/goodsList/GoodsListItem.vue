<template>
  <div class="goodsitem" @click="toDetail">
    <img :src="isShow" alt="" @load="itemload" />
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
  computed: {
    isShow() {
      return this.goodsListItem.image || this.goodsListItem.show.img;
    },
  },
  methods: {
    itemload() {
      this.$bus.$emit("itemload");
    },
    toDetail() {
      if (this.goodsListItem.iid) {
        this.$router.push("/detail/" + this.goodsListItem.iid);
      } else {
        this.$router.push("/detail/" + this.goodsListItem.item_id);
      }
    },
  },
};
</script>
<style>
</style>