<template>
  <div class="moment">
    <Scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      :probe-type="3"
      @pullingUp="loadMore"
      @pullingDown="pullingDown"
    >
      <!-- 基本内容 -->
      <div class="top">
        <img :src="comments.author && comments.author.avatarUrl" />
        <div class="desc">
          <div class="name">{{ comments.author && comments.author.name }}</div>
          <div class="time">
            {{ this.$moment(comments.createTime).fromNow() }}
          </div>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="maincontent">{{ comments.content }}</div>
      <!-- 图片区域 -->
      <div>
        <div class="image">
          <li
            v-for="(item, index) in comments.images"
            :key="index"
            class="picture"
          >
            <img
              width="100px"
              height="100px"
              :preview="index"
              :src="item + '?type=small'"
            />
            <!-- v-lazy="item+'?type=small'" -->
          </li>
        </div>
      </div>
      <!-- 小图标区域 -->
      <icon
        class="icon"
        :comments="comments"
        :praise="this.praise"
        @clickpraise="clickpraise"
        @Popup="Popup"
        v-if="this.isdisplay"
      ></icon>
      <!-- 点赞 -->
      <PraiseList
        class="praise"
        :praises="this.praise.praise"
        v-if="this.showpraise"
      >
      </PraiseList>

      <!-- 评论 -->
      <CommentList
        class="commentsarea"
        :newcomments="this.allcomment"
        :Author="comments.author"
      ></CommentList>

      <!-- 发表评论 -->
    </Scroll>
    <!-- show是否要显示评论 -->
    <van-popup v-model="show" class="showcomment" position="bottom">
      <van-field
        ref="gain"
        class="inputcomment"
        v-model="comment.content"
        rows="1"
        autosize
        placeholder="输入你想表达～"
        show-word-limit
        type="textarea"
        size="large"
        v-focus
      />
      <span className="postcomment" round type="info" @click="createcomment"
        >发送</span
      >
    </van-popup>
  </div>
</template>

<script>
import icon from "@/views/moment/childComps/icon";
import CommentList from "@/components/content/comments/CommentList";
import PraiseList from "@/components/content/praises/PraiseList";
import { getAllCommnet } from "@/network/comment";
import Scroll from "@/components/common/Scroll/Scroll";
export default {
  name: "ChildDetailMoment",
  components: {
    CommentList,
    PraiseList,
    icon,
    Scroll
  },
  props: {
    comments: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      id: "",
      show: false,
      isResize: false,
      isshow: true,
      comment: {
        content: "",
        momentId: ""
      },
      iscomment: true,
      allcomment: [],
      praise: {},
      ispraise: "",
      number: "",
      isdisplay: true,
      clientHeight: document.documentElement.clientHeight,
      showpraise:true,
    };
  },
  created() {
    this.momentId = this.$route.params.iid;
    getAllCommnet(this.momentId).then(res => {
      this.allcomment = res.data;
    });
    this.getdata();
  },
  //局部组成聚焦
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
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
      }, 300);
    },
    async getdata() {
      const { data: res } = await this.$http.get("/praise/" + this.momentId);
      this.praise = res;
    },
    //是否显示评论和聚焦效果拉键盘
    Popup() {
      this.show = !this.show;
      //延迟聚焦
      var ofoucs = this;
      this.$nextTick(() => {
        ofoucs.$refs.gain.focus();
      }, 300);
    },
    refresh() {
      this.showpraise = false;
      this.isdisplay = false;
      var othis = this;
      this.$nextTick(async() => {
        const { data: res } = await othis.$http.get("/praise/" + this.momentId);
        othis.praise = res;
        othis.isdisplay = true;
        othis.showpraise = true;
      }, 100);
    },
    //发表成功评论
    async createcomment() {
      this.comment.momentId = this.comments.id;
      if (this.iscomment) {
        const { data: res } = await this.$http.post("comment", this.comment);
        if (res.insertId != 0) {
          this.$emit("refresh");
          this.$message.success("评论成功");
        }
      } else {
        const { data: res } = await this.$http.post(
          "comment/" + this.commentId + "/reply",
          this.comment
        );
        if (res.insertId != 0) {
          this.iscomment = true;
          this.$emit("refresh");
          this.$message.success("评论成功");
        }
      }
    },

    async clickpraise() {
      const { data: res } = await this.$http.post(
        "/praise/ispraise/" + this.momentId
      );
      if (res.status != "200") {
        this.number = window.localStorage.getItem("number");
        if (this.number === "1") window.localStorage.setItem("number", "0");
        else {
          window.localStorage.setItem("number", "1");
        }
      }
      if (res.status == "200") {
        await this.$http.post("/praise/" + this.momentId);
        this.$nextTick(() => {
          this.refresh();
        }, 100);
      } else {
        this.number = window.localStorage.getItem("number");
        const content = {
          ispraise: ""
        };
        content.ispraise = this.number;
        const { data: res } = await this.$http.post(
          "/praise/update/" + this.momentId,
          content
        );
        this.$nextTick(() => {
          this.refresh();
        }, 100);
      }
    }
  },
  mounted() {
    this.$bus.$on("commentId", result => {
      this.commentId = result;
      this.iscomment = false;
    });
    this.$bus.$on("comment", this.Popup);

    var n = navigator.userAgent;
    var oshowcomment = document.getElementsByClassName("van-popup")[0];
    if (n.indexOf("iPhone") <= -1) {
      window.onresize = () => {
        if (this.clientHeight > document.documentElement.clientHeight) {
          // oshowcomment.style.position='absolute'
          // 隐藏按钮
        } else {
          // 显示按钮
          // ocontent.style.bottom='fixed'
        }
      };
    }
  }
};
</script>

<style scoped>
.maincontent {
  margin: 8px 5px;
  font-size: 16px;
}

.showcomment {
  position: fixed;
  display: flex;
  background-color: #f5f5f5;
}

.showcomment span {
  display: inline-block;
  margin: auto auto;
  color: #f53b57;
}
.inputcomment {
  margin: 5px;
  padding: 5px;
  width: 80%;
  display: inline-block;
  background-color: #fff;
  border-radius: 20px;
}

.icon {
  margin-top: 15px;
  border-top: 1px solid rgb(245, 243, 243);
}

.name {
  margin-top: 20px;
  font-weight: 600;
}

.time {
  margin-top: 10px;
  font-size: 12px;
}

.commentsarea {
  margin-top: 5px;
  margin-left: 5px;
}

.top {
  display: flex;
  height: 90px;
}

.image {
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
}

.moment .top > img {
  margin: 10px 10px;
  height: 70px;
  width: 70px;
  border-radius: 50%;
}

li {
  list-style: none;
}

.praise {
  display: block;
}

.content {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0px;
  overflow: hidden;
  position: absolute;
}
</style>
