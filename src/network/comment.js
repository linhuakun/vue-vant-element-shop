import {
  request
} from "@/network/Axios";

export function getComment(id){
  return request({
    url:'/moment/'+id,
  }) 
}

export function getAllCommnet(momentId){
  return request({
    url:'/comment',
    params:{
      momentId
    }
  }) 
}
