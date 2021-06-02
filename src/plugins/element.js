import Vue from 'vue'
import ElementUI from 'element-ui'
import {Form,FormItem,Input,Message,Button,Upload} from 'element-ui'
//vue2.x缺少样式
import '../theme/element/index.css'


Vue.use(ElementUI)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Upload)

Vue.prototype.$message=Message
