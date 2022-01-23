<template>
  <Swiper class="hy-swiper">
    <SwiperItem v-for="image in topImages">
      <img :src="image" alt="" />
    </SwiperItem>
  </Swiper>
</template>
<script>
import { Swiper, SwiperItem } from "../../../components/common/swiper/index";
export default {
  name: "TopImage",
  props: {
    topImages: {
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
};
</script>
<style scoped>
.hy-swiper {
  height: 300px;
  overflow: hidden;
}
</style>