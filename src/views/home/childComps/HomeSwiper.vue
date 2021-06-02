<template>
  <swiper>
    <swiperItem v-for="item in banners"  :key="item.id" class="swiper">
      <a href="javascript:" >
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiperItem>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper/index"
export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad=true
      }
    }
  }
}
</script>

<style scoped>
.swiper a{
    width: 100%;
}
.swiper a img{
  width: 100%;
  border-bottom-left-radius:4% 8%;
  border-bottom-right-radius:4% 8%;
}
</style>
