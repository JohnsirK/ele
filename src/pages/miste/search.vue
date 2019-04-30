<template>
	<div class="search">
		<all-header>
			<span slot="headerTitle">
				搜索
			</span>
		</all-header>
		<div class="main-content">
			<div class="serach_city">
				<mt-field placeholder="请输入商家或美食名称" v-model="searchKeyword" @input.native = 'checkInput'></mt-field>
				<p>
					<mt-button type="primary" size="large" class="m2" @click="actionSearch($route.query.geohash,searchKeyword)">提交搜索</mt-button>
				</p>
			</div>
			<div class="search_end" v-if="searchData.length > 0">
				<h3>
					搜索结果
				</h3>
				<dl>
					<dt>
						商家
					</dt>
					<dd v-for="(item,index) in searchData" :key="index">
						<router-link :to="{path:'/shop',query:{'id':item.id}}">
							<span>
								<img :src="img_url + item.image_path" :alt="item.name">
							</span>
							<div class="seinfo">
								<h4><em>{{item.name}}</em> <font v-if="item.delivery_mode">{{item.delivery_mode.text}}</font><font v-else>商家配送</font></h4>
								<h5>
									月售 {{item.recent_order_num}} 单
								</h5>
								<h6>
									{{item.float_delivery_fee || item.float_minimum_order_amount}}元起送 / 距离 {{item.distance}}
								</h6>
							</div>
						</router-link>
					</dd>
				</dl>
			</div>
			<div class="his_search" v-else>
				<h4>历史记录</h4>
				<ul>
					<li v-for="(item,index) in hisData" :key="index">
						<font>
							{{item}}
						</font> 
						<i class="iconfont icon-close" @click.stop="revemoIndex(index)"></i>
					</li>
				</ul>
				<div class="allClear" @click="allClear">
					清空全部历史记录
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {searchShop} from '@/api/api'
	import allHeader from '@/components/globel/header'
	import localsession from '@/utils/localsession'
	import {Indicator,Toast} from 'mint-ui'
	export default{
		data(){
			return {
				searchKeyword:null,
				searchData:[],
				img_url:'//elm.cangdu.org/img/',
				//存入到localsession里面
				searchListArr:[],
				//获取localsession里面的数据
				hisData:[]
			}
		},
		methods:{
			//提交搜索
			async actionSearch(geohash,keyword){
				if(keyword == null || keyword == "" || keyword == undefined){
					Toast({
						message:'搜索词不能为空！'
					})
				}else{
					this.searchListArr.push(keyword)
					localsession.setLocal('searchShopList',this.searchListArr)
					let zt = Indicator.open({
						text:'搜索中',
						spinnerType: 'snake'
					})
					let res = await searchShop(geohash,keyword) 
					Indicator.close(zt)
					this.searchData = res
				}
				
			},
			//获取历史记录
			hisSearchList(){
				this.hisData = JSON.parse(localsession.getLocal('searchShopList'))
			},
			//检测输入框是否为空
			checkInput(){
				if(this.searchKeyword == '' || this.searchKeyword == null){
					this.searchData = false
					this.hisSearchList()
				}
			},
			//清除搜索记录
			allClear(){
				localsession.removeLocal('searchShopList')
				this.hisData = [] 
			},
			//删除当前项
			revemoIndex(index){
				this.hisData.splice(index,1)
				localsession.setLocal('searchShopList',this.hisData)
			}
		},
		components:{
			allHeader
		},
		computed:{
		
		},
		mounted(){
			this.hisSearchList()
		},
		watch:{
			searchKeyword(value){
				if(!value){
					this.searchData = false
					this.hisSearchList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search{
		height:100%;
		.serach_city{
			margin: .2rem 0;
			background: #fff;
			border-top: 1px solid #e7e7e7;
			border-bottom: 1px solid #e7e7e7;
			padding: .2rem 0; 
			.mint-cell-value{
				border: 1px solid #e7e7e7;
				border-radius: 5px;
				padding: .1rem;
			}
			p{
				margin: .2rem .2rem 0 .2rem;
			}
		}
		.search_end{
			 h3{
				 font-size:.32rem;
				 margin-bottom: .2rem;
				 padding:0 .2rem;
			}
			 dl{
				 padding:.2rem;
				 background: #fff;
				 dt{
					 margin-bottom: .1rem;
				 }
				 dd{
					 border-bottom:.02rem solid #e7e7e7;
					 padding-bottom: .2rem;
					 margin-bottom: .2rem;
					 width:100%;
					 display: flex;
					 a{
						 width:100%;
						 display: flex;
						 span{
							 display: flex;
							 align-items: center;
							 width:1.2rem;
							 margin-right:.2rem;
						 }
						 .seinfo {
							 width:calc(100% - 1.4rem);
							 h4{
								 display: flex;
								 color:#333;
								 font-weight: normal;
								 font-size:.32rem;
								 em{
									 width:calc(100% - 1.2rem);
									 padding-right:.2rem;
									 text-overflow: ellipsis;
									 white-space: nowrap;
									 box-sizing: border-box;
									 overflow: hidden;
									 display: inline-block;
								 }
								 font{
									 margin-left:auto;
									 text-align: center;
									 background: #edeaea;
									 padding:.04rem 0.1rem;
									 font-size:.24rem;
									 width:1.2rem;
									 display:inline-block;
								 }
							 }
							 h5{
								 color:#999;
								 font-size:.24rem;
								 font-weight: normal;
							 }
							 h6{
								 color:#666;
								 font-size:.24rem;
								 font-weight: normal;
							 }
						 }
					 }
					 
				 }
				
			 }
		}
		.his_search {
			h4{
				padding:0 .2rem;
			}
			.allClear {
				color:#999;
				font-size:.28rem;
				text-align: center;
				width:100%;
				line-height:.72rem;
			}
			ul{
				width:100%;
				overflow: hidden;
				background: #fff;
				margin-top:.1rem;
				li{
					display: flex;
					width:100%;
					padding:0 .2rem .2rem .2rem;
					box-sizing: border-box;
					position: relative;
					width:100%;
					border-bottom:.02rem solid #e7e7e7;
					margin:.2rem 0 0 0;
					color:#333;
					i{
						margin-left:auto;
					}
				}
			}
		}
	}
</style>
