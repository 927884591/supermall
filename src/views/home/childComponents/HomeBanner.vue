<template>
  <div class="banner">
    <Swiper>
      <SwiperItem v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "../../../components/common/swiper";
export default {
  name: "HomeBanner",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("imageload");
        this.isLoad = true;
      }
    },
  },
};
</script>
<style>
.banner {
  margin-top: 44px;
}
</style>
