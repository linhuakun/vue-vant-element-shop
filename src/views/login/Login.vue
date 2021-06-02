<template>
    <div class="login_container">
      <div class="top">
      <div class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="">
     </div>
       <span>登录</span>
          <div>
          <a href="http://47.108.153.30:8888"><img src="@/assets/img/cart/logo.jpg" class="logo" alt="" /></a><div class="icon">交 酒</div>
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
          <el-form-item prop="iphone">
            <el-input
              placeholder="请输入手机号"
              v-model="loginForm.iphone"
              prefix-icon="el-icon-user-solid"
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
              <el-button class="btns-login" type="primary" @click="login">登陆</el-button>
            </el-row>
             <!-- <el-button type="info" @click="infoRegister">注册</el-button> -->
          </el-form-item>
          <span @click="infoRegister" class="register">免费注册</span>
          <span @click="infofindpassword" class="findpassword">找回密码</span>
        </el-form>
      </div>
      <div class="other-login">其他登录</div>
      <div class="bottom">
        <img src="@/assets/img/login/iphone.svg" @click="IphoneClick" alt="">
      </div>
    </div>
</template>

<script>


export default {
  name: "login",
  components: {
  },
  data() {
    return {
      loginForm: {
        iphone: "",
        password: "",
      },
      loginFormRules: {
        //验证用户名是否合法
        iphone: [
          { required: true, message: "请输入正确手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号必须为11位", trigger: "blur" },
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
    infofindpassword(){
      this.$router.push('/findpassword')
    },
    IphoneClick(){
      this.$router.push('/iphone')
    },
    backClick(){
      this.$router.push('/home')
    },
    infoRegister() {
      this.$router.push('/register');
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        try{
          const {data:res} =await this.$http.post('login',this.loginForm);
          this.$message.success('登陆成功')
          window.localStorage.setItem('token',res.token);
          window.localStorage.setItem('userId',res.id);
          window.localStorage.setItem('name',res.name);
          window.localStorage.setItem('ispraise','1');
          window.localStorage.setItem('number','0');
          this.$refs.loginFormRef.resetFields();
          this.$bus.$emit('isallrefreshInfo')
          this.$router.push('/home');
        }catch(err){
          // this.$message.error(err.response.message)
          this.$message.error('登录失败')
        }

      });
    },
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{
            this.showHeight = document.body.clientHeight;
        })()
    }
  },
};
</script>

<style  scoped>
.back {
  position: relative;
  width: 30px;
  height: 30px;
  left:10px;
  top: 50%;
  transform: translate(0, -50%);
}

.login_container {
  height: 100vh;
  position: relative;

}


.login_container .top .logo{
  top:50%;
  transform: translate(0,-50%);
  right: 10px;
  position:absolute;
  height: 30px;
  width: 30px;
}


.login_container .top{
  position:relative;
  height: 44px;
  background-color: #de4943;
  color: #fff;
  text-align: center;
}

.login_container .top .icon{
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  font-size: 12px;
  right: 45px;
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
  position: relative;
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
.findpassword{
  position: absolute;
  font-size: 12px;
  color:#409EFF;
  right:0px;
  bottom: 0px;
}

</style>

