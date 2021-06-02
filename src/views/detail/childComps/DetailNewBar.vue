<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="@/assets/img/home/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles"
           class="title-item"
           :class="{active:index===currentIndex}" 
           :key="index"
           @click="titleClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNewBar",
  components: {
    NavBar
  },
  data(){
    return{
      titles:['商品','评论','详细','提示'],
      currentIndex:0,
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex=index;
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
  display: flex !important;;
  font-size: 13px !important;;
}
.title-item{
  flex:1 !important;;
  z-index: 100 !important;;
}
.active{
  color: #fc5a5a !important;;
}

.back {
  position: relative;
  width: 30px;
  height: 30px;
  left:10px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
