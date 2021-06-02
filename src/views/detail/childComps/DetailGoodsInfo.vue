<template>
  <div v-if="detailInfo.length !== 0" class="goods-info" >
    <div class="info-desc clear-fix">
      <!-- <div class="start">
        商品特点
      </div> -->
      <div class="desc">商品特点</div>
      <div class="end"></div>
    </div>
    <!-- <div class="info-key">{{detailInfo.detailImage[0].key}}</div> -->
    <div class="info-list">
      <img v-for="(item, index) in detailInfo" :key="index" :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Array
      }
    },
    data(){
		  return{
		    rounter:0,
        imagesLength:0,
      }
    },
    methods: {
      imgLoad() {
        this.$emit('detailImageload')
      }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 5px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  /* .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  } */

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    height: 24px;
    line-height: 24px;
    background: url('../../../assets/img/detail/text-bg.png') 0 0 repeat-x;
    padding: 0 5px;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list {
    display: block;
  }

  .info-list img {
    width: 100%;
  }
</style>
