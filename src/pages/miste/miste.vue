<template>
	<div class="misteIndex">
		<all-header>
			<span slot="headerLeft">
				<router-link to="/">
					<i class="iconfont icon-search"></i>
				</router-link>
			</span>
			<span slot="headerTitle" v-if="indexHomeData">
				{{indexHomeData.name}}
			</span>
		</all-header>
		<!-- 内容 -->
		<div class="main-content">
			<div class="miste">
				<!-- 顶部分类轮播组件 -->
				<miste-swiper :dataJson = "foolMenuList"></miste-swiper>
				<load v-if="isLoadNum != 1"></load>
				<!-- 附近商家组件 -->
				<h4 class="fujin">
					<i class="iconfont icon-location"></i>附近商家 
				</h4>
				<keep-alive>
					<nearby-shops></nearby-shops>
				</keep-alive>
			</div>
		</div>
	</div>
	
	
</template>

<script>
	// 头部轮播图组件
	import misteSwiper from '@/components/misteSwiper'
	// 附近商家组件
	import nearbyShops from '@/components/nearbyShops'
	//load组件
	import load from '@/components/load'
	import {mapState,mapActions} from 'vuex'
	//请求api
	import {foolMenu,indexGeohash} from '@/api/api'
	import allHeader from '@/components/globel/header'
	import localsession from '@/utils/localsession'
	export default{
		data(){
			return{
				//食品分类数据
				foolMenuList:[],
				isLoadNum:1,
				//根据经纬度获取的主页数据
				indexHomeData:{}
			}
		},
		//注册组件
		components:{
			//头部食品分类组件
			misteSwiper,
			//附近商家组件
			nearbyShops,
			//load
			load,
			allHeader
		},
		methods:{
			...mapActions(['pickAddress']),
			//获取顶部分类组件
			getFoolMenu(){
				this.isLoadNum = this.isLoadNum - 1
				foolMenu().then(res=>{
					//因为swiper组件的原因，我们想要1页显示8条数据，但是数据请求出来不确定。所以我们要处理一下。以下是过程
					//_data为当前请求到的数据
					let _data = res;
					//获取当前有多少页,数据总条数/8就等于有几页
					let num = parseInt(_data.length / 8)
					//定义一个最后要输出的数组
					let category = []
					//定义一个将_data分为若干个arr,最终会将其加入到category里面
					let arr = []
					//先进入循环num页的
					for(let i = 0;i<num;i++){
						//此时会循环2次。因为num此时是2，每次进来给arr都设置空数组
						arr = []
						//此时在循环里面在嵌套一层循环，h小于8，是因为我们需要将一页分成8条
						for(let h = 0;h<8;h++){
							//因为num会执行两次，所以这里的意思是num执行第一次的时候进入这个循环，此时i=0;这个循环降数据中的每一条都添加到arr数组里面，
							//然后num再执行第二次。又是一个全新的arr数组。此时i = 1，然后继续将1*8+当前循环次数的数据添加到arr数组里面
							arr.push(_data[i * 8 + h])
						}
						//此时arr里面的循环两次。所以有两个arr的值，将这两次的循环的arr值添加给category。此时category有两个值。数组arr[0]和数组arr[1]
						category.push(arr)
					}
					//此时，降arr清空
					arr = []
					//还有一种情况。就是获取到的数据也许不是8的倍数,循环剩下的数
					//判断如果num * 8小于数据的总数说明不是8的倍数
					if(num * 8 < _data.length){
						//那就从当前页*8之后开始循环
						for(let k = num * 8;k<_data.length;k++){
							//将总页数*8+当前循环数的数据添加到arr里面
							arr.push(_data[num*8+k])
						}
						//将新的arr数组数据添加总数据category中
						category.push(arr)
					}
					//将category赋值给已经定义的数据
					
					this.foolMenuList = category
					this.isLoadNum = this.isLoadNum + 1
				}).catch(err=>{
					console.log(err)
					this.isLoadNum = this.isLoadNum + 1
				})
			},
			//获取当前经纬度下的详细信息
			async getIndexHomeData(){
				let res = await indexGeohash(this.getGeohash.geohash)
				this.indexHomeData = res
			},
			
			
		},
		//vue声明周期，讲beforeMount编译的内容绑定到$el上。DOM结构生成。页面展示出来
		//用于发送异步请求
		mounted(){
			this.getFoolMenu()
			// console.log(this.pickcityinfo)
		},
		created(){
			this.getIndexHomeData()
		},
		computed:{
			...mapState(['pickcityinfo']),
			getGeohash(){
				if(localsession.getSession('pickCity')){
					this.pickAddress(JSON.parse(localsession.getSession('pickCity')))
				}
				return this.pickcityinfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.misteIndex{
		 
		height:100%;
		.fujin {
			margin:.2rem .2rem 0.1rem .2rem;
			color:#333;
			font-size:.28rem;
			font-weight: normal;
			i{
				margin-right:.1rem;
			}
		}
	}
</style>
