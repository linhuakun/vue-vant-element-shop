


export default {
  ADD_COUNTER(state,product){
    product.count+=parseInt(product.add);
  },
  ADD_TO_CHAR(state,payload){
    payload.checked=true
    state.cartList.push(payload)
  },
  REMOVE_TO_DATA(state,id) {
    state.cartList.map((v, i) => {
      if (v.iid === id) {
        state.cartList.splice(i, 1) //删除
      }
    })
  },
  REMOVE_TO_ALL(state){
    state.cartList=[]
  }
}
