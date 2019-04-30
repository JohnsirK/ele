<template>
	<div class="login">
		<mt-header fixed title="用户登录">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="content">
			<div class="loginDiv">
				<div class="loginLogo">
					<img src="@/assets/logo.png" alt="">
				</div>
				<mt-field style="border-top:1px solid #e7e7e7" label="用户名" placeholder="请输入用户名" v-model="userName"></mt-field>
				<mt-field label="密  码" :type="pwdTrue" placeholder="请输入密码" v-model="pwd">
					<mt-switch v-model="pwdState" size="small"></mt-switch>
				</mt-field>
				<mt-field label="验证码" placeholder="请输入验证码" v-model="logincode" :attr="{maxlength:4}">
					<img :src="captcha" alt="">
					<font @click="getImgCode">
						换一张？ 
					</font> 
				</mt-field> 
				<p class="txt">
					1:温馨提示：未注册过的账号，登录时将自动注册<br>
					2:注册过的用户可凭账号密码登录
				</p>
				<div class="btnLogin">
					<mt-button type="primary" size="large" @click.native = 'getUserLogin'>登录</mt-button>
				</div>
				<font class="forgetPwd">
					忘记密码？
				</font>
			</div>
		</div>
	</div>
</template>

<script>
	import {imgCode,userInfo,userLogin} from '@/api/api'
	import request from '@/api/request'
	import {Toast,Indicator} from 'mint-ui'
	import {mapState,mapActions} from 'vuex'
	import localsession from '@/utils/localsession'
	export default{
		data(){
			return {
				// 用户名
				userName:'', 
				//密码
				pwd:'', 
				//图片验证码
				captcha:null,
				//输入验证码
				logincode:'',
				//明文
				pwdState:true,
				//用户当前页面的登录信息
				userLoginInfo:{}
			}
		},
		computed:{
			pwdTrue(){
				return this.pwdState ? 'password' : ''
			},
			...mapState(['userinfo'])
		},
		methods:{
			//用户登录信息保存在vuex里
			...mapActions(['saveUserInfo']),
			//获取验证码
			async getImgCode(){
				let res = await imgCode()
				this.captcha = res.code
			},
			//登录
			async getUserLogin(){
				if(!this.userName){
					Toast({
						message:'请输入用户名!',
						position:'bottom',
						duration:3000
					})
					return
				}else if(!this.pwd){
					Toast({
						message:'请输入密码!',
						position:'bottom',
						duration:3000
					})
					return
				}else if(!this.logincode){
					Toast({
						message:'请输入验证码!',
						position:'bottom',
						duration:3000
					})
					return
				}
				let load3 = Indicator.open({
					text:'登录中，请稍后...',
					spinnerType: 'fading-circle'
				})
				let res = await userLogin(this.userName,this.pwd,this.logincode)
				if(!res.user_id){
					Indicator.close(load3)
					Toast({
						message:res.message,
						position:'bottom',
						duration:3000
					})	
				}else{
					Indicator.close(load3)
					Toast({
						message:'登录成功!',
						position:'bottom',
						duration:3000
					})
					this.saveUserInfo(res)
					localsession.setLocal('userinfo',res)
					this.$router.go(-1)
				}
			}
		},
		mounted() {
			this.getImgCode()
		}
	}
</script>

<style lang="scss" scoped>
	.loginDiv {
		text-align: center;
		background: #fff;
		padding:.2rem 0;
		.loginLogo img{
			width:2rem;
			margin:2rem 0 .6rem 0;
		}
		.mint-field-other{
			img{
				width:2rem;
				height:.9rem;
			}
			font{
				font-size:.24rem;
				em{
					display: block
				}
			}
		}
		.mint-cell {
			border-bottom: 1px solid #e7e7e7;
			height:1rem;
			line-height:1rem !important
		}  
		.mint-field .mint-cell-title{
			width:70px;
		}
		.txt {
			text-align: left;
			margin:.2rem ;
			font-size:.24rem;
			color:#999;
			line-height:.48rem;
		}
		.btnLogin{
			margin:0 .2rem; 
		}
		.forgetPwd {
			margin-top:.2rem;
			font-size:.28rem;
			color:#2B41C2;
			display: inline-block;
		}
		input,.mint-cell-title {
			font-size:.28rem;
		}
		.mint-cell-title{
			text-align: left;
			height:.44rem;
			line-height:.36rem;
		}
		
	}
</style>
