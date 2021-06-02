<template>
  <div id="category">
    <NavBar class="nav-bar"><div slot="center">选酒</div></NavBar>
    <div class="headSearch">
      <div class="searchInput">
        <label for="text">
          <img
            v-if="this.iconisexit"
            src="@/assets/img/cartage/search-icon.svg"
            alt=""
          />
          <img
            v-if="!this.iconisexit"
            src="@/assets/img/cartage/backIcon.svg"
            @click="backicon()"
            alt=""
          />
        </label>
        <input
          type="text"
          id="text"
          placeholder="搜索你喜欢的酒吧！"
          v-on:input="inputFunc"
          value=""
        />
        <input
          type="button"
          class="btn"
          @click="submitcontent()"
          value="搜索"
        />
      </div>
    </div>
    <div class="item-categoty" v-if="this.isexit">
      <div @click="searchbaijiu()"><i class="item1"></i><span>白酒</span></div>
      <div @click="searchputaojiu()">
        <i class="item2"></i><span>葡萄酒</span>
      </div>
      <div @click="searchyangjiu()"><i class="item3"></i><span>洋酒</span></div>
      <div @click="searchzhengxianggou()">
        <i class="item4"></i><span>整箱购</span>
      </div>
      <div @click="searchlaojiu()"><i class="item5"></i><span>老酒</span></div>
      <div @click="searchqingcang()">
        <i class="item6"></i><span>清仓特卖</span>
      </div>
      <div @click="searchhaiwai()">
        <i class="item7"></i><span>海外直采</span>
      </div>
      <div @click="searchjingmei()">
        <i class="item8"></i><span>精美大坛</span>
      </div>
      <div @click="searchhongjiu()">
        <i class="item9"></i><span>红酒整箱</span>
      </div>
      <div @click="searchvalue()">
        <i class="item10"></i><span>值得买</span>
      </div>
      <div @click="searchxiaoliang()">
        <i class="item11"></i><span>销量排行</span>
      </div>
      <div @click="searchlishang()">
        <i class="item12"></i><span>礼尚往来</span>
      </div>
    </div>
    <SearchList :list="this.list" v-if="!this.isexit"></SearchList>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import SearchList from "@/views/category/childComps/SearchList.vue";

