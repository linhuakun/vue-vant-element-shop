<template>
  <div id="shop-item" v-if="isexit">
    <van-swipe-cell>
      <van-card
        :num="itemInfo.count"
        :price="itemInfo.price"
        :desc="itemInfo.detail"
        :title="itemInfo.title"
        class="goods-card"
        :thumb="itemInfo.picture"
      >
        <template #tags>
          <van-tag plain type="danger"
            >收货地址:{{ itemInfo.province }}{{ itemInfo.city
            }}{{ itemInfo.area }}{{ itemInfo.address }}</van-tag
          >
          <van-tag plain type="danger">收货人:{{ itemInfo.name }}</van-tag>
          <van-tag plain type="danger"
            >电话号码:{{ itemInfo.telephone }}</van-tag
          >
          <van-tag plain type="primary">货物状态:{{ isemit() }}</van-tag>
        </template>
      </van-card>
      <template #right>
        <van-button
          square
          text="确认收货"
          type="primary"
          class="delete-button"
          @click="confirm()"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>
<script>
export default {
  name: "successOrderListItem",
  components: {},
  data() {
    return {
      isexit: true,
    };
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created(){
  },
  computed: {},
  methods: {
    async confirm() {
      try {
        await this.$http.post("/order/confirm/" + this.itemInfo.id);
        this.isexit = false;
        this.$message.success("收货成功");
      } catch (err) {
        this.$message.error("收货失败");
      }
    },
    isemit() {
      if (this.itemInfo.isemit == "1") {
        this.isexit = false;
        return "未发货";
      } else if(this.itemInfo.isemit == "3"){
        this.isexit = false;
        return "已完成";
      } else {
        return "发货";
      }
    }
  }
};
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
</style>
