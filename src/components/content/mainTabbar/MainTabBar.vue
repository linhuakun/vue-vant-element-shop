<template>
  <tab-bar class="tab-bar">
    <tab-bar-item path="/home" activeColor="red">
      <img slot="item-icon"    src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active"    src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="red">
      <img slot="item-icon"    src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active"    src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item >
    <tab-bar-item path="/moment" activeColor="red" >
      <img slot="item-icon"   id="center"   src="~assets/img/tabbar/hub.svg" alt="">
      <img slot="item-icon-active"  id="center"   src="~assets/img/tabbar/active_hub.svg" alt="">
      <div slot="item-text" id="center-text">酒乡</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="red">
      <img slot="item-icon"    src="~assets/img/tabbar/cart.svg" alt="">
      <img slot="item-icon-active"    src="~assets/img/tabbar/cart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="red">
      <img slot="item-icon"    src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active"    src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";


export default {

name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  },
}
</script>

<style scoped>
#center {
  height: 38px;
  width: 38px;
  position: relative;
  bottom: 7px;
}
.tab-bar{
  position: absolute;
  bottom: 0;
}
#center-text{
  bottom:14px;
  position: relative;
}
</style>
