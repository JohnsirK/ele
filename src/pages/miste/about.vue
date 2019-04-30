<template>
	<div class="about">
		<all-header>
			<span slot="headerTitle">
				我的
			</span>
		</all-header>
		<div class="main-content">
			<div class="user-info-top">
				<div class="user" v-if="user">
					<span v-if="!user.avatar">
						<img src="../../assets/yzm.png" alt="">
					</span>
					<span v-else class="changefile">
						<img :src="img_url + user.avatar" alt="">
						<input class="changetxt" type="file" @change="handlerChangeImg($event)" accept="image/jpeg,image/png,image/jpg">
					</span>
					<p>
						<template v-if="!user.username">
							<router-link to='/login'>
								登录 / 注册
							</router-link>
						</template>
						<template v-else>
							<a href="javascript:;">
								{{user.username}}
							</a>
						</template>
					</p>
					<p>
						<i class="iconfont icon-mobile"></i>
						<font>
							{{user.mobile ? user.mobile : "暂无绑定手机号"}}
						</font>
					</p>
				</div>
				<div class="user-class">
					<ul>
						<li>
							<router-link :to="{name:'userBalance',params:{user:user}}">
								<p>
									<b class="fc11">
										{{user.balance ? parseInt(user.balance).toFixed(2) : '0.00'}}
									</b>元
								</p>
								<font>
									我的余额
								</font>
							</router-link>
						</li>
						<li>
							<router-link :to="{name:'userBonus',params:{user:user}}">
								<p>
									<b class="fc22">
										{{user.gift_amount ? user.gift_amount : '0'}}
									</b>个
								</p>
								<font>
									我的优惠
								</font>
							</router-link>
						</li>
						<li>
							<router-link :to="{name:'userPoint',params:{user:user}}">
								<p>
									<b class="fc33">
										{{user.point ? parseInt(user.point) : '0'}}
									</b>分
								</p>
								<font>
									我的积分
								</font>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="serverCenter white-bg mt02">
				<ul>
					<li>
						<router-link to='/serverCenter'>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-group"></use>
							</svg>
							<font>
								服务中心
							</font>
							<i class="iconfont icon-right"></i>
						</router-link>
					</li>
					<li>
						<router-link to='/serverCenter'>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-app"></use>
							</svg>
							<font>
								下载饿了么APP
							</font>
							<i class="iconfont icon-right"></i>
						</router-link>
					</li>
					<!-- <li>
						<router-link to='/serverCenter'>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-setup"></use>
							</svg>
							<font>
								管理收货地址
							</font>
							<i class="iconfont icon-right"></i>
						</router-link>
					</li> -->
					<li>
						<router-link to='/changepassword'>
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-lock"></use>
							</svg>
							<font>
								修改登录密码
							</font>
							<i class="iconfont icon-right"></i>
						</router-link>
					</li>
				</ul>
			</div>
			<button v-if="user.id" @click="handlerExitLogin" class="exitLogin mt02">
				<i class="iconfont icon-poweroff"></i> 退出登录
			</button>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {exitLogin,changeUserImg,userInfo} from '@/api/api'
	import localsession from '@/utils/localsession'
	import {Indicator,Toast} from 'mint-ui'
	import {mapState,mapMutations,mapGetters} from 'vuex'
	import axios from 'axios'
	export default{
		data(){
			return {
				user:{},
				img_url:'//elm.cangdu.org/img/',
			}
		},
		components:{
			allHeader,
		},
		computed:{
			...mapState(['userinfo','isLogin']),
		},
		methods:{
			...mapMutations(['getUserInfo']),
			//退出登录
			async handlerExitLogin(){
				let res = await exitLogin()
				if(localsession.getLocal('userinfo')){
					localsession.removeLocal('userinfo')
					this.getUserInfo(null)
				}
				console.log(res.message)
				Toast({
					message:res.message
				})
			},
			//修改用户头像
			async handlerChangeImg(event){
				console.log('11')
				if(this.userinfo){
					let that = this;
					let file = event.target.files[0]
					//创建form对象
					let param = new FormData()
					//通过append向form对象添加数据
					param.append('file',file,file.name)
					//FormData私有类对象，可以get判断值是否传进去
					console.log(param.get('file'))
					console.log((param.get('file').size / 1024).toFixed(2) + 'KB')
					if(param.get('file').size >= 100000){
						Toast({
							message:'图片太大，请重新选择！'
						})
					}else{
						Indicator.open({
							text:'上传中,请稍后!',
							spinnerType: 'fading-circle'
						})
						let res = await changeUserImg(this.userinfo.user_id,param)
						if(res){
							Indicator.close()
							Toast({
								message:'上传成功！'
							})
							this.RefUserinfo()
						}else{
							Indicator.close()
							Toast({
								message:'上传失败！'
							})
						}
					}
				}
			},
			//重新获取用户信息
			async RefUserinfo(){
				let res = await userInfo()
				if(localsession.getLocal('userinfo')){
					localsession.setLocal('userinfo',res)
				}
				this.getUserInfo(res)
			}
		},
		mounted(){
			
		}, 
		watch:{
			userinfo(value){
				console.log(value)
				this.user = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about{
		height:100%;
		.user-info-top {
			background: #3190e8;
			min-height:30vh;
			box-shadow: 0 2px 10px rgba(0,0,0,.2);
			.user {
				display: flex;
				flex-direction: column;
				justify-items:center;
				align-items: center;
				padding:.2rem 0;
				span{
					width:1.2rem;
					height:1.2rem;
					border-radius: 50%;
					overflow: hidden;
					margin:.2rem 0 0 0;
					border:3px solid #fff;
				}
				span.changefile {
					position: relative;
					input{
						position: absolute;
						width:100%;
						height:100%;
						top:0;
						left:0;
						opacity:0
					}
				}
				p{
					color:#fff;
					a{
						color:#fff;
						background: orange;
						padding:.04rem .3rem;;
						border-radius: .4rem;
						margin:.1rem 0 .06rem 0;
						display: inline-block;
					}
					font{
						
						font-size:.28rem;
					}
				}
			}
			.user-class {
				ul{
					background: #50a3f0;
					display: flex;
					li{
						flex:1;
						padding:0 0 .1rem 0;
						a{
							width:100%;
							display: flex;
							justify-content: center;
							align-items: center;
							flex-direction:column;
							font{
								color:#fff;
								font-size:.24rem;
								margin-top:-0.1rem;
							}
							p{
								font-size:.28rem;
								color:#fff;
								b{
									font-size:.48rem;
								}
							}
						}
					}
				}
			}
		}
		.serverCenter {
			margin-top:.6rem;
			ul{
				li{
					line-height:.8rem;
					border-bottom: 1px solid #edebeb;
					
					a{
						display: flex;
						justify-content: center;
						align-items: center;
						width:100%;
					}
					font{
						margin-left:.1rem;
						color:#333;
						font-size:.28rem;
					}
					i{
						margin-left:auto;
						color:#999
					}
				}
			}
		}
		.exitLogin {
			background: #dd3f3f;
			margin:.6rem .2rem .2rem .2rem;
			border: none;
			width:calc(100% - .4rem);
			line-height:.8rem;
			color:#fff;
			border-radius: .5rem;
		}
	}
</style>
