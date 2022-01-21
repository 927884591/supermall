<template>
  <div class="wrapper" ref="aaa">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Scroll from "better-scroll";
export default {
  name: "Scoll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 1;
      },
    },
    isUpload:{
      type:Boolean,
      default(){
        return false;
      }
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new Scroll(this.$refs.aaa, {
        click: true,
        probeType: this.probeType,
        pullUpLoad:this.isUpload
      });
      console.log(this.scroll);
      this.scroll.on("scroll", (position) => {
        this.$emit("position", position);
        // console.log(position);
      });
      this.scroll.on("pullingUp",()=>{
        // console.log("上拉加载更多");
        console.log(this.isUpload);
        this.$emit("pullingup")
      })
    }, 1000);
  },
  methods: {
    scrollto(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
}
</style>