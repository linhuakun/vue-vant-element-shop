import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://47.108.153.30:8001/',
    timeout:15000
  })
  //拦截器赋值token
  instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
  })
  return instance(config)
}

//拦截



// instance.interceptors.request.use(config=>{
//   config.headers.Authorization=window.localStorage.getItem('token')
//   return config
// })
///http://152.136.185.210:8000/api/w6/category

// //拦截
// instance.interceptors.request.use(config=>{
//     console.log(config);
//     return config
//   },
//   err=>{
//     // console.log(err)
//   })
//
// instance.interceptors.request.use(res=>{
//   return res.get
// },err=>{
//   console.log(err);
// })
