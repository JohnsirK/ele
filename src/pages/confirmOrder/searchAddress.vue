<template>
	<div class="deliDetail wb0">
		<all-header>
			<span slot="headerTitle">
				搜索地址 {{pickcityinfo.num}}
			</span>
		</all-header>
		<div class="p2 hg40">
			<dl class="searchList">
				<dt>
					<input type="text" placeholder="请输入小区/写字楼/学校等" v-model="searchTxt">
					<button @click="search">搜索</button>
				</dt>
				<div v-if="searchData.length>0" class="searchjieguo">
					<dd v-for="(item,index) in searchData" :key="index" @click="selectSearch(item)">
						<h4>
							{{item.name}}
						</h4>
						<p>
							<i class="iconfont icon-location"></i>{{item.address}}
						</p>
					</dd>
				</div>
				<div class="globelCenter mt2" v-else>
					<font class="fc333 fs14">当前暂无历史记录</font>
					<p class="fc999 fs12">
						找不到地址？
					</p>
					<p class="fc999 fs12">
						尝试输入小区、写字楼或学校名
					</p>
					<p class="fc999 fs12">
						详细地址（如门牌号等）可稍后输入哦
					</p>
				</div>
			</dl>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {searchAddress} from '@/api/api'
	import {mapState,mapMutations} from 'vuex'
	import {Indicator} from 'mint-ui'
	import localsession from '@/utils/localsession'
	export default{
		data(){
			return {
				//搜索结果
				searchData:[],
				//关键字
				searchTxt:''
			}
		},
		computed:{
			...mapState(['nowCity','pickcityinfo']),
			// getnum(){
			// 	if(localsession.getSession('pickpickCity'))
			// }
		},
		components:{
			allHeader
		},
		created(){ 
			console.log(this.pickcityinfo)
		},
		methods:{
			...mapMutations(['getUserPickAddress']),
			//搜索
			async search(){
				let load2 = Indicator.open({
					text:'请稍后...',
					spinnerType: 'fading-circle'
				})
				let res = await searchAddress(this.pickcityinfo.num ? this.pickcityinfo.num : 1,this.searchTxt)
				if(res){
					Indicator.close(load2)
					this.searchData = res
				}
			},
			//选择
			selectSearch(item){
				this.getUserPickAddress(item)
				this.$router.push('/confirmOrder/deliAddress/newAddress')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchList{
		height:100%;
		dt{
			border-radius: .08rem;
			overflow: hidden;
			display:flex;
			height:.8rem;
			margin-bottom: .2rem;
			input {
				padding:.2rem;
				width:80%;
				border:.02rem solid #E7E7E7;
				box-sizing: border-box;
				font-size:.24rem;
			}
			button{
				box-sizing: border-box;
				width:20%;
				background: #1E71FA;
				border: none;
				color:#fff;
				padding:.17rem;
			}
		}
		dd{
			padding-bottom: .2rem;
			margin-bottom: .2rem;
			border-bottom: .02rem solid #E7E7E7;
			h4{
				font-size:.28rem
			}
			p{
				color:#666;
				margin-top:.08rem;
				font-size:.24rem;
			}
		}
		.searchjieguo {
			height:calc(100% - 1rem)
		}
	}
</style>
