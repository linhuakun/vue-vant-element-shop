<template>
  <div id="app">
    <!-- exclude不包括哪几个组件-->
    <keep-alive
      exclude="Detail,CreateMoment,DetailMoment,CommentList,MineOrder,Order,overOrder,sucessOrder,DetailChat"
    >
      <router-view />
    </keep-alive> 
    <MainTabBar  v-if="footShow" />
  </div>
</template>

<script> 
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar
  },
  data() {
    return {
      footShow: false,
    };
  },
  watch: {
    $route(to, from) {
      let ThisPage = to.path;
      if (
        ThisPage === "/home" ||
        ThisPage === "/detail" ||
        ThisPage === "/profile" ||
        ThisPage === "/cart" ||
        ThisPage === "/category" ||
        ThisPage === "/moment"
      ) {
        this.footShow = true;
      } else {
        this.footShow = false;
      }
    }
  },
  mounted() {
    this.$bus.$on('isShowTabbar',data=>{
      this.isShowTabbar(data)
    })
  },
  methods: {
    isShowTabbar(data){
      this.footShow=data;
    }
  },
  created(){
    
  }
};
</script>

<style>
@import "./assets/css/base.css";
@media screen and (max-width: 500px) {
  .el-message {
    min-width: 300px !important;
  }
}
</style>
