<template>
	<div class="home">
		<mt-header fixed class="header_top">
			<a href="" slot="left">
				<mt-button icon="back">ele.com</mt-button>
			</a>
			<span slot="right" v-if="!isUserOk">
				<!-- name搭配params使用 相当于post，不会在地址栏显示 -->
				<!-- path搭配query使用 相当于get 会在地址栏显示传值 -->
				<router-link to="/login">
					<mt-button>登录</mt-button>
					|
					<mt-button>注册</mt-button>
				</router-link>
			</span>
			<span slot='right' v-else>
				<router-link to='/about'>
					<i class="iconfont icon-user" style="font-size:.4rem"></i>
				</router-link>
			</span>
		</mt-header>
		<div style="padding-top:.8rem;">
			<mt-cell class=" now-city after" title="当前定位城市" value="定位不准时,请在城市列表中选择"></mt-cell>
			<mt-cell class="my-city col after" :title="nowCity.name" value="＞"></mt-cell>
			<!-- 热门城市 -->
			<hot-city :hotCity = 'hotCity'></hot-city>
			<!-- 其他城市 -->
			<txt-loading :isShow = "loading"></txt-loading>
			<other-city :cityList = "cityList"></other-city>
		</div>
		
	</div>
</template>

<script>
	//热门城市
	import hotCity from '@/components/hotCity'
	//其他城市
	import otherCity from '@/components/otherCity'
	//loading图
	import txtLoading from '@/components/loading'
	//请求方法
	import {getCityList,getHotCity} from '@/api/api'
	//vuex
	import {mapState,mapMutations} from 'vuex'
	import localsession from '@/utils/localsession'
	export default{
		data(){
			return {
				//城市列表数据数组
				cityList:[],
				//热门城市
				hotCity:[],
			}
		},
		//注册组件
		components:{
			//热门城市
			hotCity,
			//其他城市
			otherCity,
			//loading图
			txtLoading
		},
		//计算属性
		computed:{
			...mapState(['loading','nowCity','userinfo','isLogin']),
			isUserOk(){
				if(localsession.getLocal('userinfo')){
					this.getUserInfo(localsession.getLocal('userinfo'))
				}else{
					this.getUserInfo(null)
				}
				return this.isLogin
			},
			isUser(){
				return this.userinfo
			}
			
		},
		//方法
		methods:{
			...mapMutations(['getUserInfo']),
			//获取城市列表
			getCityList(){
				getCityList().then(res=>{
					this.cityList = res
				}).catch(err=>{
					console.log(err)
				})
			},
			//热门城市
			getHotCity(){
				getHotCity().then(res=>{
					this.hotCity = res
				}).catch(err=>{
					console.log(err)
				})
			},
		},
		//此时组件实例刚创建完毕，属性已经绑定，但是DOM还没生成，$el属性还不存在，页面还未显示
		created(){
			//城市列表
			this.getCityList(),
			//热门城市
			this.getHotCity()
		}
	}
</script>

<style>
	 .mint-header a{
		 color:#fff;
	}
</style>
