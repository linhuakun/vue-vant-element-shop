<template>
  <div class="home">
    <NavBar class="nav-bar">
      <div slot="left" @click="chat" class="chat">
        <img src="@/assets/img/home/chat.svg" alt="">
      </div>
      <div slot="center">交 酒</div>
      <div slot="right" @click="scan" class="scan">
        <img src="@/assets/img/home/scan.svg" alt="">
      </div>
      </NavBar>
    <TabControl
      :titles="['白酒', '红酒', '洋酒']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></TabControl>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @pullingDown="pullingDown"
      @scrollw="contentScoll"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <HomefeatureView @swiperImageLoad="swiperImageLoad"></HomefeatureView>
      <home-recommend-view
        @swiperImageLoad="swiperImageLoad"
      ></home-recommend-view>
      <TabControl
        :titles="['白酒', '红酒', '洋酒']"
        @tabClick="tabClick"
        ref="tabControl2"
        class="tab-control"
      ></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import scroll from "@/components/common/Scroll/newScroll";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import GoodsListItem from "@/components/content/goods/GoodsListItem";
import backTop from "@/components/content/backTop/backTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomefeatureView from "./childComps/HomefeatureView";

import { getHomeGoods } from "@/network/home";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";
import { Bannersdata } from "@/common/localdata.js";


export default {
  name: "Home",
  components: {
    NavBar,
    scroll,
    TabControl,
    GoodsList,
    GoodsListItem,
    backTop,

    HomeSwiper,
    HomeRecommendView,
    HomefeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // result:null
      pullingdown: false
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  //组件加载完运行，生命周期函数Dom
  created() {
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    this.banners = Bannersdata.list;
  },
  mounted() {
  },
  methods: {
    chat(){
      this.$router.push('/detailchat');
      this.$bus.$emit('isenter')
    },
    scan(){
      this.$router.push('/scan');
    },
    //商品的加载更多
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //三种类型的切换
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //上拉加载更多
    loadMore() {
      // this.getHomeGoods(this.currentType)
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
      this.$refs.scroll.refresh();
    },
    //轮播图的切换
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      this.$refs.scroll.refresh();
    },
    pullingDown() {
      this.pullingdown = true;
      setTimeout(() => {
        this.pullingdown = false;
        this.$refs.scroll.finishPullDown();
      }, 1000);
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
    //切换板块时，回来保存当前的位置
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    //判断当前哪个图片加载监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
.home {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: #df3832;
  color: #fff;
  /*font-weight: 700;*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top:0;*/
  /*z-index: 9;*/
}
.content {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 44px;
  overflow: hidden;
  position: absolute;
}
/*.content{*/
/*  height:calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
.tab-control {
  position: relative;
  z-index: 24;
}
.pulldown {
  color: black;
  text-align: center;
  top: 30px;
  z-index: 100;
  font-size: 10px;
  color: rgb(150, 138, 138);
}
.scan{
  position: relative;
  top:8px;
}
.chat{
  position: relative;
  top:8px;
}
</style>
