<template>
	<div class="deliDetail" @click="delActive">
		<all-header>
			<span slot="headerTitle">
				收货地址
			</span>
		</all-header>
		<div class="delicon">
			<ul v-if="nowAddress">
				<li :class="{'active':index === pickIndex}" v-for="(item,index) in nowAddress" :key="index" @click.stop="pickAddress(item,index)">
					<span>
						<i class="iconfont icon-location"></i>
					</span>
					<div class="location">
						<h4>
							{{item.name}}
							<b>
								{{item.phone}}
							</b>
						</h4>
						<p>
							{{item.address}} - {{item.address_detail}} 
						</p>
					</div>
					<font class="pos">
						{{item.tag_type | tag_txt}}
					</font>
					<transition name="right">
						<div class="rightHide" v-show="index === pickIndex">
							<div @click.stop="pickShopAddress(item)">
								选择
							</div>
							<div @click.stop="delAddress(item)">
								删除
							</div>
						</div>
					</transition>
					
				</li>
				 
			</ul>
			<div v-else class="noData">
				<i class="iconfont icon-sign102"></i>
				<p>
					当前暂无收货地址，请单击下方添加收货地址！
				</p>
			</div>
		</div>
		<div class="footer-address">
			<router-link to='/confirmOrder/deliAddress/newAddress'>
				<i class="iconfont icon-plus"></i>新增收货地址
			</router-link>
		</div>
		<transition name="right">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {deliAddress,removeAddress} from '@/api/api'
	import {mapState,mapMutations} from 'vuex'
	import {Indicator,Toast} from 'mint-ui'
	import localsession from '@/utils/localsession'
	export default{
		data(){
			return {
				//当前收货地址
				nowAddress:[],
				pickIndex:null,
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		components:{
			allHeader
		},
		methods:{
			...mapMutations(['defaultAddress']),
			 async getDeliAddress(){
				 if(!localsession.getLocal('userinfo')){
					 return 
				 }else{
					 if(this.userinfo || this.userinfo.user_id){
						 let id = this.userinfo
						 let res = await deliAddress(id.user_id)
						 this.nowAddress = res
					 }
				 }
				 
			 },
			 //高亮当前地址
			 pickAddress(item,index){
				this.pickIndex = index
			 },
			 //移除当前地址
			async delAddress(item){
				let zt = Indicator.open({
					text:'删除中，请稍后',
					spinnerType: 'snake'
				})
				 if(this.userinfo || this.userinfo.user_id){
					 let userid = JSON.parse(this.userinfo)
					 let res = await removeAddress(userid.user_id,item.id)
					 Indicator.close(zt)
					 Toast({
						 message:res.success + '将重新获取数据',
						 duration:3000
					 })
					 this.pickIndex = null
					 this.getDeliAddress()
				 }
				 
			 },
			 delActive(){
				 this.pickIndex = null
			 },
			 //选择当前地址
			 pickShopAddress(item){
				 console.log(item)
				 localsession.setLocal('defaultAddress',item)
				 this.defaultAddress(item)
				 this.pickIndex = null
				 this.$router.push('/confirmOrder/')
			 }
		},
		filters:{
			tag_txt:function(value){
				if (!value) return ''
				switch(value){
					case 2:
						return '家'
						break;
					case 3:
						return '学校'
						break;
					case 4:
						return '公司'
						break
				}
			}
		},
		created() {
			this.getDeliAddress()
		},
		watch:{
			nowAddress(val){
				this.nowAddress = val
			},
			'$route'(){
				this.getDeliAddress()
				this.pickIndex = null
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.deliDetail {
		position:fixed;
		top:0;
		overflow-y: auto;
		left:0;
		height:100%;
		width:100%;
		background: #efefef;
		z-index:1000;
		box-sizing:border-box;
		.title {
			position: fixed;
			height:.8rem;
			width:100%;
			line-height:.8rem;
			text-align:center;
			color:#fff;
			font-size:.28rem;
		}
		.delicon {
			padding-top:.8rem;
			height:calc(100% - 1.8rem);
			overflow-y:auto;
			ul{
				li{
					background: #fff;
					overflow: hidden;
					margin-top:.2rem;
					box-shadow: 0 2px 10px rgba(0,0,0,0.1);
					padding:.2rem;
					display: flex;
					position: relative;
					span{
						margin-right:.2rem;
						display: flex;
						align-items: center;
						i{
							font-size:.48rem;
							color:#999
						}
					}
					p{
						color:#999;
						font-size:.24rem;
						margin-top:.1rem;
					}
					h4 {
						b{
							font-size:.28rem;
							color:#666;
							font-weight: normal;
						}
					}
					font.pos{
						position: absolute;
						top:.1rem;
						right:-.3rem;
						background: #eb2e79;
						color:#fff;
						z-index: 2;
						padding:0 .3rem;
						font-size:.24rem;
						transform: rotate(50deg);
					}
					.rightHide {
						z-index: 1;
						position: absolute;
						background: #1E71FA;
						top:0;
						right:0;
						width:2.6rem;
						height:100%;
						display: flex;
						div{
							width:1.3rem;
							display: flex;
							justify-content: center;
							align-items: center;
							color:#fff
						}
						div:last-child{
							background:red;
						}
					}
				}
				li.active{
					background: #e7f5f5;
					transition:all .6s ease;
				}
			}
		}
		.footer-address {
			 position: absolute;
			 bottom:0;
			 height:1rem;
			 left:0;
			 width:100%;
			 background: #4f93ef;
			 color:#fff;
			 display: flex;
			 justify-content:center;
			 align-items: center;
			 a{
				 color:#fff;
			 }
		}
		.noData {
			height:100%;
			background: #fff;
			color:#999;
			font-size:.24rem;
			display: flex; 
			align-items: center; 
			flex-direction: column;
			 i{
				 font-size:2rem;
				 margin-top:30%;
			 }
			 p{
				 margin-top:-.6rem;
			 }
		}
	}
</style>
