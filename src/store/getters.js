import localsession from '@/utils/localsession'
//store的计算属性
const getters = {
	comShopDetail(state){
		return state.shopDetailList
	},
	saveMyFood(state){
		return state.myfoodinfo
	},
	//获取用户的登录信息
	getAdminUser(state){
		if(localsession.getLocal('userinfo')){
			state.userinfo = JSON.parse(localsession.getLocal('userinfo'))
		}
		return state.userinfo
	},
	//获取选择的经纬度

}

//ES6导出/引入语法
export default getters