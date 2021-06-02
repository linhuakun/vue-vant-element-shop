<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div @click="chatinfo">
        <img  src="@/assets/img/detail/chat.svg" alt="">
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="select()">
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="bugthing">立刻购买</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      const token = window.localStorage.getItem("token");
      if (token) {
        this.$emit("addToCart");
      } else {
        this.$router.push("/login");
      }
    },
    chatinfo(){
      this.$router.push("/detailchat");
      this.$bus.$emit('isenter')
    },
    bugthing() {
      const token = window.localStorage.getItem("token");
      if (token) {
        this.$emit("bugthing");
      } else {
        this.$router.push("/login");
      }
    },
    select(){
      Toast('收藏成功');
    }
  }
};
</script>

<style scoped>

.bottom-bar img{
  width: 22px;
  height: 22px;
  display: block;
  margin: 10px auto 3px;
}

.bottom-bar {
  height: 58px;
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0 -54px;
}

.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #fc5a5a;
  color: #fff;
}

.bar-right .buy {
  color: #fff;
  background-color: #3c3f51;
}
</style>
