<template>
  <div class="moment-items" v-if="isExist">
    <div>
      <img class="avatar" @load="uploadavatar" v-lazy="showImage" />
    </div>
    <div class="name">{{ moments.author.name }}</div>

            <!-- <i
      @click="remove"
      id="delete"
      class="el-icon-delete"
      style="font-size: 20px"
    ></i> -->

    <div class="time">
      {{ this.$moment(moments.createAT).fromNow() }}
    </div>

    <div class="content">{{ moments.content }}</div>
    <div class="image">
      <li v-for="(item, index) in moments.images" :key="index">
        <img
          @load="uploadavatar"
          width="100px"
          height="100px"
          :preview="index"
          :src="item + '?type=small'"
        />
        <!-- v-lazy="item+'?type=small'" -->
      </li>
    </div>

    <div class="icon" v-if="this.isdisplay">
      <div>
        <i @click="clickpraise"> <img src="@/assets/img/moment/praise.svg"/></i
        ><span class="icon1">{{promiseCount()}}</span>
      </div>
      <div>
        <i
          class="el-icon-chat-dot-square"
          style="font-size: 20px"
          @click="comment"
        ></i>
        <span>{{moments.commentCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MomentListItem",
  props: {
    moments: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      id: this.moments.id,
      isExist: true,
      images: [],
      praise: {},
      isdisplay: true,
      number: "",
      isfrist: true,
      token: ""
    };
  },
  created() {
    this.getAllPraise();
    window.localStorage.setItem("number", "0");
    this.token = window.localStorage.getItem("token");
  },
  computed: {
    showImage() {
      return this.moments.author.avatarUrl;
    }
  },
  methods: {
    promiseCount(){
        return this.praise.promiseCount||0;
    },
    uploadavatar() {
      this.$bus.$emit("upload");
    },
    async remove() {
      if (!this.token) {
        this.$router.push("/login");
      } else {
        try {
          await this.$http.delete("/moment/" + this.id);
          this.isExist = !this.isExist;
          this.$message.success("删除成功");
          this.$bus.$emit("upload");
        } catch {
          this.$message.error("你不具备删除该动态权限");
        }
      }
    },
    comment() {
      this.$router.push("detailcomment/" + this.moments.id);
    },
    async getAllPraise() {
      const { data: res } = await this.$http.get("/praise/" + this.moments.id);
      this.praise = res;
    },
    refresh() {
      this.isdisplay = false;
      this.$nextTick(() => {
        this.isdisplay = true;
      }, 100);
      this.getAllPraise();
    },
    //发表成功评论
    async clickpraise() {
      if (!this.token) {
        this.$router.push("/login");
      } else {
        const { data: res } = await this.$http.post(
          "/praise/ispraise/" + this.moments.id
        );
        if (res.status != "200") {
          this.number = window.localStorage.getItem("number");
          if (this.number === "1") window.localStorage.setItem("number", "0");
          else {
            window.localStorage.setItem("number", "1");
          }
        }
        if (res.status == "200") {
          await this.$http.post("/praise/" + this.moments.id);
          this.$nextTick(() => {
            this.refresh();
          }, 100);
        } else {
          this.number = window.localStorage.getItem("number");
          const content = {
            ispraise: ""
          };
          content.ispraise = this.number;
          await this.$http.post("/praise/update/" + this.moments.id, content);
          this.$nextTick(() => {
            this.refresh();
          }, 100);
        }
      }
    },
    isclickpraise() {}
  },
  mounted() {
    this.$bus.$on("aaispraise", this.isclickpraise);
  }
};
</script>

<style scoped>
li {
  list-style: none;
}

.moment-items {
  position: relative;
  background-color: rgb(255, 255, 255);
  width: 100%;
  font-size: 12px;
}
.avatar {
  float: left;
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.name {
  float: left;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 15px;
}
.time {
  margin-left: 70px;
  margin-top: 30px;
  font-size: 10px;
}
.sign {
  margin-left: 70px;
  margin-top: 30px;
  font-size: 10px;
}
.content {
  margin-top: 15px;
  margin-left: 5px;
  font-size: 13px;
  margin-bottom: 15px;
}
.icon {
  margin-top: 15px;
  justify-content: space-evenly;
  display: flex;
  border-top-style: solid;
  border-width: 0.1px;
  border-color: rgb(230, 220, 220);
}

.icon1{
  position: relative;
  top:-11px !important;
  vertical-align: middle;
}

.icon div{
  height: 23px;
  width: 30px;
}

.icon img{
  width: 20px;
  height: 21px;
}

.icon span{
  position: relative;
  top:-8px;
  font-size: 8px !important;
  vertical-align: middle;
}

#delete {
  float: right;
  margin-top:5px;
  margin-right:5px;
}
.el-icon-delete {
  margin-left: 20px;
}
.remove {
  margin-left: 20px;
}

.text {
  margin: 20px 5px;
}
.image {
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
}
</style>
