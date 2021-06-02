<template>
  <div id="chat">
    <NavBar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <div slot="center" class="title">在线聊天({{ num }})</div>
    </NavBar>
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @pullingDown="pullingDown"
    >
      <ul>
        <li v-for="(item, index) in lists" :key="'message' + index">
          <div v-if="item.size == 0" class="minienter">
            {{ item.name }}进入群聊
          </div>
          <div v-else-if="item.size == 3" class="minienter">
            {{ item.name }}退出群聊
          </div>
          <div v-else-if="item.size == 1" class="minemsg">
            <div><img :src="getAvatar(item.uid)" alt="" /></div>
            <div class="mine-bottom">
              <div class="namefont">
                {{ item.name }} <span>{{ formdata(item.date) }} </span>
              </div>
              <div class="msg">{{ item.message }}</div>
            </div>
          </div>
          <div v-else class="othermsg">
            <div><img :src="getAvatar(item.uid)" alt="" /></div>
            <div class="mine-bottom">
              <div class="namefont">
                {{ item.name }} <span>{{ formdata(item.date) }} </span>
              </div>
              <div class="msg">{{ item.message }}</div>
            </div>
          </div>
        </li>
      </ul>
    </Scroll>
    <div class="showcomment">
      <input type="text" maxlength="20" id="inputInfo" v-model="message" @blur="forbidMove()" />
      <span @click="send()">发送</span>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/Scroll/Scroll.vue";

export default {
  name: "DetailChat",
  components: {
    NavBar,
    Scroll
  },
  data() {
    return {
      content: "",
      message: "",
      lists: [],
      ws: {},
      name: "",
      num: 0,
      isshow: true,
      isme: false,
      roomid: 1,
      uid: "",
      handle: {},
      token: ""
    };
  },
  updated() {},
  created() {
    this.token = window.localStorage.getItem("token");
    if (!this.token) {
      this.$router.push("/login");
    }
  },
  methods: {
    forbidMove() {
      document.querySelector("#inputInfo").scrollIntoView(false);
    },
    formdata(date) {
      return this.$moment(date).fromNow();
    },
    getAvatar(uid) {
      return "http://47.108.153.30:8001/users/" + uid + "/avatar";
    },
    backClick() {
      this.ws.close();
      this.$router.back();
    },
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
    init() {
      this.ws = new WebSocket("ws://47.108.153.30:8002/");
      this.ws.onopen = this.onOpen;
      this.ws.onmessage = this.onMessage;
      this.ws.onclose = this.onClose;
      this.ws.onerror = this.onError;
    },
    enter() {
      if (this.name.trim() === "") {
        this.$router.push("/login");
      }
      this.init();
      this.isShow = false;
    },
    onOpen: function() {
      // console.log('open:' + this.ws.readyState);
      //ws.send('Hello fro,m client!')
      // 发起鉴权请求
      //this.ws.send(JSON.stringify({
      //  event: 'auth',
      //  message: //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIx//MjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT//E2MjM5MDIyfQ.//XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'
      //}))
      this.ws.send(
        JSON.stringify({
          event: "enter",
          message: this.name,
          roomid: this.roomid,
          uid: this.uid,
          date: new Date()
        })
      );
    },
    onMessage: function(event) {
      // 当用户未进入聊天室，则不接收消息
      if (this.isShow) {
        return;
      }
      // 接收服务端发送过来的消息
      var obj = JSON.parse(event.data);
      switch (obj.event) {
        case "enter":
          // 当有一个新的用户进入聊天室
          obj.size = 0;
          this.lists.push(obj);
          break;
        case "out":
          obj.size = 3;
          this.lists.push(obj);
          break;
        case "heartbeat":
          // this.checkServer(); // timeInterval + t
          // 可以注释掉以下心跳状态，主动测试服务端是否会断开客户端的连接
          this.ws.send(
            JSON.stringify({
              event: "heartbeat",
              message: "pong"
            })
          );
          break;
        default:
          if (obj.name !== this.name) {
            obj.size = 2;
            // 接收正常的聊天
            this.lists.push(obj);
          }
      }
      this.num = obj.num;
      this.$nextTick(() => {
        let Lis = document.querySelectorAll("li"); // 查找所有li元素
        if (
          Lis[Lis.length - 1].offsetTop + 49 >
          this.$refs.scroll.$el.clientHeight
        ) {
          const height =
            Lis[Lis.length - 1].offsetTop +
            49 -
            this.$refs.scroll.$el.clientHeight;
          this.$refs.scroll.scrollTo(0, -height, 100);
          this.$refs.scroll.refresh();
        }
      }, 0);
    },
    onClose() {
      // 当链接主动断开的时候触发close事件
      this.ws.close();
    },
    onError() {
      // 当连接失败时，触发error事件
      // 连接失败之后，1s进行断线重连！
      var _this = this;
      setTimeout(function() {
        _this.init();
      }, 1000);
    },
    // 发送消息
    send() {
      var minemsg = {
        name: this.name,
        message: this.message,
        size: 1,
        date: new Date(),
        uid: this.uid
      };
      this.lists.push(minemsg);
      this.$nextTick(() => {
        let Lis = document.querySelectorAll("li"); // 查找所有li元素
        if (
          Lis[Lis.length - 1].offsetTop + 49 >
          this.$refs.scroll.$el.clientHeight
        ) {
          const height =
            Lis[Lis.length - 1].offsetTop +
            49 -
            this.$refs.scroll.$el.clientHeight;
          this.$refs.scroll.scrollTo(0, -height, 100);
          this.$refs.scroll.refresh();
        }
      }, 0);
      this.ws.send(
        JSON.stringify({
          event: "message",
          message: this.message,
          name: this.name,
          uid: this.uid,
          date: new Date()
        })
      );
      this.message = "";
    },
    checkServer: function() {
      var _this = this;
      clearTimeout(this.handle);
      this.handle = setTimeout(function() {
        _this.onClose();
        setTimeout(function() {
          _this.init();
        }, 1000);
        // 设置1ms的时延，调试在服务器测未及时响应时，客户端的反应
      }, 30000 + 1000);
    }
  },
  mounted() {
    this.name = window.localStorage.getItem("name");
    this.uid = window.localStorage.getItem("userId");
    var othis = this;
    othis.enter();
  }
};
</script>

