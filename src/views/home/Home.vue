<template>
  <div id="home" class="wrapper">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeBanner :banner="banner"></HomeBanner>
    <RecommendView :recommends="recommend"></RecommendView>
    <FeatureView></FeatureView>
    <BarControl
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
    ></BarControl>
    <goods-list :goodslist="goods[currenttab].list"></goods-list>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import FeatureView from "./childComponents/featureView.vue";
import BarControl from "../../components/content/BarControl.vue";
import GoodsList from "../../components/content/goodsList/GoodsList.vue";

import HomeBanner from "./childComponents/HomeBanner.vue";
import RecommendView from "./homeRecommend/RecommendView.vue";
import { getMultidata, getHomeGoods } from "../../network/home.js";
export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      currenttab: "pop",
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
    };
  },
  components: {
    NavBar,
    HomeBanner,
    RecommendView,
    FeatureView,
    BarControl,
    GoodsList,
  },
  created() {
    this.getMultidataM();
    this.getHomeGoodsM("pop");
  },
  computed: {},
  methods: {
    /*
			事件相关的方法
		*/
    tabclick(index) {
      if (index === 0) {
        this.getHomeGoodsM("pop");
        this.currenttab = "pop";
      }
      if (index === 1) {
        this.getHomeGoodsM("new");
        this.currenttab = "new";
      }
      if (index === 2) {
        this.getHomeGoodsM("sell");
        this.currenttab = "sell";
      }
    },
    /*
			请求相关的方法
		*/
    getMultidataM() {
      getMultidata().then((res) => {
          this.banner = res.data.banner.list;
          console.log(this.banner)
          this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoodsM(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        console.log(this.goods[type].list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: pink;
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color: #fff;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
