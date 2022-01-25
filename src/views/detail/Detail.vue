<template>
  <div id="detail">
    <detail-item ref="nav" @isIndex="isIndex" class="detailtop"></detail-item>
    <Scroll
      :probeType="3"
      class="content"
      :isUpload="true"
      ref="scroll"
      @position="position"
    >
      <TopImage ref="topimg" v-if="istrue" :topImages="topImages"></TopImage>
      <DetailBaseInfo v-if="goodsInfo" :goods="goodsInfo"></DetailBaseInfo>
      <DetailShopInfo v-if="goodsInfo && shop" :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        v-if="goodsInfo"
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo
        ref="commend"
        :commentInfo="commentInfo"
      ></DetailCommentInfo>
      <GoodsList ref="list" :goodslist="recommendList"></GoodsList>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
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
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
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
      //tabcontrol的位置信息初始化
      topimg: 0,
      params: 0,
      commend: 0,
      list: 0,
      navIndex: 0,
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
    DetailBottomBar,
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
      console.log("----");
      this.$refs.scroll && this.$refs.scroll.refresh();
      //给tabcontrol位置赋值
      this.topimg = this.$refs.topimg.$el.offsetTop;
      this.params = this.$refs.params.$el.offsetTop;
      this.commend = this.$refs.commend.$el.offsetTop;
      this.list = this.$refs.list.$el.offsetTop;
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
    //监听tabcontrol的下标
    isIndex(index) {
      switch (index) {
        case 0:
          this.navIndex = index;
          this.$refs.scroll.scrollto(0, -this.topimg);
          break;
        case 1:
          this.navIndex = index;
          this.$refs.scroll.scrollto(0, -this.params);
          break;
        case 2:
          this.navIndex = index;
          this.$refs.scroll.scrollto(0, -this.commend);
          break;
        case 3:
          this.navIndex = index;
          this.$refs.scroll.scrollto(0, -this.list);
          break;
        default:
          break;
      }
    },
    position(position) {
      if (-position.y == this.topimg) {
        this.$refs.nav.currentIndex = this.navIndex = 0;
      }
      if (-position.y >= this.params && -position.y < this.commend) {
        this.$refs.nav.currentIndex = this.navIndex = 1;
      }
      if (-position.y > this.commend && -position.y < this.list) {
        this.$refs.nav.currentIndex = this.navIndex = 2;
      }
      if (-position.y > this.list && -position.y < Number.MAX_VALUE) {
        this.$refs.nav.currentIndex = this.navIndex = 3;
      }
      // if (position.y > this.list) {
      //   this.$refs.nav.currentIndex = this.navIndex = 4;
      // }

      // console.log(position);
      // this.isbacktop = -position.y > 1000;
      // this.isFixed = -position.y > this.tabTop;
    },
    //该商品加入到购物车中
    addToCart() {
      // console.log(this.$router);
    },
  },

  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemload", () => {
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
