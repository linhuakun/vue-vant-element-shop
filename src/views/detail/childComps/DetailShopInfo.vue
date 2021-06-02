<template>
  <div class="shop-info">
    <div class="shop-top">
      <div class="left item">
        <ul>
          <li>香型</li>
          <li>酒精度</li>
          <li>产地</li>
          <li>净含量</li>
          <li>原料</li>
          <li>箱规</li>
        </ul>
      </div>
      <div class="right item">
        <ul>
          <li>{{shop.type}}</li>
          <li>{{shop.height}}</li>
          <li>{{shop.productArea}}</li>
          <li>{{shop.storeTip}}</li>          
          <li>{{shop.detailTip}}</li>          
          <li>{{shop.boxHeight}}</li>
        </ul>
      </div>
    </div>
          <!-- // <div><span>香型</span><div class="title">{{shop.type}}</div></div>
      // <div><span>酒精度</span><div class="title">{{shop.height}}</div></div>
      // <div><span>产地</span><div class="title">{{shop.productArea}}</div></div>
      // <div><span>净含量</span><div class="title">{{shop.storeTip}}</div></div>
      // <div><span>原料</span><div class="title">{{shop.detailTip}}</div></div>
      // <div>
      // <span>箱规</span><div class="title">{{shop.boxHeight}}</div></div> -->
  </div>
</template>


<script>
	export default {
		name: "DetailShopInfo",
    props: {
		  shop: {
		    type: Object,
        default(){
		      return []
        }
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    }
	}
</script>

<style scoped>
  .shop-info {
    padding: 25px 20px 20px;
    height: 200px;
    width: 100%;
    border-bottom: 5px solid #f2f5f8;
  }

  .shop-top {
    line-height: 25px;
    /* 让元素垂直中心对齐 */
    justify-content: space-between;
    display: flex;
  }
  .shop-info .shop-top .left{
    height: 200px;
    width: 25%;
  }

  .shop-info .shop-top .right{
    height: 200px;
    width: 65%;
  }

    .shop-info .shop-top .right ul li{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #252525;
    }

  .shop-info .title{
    margin-left: 70px;
    display: inline;
    color: #252525;
    width: 70%;
    font-size: 15px;
  }

</style>
