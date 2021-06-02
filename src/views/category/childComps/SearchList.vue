<template>
  <div class="cart">
      <SearchListItem v-for="(item,index) in list"
                    :key="index"
                    :item-info="item">{{item}}>
      </SearchListItem>
  </div>
</template>

<script>


import SearchListItem from "./SearchListItem";



export default {
  name: "SearchList",
  components: {
    SearchListItem
  },
  props:{
   list:{
    type:Array,
     default(){
      return []
    }
  }
  },
  computed: {
  },

}
</script>

<style scoped>
.content{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
