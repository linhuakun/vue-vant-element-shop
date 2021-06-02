<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">
    <div><img src="@/assets/img/cart/logo.jpg" alt="">{{goods.title}}</div>
    <div class="desc">{{goods.desc}}</div>
    </div>
    <div class="info-price">
      <span class="n-price">¥{{goods.newprice}}</span>
      <span class="o-price">{{goods.oldprice}}</span>
      <span class="discount">促销价</span>
    </div>
    <div class="info-other">
      <span>{{goods.sales}}</span>
      <span>{{goods.collect}}</span>
      <span>{{goods.delivertime}}</span>
    </div>
    <div class="info-service">
      <div class="info-service"><span>{{goods.smallLittle1}}</span></div>
      <div class="info-servicem"><span>{{goods.smallLittle2}}</span></div>
      <div class="info-servicem"><span>{{goods.smallLittle3}}</span></div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
    props: {
		  goods: {
		    type: Object,
        default(){
		      return []
        }
      }
    }
	}
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .desc{
    font-size: 13px;
    color: #fc5a5a;
        margin-top: 10px;
  }

  .info-title {
    color: #222;
    line-height: 25px;
  }

  .info-title img{
    height: 25px;
    width: 25px;
    vertical-align: middle;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: #fc5a5a;
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: #fc5a5a;
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }

  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }


  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

 

  .info-service span {
    font-size: 13px;
    color: rgba(54, 53, 53, 0.733);
  }
</style>
