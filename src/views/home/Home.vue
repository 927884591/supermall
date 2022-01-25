<template>
  <div id="home" class="wrapper">
    <div>
      <nav-bar>
        <div slot="center">购物街</div>
      </nav-bar>
      <BarControl
        class="tab-control"
        :class="{ fixed: 'isFixed' }"
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        v-show="isFixed"
        ref="barcontrole"
      ></BarControl>
      <Scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        @position="position"
        @pullingup="loadmore"
        :is-upload="true"
      >
        <HomeBanner
          :banner="banner"
          @imageload="imageload"
          ref="homeBanner"
        ></HomeBanner>
        <RecommendView :recommends="recommend"></RecommendView>
        <FeatureView></FeatureView>
        <BarControl
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabclick="tabclick"
          ref="barcontrol"
        ></BarControl>
        <goods-list :goodslist="goods[currenttab].list"></goods-list>
      </Scroll>
      <BackTop @click.native="backtop" v-show="isbacktop"></BackTop>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";
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
      isbacktop: false,
      isFixed: false,
      tabTop: 0,
    };
  },
  components: {
    NavBar,
    HomeBanner,
    RecommendView,
    FeatureView,
    BarControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    this.getMultidataM();
    this.getHomeGoodsM("pop");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemload", () => {
      // this.scroll && this.$refs.scroll.refresh()
      refresh();
    });
  },
  computed: {},
  methods: {
    // 防抖函数scrollto
    debounce(func, delay) {
      let timeout = null;
      return function (...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
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
      this.$refs.barcontrole.$data.currentIndex = index;
      this.$refs.barcontrol.$data.currentIndex = index;
      console.log(this.$refs.barcontrole.$data.currentIndex);
    },
    backtop() {
      this.$refs.scroll.scrollto(0, 0);
    },
    position(position) {
      // console.log(position);
      this.isbacktop = -position.y > 1000;
      this.isFixed = -position.y > this.tabTop;
    },
    loadmore() {
      this.getHomeGoodsM(this.currenttab);
      this.$refs.scroll.finishPullUp();
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
    // banner图片加载完成触发事件
    imageload() {
      this.tabTop = this.$refs.barcontrol.$el.offsetTop;
      console.log(this.tabTop);
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
    /*
			请求相关的方法
		*/
    getMultidataM() {
      getMultidata().then((res) => {
        this.banner = res.data.banner.list;
        console.log(this.banner);
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
  /* position: sticky; */
  /* top: 44px; */
  z-index: 9;
  background-color: #fff;
}

.content {
  overflow: hidden;
  position: relative;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fixed {
  position: relative;
  left: 0;
  top: 44px;
  z-index: 20;
}
</style>
