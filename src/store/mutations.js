import localsession from '@/utils/localsession'
//store 同步方法
const mutations = {
	//loading遮罩显示隐藏
	startLoading(state,data){
		state.loading = true
	},
	endLoading(state,data){
		state.loading = false
	},
	//当前选择城市
	pickCity(state,data){
		state.nowCity = data
	},
	//选择城市的经纬度
	pickCityObj(state,data){ 
		localsession.setSession('pickCity',data)
		state.pickcityinfo = data
	},
	pickShopDetail(state,data){
		state.shopDetailList = data
	},
	changeShopStatus(state,data){
		state.isShopStatus = data
	},
	//当前购物车数据
	nowMyFoodData(state,data){
		state.myfoodinfo = data
	},
	// 备注信息
	saveRemarkInfo(state,{pick,txt}){
		state.remarkInfoPick = pick
		state.remarkInfoTxt = txt
	},
	//用户信息
	getUserInfo(state,data){
		if(data){
			state.userinfo = data
			state.isLogin = true
		}else if(data == null || data == ''){
			localsession.removeLocal('userinfo')
			state.userinfo = {}
			state.isLogin = false
		}
	},
	//新增收货地址
	getUserPickAddress(state,data){
		state.userPickAddress = data
	},
	//默认收货地址
	defaultAddress(state,data){
		if(data){
			state.nowAddress = data
		}else if(data == null || data == ''){
			localsession.removeLocal('defaultAddress')
			state.nowAddress = null
		}
	},
	//订单详情
	getOrderDetail(state,data){
		state.orderDetail = data
	},
	getQuestionDetail(state,data){
		state.questionDetail = data
	}

}

//ES6导入引出语法
export default mutations