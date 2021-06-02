<template>
  <div id="shop-item">
  <van-swipe-cell >
  <van-card
    :num="itemInfo.count"
    :price="itemInfo.price"
    :desc="itemInfo.desc"
    :title="itemInfo.title"
    class="goods-card"
    :thumb="itemInfo.picture"
    @click="itemClick()"
  />
</van-swipe-cell>
  </div>
</template>

<script>

  export default {
    name: "SearchListItem",
    components: {
    },
    data(){
      return {
        orderdata:{
          name:"",
          telephone:"",
          address:"",
          image:"",
          title:"",
          desc:"",
          price:"",
        }
      }
    },
    props:{
      itemInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      checkClick(){
        this.itemInfo.checked=!this.itemInfo.checked
      },
      itemClick(){
      this.$router.push('/detail/'+this.itemInfo.brand_id)
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    background-color: #fff;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
