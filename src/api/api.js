import request from './request'
import {get,post,del} from './request'
import qs from 'qs'

//获取城市列表
export const getCityList = data => {
	return request({
		url:'/v1/cities?type=group',
		methods:'get'
	})
}

//获取热门城市
export const getHotCity = data => {
	return request({
		url:'/v1/cities?type=hot',
		methods:'get'
	})
}

//搜索城市
export const serachNowCity = (id,data) => {
	console.log(id,data)
	return request({
		url:'/v1/pois',
		methods:'get',
		params:{
			city_id:id,
			keyword:data
		}
	})
}

//食品分类
export const foolMenu = () => {
	return request({
		url:'https://elm.cangdu.org/v2/index_entry',
		methods:'get'
	})
}



//商铺数据
export const shopInfoList = (id) =>{
	return request({
		url:'/shopping/restaurant/' + id,
		methods:'get'
	})
}

//食品详情
export const shopMeanList = (id) => {
	return request({
		 url:'/shopping/v2/menu',
		 methods:'get',
		 params:{
			 restaurant_id:id
		 }
	})
}

//商家评论详情
export const shopScoreList = (id) => {
	return request({
		url:`/ugc/v2/restaurants/${id}/ratings`,
		methods:'get',
		params:{
			restaurant_id:id,
			offset:0,
			limit:10
		}
	})
}

//商家评论分数
export const shopScore = (id) => {
	return request({
		url:`/ugc/v2/restaurants/${id}/ratings/scores`,
		methods:'get'
	})
}

//获取评价分类
export const shopPjFl = (id) => {
	return request({
		url:`/ugc/v2/restaurants/${id}/ratings/tags`,
		methods:'get'
	})
}

//加入购物车
export const joinShop = (id,geohash,shopData) => {
	return request({
		url:'v1/carts/checkout',
		methods:'post',
		params:{
			restaurant_id : id,
			geohash:geohash,
			entities:shopData
		}
	})
}

//获取备注信息
export const remarkInfo = () => {
	return request({
		url:'v1/carts/1/remarks',
		methods:'get'
	})
}

//获取图片验证码
export const imgCode = () => {
	return post('https://elm.cangdu.org/v1/captchas')
}

//获取用户信息
export const userInfo = () => {
	return request({
		url:'v1/user',
		methods:'get'
	})
}

//登录
export const userLogin = (username,password,captcha_code) => {
	return post('https://elm.cangdu.org/v2/login',{
		username:username,
		password:password,
		captcha_code:captcha_code
	})
}

//退出登录
export const exitLogin = () => {
	return get('https://elm.cangdu.org/v2/signout')
}

//获取收货列表
export const deliAddress = (id) => {
	return get('https://elm.cangdu.org/v1/users/' + id + '/addresses')
}

//增加收货地址
export const addDeliAddress = (id) => {
	return post('https://elm.cangdu.org/v1/users/'+ id + '/addresses')
}

//收货地址内部搜索
export const searchAddress = (city_id,keyword) => {
	return get('https://elm.cangdu.org/v1/pois',{
		'city_id':city_id,
		'keyword':keyword
	})
}

//保存用户填写的收货地址
export const saveAddress = (user_id,address,address_detail,geohash,name,phone,tag,sex,phone_bk,tag_type) => {
	return post('https://elm.cangdu.org/v1/users/' + user_id + '/addresses',{
		user_id,
		address,
		address_detail,
		geohash,
		name,
		phone,
		tag,
		sex,
		phone_bk,
		tag_type
	})
}

//删除收货地址
export const removeAddress = (user_id,address_id) => {
	return del('https://elm.cangdu.org/v1/users/' + user_id + '/addresses/' + address_id)
}

//下单
export const addOrders = (user_id,cart_id,address_id,restaurant_id,description,entities) => {
	return post('https://elm.cangdu.org/v1/users/' + user_id + '/carts/' + cart_id + '/orders',{
		user_id,
		cart_id,
		address_id,
		restaurant_id,
		description,
		entities
	})
}

//根据经纬度详细定位
export const indexGeohash = (geohash) => {
	return get('https://elm.cangdu.org/v2/pois/' + geohash)
}

//搜索店铺
export const searchShop = (geohash,keyword) => {
	return get('https://elm.cangdu.org/v4/restaurants',{
		geohash,
		keyword
	})
}

//订单列表
export const userOrder = (user_id,offset) => {
	return get('https://elm.cangdu.org/bos/v2/users/' + user_id + '/orders',{
		limit:10,
		offset
	})
}

//订单详情
export const orderDetailData = (user_id,order_id) => {
	return get('https://elm.cangdu.org/bos/v1/users/' + user_id + '/orders/' + order_id + '/snapshot')
}

//可用红包
export const hongbaoData = (user_id,limit) => {
	return get('https://elm.cangdu.org/promotion/v2/users/' + user_id + '/hongbaos',{
		limit
	})
}

//过期红包
export const expiredhbData = (user_id,limit) => {
	return get('https://elm.cangdu.org/promotion/v2/users/' + user_id + '/expired_hongbaos',{
		limit
	})
}

//更改用户头像
export const changeUserImg = (id,data) => {
	return post('https://elm.cangdu.org/eus/v1/users/' + id + '/avatar',data)
}

//服务中心
export const serverData = () => {
	return get('https://elm.cangdu.org/v3/profile/explain')
}

//修改登录密码
export const changePwd = (username,oldpassWord,newpassword,confirmpassword,captcha_code) =>{
	return post('https://elm.cangdu.org/v2/changepassword',{
		username,
		oldpassWord,
		newpassword,
		confirmpassword,
		captcha_code
	})
}

//附近商家列表
export const nearbyShopList = (x,y,offset) => {
	return get('https://elm.cangdu.org/shopping/restaurants',{
		latitude:x,
		longitude:y,
		offset:offset
	})
}

