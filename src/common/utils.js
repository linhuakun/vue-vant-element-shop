//防抖函数，减少请求次数
export function debounce(func,delay){
  let timer=null
  //...args多个参数 delay是延迟执行 但timer已经赋值 再次传入timer清空
  return function (...args){
    if(timer) clearTimeout(timer)

    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

//时间格式花
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    //正则表达式
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}


