import {request} from "@/network/Axios";

export function getHomeGoods(type,page){
  return request({
    url:'/data',
    params:{
      type,
      page
    }
  })
}
