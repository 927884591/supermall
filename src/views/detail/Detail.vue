<template>
  <div>
    <detail-item></detail-item>
    <TopImage v-if="istrue" :topImages="topImages"></TopImage>
  </div>
</template>
<script>
import DetailItem from "../../components/common/detailitem/DetailItem.vue";
import { getdetail } from "../../network/detail";
import { GoodInfo } from "./goodsInfo";
import TopImage from "./topImage/TopImage.vue";
export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      goodsInfo: null,
      topImages: [],
      istrue: false,
    };
  },
  components: { DetailItem, TopImage },
  created() {
    this.iid = this.$route.params.iid;
    getdetail(this.iid).then((res) => {
      console.log(res);
      let data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goodsInfo = new GoodInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      console.log(this.goodsInfo);
      this.istrue = true;
    });
  },
};
</script>
<style scoped>
</style>
