<template>
  <div class="login_container">
    <div class="top">
      <div class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <span>找回密码</span>
      <div>
        <img src="@/assets/img/cart/logo.jpg" class="logo" alt="" />
        <div class="icon">交 酒</div>
      </div>
    </div>
    <div class="login_box">
      <!-- 登陆区域 -->
      <el-form
        ref="verifyFormRef"
        label-width="0px"
        class="login_form"
        :model="verifyForm"
        :rules="verifyFormRules"
      >
        <el-form-item prop="iphone">
          <el-input
            placeholder="请输入手机号"
            v-model="verifyForm.iphone"
            prefix-icon="el-icon-phone"
            ref="iphoneFormRef"
          ></el-input>
        </el-form-item>
        
        <el-form-item prop="code" class="verify">
          <el-input
            class="verifyMessage"
            placeholder="请输入验证码"
            v-model="verifyForm.code"
            prefix-icon="el-icon-s-goods"
          ></el-input>
          <el-button class="getVerify" @click="emitsmsverify">验证码</el-button>
        </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="请输入新的密码"
              v-model="verifyForm.password"
              prefix-icon="el-icon-s-goods"
            ></el-input>
          </el-form-item>

        <el-form-item>
          <el-row>
            <el-button class="btns-login" type="primary" @click="login"
              >修改</el-button
            >
          </el-row>
          <!-- <el-button type="info" @click="infoRegister">注册</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import loginfature from "./chilidComps/loginfature"
// import Scroll from '@/components/common/Scroll/Scroll'

export default {
  name: "Iphone",
  components: {},
  data() {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        // 引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    return {
      verifyForm: {
        iphone: "",
        code: "",
        password:""
      },
      verifyFormRules: {
        //验证用户名是否合法
        iphone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: checkphone, trigger: "blur" }
        ],
        //验证密码是否合法
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "验证码为6位",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ]
      }
    };
  },
  methods: {
    async emitsmsverify() {
      this.$refs.verifyFormRef.validateField("iphone", async err => {
        if (err) return;
        this.emitsms();
        var formData = new URLSearchParams();
        formData.append("iphone", this.verifyForm.iphone);
        try {
          await this.$http({
            method: "post",
            url: "/sms/get",
            data: formData
          });
          this.$message.success("发送成功");
        } catch {
          err => {
            this.$message.error("发送失败");
          };
        }
      });
    },
    emitsms() {
      const btn = document.getElementsByClassName("getVerify")[0];
      btn.setAttribute("disabled", true);
      let time;
      let localtime = window.sessionStorage.getItem("time");
      if (localtime == 0 || localtime == null) {
        time = 60;
      } else {
        time = localtime;
      }
      let timer = setInterval(function() {
        if (time >= 0) {
          btn.style.color = "#606266";
          btn.style.borderColor = "#DCDFE6";
          btn.style.backgroundColor = "#FFF";
          btn.innerHTML = time-- + "秒";
          window.sessionStorage.setItem("time", time + 1);
        } else {
          clearInterval(timer);
          btn.disabled = false;
          btn.style.color = "#fff";
          btn.style.borderColor = "#df3832";
          btn.style.backgroundColor = "#df3832";
          btn.innerHTML = "验证码";
        }
      }, 1000);
      //    setInterval(function(){
      //        this.isclick=false
      //    },60000)
    },
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    backClick() {
      this.$router.push("/login");
    },
    login() {
      this.$refs.verifyFormRef.validate(async valid => {
        if (!valid) return;
        try {
          const { data: res } = await this.$http.post(
            "/sms/findpassword",
            this.verifyForm
          );
          this.$message.success(res.msg);
          this.$refs.verifyFormRef.resetFields();
        } catch (err) {
          this.$message.error("修改失败");
        }
      });
    }
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };

    let localtimer = window.sessionStorage.getItem("time");
    if (localtimer == 0 || localtimer == null) {
    } else {
      this.emitsms();
    }
  }
};
</script>

<style scoped>
.getVerify {
  color: #fff;
  border-color: #df3832;
  background-color: #df3832;
}

.getVerify {
  width: 30%;
  margin-left: 10%;
  text-align: center;
  font-size: 12px;
}
.back {
  position: relative;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
}

.login_container {
  height: 100vh;
  position: relative;
}

.verifyMessage {
  width: 60%;
}

.login_container .top .logo {
  top: 50%;
  transform: translate(0, -50%);
  right: 10px;
  position: absolute;
  height: 30px;
  width: 30px;
}

.login_container .top {
  position: relative;
  height: 44px;
  background-color: #df3832;
  color: #fff;
  text-align: center;
}

.login_container .top .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 12px;
  right: 45px;
}

.login_container .top .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 12px;
  right: 45px;
}

.login_container .top span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  width: 85%;
  margin: 0 auto;
  margin-top: 40px;
}

.btns-login {
  width: 100%;
}

.other-login {
  margin-top: 50px;
  text-align: center;
}

.bottom {
  margin: 0 auto;
  margin-top: 10px;
  width: 85%;
  height: 200px;
  border-top: 1px solid #f5f5f5;
}
.bottom img {
  margin-top: 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.register {
  position: relative;
  height: 20px;
  width: 20px;
  font-size: 12px;
  color: #409eff;
  right: 0px;
}
</style>
