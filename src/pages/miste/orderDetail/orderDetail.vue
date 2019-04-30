<template>
	<div class="orderDetail">
		<all-header>
			<span slot="headerTitle">
				订单详情
			</span>
		</all-header>
		<div class="bg-abs"></div>
		<div class="order-content">
			<div class="order-status">
				<i class="iconfont icon-check"></i>
				<h4>支付成功</h4>
			</div>
			<div class="order-shop">
				<h3>
					<span>
						<img src="../../../assets/164ad0b6a3917599.jpg" alt="">
					</span>
					<font>
						{{orderDetail.restaurant_name}}
					</font>
				</h3>
				<ul v-if="orderDetail.basket">
					<li  v-for="(item,index) in orderDetail.basket.group[0]" :key="index">
						<font>{{item.name}}</font>
						<span>X{{item.quantity}}  <i>￥{{item.price}}</i></span>
					</li>
					<li>
						<font>配送费:</font>
						<span>
							￥{{orderDetail.basket.deliver_fee && orderDetail.basket.deliver_fee.price || 0}}
						</span>
					</li>
				</ul>
				<p class="tr total">
					总计：<b>￥{{orderDetail.total_amount}}</b>
				</p>
			</div>
			<div class="orderDetailStyle">
				<h3>配送信息</h3>
				<ul>
					<li>
						<font>
							送达时间:
						</font>
						<span>
							{{orderInfo.deliver_time}}
						</span>
					</li>
					<li>
						<font>
							送货地址： 
						</font>
						<span>
							 {{orderInfo.consignee}}
							 {{orderInfo.phone}}
							 {{orderInfo.addressDetail}}
						</span>
					</li>
					<li>
						<font>
							配送方式:
						</font>
						<span>
							蜂鸟专送
						</span>
					</li>
				</ul>
			</div>
			<div class="orderDetailStyle">
				<h3>订单信息</h3>
				<ul>
					<li>
						<font>
							订单号:
						</font>
						<span>
							{{orderDetail.id}}
						</span>
					</li>
					<li>
						<font>
							支付方式：
						</font>
						<span>
							在线支付
						</span>
					</li>
					<li>
						<font>
							下单时间:
						</font>
						<span>
							{{orderDetail.formatted_created_at}}
						</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="againOrder">
			<router-link :to="{'path':'/shop',query:{id:orderDetail.restaurant_id}}">
				再来一单
			</router-link>
			
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {mapState,mapGetters} from 'vuex'
	import {orderDetailData} from '@/api/api'
	export default{
		data(){
			return {
				img_url:'//elm.cangdu.org/img/',
				//配送信息
				orderInfo:{}
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapState(['orderDetail']),
			...mapGetters(['getAdminUser'])
		},
		mounted(){ 
			this.getOrderDetailData()
		},
		methods:{
			async getOrderDetailData(){
				 console.log(this.getAdminUser)
				 let res = await orderDetailData(this.getAdminUser.id,this.orderDetail.unique_id)
				 console.log(res)
				 this.orderInfo = res
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderDetail {
		position:fixed;
		top:0;
		overflow: hidden;
		left:0;
		height:100%;
		width:100%;
		background: #fff;
		z-index:1000;
		box-sizing:border-box;
		.bg-abs {
			height:50%;
			position: absolute;
			background: #3190e8;
			width:100%;
			
		}
		.order-content {
			margin-top:.8rem;
			background: #fff;
			width:90%;
			height:auto;
			max-height:70vh;
			overflow-y:auto;
			box-shadow: 0 2px 10px rgba(0,0,0,.2);
			position: absolute;
			left:0;
			right:0;
			top:0;
			bottom:0;
			border-radius: .2rem;
			margin:auto;
			box-sizing: border-box;
			padding:.2rem;
			.order-status {
				height:30%;
				display: flex;
				align-items: center;
				flex-direction:column;
				justify-content: center;
				border-bottom:1px solid #e2e2de;
				i{
					font-size:.6rem;
					border:2px solid #54d01a;
					color:#54d01a;
					width:1rem;
					height:1rem;
					text-align: center;
					line-height:1rem;
					border-radius: 50%;
					margin-bottom: .2rem;
				}
			}
			.order-shop {
				margin-top:.2rem;
				.total {
					b{
						color:orangered;
						font-size:.4rem
					}
					
				}
				h3{
					display: flex; 
					align-items: center;
					color:#333;
					font-size:.28rem;
					span{
						width:.6rem;
						border-radius: 50%;
						overflow: hidden;
					}
					font{
						font-size:.28rem;
						color:#666;
						font-weight: normal;
						margin-left:.1rem;
					}
				}
				ul{
					margin:.2rem 0;
					li{
						line-height:.6rem;
						font-size:.28rem;
						display: flex;
						border-bottom: 1px dashed #dedede;
						span{
							margin-left:auto;
							color:#666
						}
					}
				}
			}
			.orderDetailStyle {
				h3{
					font-weight: normal;
					font-size:.32rem;
				}
				ul{
					margin:.2rem 0;
					border-top:1px solid #e2e2de;
					border-bottom:1px solid #e2e2de;
					li{
						line-height:.6rem;
						font-size:.28rem;
						display: flex;
						span{
							margin-left:auto;
							color:#999;
						}
					}
				}
			}
		}
		.againOrder {
			position: absolute;
			bottom:5%;
			left:0;
			width:100%;
			text-align: center;
			a{
				background: orange;
				color:#fff;
				padding:.16rem .2rem;
				border-radius: .1rem;
			}
		}
	}
</style>
