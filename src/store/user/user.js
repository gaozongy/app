import {reqGetCode, reqUserRegister,reqUserLogin,reqUserInfo} from "@/api";
import {setToken,getToken} from "@/utils/token";
//登录与注册
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code) {
        state.code = code
    },
    USERLOGIN(state,token) {
        state.token = token
    },
    GETUSERINFO(state,userInfo) {
        state.userInfo = userInfo
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
            //用户已经登陆成功并且获取到token
            commit('USERLOGIN',result.data.token)
            //持久化存储token
            // localStorage.setItem('TOKEN',result.data.token)
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}) {
       let result = await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
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