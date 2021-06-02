<template>
  <div class="goods-items" @click="itemClick">
      <img v-lazy="showImage"  alt="" @load="imageLoad" width="162px" height="198px">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
  imageLoad(){
    this.$bus.$emit('itemImageLoad')
  },
    itemClick(){
      this.$router.push('/detail/'+this.goodsItem.id)
    }
  },
  computed:{
  showImage(){
    return this.goodsItem.showLarge.img||this.goodsItem.showLarge.image || this.goodsItem.showLarge.show.img
  }
  }
}
</script>

<style scoped>
.goods-items {
  padding-bottom: 40px;
  position: relative;
  width:48%;
}
.goods-items img {
  margin:0 auto;
  height: 198px;
  width:100%; 
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
