<template>
  <div class="Message">
    <NavBar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <div slot="center">个人信息</div>
    </NavBar>


    <div class="content">

          <!-- 名称修改区域 -->
      <el-form
        class="form"
        ref="nameFormRef"
        label-width="0px"
        :model="nameForm"
        :rules="nameFormRules"
      >
        <el-form-item prop="name" class="updataform">
          <el-input
            placeholder="输入新的名称"
            v-model="nameForm.name"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item class="updatabtn">
          <el-row>
            <el-button class="btn" @click="updataname" type="primary"
              >修改</el-button
            >
          </el-row>
        </el-form-item>
      </el-form>

   <!-- 密码修改区域 -->
      <el-form
        class="form"
        ref="passwordFormRef"
        label-width="0px"
        :model="passwordForm"
        :rules="passwordFormRules"
      >
        <el-form-item prop="password" class="updataform">
          <el-input
            placeholder="输入新的密码"
            v-model="passwordForm.password"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item class="updatabtn">
          <el-row>
            <el-button class="btn" @click="updatapassword" type="primary"
              >修改</el-button
            >
          </el-row>
        </el-form-item>
      </el-form>

      <el-form
        class="form"
        ref="signFormRef"
        label-width="0px"
        :model="signForm"
        :rules="signFormRules"
      >
        <el-form-item prop="sign" class="updataform">
          <el-input
            placeholder="输入你的个性签名"
            v-model="signForm.sign"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item class="updatabtn">
          <el-row>
            <el-button class="btn" @click="updatasign" type="primary"
              >修改</el-button
            >
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "Message",
  components: {
    NavBar
  },
  data() {
    return {
      passwordForm: {
        password: "",
      },
      passwordFormRules: {
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
      },
      signForm: {
        sign: "",
      },
      signFormRules: {
        //验证标签是否合法
        sign: [
          { required: true, message: "请输入个性签名", trigger: "blur" },
          { min: 0, max: 15, message: "长度在15个字符以内", trigger: "blur" }
        ]
      },
      nameForm: {
        sign: "",
      },
      nameFormRules: {
        //验证名称是否合法
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个名称", trigger: "blur" }
        ]
      },
    };
  },
  created() {},
  methods: {
    backClick() {
      this.$router.push("/profile");
    },
    updatapassword() {
      this.$refs.passwordFormRef.validate(async valid => {
        if (!valid) return;
        try {
          await this.$http.post("/users/updata/password", this.passwordForm);
          this.$message.success("修改成功");
          this.$bus.$emit('isrefreshinfo')
          // 重制输入框
          this.$refs.passwordFormRef.resetFields();
        } catch (err) {
          return this.$message.error("修改失败");
        }
      });
    },
    updatasign() {
      this.$refs.signFormRef.validate(async valid => {
        if (!valid) return;
        try {
          await this.$http.post("/users/updata/sign", this.signForm);
          this.$message.success("修改成功");
        this.$bus.$emit('isrefreshinfo')
          // 重制输入框
          this.$refs.signFormRef.resetFields();
        } catch (err) {
          return this.$message.error("修改失败");
        }
      });
    },
    updataname(){
      this.$refs.nameFormRef.validate(async valid => {
        if (!valid) return;
        try {
          await this.$http.post("/users/updata/name", this.nameForm);
          this.$message.success("修改成功");
          window.localStorage.setItem("name",this.nameForm.name);
           this.$bus.$emit('isrefreshinfo')
          // 重制输入框
          this.$refs.nameFormRef.resetFields();
        } catch (err) {
          return this.$message.error("修改失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.form {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.updataform {
  width: 75%;
  display: inline-block;
}
.updatabtn {
  width: 20%;
  display: inline-block;
  margin-right: 0px;
}

.nav-bar {
  background-color: #df3832;
  color: #fff;
  height: 44px;
}

.back {
  position: relative;
  width: 30px;
  height: 30px;
  left:10px;
  top: 50%;
  transform: translate(0, -50%);
}

.content {
  margin-top: 25px;
  width: 100%;
  background-color: #fff;
}

</style>
