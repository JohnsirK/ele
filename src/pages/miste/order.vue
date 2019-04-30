<template>
	<div class="order">
		<all-header>
			<span slot="headerTitle">
				订单
			</span>
		</all-header>
		<div class="main-content order-list">
			<ul v-if="orderList.length > 0">
				<li v-for="(item,index) in orderList" :key="index">
					 <h3>
						 <span>
							 <img src="../../assets/164ad0b6a3917599.jpg" alt="">
						 </span>	
						 <font>
							 {{item.restaurant_name}}
						 </font>
						 <em>
							{{item.order_time | changeTime}}
						 </em>
					 </h3>
					 <section class="pruduCon" @click="goDetail(item)">
						 <p>
							 {{item.basket.group[0][0].name}}{{item.basket.group[0].length > 1 ? '等' + item.basket.group[0].length + '件商品' : '' }}
						 </p>
						 <p class="tr total">
							 订单总额: <b>￥</b> <i>{{item.total_amount}}</i>
						 </p>
					 </section>
					 <div class="orderStatus">
						 <span>
							 已支付
						 </span>
						 <router-link :to="{path:'/shop',query:{geohash:shopDetailList.geohash,id:item.restaurant_id}}">
							 再来一单
						 </router-link>
					 </div>
				</li>
			</ul>
			<div class="noorder" >
				暂无订单内容！
			</div>
		</div>
		<transition name="left">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {userOrder} from '@/api/api'
	import {Indicator,Toast} from 'mint-ui'
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default{
		data(){
			return {
				//用户信息
				userinfo:{},
				//订单列表
				orderList:[],
				offset:0,
				img_url:'//elm.cangdu.org/img/',
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapGetters(['getAdminUser']),
			...mapState(['shopDetailList'])
		},
		mounted(){
			this.userinfo = this.getAdminUser
			console.log(this.shopDetailList)
			this.getOrderList()
		},
		methods:{
			...mapMutations(['getOrderDetail']),
			//获取订单列表
			async getOrderList(){
				if(this.userinfo || this.userinfo.id){
					let res = await userOrder(this.userinfo.id)
					console.log(res)
					this.orderList = [...res]
				}
			},
			goDetail(item){
				console.log(item)
				this.getOrderDetail(item)
				this.$router.push('/order/orderDetail')
				
			}
		},
		filters:{
			changeTime(val){
				let time = new Date(val)
				//年
				let y = time.getFullYear()
				//月
				let m = time.getMonth() + 1
				//日
				let day = time.getDay()
				//时
				let h = time.getHours()
				//分
				let min = time.getMinutes()
				//秒
				let s = time.getSeconds()
				return y + '-' + m + '-' + day + ' ' + h + ':' + min
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order{
		height:100%;
		.order-list {
			ul{
				overflow: hidden;
				li{
					background: #fff;
					box-shadow: 0 2px 10px rgba(0,0,0,.2);
					margin-bottom:.2rem;
					padding:.2rem;
					background:#fff url(../../assets/images/bg.png) bottom repeat-x;
					background-size: 10% 1.8%;
					h3 {
						display: flex;
						align-items: center;
						
						padding-bottom: .2rem;
						span{
							width:0.6rem;
							border-radius: .6rem;
							margin-right:.1rem;
							overflow: hidden;
						}
						font{
							color:#333;
							font-size:.28rem;
							font-weight: normal
						}
						em{
							font-size:.24rem;
							font-weight: normal;
							color:#999;
							margin-left:auto;
						}
					}
					.pruduCon{
						border-bottom: .02rem solid #e1e1e1;
						border-top:.02rem solid #e1e1e1;
						padding:.2rem 0;
						p{
							font-size:.28rem;
							color:#333;
						}
						p.total{
							font-size:.24rem;
							color:#999;
							b{
								font-size:.32rem;
								color:red
							}
							i{
								font-size:.4rem;
								color:red
							}
						}
					}
					.orderStatus {
						text-align: right;
						margin-top:.1rem;
						span{
							color:#32a527;
							font-size:.28rem;
						}
						a{
							border:.02rem solid #ec891a;
							font-size:.28rem;
							color:#ec891a;
							padding:.02rem .04rem;
						}
					}
				}
			}
		}
		.noorder {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
