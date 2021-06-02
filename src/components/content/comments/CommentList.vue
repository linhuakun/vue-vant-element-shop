<template>
  <div class="comment-list">
    <CommentListItem
      class="comment-list-item"
      v-for="(item, index) in newcomments"
      :key="index"
      :comments="item"
      :Author="Author"
    ></CommentListItem>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll/Scroll";
import CommentListItem from "@/components/content/comments/CommentListItem";

export default {
  name: "CommentList",
  components: {
    CommentListItem,
    Scroll
  },
  data() {
    return {
      pullingdown: false
    };
  },
  props: {
    newcomments: {
      type: Array,
      defalut() {
        return [];
      }
    },
    Author: {
      type: Object,
      defalut() {
        return {};
      }
    }
  },
  created() {
    window.localStorage.setItem("ispraise", "1");
  },
  methods: {
    loadMore() {
      this.$refs.scroll.refresh();
    },
    pullingDown() {
      this.pullingdown = true;
      setTimeout(() => {
        this.pullingdown = false;
        this.$refs.scroll.finishPullDown();
      }, 1000);
    }
  }
};
</script>

<style scoped>
.comment-list{
  margin-top:10px ;
}
.comment-list-item {
  margin-top: 5px;
}
</style>
