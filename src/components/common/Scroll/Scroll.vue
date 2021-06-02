<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: {
          threshold: 80,
          stop: 80
        },
        useTransition: false,
        pullDownRefresh: {
          threshold: 40,
          stop: 30
        },
        disableMouse: false,
        disableTouch: false
      });

      this.scroll.on("scroll", position => {
        this.$emit("scrollw", position);
      });

      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });

      this.scroll.on("pullingDown", () => {
        this.$emit("pullingDown");
      });

      this.scroll.scrollTo(0, 0);
    });
  },
  methods: {
    scrollTo(x, y, timer = 3000) {
      this.scroll && this.scroll.scrollTo(x, y, timer);
    },
    finishPullUp() {
      this.refresh();
      this.scroll && this.scroll.finishPullUp();
    },
    finishPullDown() {
      this.refresh();
      this.scroll && this.scroll.finishPullDown();
    },

    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped></style>
