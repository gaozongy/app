//当前模块是对api进行统一管理
import requests from "./request";

//三级联动接口
//请求地址：/api/product/getBaseCategoryList  请求方式：get   无参数
//发请求:axios发送请求返回的结果是promise对象

export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})//是下面的简化写法


// export const reqCategoryList = () => {
//     //发请求:axios发送请求返回的结果是promise对象
//     return requests({url: '/product/getBaseCategoryList', method: 'get'})
// }