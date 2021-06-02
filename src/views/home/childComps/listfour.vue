<template>
  <div class="HomeVedio">
    <NavBar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <div slot="center">啤酒宣传</div>
    </NavBar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @pullingDown="pullingDown"
    >
      <div>
        <videoPlayer
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></videoPlayer>
        <div class="list">
          <img
            src="@/assets/img/advpicture/10.jpeg"
            alt=""
            @load="computerheight"
          />
        </div>
        <div class="recTitle">
          <div class="line"></div>
          <div class="title">精品推荐</div>
        </div>
        <van-swipe-cell>
          <van-card
            price="98.00"
            desc="精品推荐，值得一尝"
            title="法国詹姆斯公爵精选干红葡萄酒750ml（12瓶）+酒具大礼包"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list10.jpeg"
            @click="itemClick(10)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="288.00"
            desc="精品推荐，值得一尝"
            title="澳洲整箱红酒澳大利亚奔富洛神山庄赤霞珠红葡萄酒750ml（6瓶装）"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list2.jpeg"
            @click="itemClick(2)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="69.00"
            desc="精品推荐，值得一尝"
            title="39°孔府家孔孟洞藏先师酒500ml"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list1.jpeg"
            @click="itemClick(1)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="499.00"
            desc="精品推荐，值得一尝"
            title="法国菲利普罗斯柴尔德男爵波尔多红葡萄酒750ml（6瓶装）"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list8.jpeg"
            @click="itemClick(8)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="219.00"
            desc="精品推荐，值得一尝"
            title="洋河大曲 42度 整箱装 375ml*6瓶（内含3个礼袋）口感绵柔浓香型白酒"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list4.jpeg"
            @click="itemClick(4)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="108.00"
            desc="精品推荐，值得一尝"
            title="40°法国马爹利名士干邑白兰地700ml"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list6.jpeg"
            @click="itemClick(6)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="119.00"
            desc="精品推荐，值得一尝"
            title="53度贵州迎宾酒豪华版500ml（6瓶"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list3.jpeg"
            @click="itemClick(3)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="139.00"
            desc="精品推荐，值得一尝"
            title="法国詹姆斯公爵精选干红葡萄酒750ml（12瓶）+酒具大礼包"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list5.jpeg"
            @click="itemClick(5)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="419.00"
            desc="精品推荐，值得一尝"
            title="【限量供应】53°郑酒师大师手作 酱香型白酒 贵州茅台镇 固态纯粮 单坛装2500ml"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list9.jpeg"
            @click="itemClick(9)"
          />
        </van-swipe-cell>
        <van-swipe-cell>
          <van-card
            price="369.00"
            desc="精品推荐，值得一尝"
            title="52°水井坊·（三国义勇仁）井台简装版500ml"
            class="goods-card"
            thumb="http://47.108.153.30:7878/shop/list7.jpeg"
            @click="itemClick(7)"
          />
        </van-swipe-cell>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import scroll from "@/components/common/Scroll/Scroll";

export default {
  name: "HomeVedioView",
  components: {
    NavBar,
    videoPlayer,
    scroll
  },
  methods: {
    backClick() {
      this.$router.push("/home");
    },
    itemClick(index) {
      this.$router.push("/detail/" + index);
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
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "http://47.108.153.30:7878/vedio/vedio.mp4"
          }
        ],
        poster: "@/assets/img/cart/logo.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
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

.list {
  margin-top: 5px;
  width: 100%;
  height: 237.53px;
  font-size: 0;
}

.list img {
  width: 100%;
}

.recTitle {
  width: 100%;
  height: 40px;
  position: relative;
}
.recTitle .line {
  height: 20px;
  border-bottom: 1px solid #a2a2a2;
}
.recTitle .title {
  width: 100px;
  height: 40px;
  background: #ffffff;
  position: absolute;
  top: 0;
  left: 50%;
  line-height: 40px;
  margin: 0 0 0 -50px;
  text-align: center;
  color: #3a3a3a;
  font-family: "黑体";
  font-size: 18px;
}

.content {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0px;
  overflow: hidden;
  position: absolute;
}
.imglist {
  width: 100%;
}
.imglist img {
  width: 100%;
}
.goods-card {
  margin-top: 20px;
}
</style>
