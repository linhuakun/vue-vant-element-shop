<template>
  <div class="feature">
    <a href="javascript:">
      <img src="@/assets/img/home/1.jpeg" alt="" @load="swiperImageLoad" @click="clickInfo1()" />
      <img src="@/assets/img/home/2.jpeg" alt="" @load="swiperImageLoad" @click="clickInfo2()" />
      <img src="@/assets/img/home/3.jpeg" alt="" @load="swiperImageLoad" @click="clickInfo3()" />
      <img src="@/assets/img/home/4.jpeg" alt="" @load="swiperImageLoad" @click="clickInfo4()" />
      <img src="@/assets/img/home/5.jpeg" alt="" @load="swiperImageLoad" @click="clickInfo5()" />
      <img src="@/assets/img/home/6.gif" alt="" @load="swiperImageLoad" @click="clickInfo5()" />
      <img src="@/assets/img/home/7.jpeg" alt="" @load="swiperImageLoad" @click="clickInfo4()" />
      <img src="@/assets/img/home/8.gif" alt="" @load="swiperImageLoad" @click="clickInfo3()" />
      <img src="@/assets/img/home/9.jpeg" alt="" @load="swiperImageLoad" @click="clickInfo1()" />
      <img src="@/assets/img/home/10.jpeg" alt="" @load="swiperImageLoad" @click="clickInfo2()" />
    </a>
  </div>
</template>

<script>
export default {
  name: "HomefeatureView",
  methods: {
    swiperImageLoad() {
      this.$emit("swiperImageLoad");
    },
    clickInfo1() {
      this.$router.push("/listfirst");
    },
    clickInfo2() {
      this.$router.push("/listsecond");
    },
    clickInfo3() {
      this.$router.push("/listthird");
    },
    clickInfo4() {
      this.$router.push("/listfour");
    },
    clickInfo5() {
      this.$router.push("/listfive");
    },
  }
};
</script>

<style scoped>
.feature {
  display: flex;
  flex-wrap:wrap;
  background-color: #fAFAFA;
  align-content: flex-start;
  font-size: 0;
}
.feature img {
  width: 20%;
}
</style>
