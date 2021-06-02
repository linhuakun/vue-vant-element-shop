<template>
  <div class="icon">
    <div>
      <i id="icon-1" @click="clickpraise"
      ><img src="@/assets/img/moment/praise.svg" /></i
    ><sup class="praiseclass">{{ promiseCount()}}</sup>
    </div>
    <div>
          <i
      id="icon-1"
      class="el-icon-chat-dot-square"
      style="font-size: 20px"
      @click="Popup"
      > </i>
      <sup class="commentclass">{{ comments.commentCount }}</sup> 
    </div>
  </div>
</template>

<script>
export default {
  name: "icon",
  props: {
      comments:{
          type:Object,
          default(){
              return {}
          }
      },
  },
  data(){
      return {
          praise:{},
          momentId:'',
          token:''
      }
  },
  mounted(){
        this.token = window.localStorage.getItem("token");
  },
  created() {
    this.momentId = this.$route.params.iid;
    this.getAllPraise();
  },
  methods: {
    promiseCount(){
        return this.praise.promiseCount||0;
    },
    async getAllPraise() {
      const { data: res } = await this.$http.get("/praise/" + this.momentId);
      this.praise = res;
    },
    clickpraise(){
    if(!this.token){
      this.$router.push('/login')
    }else{
        this.$emit('clickpraise')
    }
    },
    Popup(){
    if(!this.token){
      this.$router.push('/login')
    }else{
        this.$emit('Popup')
    }
    },
  }
};
</script>

<style scoped>
.icon{
  display: flex;
  justify-content: space-evenly;
}
.praiseclass{
  top:-0.8em;
}
.commentclass{
  top:-0.6em;
}
</style>