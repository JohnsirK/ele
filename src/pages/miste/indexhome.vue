<template>
	<div class="main">
		<keep-alive>
			<transition name="left">
				<router-view></router-view>
			</transition>
		</keep-alive>
		<!-- 底部 -->
		<all-footer></all-footer>
	</div>
</template>

<script>
	//顶部
	import allHeader from '@/components/globel/header'
	//底部
	import allFooter from '@/components/footer'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			//公用底部
			allFooter,
			//公用顶部
			allHeader
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		height:100%;
	}
</style>
