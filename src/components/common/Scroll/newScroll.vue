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
        pullUpLoad: this.pullUpLoad
      });
      this.scroll.on("scroll", position => {
        this.$emit("scrollw", position);
      });

      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });

      this.scroll.scrollTo(0, 0);
    });
  },
  updated() {},
  methods: {
    scrollTo(x, y, timer = 3000) {
      this.scroll && this.scroll.scrollTo(x, y, timer);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
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
