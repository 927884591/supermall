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
      });
      console.log(this.scroll);
      this.scroll.on("scroll", (position) => {
        this.$emit("position", position);
        // console.log(position);
      });
    }, 1000);
  },
  methods: {
    scrollto(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
}
</style>