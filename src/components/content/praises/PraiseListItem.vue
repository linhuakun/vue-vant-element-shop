<template>
  <div class="praise" >
    <img src="@/assets/img/moment/praise-icon.svg">
    <span>{{praise.name}}</span>
  </div>
</template>

<script>

export default {
  name: "PraiseListItem",
  props: {
    praise: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data(){
    return{
      ispraise:"点赞"
    }
  }
};
</script>

<style scoped>
.praise{
  display: inline-block;
  margin-left:5px;
}

span{
  font-size: 14px;
}
.praise img{
  height: 20px;
  width: 20px;
}
</style>
