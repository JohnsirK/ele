<template>
	<div id="shop" class="bgfff">
		<div class="big" v-if="isRouter">
			<div class="topbg">
				<div class="topShopInfo">
					<span class="txImg">
						<img :src="imgpath + shopListData.image_path" alt="">
					</span>
					<div class="shop_info" @click="saveShopDetail(shopListData)">
						<router-link to='/shop/shopDetail'>
							<h4>
								<font>品牌</font>{{shopListData.name}}
							</h4>
							<h5>
								 <font v-if="shopListData.delivery_mode">
									 {{shopListData.delivery_mode.text}}
								</font>
								 /{{shopListData.float_minimum_order_amount}}分钟送达/
								 <font v-if="shopListData.piecewise_agent_fee">
									 {{shopListData.piecewise_agent_fee.tips}}
								 </font>
							</h5>
							<p>
								在线支付满28减5  
							</p>
						</router-link>
					</div>
					<div class="rightIcon">
						<router-link to="" style="color:#fff">
							<i class="iconfont icon-right"></i>
						</router-link>
					</div>
				</div>
				<div class="newgg">
					<b>公告</b>
					<em>{{shopListData.promotion_info}}</em>
					<i class="iconfont icon-right"></i>
				</div>
				<!-- 背景 -->
				<div class="bgImg">
					<img :src="imgpath + shopListData.image_path" alt="">
				</div>
			</div>
			<!-- 商品和评论 -->
			<div class="shopMid">
				<div class="mytab">
					<div @click="isShop = true" :class="{on:isShop}"><font>商品</font></div>
					<div @click="isShop = false" :class="{on:!isShop}"><font>评价</font></div>
				</div>
			</div>
			<!-- 菜品 -->
			<transition name="left">
				<div class="shopMenu" v-show="isShop">
					<div class="leftMenu" ref="menu">
						<ul>
							<li v-for="(item,index) in getShopNum" :key="index" :class="{'current':currentIndex === index}" @click="selectMenu(index)">
								{{item.name}}
								<span class="rednum" v-if="item.mynum">
									{{item.mynum}}
								</span>
							</li>
						</ul>
					</div>
					<div class="rightMenu" ref="mean"  >
						<ul>
							<li class="everyOneLi" v-for="(item,index) in getShopNum" :key="index">
								<h3>
									{{item.name}} <small>{{item.description}}</small>
								</h3>
								<div class="item" v-for="(li,index) in item.foods" :key="index">
									<router-link :to="{path:'/shop/menuDetail',query:{'name':li.name,'image_path':li.image_path,'description':li.description,'month_sales':li.month_sales,'rating':li.rating,'rating_count':li.rating_count,'satisfy_rate':li.satisfy_rate}}">
										<span class="img">
											<img :src="imgpath + li.image_path" alt="">
										</span>
										<div class="txt">
											<h4>{{li.name}}</h4>
											<p>{{li.tips}}</p>
											<h6>
												<font>7折</font>
												{{li.description}}
											</h6>
											<div class="money">
												<b>
													<em>￥</em>
														{{li.specfoods[0].price}}
												</b>
												<s>
													<em v-if="li.specfoods[1]">
														￥
														{{li.specfoods[1].price}}
													</em>
												</s>
												<div class="money-num">
													<div class="numadd" v-if="li.specfoods.length==1">
														<transition name="left" v-if="li.mynum">
															<span>
																<i @click.stop.prevent="removeCar(li)">
																	-
																</i>
																 <em style="color:#666;font-size:.24rem;">
																	 {{li.mynum}}
																 </em>
															</span>
														</transition>
														<i @click.stop.prevent="addCar(li)" class="add">+</i>
													</div>
													<div class="numenu" v-if="li.specfoods.length > 1">选规格</div>
												</div>
											</div>
										</div>
									</router-link>
									 
								</div>
							</li> 
						</ul>
					</div>
					<!-- 购物车 -->
					<div id="shopCart" class="shopCart">
						<div class="footShop">
							<div class="scart-icon" @click="changeShow">
								<i class="iconfont icon-gouwuche"></i>
								<small v-if="myfoodNum > 0">
									{{myfoodNum}}
								</small>
							</div>
							<div class="songd-money">
								<div class="no-money easy-no" v-if="myfoodMoney <= 0">
									未选购商品
								</div>
								<div class="no-money" v-else>
									<h5>
										￥{{myfoodMoney}}
									</h5>
									<p v-if="this.shopListData.piecewise_agent_fee">
										{{this.shopListData.piecewise_agent_fee.tips}}
									</p>
								</div>
							</div>
							<div class="jiesuan" :class="{on:isMyFood == 1}" @click="saveMyFood(myfood,shopListData)">
								<font v-if="!this.myfood">￥{{this.shopListData.float_minimum_order_amount}}起送</font>
								<font v-if="isMyFood == 2">差￥{{this.shopListData.float_minimum_order_amount - myfoodMoney}}起送</font>
								<router-link :to="{name:'confirmOrder',params:{'item':this.myfood,'geohas':this.$route.query.geohash,'id':shopListData.id,'shopInfoData':shopListData}}" v-if="isMyFood == 1">
									<font v-if="isMyFood == 1">去结算</font>
								</router-link>
							</div>
						</div>
					</div>
					<transition name="down">
						<div class="shopCartInfo" v-if="this.isShopGwc">
							<div class="bg-shop-div">
								<h4>
									购物车
									<span @click="allDelete">
										<i class="iconfont icon-delete"></i>
										清空
									</span>
								</h4>
								<div ref="scrolldiv" class="scroll-div">
									<ul>
										<li v-for="(item,index) in myfood" :key="index">
											<font>{{item.shop.name}}</font>
											<span>
												<em>
													¥{{item.shop.specfoods[0].price * item.num}}
												</em>
												<i @click="item.num -= 1">
													-
												</i>
												<b>
													{{item.num}}
												</b>
												<i class="add" @click="item.num += 1">
													+
												</i>
											</span>
										</li>
										
									</ul>
								</div>
							</div>
						</div>
					</transition>
					<transition name="fade">
						<div class="bg-block" v-if="this.isShopGwc" @click="changeShow">
							
						</div>
					</transition>
				</div>
			</transition>
			<transition name="right">
				<keep-alive>
					<div class="shopMenu" v-show="!isShop">
						<shop-comment :showShop = 'this.isShop'></shop-comment>
					</div>
				</keep-alive>
			</transition>
		</div>
		<!-- 菜品详情页面 -->
		<transition name="right">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	//引入better-scroll
	import BScroll from 'better-scroll'
	//请求api
	import {shopInfoList,shopMeanList,shopScoreList} from '@/api/api'
	//评论组件
	import shopComment from './shopComment'
	//vuex
	import {mapActions} from 'vuex'
	import localsession from '@/utils/localsession.js'
	
	export default{
		data(){
			return {
				listHeight:[],
				// 商家信息
				shopListData:[],
				//食品信息
				shopMeanData:[],
				//商家头像地址前缀
				imgpath:'http://cangdu.org:8001/img/',
				// 判断是商家还是评价页面
				isShop:true,
				scrollY:0,
				//评价信息
				score:'',
				//评价分类
				scoretags:'',
				//判断路由是否是shop
				isRouter:true,
				//购物车 
				myfood:[],
				//购物车显示隐藏
				isShopGwc:false,
				newFood:null,
				//起送状态
				numok:0,
				//购物车商品列表
				cartFoodList:[],
				//总价
				totalPrice:0
			}
		},
		//注册组件
		components:{ 
			shopComment
		},
		computed:{
			//计算购物车里面有几个物品
			myfoodNum(){
				var num = 0;
				for(let i = 0;i<this.myfood.length;i++){
					num += this.myfood[i].num
				}
				return num
			},
			//计算购物车里面的商品价格
			myfoodMoney(){
				let money = 0;
				for(let i = 0;i<this.myfood.length;i++){
					money += (this.myfood[i].shop.specfoods[0].price * this.myfood[i].num)
				}
				return money
			},
			//判断商家起送价与目前购物车价格
			isMyFood(){
				if(this.myfood){
					if(this.myfoodMoney >= this.shopListData.float_minimum_order_amount){
						return 1
					}else{
						return 2
					}
				}else{
					return false
				}
			},
			//获取每个菜品分类的高度
			currentIndex(){
				for(let i = 0;i<this.listHeight.length;i++){
					let h1 = this.listHeight[i]
					let h2 = this.listHeight[i+1]
					if(!h2 || (this.scrollY >= h1 && this.scrollY < h2)){
						return i;
					 }
				}
				return 0
			},
			//商品与购物车数量结合
			getShopNum(){
				let that = this
				for(let i = 0;i<this.shopMeanData.length;i++){
					let thisnum = 0
					for(let j = 0;j < this.shopMeanData[i].foods.length;j++){
						let isa = true
						for(let k = 0;k<this.myfood.length;k++){
							if(this.shopMeanData[i].foods[j].specfoods[0]._id == this.myfood[k].shop.specfoods[0]._id){
								that.shopMeanData[i].foods[j].mynum = this.myfood[k].num
								thisnum += this.myfood[k].num
								isa = false
								break 
							}
						}
						if(isa){
							that.shopMeanData[i].foods[j].mynum = 0
						}
					}
					that.shopMeanData[i].mynum = thisnum
				}
				return this.shopMeanData
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			//初始化better-scroll
			_initScroll(){
				if(!this.leftScroll){
					this.leftScroll = new BScroll(this.$refs.menu,{
						click: true,//滚动监听 scroll事件
					})
				}else{
					this.leftScroll.refresh()
				}
				if(!this.rightScroll){
					this.rightScroll = new BScroll(this.$refs.mean,{
						probeType:3			,//滚动监听 scroll事件
						click:true
					})
				}else{
					this.rightScroll.refresh()
				}
				this.rightScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			//计算每个li的高度保存到数组中
			_allHeight(){
				let foodList = this.$refs.mean.querySelectorAll('.everyOneLi')
				let height = 0
				this.listHeight.push(height)
				for(let i = 0;i<foodList.length;i++){
					let item = foodList[i]
					height += item.clientHeight;
					this.listHeight.push(height)
				}
			},
			//请求商铺数据
			getShopInfo(id){
				shopInfoList(id).then(res=>{
					this.shopListData = res 
				}).catch(err=>{
					console.log(err)
				})
			},
			//请求食品详情
			getShopMean(id){
				shopMeanList(id).then(res=>{
					this.shopMeanData = res
					//获取到的数据发生变化的时候执行
					this.$nextTick(function(){
						this._initScroll()
						this._allHeight()
					}) 
				}).catch(err=>{
					console.log(err)
				})
			},
			//菜品点击事件
			selectMenu(index){
				let foodList = this.$refs.mean.querySelectorAll('.everyOneLi')
				let el = foodList[index]
				this.rightScroll.scrollToElement(el,300)
			},
			...mapActions(['pickShopDetailList','nowMyFoodData']),
			//保存当前商铺信息到vuex
			saveShopDetail(obj){
				this.$store.dispatch('pickShopDetailList',obj)
			},
			//保存当前购物车数据到vuex
			saveMyFood(arr,obj){ 
				this.$store.dispatch('awaitMyFoodData',arr)
				console.log(obj)
				this.$store.dispatch('pickShopDetailList',obj)
			},
			//添加商品
			addCar(e){
				var that = this
				if(localsession.getSession('myfood')){
					var myfood = JSON.parse(localsession.getSession('myfood'))
					var isAdd = true
					for(var i = 0;i<myfood.length;i++){
						if(myfood[i].shop.item_id == e.item_id && myfood[i].shop.category_id == e.category_id && myfood[i].shop.restaurant_id == e.restaurant_id){
							myfood[i].num += 1
							isAdd = false
							break
						}
					}
					if(isAdd){
						myfood.push({"shop":e,"num":1})
					}
					that.myfood = myfood
					localsession.setSession('myfood',myfood)
				}else{
					let myfood = [{'shop':e,'num':1}]
					that.myfood = myfood
					localsession.setSession('myfood',myfood)
				}
			},
			//移除商品
			removeCar(e){
				for(let i = 0;i<this.myfood.length;i++){
					if(this.myfood[i].shop.specfoods[0]._id == e.specfoods[0]._id){
						this.myfood[i].num == 1?this.myfood.splice(i,1) : (this.myfood[i].num = this.myfood[i].num - 1)
						break
					}
				}
				localsession.setSession('myfood',this.myfood)
			},
			//显示隐藏
			changeShow(){
				this.numok += 1
				this.isShopGwc = !this.isShopGwc
			},
			//清空购物车
			allDelete(){
				this.myfood = []
			},
			//初始化购物车
// 			initCategoryNum(){
// 				let newArr = []
// 				let cartFoodNum = 0
// 				this.totalPrice = 0
// 				this.cartFoodList = []
// 				console.log(this.shopMeanData)
// 				console.log(this.myfood)
// 				this.shopMeanData.forEach((item,index) => {
// 					console.log(item)
// 					if(this.myfood && this.myfood[item.foods[0].category_id]){
// 						let num = 0
// 						Object.keys(this.myfood[item.foods[0].category_id][itemid]).forEach(itemid => {
// 							Object.keys(this.myfood[item.foods[0].category_id][itemid]).forEach(foodid => {
// 								let foodItem = this.myfood[item.foods[0].category_id][itemid][foodis]
// 								num += foodItem.num;
// 								if(item.type == 1){
// 									this.totalPrice += foodItem.num * foodItem.price
// 									if(foodItem.num > 0){
// 										this.cartFoodList[cartFoodNum] = {}
// 										this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id
// 										this.cartFoodList[cartFoodNum].item_id = itemid
// 										this.cartFoodList[cartFoodNum].foodid = foodid
// 										this.cartFoodList[cartFoodNum].num = foodItem.num
// 										this.cartFoodList[cartFoodNum].price = foodItem.price
// 										this.cartFoodList[cartFoodNum].name = foodItem.name
// 										this.cartFoodList[cartFoodNum].specs = foodItem.specs
// 										cartFoodNum++
// 									}
// 								}
// 							})
// 						})
// 						newArr[index] = num
// 					}else{
// 						newArr[index] = 0
// 					}
// 				})
// 				this.totalPrice = this.totalPrice.toFixed(2)
// 				console.log(this.cartFoodList)
// 			}
		},
		created(){
			this.getShopInfo(this.$route.query.id)
			this.getShopMean(this.$route.query.id)
			this.saveShopDetail(this.shopListData)
			
		},
		watch:{
			myfood:{
				handler(newValue,oldValue){
					for(let i = 0;i<newValue.length;i++){
						if(newValue[i].num == 0){
							newValue.splice(i,1)
						}
					}
					if(!(newValue.length >= 1)){
						this.isShopGwc = false
					}
					localsession.setSession('myfood',this.myfood)
				},
				deep:true
			},
			 
		},
		mounted(){
			if(localsession.getSession('myfood')){
				this.myfood = JSON.parse(localsession.getSession('myfood'))
			}
			this.$nextTick(function(){
				this._initScroll()
				 
			})
			
		},
	}
</script>

<style lang="scss" scoped>
	.big{ 
		-webkit-box-orient:vertical;
		height:100vh;
	}
	#shop{
		position:relative;
	}
	#shop {
		width:100%;
		height:100%; 
		.topbg {
			position: relative;
			max-height:2.64rem;
			overflow: hidden;
			z-index: 10;
			width:100%;
			height:2.64rem;
			.newgg{
				padding:0 .2rem;
				position: relative;
				display: flex;
				height:.64rem;
				line-height:.64rem;
				background: rgba(0,0,0,.6); 
				align-items: center;
				em{ 
					height:100%;
					overflow: hidden;
					font-size:.24rem;
					color:#fff;
				}
				i{
					color:#fff;
					margin-left:auto;
				}
				b{
					height:50%;
					font-size:.24rem;
					background: #fff;
					min-width: .6rem;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right:.1rem;
				}
			}
			.topShopInfo{
				padding:.2rem;
				min-height:1.6rem;
				align-items:center;
				background: rgba(0,0,0,.3);
				display: flex;
				span.txImg{
					width:1.2rem; 
				}
				.rightIcon {
					margin-left:auto;
					color:#fff;
				}
				.shop_info {
					margin-left:.2rem;
					h4{
						color:#fff;
						font-size:.36rem;
						font{
							background: red;
							font-size:.24rem;
							padding:0.06rem .1rem;
							margin-right:.1rem;
						}
					}
					h5{
						font-size:.24rem;
						margin:.1rem;
						color:#fff;
					}
					p {
						color:#fff;
						font-size:.28rem;
					}
				}
				
			}
			.bgImg{
				position: absolute;
				top:0;
				left:0;
				width:100%;
				display: flex;
				justify-content: center;
				height:100%;
				z-index:-1;
				filter:blur(10px);
				img{
					display: block;
					width:100%;
					height:100%;
				}
			}
		}
		.shopMid{
			background: #eee;
			height:.8rem;
			line-height:.8rem;
			box-sizing: border-box;
			.mytab{
				height:calc(100% - 2px);
				div{
					font{
						border-bottom: 2px solid #fff;
						display: inline-block;
					}
				}
				div.on{
					background: #fff;
					color:#1E71FA;
					font{
						border-bottom: 2px solid #1E71FA;
					}
				}
			}
			div{ 
				display: flex;
				flex:1;
				justify-content: center;
				color:#666562
			}
		}
		.shopMenu{
			height:calc(100% - 3.44rem);
			overflow: hidden;
			position: relative;
			.leftMenu {
				position:absolute;
				top:0;
				left:0;
				width:2rem;
				height:100%;
				background: #f4f4f4;
				.current {
					border-left:2px solid #1E71FA;
					background: #fff;
				}
				ul{
					padding-bottom:1.2rem;
					li{
						text-align: center;
						border-bottom: 1px solid #ecebea;
						font-size:.28rem;
						overflow: hidden;
						border-left:2px solid #f4f4f4;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding:.2rem 0;
						position: relative;
						.rednum{
							position: absolute;
							top:0;
							right:0;
							width:.3rem;
							height:.3rem;
							background: red;
							color:#fff;
							text-align: center;
							line-height:.3rem;
							font-size:.24rem;
							border-radius: .3rem;
						}
					}
				}
			}
			.rightMenu{
				margin-left:2rem;
				height:100%;
				background: #fff;
				ul{
					padding-bottom: 1.2rem;
				}
				.everyOneLi{
					h3{
						padding:0 .1rem;
						background: #e4e4e4;
						font-size:.28rem;
						font-weight: normal;
						color:#333;
						small{
							font-size:.24rem;
							color:#999;
						}
					}
					.item{
						display: flex;
						padding:.2rem;
						border-bottom: 1px solid #e7e7e7;
						a{
							display: flex;
							width:100%;
						}
						.img{
							width:1rem;
							display: flex;
							align-items:flex-start;
							margin-top:.1rem;
							margin-right:.1rem;
						}
						.txt{
							width:calc(100% - 1.12rem);
							position: relative;
							h4{
								color:#333;
							}
							 p{
								 color:#999;
								 font-size:.24rem;
								 margin:.08rem 0;
							 }
							 h6{
								 border-radius: .06rem;
								 border:1px solid sandybrown;
								 color:sandybrown;
								 display: inline-block;
								 font-weight: normal; 
								 font{
									 background: sandybrown;
									 color:#fff;
									 display: inline-block;
									 padding:0 .1rem;
								 }
							 }
							 .money {
								 color:sandybrown;
								 b{
									font-size:.44rem;
									em{
										font-size:.28rem;
									}
								 }
								 s{
									 color:#999;
									 font-size:.28rem;
								 }
							 }
							 .money-num {
								 position: absolute;
								 right:0;
								 bottom:.1rem;
							 }
						}
						.money-num{
							.numadd{
								i{
									background: #fff;
									width:.36rem;
									height:.36rem;
									line-height:.36rem;
									color:#1E71FA;
									text-align: center;
									border-radius: .36rem;
									display:inline-block;
									border:2px solid #1E71FA
								}
								i.add{
									background: #1E71FA;
									color:#fff;
								}
							}
							.numenu{
								background: #1E71FA;
								color:#fff;
								padding:.04rem .1rem;
								font-size:.24rem;
								border-radius: .1rem;
							}
						}
					}
				}
			}
		}
	}
	.shopCartInfo{
		z-index: 16;
		position: fixed;
		bottom:1rem;
		left:0;
		padding:.2rem;
		box-sizing: border-box;
		width:100%;
		background: #fff;
		max-height:calc(80% - 1rem);
		.bg-shop-div{
			height:100%;
			h4{
				display: flex;
				border-bottom: 1px solid #e3e3e3;
				padding-bottom: .1rem; 
				span{
					margin-left:auto;
					font-size:.28rem;
					font-weight: normal;
					color:#666
				}
			}
			.scroll-div {
				position: relative;
				overflow-y: scroll;
				max-height:8rem;
			}
			ul{
				overflow: hidden;
				width:100%;
				li{
					line-height:1rem;
					width:100%;
					height:1rem;
					display: flex; 
					align-items: center;
					font{
						font-size:.28rem;
						color:#333;
						width:4.8rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-weight: normal
					}
					span{
						margin-left:auto;
						em{
							color:#dd5318
						}
						b{
							
							color:#666;
							font-weight: normal;
						}
						i{
							border:2px solid #1e71fa;
							width:.32rem;
							height:.32rem;
							line-height:.32rem;
							border-radius: .32rem;
							text-align:center;
							color:#fff;
							display: inline-block;
							color:#1e71fa;
						}
						i.add{
							background: #1e71fa;
							color:#fff;
						}
					}
				}
			}
		}
	}
	.shopCart {
		position: fixed;
		width:100%;
		height:1.2rem;
		bottom:0;
		left:0;
		z-index: 17;
		.footShop{
			background: #3d3d3f;
			height:1rem;
			margin-top:.2rem;
			display: flex; 
			.scart-icon{
				display: block;
				position: absolute;
				top:0;
				left:.2rem;
				i{
					border:.1rem solid #3d3d3f;
					width:1.2rem;
					height:1.2rem;
					color:#fff;
					background: #1E71FA;
					width:1.2rem;
					box-sizing: border-box;
					display: flex;
					
					justify-content: center;
					align-items: center;
					font-size:.6rem;
					border-radius: 1.2rem;
				}
				small{
					background:red;
					color:#fff;
					position: absolute;
					top:0;
					right:0;
					width:.4rem;
					height:.4rem;
					border-radius: 50%;
					text-align: center;
					font-size:.24rem;
				}
			}
			.songd-money {
				margin-left:1.5rem;
				color:#fff;
				.no-money{
					display: block;
					height:100%;
				}
				.easy-no{
					color:#999;
					line-height:.9rem;
					font-size:.28rem;
				}
				h5{
					font-size:.36rem
				}
				p{
					font-size:.24rem;
				}
			}
			.jiesuan {
				width:2rem;
				height:100%;
				margin-left:auto;
				background: #8f9398;
				//f89c55
				display: flex;
				justify-content: center;
				align-items: center;
				color:#fff;
				a{
					display: block;
					color:#fff;
					width:100%;
					height:100%;
					text-align: center;
					line-height:1rem;
				}
			}
			.on {
				background: #1E71FA !important
			}
		}
	}
	.bg-block {
		position: fixed;
		width:100%;
		height:100%;
		z-index: 15;
		top:0;
		left:0;
		background: rgba(0,0,0,.6)
	}
</style>
