<template >
  <div class="goodslist">
    <goods-list-item
      v-for="item in goodslist"
      :goodsListItem="item"
    ></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem.vue";
import BScroll from 'better-scroll';
export default {
  name: "GoodsList",
  props: {
    goodslist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>
<style>
.goodslist {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 60px;
  justify-content: space-evenly;
}
.goodsitem {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goodsitem img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5p×;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: red;
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}
.goods-info .collect:before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 00/14px 14px;
}
</style>