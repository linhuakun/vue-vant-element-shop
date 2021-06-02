<template>
  <div class="detail">
    <DetailNewBar id="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @pullingDown="pullingDown"
      @scrollw="totalScroll"
    >
      <DetailSwiper :top-images="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailCommentInfo ref="comment" :comment-info="commentInfo" />
      <DetailGoodsInfo
        ref="shopDetail"
        :detail-info="detailInfo"
        @detailImageload="detailImageload"
      />
      <DetailParamInfo ref="Tip" />
    </scroll>
    <detail-bottom-bar id="bottom-nav" />
    <detail-bottom-bar
      class="bottom-nav"
      @addToCart="selectshop"
      @bugthing="selectshop"
    />
    <van-sku
      v-model="skushow"
      :sku="sku"
      :goods="this.good"
      :goods-id="goods_id"
      :message-config="messageConfig"
      @add-cart="addToCart"
      @buy-clicked="bugthing"
      v-if="this.skuisexit"
      ref="sukRef"
    />
    <back-top class="backup" @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNewBar from "@/views/detail/childComps/DetailNewBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import backTop from "@/components/content/backTop/backTop";
import scroll from "@/components/common/Scroll/Scroll";

import { itemListenerMixin, backTopMixin } from "@/common/mixin";
import { debounce } from "@/common/utils";

import { getDetail } from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DetailNewBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    backTop,
    scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      skuisexit: true,
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: [],
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: "",
      show: false,
      skushow: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "规格", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "醇香", // skuValueName：规格值名称
                imgUrl: "", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "" // 用于预览显示的规格类目图片
              },
              {
                id: "2",
                name: "经典",
                imgUrl: "",
                previewImgUrl: ""
              }
            ],
            largeImageMode: true //  是否展示大图模式
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 1314520, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
            goods_id: 946755,
            price: "",
            stock_num: 999 //库存
          },
          {
            id: 1314521, // skuId
            s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
            goods_id: 946755,
            stock_num: 999
          }
        ],
        price: "", // 默认价格（单位元）
        stock_num: 999, // 商品总库存
        collection_id: 1314520, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "1", // 是否必填 '1' 表示必填
            placeholder: "" // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      good: {
        // 默认商品 sku 缩略图
        picture: ""
      },
      goods_id: "1314520",
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: "1",
        // 初始选中数量
        selectedNum: 1
        // 初始选中的商品属性
        // 键：属性id
        // 值：属性值id列表
      },
      messageConfig: {
        initialMessages: {
          留言: "留言信息"
        }
      }
    };
  },
  created() {
    //   //home主页传入id
    this.iid = this.$route.params.id;
    //   //数据的展示
    getDetail(this.iid).then(res => {
      const data = res.data.data;
      //     //轮播图的切换
      this.topImages = data.topBanner;
      this.good.picture = this.topImages[0];

      this.sku.tree[0].v[0].imgUrl = this.topImages[0];
      this.sku.tree[0].v[0].previewImgUrl = this.topImages[0];
      this.sku.tree[0].v[1].imgUrl = this.topImages[1];
      this.sku.tree[0].v[1].previewImgUrl = this.topImages[1];
      //     //商品介绍
      this.goods = data.shopMessage;
      this.sku.list[0].price = parseInt(this.goods.newprice) * 100;
      this.sku.list[1].price = parseInt(this.goods.newprice) * 100;
      this.sku.price = parseInt(this.goods.newprice);
      //     //店铺名的展示
      this.shop = data.content;
      //     //穿着展示
      this.detailInfo = data.special;
      //     //商品推荐的展示
      // this.paramInfo = data.special
      this.commentInfo = data.comment;
      // 导航栏点击切换
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.shopDetail.$el.offsetTop);
        this.themeTopYs.push(this.$refs.Tip.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      }, 500);
    });
  },
  mounted() {
      
  },
  destroyed() {
    //无keep-live时activated无法使用
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    //上拉图片加载
    detailImageload() {
      this.itemImgListener();
      this.getThemeTopY();
    },
    //导航栏点击切换
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    loadMore() {
      // this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh();
    },
    pullingDown() {
      this.pullingdown = true;
      setTimeout(() => {
        this.pullingdown = false;
        this.$refs.scroll.finishPullDown();
      }, 0);
    },
    //位置移动时导航栏跟着移动
    positionScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    //mixin混入回退顶部的按钮
    totalScroll(position) {
      this.positionScroll(position);
      this.contentScoll(position);
    },

    selectshop() {
      this.skushow = true;
    },

    //加入购物车
    addToCart() {
      this.skushow = true;
      //获取购物车需要展示的东西
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newprice;
      product.iid = this.iid;
      var ovanstepperinput = document.getElementsByClassName(
        "van-stepper__input"
      )[0];
      var n = ovanstepperinput.getAttribute("aria-valuenow");
      product.add = parseInt(n);
      this.$store.dispatch("addCart", product).then(res => {
        this.$toast.show(res, 2000);
        this.skushow = false;
        this.skuisexit = false;
        this.skuisexit = true;
      });
    },
    bugthing() {
      this.skushow = true;
      //获取购物车需要展示的东西
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newprice;
      product.iid = this.iid;      
      var ovanstepperinput = document.getElementsByClassName(
        "van-stepper__input"
      )[0];
      var n = ovanstepperinput.getAttribute("aria-valuenow");
      product.add = parseInt(n);
      this.$store.dispatch("addCart", product).then(res => {
        this.$toast.show(res, 2000);
        this.skushow = false;
        this.skuisexit = false;
        this.skuisexit = true;
        this.$router.push("/cart");
      });
    }
  }
};
</script>

<style scoped>
.sku {
  position: relative;
  z-index: 9999;
  height: 300px;
  width: 300px;
  background-color: #f00;
}
.detail {
  background-color: #ffffff;
  height: 100vh;
  position: relative;
}
#detail-nav {
  background-color: #df3832;
  color: #fff;
}
.content {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 58px;
  overflow: hidden;
  position: absolute;
}
.backup {
  z-index: 9;
}
</style>
