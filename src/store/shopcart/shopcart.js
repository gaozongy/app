import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api";

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车的产品
    async deleteCartListBySkuId({commit}, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车产品的选中状态
    async UpdateCheckedById({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部选中的产品
    deleteAllCheckedCart({dispatch,getters}) {
        //context：小仓库，commit【提交mutations修改state】getters是【计算属性】dispatch【派发action】state【当前仓库数据】
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            PromiseAll.push(promise)
        })
        //Promise.all([p1,p2,p3]) p1|p2|p3:每一个都是Promise对象，如果有一个Promise失败，那都失败，全部成功，返回的结果才为成功
        //只要全部的p1|p2...都成功，返回的结果为成功
        //如果有一个失败，返回的即为失败
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise = dispatch('UpdateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}