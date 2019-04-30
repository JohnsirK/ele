<template>
	<div class="globel-detail">
		<all-header>
			<span slot="headerTitle">{{questionDetail.item}}</span>
		</all-header>
		<div class="globel-content">
			<section v-html="markdownText" class="markdown"></section>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import {mapState} from 'vuex'
	import showdown from 'showdown'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			allHeader
		},
		computed:{
			...mapState(['questionDetail']),
			
			markdownText(){
				//转换markDown格式
				let converter = new showdown.Converter()
				return converter.makeHtml(this.questionDetail.detail)
			}
		},
		mounted() {
			console.log(this.questionDetail)
		}
	}
</script>

<style lang="scss" scoped>
	.markdown {
		padding:.2rem;
		h3{
			font-size: .28rem;
			font-weight: normal;
			line-height:.48rem;
		}
		
	}
</style>
