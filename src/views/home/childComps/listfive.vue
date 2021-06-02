<template>
  <div class="HomeVedio">
    <NavBar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <div slot="center">佳酿宣传</div>
    </NavBar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @pullingDown="pullingDown"
    >
      <div class="list">
        <img src="@/assets/img/advpicture/21.png" alt="" />
        <img src="@/assets/img/advpicture/22.png" alt="" />
        <img src="@/assets/img/advpicture/23.png" alt="" />
        <img src="@/assets/img/advpicture/24.png" alt="" />
        <img src="@/assets/img/advpicture/25.png" alt="" />
        <img src="@/assets/img/advpicture/13.jpeg" alt="" />
        <img src="@/assets/img/advpicture/15.jpeg" alt="" />
        <img src="@/assets/img/advpicture/14.jpeg" alt="" />
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import scroll from "@/components/common/Scroll/Scroll";

export default {
  name: "HomeVedioView",
  components: {
    NavBar,
    scroll
  },
  methods: {
    backClick() {
      this.$router.push("/home");
    },
    loadMore() {
      this.$refs.scroll.refresh();
    },
    pullingDown() {
      this.pullingdown = true;
      setTimeout(() => {
        this.pullingdown = false;
        this.$refs.scroll.finishPullDown();
      }, 0);
    },
    computerheight() {
      this.$refs.scroll.refresh();
    }
  },
  data() {
    return {};
  },
  mounted() {},
  created() {
    //  const obutton = document.querySelector(".video-js .vjs-big-play-button");
    //  console.log(obutton);
    //   obutton.style.top = "50%";
    //   obutton.style.left = "50%";
    //   obutton.style.transform = "translate(-50%,-50%)";
  }
};
</script>

<style scoped>
.video-player >>> .vjs-big-play-button{
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  
}
.HomeVedio {
  height: 100vh;
}

.back {
  position: relative;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
}

.back img {
  color: #fff;
}

.nav-bar {
  color: #fff;
  background-color: #df3832;
}

.content {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0px;
  overflow: hidden;
  position: absolute;
}
.list {
  font-size: 0;
}
.list img {
  width: 100%;
}
</style>
