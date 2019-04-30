import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
//城市列表
const home = () => import ('@/pages/home')
//城市
const city = () => import ('@/pages/city')
//登录
const login = () => import ('@/pages/login')
//频道页
const miste = () => import ('@/pages/miste/miste')
//商铺主页
const indexhome = () => import ('@/pages/miste/indexhome')
//频道页搜索
const search = () => import ('@/pages/miste/search')
//订单
const order = () => import ('@/pages/miste/order')
//我的
const about = () => import ('@/pages/miste/about')
//商铺页面
const shop = () => import ('@/pages/shop/shop')
//商家详情页面
const shopDetail = () => import ('@/pages/shop/shopDetail')
//食品安全页面
const shopSafe = () => import ('@/pages/shop/shopSafe')
//食品详情页面
const menuDetail = () => import ('@/pages/shop/menuDetail')
//订单确认页
const confirmOrder = () => import ('@/pages/confirmOrder/confirmOrder')
//备注页面
const remark = () => import ('@/pages/confirmOrder/remark')
//收货地址
const deliAddress = () => import ('@/pages/confirmOrder/deliAddress')
//新增收货地址
const newAddress = () => import ('@/pages/confirmOrder/newAddress')
//收货地址搜索页面
const searchAddress = () => import ('@/pages/confirmOrder/searchAddress')
//订单详情
const orderDetail = () => import ('@/pages/miste/orderDetail/orderDetail')
//我的余额
const userBalance = () => import ('@/pages/miste/balance/balance')
//余额说明
const balanceNotice = () => import ('@/pages/miste/balance/balanceNotice')
//我的优惠
const userBonus = () => import ('@/pages/miste/bonus/bonus')
//红包说明
const bonusDetail = () => import ('@/pages/miste/bonus/bonusDetail')
//我的积分
const userPoint = () => import ('@/pages/miste/points/points')
//积分说明
const pointDetail = () => import ('@/pages/miste/points/pointsDetail')
//服务中心
const serverCenter = () => import ('@/pages/miste/server/server')
//问题详情
const serverDetail = () => import ('@/pages/miste/server/serverDetail')
//修改登录密码 
const changepassword = () => import ('@/pages/miste/changepwd/changepwd')
//餐品分类
const foods = () => import ('@/pages/foods')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
		path:'/city/:id',
		name:'city',
		component:city
	},{
		path:'/login',
		name:'login',
		component:login
	},{
		path:'/indexhome',
		name:'indexhome',
		component:indexhome,
		redirect:'/miste',
		children:[
			{
				path:'/miste',
				name:'miste',
				component:miste
			},{
				path:'/miste/:geohash',
				name:'mistegeo',
				component:miste
			},{
				path:'/search',
				name:'search',
				component:search
			},{
				path:'/order',
				name:'order',
				component:order,
				children:[
					{
						path:'orderDetail',
						name:'orderDetail',
						component:orderDetail
					}
				]
			},{
				path:'/about',
				name:'about',
				component:about
			}
		]
	},{
		path:'/shop',
		name:'shop',
		component:shop,
		children:[
			//商家详情
			{
				path:'shopDetail',
				name:'shopDetail',
				component:shopDetail,
				children:[
					{
						//食品安全
						path:'shopSafe',
						component:shopSafe
					}
				]
			},{
				path:'menuDetail',
				name:'menuDetail',
				component:menuDetail
			}
		]
	},{
		path:'/confirmOrder',
		name:'confirmOrder',
		component:confirmOrder,
		children:[
			{
				path:'remark',
				name:'remark',
				component:remark
			},
			{
				path:'deliAddress',
				name:'deliAddress',
				component:deliAddress,
				children:[
					{
						path:'newAddress',
						name:'newAddress',
						component:newAddress,
						children:[
							{
								path:'searchAddress',
								name:'searchAddress',
								component:searchAddress
							}
						]
					}
				],
				
			}
		]
	},{
		path:'/userBalance',
		name:'userBalance',
		component:userBalance,
		children:[
			{
				path:'balanceNotice', 
				name:'balanceNotice',
				component:balanceNotice
			}
		]
	},{
		path:'/userBonus',
		name:'userBonus',
		component:userBonus,
		children:[
			{
				path:'bonusDetail',
				name:'bonusDetail',
				component:bonusDetail
			}
		]
	},{
		path:'/userPoint',
		name:'userPoint',
		component:userPoint,
		children:[
			{
				path:'pointDetail',
				name:'pointDetail',
				component:pointDetail
			}
		]
	},{
		path:'/serverCenter',
		name:'serverCenter',
		component:serverCenter,
		children:[
			{
				path:'serverDetail',
				name:'serverDetail',
				component:serverDetail
			}
		]
	},{
		path:'/changepassword',
		name:'changepassword',
		component:changepassword
	},{
		path:'/foods',
		name:'foods',
		component:foods
	}
  ]
})
