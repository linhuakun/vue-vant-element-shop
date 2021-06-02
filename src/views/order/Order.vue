<template>
  <div class="order">
    <NavBar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <div slot="center" >填写订单</div>
    </NavBar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @pullingDown="pullingDown"
    >
      <div class="order_box">
        <!-- 登陆区域 -->
        <el-form
          ref="orderFormRef"
          label-width="0px"
          :model="orderForm"
          :rules="orderFormRules"
        >
          <el-form-item prop="name">
            <el-input
              placeholder="请输入用户名"
              v-model="orderForm.name"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>

          <el-form-item prop="telephone">
            <el-input
              placeholder="请输入电话号码"
              v-model="orderForm.telephone"
              prefix-icon="el-icon-phone"
            ></el-input>
          </el-form-item>

          <VDistpicker  :city="orderForm.city" :area="orderForm.area" :province="orderForm.province"  @area="onChangeArea" @province="onChangeProvince" @city="onChangeCity"></VDistpicker>

          <el-form-item prop="address">
            <el-input
            class="last-input"
              placeholder="请输入详细地址"
              v-model="orderForm.address"
              prefix-icon="el-icon-s-goods"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <OredertList class="shop-list"></OredertList>
      <div class="method">
          <div class="wrap">
           <div class="header">
              <div>支付方式</div>
              <div><i></i> 在线支付</div>
              <div><i></i> 货到付款</div>
          </div>
          <div class="footer">
              <div>发票信息</div>
              <div>不需要发表</div>
          </div>
          </div>
      </div>
    </scroll>
    <div v-show="isShow" class="bottom">
      <OrderBottom  @order="order"></OrderBottom>
    </div>
  </div>
</template>

<script>
import OredertList from "@/views/order/childComps/OrderList";
import OrderBottom from "@/views/order/childComps/OrderBottom";
import Scroll from "@/components/common/Scroll/Scroll";

import NavBar from "@/components/common/navbar/NavBar";
import VDistpicker from 'v-distpicker';

import { mapGetters } from "vuex";


export default {
  name: "Order",
  components: {
    OrderBottom,
    NavBar,
    OredertList,
    Scroll,
    VDistpicker
  },
  data() {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        // 引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    return {
            clientHeight: document.documentElement.clientHeight,
      isShow:true,
      listdata:[],
      orderForm: {
        user_id:"",
        name: "",
        telephone: "",
        province:"",
        city:"",
        area:"",
        address: "",
        picture:"",
        title:"",
        detail:"",
        price:"",
      },
      orderFormRules: {
        //验证用户名是否合法
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 11, message: "长度在 2 到 11 个字符", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkphone, trigger: "blur" }
        ],
        //验证密码是否合法
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "长度在 3 到 6 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    })
  },
  methods: {
    backClick() {
      this.$router.push("/cart");
    },
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
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
      order() {
       this.$refs.orderFormRef.validate( async valid => {
        if (!valid) return;
        this.listdata=this.$store.state.cartList
        try{
            for(var item in this.listdata){
            this.orderForm.picture=this.listdata[item].image
            this.orderForm.title=this.listdata[item].title
            this.orderForm.detail=this.listdata[item].desc
            this.orderForm.price=this.listdata[item].price
            this.orderForm.count=this.listdata[item].count
            await this.$http.post('/order/bookorder',this.orderForm);
        }
        this.$message.success("下单成功")
        this.$store.commit('REMOVE_TO_ALL')
        this.$bus.$emit('clearcartlist')
        this.$router.push('/cart')
        }catch(err){
          this.$message.error('下单失败')
        }
       });
    },
    onChangeProvince(data) {
      this.orderForm.province = data.value
    },
    onChangeCity(data) {
      this.orderForm.city = data.value
    },
    onChangeArea(data){
      this.orderForm.area=data.value
    }
  },
  mounted(){
  this.orderForm.user_id = window.localStorage.getItem("userId");
  const olabel=document.getElementsByTagName('select');
   olabel[0].style.fontSize='8px';
   olabel[1].style.fontSize='8px';
   olabel[2].style.fontSize='8px';
    var n = navigator.userAgent;
    if (n.indexOf("iPhone") <= -1) {
      window.onresize = () => {
        const ocontent = document.getElementsByClassName('content')[0];
        if (location.pathname == "/order") {
          if (this.clientHeight > document.documentElement.clientHeight) {
            // 隐藏按钮
            this.isShow=false;
            ocontent.style.bottom=0;
          } else {
            // 显示按钮
           this.isShow=true;
           ocontent.style.bottom='44px';
          }
        }
      };
    }
  }
};

</script>

<style scoped>
.shop-list{
  position: relative;
  z-index: 99999;

}
.order_box {
  margin-top: 10px;
}

.order {
  background-color: #f5f5f5;
}
.last-input{
  margin-top:20px ;
}

i{
    background-position: -15px -1px;
    background-color: #fc5a5a;
    border: 1px solid #fc5a5a;
    display: inline-block;
    width: 13px;
    height: 13px;
    border: 1px solid #aaa;
    border-radius: 50%;
    position: absolute;
    top:50%;
    transform: translate(0,-50%);
    left:85px;
}

.wrap{
     width: 80%;
     margin: 0 auto;
}

.method{
    margin-top:20px;
    height: 80px;
    width: 100%;
    background-color: #fff;
}

.method .header{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    line-height: 28px;
    position: relative;
}

.method .footer{
    margin-top: 10px;
    justify-content: space-between;
    display: flex;
    font-size: 14px;
    color: #666;
    line-height: 28px;
}



.back {
  position: relative;
  width: 30px;
  height: 30px;
  left:10px;
  top: 50%;
  transform: translate(0, -50%);
}

.bottom{
  height: 44px;
  position: fixed !important;
  z-index: 99 !important;
  bottom:0;
  width: 100%;
}

.distpicker-address-wrapper{
  display: flex;
  justify-content: space-between;
}

.nav-bar{
  font-weight: 700;
   background-color:#df3832;
  color: #fff;
}

.content{
  left: 0;
  right: 0;
  top:44px;
  bottom: 44px;
  z-index: 99999 !important;
  overflow: hidden;
  position: absolute;
}

</style>
