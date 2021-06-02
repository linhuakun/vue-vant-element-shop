<template>
  <div class="cart">
    <Scroll class="content" ref="scroll"
           :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @pullingDown="pullingDown"
            >
      <CartListItem v-for="(item,index) in list"
                    :key="index"
                    :item-info="item">{{item}}>
      </CartListItem>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll/Scroll";

import CartListItem from "@/views/cart/childComps/CartListItem";

import {mapGetters} from 'vuex'


export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      list: 'cartList'
    })
  },
  activated(){
    this.$refs.scroll.refresh()
  },
  methods:{
    loadMore(){
      // this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
    },
      pullingDown() {
      this.pullingdown = true;
      setTimeout(() => {
        this.pullingdown = false;
        this.$refs.scroll.finishPullDown();
      }, 0)
    },
  }
}
</script>

<style scoped>
.content{
  height: calc(100% - 44px - 49px - 44px);
  overflow: hidden;
}
</style>
