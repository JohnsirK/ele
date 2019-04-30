//异步方法。通过commit调用mutations里的方法。
//dispatch分发自己的异步方法
const actions = {
	//选择地址的对象
	pickAddress({commit},data){
		commit('pickCityObj',data)
	},
	pickShopDetailList({commit},data){
		commit('pickShopDetail',data)
	},
	// 当前购物车数据
	awaitMyFoodData({commit},data){
		commit('nowMyFoodData',data)
	},
	//用户登录
	saveUserInfo({commit},data){
		commit('getUserInfo',data)
	}
}

//ES6导出/引入语法
export default actions