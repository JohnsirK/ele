<template>
	<!-- 公用头部组件 -->
	<div class="allHeight">
		<div class="iconLeft">
			<slot name="headerLeft">
				<i class="iconfont icon-left" @click="returnUp"></i>
			</slot>
		</div>
		<h5>
			<slot name="headerTitle">
				<router-link to='/'>
					请返回选择地址
				</router-link>
			</slot>
		</h5>
		<div class="iconRight">
			<slot name="headerRight">
				<span v-if="!nowIsLogin">
					<router-link to='/login'>
						登录
					</router-link>
				</span>
				<span v-else>
					<router-link to='/about'>
						<i class="iconfont icon-user" style="font-size:.4rem"></i>
					</router-link>
				</span>
			</slot>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import localsession from '@/utils/localsession'
	export default{
		data(){
			return {
				
			}
		},
		computed:{
			...mapState(['userinfo','isLogin']),
			nowIsLogin(){
				if(localsession.getLocal('userinfo')){
					this.getUserInfo(JSON.parse(localsession.getLocal('userinfo')))
				}else{
					this.getUserInfo(null)
				}
				return this.isLogin
			},
			user_info(){
				return this.userinfo
			}
			
		},
		methods:{
			...mapMutations(['getUserInfo']),
			returnUp(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.allHeight{
		height:.8rem;
		position: fixed;
		width:100%;
		background: #3190e8;
		color:#fff;
		z-index: 999;
		h5{
			height:100%;
			text-align: center;
			line-height:.8rem;
			font-size:.32rem;
			font-weight: normal;
			padding:0 1rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			a{
				color:#fff;
			}
		}
		.iconLeft{
			height:100%;
			position: absolute;
			top:0;
			left:0;
			width:1rem;
			display: flex;
			justify-content:center;
			align-items: center;
			a{
				color:#fff;
			}
			i{
				font-size:.48rem;
			}
		}
		.iconRight {
			width:auto;
			height:100%;
			position: absolute;
			top:0;
			right:.2rem;
			display: flex;
			justify-content: center;
			align-items:center;
			a{
				color:#fff;
				font-size:.28rem;
			}
		}
	}
</style>
