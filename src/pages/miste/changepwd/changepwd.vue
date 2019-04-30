<template>
	<div class="globel-main">
		<all-header>
			<span slot='headerTitle'>
				修改登录密码
			</span>
		</all-header>
		<div class="globel-content">
			<mt-field label="旧密码" type="password" placeholder="请输入原密码" v-model="oldpwd">
			</mt-field>
			<mt-field label="新密码" type="password" placeholder="请输入新密码" v-model="newpwd">
			</mt-field>
			<mt-field label="确认密码" type="password" placeholder="请确认新密码" v-model="qrpwd">
			</mt-field>
			
			<mt-field label="验证码" placeholder="请输入验证码" v-model="logincode" :attr="{maxlength:4}">
				<img :src="captcha" alt="">
				<font @click="getImgCode">
					换一张？ 
				</font> 
			</mt-field> 
			
			<div class="btnLogin">
				<mt-button type="primary" size="large" @click.native = 'getUserLogin'>确认修改</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {imgCode,changePwd} from '@/api/api'
	import localsession from '@/utils/localsession'
	import {mapState,mapMutations} from 'vuex'
	import {Toast,Indicator} from 'mint-ui'
	export default{
		data(){
			return{
				oldpwd:'',
				newpwd:'',
				qrpwd:'',
				captcha:'',
				logincode:''
			}
		},
		components:{
			allHeader
		},
		methods:{
			...mapMutations(['getUserInfo']),
			async getImgCode(){
				let res = await imgCode()
				console.log(res)
				this.captcha = res.code
			},
			async getUserLogin(){
				if(this.userinfo){
					if(this.oldpwd == ''){
						Toast({
							message:'原密码不能为空',
							position:'bottom',
							duration:3000
						})
					}else if(this.newpwd == ''){
						Toast({
							message:'新密码不能为空',
							position:'bottom',
							duration:3000
						})
					}else if(this.qrpwd == ''){
						Toast({
							message:'确认密码不能为空',
							position:'bottom',
							duration:3000
						})
					}else if(this.qrpwd != this.newpwd){
						Toast({
							message:'两次密码不一致，请重新输入',
							position:'bottom',
							duration:3000
						})
					}else if(this.logincode == ''){
						Toast({
							message:'验证码不能为空',
							position:'bottom',
							duration:3000
						})
					}else{
						Indicator.open({
							text:'登录中，请稍后...',
							spinnerType: 'fading-circle'
						})
						let res = await changePwd(this.userinfo.username,this.oldpwd,this.newpwd,this.qrpwd,this.logincode)
						if(res.status == 0){
							Indicator.close()
							Toast({
								message:res.message,
								position:'bottom',
								duration:3000
							})
						}else if(res.status == 1){
							Indicator.close()
							Toast({
								message:res.success,
								position:'bottom',
								duration:3000
							})
							localsession.removeLocal('userinfo')
							this.getUserInfo(null)
							this.$router.push('/about')
						}
					}
				}
			}
		},
		computed:{
			...mapState(['userinfo']),
			pwdTrue(){
				return this.pwdState ? 'password' : ''
			},
			
		},
		mounted() {
			this.getImgCode(),
			console.log(this.userinfo)
		}
	}
</script>

<style lang="scss" scoped>
	.globel-content {
		.mint-cell-wrapper{
			font-size:.28rem;
		}
		.mint-cell-title {
			width:1.4rem;
		}
		img{
			width: 2rem;
			height: .9rem;
		}
		.mint-cell {
			align-items:center;
			border-bottom: 1px solid #e7e7e7;
			height: 1rem;
			line-height: 1rem !important;
			background: #fff;
		}
		.btnLogin{
			margin:.2rem;
		}
	}
</style>
