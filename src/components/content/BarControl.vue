<template>
	<div class="bar-control">
		<div class="bar-control-item" v-for="(item,index) in titles" @click="cindex(index)" >
			<span :class="{active: index === currentIndex}">{{ item }}</span>
		</div>
	</div>
</template>
<script>
export default {
	name: "BarControl",
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        cindex(index){
            this.currentIndex = index
        }
    },
	props: {
		titles:{
            type:Array,
            default(){
                return []
            }
        }
	},
};
</script>
<style>
    .bar-control{
        display: flex;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
    }
    .bar-control-item{
        flex: 1;
    }
    .active{
        color:pink;
        border-bottom: pink solid 2px;
        padding: 5px;
    }
</style>
