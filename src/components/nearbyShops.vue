<template>
	<!-- 附近商家 -->
	<div class="nearbyShops" ref="ulshop">
		<ul class="shops" >
			<li v-for="(item,index) in nearbyShopsData" :key="index">
				<router-link :to="{path:'/shop',query:{'geohash':geohash,'id':item.id}}">
					<span class="img">
						<img :src="imgshopUrl + item.image_path" alt="">
					</span>
					<div class="text">
						<h5>
							<b>品牌</b>
							<font> {{item.name}}</font>
							<em class="bz">
								<i v-for="(i,index) in item.supports" :key="index">
									{{i.icon_name}}
								</i>
							</em>
						</h5>
						<div class="starDiv">
							<!-- 星星组件 -->
							<star :dataJson="item.rating"></star>
							
							<font class="score">
								{{item.rating}}
							</font>
							<font class="xl">
								月售{{item.recent_order_num}}单
							</font>
							<div class="rating-order">
								<span class="fengniao" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
								<span class="zhuntime">准时达</span>
							</div>
						</div>
						<p class="order-time">
							￥{{item.float_minimum_order_amount}}起送 / {{item.piecewise_agent_fee.tips}}
							<span class="juli-time">
								{{item.distance}} / <font>{{item.order_lead_time}}</font>
							</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
		<p class="loadText" v-if="nearbyShopsData.length <= 0">
			数据加载中...
		</p>
	</div>
</template>

<script>
	//星星组件
	import star from './star'
	//请求api
	import {nearbyShopList} from '@/api/api'
	import {mapState} from 'vuex'
	import {Indicator} from 'mint-ui'
	export default{
		data(){
			return{
				nearbyShopsData:[],
				//图片路径
				imgshopUrl:'http://cangdu.org:8001/img/',
				//store取来的选取的城市数据
				cityAddress:this.$store.state.pickcityinfo.latitude ? this.$store.state.pickcityinfo : {
					latitude : 0, 
					longitude: 0,
				},
				geohash:this.$route.query.geohash,
				offset:0,
				lodingMore:false,
				//防止重复获取
				noRepeat:false, 
			}
		},
		computed:{
			...mapState(['pickcityinfo']),
			 
		},
		components:{
			star
		},
		watch:{
			cityAddress(newValue){
				this.cityAddress = newValue
			}
		},
		methods:{
			//获取附近商家列表数据
			async getNearbyShopsList(){
				let res = await nearbyShopList(this.cityAddress.latitude,this.cityAddress.longitude,this.offset)
				if(res){
					this.nearbyShopsData = res
				}
			},
			//滚动
			scrollGetData(){
				//总高度
				var allHeight = this.$refs.ulshop.offsetHeight || this.$refs.ulshop.clientHeight
				//可视高度
				var ksHeight = document.documentElement.clientHeight
				//滚动距离
				var gdHeight = document.body.scrollTop || document.documentElement.scrollTop
				if(ksHeight + gdHeight > allHeight){
					this.lodingMore = true
					this.getMoreData()
				}else{
					this.lodingMore = false
				}
			},
			//加载更多数据
			async getMoreData(){
				if(this.noRepeat){
					return 
				}
				this.noRepeat = true
				this.offset += 20
				Indicator.open({
					 text:'加载中,请稍后',
					 spinnerType: 'snake'
				})
				let res = await nearbyShopList(this.cityAddress.latitude,this.cityAddress.longitude,this.offset)
				Indicator.close()
				if(res){ 
					
					this.nearbyShopsData = [...this.nearbyShopsData,...res]
				}
				this.noRepeat = false
			}
		},
		//将beforeMount编译好的内容绑定到$el属性中，此时DOM结构生成。页面显示出来
		//用于发送异步数据
		mounted(){
			this.getNearbyShopsList(),
			window.addEventListener('scroll',this.scrollGetData)
		},
		watch:{
			 
		},
		//离开页面
		destroyed(){
			window.removeEventListener('scroll',this.scrollGetData)
		}
	}
</script>

<style lang="scss" scoped>
	.nearbyShops {
		margin-top:0;
		background: #fff;
		border-top:1px solid #e7e7e7;
		padding:.2rem;
		margin-bottom:1rem;
		h4{
			font-size:.28rem;
			font-weight: normal;
			display: flex;
			align-items:center;
			margin-bottom: .2rem;
			color:#666;
			i{
				font-size:.3;
				color:#666;
				margin-right:.1rem;
			}
		}
		.shops {
			overflow: hidden;
			li{
				display:flex;
				margin-bottom:.2rem;
				padding-bottom: .2rem;
				border-bottom: 1px solid #e7e7e7;
				a{
					display: flex;
					width:100%;
					span.img{
						width:1.6rem;
						margin-right:.2rem;
						display: inline-block;
					}
					.text {
						width:100%;
						h5 {
							font-size:.32rem;
							color:#333;
							display: flex;
							b{
								background: #e33f5a;
								font-size:.24rem; 
								color:#fff;
								padding:.08rem;
								 
							}
							em.bz{
								float:right;
								font-size:.24rem;
								color:#999;
								font-weight: normal;
								margin-left:auto;
							}
							font{
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								width:calc(100% - 1.6rem);
							}
						}
					}
					.starDiv{
						display: flex;
						align-items: center;
						margin:.1rem 0;
						.score {
							font-size:.24rem;
							color:#eba210;
							display: inline-block;
							line-height:.48rem;
							margin:0 .1rem;
						}
						.xl{
							font-size:.24rem;
							color:#666;
							line-height:.48rem;
						}
						.rating-order {
							margin-left:auto;
							line-height:.48rem;
							font-size:.24rem;
							.fengniao {
								background: #3190e8;
								color:#fff;
								padding:.06rem;
								border-radius: 2px;
							}
							.zhuntime {
								border:1px solid #3190e8;
								padding:.04rem;
								border-radius: 2px;
								color:#3190e8
							}
						}
					}
					.order-time {
						font-size:.24rem;
						color:#666;
						.juli-time {
							color:#999;
							float:right;
							margin-left:auto;
							font{
								color:#3190E8;
							}
						}
					}
				}
				
			}
		}
		.loadText {
			text-align: center;
			color:#999;
			font-size:.28rem;
		}
	}
</style>
