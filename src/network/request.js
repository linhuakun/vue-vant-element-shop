
import axios from 'axios'

axios.defaults.baseURL='http://47.108.153.30:8001/'
axios.defaults.timeout=15000

axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.localStorage.getItem('token')
  return config
})

export default axios;