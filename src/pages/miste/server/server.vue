<template>
	<div class="globel-main">
		<all-header>
			<span slot='headerTitle'>
				服务中心
			</span>
		</all-header>
		<div class="globel-content">
			<dl class="serverList">
				<dt>
					热门问题
				</dt>
				<dd v-for="(item,index) in questionTitle" :key="index" @click="toServerDetail(item,index)">
					<i class="iconfont icon-plus"></i>
					<font>{{item}}</font>
					<i class="iconfont icon-right"></i>
				</dd>
			</dl>
		</div>
		<transition name="right">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {serverData} from '@/api/api'
	import {mapMutations} from 'vuex'
	export default{
		data(){
			return {
				//原生数据
				serverList:null,
				//问题标题
				questionTitle:[],
				//问题内容
				questionDetail:[]
			}
		},
		components:{
			allHeader
		},
		methods:{
			...mapMutations(['getQuestionDetail']),
			async getServer(){
				let res = await serverData()
				console.log(res)
				this.serverList = res
				Object.keys(this.serverList).forEach(item => {
					let avoidRepeat = false;
					this.questionTitle.forEach(i => {
						//防止重复数据
						if(i == this.serverList[item]){
							avoidRepeat = true
						}
					})
					//讲标题和内容分别放进数组中
					if(item.indexOf('Caption') !== -1 && !avoidRepeat){
						this.questionTitle.push(this.serverList[item])
					}else if(!avoidRepeat){
						this.questionDetail.push(this.serverList[item])
					}
				})
			},
			//跳转到问题详情页面
			toServerDetail(item,index){
				this.getQuestionDetail({item,detail:this.questionDetail[index]})
				this.$router.push('/serverCenter/serverDetail')
			}
		},
		mounted() {
			this.getServer()
		}
	}
	
</script>

<style lang="scss" scoped>
	.serverList{
		dt{
			margin:.2rem;
		}
		
		dd{
			background: #fff;
			box-shadow: 0 2px 10px rgba(0,0,0,.2);
			margin-bottom:.2rem;
			padding:.2rem;
			font-size:.28rem;
			color:#666;
			display: flex;
			align-items: center;
			i.icon-right{
				margin-left:auto;
			}
		}
	}
</style>
