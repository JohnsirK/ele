<template>
	<div class="confirmOrder">
		<div>
			<globel-header>
				<span slot="headerTitle">
					确认订单
				</span>
			</globel-header>
			<div class="main-content">
				<!-- {{shopDetailList.id}} -->
				<router-link to='/confirmOrder/deliAddress'>
					<div class="shoppingAddress white-bg mb2" v-if="addressSelcet.length > 0">
						<ul>
							<li>
								<span>
									<i class="iconfont icon-location"></i>
								</span>
								<div class="location">
									<h4>
										{{addressSelcet.name}}
										<b>
											{{addressSelcet.phone}}
										</b>
									</h4>
									<p>
										{{addressSelcet.address}} - {{addressSelcet.address_detail}} 
									</p>
								</div>
								<font>
									{{addressSelcet.tag_type | tag_txt}}
								</font>
							</li>
						</ul>
					</div>
					<div class="shoppingAddress white-bg mb2" v-else="">
						<span>
							<i class="iconfont icon-location"></i>请添加一个收货地址
						</span>
						<i class="iconfont icon-right goAddressIcon">
							
						</i>
					</div>
				</router-link>
				<!-- 送达时间 -->
				<div class="deliveryTime white-bg mb2">
					<h5>送达时间</h5>
					<p>
						<span>尽快送达 | 预计 20 分钟后送达</span>
						<font style="background: rgb(87, 169, 255);">蜂鸟专送</font>
					</p>
				</div>
				<!-- 支付方式 -->
				<div class="modeMoney white-bg mb2">
					<ul>
						<li @click="modeMoney = !modeMoney">
							<font>支付方式</font>
							<span>{{pickOptions}} <i class="iconfont icon-right"></i></span>
						</li>
					</ul>
				</div>
				<mt-popup v-model="modeMoney" position="bottom">
					<div class="modeMoneyDialog">
						<mt-radio align="right" title='支付方式' v-model='pickOptions' :options = 'modeOptions' @click.native="closeMode"></mt-radio>
					</div>
				</mt-popup>
				<!-- 订单详情 -->
				<div class="orderInfo white-bg mb2">
					<dl>
						<dt>
							<span>
								<img :src="img_url + shopDetailList.image_path" alt="">
							</span>
							{{shopDetailList.name}}
						</dt>
						<dd v-for="(item,index) in saveData" :key="index">
							<font>
								{{item.shop.name}}
							</font>
							<b>
								<em>
									x {{item.num}}
								</em>
								<i>
									￥{{item.shop.specfoods[0].price}}
								</i>
							</b>
						</dd>
						
					</dl>
					<div class="totalmoney">
						<p>
							配送费：￥5
						</p>
						<p>
							订单:￥{{money}}
						</p>
						<p class="hlight">
							<b>待支付：￥{{money + 5}}</b>
						</p>
					</div>
				</div>
				<!-- 订单备注 -->
				<div class="modeMoney white-bg mb2">
					<ul>
						<li>
							<router-link to='/confirmOrder/remark'>
								<font>订单备注</font> 
								<span>{{remarkInfoPick || remarkInfoTxt ? saveMarkInfoData : '口味、偏好等'}}<i class="iconfont icon-right"></i></span>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="goOrder">
				<span>
					待支付 ￥{{money + 5}}
				</span>
				<font @click="goTotal">
					确认下单
				</font>
			</div>
		</div>
		<!-- 备注页面 -->
		<transition name="right">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import {mapState} from 'vuex'
	//头部
	import globelHeader from '@/components/globel/header'
	//获取数据
	import {joinShop,addOrders,deliAddress} from '@/api/api'
	import localsession from '@/utils/localsession'
	export default{
		data(){
			return {
				saveData:null,
				//返回数据
				backData:[],
				//商家数据
				shopInfoData:[],
				//支付方式
				modeMoney:false,
				//单选框的值
				pickOptions:'微信支付',
				//支付方式
				modeOptions:[
					{
						label:'微信支付',
						value:'微信支付'
					},{
						label:'支付宝',
						value:'支付宝'
					},{
						label:'在线支付',
						value:'在线支付'
					}
				],
				//默认地址
				addressSelcet:[],
				//下单的数据
				orderListData:[],
				img_url:'//elm.cangdu.org/img/',
			}
		},
		components:{
			globelHeader
		},
		computed:{
			...mapState(['remarkInfoPick','remarkInfoTxt','userinfo','isLogin','nowAddress','shopDetailList']),
			money(){
				let m = 0
				for(let i = 0;i<this.saveData.length;i++){
					m += (this.saveData[i].shop.specfoods[0].price * this.saveData[i].num)
				}
				return m
			},
			saveMarkInfoData:function(){
				 let str = new String;
				 if (this.remarkInfoPick) {
					 Object.values(this.remarkInfoPick).forEach(item => {
						 str += item[1] + '，';
					 })
				 }
				 //是否有自定义备注，分开处理
				 if (this.remarkInfoTxt) {
					 return str + this.remarkInfoTxt;
				 }else{
					 return str.substr(0, str.lastIndexOf('，')) ;
				 } 
			}
		},
		methods:{
			 closeMode(){
				 this.modeMoney = false
			 },
			 //初始化数据，因为后端要求的字段
			 initOrderData(){
				 var newArr = new Array
				 Object.values(this.saveData).forEach(items => {
					 Object.values(items).forEach(item => {
						 if(item.item_id != undefined){
							 newArr.push({
								 attrs:[],
								 extra:{},
								 id:item.specfoods[0].food_id,
								 name:item.specfoods[0].name,
								 packing_fee:item.specfoods[0].packing_fee,
								 price:item.specfoods[0].price,
								 quantity:items.num,
								 sku_id:item.specfoods[0].sku_id,
								 specs:[""],
								 stock:item.specfoods[0].stock
							 })
						 }
					 })
				 })
				this.orderListData = [newArr]
			 },
			 //结算
			 async goTotal(){
				
				 if(!this.isLogin || !this.userinfo){
					 Toast({
					 	 message:'请登录!', 
					 	 duration:3000,
					 })
					 this.$router.push('/login')
					
				 }else if(!this.addressSelcet){
					 Toast({
						 message:'请选择地址!', 
						 duration:3000,
					})
				 }else{
					  let user_id = JSON.parse(this.userinfo)
					 
					 //下单
					 if(this.userinfo){
						  let res = await addOrders(user_id.user_id,3276,this.addressSelcet.id,this.shopDetailList.id,this.remarkInfoPick,JSON.parse(JSON.stringify(this.orderListData)))
						 if(res.status == 1){
							 Toast({
								 message:'付款成功！', 
								 duration:5000,
								 iconClass: 'iconfont icon-check'
							 })
							 this.$router.push('/order')
						 }
					 }
					

				 }
			 },
			 //设置默认地址
			 async getMorenAddress(){
				 if(!(localsession.getLocal('userinfo'))){
					return 
				 }else{
					 let id = this.userinfo
					 let res = await deliAddress(id.user_id)
					 this.addressSelcet = res[0]
				 }
				
			 },
			 //购物车数据
			 // console.log(this.saveData)
			async getmore(){
				if(localsession.getLocal('defaultAddress')){
					this.addressSelcet = JSON.parse(localsession.getLocal('defaultAddress'))
				}else{
					this.addressSelcet = []
				}
			}
		},
		created() {
			this.saveData = this.$store.state.myfoodinfo
			console.log(this.userinfo)
		},
		mounted(){
			this.getMorenAddress(),
			this.initOrderData(),
			this.getmore()
		},
		watch:{
			nowAddress(val){ 
				this.addressSelcet = val
			},
			'$route'(){
				this.getMorenAddress()
			}
		},
		filters:{
			tag_txt:function(value){
				switch(value){
					case 2:
						return '家'
						break
					case 3:
						return '学校'
						break
					case 4:
						return '公司'
						break
				}
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.mint-toast{
		padding:.2rem .4rem !important;
	}
	.confirmOrder{
		
		.goOrder {
			background: #3c3c3c;
			height:1rem;
			line-height:1rem;
			width:100%;
			position: fixed;
			bottom:0;
			left:0;
			z-index: 5;
			display: flex;
			span{
				color:#fff;
				margin-left:.2rem;
			}
			font{
				margin-left:auto;
				background: #3190e8;
				color:#fff;
				width:2rem;
				height:100%;
				display: block;
				text-align: center;
			}
		}
		.shoppingAddress {
			display: flex;
			padding:.3rem .3rem .4rem .3rem;
			background:#fff url(../../assets/images/bg.png) bottom repeat-x;
			background-size: 8% 4%;
			ul{
				overflow: hidden;
				width:100%;
				li{
					display: flex;
					align-items: center;
					width:100%;
					span{
						i{
							font-size:.48rem;
							color:#999;
						}
					}
					h4 {
						color:#333;
						b{
							color:#666;
							font-size:.24rem;
							font-weight: normal;
						}
					}
					p{
						color:#999;
						font-size:.24rem;
					}
					font{
						margin-left:auto;
						padding:0 .1rem;
						font-size:.24rem;
						border: 1px solid #1e71fa;
						color:#1e71fa; 
						border-radius: .08rem;
					}
				}
			}
			span{
				color:#666;
				font-size:.28rem;
				i{
					margin-right:.1rem;
					color:#3190e8
				}
			}
			.goAddressIcon {
				margin-left:auto;
				color:#999
			}
		}
		.deliveryTime {
			border-left:.08rem solid #3190e8;
			h5{
				color:#333;
				font-weight: normal;
				font-size:.28rem;
			}
			p{
				font-size:.24rem;
				margin-top:.1rem;
				display: flex;
				color:#3190e8;
				 
				align-items: center;
				font{
					margin-left:auto;
					 
					color:#fff;
					border-radius: .04rem;
					padding:.04rem .1rem;
				}
			}
		}
		.modeMoney {
			ul{
				overflow: hidden;
				li{
					display: flex;
					font{
						width:1.6rem;
						flex-shrink: 0;
					}
					a{
						display: flex;
						color:#333;
						width:100%;
						span{
							margin-left:auto;
							color:#999;
							font-size:.28rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
					span{
						margin-left:auto;
						color:#999;
						font-size:.28rem;
					}
				}
			}
		}
		.orderInfo {
			background:#fff url(../../assets/images/bg.png) top repeat-x;
			background-size: 0.6rem .04rem;
			dl{
				overflow: hidden;
				dt{
					display: flex;
					align-items: center;
					text-align: center;
					margin-bottom: .2rem;
					span{
						width:.8rem;
						border-radius: .8rem;
						overflow: hidden;
						margin-right:.1rem;
					}
				}
				dd{
					padding:.2rem 0;
					border-bottom:1px dashed #c3c0c0;
					display: flex;
					font{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					b{
						margin-left:auto;
						text-align: right;
						font-weight: normal;
						em{
							color:#ef4013;
							
						}
						i{
							width:1rem;
							display:inline-block;
						}
					}
				}
			}
			.totalmoney {
				margin-top:.4rem;
				p{
					text-align: right;
					font-size:.28rem;
					color:#999;
				}
				p.hlight{
					font-size:.32rem;
					color:#ef4013
				}
			}
		}
		.mint-popup{
			width:calc(100% + 1px);
		}
		.modeMoneyDialog {
			width:100%;
		}
	}
</style>
