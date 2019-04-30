<template>
	<div class="globel-main">
		<all-header>
			<span slot="headerTitle">
				我的积分
			</span>
		</all-header>
		
		<div class="main-content">
			<div class="balanceTop">
				<div class="yue-money">
					<h5>
						<font>当前积分</font>
						<router-link to='/userPoint/pointDetail'>
							<i class="iconfont icon-question-circle-fill"></i>积分说明
						</router-link>
					</h5>
					<h4>
						<b>
							0
						</b>分
					</h4>
					<button class="btn" @click="toastTx">
						积分兑换商品
					</button>
				</div>
			</div>
			<div class="jiaoyiDetail mt02 white-bg">
				<h3>
					最近30天积分记录
				</h3>
				<div class="noData">
					<img :src="imgUrl" alt="">
					<span>最近30天无积分记录</span>
				</div>
			</div>
		</div>
		<transition name="right">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				imgUrl:require('../../../assets/images/no-log.png')
			}
		},
		components:{
			allHeader
		},
		methods:{
			toastTx(){
				Toast({
					message:'该功能暂未开放...',
					duration:3000
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.balanceTop {
		background: #3190e8;
		padding:.2rem;
		.yue-money {
			border-radius: .1rem;
			background: #fff;
			padding:.2rem;
			box-shadow: 0 2px 10px rgba(0,0,0,.2);
			h5{
				display: flex;
				font-weight: normal;
				align-items: center;
				a{
					margin-left:auto;
					color:#3190e8
				}
			}
			h4{
				font-weight: normal;
				font-size:.32rem;
				b{
					font-size:.8rem;
					font-weight: normal;
					color:orange
				}
				
			}
			.btn {
				background:#3190e8;
				border:none;
				color:#fff;
				padding:.08rem .3rem;
				font-size:.28rem;
				margin-top:.1rem;
				border-radius: .06rem;
			}
			.btn_c1{
				background:#c53333
			}
		}
	}
	.jiaoyiDetail {
		h3 {
			font-size:.28rem;
			color:#333;
			font-weight: normal
		}
		.noData{
			min-height:30vh;
			display: flex;
			align-items: center;
			justify-content: center;
			padding:0.6rem 0 1rem 0;
			color:#999;
			font-size:.24rem;
			flex-direction:column;
			img{
				margin-bottom: .2rem
			}
		}
	}
</style>
