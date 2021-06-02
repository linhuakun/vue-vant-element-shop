<template>
  <div id="Moment">
    <NavBar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <div slot="center" class="title">动态详情</div>
    </NavBar>
      <ChildDetailMoment
        class="ChildDetailMoment"
        :comments="comments"
        v-if="isshow"
        @refresh="refresh"
      ></ChildDetailMoment>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { getComment } from "@/network/comment";
import ChildDetailMoment from "@/views/moment/childComps/ChildDetailMoment";

export default {
  name: "DetailMoment",
  components: {
    NavBar,
    ChildDetailMoment,
  },
  data() {
    return {
      iid: "",
      comments: {},
      isshow:true,
      pullingdown:false,
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    backClick() {
      this.$router.push("/moment");
    },
    refresh(){
      this.isshow=false
      this.$nextTick(() => {
        this.isshow=true
      }, 100);
      this.getComment();
    },
    async getComment() {
      this.iid = this.$route.params.iid;
      const res = await getComment(this.iid);
      this.comments = res.data;
    },
  },
};
</script>

<style scoped>
.nav-bar {
  top: 0px;
  position: absolute;
  width: 100%;
  background-color:#df3832;
  font-weight: 500px;
  color: #fff;
}
.back {
  position: relative;
  width: 30px;
  height: 30px;
  left:10px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
