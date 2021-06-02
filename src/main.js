import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
import request from '@/network/request';
import moment from 'moment'

moment.locale('zh-cn');



// import VDistpicker from 'v-distpicker'

// Vue.component('v-distpicker',VDistpicker)


// //放大图片
// import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
// import 'vue-directive-image-previewer/dist/assets/style.css'
// Vue.use(VueDirectiveImagePreviewer,{
//   zIndex: 9999,  //层级显示
//   innerWidth:'200px'
// }) 

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

//二维码扫描
import Mui from 'vue-awesome-mui'
Vue.use(Mui)

require('./plugins/element')
require('./plugins/mint')

//全局变量
import toast from'@/components/common/toast'
Vue.use(toast)

//公共请求头
Vue.prototype.$http=request;

Vue.config.productionTip = false
//挂载全局变量
Vue.prototype.$bus = new Vue()
Vue.prototype.$moment = moment;
//zidon

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})




Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.svg')
})

// 移动切换0.3秒延迟
FastClick.attach(document.body)



new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')




// 用于解决input输入框需要点击多次的问题，只发生在苹果手机
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

