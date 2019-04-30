<template>
	<div class="remark">
		<div class="remark-div white-bg mb2">
			<dl v-if="remarkData.remarks">
				<dt>快速备注</dt>
				<dd v-for="(item,index) in remarkData.remarks" :key='index'>
					<span :class="{first:ix == 0,last:ix == item.length - 1,cur:pickRemark[index] && pickRemark[index][0] == ix}" v-for="(i,ix) in item" :key="ix" @click="pickMark(index,ix,i)">
						{{i}}
					</span>
				</dd>
			</dl>
		</div>
		<div class="remark-div white-bg mb2">
			<h4>
				其他备注
			</h4>
			<textarea name="" id="" cols="30" rows="10" class="textareaMark mb2" v-model="txtMarkData"></textarea>
			<mt-button type="primary" class="markok" @click.native="saveMarkData">确定</mt-button>
		</div>
	</div>
</template>

<script>
	import {remarkInfo} from '@/api/api'
	import {mapMutations} from 'vuex'
	export default{
		data(){
			return {
				//备注数据
				remarkData:[],
				//选择的备注数据
				pickRemark:{},
				txtMarkData:null
			}
		},
		methods:{
			...mapMutations(['saveRemarkInfo']),
			//获取备注数据
			getRemarkInfo(){
				remarkInfo().then(res=>{
					this.remarkData = res
					console.log(this.remarkData)
				}).catch(err=>{
					console.log(err)
				})
			},
			//选择备注
			pickMark(index,ix,i){
				this.pickRemark[index] = [ix,i]
				this.pickRemark = Object.assign({},this.pickRemark)
				console.log(this.pickRemark)
			},
			//讲选择好的数据保存至vuex方便其他页面使用
			saveMarkData(){
				this.saveRemarkInfo({pick:this.pickRemark,txt:this.txtMarkData})
				this.$router.go(-1)
			}
		},
		created(){
			this.getRemarkInfo()
		}
	}
</script>

<style lang='scss'>
	.remark{
		position:fixed;
		top:0;
		overflow-y: auto;
		left:0;
		height:100%;
		width:100%;
		background: #efefef;
		z-index: 100;
		padding:.8rem 0 0 0;
		box-sizing:border-box;
		.remark-div {
			dl{
				
				dt{
					margin-bottom: .2rem;
				}
				dd{
					display: inline-block;
					margin-right:.2rem;
					 
					margin-bottom: .2rem;
					overflow: hidden;
					span{
						font-size:.28rem;
						display:inline-block;
						border:.02rem solid #3190e8;
						border-left:0;
						padding:.1rem;
						
					}
					span.cur{
						background: #3190e8;
						color:#fff;
					}
					span.first{
						border-top-left-radius: .1rem;
						border-bottom-left-radius: .1rem;
						border-left:.02rem solid #3190e8;
					}
					span.last{
						border-top-right-radius: .1rem;
						border-bottom-right-radius: .1rem;
					}
				}
			}
			h4{
				margin-bottom: .2rem;
				font-size:.32rem;
				color:#333;
				font-weight: normal;
			}
			.textareaMark {
				width:100%;
				box-sizing: border-box;
				padding:.2rem;
				border:.02rem solid #e2dddd;
			}
			.markok{
				width:100%;
			}
		}
		
	}
</style>
