<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div  class="privateImage-svg">
          </div>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname" > </slot>
        <slot name="sign" ></slot>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLogin: "登陆/注册",
      name: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
#user-info {
  display: flex;
  padding: 15px;
  margin-top: -5px;
}


#user-info .privateImage-svg {
  width: 80px;
  height: 70px;
  background-color: #fff;
  border-radius: 30px;
  overflow: hidden;
}
.left {
  position: relative;
  height: 70px;
  width: 200px;
  float: left;
  margin-left:10px ;
}

#user-info .login-info {
  color: rgb(88, 73, 73);
  border-radius:(0,0,0,0)
}
</style>