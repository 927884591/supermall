//index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    //需要共享的变量放这里
    cartList:[]
  },
  mutations:{
  	//需要处理的变量都要经过这个，否则devtools工具无法监控
  	//这个会默认传一个state过来
      addcart(state,payload){
        
        let oldProduct = null
        for(let item of state.cartList){
            if(item.iid === payload.iid){
                oldProduct = item
            }
        }
        if(oldProduct){
            oldProduct.count += 1 
        }
        else{
            payload.count = 1
            state.cartList.push(payload)
        }
        
    }
	},
  actions:{
		
  },
  modules:{
    
  },
  getters:{
    //类似于computed属性，里面定义是一个函数，可以当作一个属性去使用
    //在这里写方法都会默认传两个参数过来state和getters本身
  }
})
export default store			//把vuex导出去