//当前模块是对api进行统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'
 
//三级联动接口
//请求地址：/api/product/getBaseCategoryList  请求方式：get   无参数
//发请求:axios发送请求返回的结果是promise对象

export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})//是下面的简化写法


// export const reqCategoryList = () => {
//     //发请求:axios发送请求返回的结果是promise对象
//     return requests({url: '/product/getBaseCategoryList', method: 'get'})
// }

//获取banner首页轮播图接口
export const reqGetBannerList = ()=>mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')

//获取搜索模块的数据 地址：/api/list    请求方式：post   参数：请求要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "
*/
//此接口给服务器传递默认参数params，至少是一个空对象，不然请求会失败
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

//获取产品详情接口 地址：/api/item/{ skuId }   请求方式：get   参数：请求要带id参数
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})
