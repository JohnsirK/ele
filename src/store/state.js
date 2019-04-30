//定义store变量
const state = {
	//加载数据的loading
	loading:false,
	//选择的城市
	nowCity:{
		name:'',
		id:''
	},
	//频道页底部状态
	footState:'miste',
	//选择城市的经纬度对象
	pickcityinfo:{},
	//商家信息
	shopDetailList:{},
	// 购物车状态
	isShopStatus:false,
	//购物车信息
	myfoodinfo:[],
	//备注信息 自选
	remarkInfoPick:null,
	//备注信息 文本框
	remarkInfoTxt:'',
	//用户信息
	userinfo:{},
	//登录状态
	isLogin:false,
	//新增收货地址
	userPickAddress:{},
	//当前选择收货地址
	nowAddress:null,
	//订单详情
	orderDetail:{},
	//问题详情
	questionDetail:{},
}

//ES6 导出/引入语法
export default state