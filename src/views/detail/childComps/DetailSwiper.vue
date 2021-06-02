<template>
    <swiper class="swiper-item">
      <swiper-item  v-for="(item,index) in topImages" :key="item">
        <img :src="item"  :key="index" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'


export default {
name: "DetailSwiper",
  props:{
  topImages:{
    type:Array,
    default(){
      return []
    }
  }
  },
  components:{
  SwiperItem,
    Swiper,
  },
}
</script>

<style scoped>
.swiper-item{
  height: 350px;
  overflow: hidden;
}
</style>
