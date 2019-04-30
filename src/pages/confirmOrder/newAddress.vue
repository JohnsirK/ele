<template>
	<div class="deliDetail">
		<all-header>
			<span slot="headerTitle">
				新增收货地址 
			</span>
		</all-header>
		<div class="white-bg hg40">
			<mt-field class="bb1px" label="联系人" placeholder="请输入联系人" v-model="deliObj.deli_name"></mt-field>
			<mt-radio class="flexRow bb1px" title="性别" v-model = 'deliObj.sex' :options='sexData'></mt-radio>
			<mt-field class="bb1px" label="联系电话" :attr="{type:'number'}" placeholder="请输入您的手机号" v-model="deliObj.deli_phone"></mt-field>
			<mt-field class="bb1px" label="备用电话" :attr="{type:'number'}" placeholder="请输入您的备用电话" v-model="deliObj.phone_bk"></mt-field>
			<router-link to='/confirmOrder/deliAddress/newAddress/searchAddress' class="fs0">
				<mt-field class="bb1px" label="送餐地址" placeholder="小区/写字楼/学校等" v-model="deliObj.address" ></mt-field>
			</router-link>
			<mt-field class="bb1px" label="详细地址" placeholder="详细地址(如门牌号等)" v-model="deliObj.deli_addresstwo"></mt-field>
			<mt-radio class="flexRow bb1px " title="地址标签" v-model = 'deliObj.deli_tag' :options='tagData'></mt-radio>
			<mt-field class="bb1px" label="地址备注" placeholder="请输入地址备注" v-model="deliObj.tag"></mt-field>
			<mt-button type="primary" class="deliBtn" @click="sendUserAddress">确定</mt-button>
		</div>
		<transition name="right">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {saveAddress} from '@/api/api'
	import localsession from '@/utils/localsession'
	import {mapState} from 'vuex'
	import {Indicator,Toast} from 'mint-ui'
	export default{
		data(){
			return {
				deliObj:{
					//联系人姓名
					deli_name:'',
					//联系人电话
					deli_phone:null,
					//备用电话
					phone_bk:null,
					//联系人地址
					address:'',
					//联系人详细住址
					deli_addresstwo:'',
					//联系人标签
					deli_tag:'2',
					tag:'',
					//性别
					sex:'1',
					//经纬度
					geohash:''
				},
				//联系人性别
				sexData:[
					{
						value:'1',
						label:'男'
					},{
						value:'2',
						label:'女'
					}
				],
				//标签
				tagData:[
					{
						label:'家',
						value:'2'
					},{
						label:'学校',
						value:'3'
					},{
						label:'公司',
						value:'4'
					}
				]
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapState(['userPickAddress'])
		},
		created(){
			 console.log(this.userPickAddress)
		},
		methods:{
			async sendUserAddress(){
				let user = JSON.parse(localsession.getLocal('userinfo'))
				let user_id = user ? user.user_id : null
				if(!this.deliObj.deli_name){
					Toast({
						message:'用户名不能为空！',
						duration:3000
					})
				}else if(!this.deliObj.address){
					Toast({
						message:'地址不能为空！',
						duration:3000
					})
				}else if(!this.deliObj.deli_phone){
					Toast({
						message:'收货人电话不能为空！',
						duration:3000
					})
				}else if(!this.deliObj.tag){
					Toast({
						message:'标签！',
						duration:3000
					})
				}else if(!this.deliObj.sex){
					Toast({
						message:'请选择性别！',
						duration:3000
					})
				}else if(!this.deliObj.phone_bk){
					Toast({
						message:'备用电话不能为空！',
						duration:3000
					})
				}else if(!this.deliObj.deli_tag){
					Toast({
						message:'标签类型不能为空！',
						duration:3000
					})
				}else{
					let load1 = Indicator.open({
						text:'请稍后...',
						spinnerType: 'snake'
					})
					let res = await saveAddress(
					//用户ID
					user_id,
					//用户自己选的地址
					this.deliObj.address,
					//用户详细地址,
					this.deliObj.deli_addresstwo,
					//用户经纬度
					this.deliObj.geohash,
					//收货人姓名
					this.deliObj.deli_name,
					//收货人电话
					this.deliObj.deli_phone,
					//收货人标签
					this.deliObj.tag,
					//收货人性别
					parseInt(this.deliObj.sex),
					//收货人备用电话
					this.deliObj.phone_bk,
					//标签类型
					parseInt(this.deliObj.deli_tag)
					)
					if(res){
						Indicator.close(load1)
						if(res.status == 0){
							Toast({
								message:res.message,
								duration:3000
							})
						}else{
							Toast({
								message:res.success,
								duration:3000
							})
							this.$router.push('/confirmOrder/deliAddress')
						}
					}
				}
			},
		},
		watch:{
			userPickAddress(v){
				this.deliObj.address = v.name
				this.deliObj.geohash = v.geohash
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flexRow {
		display: flex;
		.mint-cell-wrapper{
			padding:0
		}
		.mint-radiolist-title {
			width:1.7rem;
			font-size:16px;
			line-height:48px;
			padding-left:.2rem;
			color:#000; 
			margin:0;
		}
		
	}
	.deliBtn {
		margin-top:.2rem;
		width:100%;
	}
</style>

