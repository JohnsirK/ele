<template>
	<div class="shopDetail">
		<mt-header fixed title="商家详情">
			<mt-button icon="back" slot='left' @click.native ="goBack()">返回</mt-button>
		</mt-header>
		<!-- 活动与属性 -->
		<div class="huod-shux">
			<dl>
				<dt>活动与属性</dt>
				<dd v-if="comShopDetail.supports" v-for="(i,index) in comShopDetail.supports" :key="index">
					<span :style='{background:"#" + i.icon_color}'>{{i.icon_name}}</span>
					{{i.description}}
				</dd>
			</dl>
		</div>
		<!-- 食品安全公式 -->
		<div class="huod-shux">
			<h4 class="title">
				<router-link to='/shop/shopDetail/shopSafe'>
					食品监督安全公示
					<font>
						企业认证详情
						<i class="iconfont icon-right">
							
						</i>
					</font>
				</router-link>
			</h4>
			<div class="smileCon">
				<span>
					<img src="../../assets/yzm.png" alt="">
				</span>
				<div class="txt">
					<p>监督检查结果：<font class="ft_green">良好</font></p>
					<p>检查日期：<font>良好</font></p>
				</div>
			</div>
		</div>
		<!-- 商家信息 -->
		<div class="huod-shux">
			<dl>
				<dt>{{comShopDetail.name}}</dt>
				<dd>
					地址：{{comShopDetail.address}}
				</dd>
				<dd>
					营业时间：{{comShopDetail.opening_hours}}
				</dd>
				<dd>
					营业执照
					<i class="iconfont icon-right"></i>
				</dd>
				<dd>
					餐饮服务许可证
					<i class="iconfont icon-right"></i>
				</dd>
			</dl>
		</div>
		<transition name="right">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				 
			}
		},
		computed:{
			...mapGetters(['comShopDetail'])
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopDetail {
		position:fixed;
		top:0;
		overflow-y: auto;
		left:0;
		height:100%;
		width:100%;
		background: #efefef;
		z-index: 14;
		padding:.8rem 0 0 0;
		box-sizing:border-box;
		.huod-shux {
			margin:.2rem 0;
			background: #fff;
			padding:.2rem;
			dt{
				margin-bottom:.2rem;
			}
			dd{
				margin-bottom: .2rem;
				color:#666;
				display: flex;
				font-size:.28rem;
				span{
					width: .4rem;
					height:.4rem;
					text-align: center;
					display: inline-block;
					color:#fff;
					margin-right:.1rem;
				}
				i{
					margin-left:auto;
				}
			}
			h4.title{
				font-weight: normal;
				color:#333;
				
				a{
					color:#333;
					display: flex;
				}
				font{
					margin-left:auto;
					font-size:.24rem;
					color:#999;
					display: flex;
					align-items: center;
				}
			}
			.smileCon {
				margin:.2rem 0;
				display: flex;
				align-items: center;
				span{
					width:1rem;
					height:1rem;
				}
				.txt{
					margin-left:.1rem;
					font-size:.24rem;
					color:#999;
					 
				}
			}
		}
		.huod-shux dd:last-child{
			margin-bottom: 0
		}
	}
</style>
