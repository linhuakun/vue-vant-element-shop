<template>
  <div class="home" v-if="loginexit">
    <NavBar class="nav-bar">
      <img img="~assets/img/moment/bear.svg" />
      <div slot="left">
        <img src="~assets/img/moment/bear.svg" width="40px" height="40px" />
      </div>
      <div slot="center">酒友乡</div>
      <!-- 发表动态 -->
      <div slot="right" @click="createmoment"><i class="el-icon-plus"></i></div>
    </NavBar>
    <Scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      :probe-type="3"
      @pullingUp="loadMore"
      @pullingDown="pullingDown"
    >
      <!-- 下拉显示 -->
      <div class="pulldown" v-show="pullingdown">
        <img src="~assets/img/moment/refresh.svg" width="30px" height="30px" />
      </div>
      <!-- 多条动态拆分-->
      <MomentList v-if="refreshmoment" :moments="moments"></MomentList>
      <!-- 上拉显示 -->
      <div class="pullUp" v-show="pullingUp"><span>Loading...</span></div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll/Scroll";
import NavBar from "@/components/common/navbar/NavBar";
import MomentList from "@/components/content/moments/MomentList";
//debounce防抖使页面重新计算高度
import { debounce } from "@/common/utils";
import { getMomentList } from "@/network/moment";

export default {
  name: "Moment",
  components: {
    Scroll,
    NavBar,
    MomentList
  },
  data() {
    return {
      moments: [],
      size: 10,
      offset: 0,
      pullingdown: false,
      refreshmoment: true,
      pullingUp: false,
      loginexit: true
    };
  },
  created() {
    this.getMoment();
  },
  methods: {
    isallrefreshInfo() {
      this.loginexit=false;
      var oallself=this
      setTimeout(async function() {
        oallself.loginexit = true;
      }, 300);
    },
    //进入发表动态
    createmoment() {
      this.$router.push("/createmoment");
    },
    //获取动态内容
    getMoment() {
      getMomentList(this.offset, this.size).then(res => {
        this.moments.push(...res.data);
        this.offset += 10;
      });
    },
    //重新获取动态
    ReMoment() {
      getMomentList(0, 10).then(res => {
        this.moments = res.data;
      });
    },
    //上拉加载更多
    loadMore() {
      this.pullingUp = true;
      this.offset = 10;
      this.getMoment();
      setTimeout(() => {
        this.pullingUp = false;
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      }, 1000);
    },
    //下拉加载更多，通过重新获取数据以及销毁重建组件来实现刷新，延时实现动态加载
    pullingDown() {
      this.pullingdown = true;
      this.offset;
      this.ReMoment();
      this.refreshmoment = false;
      this.refreshmoment = true;
      setTimeout(() => {
        this.pullingdown = false;
        this.$refs.scroll.finishPullDown();
      }, 1000);
    }
  },
  mounted() {
    //图像加载出来，重新计算页面高度
    const refresh = debounce(this.$refs.scroll.refresh, 300);
    this.uploadavatar = () => {
      refresh();
    };
    this.refreshmoment = () => {
      this.ReMoment();
      this.refreshmoment = false;
      this.refreshmoment = true;
    };
    this.$bus.$on("upload", this.uploadavatar);
    this.$bus.$on("createmoment", this.refreshmoment);
    this.$bus.$on("isallrefreshInfo", this.isallrefreshInfo);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: #df3832;
  font-weight: 500px;
  color: #fff;
}
.home {
  height: 100vh;
  position: relative;
  background-color: rgba(212, 212, 212, 0.329);
}
.content {
  left: 0;
  right: 0;
  top: 39px;
  bottom: 49px;
  overflow: hidden;
  position: absolute;
}
.pulldown {
  text-align: center;
  top: 15px;
  z-index: 20;
}
.pullUp {
  text-align: center;
  bottom: 50px;
  z-index: 20;
}
</style>
