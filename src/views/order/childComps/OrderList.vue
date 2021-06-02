<template>
  <div class="cart">
      <OrderListItem v-for="(item,index) in list"
                    :key="index"
                    :item-info="item">{{item}}>
      </OrderListItem>
  </div>
</template>

<script>


import OrderListItem from "@/views/order/childComps/OrderListItem";

import {mapGetters} from 'vuex'


export default {
  name: "OrderList",
  components: {
    OrderListItem
  },
  computed: {
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      list: 'cartList'
    })
  },

}
</script>

<style scoped>
</style>
