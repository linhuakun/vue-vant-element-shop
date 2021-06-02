import {
    request
} from './Axios.js'

export function createMoment1(content){
    return request({
        url:'/moment',
        data:content,
        method:"post",
    })
} 

export  function createMoment2(url,content){
    return request({
        url:url,
        data:content,
        method:"post",
    })
} 