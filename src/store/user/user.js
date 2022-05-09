import {reqGetCode, reqUserRegister,reqUserLogin} from "@/api";
//登录与注册
const state = {
    code:'',
    token:''
}
const mutations = {
    GETCODE(state,code) {
        state.code = code
    },
    USERLOGIN(state,token) {
        state.token = token
    }
}
const actions = {
    //获取验证码
    async getCode({commit},phone) {
        let result = await reqGetCode(phone)
        if (result.code==200) {
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({commit},user) {
        let result = await reqUserRegister(user)
        if(result.code==200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务
    async userLogin({commit},data) {
        let result = await reqUserLogin(data)
        //服务器下发的token是用户的唯一标识，拿着token去找服务器要用户名密码
        if(result.code==200) {
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}