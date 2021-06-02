<template>
  <div class="moment-list">
   <MomentListItem class="moment-list-item" v-for="(item,index) in moments"  :key="index" :moments="item"></MomentListItem>
  </div>
</template>

<script>
import MomentListItem from '@/components/content/moments/MomentListItem'

export default {
    name:"MomentList",
    components: {
      MomentListItem
    },
    props:{
        moments:{
            type:Array,
            defalut(){
                return []
            }
        }
    },
     created(){
           
    },

}
</script>

<style scoped>
.moment-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 30px;
  background-color: rrgba(212, 212, 212, 0.329);
}
.moment-list-item{
  margin-top:5px;
  background-color: #ffffff;
}
</style>