export default {
  name: "Category",
  components: {
    NavBar,
    SearchList
  },
  //  mixins:[tabControlMixin,itemListenerMixin],
  data() {
    return {
      categoryData: {},
      currentIndex: -1,
      categories: [],
      saveY: 0,
      list: [],
      isexit: true,
      iconisexit: true,
      submitdata: {
        key: ""
      },
      listexit: true,
      clientHeight: document.documentElement.clientHeight
    };
  },
  computed: {},
  methods: {
    backicon() {
      var dataicon = document.getElementById("text");
      dataicon.value = "";
      this.iconisexit = true;
      this.isexit = true;
    },
    searchlishang() {
      var odata = document.getElementById("text");
      odata.value = "酒";
      this.submitcontent();
    },
    searchxiaoliang() {
      var odata = document.getElementById("text");
      odata.value = "酒";
      this.submitcontent();
    },
    searchvalue() {
      var odata = document.getElementById("text");
      odata.value = "酒";
      this.submitcontent();
    },
    searchhongjiu() {
      var odata = document.getElementById("text");
      odata.value = "红酒";
      this.submitcontent();
    },
    searchjingmei() {
      var odata = document.getElementById("text");
      odata.value = "酒";
      this.submitcontent();
    },
    searchhaiwai() {
      var odata = document.getElementById("text");
      odata.value = "洋酒";
      this.submitcontent();
    },
    searchqingcang() {
      var odata = document.getElementById("text");
      odata.value = "酒";
      this.submitcontent();
    },
    searchlaojiu() {
      var odata = document.getElementById("text");
      odata.value = "老酒";
      this.submitcontent();
    },
    searchzhengxianggou() {
      var odata = document.getElementById("text");
      odata.value = "酒";
      this.submitcontent();
    },
    searchyangjiu() {
      var odata = document.getElementById("text");
      odata.value = "洋酒";
      this.submitcontent();
    },
    searchputaojiu() {
      var odata = document.getElementById("text");
      odata.value = "葡萄酒";
      this.submitcontent();
    },
    searchbaijiu() {
      var odata = document.getElementById("text");
      odata.value = "白酒";
      this.submitcontent();
    },
    //监听键盘输入
    inputFunc() {
      var data = document.getElementById("text").value;
      if (data == "") {
        this.isexit = true;
        this.submitdata.key = "";
        this.iconisexit = true;
      } else {
        this.iconisexit = false;
      }
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      //判断当前哪个图片加载监听
      this.$bus.$off("itemImgLoad", this.itemImgListener);
    },
    async submitcontent() {
      this.iconisexit = false;
      //获取input中的值
      this.submitdata.key = document.getElementById("text").value; // 输出值
      if (this.submitdata.key === "") {
      } else {
        try {
          const res = await this.$http.post("/search/getdata", this.submitdata);
          this.list = res.data;
          this.isexit = false;
          if (this.list.length == 0) {
            this.$message.success("可尝试关键词酒、洋酒、白酒等");
          }
        } catch (err) {
          this.$message.success("搜索失败");
        }
      }
    }
  },
  mounted() {
    var n = navigator.userAgent;
    if (n.indexOf("iPhone") <= -1) {
      window.onresize = () => {
        if (location.pathname == "/category") {
          if (this.clientHeight > document.documentElement.clientHeight) {
            // 隐藏按钮
            this.$bus.$emit("isShowTabbar", false);
          } else {
            // 显示按钮
            this.$bus.$emit("isShowTabbar", true);
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: #df3832;
  color: #fff;
}

.headSearch {
  background-color: #fafafa;
  position: relative;
  z-index: 100;
  overflow: hidden;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e4e4e4;
}

.headSearch .searchInput {
  display: inline-block;
  width: 90%;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  text-align: center;
  height: 32px;
  font-size: 12px;
  color: #333;
  line-height: 28px;
  border: none;
  background-color: #ececec;
  border-radius: 5px;
  padding: 0 30px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.headSearch .searchInput label {
  display: inline-block;
  background-size: 120px 40px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  left: 8px;
  top: 6px;
}

.headSearch .searchInput label img {
  position: relative;
  width: 16px;
  height: 16px;
}

.headSearch .searchInput .btn {
  display: inline-block;
  cursor: pointer;
  line-height: 32px;
  height: 32px;
  width: 30px;
  position: absolute;
  right: 10px;
  color: #333;
}

.headSearch .searchInput input {
  display: inline-block;
  width: 100%;
  position: relative;
  transform: translate(0, -50%);
  top: 50%;
  height: 28px;
  font-size: 12px;
  color: #333;
  line-height: 28px;
  border: none;
  background-color: #ececec;
  border-radius: 5px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.headSearch .searchInput input:focus {
  background-color: #ececec;
}

.item-categoty {
  display: flex;
  flex-wrap: wrap;
  height: 246px;
  width: 100%;
}

.item-categoty div .item1 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png") no-repeat;
}
.item-categoty div .item2 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png") -84px 0 no-repeat;
}
.item-categoty div .item3 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png") -165px 0 no-repeat;
}
.item-categoty div .item4 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png") 0 -70px no-repeat;
}
.item-categoty div .item5 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png") -84px -70px
    no-repeat;
}

.item-categoty div .item6 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png") -165px -70px
    no-repeat;
}
.item-categoty div .item7 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png") 0 -140px no-repeat;
}
.item-categoty div .item8 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png")-84px -140px no-repeat;
}
.item-categoty div .item9 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png")-165px -140px no-repeat;
}
.item-categoty div .item10 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background: url("../../assets/img/cartage/selectIcon0314.png") 0 -210px no-repeat;
}
.item-categoty div .item11 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background-position: 0 0;
  background: url("../../assets/img/cartage/selectIcon0314.png") -84px -210px
    no-repeat;
}
.item-categoty div .item12 {
  display: block;
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background-position: 0 0;
  background: url("../../assets/img/cartage/selectIcon0314.png") -165px -210px
    no-repeat;
}

.item-categoty div span {
  display: block;
  text-align: center;
  color: #333;
  text-align: center;
}

.item-categoty div {
  height: 81px;
  width: 33.33333333%;
  background-color: #fff;
}
</style>
