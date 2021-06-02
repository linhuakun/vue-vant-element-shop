<template>
  <div>
    <NavBar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <div slot="center" class="title">发表动态</div>
      <el-button slot="right" class="emittitle" type="primary" :disabled="this.isbtn"  @click="createmoment">发布</el-button>
      <!-- <button slot="right" class="emittitle" @click="createmoment"> -->
        <!-- 发布
      </button> -->
    </NavBar>
    <!-- 动态内容 -->
    <el-form
      ref="createmoment"
      label-width="0px"
      :model="moment"
      :rules="momentRules"
      preview-image:true
    >
      <el-form-item prop="content" class="textarea">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="输入你此刻的想法~"
          v-model="moment.content"
        >
        </el-input>
      </el-form-item>
      <!-- 图片上传部分 -->
      <van-uploader
        :after-read="afterRead"
        preview-size="60px"
        v-model="fileList"
        :max-count="3"
        :deletable="false"
        :multiple="true"
        accept="image/png,image/jpeg,image/jpg,image/svg,image/gif"
      >
      </van-uploader>
    </el-form>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import { createMoment1, createMoment2 } from "@/network/createMoment.js";
export default {
  name: "CreateMoment",
  components: {
    NavBar
  },
  data() {
    return {
      moment: {
        content: "",
        formdata: ""
      },
      momentRules: {
        //验证用户名是否合法
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 5,
            max: 100,
            message: "长度在 5 到 100 个字符",
            trigger: "blur"
          }
        ]
      },
      fileList: [],
      isbtn:false
    };
  },
  created() {
    this.formdata = new FormData();
    this.isbtn=false;
  },
  mounted(){
  },
  methods: {
    backClick() {
      this.$router.push("/moment");
    },
    createmoment() {
      this.$refs.createmoment.validate(async valid => {
        //判断是否符号输入条件
        if (!valid) return;
        //向服务器发送内容并且获取本次内容对应id好
        this.isbtn=true;
        const { data: res } = await createMoment1(this.moment);
        //当插入成功，上传图片文件
        if (res.insertId != 0)
          this.url = "/upload/" + res.insertId + "/picture";
        //上传文件
        try {
          await createMoment2(this.url, this.formdata);
          //向动态发送一个事件监听，让动态页面自动刷新新数据
          this.$bus.$emit("createmoment");
          this.$message.success("发表成功");
          //跳转～
          this.$router.push("/moment");
        } catch (err) {this.$message.success("发表失败");}
      });
    },
    // 创建formdata实例对象，把文件存储在formdata中
    async afterRead(file) {
      // console.log(file);
      //    this.formdata.append("picture",file.file);
      // this.avatarexit = false;
    if (file instanceof Array && file.length) { // 判断是否是多图上传 多图则循环添加进去
     file.forEach(item => {
       this.formdata.append("picture", item.file)//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
     })
     } else {
     this.formdata.append("picture", file.file)
      }
    }
    //删除图片等技术娴熟再做
    // async remove(file){

    //   this.fileList.forEach((item)=>{
    //     console(file.file.lastModifiedDate)
    //     console.log(item.file.lastModifiedDate);
    //     if(file.file.lastModifiedDate==item.file.lastModifiedDate){
    //       console.log(1);
    //     }
    //   })
    //   resolve()
    // }
  }
};
</script>

<style scoped>
.textarea{
  margin-top:5px;
  border-bottom: 20px solid #f5f5f5;
}

.nav-bar {
  background-color: #df3832;
  font-weight: 500px;
  color: #fff;
}
.el-textarea >>> .el-textarea__inner{
  border: 1px solid transparent;

}
.van-uploader >>> .van-uploader__upload {
  height: 100px !important;
  width: 100px !important;
}

.van-uploader >>> .van-uploader__preview-image {
    height: 100px !important;
  width: 100px !important;
}

.el-textarea__inner:focus{
  border-color:none !important;
}
input.invalid:focus{
  border-color:none !important;
}
.emittitle{
  color:#f5f5f5;
  z-index: 999999;
  position: relative;
  right: 12px;
  bottom:1px;
}

.el-button--primary.is-disabled{
  background-color:#df3832;
  border-color:#df3832
}

.back {
  position: relative;
  width: 30px;
  height: 30px;
  left:10px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
