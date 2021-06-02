<template>
  <div class="recommends" @click="clickInfo()">
        <a href="javascript:">
          <img src="@/assets/img/home/billOne.jpeg" alt="" @load="swiperImageLoad">
        </a>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props:{
    recommends:{
      type:Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    swiperImageLoad(){
      this.$emit('swiperImageLoad')
    },
    clickInfo(){
      this.$router.push('/homevedio')
    }
  }
}
</script>

<style scoped>
.recommends{
  text-align: center;
  font-size: 12px;
}

.recommends img{
  width:100%;
}

</style>
