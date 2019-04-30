<template>
	<div class="comment" ref="gundong">
		<div class="allComment">
			<div>
				<div class="commentTop" >
					<div class="cpoce" v-if="scorefs" >
						<h2>
							{{allScore}}
						</h2>
						<h5>
							综合评价
						</h5>
						<h6>
							高于周边商家
						</h6>
					</div>
					<div class="rcpce">
						<div class="pscro">
							<em>服务态度:</em><star :dataJson='serverScore'></star> <b>{{serverScore}}</b>
						</div>
						<div class="pscro">
							<em>菜品评价: </em><star :dataJson='menuScore'></star> <b>{{menuScore}}</b>
						</div>
						<div class="pscro">
							<em>送达时间: </em>{{scorefs.deliver_time}}<font>分钟</font>
						</div>
					</div>
				</div>
				<div class="commentBot">
					<dl class="scoreInTop">
						<dt >
							<span  v-for="(item,index) in scoreTag" :key="index" 
							:class="{color3:item.unsatisfied,
									color2:!item.unsatisfied,
									color1:index === currentScore}" @click="changeScoreIndex(index)">
								{{item.name}}({{item.count}})
							</span>
							 
						</dt>
						<dd v-for="(item,index) in score" :key="index">
							<div class="userComment" >
								<div class="imgTx">
									<img :src="imgaddPath(item.avatar)" alt="">
								</div>
								<div class="userCinfo">
									<h4>
										<font>{{item.username}}</font>
										<em>
											{{item.rated_at}}
										</em>
									</h4>
									<div class="star_min">
										<star :dataJson = 'item.rating_star'></star>{{item.time_spent_desc}}
									</div>
									<div class="user-cm">
										 
										<img v-for='(img,ix) in item.item_ratings' :src="imgPathScore(img.image_hash)" alt="" :key="ix">
									</div>
									<p class="cionmkuai">
										<b v-for="(txt,ie) in item.item_ratings" :key="ie">
											{{txt.food_name}}
										</b>
									</p>
								</div>
							</div>
						</dd>
					</dl>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import star from '@/components/star'
	import {shopScoreList,shopScore,shopPjFl} from '@/api/api'
	export default{
		props:['showShop'],
		components:{
			star
		},
		data(){
			return {
				//商铺评价
				score:[],
				comt:null,
				//评价分数
				scorefs:[],
				//评价分类
				scoreTag:[],
				//点击评论分类的index
				currentScore:0
			}
		},
		//计算属性
		computed:{
			//综合评价
			allScore(){
				return parseFloat(this.scorefs.food_score).toFixed(1)
			},
			//服务评价
			serverScore(){
				return parseFloat(this.scorefs.service_score).toFixed(1)
			},
			//菜品评价
			menuScore(){
				return parseFloat(this.scorefs.overall_score).toFixed(1)
			}
		},
		filters:{
			toFiextwo:function(value){
				if(!value) return 
				return parseFloat(value).toFixed(1)
			}
		},
		methods:{
			//图片添加地址
			imgaddPath(e){
				//
				let suffix;
				//如果没值的就给个默认头像
				if(!e){
					return '//elm.cangdu.org/img/default.jpg'
				}
				//说明路径包含jpeg
				if(e.indexOf('jpeg') !== -1){
					suffix = '.jpeg'
				}else{
					suffix = '.png'
				}
				let url = '/' + e.substr(0,1) + '/' + e.substr(1,2) + '/' + e.substr(3) + suffix
				return 'https://fuss10.elemecdn.com/' + url
			},
			//评论图片地址
			imgPathScore(e){
				 
				return 'https://fuss10.elemecdn.com/' + e + '.jpeg'
			},
			//better-scroll 初始化
			_initScroll(){
				this.comt = new BScroll(this.$refs.gundong,{
				})
				console.log(this.comt)
			},
			//商铺评价请求
			getShopScore(id){
				shopScoreList(id).then(res=>{
					this.score = res
					
				}).catch(err=>{
					console.log(err)
				})
			},
			//获取评价分数
			getShopScoreFs(id){
				shopScore(id).then(res=>{
					this.scorefs = res
				}).catch(err=>{
					console.log(err)
				})
			},
			//获取评价分类
			getShopPjTags(id){
				shopPjFl(id).then(res=>{
					this.scoreTag = res
				}).catch(err=>{
					console.log(err)
				})
			},
			//点击改变评分分类index
			changeScoreIndex(index){
				this.currentScore = index
			}
		},
		mounted(){
			this.getShopScore(this.$route.query.id)
			this.getShopScoreFs(this.$route.query.id)
			this.getShopPjTags(this.$route.query.id)
			
		},
		watch:{
			showShop(value){
				console.log(value)
				this.$nextTick(function(){
					if(!this.comt){
						this.comt = new BScroll(this.$refs.gundong,{
							click: true,//滚动监听 scroll事件
						})
					}else{
						this.comt.refresh()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment {
		height:100%; 
		.commentTop {
			border-bottom: 1px solid #ededed;
			background: #fff;
			padding:.2rem;
			display: flex;
			.cpoce {
				border-right:1px solid #ededed;
				padding-right:.3rem;
				text-align: center;
				h2{
					color:#f90;
					font-size:.6rem;
					font-weight: normal;
				}
				h5{
					font-size:.28rem;
					font-weight: normal;
					color:#666;
				}
				h6{
					font-size:.24rem;
					color:#999;
					font-weight: normal;
				}
			}
			.rcpce {
				margin-left:.3rem;
				padding-top:.2rem;
				width:60%;
				.pscro{
					color:#333;
					font-size:.28rem;
					display: flex;
					margin-bottom: .1rem;
					em{
						display: inline-block;
					}
					 .xxspan2{
						 top:2px !important;
					 }
					b{
						color:#f90;
						display: inline-block
					}
					font{
						color:#999
					}
				}
				p:last-child{
					margin-bottom: 0;
				}
			}
		}
		.commentBot {
			margin-top:.2rem;
			background: #fff;
			padding:.2rem;
			border-top:1px solid #ededed;
			p{
				 
			}
			.scoreInTop {
				width:100%;
				dt{
					margin-bottom: .2rem;
				}
				span{
					padding:.1rem;
					font-size:.28rem;
					display: inline-block;
					margin-right:.1rem;
					margin-bottom: .1rem;
				}
				span.color1{
					background: #00a0dc !important;
					color:#fff !important;
				}
				span.color2{
					background:rgba(0,160,220,0.2);
					color:#333;
				}
				span.color3{
					background:rgba(77,85,93,0.2);
					color:#333;
				}
				dd{
					padding-bottom:.2rem;
					margin-bottom: .2rem;
					border-bottom: 1px solid #e7e7e7;
					.userComment {
						display: flex;
						.imgTx {
							width:1.2rem;
							display: flex;
							flex-shrink: 0;
							align-items: flex-start;
							img{
								width:100%;
							}
						}
						.userCinfo {
							margin-left:.2rem;
							width:100%;
							h4{
								display: flex;
								font{
									font-size:.28rem;
									color:#333;
									font-weight: normal;
								}
								em{
									font-size:.24rem;
									color:#999;
									margin-left:auto;
									font-weight: normal;
									display:inline-block
								}
							}
							.star_min {
								font-size:.24rem;
								color:#999;
								display: flex
							}
							.user-cm {
								margin:.1rem 0;
								color:#666;
								font-size:.28rem;
								p{
									display: block;
								}
								img{
									width:31%;
									margin-right:.5%;
									border:1px solid #e7e7e7;
								}
							}
							p.cionmkuai {
								b{
									border:1px solid #e7e7e7;
									width:1rem;
									height:.5rem;
									line-height:.5rem;
									display:inline-block;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									font-size:.24rem;
									font-weight: normal;
									color:#999;
									padding:0 .1rem;
									box-sizing: border-box;
									margin-right:.1rem;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
