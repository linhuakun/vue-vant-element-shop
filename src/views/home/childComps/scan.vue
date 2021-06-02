<template>
  <div class="content">
    <NavBar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/home/back.svg" alt="" />
      </div>
      <div slot="center">扫描设备</div>
    </NavBar>
    <div class="Detail">
      <div id="code">
        <div
          style="width:100%;height:50vh; background-color: #000; margin: 15% auto 5%; text-align: center"
        ></div>
      </div>
      <p style="text-align: center">将二维码放入框内，即可自动扫描</p>
      <div style="text-align: center" class="sweep" @click="sweep">
        开始扫码
      </div>
      <!-- <div style="text-align: center" class="start" @click="next">识别失败，手动录入</div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "scan",
  components:{
    NavBar
  },
  methods:{
//创建
 plusReady () {
      const self = this
      // 获取窗口
      self.scan = new plus.barcode.Barcode('code')
      self.scan.onmarked = self.onmarked
    },
    // 开始扫码
    sweep () {
      const self = this
      self.scan.start()
    },
      async onmarked (type, result) {
      let t = this
      var text = '未知:'

      switch (type) {
        case plus.barcode.QR:
          type = 'QR'
          break
        case plus.barcode.EAN13:
          type = 'EAN13'
          break
        case plus.barcode.EAN8:
          type = 'EAN8'
          break
        default:
          type = '其他' + type
          break
      }
      result = result.replace(/\n/g, '')
      if (result.indexOf('http://') == 0 || result.indexOf('https://') == 0) {
        plus.nativeUI.confirm(result, function (i) {
          if (i.index == 0) {
            // self.back() // 返回上个页面
            plus.runtime.openURL(result)
            // console.log(result) // 扫出来的值
            t.scan.cancel();
            t.scan.close() //扫码成功后关闭扫码
            t.$router.push({path: 'Info', query: {id: result}})   // 跳转到对应的页面
          } else {
            // self.back() // 返回上个页面
            this.$message.success(result)
            t.scan.close();
            t.scan.cancel();
            window.localStorage.scan = result
            t.$router.push({path: 'Info', query: {id: result}})
          }
        }, '', ['打开', '取消'])
      } else {
        // self.back() // 返回上个页面
            let url = result
            let checkcode=url.split('=')
            const idcode=url.split('/')
            const iidcode=idcode[2].split('?')
            var form={}
            form.shopId=iidcode[0]
            form.checkshop=checkcode[1]
            const {data:res} =await this.$http.post('users/ischeckshop',form);
            if(res.message){
                this.$message.success('本平台正品');
            }else{
                this.$message.error('本平台盗版');
            }
      }
    },
    backClick(){
      this.$router.push('/home');
      this.scan.cancel();
      this.scan.close()
    }
  },
    activated () {
    const self = this
    if (window.plus) {
      self.plusReady()
    } else {
      document.addEventListener('plusready', self.plusReady, false)
    }

    document.addEventListener('DOMContentLoaded', function () {
      // alert('DOMLoaded')
      self.domready = true
      self.plusReady()
    }, false)

    setTimeout(function () {
      self.sweep() // 扫码函数
    }, 1000)
  },
};
</script>

<style scoped lang="less">
.content {
  background-color: #000;
  color: white;
  height: 100vh;
  overflow: hidden;
  header {
    background-color: #000;
    height: 2.00533rem;
    width: 100%;
    text-align: center;
    line-height: 2.00533rem;
    display: flex;
    /*position: fixed;*/
    top: 0;
    z-index: 99999;
    /deep/ .head_goback {
      padding-top: 0.1rem;
      width: 0.6rem;
      height: 0.8533rem;
      padding-left: 0.2rem;
    }
    /deep/ .title_head {
      width: 92%;
      text-align: center;
      color: white;
      font-size: 0.8533rem;
      letter-spacing: 2px;
    }
  }
  .Detail {
    width: 96%;
    height: 80vh;
    margin: 0 auto;
    .session {
      .name {
        margin: 0.4rem 0;
        font-size: 0.4rem;
        color: #333333;
        font-weight: bold;
      }
      .useTutorials {
        background-color: #3998f7;
        border-radius: 5px;
      }
      .desc {
        margin: 0.4rem 0;
        font-size: 0.4rem;
        color: #333333;
        .title {
          font-weight: bold;
        }
        .intro {
          margin-top: 0.1rem;
        }
      }
    }
    p {
      margin-top: 4rem;
      font-size: 0.72rem;
    }
    .sweep {
      text-align: center;
      margin: 0.1rem auto;
      width: 13.8667rem;
      height: 1.7067rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1.024rem;
      font-size: 0.768rem;
      position: relative;
      z-index: 9999;
      color: white;
      background: #ff8c99;
      box-shadow: 0px 6px 9px 0px rgba(255, 140, 153, 0.57);
      margin-top: 2rem;
    }
  }
  .start {
    text-align: center;
    margin: 0 auto;
    width: 13.8667rem;
    height: 1.7067rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.024rem;
    font-size: 0.768rem;
    background: white;
    border: 2px solid rgba(255, 169, 163, 1);
    color: rgba(255, 169, 163, 1);
    margin-top: 0.64rem;
  }
}
.nav-bar {
  background-color: #df3832;
  color: #fff;
  position: relative;
  width: 100%;
  /*font-weight: 700;*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top:0;*/
  /*z-index: 9;*/
}
.back {
  position: relative;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
