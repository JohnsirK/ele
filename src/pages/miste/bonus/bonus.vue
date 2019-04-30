<template>
	<div class="globel-main">
		<all-header>
			<span slot="headerTitle">
				红包页面
			</span>
		</all-header>
		<div class="main-content">
			<div class="hongbaoTab">
				<div class="tabTpo">
					<h5>
						<span :class="{'active':hbIndex === 0}" @click="hbIndex = 0">
							可用红包
						</span>
						<span :class="{'active':hbIndex === 1}" @click="hbIndex = 1">
							过期红包
						</span>
					</h5>
				</div>
				<div class="tabDiv">
					<div v-if="hbIndex === 0" class="hongbaoDiv okhb">
						<h1>
							<font>有<b>{{okhongbao.length}}</b>个红包即将到期</font>
							<span>
								<router-link to='/userBonus/bonusDetail'>
									<i class="iconfont icon-question-circle-fill"></i>红包说明
								</router-link>
							</span>
						</h1>
						<ul v-if="okhongbao.length > 0">
							<li v-for="(item,index) in okhongbao" :key="index">
								<div class="money">
									<font>
										￥
										<b>{{String(item.amount).split('.')[0]}}</b>
										.{{String(item.amount).split('.')[1] || 0}}
									</font>
									<p v-if="item.description_map">
										{{item.description_map.sum_condition}}
									</p>
								</div>
								<div class="info">
									<h4>
										{{item.name}}
									</h4>
									<h5>
										{{item.end_date}}到期
									</h5>
									<h5 v-if="item.description_map">
										{{item.description_map.phone}}
									</h5>
									<h5 v-if="item.limit_map">
										{{item.limit_map.restaurant_flavor_ids}}
									</h5>
								</div>
								<i class="time" v-if="item.description_map">
									{{item.description_map.validity_delta}}
								</i>
								
							</li>
						</ul>
						<div v-else>
							暂无红包数据
						</div>
					</div>
					<div v-if="hbIndex === 1" class="hongbaoDiv nookhb"> 
						<ul v-if="expired_hongbao.length > 0">
							<li v-for="(item,index) in expired_hongbao" :key="index">
								<div class="money">
									<font>
										￥
										<b>{{String(item.amount).split('.')[0]}}</b>
										.{{String(item.amount).split('.')[1] || 0}}
									</font>
									<p v-if="item.description_map">
										{{item.description_map.sum_condition}}
									</p>
								</div>
								<div class="info">
									<h4>
										{{item.name}}
									</h4>
									<h5>
										{{item.end_date}}
									</h5>
									<h5 v-if="item.description_map">
										{{item.description_map.phone}}
									</h5>
								</div>
								<i class="time">
									<em class="iconfont icon-yiguoqi1">
										
									</em>
								</i>
							</li>
						</ul>
						<div v-else>
							暂无数据
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<transition name="left">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {hongbaoData,expiredhbData} from '@/api/api'
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				active:false,
				hbIndex:0,
				//可用红包
				okhongbao:[],
				//过期红包
				expired_hongbao:[]
			}
		},
		computed:{
			...mapState(['userinfo']),
		},
		components:{
			allHeader
		},
		methods:{
			//可用红包
			async gethongbao(){
				if(this.userinfo && this.userinfo.id){
					let res = await hongbaoData(this.userinfo.id,20)
					console.log(res)
					this.okhongbao = res
				}
			},
			//过期红包
			async getExpired(){
				if(this.userinfo && this.userinfo.id){
					let res = await expiredhbData(this.userinfo.id,20)
					console.log(res)
					this.expired_hongbao = res
				}
			}
		},
		mounted(){
			console.log(this.userinfo)
			this.gethongbao()
			this.getExpired()
		}
	}
</script>

<style lang="scss" scoped>
	.tabTpo {
		background: #fff;
		box-shadow: 0 2px 10px rgba(0,0,0,.2);
		h5{
			height:.8rem;
			display: flex;
			span{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				font-weight: normal;
				font-size:.28rem;
				border-bottom: 2px solid #fff;
			}
			span.active{
				border-bottom: 2px solid #2074d1;
			}
		}
	}
	.tabDiv{
		margin-top:.2rem;
		.hongbaoDiv {
			padding:.2rem;
			h1{
				display: flex;
				font-size:.28rem;
				margin-bottom: .2rem;
				align-items: center;
				font-weight: normal;
				color:#333;
				b{
					margin:0 .1rem;
					color:#db2222
				}
				span{
					margin-left:auto;
					a{
						color:#2074d1;
						
					}
				}
			}
			li{
				background: #fff url('../../../assets/images/hongbao.png') repeat-x;
				background-size:.3rem .08rem;
				position: relative;
				border-radius: .1rem;
				box-shadow: 0 2px 10px rgba(0,0,0,.2);
				display: flex;
				padding:.2rem;
				margin-bottom: .3rem;
				.money {
					width:1.6rem;
					display: flex;
					flex-shrink: 0;
					flex-direction: column;
					justify-content: center;
					border-right:1px solid #ededed;
					font{
						color:red;
						font-size:.32rem;
						b{
							font-size:.8rem;
							font-weight: normal
						}
					}
					p{
						font-size:.24rem;
						color:#999;
					}
				}
				.info {
					margin-left:.2rem;
					display: flex;
					justify-content: center;
					flex-direction:column;
					h4{
						color:#333;
						font-weight: normal;
						font-size:.32rem;
					}
					h5{
						color:#999;
						font-size:.24rem;
						font-weight: normal;
						margin:.04rem 0;
					}
				}
				.time{
					position:absolute;
					top:.2rem;
					right:.2rem;
					color:#db2222
				}
			}
		}
		.nookhb {
			li{
				color:#999;
				background: #fff url('../../../assets/images/expired.png') repeat-x;
				background-size:.3rem .08rem;
				.money {
					font{
						color:#999
					}
				}
				i.time{
					em{
						font-size:.8rem;
						color:#999
					}
					
				}
			}
			
		}
	}
</style>
