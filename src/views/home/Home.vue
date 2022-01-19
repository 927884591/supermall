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
		></BarControl>
	</div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import FeatureView from "./childComponents/featureView.vue";
import BarControl from "../../components/content/BarControl.vue";

import HomeBanner from "./childComponents/HomeBanner.vue";
import RecommendView from "./homeRecommend/RecommendView.vue";
import { getMultidata,getHomeGoods } from "../../network/home.js";
export default {
	name: "Home",
	data() {
		return {
			banner: [],
			recommend: [],
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
	},
	created() {
		this.getMultidataM()
    this.getHomeGoodsM('pop')
	},
  methods: {
    getMultidataM(){
      getMultidata().then((res) => {
			this.banner = res.data.banner.list;
			this.recommend = res.data.recommend.list;
		});
    },
    getHomeGoodsM(type){
      getHomeGoods(type,1).then(res => {
        console.log(res)
      })
    }
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
