<template>
  <div class="Message">
      <NavBar class="nav-bar">
        <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="">
        </div> 
        <div slot="center">关于我们</div>
    </NavBar>
        <div>
            本网站目前仅用于学习,商品信息来源于网上,若有侵权及时联系，联系qq1804357047,我们会在第一时间进行删除,
            禁止发表违法言论,若发现用户私自发表，自行承担后果,本网站具有一切合理说明权。
       </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
    name:"Message",
    components:{
        NavBar
    },
    data(){
        return {
        }
    },
    created(){
    },
    methods:{
        backClick(){
            this.$router.push('/profile')
        }
    }
}
</script>

<style scoped>
.nav-bar{
  background-color:#df3832;
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

</style>