<template>
  <div class="comment-list-item" @click="createcomment">
    <span class="main">{{ comments.user.name }}</span
    >回复<span>{{ this.name }}</span
    >:{{ comments.content }}
  </div>
</template>

<script>
export default {
  name: "CommentListItem",
  props: {
    comments: {
      type: Object,
      default() {
        return {};
      }
    },
    Author: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      name: "",
      token: ""
    };
  },
  created() {
    this.getName();
  },
  methods: {
    createcomment() {
      this.token = window.localStorage.getItem("token");
      if (this.token) {
        this.$bus.$emit("commentId", this.comments.id);
        this.$bus.$emit("comment");
      }else{
        this.$router.push('/login')
      }
    },
    async getName() {
      const { data: res } = await this.$http.get(
        "/comment/" + this.comments.comment_id
      );
      this.name = res.user && res.user.name;
      if (this.name == undefined) {
        this.name = this.Author.name;
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
div span {
  color: yellowgreen;
  font-size: 13px;
}

.main {
  color: #f53b57;
  font-size: 13px;
}

.comment-list-item {
  font-size: 13px;
}
</style>