<style scoped>
#chat {
  position: relative;
  height: 100vh;
  background-color: #f5f5f5;
}
.nav-bar {
  top: 0px;
  position: absolute;
  width: 100%;
  background-color: #df3832;
  font-weight: 500px;
  color: #fff;
  box-shadow: 1px solid #333;
}
.back {
  position: relative;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
}
.content {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 44px;
  overflow: hidden;
  position: absolute;
}

.showcomment {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 44px;
  background-color: #f0f0f0;
}

/* .showcomment .warp {
  background-color: #fff;
  position: relative;
  width: 70%;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 50px;
  left: 5%;
  height: 30px;
}

.showcomment .warp {
    color: #333;
  font-weight: 400;
} */

.showcomment input {
  width: 70%;
  padding: 0 20px;
  position: relative;
  height: 25px;
  border: none;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
}

.showcomment span {
  display: inline-block;
  margin: auto auto;
  color: #333;
}
.minienter {
  margin-top: 5px;
  font-size: 10px;
  text-align: center;
  color: #555;
  font-weight: 400;
}
.minemsg {
  margin-top: 10px;
  font-size: 18px;
  color: #333;
  font-weight: 400;
  display: flex;
  flex-direction: row-reverse;
}
.minemsg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.minemsg .mine-bottom {
  text-align: right;
}

.minemsg .mine-bottom .msg {
  display: inline-block;
  margin: 3px 3px;
  padding: 5px 5px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 18px;
}
.minemsg .mine-bottom .namefont {
  text-align: right;
  font-size: 12px;
  color: #999;
  font-weight: 400;
}
.minemsg .mine-bottom .namefont span {
  text-align: right;
  font-size: 10px;
  color: #999;
  font-weight: 400;
}

.othermsg {
  display: flex;
  margin-top: 10px;
  font-size: 18px;
  color: #333;
}
.othermsg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.othermsg .mine-bottom {
  text-align: left;
}

.othermsg .mine-bottom .msg {
  display: inline-block;
  padding: 3px 3px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 18px;
}
.othermsg .mine-bottom .namefont {
  font-size: 12px;
  color: #999;
  font-weight: 400;
  font-size: 12px;
}
.othermsg .mine-bottom .namefont span {
  font-size: 10px;
  color: #999;
  font-weight: 400;
  font-size: 10px;
}
</style>
