import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
const Login = () => import('../views/login/Login')
const Register = () => import('../views/login/Register')
const Moment=()=>import('../views/moment/Moment')
const CreateMoment=()=>import('../views/moment/childComps/CreateMoment')
const DetailMoment=()=>import('../views/moment/childComps/DetailMoment')
const Message=()=>import('../views/profile/childComps/Message.vue')
const Order=()=>import('../views/order/Order.vue')
const Aboutour=()=>import('../views/profile/childComps/Aboutour.vue')
const MineOrder=()=>import('../views/profile/childComps/MineOrder.vue')
const Iphone=()=>import('../views/login/Iphone.vue')
const SuccessOrder=()=>import('../views/profile/childComps/successOrder.vue')
const overOrder=()=>import('../views/profile/childComps/overOrder.vue')
const VedioView=()=>import('../views/home/childComps/HomeVedioView.vue')
const FindPassword=()=>import('../views/login/findpassword.vue')
const Scan=()=>import('../views/home/childComps/scan.vue')
const ListFirst=()=>import('../views/home/childComps/listfirst.vue')
const ListSecond=()=>import('../views/home/childComps/listsecond.vue')
const ListThird=()=>import('../views/home/childComps/listthird.vue')
const ListFour=()=>import('../views/home/childComps/listfour.vue')
const ListFive=()=>import('../views/home/childComps/listfive.vue')
const DetailChat=()=>import('../views/detail/childComps/DetailChat.vue')


Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/moment',
    component: Moment
  },
  {
    path: '/detailcomment/:iid',
    component: DetailMoment
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path:'/message',
    component:Message
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path:'/createmoment',
    component:CreateMoment
  },
  {
    path:'/order',
    component:Order
  },
  {
    path:'/about',
    component:Aboutour


  },
  {
    path:'/mineorder',
    component:MineOrder
  },
  {
    path:'/iphone',
    component:Iphone
  },
  {
    path:'/successorder',
    component:SuccessOrder
  },
  {
    path:'/overorder',
    component:overOrder
  },
  {
    path:'/homevedio',
    component:VedioView
  },
  {
    path:'/findpassword',
    component:FindPassword
  },
  {
    path:'/scan',
    component:Scan
  },
  {
    path:'/listfirst',
    component:ListFirst
  },
  {
    path:'/listsecond',
    component:ListSecond
  },
  {
    path:'/listthird',
    component:ListThird
  },
  {
    path:'/listfour',
    component:ListFour
  },
  {
    path:'/listfive',
    component:ListFive
  },
  {
    path:'/detailchat',
    component:DetailChat
  }

]
const router = new Router({
  routes,
  mode: 'history',
  meta:{
    footShow:true,
  },
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to将要访问的路径、from代表从哪个路径跳转而来、next是一个函数表示放行
  if(to.path === '/message') {
    const tokenStr =  window.localStorage.getItem('token')
    if(!tokenStr){
      next('/login')
    }
  }
  if(to.path === '/createmoment') {
    const tokenStr =  window.localStorage.getItem('token')
    if(!tokenStr){
      next('/login')
    }
  }
  next()
})


export default router
 