import {debounce} from "@/common/utils";
import {POP, NEW, SELL} from "@/common/const";

export const itemListenerMixin={
  data(){
    return{
      itemImgListener:null,
    }
  },

  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,300) 
    this.itemImgListener=()=>{
        refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}
export const backTopMixin={
  data(){
    return{
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScoll(position){
      this.isShowBackTop=(-position.y)>1000
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
  }
}


export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
    }
  }
}

