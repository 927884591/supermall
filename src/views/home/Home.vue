<template>
  <div id="home" class="wrapper">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <HomeBanner :banner="banner" :recommend="recommend"></HomeBanner>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import HomeBanner from "./childComponents/HomeBanner.vue"
import {getMultidata} from "../../network/home.js"
export default {
  name: "Home",
  data(){
    return{
      banner:[],
      recommend:[]
    }
  },
  components: {
    NavBar,
    HomeBanner
  },
  created(){
    getMultidata().then(res =>{
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  }
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
