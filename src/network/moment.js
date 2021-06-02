import {
  request
} from "@/network/Axios";

export  function getMomentList(offset, size) {
  return request({
    url: '/moment',
    params: {
      offset,
      size,
    }
  })
}
