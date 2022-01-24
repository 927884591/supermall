<template>
  <div id="detail">
    <detail-item class="detailtop" @isload="isload"></detail-item>
    <Scroll
      class="content"
      :isUpload="true"
      ref="scroll"
      v-if="goodsInfo && topImages && shop && detailInfo"
    >
      <TopImage v-if="istrue" :topImages="topImages"></TopImage>
      <DetailBaseInfo v-if="goodsInfo" :goods="goodsInfo"></DetailBaseInfo>
      <DetailShopInfo v-if="shop" :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
    </Scroll>
  </div>
</template>
<script>
import DetailItem from "../../components/common/detailitem/DetailItem.vue";
import TopImage from "./topImage/TopImage.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import { getdetail } from "../../network/detail";
import { GoodInfo, Shop } from "./goodsInfo";
import Scroll from "../../components/common/scroll/Scroll.vue";

export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      goodsInfo: null,
      topImages: [],
      istrue: false,
      shop: null,
      detailInfo: null,
      isloade: false,
    };
  },
  components: {
    DetailItem,
    TopImage,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
  },
  created() {
    this.iid = this.$route.params.iid;
    getdetail(this.iid).then((res) => {
      console.log(res);
      let data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goodsInfo = new GoodInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      console.log(this.goodsInfo);
      this.istrue = true;
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
    });
  },
  methods: {
    isload() {
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
    imageLoad() {
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}
.detailtop {
  position: relative;
  background-color: #fff;
  top: 0;
  left: 0;
  z-index: 12;
}
.content {
  height: calc(100% - 44px);
  z-index: 11;
  position: relative;
}
</style>
