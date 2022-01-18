<template>
    <div class="banner">
        <Swiper>
            <SwiperItem v-for="item in banner">
                <a :href="item.link">
                    <img :src="item.image" alt="">
                </a>
            </SwiperItem>
        </Swiper>
    </div>
</template>
<script>
import { Swiper, SwiperItem } from '../../../components/common/swiper'
export default {
    name:"HomeBanner",
    props:{
        banner:{
            type:Array,
            default(){
                return []
            }
        },
        recommend:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>
<style>
    .banner{
        margin-top: 44px;
    }
</style>