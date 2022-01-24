<template>
  <div id="detail">
    <detail-item class="detailtop"></detail-item>
    <Scroll class="content" :isUpload="true" ref="scroll">
      <TopImage v-if="istrue" :topImages="topImages"></TopImage>
      <DetailBaseInfo v-if="goodsInfo" :goods="goodsInfo"></DetailBaseInfo>
      <DetailShopInfo v-if="goodsInfo && shop" :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        v-if="goodsInfo && shop"
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo
        v-if="goodsInfo && shop && paramInfo"
        :paramInfo="paramInfo"
      ></DetailParamInfo>
      <DetailCommentInfo
        :commentInfo="commentInfo"
      ></DetailCommentInfo>
      <GoodsList
        :goodslist="recommendList"
      ></GoodsList>
    </Scroll>
  </div>
</template>
<script>
import DetailItem from "../../components/common/detailitem/DetailItem.vue";
import TopImage from "./topImage/TopImage.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goodsList/GoodsList.vue";
import { getdetail } from "../../network/detail";
import { getRecommend } from "../../network/recommend";
import { GoodInfo, Shop, GoodsParam } from "./goodsInfo";
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
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
    };
  },
  components: {
    DetailItem,
    TopImage,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
  },
  created() {
    this.iid = this.$route.params.iid;
    getdetail(this.iid).then((res) => {
      // console.log(res);
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
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        //因为有的商品没有评论信息，所以这里要做一个判断
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then((res) => {
      this.recommendList = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll && this.$refs.scroll.refresh();
      console.log("----");
    },
    debounce(func, delay) {
      let timeout = null;
      return function (...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemload", () => {
      // this.scroll && this.$refs.scroll.refresh()
      refresh();
    });
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
