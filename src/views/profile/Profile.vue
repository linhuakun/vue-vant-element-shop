<template>
  <div class="profile">
    <nav-bar class="nav-bar"><div slot="center">个人中心</div></nav-bar>

    <!--1.单独封装一个组件: 利用slot-->
    <user-info class="user-info" v-if="this.isallrefresh">
      <div slot="user-icon" class="user-icon">
        <img alt="上传成功" :src="this.avatar" v-if="this.avatarexit" />
        <img alt="未上传" src="~assets/img/profile/avatar.svg" v-else />
        <van-uploader
          class="uploading"
          :after-read="afterRead"
          preview-size="60px"
          accept="image/png,image/jpeg,image/jpg,image/svg,image/gif"
        />
      </div>
      <div slot="user-nickname" class="user-nickname">
        <div v-if="this.name">{{ name }}</div>
        <div v-else>
          <a @click="infoLogin">登陆</a><a>/</a
          ><a @click="infoRegister">注册</a>
        </div>
      </div>
      <div slot="sign" class="info-sign">
        个性签名: <span>{{ sign }}</span>
      </div>
    </user-info>
    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="item imte2" @click="mineOrder">
        <img src="~assets/img/profile/order.svg" alt="" /><span>我的订单</span>
      </div>
      <div class="item imte3">
        <img
          src="~assets/img/profile/cart.svg"
          alt=""
          @click="successOrder"
        /><span>送货中</span>
      </div>
      <div class="item imte4">
        <img src="~assets/img/profile/success.svg" alt="" @click="overOrder" />
        <span>已完成</span>
      </div>
    </section>
    <section class="footer">
      <div @click="messageinfo">设置</div>
      <div @click="AboutInfo">关于我们</div>
      <div @click="logout()">退出</div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/Scroll/Scroll";
import UserInfo from "@/views/profile/childComps/UserInfo";
import { getSign,getname } from "@/network/profile.js";

export default {
  name: "Profile",
  components: {
    NavBar,
    Scroll,
    UserInfo
  },
  data() {
    return {
      name: "",
      isLogin: "",
      id: "",
      url: "",
      avatar: "",
      avatarexit: false,
      isshow: true,
      sign: "",
      token: "",
      isrefresh: true,
      isallrefresh: true
    };
  },
  async mounted() {
    this.token = window.localStorage.getItem("token");
    if (this.token) {
      this.getAvatar();

      const res = await getSign();
      this.sign = res.data;

      const ores=await getname()
      this.name=ores.data
    }
    this.$bus.$on("isrefreshinfo", this.isrefreshinfo);
    this.$bus.$on("isallrefreshInfo", this.isallrefreshInfo);
  },
  methods: {
    isallrefreshInfo() {
      this.isallrefresh = false;
      var oallself = this;
      setTimeout(async function() {
        const res = await getSign();
        oallself.sign = res.data;
        const ores=await getname()
        oallself.name=ores.data
        oallself.getAvatar();
        oallself.isallrefresh = true;
      }, 300);
    },
    isrefreshinfo() {
      this.isrefresh = false;
      var oself = this;
      setTimeout(async function() {
        const ores=await getname()
        oself.name=ores.data

        const res = await getSign();
        oself.sign = res.data;
        oself.isrefresh = true;
      }, 300);
    },
    overOrder() {
      this.$router.push("/overorder");
    },
    successOrder() {
      this.$router.push("/successorder");
    },
    mineOrder() {
      this.$router.push("/mineorder");
    },
    AboutInfo() {
      this.$router.push("/about");
    },
    messageinfo() {
      this.$router.push("/message");
    },
    logout() {
      this.token = window.localStorage.getItem("token");
      if (this.token) {
        window.localStorage.clear();
        this.$router.push("/login");
        this.$message("退出成功");
        this.avatarexit=false;
        this.name=false;
        this.sign=''
      } else {
        this.$router.push("/login");
      }
    },
    Default() {
      return "~assets/img/profile/avatar.svg";
    },
    infoLogin() {
      this.$router.push("/login");
    },
    infoRegister() {
      this.$router.push("/register");
    },
    async afterRead(file) {
      this.token = window.localStorage.getItem("token");
      if (!this.token) this.$router.push("/login");
      this.url = "/upload/" + this.id + "/avatar";
      // 此时可以自行将文件上传至服务器
      const formdata = new FormData();
      formdata.append("avatar", file.file);
      await this.$http.post(this.url, formdata);
      this.getAvatar();
      this.avatarexit = false;
      this.$nextTick(() => {
        this.avatarexit = true;
      }, 3000);
    },
    async getAvatar() {
      try {
        this.id = window.localStorage.getItem("userId");
        const res = await this.$http.get("/users/" + this.id + "/avatar");
        this.avatar = res.config.url;
        this.avatarexit = true;
      } catch (err) {
        this.avatarexit = false;
      }
    },
    pullingDown() {
      this.$refs.scroll.finishPullDown();
    }
  },
  created() {}
};
</script>

<style scoped>
.footer div {
  margin-top: 9px;
  height: 50px;
  width: 100%;
  background-color: #f5f5f5;
  text-align: center;
  line-height: 50px;
  transform: translate(0, -50%);
}

.footer {
  margin-top: 40px;
  height: 150px;
  width: 100%;
}

.account {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
}

.account .item {
  width: 32%;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgba(241, 235, 235, 0.2);
}

.account .item img {
  margin-top: 5px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}

.account .item span {
  position: relative;
  margin-top: 5px;
  display: block;
  text-align: center;
}

.user-nickname {
  margin-top: 12px;
}

.user-info {
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
}

.info-sign {
  margin-top: 8px;
  font-size: 12px;
}

.info-sign span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-icon {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background-color: #fff;
  float: left;
}

.user-icon img {
  position: relative;
  border-radius: 50%;
  height: 60px;
  width: 60px;
}

.user-icon .uploading {
  left: 0;
  position: absolute;
  border-radius: 50%;
  opacity: 0;
}

.nav-bar {
  background-color: #df3832;
  color: #fff;
}
</style>
