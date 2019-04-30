<template>
	<div class="city">
		<mt-header fixed :title="nowCity.name" class="header_top">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<mt-button slot="right">
				<router-link to="/">
					选择城市
				</router-link>
			</mt-button>
		</mt-header>
		<div class="content">
			<div class="serach_city">
				<mt-field placeholder="输入学校、商务楼、住址" v-model="cityMessage"></mt-field>
				<p>
					<mt-button type="primary" size="large" class="m2" @click="searchClickCity(nowCity.id,cityMessage)">提交搜索</mt-button>
				</p>
			</div>
			<div class="cityEnd">
				<div class="serach_back" v-if="endCity.length < 1">
					<h5>
						搜索历史 
					</h5>
					<his-city :hisListCity = 'hisListCity'></his-city>
					<h6 @click="clearAll">
						清空所有
					</h6>
				</div>
				<div class="serach_now" v-else>
					<serach-city :sechCity = 'endCity'></serach-city>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//搜索结果列表
	import serachCity from '@/components/serachCity'
	//取出state的值
	import {mapState} from 'vuex'
	import {serachNowCity} from '@/api/api'
	//历史记录
	import hisCity from '@/components/hisCity'
	//localsession封装函数
	import localsession from '@/utils/localsession'
	export default{
		data(){
			return {
				//输入内容
				cityMessage:'',
				//搜索结果数组
				endCity:[],
				//历史记录
				hisListCity:[]
			}
		},
		components:{
			//结果列表
			serachCity,
			//历史记录
			hisCity
		},
		computed:{
			...mapState(['nowCity']),
			//历史记录
		},
		methods:{
			//搜索
			searchClickCity:function(id,data){
				//判断输入是否为空
				if(this.cityMessage == ''){
					this.$toast({
						message:'搜索内容不能为空！',
						duration:3000
					})
					return
				}else{
					//发起请求
					serachNowCity(id,data).then(res=>{
						//判断是否有搜到信息
						if(res.length < 0 || res.length == ''){
							this.$toast({
								message:'没有搜到相关信息，请重新输入！',
								duration:3000
							})
							return
						}else{
							res.map(function(item){
								item.num = id
							})
							//将搜索到的结果赋值给数组
							this.endCity = res
						}
					}).catch(err=>{
						console.log(err)
					})
				}
			},
			//历史记录
			getHisList(){
				this.hisListCity = JSON.parse(localsession.getSession('hisList'))
			},
			//清空历史记录
			clearAll(){
				localsession.removeSession('hisList')
				this.hisListCity.splice(0,this.hisListCity.length)
			},
		},
		//此处将beforeMount中编译的内容代码绑定到$el属性上，此时结构生成，页面展示出来，适合发送异步请求
		mounted(){
			this.getHisList()
		}
	}
</script>

<style lang="scss" scoped>
	.header_top a{
		color:#fff;
	}
	.content {
		padding-top:.8rem;
		.serach_city {
			margin:.2rem 0;
			background: #fff;
			border-top:1px solid #e7e7e7;
			border-bottom:1px solid #e7e7e7;
			padding:.2rem 0;
			input {
				border:1px solid #e7e7e7;
				border-radius: 5px;
				padding:.1rem;
			}
			p{
				margin:.2rem .2rem 0 .2rem;
				.m2{
					font-size:.32rem
				}
			}
		}
		.cityEnd {
			.serach_back{
				h5{
					font-size:.32rem;
					border-bottom: 1px solid #e7e7e7;
					padding:0 .2rem .2rem .2rem;
				}
				h6{
					text-align: center;
					font-size:.28rem;
					color:#333;
					font-weight: normal;
					line-height:.64rem;
				}
			}
			
		}
	}
</style>
