<template>
<div class="mineorder">
    <NavBar class="nav-bar">
        <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="">
        </div> 
        <div slot="center">完成订单</div>
    </NavBar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @pullingDown="pullingDown"
    >
    <OrderMineList :list=list></OrderMineList>
    </scroll>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/Scroll/Scroll";
import OrderMineList from "@/components/content/overOrder/overOrderList"
import {getOrder} from "@/network/profile.js"
export default {
    name:"overOrder",
    data(){
        return {
            list:[],
            token:''
        }
    },
    components:{
        NavBar,
        Scroll,
        OrderMineList,
    },
    methods:{
        backClick(){
            this.$router.push('/profile')
        },
            loadMore(){
      // this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
    },
      pullingDown() {
      this.pullingdown = true;
      setTimeout(() => {
        this.pullingdown = false;
        this.$refs.scroll.finishPullDown();
      }, 0)
    },
    },
    async created(){
    this.token = window.localStorage.getItem("token");
    if(!this.token){
        this.$router.push('/login')
     }else{
        const res = await getOrder()
        this.list=res.data
     }
    }
}
</script>

<style scoped>

.nav-bar{
  background-color:#df3832;
  color: #fff;
  height: 44px;
}
.back {
  position: relative;
  width: 30px;
  height: 30px;
  left:10px;
  top: 50%;
  transform: translate(0, -50%);
}
.content {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0px;
  overflow: hidden;
  position: absolute;
}
</style>