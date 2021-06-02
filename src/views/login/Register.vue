<template>
 <div class="login_container">
      <div class="top">
      <div class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="">
     </div>
         <span>注册</span>
         <div>
          <img src="@/assets/img/cart/logo.jpg" class="logo" alt="" /><div class="icon">交 酒</div>
         </div>
      </div>
      <div class="login_box">
        <!-- 登陆区域 -->
        <el-form
          ref="loginFormRef"
          label-width="0px"
          class="login_form"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <el-form-item prop="name">
            <el-input
              placeholder="请输入用户名"
              v-model="loginForm.name"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
            <el-form-item prop="iphone">
            <el-input
              placeholder="请输入手机号"
              v-model="loginForm.iphone"
              prefix-icon="el-icon-phone"
              
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.password"
              prefix-icon="el-icon-s-goods"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item >
            <el-row>
              <el-button class="btns-login" type="primary" @click="login">注册</el-button>
            </el-row>
             <!-- <el-button type="info" @click="infoRegister">注册</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
// import loginfature from "./chilidComps/loginfature"

export default {
  name: "login",
  components: {
    scroll,
  },
  data() {
     var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!this.isCellPhone(value)) { // 引入methods中封装的检查手机格式的方法
        callback(new Error('请输入正确的手机号!'))
      } else {
        callback()
      }
    }
    return {

      loginForm: {
        name: "",
        password: "",
        iphone:""
      },
      loginFormRules: {
        //验证用户名是否合法
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        iphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkphone, trigger: "blur" },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
     backClick() {
      this.$router.push('/login');
    },
    isCellPhone (val) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
        return false
      } else {
        return true
      }
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        try{
        await this.$http.post("users", this.loginForm);
        this.$message.success('注册成功');
        this.$refs.loginFormRef.resetFields();
        this.$router.push('/login');
        }catch(err){
          this.$message.error('注册失败'+err.response.data.message);
        }

        // if (res.status != 200) return this.$message.error('注册失败'+res.message);
      });
    },
  },
};
</script>

<style scoped>


.back {
  position: relative;
  width: 30px;
  height: 30px;
  left:10px;
  top: 50%;
  transform: translate(0, -50%);
}
.login_container {
  position: relative;
    height: 100vh;
}

.login_container .top{
  position:relative;
  height: 44px;
  background-color: #df3832;
  color: #fff;
  text-align: center;
}

.login_container .top .logo{
  top:50%;
  transform: translate(0,-50%);
  right: 10px;
  position:absolute;
  height: 30px;
  width: 30px;
}


.login_container .top .icon{
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  font-size: 12px;
  right: 45px;
}

.login_container .top span{
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}

.login_form{
  width: 85%;
  margin: 0 auto;
  margin-top: 40px;
}

.btns-login{
  width: 100%;
}

.other-login{
  margin-top:50px;
  text-align: center;
}

.bottom{
  margin:0 auto;
  margin-top:10px;
  width: 85%;
  height: 200px;
  border-top:1px solid #f5f5f5
}
.bottom img{
  margin-top: 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
}
.register{
  position: relative;
  height: 20px;
  width: 20px;
  font-size: 12px;
  color:#409EFF;
  right:0px;
}
</style>
